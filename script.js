// Página inicial: cartões dos projetos com filtro por tipo.

const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
let filtroAtual = "todos";

function cartao(p) {
  const a = el("a", "cartao janela");
  a.href = "projeto.html?id=" + p.id + "&lang=" + LINGUA;

  const capa = el("div", "capa");
  const img = document.createElement("img");
  img.src = p.capa;
  img.alt = p.titulo;
  img.loading = "lazy";
  capa.appendChild(img);
  a.appendChild(capa);

  const corpo = el("div", "corpo");
  corpo.appendChild(etiquetas(p));
  corpo.appendChild(el("h3", null, p.titulo));
  corpo.appendChild(plataforma(p));
  corpo.appendChild(el("p", "resumo", tr(p.resumo)));
  corpo.appendChild(el("span", "ver", t("ver")));
  a.appendChild(corpo);
  return a;
}

function desenhar() {
  lista.replaceChildren();
  const itens = PROJETOS.filter(p => filtroAtual === "todos" || p.tipo === filtroAtual);
  itens.forEach(p => lista.appendChild(cartao(p)));
  vazio.hidden = itens.length > 0;
}

// Mostra só os filtros de tipos que têm projeto.
document.querySelectorAll(".filtro").forEach(botao => {
  const tipo = botao.dataset.tipo;
  if (tipo !== "todos" && !PROJETOS.some(p => p.tipo === tipo)) botao.hidden = true;
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    filtroAtual = tipo;
    desenhar();
  });
});

iniciarLingua(desenhar);
