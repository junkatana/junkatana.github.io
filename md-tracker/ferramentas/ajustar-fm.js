// Ajusta os instrumentos FM criados para soarem como instrumentos de verdade.
//   node md-tracker/ferramentas/ajustar-fm.js [pasta de trabalho] [nome ...]
// Precisa de fluidsynth e do banco /usr/share/sounds/sf2/FluidR3_GM.sf2.
//
// Para cada instrumento: grava a referência General MIDI no fluidsynth, procura entre os patches
// de jogos (biblioteca/jogos) e do DefleMask os mais parecidos e, a partir deles, mexe parâmetro por
// parâmetro enquanto o som chegar mais perto. "Parecido" = espectrograma mel em dB (timbre e como o
// som muda no tempo), sem contar o volume. Resultado: ferramentas/ajustes-fm.json.

'use strict';
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const fs = require('fs'), path = require('path'), os = require('os'), { spawnSync } = require('child_process');

const RAIZ = path.join(__dirname, '..');
const RATE = 22050, HOLD = 0.5, TOTAL = 0.9;
const SF2 = '/usr/share/sounds/sf2/FluidR3_GM.sf2';
const CORPUS_NOTAS = [24, 48, 72];

// Instrumento → programa General MIDI (0–127) ou tecla de bateria (canal 10).
const GM = {
  'Violão nylon': 24, 'Violão de aço': 25, 'Violão 12 cordas': 25, 'Guitarra limpa': 27, 'Guitarra jazz': 26,
  'Guitarra distorcida': 30, 'Guitarra overdrive': 29, 'Guitarra abafada': 28, 'Cavaquinho': 25, 'Banjo': 105,
  'Harpa': 46, 'Sitar': 104,
  'Piano acústico': 0, 'Piano brilhante': 1, 'Piano elétrico (Rhodes)': 4, 'Piano elétrico (DX)': 5, 'Cravo': 6,
  'Clavinet': 7, 'Celesta': 8, 'Órgão drawbar': 16, 'Órgão rock': 18, 'Órgão de tubos': 19, 'Sanfona': 21, 'Gaita': 22,
  'Trompete': 56, 'Trompete com surdina': 59, 'Trombone': 57, 'Trompa': 60, 'Tuba': 58, 'Naipe de metais': 61,
  'Metais stab': [61, 0.15], 'Sax alto': 65, 'Sax tenor': 66,
  'Flauta': 73, 'Pífano': 72, 'Flauta doce': 74, 'Clarinete': 71, 'Oboé': 68, 'Fagote': 70, 'Flauta de Pã': 75,
  'Violino': 40, 'Viola': 41, 'Violoncelo': 42, 'Orquestra de cordas': 48, 'Cordas lentas': 49, 'Pizzicato': 45,
  'Contrabaixo acústico': 32,
  'Baixo elétrico': 33, 'Baixo palhetado': 34, 'Baixo slap': 36, 'Baixo fretless': 35, 'Baixo synth': 38, 'Baixo acid': 39,
  'Marimba': 12, 'Xilofone': 13, 'Vibrafone': 11, 'Glockenspiel': 9, 'Caixinha de música': 10, 'Sino tubular': 14,
  'Sino de igreja': 14, 'Kalimba': 108, 'Steel drum': 114,
  'Bumbo': { bat: 36 }, 'Bumbo eletrônico': { bat: 35 }, 'Caixa': { bat: 38 }, 'Caixa eletrônica': { bat: 40 },
  'Tom': { bat: 45 }, 'Surdo': { bat: 41 }, 'Chimbal fechado': { bat: 42 }, 'Chimbal aberto': { bat: 46 },
  'Prato': { bat: 49 }, 'Palmas': { bat: 39 }, 'Agogô': { bat: 67 }, 'Pandeiro': { bat: 54 },
  'Lead serra': 81, 'Lead quadrado': 80, 'Pad quente': 89, 'Pad cristal': 88, 'Coral (aah)': 52, 'Metais synth': 62,
  'Sino synth': 98,
};

// ------------------------------------------------------------------ motor (o mesmo do app)
function motor() {
  const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
  const src = /<script id="engine-src">([\s\S]*?)<\/script>/.exec(html)[1];
  return new Function('module', src + '\nreturn MDT;')({});
}

// Toca só o canal FM1, sem o resto do chip (bem mais rápido que o Engine inteiro).
function tocar(MDT, ins, nota, hold, total) {
  const fm = new MDT.YM2612();
  const seq = new MDT.Sequencer({ writeFM: (p, r, v) => fm.write(p, r, v), writePSG() {}, writeDAC() {} });
  const song = MDT.newSong(); song.ins = [ins]; seq.setSong(song);
  seq.liveOn(0, nota, 0, -1);
  const fmRate = MDT.NTSC.fm / 144, n = Math.round(total * RATE), out = new Float32Array(n);
  const ch = fm.ch[0], step = RATE / fmRate, offAt = Math.round(hold * fmRate);
  let t = 0, acc = 0, cnt = 0, i = 0, k = 0;
  while (i < n) {
    if (k === offAt) seq.liveOff(0);
    seq.clockSample();
    if (++fm.egDiv >= 3) { fm.egDiv = 0; fm.egCnt++; if (fm.egCnt >= 4096) fm.egCnt = 1; for (const op of ch.op) fm.egStep(op); }
    acc += fm.calcCh(ch); cnt++; k++;
    t += step; if (t >= 1) { t -= 1; out[i++] = acc / cnt; acc = 0; cnt = 0; }
  }
  return out;
}

// ------------------------------------------------------------------ espectrograma mel
function fftReal(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) { let b = n >> 1; for (; j & b; b >>= 1) j ^= b; j ^= b; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
  for (let len = 2; len <= n; len <<= 1) {
    const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a);
    for (let i = 0; i < n; i += len) { let cr = 1, ci = 0;
      for (let j = 0; j < len / 2; j++) {
        const ur = re[i + j], ui = im[i + j], xr = re[i + j + len / 2] * cr - im[i + j + len / 2] * ci, xi = re[i + j + len / 2] * ci + im[i + j + len / 2] * cr;
        re[i + j] = ur + xr; im[i + j] = ui + xi; re[i + j + len / 2] = ur - xr; im[i + j + len / 2] = ui - xi;
        const t = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = t;
      } }
  }
}
const melCache = {};
function melBank(N, bands) {
  const key = N + ':' + bands; if (melCache[key]) return melCache[key];
  const mel = f => 2595 * Math.log10(1 + f / 700), inv = m => 700 * (Math.pow(10, m / 2595) - 1);
  const lo = mel(40), hi = mel(9000), pts = []; for (let b = 0; b < bands + 2; b++) pts.push(inv(lo + (hi - lo) * b / (bands + 1)) * N / RATE);
  const bank = [];
  for (let b = 0; b < bands; b++) {
    const l = pts[b], c = pts[b + 1], r = pts[b + 2], ini = Math.max(0, Math.floor(l)), fim = Math.min(N / 2, Math.ceil(r)), w = [];
    for (let k = ini; k <= fim; k++) w.push(k > l && k < c ? (k - l) / (c - l) : k >= c && k < r ? (r - k) / (r - c) : 0);
    if (!w.some(x => x > 0)) { const kc = Math.min(N / 2, Math.round(c)); bank.push({ ini: kc, w: [1] }); } else bank.push({ ini, w });
  }
  return (melCache[key] = bank);
}
// N amostras por janela, hop, bandas → Float32Array (quadros × bandas) em dB, máximo = 0, piso −60
function espectro(sig, N = 1024, hop = 512, bands = 48) {
  const bank = melBank(N, bands), frames = Math.floor((sig.length - N) / hop) + 1, out = new Float32Array(frames * bands);
  const win = new Float32Array(N); for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N);
  const re = new Float64Array(N), im = new Float64Array(N), pw = new Float64Array(N / 2 + 1);
  let mx = -1e9;
  for (let f = 0; f < frames; f++) {
    for (let i = 0; i < N; i++) { re[i] = sig[f * hop + i] * win[i]; im[i] = 0; }
    fftReal(re, im);
    for (let k = 0; k <= N / 2; k++) pw[k] = re[k] * re[k] + im[k] * im[k];
    for (let b = 0; b < bands; b++) { let s = 1e-12; const { ini, w } = bank[b]; for (let j = 0; j < w.length; j++) s += w[j] * pw[ini + j]; const d = 10 * Math.log10(s); out[f * bands + b] = d; if (d > mx) mx = d; }
  }
  for (let i = 0; i < out.length; i++) out[i] = Math.max(-60, out[i] - mx);
  return { v: out, frames, bands };
}
function distancia(a, b) {
  const fr = Math.min(a.frames, b.frames), bd = a.bands; let s = 0, w = 0;
  for (let f = 0; f < fr; f++) { const peso = f < 12 ? 1.5 : 1; for (let k = 0; k < bd; k++) { s += peso * Math.abs(a.v[f * bd + k] - b.v[f * bd + k]); } w += peso * bd; }
  return s / w;
}
const grosso = sig => espectro(sig, 1024, 1024, 24);

// Afinação: período por autocorrelação entre 0,15 s e 0,40 s. Devolve a diferença em semitons para a nota.
function desafino(sig, nota) {
  const hz = 440 * Math.pow(2, (nota - 57) / 12), a = Math.round(0.15 * RATE), n = Math.round(0.25 * RATE);
  const L0 = Math.floor(RATE / (hz * 2.2)), L1 = Math.ceil(RATE / (hz / 2.2)), cor = [];
  let best = 0;
  for (let L = L0; L <= L1; L++) {
    let x = 0, e1 = 0, e2 = 0;
    for (let i = a; i < a + n; i++) { x += sig[i] * sig[i + L]; e1 += sig[i] * sig[i]; e2 += sig[i + L] * sig[i + L]; }
    const c = x / Math.sqrt(e1 * e2 + 1e-12); cor.push(c); if (c > best) best = c;
  }
  if (best < 0.5) return 0;   // sem periodicidade clara: não dá para julgar
  // o menor período que já explica o som (um pico local quase tão bom quanto o melhor); múltiplos dele também correlacionam
  for (let j = 1; j < cor.length - 1; j++) if (cor[j] >= 0.9 * best && cor[j] >= cor[j - 1] && cor[j] >= cor[j + 1]) return 12 * Math.log2(RATE / (L0 + j) / hz);
  return 0;
}

// ------------------------------------------------------------------ referências (fluidsynth)
function referencia(dir, alvo, nota, hold) {
  const bat = alvo.bat != null, midiNota = bat ? alvo.bat : nota + 12;
  const nome = path.join(dir, `ref-${bat ? 'bat' + alvo.bat : 'p' + alvo.prog}-${midiNota}-${hold}.wav`);
  if (!fs.existsSync(nome)) {
    const mid = nome.replace(/\.wav$/, '.mid');
    spawnSync('python3', ['-I', path.join(dir, 'mid.py'), mid, String(bat ? 0 : alvo.prog), String(midiNota), String(hold)].concat(bat ? ['bat'] : []));
    spawnSync('fluidsynth', ['-ni', '-R', '0', '-C', '0', '-g', '0.8', '-r', String(RATE), '-T', 'wav', '-F', nome, SF2, mid], { stdio: 'ignore' });
  }
  const b = fs.readFileSync(nome); let p = 12, data = null, ch = 2;
  while (p < b.length) { const id = b.toString('ascii', p, p + 4), len = b.readUInt32LE(p + 4); if (id === 'fmt ') ch = b.readUInt16LE(p + 10); if (id === 'data') { data = b.subarray(p + 8, p + 8 + len); break; } p += 8 + len; }
  const n = Math.round(TOTAL * RATE), out = new Float32Array(n);
  for (let i = 0; i < n && (i * ch + ch) * 2 <= data.length; i++) { let s = 0; for (let c = 0; c < ch; c++) s += data.readInt16LE((i * ch + c) * 2); out[i] = s / ch / 32768; }
  return out;
}

// ------------------------------------------------------------------ patches
const LIM = { ar: [0, 31], dr: [0, 31], sl: [0, 15], d2r: [0, 31], rr: [0, 15], tl: [0, 127], mul: [0, 15], dt: [0, 6], rs: [0, 3] };
const CHAVES = Object.keys(LIM);
function copia(ins) { return JSON.parse(JSON.stringify(ins)); }
function mutar(ins, rnd) {
  const x = copia(ins), n = 1 + Math.floor(rnd() * 3);
  for (let m = 0; m < n; m++) {
    const r = rnd();
    if (r < 0.03) x.alg = Math.floor(rnd() * 8);
    else if (r < 0.10) x.fb = Math.max(0, Math.min(7, x.fb + (rnd() < 0.5 ? -1 : 1)));
    else {
      const op = x.ops[Math.floor(rnd() * 4)], k = CHAVES[Math.floor(rnd() * CHAVES.length)], [lo, hi] = LIM[k];
      if (k === 'mul' && rnd() < 0.4) op.mul = Math.floor(rnd() * 16);
      else if (k === 'dt') op.dt = Math.floor(rnd() * 7);
      else { const passo = k === 'tl' ? 1 + Math.floor(rnd() * 8) : 1 + Math.floor(rnd() * 3); op[k] = Math.max(lo, Math.min(hi, op[k] + (rnd() < 0.5 ? -passo : passo))); }
    }
  }
  return x;
}
function aleatorio(semente) { let s = semente >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

// ------------------------------------------------------------------ trabalho de cada worker
function ajustar(MDT, job, corpus, corpusFeat) {
  const { alvo, ins0, dir } = job;
  const notas = alvo.bat != null ? [job.nota] : [job.nota, job.nota >= 48 ? job.nota - 12 : job.nota + 12];
  const refs = notas.map(n => espectro(referencia(dir, alvo, n, alvo.hold)));
  // instrumentos com nota (não bateria) levam multa se soarem fora da nota escrita, por exemplo uma oitava abaixo
  const custo = ins => notas.reduce((s, n, i) => {
    const sig = tocar(MDT, ins, n, alvo.hold, TOTAL);
    return s + distancia(espectro(sig), refs[i]) + (alvo.bat == null && Math.abs(desafino(sig, n)) > 0.5 ? 8 : 0);
  }, 0) / notas.length;
  // 1) peneira grossa no corpus, na nota do corpus mais perto
  const pc = CORPUS_NOTAS.reduce((a, b) => Math.abs(b - job.nota) < Math.abs(a - job.nota) ? b : a);
  const refG = grosso(referencia(dir, alvo, alvo.bat != null ? job.nota : pc, alvo.hold));
  const cf = corpusFeat[CORPUS_NOTAS.indexOf(pc)], L = refG.frames * refG.bands, notas_ = [];
  for (let i = 0; i < corpus.length; i++) {
    let s = 0; for (let j = 0; j < L; j++) s += Math.abs(cf[i * L + j] - refG.v[j]);
    notas_.push([s, i]);
  }
  notas_.sort((a, b) => a[0] - b[0]);
  // 2) os melhores do corpus na medida fina
  const cand = notas_.slice(0, 14).map(([, i]) => ({ ins: corpus[i].ins, nome: corpus[i].nome, d: custo(corpus[i].ins) }));
  const dOrig = custo(ins0);
  cand.push({ ins: ins0, nome: '(original)', d: dOrig });
  cand.sort((a, b) => a.d - b.d);
  // 3) subida de encosta a partir das 3 melhores sementes
  const rnd = aleatorio(job.semente);
  let melhor = null;
  for (const sem of cand.slice(0, 3)) {
    let cur = copia(sem.ins), dc = sem.d;
    for (let it = 0; it < 220; it++) { const x = mutar(cur, rnd), d = custo(x); if (d < dc) { cur = x; dc = d; } }
    if (!melhor || dc < melhor.d) melhor = { ins: cur, d: dc, base: sem.nome };
  }
  for (let it = 0; it < 650; it++) { const x = mutar(melhor.ins, rnd), d = custo(x); if (d < melhor.d) { melhor.ins = x; melhor.d = d; } }
  return { nome: job.nome, dOrig, dBase: cand[0].d, base: melhor.base, d: melhor.d, ins: melhor.ins };
}

// corpus: jogos + DefleMask/Customs/y12 da biblioteca já gerada
function carregarCorpus(MDT) {
  const corpus = [];
  const base = JSON.parse(fs.readFileSync(path.join(RAIZ, 'biblioteca', 'basicos.json')));
  for (const g of base.grupos) if (g.origem !== 'MD Tracker') for (const it of g.itens) if (it.ins.type === 'fm') corpus.push({ nome: g.nome + ': ' + it.ins.name, ins: it.ins });
  for (const [id, nome] of JSON.parse(fs.readFileSync(path.join(RAIZ, 'biblioteca', 'jogos', 'index.json'))))
    for (const [nm, b64] of JSON.parse(fs.readFileSync(path.join(RAIZ, 'biblioteca', 'jogos', id + '.json'))))
      corpus.push({ nome: nome + ': ' + nm, ins: MDT.parseTFI(new Uint8Array(Buffer.from(b64, 'base64')), nm) });
  return corpus;
}

// ------------------------------------------------------------------ principal
if (isMainThread && require.main !== module) module.exports = { motor, tocar, espectro, distancia, referencia, carregarCorpus, desafino };
else if (isMainThread) {
  const dir = process.argv[2] || path.join(os.tmpdir(), 'mdt-fmfit');
  const so = process.argv.slice(3);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'mid.py'), fs.readFileSync(path.join(__dirname, 'mid.py')));
  const MDT = motor();
  const corpus = carregarCorpus(MDT);
  const alvos = [];
  for (const g of require('./instrumentos.js')) for (const d of g.itens) {
    if (d.tipo !== 'fm' || GM[d.nome] == null || (so.length && !so.includes(d.nome))) continue;
    const m = GM[d.nome], alvo = typeof m === 'number' ? { prog: m, hold: HOLD } : Array.isArray(m) ? { prog: m[0], hold: m[1] } : { bat: m.bat, hold: 0.3 };
    const ins0 = { type: 'fm', name: d.nome, alg: d.alg, fb: d.fb, fms: 0, ams: 0, ops: d.ops.map(([ar, dr, sl, d2r, rr, tl, mul, dt, rs]) => Object.assign(MDT.defFMOp(), { ar, dr, sl, d2r, rr, tl, mul, dt: dt + 3, rs })) };
    alvos.push({ nome: d.nome, nota: d.nota || 48, alvo, ins0, dir, semente: alvos.length * 7919 + 13 });
  }
  const NW = Math.max(1, os.cpus().length);
  const run = (tipo, dados) => new Promise((res, rej) => { const w = new Worker(__filename, { workerData: Object.assign({ tipo }, dados) }); w.on('message', res); w.on('error', rej); });
  (async () => {
    // características grossas do corpus em cada nota (cache em disco)
    const cacheF = path.join(dir, `corpus-${corpus.length}.bin`);
    let corpusFeat;
    const L = grosso(new Float32Array(Math.round(TOTAL * RATE))).v.length;
    if (fs.existsSync(cacheF)) { const b = fs.readFileSync(cacheF); corpusFeat = CORPUS_NOTAS.map((_, p) => new Float32Array(b.buffer.slice(b.byteOffset + p * corpus.length * L * 4, b.byteOffset + (p + 1) * corpus.length * L * 4))); }
    else {
      console.log(`corpus: ${corpus.length} patches × ${CORPUS_NOTAS.length} notas…`);
      const partes = await Promise.all([...Array(NW)].map((_, w) => run('corpus', { de: Math.floor(corpus.length * w / NW), ate: Math.floor(corpus.length * (w + 1) / NW) })));
      corpusFeat = CORPUS_NOTAS.map((_, p) => { const a = new Float32Array(corpus.length * L); for (const pt of partes) a.set(pt.feats[p], pt.de * L); return a; });
      fs.writeFileSync(cacheF, Buffer.concat(corpusFeat.map(a => Buffer.from(a.buffer))));
    }
    console.log(`ajustando ${alvos.length} instrumentos em ${NW} processos…`);
    const shared = corpusFeat.map(a => { const s = new Float32Array(new SharedArrayBuffer(a.byteLength)); s.set(a); return s; });
    const fila = alvos.slice(), res = [];
    await Promise.all([...Array(NW)].map(() => new Promise((ok, rej) => {
      const w = new Worker(__filename, { workerData: { tipo: 'ajuste', corpusFeat: shared } });
      const proximo = () => { if (!fila.length) { w.terminate(); ok(); return; } w.postMessage(fila.shift()); };
      w.on('message', m => {
        if (m.pronto) return proximo();
        res.push(m);
        console.log(`${m.nome.padEnd(26)} original ${m.dOrig.toFixed(2)} → ${m.d.toFixed(2)} dB  (partiu de ${m.base})`);
        proximo();
      });
      w.on('error', rej);
    })));
    const saida = path.join(__dirname, 'ajustes-fm.json');
    const antigo = fs.existsSync(saida) ? JSON.parse(fs.readFileSync(saida)) : {};
    for (const r of res) antigo[r.nome] = { alg: r.ins.alg, fb: r.ins.fb, ops: r.ins.ops.map(o => [o.ar, o.dr, o.sl, o.d2r, o.rr, o.tl, o.mul, o.dt - 3, o.rs, o.am || 0, o.ssg || 0]), distancia: +r.d.toFixed(2), distanciaOriginal: +r.dOrig.toFixed(2), base: r.base };
    fs.writeFileSync(saida, JSON.stringify(antigo, null, 1));
    console.log('salvo em', saida);
  })().catch(e => { console.error(e); process.exit(1); });
} else {
  const MDT = motor(), wd = workerData;
  const corpus = carregarCorpus(MDT);
  if (wd.tipo === 'corpus') {
    const feats = CORPUS_NOTAS.map(() => []);
    let L = 0;
    for (let i = wd.de; i < wd.ate; i++) CORPUS_NOTAS.forEach((n, p) => { const f = grosso(tocar(MDT, corpus[i].ins, n, HOLD, TOTAL)); L = f.v.length; feats[p].push(f.v); });
    parentPort.postMessage({ de: wd.de, feats: feats.map(arr => { const a = new Float32Array(arr.length * L); arr.forEach((v, i) => a.set(v, i * L)); return a; }) });
  } else {
    parentPort.on('message', job => parentPort.postMessage(ajustar(MDT, job, corpus, wd.corpusFeat)));
    parentPort.postMessage({ pronto: true });
  }
}
