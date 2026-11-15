/* ============================================================================
   Mi Aprendizaje — motor de la página
   Sin dependencias externas. Todo el estado vive en localStorage.

   Rutas:
     #/inicio   → portada
     #/kotlin   → ruta Kotlin + Jetpack Compose
     #/ingles   → ruta de inglés para entrevistas
   ========================================================================== */

const STORE_KEY = 'mi-aprendizaje-v2';

/* ------------------------------- Estado ---------------------------------- */

let S = loadState();

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    return (raw && typeof raw === 'object') ? raw : {};
  } catch (e) {
    return {};
  }
}

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* modo privado */ }
}

/* ------------------------------ Utilidades -------------------------------- */

const $  = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function speakBtn(text, label) {
  return '<button class="speak" data-speak="' + esc(text) + '" type="button">' +
         '<span class="ico" aria-hidden="true">🔊</span>' +
         (label ? ' ' + esc(label) : '') + '</button>';
}

function linksHTML(links) {
  if (!links || !links.length) return '';
  return '<p class="small muted">Fuente: ' + links.map(l =>
    '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(l[0]) + '</a>'
  ).join(' · ') + '</p>';
}

/* ------------------------------ Audio (TTS) ------------------------------ */

const TTS = {
  supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  voices: [],
  init() {
    if (!this.supported) return;
    const load = () => { this.voices = window.speechSynthesis.getVoices() || []; };
    load();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = load;
    }
  },
  englishVoice() {
    const en = this.voices.filter(v => /^en([-_]|$)/i.test(v.lang || ''));
    if (!en.length) return null;
    return en.find(v => /^en[-_]US$/i.test(v.lang)) ||
           en.find(v => /^en[-_]GB$/i.test(v.lang)) ||
           en[0];
  },
  say(text, btn) {
    if (!this.supported) {
      alert('Este navegador no tiene síntesis de voz. Usa Chrome, Edge o Safari para escuchar las frases.');
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    const v = this.englishVoice();
    if (v) u.voice = v;
    u.rate = 0.92;
    u.pitch = 1;
    if (btn) btn.dataset.playing = '1';
    const off = () => { if (btn) delete btn.dataset.playing; };
    u.onend = off;
    u.onerror = off;
    window.speechSynthesis.speak(u);
  }
};

/* ------------------------------- Progreso -------------------------------- */

function phaseProgress(phase, prefix, idx) {
  const total = phase.topics.length + 2;
  let done = 0;
  phase.topics.forEach((_, j) => { if (S[prefix + 't' + idx + '_' + j]) done++; });
  if (S[prefix + 'p' + idx]) done++;
  if (S[prefix + 'q' + idx]) done++;
  return [done, total];
}

function trackProgress(path, prefix) {
  let d = 0, t = 0;
  path.forEach((p, i) => {
    const [a, b] = phaseProgress(p, prefix, i);
    d += a; t += b;
  });
  return { done: d, total: t, pct: t ? Math.round(d / t * 100) : 0 };
}

/* Actualiza solo el progreso visible de una fase, sin volver a renderizar
   todo: así no se pierde el scroll ni el foco al marcar una casilla. */
function refreshProgress(phaseEl) {
  if (!phaseEl) return;
  const view = phaseEl.closest('.view');
  if (!view) return;
  const isEng = view.id === 'vista-ingles';
  const prefix = isEng ? 'i_' : 'k_';
  const path = isEng ? INGLES_PATH : KOTLIN_PATH;
  const idx = Array.from(view.querySelectorAll('details.phase')).indexOf(phaseEl);
  if (idx < 0) return;

  const [d, t] = phaseProgress(path[idx], prefix, idx);
  const pill = $('summary .pill', phaseEl);
  if (pill) pill.textContent = d + '/' + t;

  const prog = trackProgress(path, prefix);
  const bar = $('.bar', view);
  if (bar) { const fill = $('i', bar); if (fill) fill.style.width = prog.pct + '%'; }
  const pct = $('.pct', view);
  if (pct) pct.textContent = prog.pct + '%';
  const meta = $('.progress-row .muted', view);
  if (meta) meta.textContent = prog.done + ' de ' + prog.total + ' pasos';
}

/* ------------------------- Render: ruta Kotlin --------------------------- */

function renderKotlin() {
  const P = KOTLIN_PATH, prefix = 'k_';
  const prog = trackProgress(P, prefix);
  const wrap = $('#vista-kotlin');
  wrap.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'box';
  head.innerHTML =
    '<h2>Ruta Kotlin + Jetpack Compose</h2>' +
    '<p class="muted">9 fases con fin claro: de «ya sé programar» a «publico mi propia app». Cada fase tiene un proyecto útil, temas verificables, preguntas de autoevaluación, notas personales y tarjetas imprimibles.</p>' +
    '<div class="progress-row" style="margin-top:12px">' +
      '<div class="bar"><i style="width:' + prog.pct + '%"></i></div>' +
      '<span class="pct">' + prog.pct + '%</span>' +
      '<span class="muted small">' + prog.done + ' de ' + prog.total + ' pasos</span>' +
    '</div>' +
    '<div class="toolbar">' +
      '<button class="btn" data-action="print" type="button">Imprimir tarjetas</button>' +
      '<button class="btn ghost" data-action="export" type="button">Exportar avance</button>' +
      '<button class="btn ghost" data-action="import" type="button">Importar avance</button>' +
      '<button class="btn ghost" data-action="reset" type="button">Reiniciar</button>' +
    '</div>' +
    '<p class="muted small">Tu avance se guarda en este navegador (localStorage). Si borras los datos del navegador se pierde: usa «Exportar» de vez en cuando.</p>';
  wrap.appendChild(head);

  P.forEach((p, i) => {
    const [d, t] = phaseProgress(p, prefix, i);
    const el = document.createElement('details');
    el.className = 'phase';
    el.open = !!S[prefix + 'o' + i];

    let h = '<summary><span>' + esc(p.n) + ': ' + esc(p.t) + '</span>' +
            '<span class="pill">' + d + '/' + t + '</span></summary><div class="body">';
    h += '<p class="muted"><b>Meta:</b> ' + esc(p.goal) + '</p>';
    h += '<div class="flow">' + p.flow.map(x => '<b>' + esc(x) + '</b>').join('<em>→</em>') + '</div>';

    h += '<h3>Temas</h3>' + p.topics.map((x, j) =>
      '<label class="check"><input type="checkbox" data-k="' + prefix + 't' + i + '_' + j + '"' +
      (S[prefix + 't' + i + '_' + j] ? ' checked' : '') + '><span>' + esc(x) + '</span></label>').join('');

    h += '<h3>Proyecto práctico</h3><div class="proj"><label class="check">' +
      '<input type="checkbox" data-k="' + prefix + 'p' + i + '"' + (S[prefix + 'p' + i] ? ' checked' : '') +
      '><span>' + esc(p.proj) + '</span></label></div>';

    if (p.tools && p.tools.length) {
      p.tools.forEach(tool => {
        h += '<div class="note"><h4>' + esc(tool.title) + '</h4>' + tool.html + linksHTML(tool.links) + '</div>';
      });
    }

    h += '<h3>Autoevaluación (responde en tu cabeza, luego revela)</h3>' +
      p.q.map(x => '<div class="qbox"><p><b>' + esc(x[0]) + '</b></p>' +
        '<details class="answer"><summary>Ver respuesta</summary><p>' + esc(x[1]) + '</p></details></div>').join('');
    h += '<label class="check"><input type="checkbox" data-k="' + prefix + 'q' + i + '"' +
      (S[prefix + 'q' + i] ? ' checked' : '') + '><span>Respondí las preguntas sin ayuda</span></label>';

    h += '<h3>Mis notas</h3><textarea data-n="' + prefix + 'n' + i + '" placeholder="Dudas, trucos, errores que me tocó resolver…"></textarea>';
    h += '<p class="muted small">Fuente base: ' + esc(p.src) + '</p>';
    h += '</div>';

    el.innerHTML = h;
    wrap.appendChild(el);
    const ta = $('textarea', el);
    if (ta) ta.value = S[prefix + 'n' + i] || '';
  });
}

/* ------------------------- Render: ruta inglés --------------------------- */

function renderBlocks(blocks) {
  if (!blocks) return '';
  return blocks.map(b => {
    switch (b.type) {

      case 'note':
        return '<div class="note eng"><h4>' + esc(b.title) + '</h4>' + b.html +
               linksHTML(b.links) + '</div>';

      case 'list':
        return '<h3>' + esc(b.title) + '</h3><ul>' +
               b.items.map(i => '<li>' + i + '</li>').join('') + '</ul>';

      case 'steps':
        return '<h3>' + esc(b.title) + '</h3><ol>' +
               b.items.map(s => '<li><b>' + esc(s.t) + '</b><br>' + s.body + '</li>').join('') + '</ol>';

      case 'table':
        return '<h3>' + esc(b.title) + '</h3><div class="table-scroll"><table><thead><tr>' +
               b.head.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
               b.rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') +
               '</tbody></table></div>' +
               (b.note ? '<p class="muted small">' + b.note + '</p>' : '') + linksHTML(b.links);

      case 'phrases':
        return '<h3>' + esc(b.title) + '</h3>' +
               b.items.map(p =>
                 '<div class="phrase"><div class="en">' + esc(p.en) + '</div>' +
                 (p.ipa ? '<div class="ipa">' + esc(p.ipa) + '</div>' : '') +
                 '<div class="es">' + esc(p.es) + '</div>' +
                 '<div class="row">' + speakBtn(p.en) + '</div></div>').join('') +
               (b.note ? '<p class="muted small">' + b.note + '</p>' : '');

      case 'vocab':
        return '<h3>' + esc(b.title) + '</h3><div class="table-scroll"><table><thead><tr>' +
               '<th>Palabra</th><th>IPA (Cambridge)</th><th>Aproximación en español</th><th>Uso</th><th></th>' +
               '</tr></thead><tbody>' +
               b.items.map(v => {
                 const slug = encodeURIComponent(v.en).replace(/%20/g, '-');
                 const cell = (v.links && v.links.length)
                   ? v.links.map(l => '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>').join(' + ')
                   : '<a href="https://dictionary.cambridge.org/dictionary/english/' + slug + '" target="_blank" rel="noopener">' + esc(v.en) + '</a>';
                 return '<tr><td><b>' + cell + '</b></td><td><i>' + esc(v.ipa) + '</i></td><td>' +
                        esc(v.approx) + '</td><td>' + esc(v.es) + '</td><td>' + speakBtn(v.en) + '</td></tr>';
               }).join('') +
               '</tbody></table></div>' +
               (b.note ? '<p class="muted small">' + b.note + '</p>' : '');

      case 'qa':
        return '<h3>' + esc(b.title) + '</h3>' +
               b.items.map(q =>
                 '<div class="phrase"><div class="en">' + esc(q.q) + '</div>' +
                 '<div class="es">' + esc(q.es) + '</div>' +
                 '<div class="row">' + speakBtn(q.q) + '</div>' +
                 '<p><b>Qué busca el evaluador:</b> ' + esc(q.listens) + '</p>' +
                 '<p><b>Cómo lo respondes (STAR):</b> ' + esc(q.star) + '</p>' +
                 '<p><b>Follow-up probable:</b> ' + esc(q.follow) + '</p></div>').join('');

      case 'errors':
        return '<h3>' + esc(b.title) + '</h3><div class="table-scroll"><table><thead><tr>' +
               '<th>❌ Incorrecto</th><th>✅ Correcto</th><th>Por qué</th></tr></thead><tbody>' +
               b.rows.map(r => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>').join('') +
               '</tbody></table></div>';

      case 'script':
        return '<div class="note eng"><h4>' + esc(b.title) + '</h4>' + b.body +
               (b.note ? '<p class="muted small">' + b.note + '</p>' : '') + '</div>';

      case 'checklist':
        return '<h3>' + esc(b.title) + '</h3>' +
               b.groups.map(g =>
                 '<h4>' + esc(g.t) + '</h4>' + g.items.map(it =>
                   '<label class="check"><input type="checkbox" data-check="1"><span>' + esc(it) + '</span></label>').join('')
               ).join('');

      default:
        return '';
    }
  }).join('');
}

function renderIngles() {
  const P = INGLES_PATH, prefix = 'i_';
  const prog = trackProgress(P, prefix);
  const wrap = $('#vista-ingles');
  wrap.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'box';
  head.innerHTML =
    '<h2>Inglés para entrevistas de ingeniería de software</h2>' +
    '<p class="muted">10 etapas con principio y fin. No es inglés conversacional: es el inglés que se usa en una entrevista técnica real —presentación, preguntas de conducta, preguntas hipotéticas, vocabulario, errores y seguimiento—, con pronunciación auditable y fuentes públicas citadas.</p>' +
    '<div class="progress-row" style="margin-top:12px">' +
      '<div class="bar eng"><i style="width:' + prog.pct + '%"></i></div>' +
      '<span class="pct">' + prog.pct + '%</span>' +
      '<span class="muted small">' + prog.done + ' de ' + prog.total + ' pasos</span>' +
    '</div>' +
    '<div class="toolbar">' +
      '<button class="btn eng" data-action="print" type="button">Imprimir fichas</button>' +
      '<button class="btn ghost" data-action="export" type="button">Exportar avance</button>' +
      '<button class="btn ghost" data-action="import" type="button">Importar avance</button>' +
      '<button class="btn ghost" data-action="reset" type="button">Reiniciar</button>' +
    '</div>' +
    '<p class="muted small">Cada frase lleva botón de audio: usa la síntesis de voz inglesa de tu navegador. El avance se guarda solo en este navegador.</p>';
  wrap.appendChild(head);

  P.forEach((p, i) => {
    const [d, t] = phaseProgress(p, prefix, i);
    const el = document.createElement('details');
    el.className = 'phase eng';
    el.open = !!S[prefix + 'o' + i];

    let h = '<summary><span>' + esc(p.n) + ': ' + esc(p.t) + '</span>' +
            '<span class="pill eng">' + d + '/' + t + '</span></summary><div class="body">';
    h += '<p class="muted"><b>Meta:</b> ' + esc(p.goal) + '</p>';
    h += '<div class="flow eng">' + p.flow.map(x => '<b>' + esc(x) + '</b>').join('<em>→</em>') + '</div>';

    h += '<h3>Temas</h3>' + p.topics.map((x, j) =>
      '<label class="check"><input type="checkbox" data-k="' + prefix + 't' + i + '_' + j + '"' +
      (S[prefix + 't' + i + '_' + j] ? ' checked' : '') + '><span>' + esc(x) + '</span></label>').join('');

    h += '<h3>Práctica</h3><div class="proj"><label class="check">' +
      '<input type="checkbox" data-k="' + prefix + 'p' + i + '"' + (S[prefix + 'p' + i] ? ' checked' : '') +
      '><span>' + esc(p.proj) + '</span></label></div>';

    h += renderBlocks(p.blocks);

    h += '<h3>Autoevaluación (responde en tu cabeza, luego revela)</h3>' +
      p.q.map(x => '<div class="qbox"><p><b>' + esc(x[0]) + '</b></p>' +
        '<details class="answer"><summary>Ver respuesta</summary><p>' + esc(x[1]) + '</p></details></div>').join('');
    h += '<label class="check"><input type="checkbox" data-k="' + prefix + 'q' + i + '"' +
      (S[prefix + 'q' + i] ? ' checked' : '') + '><span>Respondí las preguntas sin ayuda</span></label>';

    h += '<h3>Mis notas</h3><textarea data-n="' + prefix + 'n' + i + '" placeholder="Mis notas, frases que quiero pulir, errores que corrijo…"></textarea>';
    h += '<p class="muted small">Fuente base: ' + esc(p.src) + '</p>';
    h += '</div>';

    el.innerHTML = h;
    wrap.appendChild(el);
    const ta = $('textarea', el);
    if (ta) ta.value = S[prefix + 'n' + i] || '';
  });

  wrap.appendChild(flashcardsSection());
}

/* ------------------------------ Fichas (SRS) ------------------------------ */

const FLASH_INTERVALS = [1, 2, 4, 8];  // días por nivel (0..3)

function cardState(id) {
  return S['fc_' + id] || { level: 0, due: 0 };
}

function dueCards() {
  const today = Date.now();
  return INGLES_FLASHCARDS.filter(c => {
    const st = cardState(c.id || c.f);
    return (st.due || 0) <= today;
  });
}

function flashcardsSection() {
  const box = document.createElement('div');
  box.className = 'box';
  box.id = 'flashcards';
  box.innerHTML = '<h3>Fichas de memoria</h3><div id="flashcards-body"></div>';
  setTimeout(renderFlashcards, 0);
  return box;
}

function renderFlashcards() {
  const host = $('#flashcards-body');
  if (!host) return;
  const due = dueCards();
  const total = INGLES_FLASHCARDS.length;
  const mastered = INGLES_FLASHCARDS.filter(c => cardState(c.id || c.f).level >= 3).length;

  let h = '<div class="progress-row" style="margin-bottom:12px">' +
    '<div class="bar eng"><i style="width:' + Math.round(mastered / total * 100) + '%"></i></div>' +
    '<span class="pct">' + mastered + '/' + total + '</span>' +
    '<span class="muted small">dominadas · ' + due.length + ' para repasar hoy</span></div>';

  if (!due.length) {
    h += '<p class="muted">No hay fichas pendientes hoy. Vuelve mañana: el sistema las reprograma a 1, 2, 4 y 8 días según tu desempeño.</p>';
  } else {
    h += '<div class="flash-wrap">' + due.map(c => {
      const id = c.id || c.f;
      const st = cardState(id);
      const lvl = st.level || 0;
      return '<div class="flash">' +
        '<div class="front">' + esc(c.f) + '</div>' +
        '<div class="back">' + esc(c.b) + '</div>' +
        '<div class="row">' + speakBtn(c.s, 'Escuchar') +
          '<button class="btn small eng" data-fc="know" data-id="' + esc(id) + '" type="button">La sé</button>' +
          '<button class="btn small ghost" data-fc="again" data-id="' + esc(id) + '" type="button">Repasar</button>' +
          '<span class="level l' + lvl + '">Nivel ' + lvl + '</span>' +
        '</div></div>';
    }).join('') + '</div>';
  }

  h += '<p class="muted small">Repaso espaciado simplificado (4 niveles): al marcar «La sé» la ficha vuelve en 1, 2, 4 o 8 días según su nivel; al marcar «Repasar» vuelve al día siguiente. El progreso se guarda en este navegador.</p>';
  host.innerHTML = h;
}

function gradeCard(id, know) {
  const st = Object.assign({ level: 0, due: 0 }, S['fc_' + id] || {});
  if (know) {
    st.level = Math.min(3, (st.level || 0) + 1);
  } else {
    st.level = 0;
  }
  const days = FLASH_INTERVALS[Math.min(st.level, FLASH_INTERVALS.length - 1)];
  st.due = Date.now() + days * 86400000;
  S['fc_' + id] = st;
  save();
  renderFlashcards();
}

/* ------------------------------ Tarjetas --------------------------------- */

function renderPrintCards() {
  const host = $('#cards');
  if (!host) return;
  let h = '';

  KOTLIN_PATH.forEach(p => {
    p.cards.forEach(c => {
      h += '<div class="cd"><h4>' + esc(c[0]) + '</h4><small>' + esc(p.n + ': ' + p.t) + '</small><pre>' + esc(c[1]) + '</pre></div>';
    });
  });

  INGLES_FLASHCARDS.forEach(c => {
    h += '<div class="cd"><h4>' + esc(c.f) + '</h4><small>Fichas de memoria · inglés para entrevistas</small><pre>' + esc(c.b) + '</pre></div>';
  });

  host.innerHTML = h;
}

/* ------------------------------ Navegación -------------------------------- */

const TABS = ['inicio', 'kotlin', 'ingles'];

function currentTab() {
  const hash = (location.hash || '').replace(/^#\/?/, '').split('?')[0];
  if (TABS.indexOf(hash) >= 0) return hash;
  const q = new URLSearchParams(location.search).get('tab');
  if (q && TABS.indexOf(q) >= 0) return q;
  return 'inicio';
}

function goTab(tab) {
  showTab(tab);
  if (('#/' + tab) !== location.hash) {
    history.replaceState(null, '', location.pathname + '#/' + tab);
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function showTab(tab) {
  TABS.forEach(t => {
    const v = $('#vista-' + t);
    if (v) v.classList.toggle('active', t === tab);
    const b = $('[data-tab="' + t + '"]');
    if (b) b.setAttribute('aria-selected', String(t === tab));
  });
}

/* ------------------------------ Acciones ---------------------------------- */

function exportState() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mi-aprendizaje-avance.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

function importState(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data !== 'object') throw new Error('formato');
      S = data;
      save();
      renderAll();
    } catch (e) {
      alert('El archivo no tiene un formato válido.');
    }
  };
  reader.readAsText(file);
}

function resetState() {
  if (!confirm('¿Borrar todo tu avance (ambas rutas y las fichas)?')) return;
  S = {};
  save();
  renderAll();
}

function printCards() {
  renderPrintCards();
  document.body.classList.add('print-cards');
  window.print();
  setTimeout(() => document.body.classList.remove('print-cards'), 600);
}

/* ------------------------------ Render global ----------------------------- */

function renderAll() {
  renderKotlin();
  renderIngles();
  renderPrintCards();
  renderFlashcards();
  if (/[?&]openall=1/.test(location.search)) {
    $$('details.phase').forEach(d => { d.open = true; });
  }
  if (/[?&]print=cards/.test(location.search)) {
    renderPrintCards();
    document.body.classList.add('print-cards');
  }
  showTab(currentTab());
}

/* ------------------------------ Eventos ----------------------------------- */

function wireEvents() {
  document.addEventListener('click', e => {
    const tab = e.target.closest('[data-tab]');
    if (tab) { goTab(tab.getAttribute('data-tab')); return; }

    const sp = e.target.closest('[data-speak]');
    if (sp) { TTS.say(sp.getAttribute('data-speak'), sp); return; }

    const fc = e.target.closest('[data-fc]');
    if (fc) { gradeCard(fc.getAttribute('data-id'), fc.getAttribute('data-fc') === 'know'); return; }

    const act = e.target.closest('[data-action]');
    if (act) {
      const a = act.getAttribute('data-action');
      if (a === 'export') exportState();
      if (a === 'import') $('#imp').click();
      if (a === 'print') printCards();
      if (a === 'reset') resetState();
    }
  });

  document.addEventListener('change', e => {
    const cb = e.target.closest('input[type=checkbox][data-k]');
    if (cb) {
      S[cb.getAttribute('data-k')] = cb.checked;
      save();
      refreshProgress(cb.closest('details.phase'));
    }
  });

  document.addEventListener('input', e => {
    const ta = e.target.closest('textarea[data-n]');
    if (ta) { S[ta.getAttribute('data-n')] = ta.value; save(); }
  });

  document.addEventListener('toggle', e => {
    const d = e.target.closest('details.phase');
    if (d && d.parentElement) {
      const views = [$('#vista-kotlin'), $('#vista-ingles')];
      const inKotlin = views[0] && views[0].contains(d);
      const inIngles = views[1] && views[1].contains(d);
      if (inKotlin) {
        const idx = Array.from(views[0].querySelectorAll('details.phase')).indexOf(d);
        if (idx >= 0) { S['k_o' + idx] = d.open; save(); }
      } else if (inIngles) {
        const idx = Array.from(views[1].querySelectorAll('details.phase')).indexOf(d);
        if (idx >= 0) { S['i_o' + idx] = d.open; save(); }
      }
    }
  }, true);

  $('#imp').addEventListener('change', e => {
    const f = e.target.files[0];
    if (f) importState(f);
    e.target.value = '';
  });

  window.addEventListener('hashchange', () => showTab(currentTab()));
}

/* ------------------------------ Arranque ---------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  TTS.init();
  wireEvents();
  renderAll();
});
