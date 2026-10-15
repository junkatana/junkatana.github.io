// Página História: cada marco vira uma "fase", com imagem do projeto ou uma tela de abertura de fase.

const lista = document.getElementById("marcos");

function telaDeFase(numero, quando) {
  const tela = el("div", "tela-fase");
  tela.appendChild(el("span", "tela-fase-numero", t("fase") + " " + numero));
  tela.appendChild(el("span", "tela-fase-quando", quando));
  return tela;
}

function desenhar() {
  document.title = t("historia") + " — Junkatana";
  document.getElementById("intro").textContent = tr(HISTORIA.intro);
  document.querySelector(".voltar").href = "index.html?lang=" + LINGUA;
  document.querySelector(".marca").href = "index.html?lang=" + LINGUA;
  document.getElementById("ver-projetos").href = "index.html?lang=" + LINGUA + "#projetos";

  lista.replaceChildren();
  HISTORIA.marcos.forEach((m, i) => {
    const li = el("li", "marco-fase");

    const lado = el("div", "marco-texto-lado");
    const cabeca = el("p", "marco-cabeca");
    cabeca.appendChild(el("span", "marco-numero", t("fase") + " " + (i + 1)));
    cabeca.appendChild(el("span", "marco-quando", tr(m.quando)));
    lado.appendChild(cabeca);
    lado.appendChild(el("p", "marco-texto janela", tr(m.texto)));
    li.appendChild(lado);

    const fig = el("figure", "marco-figura");
    if (m.img) {
      const tela = el("div", "marco-tela");
      const img = document.createElement("img");
      img.src = m.img;
      img.alt = tr(m.legenda) || "";
      img.loading = "lazy";
      tela.appendChild(img);
      fig.appendChild(tela);
      const legenda = el("figcaption", null, tr(m.legenda));
      if (m.projeto) {
        const a = el("a", "marco-link", t("ver") + " ▶");
        a.href = "projeto.html?id=" + m.projeto + "&lang=" + LINGUA;
        legenda.append(" ", a);
      }
      fig.appendChild(legenda);
    } else {
      fig.appendChild(telaDeFase(i + 1, tr(m.quando)));
    }
    li.appendChild(fig);
    lista.appendChild(li);
  });
}

iniciarLingua(desenhar);
