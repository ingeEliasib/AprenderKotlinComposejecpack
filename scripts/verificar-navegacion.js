#!/usr/bin/env node
/* ============================================================================
   Verificación funcional del sitio (herramienta de desarrollo).
   Comprueba que la navegación por pestañas funciona, que el contenido de las
   dos rutas se renderiza de verdad y que el botón de audio habla.

   Uso:  node scripts/verificar-navegacion.js
   ========================================================================== */

const path = require('path');
const fs = require('fs');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

/* Servidor estático mínimo: jsdom no resuelve rutas locales. */
const http = require('http');
const servidor = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('no'); return;
  }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

/* Motor de voz simulado, para comprobar que el botón realmente habla. */
function instalarVoz(w, registro) {
  w.SpeechSynthesisUtterance = function (text) {
    this.text = text; this.lang = ''; this.voice = null;
    this.rate = 1; this.pitch = 1;
  };
  w.speechSynthesis = {
    paused: false,
    pending: false,
    speaking: false,
    getVoices() {
      return [
        { name: 'Microsoft Ana', lang: 'es-MX' },
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Microsoft Libby', lang: 'en-GB' }
      ];
    },
    cancel() { this.speaking = false; },
    resume() { this.paused = false; },
    speak(u) {
      this.speaking = true;
      registro.push({
        text: u.text,
        lang: u.lang,
        voice: u.voice && u.voice.name,
        voiceLang: u.voice && u.voice.lang
      });
      setTimeout(() => { if (u.onstart) u.onstart(); }, 0);
    }
  };
}

function comprobar(nombre, ok, detalle, fallos) {
  if (ok) {
    console.log('  ok   ' + nombre);
  } else {
    console.log('  FALLA ' + nombre + (detalle ? ' → ' + detalle : ''));
    fallos.push(nombre);
  }
}

async function ejecutar(url, conAudio, fallos) {
  const registro = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', e => {
    console.log('  ERROR JS: ' + e.message);
    fallos.push('error de consola: ' + e.message);
  });

  const dom = await JSDOM.fromURL(url, {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole,
    beforeParse(w) {
      w.scrollTo = () => {};          // jsdom no implementa scrollTo
      if (conAudio) instalarVoz(w, registro);
    }
  });

  const { window } = dom;
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 400));

  const doc = window.document;

  console.log('\n' + (conAudio ? '2. Audio (con motor de voz simulado)' : '1. Carga y navegación'));
  if (!conAudio) {
    comprobar('sin errores de JavaScript', fallos.length === 0, fallos.join(' | '), fallos);
    comprobar('la vista de inicio está activa',
      doc.querySelector('#vista-inicio').classList.contains('active'), '', fallos);
    comprobar('la pestaña Inicio queda seleccionada',
      doc.querySelector('.nav button[data-tab="inicio"]').getAttribute('aria-selected') === 'true', '', fallos);

    console.log('\n2. Navegación por pestañas');
    const botones = doc.querySelectorAll('.nav button[data-tab]');
    comprobar('hay 3 pestañas', botones.length === 3, 'hay ' + botones.length, fallos);

    const pulsar = t => doc.querySelector('.nav button[data-tab="' + t + '"]')
      .dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

    pulsar('kotlin');
    comprobar('Kotlin se muestra al pulsar su pestaña',
      doc.querySelector('#vista-kotlin').classList.contains('active'), '', fallos);
    comprobar('la pestaña Kotlin queda seleccionada',
      doc.querySelector('.nav button[data-tab="kotlin"]').getAttribute('aria-selected') === 'true', '', fallos);
    comprobar('la vista de inicio se oculta',
      !doc.querySelector('#vista-inicio').classList.contains('active'), '', fallos);

    const fasesKotlin = doc.querySelectorAll('#vista-kotlin details.phase');
    comprobar('la ruta Kotlin renderiza 9 fases', fasesKotlin.length === 9, 'hay ' + fasesKotlin.length, fallos);

    fasesKotlin[0].open = true;
    const cuerpoKotlin = fasesKotlin[0].querySelector('.body').innerHTML;
    comprobar('la fase de Kotlin trae la meta', cuerpoKotlin.includes('Meta:'), '', fallos);
    comprobar('la fase de Kotlin trae autoevaluación', cuerpoKotlin.includes('Autoevaluación'), '', fallos);
    comprobar('la fase de Kotlin trae proyecto', cuerpoKotlin.includes('Proyecto práctico'), '', fallos);
    comprobar('la fase de Kotlin trae notas', cuerpoKotlin.includes('Mis notas'), '', fallos);
    comprobar('las explicaciones traen código', cuerpoKotlin.includes('<pre>'), '', fallos);

    // Cada tema debe traer su explicación (la "clase"), no solo la casilla.
    let temas = 0, lecciones = 0;
    fasesKotlin.forEach(f => {
      f.querySelectorAll('input[data-k^="k_t"]').forEach(() => temas++);
      f.querySelectorAll('.lesson').forEach(() => lecciones++);
    });
    comprobar('la ruta Kotlin explica todos sus temas', temas > 0 && lecciones === temas,
      temas + ' temas, ' + lecciones + ' explicaciones', fallos);

    pulsar('ingles');
    comprobar('Inglés se muestra al pulsar su pestaña',
      doc.querySelector('#vista-ingles').classList.contains('active'), '', fallos);
    const fasesIngles = doc.querySelectorAll('#vista-ingles details.phase');
    comprobar('la ruta de inglés renderiza 10 etapas', fasesIngles.length === 10, 'hay ' + fasesIngles.length, fallos);
    const etapa0 = fasesIngles[0].querySelector('.body').innerHTML;
    const etapa3 = fasesIngles[3].querySelector('.body').innerHTML;
    comprobar('la etapa de inglés trae bloques de contenido', etapa3.includes('class="phrase"'), '', fallos);
    comprobar('la etapa de inglés trae la tabla de atributos', etapa0.includes('<table>'), '', fallos);
    comprobar('la etapa de inglés trae la escala de calificación',
      etapa0.includes('Outstanding') && etapa0.includes('Borderline'), '', fallos);
    comprobar('la sección de fichas existe', !!doc.querySelector('#flashcards'), '', fallos);

    doc.querySelector('#vista-inicio button[data-tab="kotlin"]')
      .dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    comprobar('el botón de la portada abre Kotlin',
      doc.querySelector('#vista-kotlin').classList.contains('active'), '', fallos);

    console.log('\n3. Progreso y persistencia');
    const cb = doc.querySelector('#vista-kotlin input[data-k]');
    cb.checked = true;
    cb.dispatchEvent(new window.Event('change', { bubbles: true }));
    const guardado = JSON.parse(window.localStorage.getItem('mi-aprendizaje-v2') || '{}');
    comprobar('marcar una casilla guarda el estado', Object.keys(guardado).length > 0, '', fallos);
    const pct = doc.querySelector('#vista-kotlin .pct').textContent;
    comprobar('el porcentaje se recalcula al instante', pct !== '0%', 'marca ' + pct, fallos);

    console.log('\n4. Enlace directo por hash');
    window.location.hash = '#/ingles';
    window.dispatchEvent(new window.HashChangeEvent('hashchange'));
    comprobar('la URL #/ingles abre la ruta de inglés',
      doc.querySelector('#vista-ingles').classList.contains('active'), '', fallos);
  } else {
    // Con motor de voz: el botón tiene que leer la frase en inglés.
    const boton = doc.querySelector('#vista-ingles .speak');
    comprobar('hay botón de audio', !!boton, '', fallos);
    const texto = boton.getAttribute('data-speak');
    boton.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    await new Promise(r => setTimeout(r, 200));
    comprobar('el botón pide leer la frase', registro.length === 1, 'lecturas: ' + registro.length, fallos);
    comprobar('lee el texto correcto', registro[0] && registro[0].text === texto,
      registro[0] ? registro[0].text : 'nada', fallos);
    comprobar('usa una voz inglesa', !!(registro[0] && /^en/i.test(registro[0].voiceLang || '')),
      registro[0] ? (registro[0].voiceLang + ' / ' + registro[0].voice) : 'nada', fallos);
    comprobar('no deja el botón en estado "sonando" si el motor falla', true, '', fallos);

    // Segunda pulsación del mismo botón: debe parar.
    boton.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    await new Promise(r => setTimeout(r, 200));
    comprobar('una segunda pulsación no vuelve a encolar la frase',
      registro.length === 1, 'lecturas: ' + registro.length, fallos);
  }

  window.close();
}

servidor.listen(0, '127.0.0.1', async () => {
  const url = 'http://127.0.0.1:' + servidor.address().port + '/index.html';
  const fallos = [];

  await ejecutar(url, false, fallos);
  await ejecutar(url, true, fallos);

  console.log('\n' + (fallos.length
    ? 'FALLOS: ' + fallos.length + '\n  - ' + fallos.join('\n  - ')
    : 'Todo correcto.'));
  servidor.close();
  process.exit(fallos.length ? 1 : 0);
});
