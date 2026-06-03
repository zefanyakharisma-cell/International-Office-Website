/* ============================================================
   i18n.js — Language (EN/ID) toggle engine
   ------------------------------------------------------------
   The site is an English-authored static site whose pages are
   rendered into the DOM by per-page render functions. Rather
   than retrofitting thousands of `data-i18n` keys, this engine
   translates by *text content*: it walks visible text nodes and
   swaps them using a dictionary (window.PCU_I18N, EN -> ID),
   defined in JS/i18n-dict.js.

   Dynamic content (news cards, modals, search results rendered
   after load) is caught by a MutationObserver while Indonesian
   is active, so newly-inserted nodes get translated too.

   The language preference persists in localStorage and is
   re-applied on load.
   ============================================================ */
(function () {
  'use strict';

  var LANG_KEY = 'pcu-lang';

  // Dictionary: { "English string": "Teks Indonesia" }. May be empty
  // if the dict file failed to load — engine then no-ops gracefully.
  var DICT = window.PCU_I18N || {};
  var REVERSE = null; // built lazily: { "Teks Indonesia": "English string" }

  function buildReverse() {
    REVERSE = {};
    for (var k in DICT) {
      if (Object.prototype.hasOwnProperty.call(DICT, k)) REVERSE[DICT[k]] = k;
    }
  }

  // Attributes whose values are user-visible and worth translating.
  var I18N_ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];

  function mappedValue(raw, lang) {
    // Collapse internal whitespace for the lookup key so multi-line text
    // nodes match the single-spaced keys in the dictionary.
    var t = raw.trim().replace(/\s+/g, ' ');
    if (!t) return null;
    var hit = lang === 'id' ? DICT[t] : (REVERSE ? REVERSE[t] : null);
    if (hit == null || hit === t) return null;
    // Preserve the original leading/trailing whitespace around the node.
    var lead = raw.match(/^\s*/)[0];
    var trail = raw.match(/\s*$/)[0];
    return lead + hit + trail;
  }

  function shouldSkip(el) {
    // Skip <script>/<style> and any subtree opting out via [data-no-i18n].
    while (el) {
      if (el.nodeType === 1) {
        var tag = el.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return true;
        if (el.hasAttribute && el.hasAttribute('data-no-i18n')) return true;
      }
      el = el.parentNode;
    }
    return false;
  }

  function translateTextNode(node, lang) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    if (shouldSkip(node.parentNode)) return;
    var next = mappedValue(node.nodeValue, lang);
    if (next != null) node.nodeValue = next;
  }

  function translateAttributes(el, lang) {
    for (var i = 0; i < I18N_ATTRS.length; i++) {
      var name = I18N_ATTRS[i];
      if (el.hasAttribute(name)) {
        var next = mappedValue(el.getAttribute(name), lang);
        if (next != null) el.setAttribute(name, next.trim());
      }
    }
  }

  function translateTree(root, lang) {
    if (lang === 'en' && !REVERSE) buildReverse();
    if (!root) return;

    // Element root: translate its own attributes first.
    if (root.nodeType === 1 && !shouldSkip(root)) translateAttributes(root, lang);
    if (root.nodeType === 3) { translateTextNode(root, lang); return; }
    if (root.nodeType !== 1) return;

    // Text nodes.
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.nodeValue && n.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });
    var textNodes = [];
    var n;
    while ((n = walker.nextNode())) textNodes.push(n);
    for (var i = 0; i < textNodes.length; i++) translateTextNode(textNodes[i], lang);

    // Translatable attributes within the subtree.
    var els = root.querySelectorAll('[placeholder],[title],[aria-label],[alt]');
    for (var j = 0; j < els.length; j++) {
      if (!shouldSkip(els[j])) translateAttributes(els[j], lang);
    }
  }

  // ---- MutationObserver: translate dynamically-inserted content ----
  var observer = null;
  function startObserver() {
    if (observer || !window.MutationObserver) return;
    observer = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var node = added[j];
          if (node.nodeType === 1 || node.nodeType === 3) translateTree(node, 'id');
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
  function stopObserver() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  // ---- Public: language ----
  function currentLang() {
    return localStorage.getItem(LANG_KEY) === 'id' ? 'id' : 'en';
  }

  function updateLangButtons(lang) {
    var btns = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-lang-btn') === lang ? 'true' : 'false');
    }
  }

  function setLanguage(lang) {
    lang = lang === 'id' ? 'id' : 'en';
    var prev = currentLang();
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.documentElement.setAttribute('lang', lang);
    updateLangButtons(lang);

    if (lang === prev) {
      // Still (re)apply once so a fresh load reflects the stored choice.
      if (lang === 'id') { translateTree(document.body, 'id'); startObserver(); }
      return;
    }
    if (lang === 'id') {
      translateTree(document.body, 'id');
      startObserver();
    } else {
      stopObserver();
      translateTree(document.body, 'en'); // swap ID text back to EN via reverse map
    }
  }

  // Expose for inline onclick handlers in index.html.
  window.PCUSetLanguage = setLanguage;

  // ---- Init ----
  function init() {
    updateLangButtons(currentLang());
    // Apply stored language to the already-rendered DOM.
    if (currentLang() === 'id') {
      translateTree(document.body, 'id');
      startObserver();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
