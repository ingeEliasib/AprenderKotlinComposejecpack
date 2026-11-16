#!/usr/bin/env node
/* Comprueba que las explicaciones de los temas no tienen etiquetas HTML
   mal cerradas ni caracteres «<» sin escapar dentro del código. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function cargar(fichero, nombre) {
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'js', fichero), 'utf8');
  return new Function(src + '; return typeof ' + nombre + ' !== "undefined" ? ' + nombre + ' : null;')();
}

const rutas = [
  { nombre: 'KOTLIN_PATH', fichero: 'data-kotlin.js' },
  { nombre: 'INGLES_PATH', fichero: 'data-ingles.js' }
];

let problemas = 0;

for (const r of rutas) {
  const datos = cargar(r.fichero, r.nombre);
  if (!datos) { console.log(r.fichero + ': no se pudo cargar'); continue; }

  let temas = 0;
  for (const fase of datos) {
    for (const t of (fase.topics || [])) {
      if (typeof t === 'string' || !t.html) continue;
      temas++;

      // '<' seguido de algo que no sea una etiqueta: texto mal escapado.
      const sueltos = t.html.match(/<(?![a-zA-Z/!])/g);
      if (sueltos) {
        problemas++;
        console.log(r.fichero + ' · ' + fase.n + ' · "' + t.t + '": < sin escapar');
      }

      // Etiquetas abiertas que nunca se cierran.
      const abiertas = (t.html.match(/<(p|ul|ol|li|pre|code|b|i|div|table|tr|td|th)\b[^>]*>/g) || []);
      const cerradas = (t.html.match(/<\/(p|ul|ol|li|pre|code|b|i|div|table|tr|td|th)>/g) || []);
      if (abiertas.length !== cerradas.length) {
        problemas++;
        console.log(r.fichero + ' · ' + fase.n + ' · "' + t.t + '": ' +
                    abiertas.length + ' aperturas y ' + cerradas.length + ' cierres');
      }
    }
  }
  console.log(r.fichero + ': ' + temas + ' temas con explicación');
}

console.log('\n' + (problemas ? problemas + ' problema(s)' : 'Sin problemas de HTML.'));
process.exit(problemas ? 1 : 0);
