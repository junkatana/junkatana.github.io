// Textos fixos do site nas duas línguas e funções usadas pelas duas páginas.

const TEXTOS = {
  pt: {
    saudacao: "Olá, viajante! Eu levo jogos clássicos para outros consoles, crio romhacks e ferramentas de emulação. Escolha um projeto abaixo.",
    historia: "História",
        projetos: "Projetos",
    sobre: "Sobre",
    todos: "Todos",
    filtro_port: "Ports",
    filtro_traducao: "Traduções",
    filtro_romhack: "Romhacks",
    filtro_emulador: "Emuladores",
    filtro_ferramenta: "Ferramentas",
    vazio: "Nenhum projeto nesta categoria ainda.",
    sobre_texto: "Aqui ficam os projetos em que estou trabalhando: jogos levados de uma plataforma para outra, traduções, modificações em jogos clássicos e ferramentas para quem gosta de emulação.",
    aviso: "Os arquivos disponibilizados são patches. Para jogar, aplique o patch na sua própria cópia original do jogo (por exemplo, com o Rom Patcher JS).",
    rodape: "Projetos de fã, sem fins lucrativos. Todos os jogos pertencem aos seus donos.",
    ver: "Ver projeto",
    fase: "Fase",
    continua: "Continua...",
    ver_projetos: "Ver os projetos",
    historia_titulo: "Do Turbo Game à IA",
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
    tipo_ferramenta: "Ferramenta",
    status_concluido: "Concluído",
    "status_em-andamento": "Em andamento",
    status_pausado: "Pausado",
    tut_titulo: "Tutorial do MD Tracker",
    tut_intro: "Tudo o que você precisa para compor música de Mega Drive no celular: das primeiras notas até o arquivo pronto para tocar no seu jogo.",
    tut_abrir: "Abrir o MD Tracker",
    tut_projeto: "Página do projeto",
    tut_sumario: "Lições",
    tut_licao: "Lição",
    tut_fim: "Agora é com você. Bom som!"
  },
  en: {
    saudacao: "Greetings, traveler! I bring classic games to other consoles and make romhacks and emulation tools. Choose a project below.",
    historia: "Story",
        projetos: "Projects",
    sobre: "About",
    todos: "All",
    filtro_port: "Ports",
    filtro_traducao: "Translations",
    filtro_romhack: "Romhacks",
    filtro_emulador: "Emulators",
    filtro_ferramenta: "Tools",
    vazio: "No projects in this category yet.",
    sobre_texto: "These are the projects I'm working on: games brought from one platform to another, translations, modifications of classic games and tools for emulation fans.",
    aviso: "Downloads are patches only. To play, apply the patch to your own original copy of the game (for example with Rom Patcher JS).",
    rodape: "Non-profit fan projects. All games belong to their respective owners.",
    ver: "View project",
    fase: "Stage",
    continua: "To be continued...",
    ver_projetos: "See the projects",
    historia_titulo: "From a Turbo Game to AI",
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
    tipo_ferramenta: "Tool",
    status_concluido: "Finished",
    "status_em-andamento": "In progress",
    status_pausado: "On hold",
    tut_titulo: "MD Tracker Tutorial",
    tut_intro: "Everything you need to compose Mega Drive music on your phone: from your first notes to a file that plays in your own game.",
    tut_abrir: "Open MD Tracker",
    tut_projeto: "Project page",
    tut_sumario: "Lessons",
    tut_licao: "Lesson",
    tut_fim: "Now it's your turn. Have fun!"
  }
};

// Fusos horários do Brasil. Quem está no Brasil vê o site em português; o resto, em inglês.
const FUSOS_BRASIL = [
  "America/Sao_Paulo", "America/Araguaina", "America/Bahia", "America/Belem",
  "America/Boa_Vista", "America/Campo_Grande", "America/Cuiaba", "America/Eirunepe",
  "America/Fortaleza", "America/Maceio", "America/Manaus", "America/Noronha",
  "America/Porto_Velho", "America/Recife", "America/Rio_Branco", "America/Santarem",
  "America/Porto_Acre", "Brazil/Acre", "Brazil/DeNoronha", "Brazil/East", "Brazil/West"
];

function estaNoBrasil() {
  try {
    return FUSOS_BRASIL.includes(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch (e) {
    return (navigator.language || "").toLowerCase() === "pt-br";
  }
}

// Língua: ?lang=en na URL > escolha feita nos botões PT/EN > Brasil ou não.
function linguaInicial() {
  const daUrl = new URLSearchParams(location.search).get("lang");
  if (daUrl === "pt" || daUrl === "en") return daUrl;
  try {
    const salva = localStorage.getItem("lingua");
    if (salva === "pt" || salva === "en") return salva;
  } catch (e) {}
  return estaNoBrasil() ? "pt" : "en";
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
  "MSX": "msx",
  "NES": "nes",
  "Celular / PC": "web",
  "Phone / PC": "web"
};

// "Super Nintendo → Mega Drive" como duas etiquetas de console.
function plataforma(p) {
  const box = el("p", "plataforma");
  const de = tr(p.de), para = tr(p.para);
  const consoles = de === para || !para ? [de] : [de, para];
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
