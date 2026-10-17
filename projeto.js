// Página de um projeto: projeto.html?id=<id>

const id = new URLSearchParams(location.search).get("id");
const projeto = PROJETOS.find(p => p.id === id);
const area = document.getElementById("projeto");

function secao(titulo) {
  const s = el("section", "bloco");
  s.appendChild(el("h2", null, titulo));
  return s;
}

function abrirImagem(item) {
  const caixa = document.getElementById("ampliada");
  caixa.querySelector("img").src = item.img;
  caixa.querySelector("img").alt = tr(item.legenda) || "";
  caixa.querySelector("p").textContent = tr(item.legenda) || "";
  caixa.showModal();
}

function galeria(itens) {
  const grade = el("div", "galeria");
  for (const item of itens) {
    const fig = el("figure");
    const b = el("button", "miniatura");
    b.type = "button";
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = tr(item.legenda) || "";
    img.loading = "lazy";
    b.appendChild(img);
    b.addEventListener("click", () => abrirImagem(item));
    fig.appendChild(b);
    if (item.legenda) fig.appendChild(el("figcaption", null, tr(item.legenda)));
    grade.appendChild(fig);
  }
  return grade;
}

function desenhar() {
  area.replaceChildren();
  document.querySelector(".voltar").href = "index.html?lang=" + LINGUA;

  if (!projeto) {
    area.appendChild(el("p", "vazio", t("nao_encontrado")));
    return;
  }
  document.title = tr(projeto.titulo) + " — Junkatana";

  // Cabeçalho do projeto
  const topo = el("div", "projeto-topo");
  const info = el("div", "projeto-info janela");
  info.appendChild(etiquetas(projeto));
  info.appendChild(el("h1", null, tr(projeto.titulo)));
  info.appendChild(plataforma(projeto));
  info.appendChild(el("p", "resumo-grande", tr(projeto.resumo)));
  if (projeto.links && projeto.links.length) {
    const links = el("div", "links");
    for (const l of projeto.links) {
      const a = el("a", "botao", tr(l.texto));
      a.href = l.url;
      if (l.url.startsWith("downloads/")) a.setAttribute("download", "");
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    }
    info.appendChild(links);
  }
  if (projeto.requer) {
    const box = el("div", "requer");
    let titulo = t("requer");
    if (projeto.versao) titulo = t("versao") + " " + projeto.versao + " · " + titulo;
    box.appendChild(el("p", "requer-titulo", titulo));
    const ul = el("ul");
    tr(projeto.requer).forEach(r => ul.appendChild(el("li", null, r)));
    box.appendChild(ul);
    const como = el("p", "como-aplicar");
    const a = el("a", null, "Rom Patcher JS");
    a.href = "https://www.marcrobledo.com/RomPatcher.js/";
    a.target = "_blank";
    a.rel = "noopener";
    const partes = t("como_aplicar").split("Rom Patcher JS");
    como.append(partes[0], a, partes[1] || "");
    box.appendChild(como);
    info.appendChild(box);
  }
  topo.appendChild(info);
  const capa = document.createElement("img");
  capa.className = "projeto-capa";
  capa.src = projeto.capa;
  capa.alt = tr(projeto.titulo);
  topo.appendChild(capa);
  area.appendChild(topo);

  // Texto e destaques
  const colunas = el("div", "colunas");
  const texto = el("div", "texto");
  (tr(projeto.texto) || []).forEach(par => texto.appendChild(el("p", null, par)));
  colunas.appendChild(texto);
  const destaques = tr(projeto.destaques) || [];
  if (destaques.length) {
    const box = el("aside", "destaques janela");
    box.appendChild(el("h2", null, t("destaques")));
    const ul = el("ul");
    destaques.forEach(d => ul.appendChild(el("li", null, d)));
    box.appendChild(ul);
    colunas.appendChild(box);
  }
  area.appendChild(colunas);

  // Versões extras do patch (ex.: para outra tradução)
  for (const v of projeto.variantes || []) {
    const s = el("section", "bloco variante janela");
    s.appendChild(el("h2", null, tr(v.titulo)));
    (tr(v.texto) || []).forEach(par => s.appendChild(el("p", null, par)));
    const passos = tr(v.passos) || [];
    if (passos.length) {
      const ol = el("ol", "passos");
      passos.forEach(x => ol.appendChild(el("li", null, x)));
      s.appendChild(ol);
    }
    if (v.links && v.links.length) {
      const links = el("div", "links");
      for (const l of v.links) {
        const a = el("a", "botao", tr(l.texto));
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        if (l.url.startsWith("downloads/")) a.setAttribute("download", "");
        links.appendChild(a);
      }
      s.appendChild(links);
    }
    if (v.galeria && v.galeria.length) s.appendChild(galeria(v.galeria));
    area.appendChild(s);
  }

  // Vídeo
  if (projeto.video) {
    const s = secao(t("video"));
    const v = document.createElement("video");
    v.src = projeto.video;
    v.controls = true;
    v.preload = "metadata";
    v.className = "video";
    s.appendChild(v);
    area.appendChild(s);
  }

  // Galeria
  if (projeto.galeria && projeto.galeria.length) {
    const s = secao(t("galeria"));
    s.appendChild(galeria(projeto.galeria));
    area.appendChild(s);
  }
}

const ampliada = document.getElementById("ampliada");
ampliada.addEventListener("click", () => ampliada.close());

iniciarLingua(desenhar);
