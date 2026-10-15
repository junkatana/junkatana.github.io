// Textos fixos do site nas duas línguas e funções usadas pelas duas páginas.

const TEXTOS = {
  pt: {
    saudacao: "Olá, viajante! Eu levo jogos clássicos para outros consoles, crio romhacks e ferramentas de emulação. Escolha um projeto abaixo.",
    historia: "História",
    historia_intro: "Junkatana é programador há mais de 15 anos. A paixão por videogames começou cedo e nunca mais foi embora.",
    historia_marcos: [
      ["Aos 7 anos", "Ganhou um Turbo Game da CCE e foi amor à primeira vista. Desde pequeno, já sonhava em ser programador."],
      ["1998", "Nascido em um lar muito pobre, ter um computador parecia impossível: era caro demais. Até que um desconhecido, ao perceber a vontade dele de mexer com tecnologia, lhe deu de presente um i386. A máquina já era antiga para a época e mal dava conta, mas foi nela, pelo MS-DOS, que ele emulou pela primeira vez jogos de NES e Mega Drive. Pouco depois, evoluiu para um i486."],
      ["2007", "Começou no romhacking e lançou projetos independentes, como a tradução de Teenage Mutant Ninja Turtles III para o NES, além de algumas ferramentas. Muitos desses trabalhos se perderam com o tempo. O que ficou registrado, na antiga plataforma PO.B.R.E, foi a tradução de Solstice para o NES, um jogo que ele adorava e um dos projetos aos quais mais se dedicou."],
      ["Era PSP", "Seguiu com hacks, traduções e ferramentas para o PSP, que hoje também se perderam."],
      ["Hoje", "Depois de anos dedicados aos estudos, à carreira e a enfrentar vários problemas na vida, decidiu voltar. Agora, com a ajuda da inteligência artificial, traz novidades para a cena do romhacking."]
    ],
    projetos: "Projetos",
    sobre: "Sobre",
    todos: "Todos",
    filtro_port: "Ports",
    filtro_traducao: "Traduções",
    filtro_romhack: "Romhacks",
    filtro_emulador: "Emuladores",
    vazio: "Nenhum projeto nesta categoria ainda.",
    sobre_texto: "Aqui ficam os projetos em que estou trabalhando: jogos levados de uma plataforma para outra, traduções, modificações em jogos clássicos e ferramentas para quem gosta de emulação.",
    aviso: "Os arquivos disponibilizados são patches. Para jogar, aplique o patch na sua própria cópia original do jogo (por exemplo, com o Rom Patcher JS).",
    rodape: "Projetos de fã, sem fins lucrativos. Todos os jogos pertencem aos seus donos.",
    ver: "Ver projeto",
    voltar: "← Voltar aos projetos",
    destaques: "Destaques",
    galeria: "Imagens",
    video: "Vídeo",
    links: "Links",
    plataforma: "Plataforma",
    tipo: "Tipo",
    status: "Situação",
    versao: "Versão",
    requer: "Aplique na ROM original:",
    como_aplicar: "Como aplicar: abra o Rom Patcher JS, escolha a ROM e o arquivo IPS e clique em Apply patch.",
    nao_encontrado: "Projeto não encontrado.",
    tipo_port: "Port",
    tipo_traducao: "Tradução",
    tipo_romhack: "Romhack",
    tipo_emulador: "Emulador",
    status_concluido: "Concluído",
    "status_em-andamento": "Em andamento",
    status_pausado: "Pausado"
  },
  en: {
    saudacao: "Greetings, traveler! I bring classic games to other consoles and make romhacks and emulation tools. Choose a project below.",
    historia: "Story",
    historia_intro: "Junkatana has been a programmer for over 15 years. His passion for video games started early and never left.",
    historia_marcos: [
      ["Age 7", "He got a Turbo Game by CCE, a Brazilian NES clone, and it was love at first sight. Since he was a kid, he dreamed of becoming a programmer."],
      ["1998", "Born into a very poor family, owning a computer seemed impossible: it was far too expensive. Then a stranger, seeing how eager he was to work with technology, gave him an i386 as a gift. The machine was already old for its time and could barely keep up, but that is where, under MS-DOS, he first emulated NES and Mega Drive games. Soon after, he moved up to an i486."],
      ["2007", "He got into romhacking and released independent projects, such as a Brazilian Portuguese translation of Teenage Mutant Ninja Turtles III for the NES, plus a few tools. Many of those works were lost over time. The one still on record, on the old PO.B.R.E platform, is his translation of Solstice for the NES, a game he loved and one of the projects he put the most into."],
      ["PSP era", "He went on making hacks, translations and tools for the PSP, which have since been lost as well."],
      ["Today", "After years devoted to his studies, his career and getting through many hardships in life, he decided to come back. Now, with the help of artificial intelligence, he is bringing new things to the romhacking scene."]
    ],
    projetos: "Projects",
    sobre: "About",
    todos: "All",
    filtro_port: "Ports",
    filtro_traducao: "Translations",
    filtro_romhack: "Romhacks",
    filtro_emulador: "Emulators",
    vazio: "No projects in this category yet.",
    sobre_texto: "These are the projects I'm working on: games brought from one platform to another, translations, modifications of classic games and tools for emulation fans.",
    aviso: "Downloads are patches only. To play, apply the patch to your own original copy of the game (for example with Rom Patcher JS).",
    rodape: "Non-profit fan projects. All games belong to their respective owners.",
    ver: "View project",
    voltar: "← Back to projects",
    destaques: "Highlights",
    galeria: "Screenshots",
    video: "Video",
    links: "Links",
    plataforma: "Platform",
    tipo: "Type",
    status: "Status",
    versao: "Version",
    requer: "Apply to the original ROM:",
    como_aplicar: "How to apply: open Rom Patcher JS, pick the ROM and the IPS file and click Apply patch.",
    nao_encontrado: "Project not found.",
    tipo_port: "Port",
    tipo_traducao: "Translation",
    tipo_romhack: "Romhack",
    tipo_emulador: "Emulator",
    status_concluido: "Finished",
    "status_em-andamento": "In progress",
    status_pausado: "On hold"
  }
};

// Língua: ?lang=en na URL > escolha salva > língua do navegador.
function linguaInicial() {
  const daUrl = new URLSearchParams(location.search).get("lang");
  if (daUrl === "pt" || daUrl === "en") return daUrl;
  try {
    const salva = localStorage.getItem("lingua");
    if (salva === "pt" || salva === "en") return salva;
  } catch (e) {}
  return (navigator.language || "en").toLowerCase().startsWith("pt") ? "pt" : "en";
}

let LINGUA = linguaInicial();

function t(chave) {
  return TEXTOS[LINGUA][chave] || chave;
}

// Escolhe a versão certa de um texto { pt, en } (ou devolve o texto como está).
function tr(valor) {
  if (valor && typeof valor === "object" && !Array.isArray(valor)) return valor[LINGUA] || valor.pt;
  return valor;
}

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto != null) e.textContent = texto;
  return e;
}

const CLASSE_CONSOLE = {
  "Super Nintendo": "snes",
  "Mega Drive": "md",
  "Master System": "sms",
  "Amiga": "amiga",
  "Game Boy Advance": "gba",
  "MSX": "msx"
};

// "Super Nintendo → Mega Drive" como duas etiquetas de console.
function plataforma(p) {
  const box = el("p", "plataforma");
  const consoles = p.de === p.para || !p.para ? [p.de] : [p.de, p.para];
  consoles.forEach((nome, i) => {
    if (i) box.appendChild(el("span", "seta-console", "▶"));
    box.appendChild(el("span", "console " + (CLASSE_CONSOLE[nome] || "outro"), nome));
  });
  return box;
}

function etiquetas(p) {
  const box = el("div", "etiquetas");
  box.appendChild(el("span", "etiqueta tipo-" + p.tipo, t("tipo_" + p.tipo)));
  box.appendChild(el("span", "etiqueta status-" + p.status, t("status_" + p.status)));
  return box;
}

// Preenche os elementos marcados com data-t e liga os botões de língua.
function iniciarLingua(redesenhar) {
  function aplicar() {
    document.documentElement.lang = LINGUA === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-t]").forEach(e => { e.textContent = t(e.dataset.t); });
    document.querySelectorAll(".lingua button").forEach(b => {
      b.classList.toggle("ativo", b.dataset.lingua === LINGUA);
    });
    redesenhar();
  }
  document.querySelectorAll(".lingua button").forEach(b => {
    b.addEventListener("click", () => {
      LINGUA = b.dataset.lingua;
      try { localStorage.setItem("lingua", LINGUA); } catch (e) {}
      const url = new URL(location.href);
      url.searchParams.set("lang", LINGUA);
      history.replaceState(null, "", url);
      aplicar();
    });
  });
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
  aplicar();
}
