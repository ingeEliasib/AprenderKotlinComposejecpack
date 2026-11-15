#!/usr/bin/env node
/* ============================================================================
   Validador de contenido — Mi Aprendizaje
   Comprueba la estructura de las dos rutas antes de publicar.
   Uso:  node scripts/validar-contenido.js
   Sin dependencias: solo Node.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errores = [];
const avisos = [];

function err(msg) { errores.push(msg); }
function aviso(msg) { avisos.push(msg); }

function cargar(archivo) {
  const ruta = path.join(ROOT, 'assets', 'js', archivo);
  const src = fs.readFileSync(ruta, 'utf8');
  // Ejecutamos el archivo en un contexto aislado para obtener los datos.
  const ctx = {};
  const fn = new Function(src + `
;return {
  KOTLIN_PATH: typeof KOTLIN_PATH !== 'undefined' ? KOTLIN_PATH : null,
  INGLES_PATH: typeof INGLES_PATH !== 'undefined' ? INGLES_PATH : null,
  INGLES_FLASHCARDS: typeof INGLES_FLASHCARDS !== 'undefined' ? INGLES_FLASHCARDS : null
};`);
  return fn();
}

/* ------------------------------ validadores ------------------------------- */

function validarFase(f, etiqueta, indice) {
  const pre = `${etiqueta}[${indice}] ${f.n || '(sin n)'}:`;
  for (const campo of ['n', 't', 'goal', 'proj', 'src']) {
    if (typeof f[campo] !== 'string' || !f[campo].trim()) err(`${pre} falta o vacío el campo "${campo}"`);
  }
  if (!Array.isArray(f.topics) || !f.topics.length) err(`${pre} "topics" debe ser un array con contenido`);
  if (!Array.isArray(f.flow) || f.flow.length < 2) err(`${pre} "flow" debe tener al menos 2 pasos`);
  if (!Array.isArray(f.q) || !f.q.length) err(`${pre} "q" (autoevaluación) vacía`);
  (f.q || []).forEach((par, i) => {
    if (!Array.isArray(par) || par.length !== 2 || !par[0] || !par[1]) err(`${pre} pregunta ${i} mal formada`);
  });
  if (!Array.isArray(f.cards) || !f.cards.length) err(`${pre} "cards" vacía`);
  (f.cards || []).forEach((c, i) => {
    if (!Array.isArray(c) || c.length !== 2 || !c[0] || !c[1]) err(`${pre} tarjeta ${i} mal formada`);
  });
  if (f.tools) {
    f.tools.forEach((t, i) => {
      if (!t.title || !t.html) err(`${pre} tools[${i}] necesita "title" y "html"`);
      (t.links || []).forEach(l => {
        if (!Array.isArray(l) || l.length !== 2 || !/^https:\/\//.test(l[1] || '')) {
          err(`${pre} tools[${i}] enlace inválido: ${JSON.stringify(l)}`);
        }
      });
    });
  }
}

function validarBloques(bloques, etiqueta) {
  (bloques || []).forEach((b, i) => {
    const pre = `${etiqueta} bloque[${i}] (${b.type}):`;
    if (!b.type) return err(`${pre} sin "type"`);
    if (b.title && typeof b.title !== 'string') err(`${pre} "title" debe ser texto`);
    if (b.type === 'table') {
      if (!Array.isArray(b.head) || !Array.isArray(b.rows)) err(`${pre} necesita head y rows`);
      (b.rows || []).forEach((r, j) => {
        if (!Array.isArray(r) || r.length !== b.head.length) {
          err(`${pre} fila ${j} tiene ${r ? r.length : '?'} celdas y el encabezado tiene ${b.head.length}`);
        }
        (r || []).forEach(c => { if (c === undefined || c === null || c === '') err(`${pre} fila ${j} con celda vacía`); });
      });
    }
    if (b.type === 'errors') {
      (b.rows || []).forEach((r, j) => {
        if (!Array.isArray(r) || r.length !== 3 || r.some(c => !c)) err(`${pre} fila ${j} mal formada`);
      });
    }
    if (b.type === 'vocab') {
      (b.items || []).forEach((v, j) => {
        for (const campo of ['en', 'ipa', 'approx', 'es']) {
          if (!v[campo]) err(`${pre} palabra ${j} (${v.en}) sin "${campo}"`);
        }
        if (v.ipa && !v.ipa.startsWith('/')) err(`${pre} IPA de "${v.en}" no empieza por "/": ${v.ipa}`);
        (v.links || []).forEach(l => {
          if (!/^https:\/\/dictionary\.cambridge\.org\//.test(l[1] || '')) {
            err(`${pre} "${v.en}" enlaza a algo que no es Cambridge: ${l[1]}`);
          }
        });
      });
    }
    if (b.type === 'phrases') {
      (b.items || []).forEach((p, j) => {
        if (!p.en || !p.es) err(`${pre} frase ${j} sin "en" o "es"`);
      });
    }
    if (b.type === 'qa') {
      (b.items || []).forEach((q, j) => {
        for (const campo of ['q', 'es', 'listens', 'star', 'follow']) {
          if (!q[campo]) err(`${pre} pregunta ${j} sin "${campo}"`);
        }
      });
    }
    if (b.type === 'checklist') {
      (b.groups || []).forEach((g, j) => {
        if (!g.t || !Array.isArray(g.items) || !g.items.length) err(`${pre} grupo ${j} mal formado`);
      });
    }
    if (b.note && typeof b.note !== 'string') err(`${pre} "note" debe ser texto`);
    if (b.links) {
      b.links.forEach(l => {
        if (!Array.isArray(l) || l.length !== 2 || !/^https:\/\//.test(l[1] || '')) {
          err(`${pre} enlace inválido: ${JSON.stringify(l)}`);
        }
      });
    }
  });
}

/* --------------------------------- ejecución ------------------------------ */

const { KOTLIN_PATH } = cargar('data-kotlin.js');
const { INGLES_PATH, INGLES_FLASHCARDS } = cargar('data-ingles.js');

KOTLIN_PATH.forEach((f, i) => validarFase(f, 'KOTLIN', i));
INGLES_PATH.forEach((f, i) => {
  validarFase(f, 'INGLES', i);
  validarBloques(f.blocks, `INGLES ${f.n}`);
});

INGLES_FLASHCARDS.forEach((c, i) => {
  if (!c.f || !c.b || !c.s) err(`FLASHCARD[${i}] mal formada: ${JSON.stringify(c)}`);
});

const duplicados = INGLES_FLASHCARDS.map(c => c.f).filter((f, i, a) => a.indexOf(f) !== i);
duplicados.forEach(d => err(`Ficha duplicada: ${d}`));

/* Comprobaciones de coherencia con el texto del sitio. */
const totalFases = KOTLIN_PATH.length;
const totalEtapas = INGLES_PATH.length;
const totalPalabras = INGLES_PATH.flatMap(p => p.blocks || [])
  .filter(b => b.type === 'vocab').reduce((n, b) => n + b.items.length, 0);
const totalPreguntas = INGLES_PATH.flatMap(p => p.blocks || [])
  .filter(b => b.type === 'qa').reduce((n, b) => n + b.items.length, 0);

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const datos = fs.readFileSync(path.join(ROOT, 'assets', 'js', 'data-ingles.js'), 'utf8') +
              fs.readFileSync(path.join(ROOT, 'assets', 'js', 'data-kotlin.js'), 'utf8');

function comprobarCifra(valor, real) {
  const re = new RegExp('\\b' + valor + '\\b');
  if (!re.test(html) && !re.test(readme) && !re.test(datos)) {
    aviso(`No se encuentra la cifra «${valor}» en index.html, README.md ni en los datos (valor real: ${real}). Revisa que el texto siga cuadrando.`);
  }
}
comprobarCifra(totalFases, totalFases);
comprobarCifra(totalEtapas, totalEtapas);
comprobarCifra(totalPalabras, totalPalabras);
comprobarCifra(totalPreguntas, totalPreguntas);
comprobarCifra(INGLES_FLASHCARDS.length, INGLES_FLASHCARDS.length);

/* --------------------------------- informe -------------------------------- */

console.log('Validación de contenido — Mi Aprendizaje');
console.log('----------------------------------------');
console.log(`Kotlin            : ${totalFases} fases`);
console.log(`Inglés            : ${totalEtapas} etapas`);
console.log(`Vocabulario       : ${totalPalabras} palabras`);
console.log(`Preguntas de conducta: ${totalPreguntas}`);
console.log(`Fichas de memoria : ${INGLES_FLASHCARDS.length}`);
console.log('');

if (avisos.length) {
  console.log(`Avisos (${avisos.length}):`);
  avisos.forEach(a => console.log('  - ' + a));
  console.log('');
}
if (errores.length) {
  console.log(`ERRORES (${errores.length}):`);
  errores.forEach(e => console.log('  x ' + e));
  process.exit(1);
}
console.log('Sin errores.');
