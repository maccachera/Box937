/* =====================================================================
   PersonalCar — comportamento da página
   Edite apenas o bloco CONFIG abaixo para publicar os dados reais.
   ===================================================================== */

const CONFIG = {
  // Somente números, com código do país e DDD. Ex.: "5511987654321"
  whatsapp: "5500000000000",
  // Como o número aparece escrito na página
  whatsappTexto: "[NÚMERO DO WHATSAPP]",
  telefone: "[TELEFONE]",
  instagram: "[LINK DO INSTAGRAM]",
  endereco: "[ENDEREÇO COMPLETO] — [CIDADE E BAIRRO]",
  horarios: "[HORÁRIOS]",
  // Endereço usado no mapa e na rota (pode ser o mesmo texto acima)
  enderecoMapa: "[ENDEREÇO COMPLETO], [CIDADE]",

  // Galeria antes/depois. Adicione as fotos em assets/img/ e preencha
  // "antes" e "depois" com o caminho do arquivo para substituir os
  // espaços reservados. categoria: lanternagem | pintura | polimento |
  // estetica | lavagem
  galeria: [
    { titulo: "Correção de amassado na lateral", categoria: "lanternagem", antes: "", depois: "" },
    { titulo: "Retoque de pintura no capô", categoria: "pintura", antes: "", depois: "" },
    { titulo: "Polimento e recuperação do brilho", categoria: "polimento", antes: "", depois: "" },
    { titulo: "Higienização interna completa", categoria: "estetica", antes: "", depois: "" },
    { titulo: "Recuperação de para-choque", categoria: "lanternagem", antes: "", depois: "" },
    { titulo: "Lavagem completa externa e interna", categoria: "lavagem", antes: "", depois: "" }
  ]
};

const ROTULO_CATEGORIA = {
  lanternagem: "Lanternagem",
  pintura: "Pintura",
  polimento: "Polimento",
  estetica: "Estética",
  lavagem: "Lavagem"
};

/* ---------- WhatsApp ---------- */
function linkWhatsApp(mensagem) {
  const numero = CONFIG.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

function aplicarLinksWhatsApp(escopo = document) {
  escopo.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = linkWhatsApp(el.dataset.wa);
    el.target = "_blank";
    el.rel = "noopener";
  });
}

/* ---------- Dados de contato ---------- */
function aplicarConfig() {
  const enderecoUrl = encodeURIComponent(CONFIG.enderecoMapa);

  document.querySelectorAll("[data-config]").forEach((el) => {
    switch (el.dataset.config) {
      case "endereco":
        el.textContent = CONFIG.endereco;
        break;
      case "horarios":
        el.textContent = CONFIG.horarios;
        break;
      case "telefoneLink":
        el.textContent = CONFIG.telefone;
        el.href = `tel:${CONFIG.telefone.replace(/[^\d+]/g, "")}`;
        break;
      case "whatsappTexto":
        el.textContent = CONFIG.whatsappTexto;
        break;
      case "instagram":
        el.href = CONFIG.instagram;
        break;
      case "mapa":
        el.src = `https://www.google.com/maps?q=${enderecoUrl}&output=embed`;
        break;
      case "rota":
        el.href = `https://www.google.com/maps/dir/?api=1&destination=${enderecoUrl}`;
        break;
    }
  });

  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
}

/* ---------- Cabeçalho e menu ---------- */
function iniciarCabecalho() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav-principal");

  const marcarScroll = () => header.classList.toggle("is-stuck", window.scrollY > 12);
  marcarScroll();
  window.addEventListener("scroll", marcarScroll, { passive: true });

  const fechar = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechar));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      fechar();
      toggle.focus();
    }
  });
}

/* ---------- Link ativo conforme a seção visível ---------- */
function iniciarNavAtiva() {
  const links = [...document.querySelectorAll(".nav-list a")];
  const secoes = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!secoes.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === `#${entrada.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secoes.forEach((s) => observer.observe(s));
}

/* ---------- Animações de entrada ---------- */
function iniciarReveal() {
  const itens = document.querySelectorAll(".reveal");
  if (!itens.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    itens.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("is-visible");
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px" }
  );

  document.querySelectorAll(".reveal-group").forEach((grupo) => {
    [...grupo.querySelectorAll(".reveal")].forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 320)}ms`;
    });
  });

  itens.forEach((el) => observer.observe(el));
}

/* ---------- Galeria antes e depois ---------- */
function criarComparador({ titulo, categoria, antes, depois }, indice) {
  const item = document.createElement("article");
  item.className = "compare-item reveal";
  item.dataset.categoria = categoria;

  const idRange = `comparador-${indice + 1}`;
  const estiloAntes = antes ? ` style="background-image:url('${antes}')"` : "";
  const estiloDepois = depois ? ` style="background-image:url('${depois}')"` : "";
  const phAntes = antes ? "" : '<span class="compare-ph">Espaço reservado — foto “antes”</span>';
  const phDepois = depois ? "" : '<span class="compare-ph">Espaço reservado — foto “depois”</span>';

  item.innerHTML = `
    <div class="compare">
      <div class="compare-side compare-before"${estiloAntes}>
        <span class="compare-tag">Antes</span>${phAntes}
      </div>
      <div class="compare-side compare-after"${estiloDepois}>
        <span class="compare-tag">Depois</span>${phDepois}
      </div>
      <div class="compare-handle"></div>
      <input class="compare-range" id="${idRange}" type="range" min="0" max="100" value="50" step="1"
             aria-label="Comparar antes e depois: ${titulo}">
    </div>
    <div class="compare-meta">
      <h3>${titulo}</h3>
      <span>${ROTULO_CATEGORIA[categoria] || categoria}</span>
    </div>`;

  const range = item.querySelector(".compare-range");
  const depoisEl = item.querySelector(".compare-after");
  const handle = item.querySelector(".compare-handle");

  const atualizar = () => {
    const v = Number(range.value);
    depoisEl.style.clipPath = `inset(0 ${100 - v}% 0 0)`;
    handle.style.left = `${v}%`;
  };

  range.addEventListener("input", atualizar);
  atualizar();

  return item;
}

function iniciarGaleria() {
  const grid = document.getElementById("galeria-resultados");
  if (!grid) return;

  CONFIG.galeria.forEach((trabalho, i) => grid.appendChild(criarComparador(trabalho, i)));

  const botoes = document.querySelectorAll(".filter");
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const filtro = botao.dataset.filter;

      botoes.forEach((b) => {
        const ativo = b === botao;
        b.classList.toggle("is-active", ativo);
        b.setAttribute("aria-pressed", String(ativo));
      });

      grid.querySelectorAll(".compare-item").forEach((item) => {
        item.hidden = filtro !== "todos" && item.dataset.categoria !== filtro;
      });
    });
  });
}

/* ---------- Formulário ---------- */
function iniciarFormulario() {
  const form = document.getElementById("form-orcamento");
  if (!form) return;
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = new FormData(form);
    const nome = String(dados.get("nome") || "").trim();
    const telefone = String(dados.get("telefone") || "").trim();

    if (!nome || !telefone) {
      status.textContent = "Preencha o nome e o WhatsApp para continuar.";
      status.classList.add("is-error");
      (nome ? form.telefone : form.nome).focus();
      return;
    }

    const veiculo = String(dados.get("veiculo") || "").trim();
    const servico = String(dados.get("servico") || "").trim();
    const mensagem = String(dados.get("mensagem") || "").trim();

    const texto = [
      "Olá! Encontrei a PersonalCar pelo site e gostaria de solicitar um orçamento.",
      `Nome: ${nome}`,
      `WhatsApp: ${telefone}`,
      veiculo ? `Veículo: ${veiculo}` : null,
      servico ? `Serviço: ${servico}` : null,
      mensagem ? `Detalhes: ${mensagem}` : null
    ]
      .filter(Boolean)
      .join("\n");

    status.classList.remove("is-error");
    status.textContent = "Abrindo o WhatsApp com o seu pedido…";
    window.open(linkWhatsApp(texto), "_blank", "noopener");
  });
}

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", () => {
  aplicarConfig();
  iniciarCabecalho();
  iniciarNavAtiva();
  iniciarGaleria();
  iniciarFormulario();
  aplicarLinksWhatsApp();
  iniciarReveal();
});
