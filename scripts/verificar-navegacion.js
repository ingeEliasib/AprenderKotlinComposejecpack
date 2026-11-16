#!/usr/bin/env node
/* ============================================================================
   Verificación funcional con jsdom (herramienta de desarrollo, no del sitio).
   Comprueba que la navegación por pestañas funciona y que el contenido de las
   dos rutas se renderiza de verdad.

   Uso:  node scripts/verificar-navegacion.js
   ========================================================================== */

const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const fallos = [];

function check(nombre, ok, detalle) {
  if (ok) {
    console.log('  ok   ' + nombre);
  } else {
    console.log('  FALLA ' + nombre + (detalle ? ' → ' + detalle : ''));
    fallos.push(nombre);
  }
}

const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', e => {
  console.log('  ERROR JS: ' + e.message);
  fallos.push('error de consola: ' + e.message);
});
virtualConsole.on('error', (...a) => {
  console.log('  ERROR: ' + a.join(' '));
  fallos.push('error de consola: ' + a.join(' '));
});

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

/* jsdom no resuelve rutas locales: levantamos un servidor estático mínimo
   para que la página cargue sus scripts tal como lo haría el navegador. */
const http = require('http');

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('no'); return;
  }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

server.listen(0, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + server.address().port + '/index.html';
  JSDOM.fromURL(url, {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(w) {
      // jsdom no implementa scrollTo: lo que importa aquí es el enrutado.
      w.scrollTo = () => {};
    }
  }).then(dom => {
  const { window } = dom;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const doc = window.document;

      console.log('\n1. Carga inicial');
      check('sin errores de JavaScript', fallos.length === 0, fallos.join(' | '));
      check('la vista de inicio está activa',
        doc.querySelector('#vista-inicio').classList.contains('active'));
      check('la pestaña Inicio queda seleccionada',
        doc.querySelector('[data-tab="inicio"]').getAttribute('aria-selected') === 'true');

      console.log('\n2. Navegación por pestañas');
      const botones = Array.from(doc.querySelectorAll('.nav button[data-tab]'));
      check('hay 3 pestañas', botones.length === 3, 'hay ' + botones.length);

      const pulsar = t => doc.querySelector('.nav button[data-tab="' + t + '"]')
        .dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

      pulsar('kotlin');
      check('Kotlin se muestra al pulsar su pestaña',
        doc.querySelector('#vista-kotlin').classList.contains('active'));
      check('la pestaña Kotlin queda seleccionada',
        doc.querySelector('.nav button[data-tab="kotlin"]').getAttribute('aria-selected') === 'true');
      check('la vista de inicio se oculta',
        !doc.querySelector('#vista-inicio').classList.contains('active'));

      const fasesKotlin = doc.querySelectorAll('#vista-kotlin details.phase');
      check('la ruta Kotlin renderiza 9 fases', fasesKotlin.length === 9, 'hay ' + fasesKotlin.length);

      // Abrir la primera fase y comprobar que hay contenido real, no solo casillas.
      fasesKotlin[0].open = true;
      const cuerpoKotlin = fasesKotlin[0].querySelector('.body').innerHTML;
      check('la fase de Kotlin trae explicación (Meta)', cuerpoKotlin.includes('Meta:'));
      check('la fase de Kotlin trae temas con texto',
        (cuerpoKotlin.match(/label class="check"/g) || []).length >= 5);
      check('la fase de Kotlin trae autoevaluación', cuerpoKotlin.includes('Autoevaluación'));
      check('la fase de Kotlin trae proyecto', cuerpoKotlin.includes('Proyecto práctico'));
      check('la fase de Kotlin trae notas', cuerpoKotlin.includes('Mis notas'));

      pulsar('ingles');
      check('Inglés se muestra al pulsar su pestaña',
        doc.querySelector('#vista-ingles').classList.contains('active'));
      const fasesIngles = doc.querySelectorAll('#vista-ingles details.phase');
      check('la ruta de inglés renderiza 10 etapas', fasesIngles.length === 10, 'hay ' + fasesIngles.length);
      const etapa0 = fasesIngles[0].querySelector('.body').innerHTML;
      const etapa3 = fasesIngles[3].querySelector('.body').innerHTML;
      check('la etapa de inglés trae bloques de contenido', etapa3.includes('class="phrase"'));
      check('la etapa de inglés trae botón de audio', etapa3.includes('data-speak'));
      check('la etapa de inglés trae la tabla de atributos', etapa0.includes('<table>'));
      check('la sección de fichas existe', !!doc.querySelector('#flashcards'));

      // Los botones de la portada también deben cambiar de pestaña.
      doc.querySelector('#vista-inicio button[data-tab="kotlin"]')
        .dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
      check('el botón de la portada abre Kotlin',
        doc.querySelector('#vista-kotlin').classList.contains('active'));

      console.log('\n3. Progreso y persistencia');
      const cb = doc.querySelector('#vista-kotlin input[data-k]');
      cb.checked = true;
      cb.dispatchEvent(new window.Event('change', { bubbles: true }));
      const guardado = JSON.parse(window.localStorage.getItem('mi-aprendizaje-v2') || '{}');
      check('marcar una casilla guarda el estado', Object.keys(guardado).length > 0);
      const pct = doc.querySelector('#vista-kotlin .pct').textContent;
      check('el porcentaje se recalcula al instante', pct !== '0%', 'marca ' + pct);

      console.log('\n4. Enlace directo por hash');
      window.location.hash = '#/ingles';
      window.dispatchEvent(new window.HashChangeEvent('hashchange'));
      check('la URL #/ingles abre la ruta de inglés',
        doc.querySelector('#vista-ingles').classList.contains('active'));

      console.log('\n' + (fallos.length
        ? 'FALLOS: ' + fallos.length + '\n  - ' + fallos.join('\n  - ')
        : 'Todo correcto.'));
      process.exit(fallos.length ? 1 : 0);
    }, 600);
  });
  }).catch(e => {
    console.error('No se pudo cargar la página:', e);
    process.exit(1);
  });
});
