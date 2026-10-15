// ============================================================
//  LISTA DE PROJETOS — é só editar este arquivo para atualizar o site.
//
//  Campos de cada projeto:
//    titulo     nome do jogo
//    tipo       "port", "traducao" ou "romhack"
//    de / para  plataforma de origem e de destino (para traduções/romhacks
//               pode deixar "para" igual a "de")
//    status     "concluido", "em-andamento" ou "pausado"
//    resumo     uma ou duas frases
//    imagem     caminho dentro da pasta img/ (opcional)
//    links      lista de { texto, url } — downloads, vídeos, patches etc.
//
//  Dica: distribua só PATCHES (.ips/.bps), nunca a ROM do jogo.
// ============================================================

const PROJETOS = [
  {
    titulo: "Dragon Quest III",
    tipo: "port",
    de: "Super Nintendo",
    para: "Mega Drive",
    status: "em-andamento",
    resumo: "Port do remake de SNES para o Mega Drive, com cenários, batalhas e músicas refeitos para o hardware da Sega.",
    imagem: "img/dq3.png",
    links: []
  },
  {
    titulo: "Final Fantasy I",
    tipo: "port",
    de: "Game Boy Advance",
    para: "Mega Drive",
    status: "em-andamento",
    resumo: "Port da versão Dawn of Souls para o Mega Drive, desenvolvido em etapas.",
    imagem: "",
    links: []
  },
  {
    titulo: "Magical Tree",
    tipo: "port",
    de: "MSX",
    para: "Master System",
    status: "concluido",
    resumo: "Port completo do clássico da Konami, em duas variantes: modo 4 nativo do Master System e modo TMS.",
    imagem: "",
    links: []
  },
  {
    titulo: "Dogs of War",
    tipo: "port",
    de: "Amiga",
    para: "Mega Drive",
    status: "em-andamento",
    resumo: "Port do jogo de ação da Elite (1989) para o Mega Drive, com suporte a controle de 6 botões.",
    imagem: "",
    links: []
  },
  {
    titulo: "Phantasy Star — minimapa",
    tipo: "romhack",
    de: "Master System",
    para: "Master System",
    status: "concluido",
    resumo: "Minimapa automático nas dungeons, feito em código Z80 dentro da própria ROM. Funciona em emulador e no console.",
    imagem: "",
    links: []
  },
  {
    titulo: "Shining in the Darkness — minimapa",
    tipo: "romhack",
    de: "Mega Drive",
    para: "Mega Drive",
    status: "concluido",
    resumo: "Minimapa nativo nas dungeons, com portas e baús marcados. Versões em português e inglês.",
    imagem: "",
    links: []
  },
  {
    titulo: "Phantasy Star",
    tipo: "port",
    de: "Master System",
    para: "Mega Drive",
    status: "em-andamento",
    resumo: "Port do primeiro Phantasy Star para o Mega Drive.",
    imagem: "",
    links: []
  }
];
