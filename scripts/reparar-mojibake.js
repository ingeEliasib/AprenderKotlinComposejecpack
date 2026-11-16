#!/usr/bin/env node
/* Repara mojibake (texto UTF-8 guardado como si fuera Latin-1) en los ficheros
   de contenido. Solo toca las secuencias «Â»/«Ã» seguidas de un carácter del
   rango U+0080–U+00BF, que es exactamente la firma de ese tipo de corrupción;
   el resto del texto se deja intacto.

   Uso:  node scripts/reparar-mojibake.js          (aplica la reparación)
         node scripts/reparar-mojibake.js --check  (solo informa) */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FICHEROS = [
  'index.html',
  'README.md',
  'assets/js/data-ingles.js',
  'assets/js/data-kotlin.js',
  'assets/js/app.js'
];

const SOLO_INFORMAR = process.argv.includes('--check');
const MOJIBAKE = /[\u00C2\u00C3][\u0080-\u00BF]/g;

function reparar(cadena) {
  return cadena.replace(MOJIBAKE, seq => {
    const bytes = Buffer.from(seq, 'latin1');
    const decodificado = bytes.toString('utf8');
    // Si no se decodifica a algo válido (caracteres de reemplazo), se deja.
    return decodificado.includes('\uFFFD') ? seq : decodificado;
  });
}

let total = 0;

for (const f of FICHEROS) {
  const ruta = path.join(ROOT, f);
  const original = fs.readFileSync(ruta, 'utf8');
  const reparado = reparar(original);
  const cambios = original.length - reparado.length;

  if (cambios && !SOLO_INFORMAR) fs.writeFileSync(ruta, reparado, 'utf8');
  if (cambios) {
    console.log(f + ': ' + cambios + ' carácter(es) reparados' + (SOLO_INFORMAR ? ' (pendiente)' : ''));
    total += cambios;
  }
}

console.log('\nTotal: ' + total + (total ? '' : ' — no había nada que reparar'));
