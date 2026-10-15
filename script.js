const NOMES_TIPO = { port: "Port", traducao: "Tradução", romhack: "Romhack" };
const NOMES_STATUS = { concluido: "Concluído", "em-andamento": "Em andamento", pausado: "Pausado" };

const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto) e.textContent = texto;
  return e;
}

function cartao(p) {
  const art = el("article", "cartao");
  art.dataset.tipo = p.tipo;

  const capa = el("div", "capa");
  if (p.imagem) {
    const img = document.createElement("img");
    img.src = p.imagem;
    img.alt = p.titulo;
    img.loading = "lazy";
    capa.appendChild(img);
  } else {
    capa.appendChild(el("span", "capa-texto", p.para || p.de));
  }
  art.appendChild(capa);

  const corpo = el("div", "corpo");
  const etiquetas = el("div", "etiquetas");
  etiquetas.appendChild(el("span", "etiqueta tipo-" + p.tipo, NOMES_TIPO[p.tipo] || p.tipo));
  etiquetas.appendChild(el("span", "etiqueta status-" + p.status, NOMES_STATUS[p.status] || p.status));
  corpo.appendChild(etiquetas);

  corpo.appendChild(el("h3", null, p.titulo));
  const plataforma = p.de === p.para || !p.para ? p.de : p.de + " → " + p.para;
  corpo.appendChild(el("p", "plataforma", plataforma));
  corpo.appendChild(el("p", "resumo", p.resumo));

  if (p.links && p.links.length) {
    const links = el("div", "links");
    for (const l of p.links) {
      const a = el("a", "botao", l.texto);
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    }
    corpo.appendChild(links);
  }

  art.appendChild(corpo);
  return art;
}

function mostrar(tipo) {
  lista.replaceChildren();
  const itens = PROJETOS.filter(p => tipo === "todos" || p.tipo === tipo);
  itens.forEach(p => lista.appendChild(cartao(p)));
  vazio.hidden = itens.length > 0;
}

document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    mostrar(botao.dataset.tipo);
  });
});

document.getElementById("ano").textContent = new Date().getFullYear();
mostrar("todos");
