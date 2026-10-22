// Gera a biblioteca de instrumentos do MD Tracker.
//   node md-tracker/ferramentas/gerar-biblioteca.js [pasta GENESIS do DefleMask]
// Saída: md-tracker/biblioteca/basicos.json, biblioteca/jogos/index.json e um .json por jogo.
// Os instrumentos criados (instrumentos.js) são tocados no próprio motor do app e o TL das
// portadoras é ajustado para todos saírem com volume parecido.

'use strict';
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const GENESIS = process.argv[2] || '/home/arthur/Apps/DefleMask_Linux/instruments/GENESIS';

// Motor do app: o mesmo código que roda no navegador, tirado do index.html.
const html = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const src = /<script id="engine-src">([\s\S]*?)<\/script>/.exec(html)[1];
const MDT = new Function('module', src + '\nreturn MDT;')({});

const RATE = 22050;
function medir(ins, nota, ruido) {
  const e = new MDT.Engine(RATE);
  const song = MDT.newSong(); song.ins = [ins];
  e.setSong(song);
  const c = ins.type === 'fm' ? 0 : ruido ? 9 : 6;
  e.seq.liveOn(c, nota, 0, -1);
  const n1 = Math.round(RATE * 0.8), n2 = Math.round(RATE * 0.6);
  const L = new Float32Array(n1 + n2), R = new Float32Array(n1 + n2);
  e.render(L.subarray(0, n1), R.subarray(0, n1), n1);
  e.seq.liveOff(c);
  e.render(L.subarray(n1), R.subarray(n1), n2);
  const rms = (a, b) => { let s = 0; for (let i = a; i < b; i++) s += L[i] * L[i]; return Math.sqrt(s / Math.max(1, b - a)); };
  let pico = 0; for (const x of L) pico = Math.max(pico, Math.abs(x));
  let zc = 0; for (let i = 1; i < n1; i++) if ((L[i - 1] < 0) !== (L[i] < 0)) zc++;
  return { ini: rms(0, RATE * 0.3), fim: rms(RATE * 0.6, n1), solto: rms(n1 + RATE * 0.4, n1 + n2), pico, zc: zc / 0.8 / 2 };
}

const CARR = MDT.CARRIERS;
function fmDe(d) {
  const ops = d.ops.map(([ar, dr, sl, d2r, rr, tl, mul, dt, rs]) => Object.assign(MDT.defFMOp(), { ar, dr, sl, d2r, rr, tl, mul, dt: dt + 3, rs }));
  return { type: 'fm', name: d.nome, alg: d.alg, fb: d.fb, fms: d.fms || 0, ams: d.ams || 0, ops };
}
function psgDe(d) {
  const ins = MDT.stdIns(d.nome, d.vol, d.volLoop == null ? (d.loop == null ? -1 : d.loop) : d.volLoop);
  if (d.arp) ins.arp = { v: d.arp, loop: d.arpLoop == null ? -1 : d.arpLoop, fixed: false };
  if (d.duty) ins.duty = { v: d.duty, loop: -1 };
  return ins;
}

// Volume de referência: o "Trumpet" do DefleMask tocado em C-5.
const ALVO = medir(MDT.parseDMP(new Uint8Array(fs.readFileSync(path.join(GENESIS, 'Trumpet.dmp'))), 'Trumpet'), 60).ini;

function normalizar(ins, nota, ajusteDb) {
  const car = CARR[ins.alg];
  for (let volta = 0; volta < 4; volta++) {
    const m = medir(ins, nota);
    if (m.ini < 1e-5) break;
    const db = 20 * Math.log10(ALVO / m.ini) + (ajusteDb || 0);
    if (Math.abs(db) < 0.8) break;
    const passo = Math.round(-db / 0.75);
    const menor = Math.min(...car.map(k => ins.ops[k].tl));
    const p = Math.max(passo, -menor);          // não deixa TL negativo
    if (p === 0) break;
    for (const k of car) ins.ops[k].tl = Math.max(0, Math.min(127, ins.ops[k].tl + p));
  }
  return ins;
}

const relatorio = [];
const grupos = [];
const item = (ins, extra) => Object.assign({ ins }, extra || {});

// 1) Criados para o MD Tracker
for (const g of require('./instrumentos.js')) {
  const itens = g.itens.map(d => {
    const nota = d.nota || 48;
    let ins = d.tipo === 'fm' ? normalizar(fmDe(d), nota, d.volume) : psgDe(d);
    const m = medir(ins, nota, d.ruido);
    relatorio.push(`${g.grupo.padEnd(26)} ${d.nome.padEnd(26)} ini ${(20 * Math.log10(m.ini / ALVO)).toFixed(1).padStart(6)} dB  fim/ini ${(m.fim / m.ini).toFixed(2)}  pico ${m.pico.toFixed(2)}  zc ${m.zc.toFixed(0)}`);
    const x = { nota };
    if (d.ruido) x.ruido = true;
    return item(ins, x);
  });
  grupos.push({ nome: g.grupo, origem: 'MD Tracker', itens });
}

// 2) Pastas do DefleMask: Customs (do Junkatana), pacote original, PSG e .y12
function lerPasta(dir, filtro) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => filtro.test(f)).sort((a, b) => a.localeCompare(b)).map(f => {
    const u8 = new Uint8Array(fs.readFileSync(path.join(dir, f)));
    try { return MDT.parseInsFile(u8, f); } catch (e) { console.warn('ignorado', f, e.message); return null; }
  }).filter(Boolean);
}
const customs = lerPasta(path.join(GENESIS, 'Customs'), /\.(dmp|tfi|y12)$/i);
grupos.unshift({ nome: 'Meus instrumentos (Junkatana)', origem: 'Customs', itens: customs.map(i => item(i, { nota: 48 })) });
const psg = lerPasta(path.join(GENESIS, 'PSG'), /\.dmp$/i);
const stock = lerPasta(GENESIS, /\.dmp$/i);
grupos.push({ nome: 'DefleMask (pacote original)', origem: 'DefleMask', itens: stock.concat(psg).map(i => item(i, { nota: 48 })) });
const y12 = lerPasta(GENESIS, /\.y12$/i);
grupos.push({ nome: 'Tirados de jogos (.y12)', origem: 'y12', itens: y12.map(i => item(i, { nota: 48 })) });

const out = path.join(RAIZ, 'biblioteca');
fs.mkdirSync(path.join(out, 'jogos'), { recursive: true });
fs.writeFileSync(path.join(out, 'basicos.json'), JSON.stringify({ grupos }));

// 3) Sons de jogos (extras/*.tfi): um arquivo por jogo, cada instrumento em base64 (42 bytes)
const EXTRAS = path.join(GENESIS, 'extras');
const indice = [];
if (fs.existsSync(EXTRAS)) {
  const vistos = new Set();
  for (const pasta of fs.readdirSync(EXTRAS).sort()) {
    const dir = path.join(EXTRAS, pasta);
    if (!fs.statSync(dir).isDirectory()) continue;
    const lista = [];
    for (const f of fs.readdirSync(dir).filter(f => /\.tfi$/i.test(f)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
      const b = fs.readFileSync(path.join(dir, f));
      if (b.length !== 42) continue;
      const k = b.toString('base64');
      if (vistos.has(k)) continue;
      vistos.add(k);
      lista.push([f.replace(/\.tfi$/i, '').replace(/_/g, ' '), k]);
    }
    if (!lista.length) continue;
    const id = pasta.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    const nome = pasta.replace(/_+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
    fs.writeFileSync(path.join(out, 'jogos', id + '.json'), JSON.stringify(lista));
    indice.push([id, nome, lista.length]);
  }
}
fs.writeFileSync(path.join(out, 'jogos', 'index.json'), JSON.stringify(indice));

console.log(relatorio.join('\n'));
const total = grupos.reduce((n, g) => n + g.itens.length, 0);
console.log(`\n${total} instrumentos básicos em ${grupos.length} grupos; ${indice.length} jogos com ${indice.reduce((n, j) => n + j[2], 0)} instrumentos.`);
