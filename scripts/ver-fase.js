#!/usr/bin/env node
/* Muestra, en texto plano, como queda una fase renderizada. Sirve para
   revisar el resultado sin abrir el navegador. */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const TIPOS = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

const http = require('http');
const servidor = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});

const numero = parseInt(process.argv[2] || '0', 10);
const ruta = process.argv[3] || 'kotlin';

servidor.listen(0, '127.0.0.1', async () => {
  const url = 'http://127.0.0.1:' + servidor.address().port + '/index.html';
  const vc = new VirtualConsole();
  const dom = await JSDOM.fromURL(url, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) { w.scrollTo = () => {}; }
  });
  const { window } = dom;
  await new Promise(r => window.addEventListener('load', r));
  await new Promise(r => setTimeout(r, 400));

  const doc = window.document;
  const fases = doc.querySelectorAll('#vista-' + ruta + ' details.phase');
  const fase = fases[numero];
  if (!fase) { console.error('No existe la fase ' + numero); process.exit(1); }

  console.log('=== ' + fase.querySelector('summary span').textContent + ' ===\n');
  const txt = fase.querySelector('.body').textContent
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
  console.log(txt);

  window.close();
  servidor.close();
  process.exit(0);
});
