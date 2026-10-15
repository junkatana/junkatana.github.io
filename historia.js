// Conteúdo da página História (historia.html). Todo texto tem versão pt e en.
// Cada marco pode ter uma imagem (img + legenda) e o id de um projeto para link.

const HISTORIA = {
  intro: {
    pt: "Junkatana é programador há mais de 15 anos. A paixão por videogames começou cedo e nunca mais foi embora.",
    en: "Junkatana has been a programmer for over 15 years. His passion for video games started early and never left."
  },
  marcos: [
    {
      quando: { pt: "Aos 7 anos", en: "Age 7" },
      texto: {
        pt: "Ganhou um Turbo Game da CCE e foi amor à primeira vista. Desde pequeno, já sonhava em ser programador.",
        en: "He got a Turbo Game by CCE, a Brazilian NES clone, and it was love at first sight. Since he was a kid, he dreamed of becoming a programmer."
      }
    },
    {
      quando: { pt: "1998", en: "1998" },
      texto: {
        pt: "Nascido em um lar muito pobre, ter um computador parecia impossível: era caro demais. Até que um desconhecido, ao perceber a vontade dele de mexer com tecnologia, lhe deu de presente um i386. A máquina já era antiga para a época e mal dava conta, mas foi nela, pelo MS-DOS, que ele emulou pela primeira vez jogos de NES e Mega Drive. Pouco depois, evoluiu para um i486.",
        en: "Born into a very poor family, owning a computer seemed impossible: it was far too expensive. Then a stranger, seeing how eager he was to work with technology, gave him an i386 as a gift. The machine was already old for its time and could barely keep up, but that is where, under MS-DOS, he first emulated NES and Mega Drive games. Soon after, he moved up to an i486."
      },
      img: "img/genecyst/title.png",
      legenda: {
        pt: "O Genecyst, emulador de Mega Drive para DOS daquela época. Hoje ele voltou como Genecyst Revival.",
        en: "Genecyst, a Mega Drive emulator for DOS from that era. Today it is back as Genecyst Revival."
      },
      projeto: "genecyst-revival"
    },
    {
      quando: { pt: "2007", en: "2007" },
      texto: {
        pt: "Começou no romhacking e lançou projetos independentes, como a tradução de Teenage Mutant Ninja Turtles III para o NES, além de algumas ferramentas. Muitos desses trabalhos se perderam com o tempo. O que ficou registrado, na antiga plataforma PO.B.R.E, foi a tradução de Solstice para o NES, um jogo que ele adorava e um dos projetos aos quais mais se dedicou.",
        en: "He got into romhacking and released independent projects, such as a Brazilian Portuguese translation of Teenage Mutant Ninja Turtles III for the NES, plus a few tools. Many of those works were lost over time. The one still on record, on the old PO.B.R.E platform, is his translation of Solstice for the NES, a game he loved and one of the projects he put the most into."
      },
      img: "img/solstice/titulo.png",
      legenda: {
        pt: "A tela de título de Solstice com o logotipo traduzido, editado à mão em 2009.",
        en: "Solstice's title screen with the translated logo, edited by hand in 2009."
      },
      projeto: "solstice"
    },
    {
      quando: { pt: "Era PSP", en: "PSP era" },
      texto: {
        pt: "Seguiu com hacks, traduções e ferramentas para o PSP, que hoje também se perderam.",
        en: "He went on making hacks, translations and tools for the PSP, which have since been lost as well."
      }
    },
    {
      quando: { pt: "Hoje", en: "Today" },
      texto: {
        pt: "Depois de anos dedicados aos estudos, à carreira e a enfrentar vários problemas na vida, decidiu voltar. Agora, com a ajuda da inteligência artificial, traz novidades para a cena do romhacking.",
        en: "After years devoted to his studies, his career and getting through many hardships in life, he decided to come back. Now, with the help of artificial intelligence, he is bringing new things to the romhacking scene."
      },
      img: "img/dq3/aliahan.png",
      legenda: {
        pt: "Dragon Quest III rodando no Mega Drive, um dos projetos atuais.",
        en: "Dragon Quest III running on the Mega Drive, one of the current projects."
      },
      projeto: "dragon-quest-3"
    }
  ]
};
