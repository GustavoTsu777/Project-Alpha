/*!
 * Project Alpha — Widget de Acessibilidade
 * ------------------------------------------------------------
 * Componente único, sem dependências, para ser incluído em
 * QUALQUER página do site com uma única linha:
 *
 *   <script src="js/acessibilidade.js" defer></script>
 *
 * O que ele faz sozinho, ao carregar:
 *   1. Injeta seu próprio CSS (não mexe nos seus .css existentes)
 *   2. Cria o botão flutuante + painel de opções
 *   3. Aplica tamanho de fonte, alto contraste, modo clean/simples
 *      (leitura facilitada) e filtros de daltonismo (Protanopia /
 *      Deuteranopia / Tritanopia)
 *   4. Salva as preferências do usuário (localStorage) e
 *      as reaplica automaticamente em todas as páginas
 *   5. Injeta o widget oficial do VLibras (Libras/Governo)
 *
 * Não é necessário editar CSS ou duplicar HTML em cada página.
 * ------------------------------------------------------------
 */
(function () {
  "use strict";

  // Evita injeção duplicada caso o script seja incluído 2x
  if (window.__a11yWidgetLoaded) return;
  window.__a11yWidgetLoaded = true;

  var STORAGE_KEY = "pa-a11y-prefs";
  var FONT_STEPS = [87.5, 100, 112.5, 125, 137.5, 150]; // em %
  var DEFAULT_STEP_INDEX = 1; // 100%

  var prefs = loadPrefs();

  /* -----------------------------------------------------------
   * 1. ESTILOS DO WIDGET (isolados, não sobrescrevem o site)
   * --------------------------------------------------------- */
  var style = document.createElement("style");
  style.id = "a11y-widget-styles";
  style.textContent = [
    "#a11y-fab{position:fixed;bottom:22px;right:22px;width:56px;height:56px;",
    "border-radius:50%;background:#1a1a2e;color:#fff;border:2px solid #ff2e2e;",
    "display:flex;align-items:center;justify-content:center;cursor:pointer;",
    "box-shadow:0 4px 14px rgba(0,0,0,.35);z-index:999998;transition:transform .15s ease;}",
    "#a11y-fab:hover{transform:scale(1.07);}",
    "#a11y-fab:focus-visible,.a11y-panel button:focus-visible,.a11y-panel select:focus-visible{",
    "outline:3px solid #ffb703;outline-offset:2px;}",
    "#a11y-fab svg{width:28px;height:28px;fill:#fff;}",
    ".a11y-panel{position:fixed;bottom:88px;right:22px;width:300px;max-width:90vw;",
    "max-height:75vh;overflow-y:auto;background:#fff;color:#1a1a1a;border-radius:14px;",
    "box-shadow:0 10px 40px rgba(0,0,0,.3);z-index:999999;font-family:Arial,Helvetica,sans-serif;",
    "padding:16px;display:none;}",
    ".a11y-panel.open{display:block;}",
    ".a11y-panel h2{font-size:16px;margin:0 0 12px;display:flex;align-items:center;",
    "justify-content:space-between;color:#1a1a1a;}",
    ".a11y-panel h3{font-size:13px;text-transform:uppercase;letter-spacing:.03em;",
    "margin:16px 0 8px;color:#555;}",
    ".a11y-panel h3:first-of-type{margin-top:0;}",
    ".a11y-close{background:transparent;border:none;cursor:pointer;font-size:18px;",
    "line-height:1;color:#1a1a1a;padding:4px;}",
    ".a11y-row{display:flex;gap:8px;flex-wrap:wrap;}",
    ".a11y-btn{flex:1 1 auto;min-width:44px;min-height:40px;border-radius:8px;",
    "border:1px solid #ccc;background:#f4f4f6;color:#1a1a1a;cursor:pointer;",
    "font-size:14px;font-weight:600;padding:8px 10px;}",
    ".a11y-btn:hover{background:#e9e9ee;}",
    ".a11y-btn[aria-pressed='true']{background:#1a1a2e;color:#fff;border-color:#1a1a2e;}",
    ".a11y-btn-wide{flex-basis:100%;}",
    ".a11y-swatch{width:14px;height:14px;border-radius:50%;display:inline-block;",
    "margin-right:6px;vertical-align:middle;}",
    ".a11y-reset{margin-top:16px;width:100%;background:#fff5f5;color:#b00020;",
    "border:1px solid #f3b4b4;border-radius:8px;padding:8px;cursor:pointer;font-weight:600;}",
    ".a11y-reset:hover{background:#ffe9e9;}",
    /* Alto contraste (classe global no <html>) */
    "html.a11y-contrast{filter:contrast(1.35) saturate(1.15);}",
    "html.a11y-contrast body{background:#000 !important;color:#fff !important;}",
    "html.a11y-contrast a, html.a11y-contrast p, html.a11y-contrast span, ",
    "html.a11y-contrast li, html.a11y-contrast label, html.a11y-contrast h1, ",
    "html.a11y-contrast h2, html.a11y-contrast h3, html.a11y-contrast h4{color:#fff !important;}",
    /* Modo Clean / Leitura Simplificada: o essencial é aplicado via JS
       (estilo inline, que sempre vence o CSS da página — veja applyClean()).
       Aqui só ficam ajustes leves de tipografia e o próprio painel. */
    "html.a11y-clean body{line-height:1.7 !important;letter-spacing:.01em !important;}",
    "html.a11y-clean .a11y-panel{font-size:16px;}",
    "html.a11y-clean .a11y-btn{min-height:48px;font-size:15px;}",
    /* Filtros de daltonismo aplicados via SVG feColorMatrix */
    "html.a11y-protanopia{filter:url(#a11y-filter-protanopia);}",
    "html.a11y-deuteranopia{filter:url(#a11y-filter-deuteranopia);}",
    "html.a11y-tritanopia{filter:url(#a11y-filter-tritanopia);}",
    "html.a11y-contrast.a11y-protanopia{filter:url(#a11y-filter-protanopia) contrast(1.35);}",
    "html.a11y-contrast.a11y-deuteranopia{filter:url(#a11y-filter-deuteranopia) contrast(1.35);}",
    "html.a11y-contrast.a11y-tritanopia{filter:url(#a11y-filter-tritanopia) contrast(1.35);}",
    ".a11y-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;",
    "overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}",
    "@media (max-width:480px){.a11y-panel{right:12px;left:12px;width:auto;bottom:80px;}",
    "#a11y-fab{right:12px;bottom:12px;}}"
  ].join("");
  document.head.appendChild(style);

  /* -----------------------------------------------------------
   * 2. FILTROS SVG (matrizes reais usadas para simular/compensar
   *    as 3 formas mais comuns de daltonismo)
   * --------------------------------------------------------- */
  var svgFilters = document.createElement("div");
  svgFilters.setAttribute("aria-hidden", "true");
  svgFilters.style.position = "absolute";
  svgFilters.style.width = "0";
  svgFilters.style.height = "0";
  svgFilters.style.overflow = "hidden";
  svgFilters.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg">' +
    '<defs>' +
    '<filter id="a11y-filter-protanopia">' +
    '<feColorMatrix type="matrix" values="0.567,0.433,0,0,0  0.558,0.442,0,0,0  0,0.242,0.758,0,0  0,0,0,1,0"/>' +
    "</filter>" +
    '<filter id="a11y-filter-deuteranopia">' +
    '<feColorMatrix type="matrix" values="0.625,0.375,0,0,0  0.7,0.3,0,0,0  0,0.3,0.7,0,0  0,0,0,1,0"/>' +
    "</filter>" +
    '<filter id="a11y-filter-tritanopia">' +
    '<feColorMatrix type="matrix" values="0.95,0.05,0,0,0  0,0.433,0.567,0,0  0,0.475,0.525,0,0  0,0,0,1,0"/>' +
    "</filter>" +
    "</defs>" +
    "</svg>";
  document.body.appendChild(svgFilters);

  /* -----------------------------------------------------------
   * 3. BOTÃO FLUTUANTE + PAINEL
   * --------------------------------------------------------- */
  var fab = document.createElement("button");
  fab.id = "a11y-fab";
  fab.type = "button";
  fab.setAttribute("aria-label", "Abrir menu de acessibilidade");
  fab.setAttribute("aria-haspopup", "dialog");
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-controls", "a11y-panel");
  fab.innerHTML =
    '<svg viewBox="0 0 512 512" aria-hidden="true" focusable="false">' +
    '<path d="M256 80a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM106 158.4c-13.2 3-21.9 15.9-19.8 29.3s14.9 22.6 28.4 21.1L192 199v70.9c0 11.5-2.4 22.9-7.1 33.4l-60.6 136.3c-7.2 16.1.1 35 16.2 42.2s35-.1 42.2-16.2l53-119.2h40.6l53 119.2c7.2 16.1 26.1 23.4 42.2 16.2s23.4-26.1 16.2-42.2l-60.6-136.3c-4.7-10.5-7.1-21.9-7.1-33.4V199l77.4 9.8c13.5 1.5 25.7-7.7 28.4-21.1s-6.6-26.3-19.8-29.3l-134-30.2c-4.1-.9-8.4-.9-12.5 0l-134 30.2z"/>' +
    "</svg>";
  document.body.appendChild(fab);

  var panel = document.createElement("div");
  panel.className = "a11y-panel";
  panel.id = "a11y-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Menu de acessibilidade");
  panel.innerHTML =
    "<h2>Acessibilidade" +
    '<button type="button" class="a11y-close" id="a11y-close" aria-label="Fechar menu de acessibilidade">&#10005;</button>' +
    "</h2>" +
    "<h3>Tamanho do texto</h3>" +
    '<div class="a11y-row" role="group" aria-label="Ajustar tamanho do texto">' +
    '<button type="button" class="a11y-btn" id="a11y-font-dec" aria-label="Diminuir fonte">A-</button>' +
    '<button type="button" class="a11y-btn" id="a11y-font-reset" aria-label="Fonte padrão">A</button>' +
    '<button type="button" class="a11y-btn" id="a11y-font-inc" aria-label="Aumentar fonte">A+</button>' +
    "</div>" +
    "<h3>Contraste</h3>" +
    '<div class="a11y-row">' +
    '<button type="button" class="a11y-btn a11y-btn-wide" id="a11y-contrast" aria-pressed="false">Alto contraste</button>' +
    "</div>" +
    "<h3>Leitura facilitada</h3>" +
    '<div class="a11y-row">' +
    '<button type="button" class="a11y-btn a11y-btn-wide" id="a11y-clean" aria-pressed="false">Modo Clean (fundo claro e simples)</button>' +
    "</div>" +
    "<h3>Modo para daltonismo</h3>" +
    '<div class="a11y-row" role="group" aria-label="Selecionar modo de cores para daltonismo">' +
    '<button type="button" class="a11y-btn a11y-btn-wide" data-mode="none" aria-pressed="true">Nenhum</button>' +
    '<button type="button" class="a11y-btn" data-mode="protanopia" aria-pressed="false">Protanopia</button>' +
    '<button type="button" class="a11y-btn" data-mode="deuteranopia" aria-pressed="false">Deuteranopia</button>' +
    '<button type="button" class="a11y-btn a11y-btn-wide" data-mode="tritanopia" aria-pressed="false">Tritanopia</button>' +
    "</div>" +
    '<button type="button" class="a11y-reset" id="a11y-reset-all">Restaurar padrões</button>';
  document.body.appendChild(panel);

  var focusablePanelEls = null;

  function openPanel() {
    panel.classList.add("open");
    fab.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKeydown, true);
    document.addEventListener("click", onOutsideClick, true);
    var firstBtn = panel.querySelector("button");
    if (firstBtn) firstBtn.focus();
  }

  function closePanel(returnFocus) {
    panel.classList.remove("open");
    fab.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeydown, true);
    document.removeEventListener("click", onOutsideClick, true);
    if (returnFocus !== false) fab.focus();
  }

  function onOutsideClick(e) {
    if (!panel.contains(e.target) && e.target !== fab) closePanel(false);
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      closePanel();
      return;
    }
    if (e.key === "Tab") {
      // Focus trap simples dentro do painel
      if (!focusablePanelEls || !focusablePanelEls.length) {
        focusablePanelEls = panel.querySelectorAll("button, select, [tabindex]");
      }
      var list = focusablePanelEls;
      var first = list[0];
      var last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  fab.addEventListener("click", function () {
    if (panel.classList.contains("open")) closePanel();
    else openPanel();
  });
  panel.querySelector("#a11y-close").addEventListener("click", function () {
    closePanel();
  });

  /* -----------------------------------------------------------
   * 4. LÓGICA: FONTE / CONTRASTE / DALTONISMO / PERSISTÊNCIA
   * --------------------------------------------------------- */
  function loadPrefs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { fontIndex: DEFAULT_STEP_INDEX, contrast: false, clean: false, colorblind: "none" };
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {}
  }

  function applyFont() {
    document.documentElement.style.fontSize = FONT_STEPS[prefs.fontIndex] + "%";
  }

  function applyContrast() {
    document.documentElement.classList.toggle("a11y-contrast", !!prefs.contrast);
    var btn = document.getElementById("a11y-contrast");
    if (btn) btn.setAttribute("aria-pressed", String(!!prefs.contrast));
  }

  var EXCLUDE_SELECTOR =
    "#a11y-fab, #a11y-fab *, .a11y-panel, .a11y-panel *, [vw], [vw] *, #vlibras-widget-wrapper, #vlibras-widget-wrapper *";

  function isExcluded(el) {
    return !!el.closest(EXCLUDE_SELECTOR);
  }

  // Aplica (ou remove) um "modo leitura" real: sobrescreve estilo INLINE
  // com !important elemento a elemento. Isso sempre vence qualquer CSS
  // da página (mesmo regras !important do tema escuro original), o que
  // o CSS sozinho não conseguia garantir de forma confiável.
  function applyClean() {
    var on = !!prefs.clean;
    document.documentElement.classList.toggle("a11y-clean", on);
    var btn = document.getElementById("a11y-clean");
    if (btn) btn.setAttribute("aria-pressed", String(on));

    var all = document.body.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (isExcluded(el)) continue;
      var tag = el.tagName;

      if (on) {
        if (el.dataset.a11yOrigStyle === undefined) {
          el.dataset.a11yOrigStyle = el.getAttribute("style") || "";
        }
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("text-shadow", "none", "important");
        el.style.setProperty("animation", "none", "important");
        el.style.setProperty("transition", "none", "important");
        el.style.setProperty("filter", "none", "important");
        // Fundo sempre transparente por padrão: evita que cada elemento
        // vire uma "caixinha" com sua própria cor de fundo (o efeito de
        // blocos flutuando / sopa de letrinhas nas tabelas).
        // Só a página (html/body) tem cor sólida — um único fundo contínuo.
        el.style.setProperty("background-color", "transparent", "important");
        // A BORDA é mantida quando o elemento já tinha uma no design
        // original (ela é o que separa visualmente os cards/seções) —
        // só recolorimos para algo visível sobre o fundo agora claro.
        // Elementos sem borda nenhuma (a maioria dos <span>, <p>, texto
        // solto) continuam sem borda, para não criar caixas onde não
        // existiam antes.
        var cs = window.getComputedStyle(el);
        var hasBorder =
          parseFloat(cs.borderTopWidth) > 0 ||
          parseFloat(cs.borderRightWidth) > 0 ||
          parseFloat(cs.borderBottomWidth) > 0 ||
          parseFloat(cs.borderLeftWidth) > 0;
        el.style.setProperty("border-color", hasBorder ? "#999999" : "transparent", "important");

        if (tag === "A") {
          el.style.setProperty("color", "#0645ad", "important");
          el.style.setProperty("text-decoration", "underline", "important");
        } else if (tag === "BUTTON" || tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") {
          el.style.setProperty("background-color", "#ffffff", "important");
          el.style.setProperty("color", "#1a1a1a", "important");
          el.style.setProperty("border", "2px solid #333333", "important");
          el.style.setProperty("border-radius", "8px", "important");
          el.style.setProperty("min-height", "46px", "important");
          el.style.setProperty("padding", "10px 16px", "important");
        } else if (tag === "TD" || tag === "TH") {
          el.style.setProperty("color", "#1a1a1a", "important");
          el.style.setProperty("border", "none", "important");
          el.style.setProperty("border-bottom", "1px solid #999999", "important");
          el.style.setProperty("padding", "10px 12px", "important");
        } else if (tag === "TABLE") {
          el.style.setProperty("border-collapse", "collapse", "important");
          el.style.setProperty("border", "1px solid #999999", "important");
        } else if (tag === "IMG" || tag === "SVG" || tag === "PATH" || tag === "I") {
          // preserva imagens/ícones como estão, só remove sombra/animação (já feito acima)
        } else {
          el.style.setProperty("color", "#1a1a1a", "important");
        }
        if (/^H[1-6]$/.test(tag)) {
          el.style.setProperty("color", "#000000", "important");
        }
      } else if (el.dataset.a11yOrigStyle !== undefined) {
        if (el.dataset.a11yOrigStyle) {
          el.setAttribute("style", el.dataset.a11yOrigStyle);
        } else {
          el.removeAttribute("style");
        }
        delete el.dataset.a11yOrigStyle;
      }
    }

    // Fundo geral da página (garante que não sobre nenhuma "borda" escura)
    if (on) {
      if (document.body.dataset.a11yOrigStyle === undefined) {
        document.body.dataset.a11yOrigStyle = document.body.getAttribute("style") || "";
      }
      document.body.style.setProperty("background-color", "#fdfdf9", "important");
      document.body.style.setProperty("background-image", "none", "important");
      // Modo Clean pede textos grandes: garante ao menos 125% se estava menor
      if (prefs.fontIndex < 3) {
        prefs.fontIndex = 3;
        applyFont();
      }
    } else if (document.body.dataset.a11yOrigStyle !== undefined) {
      if (document.body.dataset.a11yOrigStyle) {
        document.body.setAttribute("style", document.body.dataset.a11yOrigStyle);
      } else {
        document.body.removeAttribute("style");
      }
      delete document.body.dataset.a11yOrigStyle;
    }
  }

  function applyColorblind() {
    ["a11y-protanopia", "a11y-deuteranopia", "a11y-tritanopia"].forEach(function (c) {
      document.documentElement.classList.remove(c);
    });
    if (prefs.colorblind !== "none") {
      document.documentElement.classList.add("a11y-" + prefs.colorblind);
    }
    panel.querySelectorAll("[data-mode]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-mode") === prefs.colorblind));
    });
  }

  function applyAll() {
    applyFont();
    applyContrast();
    applyClean();
    applyColorblind();
  }

  document.getElementById("a11y-font-inc").addEventListener("click", function () {
    prefs.fontIndex = Math.min(prefs.fontIndex + 1, FONT_STEPS.length - 1);
    applyFont();
    savePrefs();
  });
  document.getElementById("a11y-font-dec").addEventListener("click", function () {
    prefs.fontIndex = Math.max(prefs.fontIndex - 1, 0);
    applyFont();
    savePrefs();
  });
  document.getElementById("a11y-font-reset").addEventListener("click", function () {
    prefs.fontIndex = DEFAULT_STEP_INDEX;
    applyFont();
    savePrefs();
  });
  document.getElementById("a11y-contrast").addEventListener("click", function () {
    prefs.contrast = !prefs.contrast;
    if (prefs.contrast) {
      // Contraste (escuro) e Modo Clean (claro) são opostos: desliga um ao ligar o outro
      prefs.clean = false;
      applyClean();
    }
    applyContrast();
    savePrefs();
  });
  document.getElementById("a11y-clean").addEventListener("click", function () {
    prefs.clean = !prefs.clean;
    if (prefs.clean) {
      prefs.contrast = false;
      applyContrast();
    }
    applyClean();
    savePrefs();
  });
  panel.querySelectorAll("[data-mode]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      prefs.colorblind = btn.getAttribute("data-mode");
      applyColorblind();
      savePrefs();
    });
  });
  document.getElementById("a11y-reset-all").addEventListener("click", function () {
    prefs = { fontIndex: DEFAULT_STEP_INDEX, contrast: false, clean: false, colorblind: "none" };
    applyAll();
    savePrefs();
  });

  applyAll();

  /* -----------------------------------------------------------
   * 5. VLIBRAS — widget oficial do governo (tradutor de Libras)
   * --------------------------------------------------------- */
  function loadVLibras() {
    if (document.getElementById("vlibras-widget-wrapper")) return; // já existe

    var wrapper = document.createElement("div");
    wrapper.setAttribute("vw", "");
    wrapper.className = "enabled";
    wrapper.id = "vlibras-widget-wrapper";
    wrapper.innerHTML =
      '<div vw-access-button class="active"></div>' +
      '<div vw-plugin-wrapper>' +
      '<div class="vw-plugin-top-wrapper"></div>' +
      "</div>";
    document.body.appendChild(wrapper);

    var script = document.createElement("script");
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.onload = function () {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };
    document.body.appendChild(script);
  }

  loadVLibras();
})();
