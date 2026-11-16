#!/usr/bin/env node
/* ============================================================================
   Escanea el contenido en busca de texto corrupto:
     · mojibake (UTF-8 guardado como Latin-1),
     · palabras inglesas coladas dentro de frases en español,
     · palabras pegadas por un espacio perdido.

   El sitio tiene bastante código (Kotlin, APIs de Compose), así que no se
   avisa de los identificadores en camelCase: solo de los defectos concretos
   que ya se han encontrado, para que la señal no se llene de ruido.

   Uso:  node scripts/escanear-texto.js
   ========================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FICHEROS = [
  'index.html',
  'README.md',
  'assets/js/data-ingles.js',
  'assets/js/data-kotlin.js'
];

/* Palabras inglesas que no deberían aparecer dentro de una frase en español. */
const INTRUSAS = [
  'offering', 'promised', 'FontsBold', 'Salary', 'referénce', 'transfers',
  'evaluator', 'episodioHeroico', 'defalse', 'fundamentals'
];

/* Firmas concretas de texto roto yaDetectadas. */
const ROTOS = [
  { re: /[\u00C2\u00C3][\u0080-\u00BF]/g, que: 'mojibake (UTF-8 leído como Latin-1)' },
  { re: /\bdefalse\b/gi, que: 'palabras pegadas' },
  { re: /\bLapalabra\b/gi, que: 'palabras pegadas' },
  { re: /\bmeociupe\b/gi, que: 'palabras pegadas' },
  { re: /\bepisodioHeroico\b/gi, que: 'palabras pegadas' },
  { re: /\bquedarFontsBold\b/gi, que: 'palabras pegadas' },
  { re: /\bque offering\b/gi, que: 'palabra sustituida' },
  { re: /\bque promised\b/gi, que: 'palabra sustituida' }
];

let hallazgos = 0;

for (const f of FICHEROS) {
  const texto = fs.readFileSync(path.join(ROOT, f), 'utf8');
  texto.split('\n').forEach((linea, i) => {
    const problemas = [];

    ROTOS.forEach(r => {
      const m = linea.match(r.re);
      if (m) problemas.push(r.que + ': ' + Array.from(new Set(m)).join(', '));
    });

    INTRUSAS.forEach(p => {
      const re = new RegExp('\\b' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (re.test(linea)) problemas.push('palabra en inglés dentro de texto español: ' + p);
    });

    if (problemas.length) {
      hallazgos += problemas.length;
      console.log('\n' + f + ':' + (i + 1));
      problemas.forEach(p => console.log('  · ' + p));
      console.log('  > ' + linea.trim().slice(0, 200));
    }
  });
}

console.log('\n' + (hallazgos ? hallazgos + ' hallazgo(s)' : 'Sin hallazgos.'));
process.exit(hallazgos ? 1 : 0);
