// Tutorial do MD Tracker: as lições ficam aqui, em português e inglês.
// Cada lição: id, titulo {pt,en}, html {pt,en} (conteúdo próprio, escrito à mão) e imagens opcionais.

const k = t => `<kbd>${t}</kbd>`;

// Teclado do computador → notas (igual ao do app), mostrando as notas com Oit = 4
function tecladoNotas() {
  const nomes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const linha = (teclas, base) => teclas.map((t, i) => { const n = base + i; return `<span class="tecla${nomes[n % 12].length > 1 ? " preta" : ""}"><b>${t.toUpperCase()}</b><small>${nomes[n % 12]}${4 + Math.floor(n / 12)}</small></span>`; }).join("");
  return `<div class="teclado-pc" aria-hidden="true">
    <div class="fila">${linha(["q", "2", "w", "3", "e", "r", "5", "t", "6", "y", "7", "u", "i", "9", "o", "0", "p", "[", "=", "]"], 12)}</div>
    <div class="fila">${linha(["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "m", ",", "l", ".", ";", "/"], 0)}</div>
  </div>`;
}

const EFEITOS = [
  ["00xy", "Arpejo: alterna nota, +x e +y semitons", "Arpeggio: cycles note, +x and +y semitones"],
  ["01xx / 02xx", "Desliza o tom para cima / para baixo", "Pitch slide up / down"],
  ["03xx", "Portamento até a nota escrita", "Portamento to the written note"],
  ["04xy", "Vibrato (x velocidade, y profundidade)", "Vibrato (x speed, y depth)"],
  ["08xy", "Pan FM: x esquerda, y direita (11 = centro)", "FM pan: x left, y right (11 = center)"],
  ["09xx / 0Fxx", "Velocidade 1 / velocidade 2", "Speed 1 / speed 2"],
  ["0Axy", "Volume: x sobe, y desce a cada tick", "Volume slide: x up, y down every tick"],
  ["0Bxx", "Pula para a linha xx da ordem", "Jump to order row xx"],
  ["0Dxx", "Vai para a próxima ordem, na linha xx", "Next order, starting at row xx"],
  ["10xy", "LFO: x=1 liga, y frequência 0–7", "LFO: x=1 turns it on, y frequency 0–7"],
  ["11xx", "Feedback do OP1 (0–7)", "OP1 feedback (0–7)"],
  ["12xx–15xx", "TL do operador 1–4", "TL of operator 1–4"],
  ["16xy", "MUL: x operador 1–4, y valor", "MUL: x operator 1–4, y value"],
  ["17xx", "DAC (samples) no FM6: 01 liga, 00 desliga", "DAC (samples) on FM6: 01 on, 00 off"],
  ["19xx / 1Axx–1Dxx", "AR de todos os operadores / do operador 1–4", "AR of all operators / of operator 1–4"],
  ["20xy", "Ruído: x=1 usa a frequência do SQ3, y=1 ruído branco", "Noise: x=1 uses SQ3's frequency, y=1 white noise"],
  ["E5xx", "Afinação fina (80 = afinado)", "Fine tune (80 = in tune)"],
  ["EBxx", "Banco de samples do DAC", "DAC sample bank"],
  ["ECxx", "Corta a nota no tick xx", "Note cut at tick xx"],
  ["EDxx", "Atrasa a nota xx ticks", "Note delay by xx ticks"]
];
const tabelaEfeitos = l => `<div class="tabela-rolar"><table class="tut-tabela"><thead><tr><th>${l === "pt" ? "Efeito" : "Effect"}</th><th>${l === "pt" ? "O que faz" : "What it does"}</th></tr></thead><tbody>${EFEITOS.map(e => `<tr><td><code>${e[0]}</code></td><td>${l === "pt" ? e[1] : e[2]}</td></tr>`).join("")}</tbody></table></div>`;

const PARAMS = [
  ["AR", "0–31", "Ataque: quanto maior, mais rápido o som aparece. Use 31 para sons percussivos e 10–20 para cordas e pads.", "Attack: higher means the sound starts faster. Use 31 for plucked sounds and 10–20 for strings and pads."],
  ["DR", "0–31", "Primeira queda, logo depois do ataque.", "First decay, right after the attack."],
  ["SL", "0–15", "Nível onde a primeira queda para (0 = alto, 15 = some).", "Level where the first decay stops (0 = loud, 15 = silent)."],
  ["D2R", "0–31", "Segunda queda, enquanto a nota fica segurada. 0 = sustenta para sempre.", "Second decay while the note is held. 0 = sustains forever."],
  ["RR", "0–15", "Soltura: quanto maior, mais rápido some ao soltar a nota.", "Release: higher means it fades faster when the note ends."],
  ["TL", "0–127", "Nível do operador (0 = mais alto). Na portadora é o volume; na moduladora é o brilho.", "Operator level (0 = loudest). On a carrier it's the volume; on a modulator it's the brightness."],
  ["MUL", "0–15", "Multiplica a frequência (0 = metade). Mudar o MUL de uma moduladora muda o timbre.", "Frequency multiplier (0 = half). Changing a modulator's MUL changes the timbre."],
  ["DT", "−3…+3", "Desafina um pouco. Dois operadores com DT opostos dão um efeito de coro.", "Slight detune. Two operators with opposite DT give a chorus effect."],
  ["RS", "0–3", "Faz as notas agudas terem envelopes mais rápidos, como num piano.", "Makes high notes have faster envelopes, like a piano."],
  ["AM", "0–1", "Deixa o LFO mexer no volume deste operador (tremolo).", "Lets the LFO modulate this operator's volume (tremolo)."],
  ["SSG", "—, 0–7", "Modos especiais de envelope que se repetem. Bom para efeitos e sons metálicos.", "Special repeating envelope modes. Good for effects and metallic sounds."]
];
const tabelaParams = l => `<div class="tabela-rolar"><table class="tut-tabela"><thead><tr><th></th><th>${l === "pt" ? "Faixa" : "Range"}</th><th>${l === "pt" ? "Para que serve" : "What it's for"}</th></tr></thead><tbody>${PARAMS.map(p => `<tr><td><code>${p[0]}</code></td><td class="nw">${p[1]}</td><td>${l === "pt" ? p[2] : p[3]}</td></tr>`).join("")}</tbody></table></div>`;

const LICOES = [
  {
    id: "o-que-e",
    titulo: { pt: "O que é o MD Tracker", en: "What MD Tracker is" },
    img: "padrao.webp", legenda: { pt: "A tela de padrão com a demo tocando", en: "The pattern screen playing the demo" },
    html: {
      pt: `<p>O MD Tracker é um <b>tracker</b>: um programa de música em que você escreve as notas numa tabela, de cima para baixo, como numa planilha. A música toca linha por linha. É assim que muitas trilhas de videogame dos anos 90 foram feitas.</p>
<p>Cada coluna grande é um <b>canal</b>, e cada canal é uma voz do chip de som do Mega Drive:</p>
<ul>
<li><b>FM1 a FM6</b>: os 6 canais do <b>YM2612</b>, o chip FM. É deles o som típico do Mega Drive: baixos fortes, metais, guitarras.</li>
<li><b>SQ1 a SQ3</b>: 3 ondas quadradas do <b>PSG</b> (SN76489), o mesmo chip do Master System. Bons para melodias e efeitos de 8 bits.</li>
<li><b>RUÍDO</b>: o canal de ruído do PSG, usado para chimbal, caixa e explosões.</li>
</ul>
<p>O som é <b>emulado</b> em tempo real: o que você ouve é o que o console tocaria. Quando a música fica pronta, você exporta um <code>.vgm</code> para usar no seu jogo ou salva um <code>.dmf</code> para abrir no DefleMask e no Furnace.</p>`,
      en: `<p>MD Tracker is a <b>tracker</b>: a music program where you write notes into a table, top to bottom, like a spreadsheet. The song plays row by row. That's how a lot of 90s video game music was made.</p>
<p>Each big column is a <b>channel</b>, and each channel is one voice of the Mega Drive sound hardware:</p>
<ul>
<li><b>FM1 to FM6</b>: the 6 channels of the <b>YM2612</b> FM chip. They give the Mega Drive its typical sound: punchy basses, brass, guitars.</li>
<li><b>SQ1 to SQ3</b>: 3 square waves from the <b>PSG</b> (SN76489), the same chip as the Master System. Great for melodies and 8-bit effects.</li>
<li><b>NOISE</b> (RUÍDO): the PSG noise channel, for hi-hats, snares and explosions.</li>
</ul>
<p>The sound is <b>emulated</b> in real time: what you hear is what the console would play. When the song is done, export a <code>.vgm</code> for your game or save a <code>.dmf</code> to open in DefleMask and Furnace.</p>
<p class="nota">The app's interface is in Portuguese. This tutorial shows the Portuguese button names with their meaning.</p>`
    }
  },
  {
    id: "instalar",
    titulo: { pt: "Abrir, instalar e ligar o som", en: "Open, install and turn the sound on" },
    html: {
      pt: `<ol class="passos">
<li>Abra <a href="md-tracker/">junkatana.github.io/md-tracker</a> no Chrome do celular (ou no computador).</li>
<li>Toque em <b>“Toque para ligar o som”</b>. Os navegadores só deixam tocar som depois de um toque na tela.</li>
<li>Toque em ${k("▶")} para ouvir a demo. ${k("⟲")} repete só o padrão atual e ${k("■")} para.</li>
<li>Para instalar: menu ${k("⋮")} do Chrome → <b>Instalar app</b> (ou “Adicionar à tela inicial”). Depois disso ele abre como um app e <b>funciona sem internet</b>.</li>
</ol>
<p>A música fica salva sozinha neste aparelho, dentro do navegador. Para guardar uma cópia ou levar para outro aparelho, use <b>Arquivo → Salvar .dmf</b> (lição 13).</p>`,
      en: `<ol class="passos">
<li>Open <a href="md-tracker/">junkatana.github.io/md-tracker</a> in Chrome on your phone (or on a computer).</li>
<li>Tap <b>“Toque para ligar o som”</b> (tap to turn the sound on). Browsers only allow audio after you touch the screen.</li>
<li>Tap ${k("▶")} to hear the demo. ${k("⟲")} loops the current pattern and ${k("■")} stops.</li>
<li>To install: Chrome menu ${k("⋮")} → <b>Install app</b> (or “Add to Home screen”). After that it opens like an app and <b>works offline</b>.</li>
</ol>
<p>Your song is saved automatically on this device, inside the browser. To keep a copy or move it to another device, use <b>Arquivo → Salvar .dmf</b> (File → Save .dmf, lesson 13).</p>`
    }
  },
  {
    id: "padrao",
    titulo: { pt: "Lendo a tela de padrão", en: "Reading the pattern screen" },
    img: "gravando.webp", legenda: { pt: "Com o cursor numa coluna de número, aparece o teclado hexadecimal", en: "With the cursor on a number column, the hex keypad shows up" },
    html: {
      pt: `<p>Cada linha da tabela é um instante da música. Os números à esquerda (<code>00</code>, <code>01</code>… <code>3F</code>) são o número da linha, em hexadecimal. As linhas mais claras marcam as batidas (a cada 4 e a cada 16 linhas).</p>
<p>Dentro de cada canal há várias colunas:</p>
<div class="anatomia"><span class="a-n">C-4</span> <span class="a-i">01</span> <span class="a-v">7F</span> <span class="a-x">0A</span><span class="a-y">04</span></div>
<ul>
<li><span class="a-n">C-4</span> <b>Nota</b>: dó na oitava 4. <code>OFF</code> solta a nota; <code>---</code> é vazio.</li>
<li><span class="a-i">01</span> <b>Instrumento</b>: o número do instrumento (aba Instr.).</li>
<li><span class="a-v">7F</span> <b>Volume</b>: <code>00</code>–<code>7F</code> nos canais FM e <code>0</code>–<code>F</code> no PSG. Vazio = mantém o anterior.</li>
<li><span class="a-x">0A</span><span class="a-y">04</span> <b>Efeito</b> e o seu valor (lição 11). Um canal pode ter até 4 colunas de efeito.</li>
</ul>
<p>Na barra de cima, ${k("◀")} e ${k("▶")} trocam de <b>ordem</b> (o pedaço da música que está na tela). O nome do canal mostra também o número do padrão que ele está tocando.</p>`,
      en: `<p>Each row of the table is a moment in the song. The numbers on the left (<code>00</code>, <code>01</code>… <code>3F</code>) are row numbers, in hexadecimal. Lighter rows mark the beats (every 4 and every 16 rows).</p>
<p>Inside each channel there are several columns:</p>
<div class="anatomia"><span class="a-n">C-4</span> <span class="a-i">01</span> <span class="a-v">7F</span> <span class="a-x">0A</span><span class="a-y">04</span></div>
<ul>
<li><span class="a-n">C-4</span> <b>Note</b>: C in octave 4. <code>OFF</code> releases the note; <code>---</code> is empty.</li>
<li><span class="a-i">01</span> <b>Instrument</b>: the instrument number (Instr. tab).</li>
<li><span class="a-v">7F</span> <b>Volume</b>: <code>00</code>–<code>7F</code> on FM channels and <code>0</code>–<code>F</code> on the PSG. Empty = keep the previous one.</li>
<li><span class="a-x">0A</span><span class="a-y">04</span> <b>Effect</b> and its value (lesson 11). A channel can have up to 4 effect columns.</li>
</ul>
<p>On the top bar, ${k("◀")} and ${k("▶")} move between <b>orders</b> (the part of the song on screen). Each channel header also shows the number of the pattern it is playing.</p>`
    }
  },
  {
    id: "notas",
    titulo: { pt: "Escrevendo notas", en: "Writing notes" },
    html: {
      pt: `<ol class="passos">
<li>Ligue a gravação em ${k("●")} (fica vermelho). Sem ela, o piano só toca, não escreve.</li>
<li>Toque na célula onde a nota vai ficar. O cursor amarelo vai para lá.</li>
<li>Escolha o instrumento em <b>Ins</b> ${k("−")} ${k("+")} na barra de baixo.</li>
<li>Toque uma tecla do piano. A nota é escrita e o cursor desce <b>Passo</b> linhas (1 por padrão; use 2 ou 4 para escrever mais rápido).</li>
</ol>
<ul>
<li><b>Oit</b> ${k("−")} ${k("+")} muda a oitava do piano.</li>
<li>${k("OFF")} escreve uma soltura de nota. ${k("Apagar")} limpa a célula.</li>
<li>Nas colunas de instrumento, volume e efeito, o piano vira um <b>teclado hexadecimal</b> (0–9, A–F).</li>
<li>${k("Poli")}: com a gravação desligada, você pode tocar acordes, e as notas se espalham pelos canais FM.</li>
<li>${k("◀")} ${k("▲")} ${k("▼")} ${k("▶")} movem o cursor.</li>
</ul>
<h3>No computador</h3>
<p>As teclas viram um piano, como nos trackers clássicos (notas mostradas com Oit = 4):</p>
${tecladoNotas()}
<p>${k("Enter")} liga e desliga a gravação · ${k("Espaço")} toca/para · ${k("1")} escreve OFF · setas movem · ${k("Delete")} apaga · na coluna de número, ${k("0")}–${k("9")} e ${k("A")}–${k("F")} digitam o valor.</p>`,
      en: `<ol class="passos">
<li>Turn recording on with ${k("●")} (it turns red). Without it, the piano just plays and doesn't write.</li>
<li>Tap the cell where the note should go. The yellow cursor moves there.</li>
<li>Pick the instrument with <b>Ins</b> ${k("−")} ${k("+")} on the bottom bar.</li>
<li>Play a piano key. The note is written and the cursor moves down <b>Passo</b> (step) rows: 1 by default, 2 or 4 to write faster.</li>
</ol>
<ul>
<li><b>Oit</b> (octave) ${k("−")} ${k("+")} changes the piano octave.</li>
<li>${k("OFF")} writes a note release. ${k("Apagar")} (delete) clears the cell.</li>
<li>On the instrument, volume and effect columns, the piano becomes a <b>hex keypad</b> (0–9, A–F).</li>
<li>${k("Poli")}: with recording off you can play chords, and the notes spread across the FM channels.</li>
<li>${k("◀")} ${k("▲")} ${k("▼")} ${k("▶")} move the cursor.</li>
</ul>
<h3>On a computer</h3>
<p>The keyboard becomes a piano, like in the classic trackers (notes shown with octave 4):</p>
${tecladoNotas()}
<p>${k("Enter")} toggles recording · ${k("Space")} play/stop · ${k("1")} writes OFF · arrows move · ${k("Delete")} clears · on number columns, ${k("0")}–${k("9")} and ${k("A")}–${k("F")} type the value.</p>`
    }
  },
  {
    id: "selecao",
    titulo: { pt: "Selecionar, apagar, copiar e colar", en: "Select, delete, copy and paste" },
    img: "selecao.webp", legenda: { pt: "Bloco selecionado em FM1 e FM2 com a barra de seleção", en: "A block selected across FM1 and FM2 with the selection bar" },
    html: {
      pt: `<p>Para mexer em muitas notas de uma vez:</p>
<ul>
<li><b>Toque longo e arraste</b> numa nota: segure o dedo até o celular vibrar e arraste. A seleção cresce para os lados e para baixo; perto da borda, a tela rola sozinha.</li>
<li><b>Toque no número da linha</b>: seleciona a linha inteira, em todos os canais. Toque em outro número para estender até ele.</li>
<li><b>Toque no nome do canal</b> (FM1, SQ2…): seleciona o canal inteiro. Toque em outro nome para pegar vários canais.</li>
<li>Toque de novo na mesma linha ou canal, ou em ${k("✕")}, para cancelar.</li>
</ul>
<p>Com algo selecionado aparece a <b>barra de seleção</b>:</p>
<ul>
<li>${k("Apagar")} limpa tudo o que está selecionado. O botão Apagar da barra de baixo e a tecla Delete fazem o mesmo.</li>
<li>${k("Copiar")} e ${k("Recortar")} guardam o bloco. Depois coloque o cursor onde quiser e use <b>Colar</b> na barra de cima: o bloco entra a partir do cursor.</li>
<li>${k("−1 st")} ${k("+1 st")} ${k("−8va")} ${k("+8va")} transpõem as notas selecionadas.</li>
<li>Na barra de cima, <b>Inserir linha</b> e <b>Remover linha</b> agem em todos os canais da seleção.</li>
</ul>
<p>Sem seleção, os botões da barra de cima agem no canal inteiro onde está o cursor.</p>
<p><b>Toque longo no nome do canal</b> deixa o canal mudo (e toque longo de novo devolve o som).</p>
<h3>No computador</h3>
<p>Arraste com o mouse, ou use ${k("Shift")}+setas e ${k("Shift")}+clique. ${k("Ctrl")}+${k("C")} / ${k("X")} / ${k("V")} copiam, recortam e colam, ${k("Ctrl")}+${k("A")} seleciona tudo e ${k("Esc")} cancela.</p>`,
      en: `<p>To work on many notes at once:</p>
<ul>
<li><b>Long press and drag</b> on a note: hold your finger until the phone vibrates, then drag. The selection grows sideways and down; near the edge, the screen scrolls by itself.</li>
<li><b>Tap a row number</b>: selects the whole row across all channels. Tap another number to extend to it.</li>
<li><b>Tap a channel name</b> (FM1, SQ2…): selects the whole channel. Tap another name to grab several channels.</li>
<li>Tap the same row or channel again, or ${k("✕")}, to cancel.</li>
</ul>
<p>When something is selected, the <b>selection bar</b> shows up:</p>
<ul>
<li>${k("Apagar")} (delete) clears everything selected. The Apagar button on the bottom bar and the Delete key do the same.</li>
<li>${k("Copiar")} (copy) and ${k("Recortar")} (cut) store the block. Then put the cursor anywhere and use <b>Colar</b> (paste) on the top bar: the block goes in from the cursor.</li>
<li>${k("−1 st")} ${k("+1 st")} ${k("−8va")} ${k("+8va")} transpose the selected notes.</li>
<li>On the top bar, <b>Inserir linha</b> / <b>Remover linha</b> (insert / remove row) act on every channel in the selection.</li>
</ul>
<p>With nothing selected, the top bar buttons act on the whole channel under the cursor.</p>
<p><b>Long press a channel name</b> to mute it (long press again to unmute).</p>
<h3>On a computer</h3>
<p>Drag with the mouse, or use ${k("Shift")}+arrows and ${k("Shift")}+click. ${k("Ctrl")}+${k("C")} / ${k("X")} / ${k("V")} copy, cut and paste, ${k("Ctrl")}+${k("A")} selects everything and ${k("Esc")} cancels.</p>`
    }
  },
  {
    id: "desfazer",
    titulo: { pt: "Desfazer e refazer", en: "Undo and redo" },
    html: {
      pt: `<p>Os botões ${k("↶")} e ${k("↷")} no topo da tela são o <b>desfazer</b> e o <b>refazer</b>, o Ctrl+Z do celular. Eles valem para tudo: notas, seleções apagadas, coladas, mudanças na ordem, instrumentos editados ou enviados da biblioteca e até “Nova música” e “Abrir .dmf”.</p>
<p>Arrastar um controle deslizante (por exemplo o TL de um operador) conta como um passo só, então um toque desfaz o arrasto inteiro. O app guarda dezenas de passos.</p>
<p>No computador: ${k("Ctrl")}+${k("Z")} desfaz, ${k("Ctrl")}+${k("Y")} ou ${k("Ctrl")}+${k("Shift")}+${k("Z")} refaz.</p>`,
      en: `<p>The ${k("↶")} and ${k("↷")} buttons at the top of the screen are <b>undo</b> and <b>redo</b>, the phone's Ctrl+Z. They cover everything: notes, deleted or pasted blocks, order changes, edited instruments, instruments sent from the library, and even “New song” and “Open .dmf”.</p>
<p>Dragging a slider (an operator's TL, for example) counts as a single step, so one tap undoes the whole drag. The app keeps dozens of steps.</p>
<p>On a computer: ${k("Ctrl")}+${k("Z")} undoes, ${k("Ctrl")}+${k("Y")} or ${k("Ctrl")}+${k("Shift")}+${k("Z")} redoes.</p>`
    }
  },
  {
    id: "ordem",
    titulo: { pt: "Ordem: montando a música", en: "Order: building the song" },
    img: "ordem.webp", legenda: { pt: "Cada linha da ordem diz qual padrão cada canal toca", en: "Each order row says which pattern each channel plays" },
    html: {
      pt: `<p>Uma música é feita de <b>padrões</b>: pedaços de 64 linhas (o tamanho muda na aba Música). A aba <b>Ordem</b> diz em que sequência eles tocam. Cada linha da ordem tem um número de padrão para cada canal.</p>
<p>Isso permite reaproveitar: se a bateria é igual em toda a música, o canal RUÍDO pode tocar o padrão <code>00</code> em todas as linhas, e você só escreve a bateria uma vez.</p>
<ul>
<li>Toque numa célula e use ${k("− padrão")} ${k("+ padrão")} para trocar o número, ou ${k("Padrão novo")} para pegar um vazio.</li>
<li>${k("Inserir linha")} cria uma linha com padrões novos; ${k("Duplicar linha")} repete a linha com os mesmos padrões; ${k("Clonar")} copia o conteúdo para padrões novos, para você variar sem mexer no original.</li>
<li>${k("Subir")} ${k("Descer")} reordenam; ${k("Apagar linha")} remove.</li>
<li>Toque no número da linha (à esquerda) para abrir aquele trecho no editor.</li>
</ul>`,
      en: `<p>A song is made of <b>patterns</b>: chunks of 64 rows (you can change the size in the Música tab). The <b>Ordem</b> (order) tab says in which sequence they play. Each order row has one pattern number per channel.</p>
<p>That lets you reuse things: if the drums are the same through the whole song, the NOISE channel can play pattern <code>00</code> on every row, and you write the drums only once.</p>
<ul>
<li>Tap a cell and use ${k("− padrão")} ${k("+ padrão")} to change the number, or ${k("Padrão novo")} (new pattern) to get an empty one.</li>
<li>${k("Inserir linha")} adds a row with new patterns; ${k("Duplicar linha")} repeats the row with the same patterns; ${k("Clonar")} copies the contents into new patterns so you can make variations without touching the original.</li>
<li>${k("Subir")} ${k("Descer")} move rows up and down; ${k("Apagar linha")} removes one.</li>
<li>Tap the row number (on the left) to open that part in the editor.</li>
</ul>`
    }
  },
  {
    id: "biblioteca",
    titulo: { pt: "Biblioteca de instrumentos", en: "Instrument library" },
    img: "biblioteca.webp", legenda: { pt: "Esquerda: ouvir e escolher. Direita: os escolhidos para a música", en: "Left: listen and pick. Right: the ones picked for the song" },
    img2: "biblioteca-jogos.webp", legenda2: { pt: "Sons de jogos: instrumentos tirados das trilhas originais", en: "Game sounds: instruments taken from the original soundtracks" },
    html: {
      pt: `<p>Na aba <b>Instr.</b>, toque em <b>📚 Biblioteca de instrumentos</b>. A tela tem duas colunas:</p>
<ul>
<li><b>Esquerda: a biblioteca.</b> Escolha um grupo, ou busque pelo nome. Toque num nome (ou em ${k("▶")}) para <b>ouvir</b>. Depois disso, o piano de baixo toca esse instrumento, então dá para testar em várias notas e oitavas antes de decidir.</li>
<li>${k("+")} manda o instrumento para a coluna da direita (fica ${k("✓")}). ${k("+ Todos da lista")} pega todos os que aparecem.</li>
<li><b>Direita: os selecionados.</b> ${k("▶")} ouve de novo, ${k("×")} tira da lista.</li>
<li><b>Enviar para Instrumentos</b> coloca todos na música de uma vez. Dá para desfazer com ${k("↶")}.</li>
</ul>
<h3>O que tem na biblioteca</h3>
<ul>
<li><b>184 instrumentos</b> prontos, com volumes já equilibrados: violões (nylon, aço, 12 cordas, cavaquinho), guitarras (limpa, jazz, distorcida, abafada), teclados (pianos, Rhodes, cravo, órgãos, sanfona, gaita), metais (trompete, trombone, trompa, tuba, naipe, sax), madeiras (flauta, pífano, clarinete, oboé, fagote), cordas, baixos, percussão (marimba, xilofone, sinos, steel drum), bateria FM (bumbo, caixa, chimbal, surdo, agogô, pandeiro), sintetizadores, efeitos e sons de PSG (acordes, moeda, pulo, ruídos).</li>
<li>Os instrumentos do pacote original do DefleMask e os do Junkatana.</li>
<li><b>Sons de jogos</b>: 29.697 instrumentos tirados das trilhas de 637 jogos de Mega Drive, de Sonic e Streets of Rage a Shining Force. Escolha o jogo na segunda caixa.</li>
<li><b>Abrir arquivos…</b> carrega instrumentos do seu celular (<code>.dmp</code> do DefleMask/Furnace, <code>.tfi</code> e <code>.y12</code>) para ouvir antes de usar.</li>
</ul>
<p class="nota">Instrumentos de bateria e efeitos soam melhor em notas específicas. O teste já toca na nota certa (bumbo em C-2, chimbal em C-6). Os de “PSG bateria” são para o canal RUÍDO.</p>`,
      en: `<p>On the <b>Instr.</b> tab, tap <b>📚 Biblioteca de instrumentos</b> (instrument library). The screen has two columns:</p>
<ul>
<li><b>Left: the library.</b> Pick a group or search by name. Tap a name (or ${k("▶")}) to <b>listen</b>. From then on the piano at the bottom plays that instrument, so you can try it on different notes and octaves before deciding.</li>
<li>${k("+")} sends it to the right column (it turns into ${k("✓")}). ${k("+ Todos da lista")} grabs everything listed.</li>
<li><b>Right: your picks.</b> ${k("▶")} plays it again, ${k("×")} removes it.</li>
<li><b>Enviar para Instrumentos</b> (send to instruments) adds them all to the song at once. ${k("↶")} undoes it.</li>
</ul>
<h3>What's in the library</h3>
<ul>
<li><b>184 ready-made instruments</b> with balanced volumes: guitars (nylon, steel, 12-string, cavaquinho, clean, jazz, distorted, muted), keys (pianos, Rhodes, harpsichord, organs, accordion, harmonica), brass (trumpet, trombone, horn, tuba, section, sax), woodwinds (flute, fife, clarinet, oboe, bassoon), strings, basses, mallets (marimba, xylophone, bells, steel drum), FM drums (kick, snare, hi-hat, surdo, agogô, tambourine), synths, effects and PSG sounds (chords, coin, jump, noises).</li>
<li>The instruments from the original DefleMask pack and Junkatana's own.</li>
<li><b>Game sounds</b> (Sons de jogos): 29,697 instruments taken from the soundtracks of 637 Mega Drive games, from Sonic and Streets of Rage to Shining Force. Pick the game in the second box.</li>
<li><b>Abrir arquivos…</b> (open files) loads instruments from your phone (<code>.dmp</code> from DefleMask/Furnace, <code>.tfi</code> and <code>.y12</code>) so you can listen before using them.</li>
</ul>
<p class="nota">Drum and effect instruments sound best on specific notes. The preview already plays the right one (kick on C-2, hi-hat on C-6). The “PSG bateria” ones are for the NOISE channel.</p>`
    }
  },
  {
    id: "fm",
    titulo: { pt: "Criando um instrumento FM", en: "Making an FM instrument" },
    img: "operadores.webp", legenda: { pt: "Os operadores, com o desenho do envelope de cada um", en: "The operators, each with its envelope drawing" },
    html: {
      pt: `<p>Um instrumento FM do YM2612 tem <b>4 operadores</b> (OP1–OP4). Cada um é uma onda senoidal com o seu próprio volume no tempo (o <b>envelope</b>). O segredo do FM é que um operador pode <b>modular</b> outro: em vez de virar som, ele entorta a onda do seguinte e cria harmônicos.</p>
<ul>
<li><b>Portadora</b>: operador que sai no alto-falante. O TL dela é o volume.</li>
<li><b>Moduladora</b>: operador que mexe no timbre de outro. O TL dela é o brilho: TL menor = som mais rico e “ardido”.</li>
</ul>
<p>O <b>algoritmo</b> (0–7) define quem modula quem. O app mostra o desenho, por exemplo <code>(1→2) + (3→4)</code>:</p>
<ul>
<li><b>0–3</b>: só o OP4 sai. Sons encorpados: baixos, guitarras distorcidas, leads.</li>
<li><b>4</b>: dois pares independentes. O mais versátil: pianos, metais, cordas.</li>
<li><b>5–6</b>: três portadoras. Órgãos, pads, sinos.</li>
<li><b>7</b>: quatro senoides somadas. Órgão de tubos, flautas suaves.</li>
</ul>
<p><b>FB</b> (feedback) faz o OP1 modular a si mesmo: 0 é limpo, 7 vira quase ruído. <b>FMS/AMS</b> são vibrato e tremolo pelo LFO, que se liga com o efeito <code>10xy</code>.</p>
${tabelaParams("pt")}
<h3>Receita rápida</h3>
<ol class="passos">
<li>Comece de um instrumento parecido da biblioteca e toque com ${k("Duplicar")}.</li>
<li>Ajuste o <b>TL das moduladoras</b> para mudar o brilho e o <b>MUL</b> delas para mudar o “tipo” de som.</li>
<li>Mexa no <b>AR/DR/SL/RR</b> das portadoras para mudar a forma: percussivo, sustentado ou lento.</li>
<li>Teste no piano enquanto mexe. O desenho do envelope muda junto.</li>
</ol>
<p>${k("Exportar .dmp")} salva o instrumento para usar no DefleMask/Furnace ou em outra música.</p>`,
      en: `<p>A YM2612 FM instrument has <b>4 operators</b> (OP1–OP4). Each one is a sine wave with its own volume over time (its <b>envelope</b>). The trick of FM is that one operator can <b>modulate</b> another: instead of being heard, it bends the next one's wave and creates harmonics.</p>
<ul>
<li><b>Carrier</b> (portadora): an operator you hear. Its TL is the volume.</li>
<li><b>Modulator</b> (moduladora): an operator that shapes another one's timbre. Its TL is the brightness: lower TL = richer, harsher sound.</li>
</ul>
<p>The <b>algorithm</b> (0–7) sets who modulates whom. The app shows a diagram such as <code>(1→2) + (3→4)</code>:</p>
<ul>
<li><b>0–3</b>: only OP4 is heard. Thick sounds: basses, distorted guitars, leads.</li>
<li><b>4</b>: two independent pairs. The most versatile one: pianos, brass, strings.</li>
<li><b>5–6</b>: three carriers. Organs, pads, bells.</li>
<li><b>7</b>: four sines added together. Pipe organ, soft flutes.</li>
</ul>
<p><b>FB</b> (feedback) makes OP1 modulate itself: 0 is clean, 7 is almost noise. <b>FMS/AMS</b> are LFO vibrato and tremolo, turned on with effect <code>10xy</code>.</p>
${tabelaParams("en")}
<h3>Quick recipe</h3>
<ol class="passos">
<li>Start from a similar instrument in the library and tap ${k("Duplicar")} (duplicate).</li>
<li>Change the <b>modulators' TL</b> for brightness and their <b>MUL</b> for the “kind” of sound.</li>
<li>Change the carriers' <b>AR/DR/SL/RR</b> to reshape it: plucked, sustained or slow.</li>
<li>Play the piano while you tweak. The envelope drawing follows your changes.</li>
</ol>
<p>${k("Exportar .dmp")} saves the instrument for DefleMask/Furnace or another song.</p>`
    }
  },
  {
    id: "psg",
    titulo: { pt: "Instrumentos PSG e bateria no ruído", en: "PSG instruments and noise drums" },
    img: "psg.webp", legenda: { pt: "Instrumento PSG: macros de volume, arpejo e ruído", en: "PSG instrument: volume, arpeggio and noise macros" },
    html: {
      pt: `<p>Os canais SQ1–SQ3 e RUÍDO não têm operadores. O som deles é moldado por <b>macros</b>: listas de números, um por tick (1/60 de segundo em 60 Hz).</p>
<ul>
<li><b>Volume</b> (0–15): <code>15 13 11 9 7 5 3 1 0</code> é uma nota que some rápido. Uma <code>|</code> marca onde a lista recomeça: <code>15 12 | 10 8</code> fica alternando 10 e 8 (tremolo).</li>
<li><b>Arpejo</b> (semitons): <code>0 4 7 |</code> toca um acorde maior rapidinho, o som clássico de chip. Com “notas fixas”, os números viram notas absolutas.</li>
<li><b>Ruído</b>: só no canal RUÍDO. <code>1</code> é ruído branco (chimbal, caixa) e <code>0</code> é periódico (som mais grave e metálico).</li>
</ul>
<p>No canal RUÍDO a <b>nota</b> escolhe o tom do ruído: notas C dão o ruído mais grave, C# o médio e D o mais agudo (e assim por diante, a cada 3 semitons). O efeito <code>20xy</code> com x=1 usa a frequência do SQ3, para controlar o tom com precisão.</p>`,
      en: `<p>Channels SQ1–SQ3 and NOISE have no operators. Their sound is shaped by <b>macros</b>: lists of numbers, one per tick (1/60 of a second at 60 Hz).</p>
<ul>
<li><b>Volume</b> (0–15): <code>15 13 11 9 7 5 3 1 0</code> is a note that fades quickly. A <code>|</code> marks where the list loops: <code>15 12 | 10 8</code> keeps alternating 10 and 8 (tremolo).</li>
<li><b>Arpeggio</b> (semitones): <code>0 4 7 |</code> plays a fast major chord, the classic chip sound. With “fixed notes”, the numbers become absolute notes.</li>
<li><b>Noise</b>: NOISE channel only. <code>1</code> is white noise (hi-hat, snare) and <code>0</code> is periodic (lower, metallic).</li>
</ul>
<p>On the NOISE channel the <b>note</b> picks the noise pitch: C notes give the lowest noise, C# the middle one and D the highest (repeating every 3 semitones). Effect <code>20xy</code> with x=1 uses SQ3's frequency instead, for precise pitch.</p>`
    }
  },
  {
    id: "efeitos",
    titulo: { pt: "Efeitos", en: "Effects" },
    html: {
      pt: `<p>A coluna de efeito tem dois números: o <b>efeito</b> e o <b>valor</b>. Quando o valor tem duas partes (<code>xy</code>), cada dígito é uma coisa. Exemplo: <code>04 36</code> = vibrato com velocidade 3 e profundidade 6. Use ${k("+ coluna efeito")} para ter até 4 efeitos por linha num canal.</p>
${tabelaEfeitos("pt")}`,
      en: `<p>The effect column has two numbers: the <b>effect</b> and its <b>value</b>. When the value has two parts (<code>xy</code>), each digit means something. Example: <code>04 36</code> = vibrato with speed 3 and depth 6. Use ${k("+ coluna efeito")} (add effect column) for up to 4 effects per row on a channel.</p>
${tabelaEfeitos("en")}`
    }
  },
  {
    id: "musica",
    titulo: { pt: "Música: tempo e som", en: "Song: tempo and sound" },
    img: "musica.webp", legenda: { pt: "Velocidade, taxa de ticks, linhas por padrão e mixagem", en: "Speed, tick rate, rows per pattern and mixing" },
    html: {
      pt: `<ul>
<li><b>Velocidade 1 e 2</b>: quantos ticks dura cada linha. Menor = mais rápido. As duas se alternam, e valores diferentes dão um “swing”.</li>
<li><b>Taxa de ticks</b>: NTSC 60 Hz (americano/japonês) ou PAL 50 Hz (europeu/brasileiro). Para o XGM do SGDK, use 60 Hz.</li>
<li><b>Linhas por padrão</b>: 64 é o comum. 32 ou 128 também funcionam.</li>
<li><b>Destaque menor/maior</b>: de quantas em quantas linhas as faixas ficam mais claras. O app calcula o BPM aproximado com base nisso.</li>
</ul>
<p>Em <b>Mixagem e fidelidade</b> você equilibra FM e PSG e pode ligar o <b>filtro passa-baixa</b> e a <b>distorção ladder</b> do Mega Drive modelo 1, para ouvir como no console original. Isso só muda o que você ouve no app; o arquivo exportado não muda.</p>`,
      en: `<ul>
<li><b>Speed 1 and 2</b> (Velocidade): how many ticks each row lasts. Lower = faster. They alternate, and different values give a swing feel.</li>
<li><b>Tick rate</b>: NTSC 60 Hz (US/Japan) or PAL 50 Hz (Europe/Brazil). For SGDK's XGM, use 60 Hz.</li>
<li><b>Rows per pattern</b>: 64 is the usual. 32 or 128 also work.</li>
<li><b>Minor/major highlight</b>: how often rows get highlighted. The app estimates the BPM from it.</li>
</ul>
<p>Under <b>Mixagem e fidelidade</b> (mixing and fidelity) you can balance FM and PSG and turn on the <b>low-pass filter</b> and the <b>ladder effect</b> of the model 1 Mega Drive, to hear it like the original console. This only affects what you hear in the app; exported files don't change.</p>`
    }
  },
  {
    id: "arquivos",
    titulo: { pt: "Salvar, abrir e levar para o jogo", en: "Save, open and put it in your game" },
    img: "arquivo.webp", legenda: { pt: "A aba Arquivo", en: "The File tab" },
    html: {
      pt: `<ul>
<li><b>Salvar .dmf</b> / <b>Abrir .dmf</b>: o formato do DefleMask, que o Furnace também abre. É o seu backup e o jeito de passar a música para o computador. Abre arquivos do sistema Genesis normal (não o “FM3 estendido”).</li>
<li><b>Nova música</b> (toque duas vezes para confirmar) e <b>Carregar demo</b>.</li>
<li><b>Exportar .wav</b>: grava a música em áudio, para ouvir ou postar.</li>
<li><b>Exportar .vgm</b>: a música como comandos do chip, com o ponto de laço. É o que vai para o jogo.</li>
</ul>
<h3>No seu jogo com o SGDK</h3>
<ol class="passos">
<li>Coloque o <code>.vgm</code> na pasta <code>res/</code> do projeto.</li>
<li>No arquivo de recursos (<code>.res</code>), declare: <code>XGM musica "musica.vgm"</code> (no SGDK 2, pode usar <code>XGM2</code>).</li>
<li>No código: <code>XGM_startPlay(musica);</code></li>
</ol>
<p class="nota">O VGM também toca em players como o foobar2000 (com o plugin VGM) e em emuladores com suporte a VGM.</p>`,
      en: `<ul>
<li><b>Salvar .dmf</b> / <b>Abrir .dmf</b> (save / open): DefleMask's format, which Furnace also opens. It's your backup and the way to move a song to a computer. It opens files for the regular Genesis system (not “extended FM3”).</li>
<li><b>Nova música</b> (new song; tap twice to confirm) and <b>Carregar demo</b> (load demo).</li>
<li><b>Exportar .wav</b>: renders the song to audio, to listen or share.</li>
<li><b>Exportar .vgm</b>: the song as chip commands, with its loop point. This is what goes into your game.</li>
</ul>
<h3>In your SGDK game</h3>
<ol class="passos">
<li>Put the <code>.vgm</code> in your project's <code>res/</code> folder.</li>
<li>In the resource file (<code>.res</code>), declare: <code>XGM music "music.vgm"</code> (on SGDK 2 you can use <code>XGM2</code>).</li>
<li>In your code: <code>XGM_startPlay(music);</code></li>
</ol>
<p class="nota">VGM files also play in players like foobar2000 (with the VGM plugin) and in emulators with VGM support.</p>`
    }
  },
  {
    id: "midi",
    titulo: { pt: "Teclado MIDI no Android (USB e Bluetooth)", en: "MIDI keyboard on Android (USB and Bluetooth)" },
    html: {
      pt: `<p>Tocar num teclado de verdade é bem mais rápido do que tocar na tela. O MD Tracker recebe as notas pelo <b>Web MIDI</b> do navegador, então funciona com qualquer teclado controlador que fale MIDI, por cabo ou por Bluetooth.</p>
<h3>Do que você precisa</h3>
<ul>
<li><b>Chrome no Android</b>. O Firefox e o Safari do iPhone não têm Web MIDI. O app instalado na tela inicial também serve, porque ele roda no Chrome.</li>
<li>Para <b>cabo</b>: um adaptador <b>OTG</b> (USB-C ou micro-USB do celular para USB-A do teclado). Quase todo teclado com USB funciona sem driver.</li>
<li>Para <b>Bluetooth</b>: um teclado com <b>Bluetooth MIDI (BLE MIDI)</b>, por exemplo a linha Bluetooth da M-Audio, Korg microKEY Air, CME, Roland/Yamaha com Bluetooth MIDI ou adaptadores como o WIDI. Teclado “Bluetooth de áudio” ou de digitação não serve. Você também vai precisar do app gratuito <a href="https://play.google.com/store/apps/details?id=com.mobileer.example.midibtlepairing" target="_blank" rel="noopener"><b>MIDI BLE Connect</b></a>, da Play Store.</li>
</ul>

<h3>1. Pelo cabo USB (mais simples)</h3>
<ol class="passos">
<li>Ligue o teclado no celular com o adaptador OTG. Teclados sem fonte própria tiram energia do celular, e isso é normal.</li>
<li>Se nada acontecer, procure <b>OTG</b> nas Configurações do Android e ative. Alguns Xiaomi, Realme e Oppo desligam o OTG sozinhos depois de alguns minutos.</li>
<li>Abra o MD Tracker e vá em <b>Arquivo → Ligar MIDI</b>. Na primeira vez, o Chrome pede autorização (veja a parte 3).</li>
<li>O nome do teclado aparece em “Conectado: …” e a bolinha ao lado do nome do app fica <b>verde</b>. Ela pisca a cada nota recebida.</li>
</ol>

<h3>2. Pelo Bluetooth (com o MIDI BLE Connect)</h3>
<p class="nota">Parear o teclado nas <b>Configurações → Bluetooth</b> do Android <b>não</b> basta. O Android só entrega um teclado BLE MIDI para os apps depois que algum app abre a conexão MIDI. É isso que o MIDI BLE Connect faz.</p>
<ol class="passos">
<li>Instale o <a href="https://play.google.com/store/apps/details?id=com.mobileer.example.midibtlepairing" target="_blank" rel="noopener"><b>MIDI BLE Connect</b></a> pela Play Store e ligue o Bluetooth do celular.</li>
<li>Ligue o teclado e deixe-o no modo Bluetooth. Em muitos teclados a luz do Bluetooth fica piscando enquanto espera conexão. Se ele estiver conectado a outro aparelho, como um PC ou tablet, desconecte de lá primeiro.</li>
<li>Abra o MIDI BLE Connect e toque em <b>Bluetooth Scan</b>. O Android pede a permissão <b>Dispositivos por perto</b> (em Androids mais antigos, <b>Local</b>): toque em <b>Permitir</b>. Sem ela o app não encontra nada. Nos Androids antigos, a localização do celular também precisa estar ligada durante a busca.</li>
<li>Toque no nome do seu teclado na lista. Se o Android pedir para <b>parear</b>, aceite. Quando aparecer como conectado, pode sair do app com o botão de início. <b>Não feche o app</b> na lista de apps recentes: em alguns celulares isso derruba a conexão.</li>
<li>Abra o MD Tracker no Chrome e toque em <b>Arquivo → Ligar MIDI</b>. Se o MD Tracker já estava aberto antes de conectar e o teclado não aparecer, recarregue a página e ligue o MIDI de novo.</li>
</ol>
<p>Depois que o teclado já foi conectado uma vez, nas próximas vezes basta abrir o MIDI BLE Connect, tocar no teclado da lista e voltar ao MD Tracker.</p>

<h3>3. Autorização do navegador</h3>
<p>Na primeira vez que você toca em <b>Ligar MIDI</b>, o Chrome pergunta se <b>junkatana.github.io</b> pode usar seus <b>dispositivos MIDI</b>. Toque em <b>Permitir</b>. O MD Tracker só <b>lê</b> as notas e não manda nada para o teclado.</p>
<p>Se você tocou em <b>Bloquear</b> sem querer, o botão passa a mostrar “MIDI bloqueado”. Para liberar:</p>
<ol class="passos">
<li>No Chrome, toque no ícone à esquerda do endereço (os controles ou o cadeado) e depois em <b>Permissões</b>, ou em <b>Configurações do site</b>.</li>
<li>Em <b>Dispositivos MIDI</b>, escolha <b>Permitir</b>.</li>
<li>Recarregue a página e toque em <b>Ligar MIDI</b> de novo.</li>
</ol>
<p>Pelo menu também dá: <b>⋮ → Configurações → Configurações do site → Dispositivos MIDI</b>, e lá você tira o site da lista de bloqueados. No app instalado na tela inicial, abra o mesmo endereço no Chrome e faça isso por lá, porque a permissão é a mesma.</p>

<h3>4. Tocando</h3>
<ul>
<li>Sem gravar, o teclado só toca o instrumento escolhido, o que é bom para ensaiar.</li>
<li>Com ${k("●")} ligado, cada nota é escrita no padrão e o cursor desce. <b>Acordes</b> ocupam canais vizinhos: C-E-G vai para FM1, FM2 e FM3.</li>
<li><b>Velocidade vira volume</b>: tocar mais forte escreve um volume maior. Dá para desligar em Arquivo.</li>
<li><b>Program Change</b> (os botões de “programa” do teclado) troca o instrumento.</li>
<li>Se o teclado manda vários canais ao mesmo tempo, escolha um em <b>Canal MIDI</b>.</li>
<li>Na <b>biblioteca de instrumentos</b>, o teclado toca o instrumento que está em teste, o que é ótimo para comparar timbres.</li>
</ul>

<h3>Se não funcionar</h3>
<p><b>“Este navegador não tem Web MIDI”.</b> Você está no Firefox, no Safari ou num navegador embutido de outro app, como o do Instagram ou do WhatsApp. Abra o endereço no Chrome.</p>
<p><b>“Nenhum teclado encontrado”.</b> USB: confira o OTG e teste o adaptador com um pendrive. Bluetooth: veja se o MIDI BLE Connect ainda mostra o teclado como conectado. Depois recarregue a página.</p>
<p><b>O teclado some depois de um tempo.</b> A economia de bateria do Android pode fechar o MIDI BLE Connect. Em <b>Configurações → Apps → MIDI BLE Connect → Bateria</b>, escolha <b>Sem restrições</b>.</p>
<p><b>As notas chegam atrasadas.</b> O Bluetooth tem um pouco de atraso por natureza, e o cabo é sempre mais rápido. Fones Bluetooth somam ainda mais atraso, então prefira fone com fio ou o alto-falante.</p>
<p><b>Toca a oitava errada.</b> Use os botões de oitava do próprio teclado. O MD Tracker escreve exatamente a nota que recebe.</p>`,
      en: `<p>Playing a real keyboard is much faster than tapping the screen. MD Tracker receives notes through the browser's <b>Web MIDI</b>, so any MIDI controller keyboard works, over a cable or over Bluetooth.</p>
<h3>What you need</h3>
<ul>
<li><b>Chrome on Android</b>. Firefox and iPhone Safari have no Web MIDI. The app installed on the home screen also works, because it runs on Chrome.</li>
<li>For a <b>cable</b>: an <b>OTG</b> adapter (the phone's USB-C or micro-USB to the keyboard's USB-A). Almost every USB keyboard works without a driver.</li>
<li>For <b>Bluetooth</b>: a keyboard with <b>Bluetooth MIDI (BLE MIDI)</b>, for example M-Audio's Bluetooth line, Korg microKEY Air, CME, Roland/Yamaha with Bluetooth MIDI, or adapters like WIDI. “Bluetooth audio” or typing keyboards won't do. You'll also need the free <a href="https://play.google.com/store/apps/details?id=com.mobileer.example.midibtlepairing" target="_blank" rel="noopener"><b>MIDI BLE Connect</b></a> app from the Play Store.</li>
</ul>

<h3>1. Over USB (simplest)</h3>
<ol class="passos">
<li>Connect the keyboard to the phone with the OTG adapter. Keyboards without their own power supply draw power from the phone, and that's normal.</li>
<li>If nothing happens, search for <b>OTG</b> in Android Settings and turn it on. Some Xiaomi, Realme and Oppo phones switch OTG off by themselves after a few minutes.</li>
<li>Open MD Tracker and go to <b>Arquivo → Ligar MIDI</b> (File → Turn on MIDI). The first time, Chrome asks for permission (see part 3).</li>
<li>The keyboard's name shows up under “Conectado: …” and the dot next to the app name turns <b>green</b>. It blinks on every note received.</li>
</ol>

<h3>2. Over Bluetooth (with MIDI BLE Connect)</h3>
<p class="nota">Pairing the keyboard in Android's <b>Settings → Bluetooth</b> is <b>not</b> enough. Android only hands a BLE MIDI keyboard to apps after some app opens the MIDI connection. That's what MIDI BLE Connect does.</p>
<ol class="passos">
<li>Install <a href="https://play.google.com/store/apps/details?id=com.mobileer.example.midibtlepairing" target="_blank" rel="noopener"><b>MIDI BLE Connect</b></a> from the Play Store and turn on the phone's Bluetooth.</li>
<li>Turn the keyboard on in Bluetooth mode. On many keyboards the Bluetooth light blinks while it waits for a connection. If it's connected to another device, like a PC or tablet, disconnect it there first.</li>
<li>Open MIDI BLE Connect and tap <b>Bluetooth Scan</b>. Android asks for the <b>Nearby devices</b> permission (<b>Location</b> on older Androids): tap <b>Allow</b>. Without it the app finds nothing. On older Androids, location must also be switched on during the scan.</li>
<li>Tap your keyboard's name in the list. If Android asks to <b>pair</b>, accept. Once it shows as connected, leave the app with the home button. <b>Don't swipe it away</b> in recent apps: on some phones that drops the connection.</li>
<li>Open MD Tracker in Chrome and tap <b>Arquivo → Ligar MIDI</b>. If MD Tracker was already open before you connected and the keyboard doesn't show up, reload the page and turn MIDI on again.</li>
</ol>
<p>After the keyboard has been connected once, next time just open MIDI BLE Connect, tap the keyboard in the list and go back to MD Tracker.</p>

<h3>3. Browser permission</h3>
<p>The first time you tap <b>Ligar MIDI</b>, Chrome asks whether <b>junkatana.github.io</b> may use your <b>MIDI devices</b>. Tap <b>Allow</b>. MD Tracker only <b>reads</b> notes and sends nothing to the keyboard.</p>
<p>If you tapped <b>Block</b> by mistake, the button shows “MIDI bloqueado” (MIDI blocked). To allow it again:</p>
<ol class="passos">
<li>In Chrome, tap the icon left of the address (the controls or the padlock), then <b>Permissions</b> or <b>Site settings</b>.</li>
<li>Under <b>MIDI devices</b>, choose <b>Allow</b>.</li>
<li>Reload the page and tap <b>Ligar MIDI</b> again.</li>
</ol>
<p>You can also go through the menu: <b>⋮ → Settings → Site settings → MIDI devices</b>, and remove the site from the blocked list. For the app installed on the home screen, open the same address in Chrome and do it there, because the permission is shared.</p>

<h3>4. Playing</h3>
<ul>
<li>When not recording, the keyboard just plays the chosen instrument, which is good for practising.</li>
<li>With ${k("●")} on, every note is written into the pattern and the cursor moves down. <b>Chords</b> use neighbouring channels: C-E-G goes to FM1, FM2 and FM3.</li>
<li><b>Velocity becomes volume</b>: playing harder writes a higher volume. You can turn this off in Arquivo (File).</li>
<li><b>Program Change</b> (the keyboard's “program” buttons) switches instruments.</li>
<li>If your keyboard sends on several channels at once, pick one under <b>Canal MIDI</b> (MIDI channel).</li>
<li>In the <b>instrument library</b>, the keyboard plays the instrument being previewed, which is great for comparing sounds.</li>
</ul>

<h3>If it doesn't work</h3>
<p><b>“Este navegador não tem Web MIDI” (no Web MIDI).</b> You're in Firefox, Safari, or another app's built-in browser, like Instagram's or WhatsApp's. Open the address in Chrome.</p>
<p><b>“Nenhum teclado encontrado” (no keyboard found).</b> USB: check OTG and test the adapter with a flash drive. Bluetooth: check that MIDI BLE Connect still shows the keyboard as connected. Then reload the page.</p>
<p><b>The keyboard disappears after a while.</b> Android's battery saver may be closing MIDI BLE Connect. In <b>Settings → Apps → MIDI BLE Connect → Battery</b>, choose <b>Unrestricted</b>.</p>
<p><b>Notes arrive late.</b> Bluetooth always adds a little delay, and a cable is always faster. Bluetooth headphones add even more delay, so use wired headphones or the speaker.</p>
<p><b>Wrong octave.</b> Use the keyboard's own octave buttons. MD Tracker writes exactly the note it receives.</p>`
    }
  },
  {
    id: "dicas",
    titulo: { pt: "Dicas para soar Mega Drive", en: "Tips for that Mega Drive sound" },
    html: {
      pt: `<ul>
<li><b>Divida os papéis</b>: baixo FM forte em FM1, melodia em FM2, acordes e metais em FM3–FM5, bateria FM ou samples em FM6. Deixe o PSG para chimbal, ecos e brilho.</li>
<li><b>Eco falso</b>: copie a melodia para um canal SQ, atrase 3 linhas e abaixe o volume. É um truque muito usado nos jogos da época.</li>
<li><b>Baixo marcante</b>: algoritmo 0–4, FB alto e moduladora com DR rápido dão aquele ataque “estalado”.</li>
<li><b>Bateria</b>: misture bumbo e caixa FM com chimbal no canal RUÍDO. A caixa fica mais gorda com os dois juntos na mesma linha.</li>
<li><b>Vibrato</b> (<code>04xy</code>) com valores baixos, como <code>04 24</code>, deixa notas longas mais vivas.</li>
<li><b>Salve um .dmf</b> de vez em quando. A música fica no navegador, e limpar os dados do navegador apaga tudo.</li>
</ul>
<h3>Perguntas rápidas</h3>
<p><b>Não sai som.</b> Toque na tela uma vez (os navegadores exigem isso) e confira se o celular não está no silencioso.</p>
<p><b>Apaguei sem querer.</b> ${k("↶")} desfaz.</p>
<p><b>Dá para usar samples de voz/bateria?</b> Sim, no FM6 com o efeito <code>17 01</code>. Por enquanto os samples precisam vir de um <code>.dmf</code>.</p>
<p><b>Funciona no iPhone?</b> O app foi feito pensando no Chrome do Android. No iPhone o MIDI não funciona, porque o Safari não tem Web MIDI.</p>`,
      en: `<ul>
<li><b>Split the roles</b>: a punchy FM bass on FM1, the melody on FM2, chords and brass on FM3–FM5, FM drums or samples on FM6. Leave the PSG for hi-hats, echoes and sparkle.</li>
<li><b>Fake echo</b>: copy the melody to an SQ channel, delay it by 3 rows and lower the volume. Games of the era used this trick all the time.</li>
<li><b>A bass that cuts through</b>: algorithm 0–4, high FB and a modulator with a fast DR give that snappy attack.</li>
<li><b>Drums</b>: mix FM kick and snare with hi-hats on the NOISE channel. Snares sound fatter with both on the same row.</li>
<li><b>Vibrato</b> (<code>04xy</code>) with low values, like <code>04 24</code>, brings long notes to life.</li>
<li><b>Save a .dmf</b> now and then. The song lives in the browser, and clearing browser data wipes it.</li>
</ul>
<h3>Quick questions</h3>
<p><b>No sound.</b> Tap the screen once (browsers require it) and check that the phone isn't on silent.</p>
<p><b>I deleted something by mistake.</b> ${k("↶")} undoes it.</p>
<p><b>Can I use voice/drum samples?</b> Yes, on FM6 with effect <code>17 01</code>. For now the samples have to come from a <code>.dmf</code>.</p>
<p><b>Does it work on iPhone?</b> The app was made with Chrome on Android in mind. MIDI won't work on iPhone, because Safari has no Web MIDI.</p>`
    }
  }
];

const sumario = document.getElementById("sumario");
const area = document.getElementById("licoes");

function figura(img, legenda) {
  const fig = el("figure", "tut-fig");
  const b = el("button", "tut-tela");
  b.type = "button";
  const i = document.createElement("img");
  i.src = "img/md-tracker/" + img; i.alt = tr(legenda) || ""; i.loading = "lazy"; i.width = 400; i.height = 820;
  b.appendChild(i);
  b.addEventListener("click", () => {
    const caixa = document.getElementById("ampliada");
    caixa.querySelector("img").src = i.src; caixa.querySelector("img").alt = i.alt;
    caixa.querySelector("p").textContent = i.alt; caixa.showModal();
  });
  fig.appendChild(b);
  if (legenda) fig.appendChild(el("figcaption", null, tr(legenda)));
  return fig;
}

function desenhar() {
  document.title = t("tut_titulo") + " — Junkatana";
  document.querySelector(".voltar").href = "index.html?lang=" + LINGUA;
  document.getElementById("link-projeto").href = "projeto.html?id=md-tracker&lang=" + LINGUA;
  sumario.replaceChildren(); area.replaceChildren();
  LICOES.forEach((l, n) => {
    const li = el("li"); const a = el("a", null, tr(l.titulo)); a.href = "#" + l.id; li.appendChild(a); sumario.appendChild(li);
    const s = el("section", "licao janela" + (l.img ? " com-fig" : ""));
    s.id = l.id;
    const cab = el("div", "licao-cabeca");
    cab.appendChild(el("span", "licao-num", t("tut_licao") + " " + (n + 1)));
    cab.appendChild(el("h2", null, tr(l.titulo)));
    s.appendChild(cab);
    const corpo = el("div", "licao-corpo");
    const texto = el("div", "licao-texto");
    texto.innerHTML = tr(l.html);
    corpo.appendChild(texto);
    if (l.img) {
      const lado = el("div", "licao-figs");
      lado.appendChild(figura(l.img, l.legenda));
      if (l.img2) lado.appendChild(figura(l.img2, l.legenda2));
      corpo.appendChild(lado);
    }
    s.appendChild(corpo);
    area.appendChild(s);
  });
  if (location.hash) { const alvo = document.getElementById(location.hash.slice(1)); if (alvo) alvo.scrollIntoView(); }
}

document.getElementById("ampliada").addEventListener("click", e => e.currentTarget.close());
iniciarLingua(desenhar);
