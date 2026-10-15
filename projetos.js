// ============================================================
//  LISTA DE PROJETOS — é só editar este arquivo para atualizar o site.
//
//  Todo texto tem duas versões: { pt: "...", en: "..." }.
//
//  Campos de cada projeto:
//    id         nome curto, usado no endereço: projeto.html?id=<id>
//    titulo     nome do jogo
//    tipo       "port", "traducao", "romhack" ou "emulador"
//    de / para  plataforma de origem e de destino
//    status     "concluido", "em-andamento" ou "pausado"
//    capa       imagem do cartão na página inicial
//    resumo     uma ou duas frases (aparece no cartão)
//    texto      parágrafos da página do projeto (lista)
//    destaques  lista de itens com os pontos principais
//    video      arquivo .mp4 (opcional)
//    galeria    lista de { img, legenda }
//    links      lista de { texto, url }
//    versao     versão do patch para download (opcional)
//    requer     ROM original necessária para aplicar o patch (opcional)
//
//  Dica: distribua só PATCHES (.ips/.bps), nunca a ROM do jogo.
// ============================================================

const PROJETOS = [
  {
    id: "dragon-quest-3",
    titulo: "Dragon Quest III",
    tipo: "port",
    de: "Super Nintendo",
    para: "Mega Drive",
    status: "em-andamento",
    capa: "img/dq3/aliahan.png",
    resumo: {
      pt: "Port do remake de SNES para o Mega Drive, com cenários, batalhas e músicas refeitos para o hardware da Sega.",
      en: "Port of the SNES remake to the Mega Drive, with maps, battles and music rebuilt for Sega's hardware."
    },
    texto: {
      pt: [
        "Dragon Quest III é um dos RPGs mais importantes da história, e o remake de Super Nintendo nunca saiu para o Mega Drive. Este projeto leva o jogo inteiro para o console da Sega, feito para o hardware original.",
        "O código do jogo foi traduzido do processador do SNES (65816) para o do Mega Drive (68000). Os gráficos foram convertidos para a paleta e os limites de cor do Mega Drive, e as músicas foram refeitas para o chip de som FM (YM2612).",
        "Cada cidade, castelo e dungeon é conferido lado a lado com o original: portas, baús, diálogos, eventos e os ciclos de dia e noite."
      ],
      en: [
        "Dragon Quest III is one of the most important RPGs ever made, and its Super Nintendo remake never came to the Mega Drive. This project brings the whole game to Sega's console, made for the original hardware.",
        "The game code was translated from the SNES processor (65816) to the Mega Drive's (68000). Graphics were converted to the Mega Drive palette and colour limits, and the music was rearranged for the FM sound chip (YM2612).",
        "Every town, castle and dungeon is checked side by side with the original: doors, chests, dialogue, events and the day/night cycle."
      ]
    },
    destaques: {
      pt: ["Feito para o hardware do Mega Drive", "Gráficos convertidos para a paleta do Mega Drive", "Músicas refeitas em FM", "Ciclo de dia e noite, lojas, igrejas, batalhas e magias"],
      en: ["Made for the Mega Drive hardware", "Graphics converted to the Mega Drive palette", "Music rearranged for FM", "Day/night cycle, shops, churches, battles and spells"]
    },
    galeria: [
      { img: "img/dq3/titulo.png", legenda: { pt: "Tela de título", en: "Title screen" } },
      { img: "img/dq3/aliahan.png", legenda: { pt: "Aliahan, a cidade inicial", en: "Aliahan, the starting town" } },
      { img: "img/dq3/dialogo.png", legenda: { pt: "Diálogo com os moradores", en: "Talking to the townspeople" } },
      { img: "img/dq3/interior.png", legenda: { pt: "Interior de uma casa", en: "Inside a house" } },
      { img: "img/dq3/campo.png", legenda: { pt: "Mapa do mundo", en: "World map" } },
      { img: "img/dq3/torre.png", legenda: { pt: "Torre de Shampane", en: "Shampane Tower" } },
      { img: "img/dq3/batalha.png", legenda: { pt: "Batalha na floresta", en: "Forest battle" } },
      { img: "img/dq3/comparacao.png", legenda: { pt: "Super Nintendo e Mega Drive lado a lado", en: "Super Nintendo and Mega Drive side by side" } }
    ],
    links: [
      { texto: { pt: "Acompanhe no YouTube", en: "Follow on YouTube" }, url: "https://www.youtube.com/@junkatana" }
    ]
  },
  {
    id: "dogs-of-war",
    titulo: "Dogs of War",
    tipo: "port",
    de: "Amiga",
    para: "Mega Drive",
    status: "em-andamento",
    capa: "img/dogs-of-war/jogo-46.jpg",
    resumo: {
      pt: "Port do jogo de ação da Elite (1989) para o Mega Drive, com modo para 2 jogadores e suporte a controle de 6 botões.",
      en: "Port of Elite's 1989 action game to the Mega Drive, with 2-player co-op and 6-button controller support."
    },
    texto: {
      pt: [
        "Dogs of War é um jogo de ação de cima para baixo lançado pela Elite em 1989 para Amiga. Você é um mercenário que escolhe missões no mapa-múndi, compra armas e munição e parte para o combate, sozinho ou com um amigo.",
        "O port tem um motor próprio escrito em C e assembly 68000, com som tocado pelo Z80. Fases, armas, preços, pontuação e bônus seguem o código do Amiga, conferidos quadro a quadro com o original rodando lado a lado."
      ],
      en: [
        "Dogs of War is a top-down action game released by Elite in 1989 for the Amiga. You are a mercenary who picks missions on a world map, buys weapons and ammo and heads into battle, alone or with a friend.",
        "The port runs on its own engine written in C and 68000 assembly, with sound played by the Z80. Levels, weapons, prices, scoring and bonuses follow the Amiga code, checked frame by frame against the original running side by side."
      ]
    },
    destaques: {
      pt: ["Modo cooperativo para 2 jogadores", "Controle de 6 botões", "Mapa de missões e loja de armas do original", "Funciona em consoles NTSC e PAL"],
      en: ["2-player co-op mode", "6-button controller support", "Original mission map and weapon shop", "Works on NTSC and PAL consoles"]
    },
    video: "img/dogs-of-war/gameplay.mp4",
    galeria: [
      { img: "img/dogs-of-war/opening-ntsc.png", legenda: { pt: "Abertura", en: "Opening" } },
      { img: "img/dogs-of-war/mapa-marcador.gif", legenda: { pt: "Escolha da missão", en: "Mission select" } },
      { img: "img/dogs-of-war/selecao-de-armas.png", legenda: { pt: "Loja de armas", en: "Weapon shop" } },
      { img: "img/dogs-of-war/jogo-18.jpg", legenda: { pt: "Início da missão", en: "Mission start" } },
      { img: "img/dogs-of-war/jogo-34.jpg", legenda: { pt: "Avançando pelo cenário", en: "Moving through the level" } },
      { img: "img/dogs-of-war/jogo-60.jpg", legenda: { pt: "Combate", en: "Combat" } },
      { img: "img/dogs-of-war/mission-complete-ntsc-coop-2.png", legenda: { pt: "Dois jogadores", en: "Two players" } }
    ],
    links: [
      { texto: { pt: "Acompanhe no YouTube", en: "Follow on YouTube" }, url: "https://www.youtube.com/@junkatana" }
    ]
  },
  {
    id: "shining-in-the-darkness",
    titulo: "Shining in the Darkness — Map Hack",
    tipo: "romhack",
    de: "Mega Drive",
    para: "Mega Drive",
    status: "concluido",
    capa: "img/shining/bau.png",
    resumo: {
      pt: "Minimapa nativo nas dungeons, com portas e baús marcados. Versões em português e inglês.",
      en: "A native minimap in the dungeons, with doors and chests marked. Portuguese and English versions."
    },
    texto: {
      pt: [
        "Shining in the Darkness é um RPG em primeira pessoa, e se perder nos labirintos faz parte do jogo, mas pode ser cansativo. Este hack adiciona um minimapa que se desenha sozinho conforme você anda.",
        "O minimapa está dentro da própria ROM, escrito em código 68000 e desenhado pelo VDP do Mega Drive. Não depende de plugins nem de programas extras, e foi testado nos emuladores Genesis Plus GX e BlastEm."
      ],
      en: [
        "Shining in the Darkness is a first-person RPG, and getting lost in its mazes is part of the game, but it can get tiring. This hack adds a minimap that draws itself as you walk.",
        "The minimap lives inside the ROM itself, written in 68000 code and drawn by the Mega Drive's VDP. It needs no plugins or extra software, and was tested on the Genesis Plus GX and BlastEm emulators."
      ]
    },
    destaques: {
      pt: ["Aparece só durante a exploração e some em menus e batalhas", "Caminhos já percorridos em cinza, sua posição em amarelo", "Portas em branco e baús em dourado", "Versões para a ROM brasileira (MAPA) e americana/europeia (MAP)"],
      en: ["Shows only while exploring and hides in menus and battles", "Explored paths in grey, your position in yellow", "Doors in white and chests in gold", "Versions for the Brazilian ROM (MAPA) and the US/European ROM (MAP)"]
    },
    galeria: [
      { img: "img/shining/bau.png", legenda: { pt: "Minimapa ao lado da visão em primeira pessoa", en: "Minimap next to the first-person view" } },
      { img: "img/shining/mapa.png", legenda: { pt: "Borda do mapa e objetos", en: "Map border and objects" } },
      { img: "img/shining/map-en.png", legenda: { pt: "Versão em inglês", en: "English version" } },
      { img: "img/shining/menu.png", legenda: { pt: "O minimapa some nos menus", en: "The minimap hides in menus" } }
    ],
    links: [
      { texto: { pt: "Baixar IPS (ROM brasileira)", en: "Download IPS (Brazilian ROM)" }, url: "downloads/shining-in-the-darkness-map-hack-1.3-br.ips" },
      { texto: { pt: "Baixar IPS (ROM USA/Europa)", en: "Download IPS (USA/Europe ROM)" }, url: "downloads/shining-in-the-darkness-map-hack-1.3-us.ips" }
    ],
    versao: "1.3",
    requer: {
      pt: ["Shining in the Darkness (Brazil) — CRC32 3EE2BBC4", "Shining in the Darkness (USA, Europe) — CRC32 4D2785BC"],
      en: ["Shining in the Darkness (Brazil) — CRC32 3EE2BBC4", "Shining in the Darkness (USA, Europe) — CRC32 4D2785BC"]
    }
  },
  {
    id: "phantasy-star",
    titulo: "Phantasy Star — Map Hack",
    tipo: "romhack",
    de: "Master System",
    para: "Master System",
    status: "concluido",
    capa: "img/phantasy-star/porta-patch.png",
    resumo: {
      pt: "Minimapa automático nas dungeons, feito em código Z80 dentro da própria ROM. Feito para o hardware do Master System.",
      en: "An automatic minimap in the dungeons, written in Z80 code inside the ROM itself. Made for the Master System hardware."
    },
    texto: {
      pt: [
        "As dungeons em 3D de Phantasy Star impressionavam em 1987, mas quase todo mundo precisava desenhar o mapa no papel. Este hack coloca um minimapa no canto da tela que vai sendo preenchido enquanto você explora.",
        "Tudo é código Z80 dentro da ROM, pensado para o hardware do Master System: não precisa apertar Pause nem abrir outra tela, e o save do jogo continua o mesmo."
      ],
      en: [
        "Phantasy Star's 3D dungeons were stunning in 1987, but almost everyone had to draw the maps on paper. This hack puts a minimap in the corner of the screen that fills in as you explore.",
        "Everything is Z80 code inside the ROM, made for the Master System hardware: no need to press Pause or open another screen, and save files stay compatible."
      ]
    },
    destaques: {
      pt: ["Painel de 48 × 56 pixels, sempre visível ao andar e virar", "Registra portas atravessadas", "Compatível com o save original", "Para Phantasy Star (USA, Europe) (Rev A)"],
      en: ["48 × 56 pixel panel, always visible while walking and turning", "Records doors you walk through", "Compatible with original save files", "For Phantasy Star (USA, Europe) (Rev A)"]
    },
    galeria: [
      { img: "img/phantasy-star/demo.gif", legenda: { pt: "O minimapa em ação", en: "The minimap in action" } },
      { img: "img/phantasy-star/titulo-patch.png", legenda: { pt: "Tela de título", en: "Title screen" } },
      { img: "img/phantasy-star/porta-patch.png", legenda: { pt: "Dungeon com o minimapa", en: "Dungeon with the minimap" } },
      { img: "img/phantasy-star/caminho.png", legenda: { pt: "Caminho registrado", en: "Recorded path" } },
      { img: "img/phantasy-star/bau-dialogo.png", legenda: { pt: "O minimapa some nas caixas de diálogo", en: "The minimap hides in dialogue boxes" } },
      { img: "img/phantasy-star/cidade-patch.png", legenda: { pt: "Fora da dungeon, nada muda", en: "Outside dungeons, nothing changes" } }
    ],
    links: [
      { texto: { pt: "Baixar IPS", en: "Download IPS" }, url: "downloads/phantasy-star-sms-map-hack-1.1.ips" }
    ],
    versao: "1.1",
    requer: {
      pt: ["Phantasy Star (USA, Europe) (Rev A) — CRC32 00BEF1D7"],
      en: ["Phantasy Star (USA, Europe) (Rev A) — CRC32 00BEF1D7"]
    }
  },
  {
    id: "genecyst-revival",
    titulo: "Genecyst Revival",
    tipo: "emulador",
    de: "PC (Windows / Linux)",
    para: "PC (Windows / Linux)",
    status: "em-andamento",
    capa: "img/genecyst/title.png",
    resumo: {
      pt: "Uma recriação do lendário emulador Genecyst de 1997, com o visual original e um núcleo de emulação moderno.",
      en: "A recreation of the legendary 1997 Genecyst emulator, with its original look and a modern emulation core."
    },
    texto: {
      pt: [
        "Em 1997 a Bloodlust Software (os criadores do NESticle) lançou o Genecyst, um emulador de Mega Drive para DOS com uma personalidade única: a interface desenhada por cima do jogo, a barra de menus pingando sangue, a cruz dourada como ponteiro do mouse. Para muita gente, foi a primeira vez que um jogo de Mega Drive rodou no PC.",
        "O código-fonte nunca foi lançado. O Genecyst Revival é um programa novo que reconstrói essa experiência pixel por pixel, medindo o original rodando no DOSBox, mas usa o Genesis Plus GX por baixo para emular os jogos com precisão. Roda em Windows e Linux e é código aberto.",
        "Os arquivos antigos continuam funcionando: save states .GS0–.GS9, SRAM .GSV e listas de patches .PAT."
      ],
      en: [
        "In 1997 Bloodlust Software (the people behind NESticle) released Genecyst, a DOS Mega Drive emulator with a personality of its own: a GUI drawn right over the game, a menu bar dripping blood, a golden cross for a mouse pointer. For many of us it was the first time a Mega Drive game ran on a PC.",
        "The source code was never released. Genecyst Revival is a brand new program that rebuilds that experience pixel by pixel, measured against the original running under DOSBox, with Genesis Plus GX underneath for accurate emulation. It runs on Windows and Linux and is open source.",
        "Your old files keep working: .GS0–.GS9 save states, .GSV SRAM and .PAT patch lists."
      ]
    },
    destaques: {
      pt: ["Menus, janelas, fontes e cores do original", "Mesmas teclas de atalho (F5/F7 para salvar e carregar)", "Filtros de vídeo: Scale2x, 2xSaI, Scanlines, TV, CRT", "Tela cheia, controles USB e interface que se esconde sozinha"],
      en: ["The original menus, windows, fonts and colours", "Same hotkeys (F5/F7 to save and load state)", "Video filters: Scale2x, 2xSaI, Scanlines, TV, CRT", "Fullscreen, USB controllers and an auto-hiding GUI"]
    },
    galeria: [
      { img: "img/genecyst/title.png", legenda: { pt: "Rodando Dragon Quest III para Mega Drive", en: "Running Dragon Quest III for Mega Drive" } },
      { img: "img/genecyst/menus.png", legenda: { pt: "Os menus com o sangue escorrendo", en: "The menus with dripping blood" } },
      { img: "img/genecyst/load-rom.png", legenda: { pt: "Carregar ROM", en: "Load ROM" } },
      { img: "img/genecyst/viewers.png", legenda: { pt: "Visualizadores de paleta e padrões", en: "Palette and pattern viewers" } },
      { img: "img/genecyst/patcher.png", legenda: { pt: "Patcher com códigos Game Genie", en: "Game Genie patcher" } },
      { img: "img/genecyst/input.png", legenda: { pt: "Configuração de controles", en: "Input settings" } },
      { img: "img/genecyst/fm-info.png", legenda: { pt: "Informações do som FM", en: "FM sound info" } },
      { img: "img/genecyst/filter-crt.png", legenda: { pt: "Filtro CRT", en: "CRT filter" } },
      { img: "img/genecyst/filter-2xsai.png", legenda: { pt: "Filtro 2xSaI", en: "2xSaI filter" } }
    ],
    links: [
      { texto: { pt: "Baixar para Windows", en: "Download for Windows" }, url: "https://github.com/junkatana/genecyst-revival/releases/latest/download/genecyst-windows-x86_64.zip" },
      { texto: { pt: "Baixar para Linux", en: "Download for Linux" }, url: "https://github.com/junkatana/genecyst-revival/releases/latest/download/genecyst-linux-x86_64.tar.gz" },
      { texto: { pt: "Código no GitHub", en: "Source on GitHub" }, url: "https://github.com/junkatana/genecyst-revival" }
    ]
  }
];
