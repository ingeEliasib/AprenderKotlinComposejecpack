# Mi Aprendizaje

Rutas de aprendizaje con contenido que se puede estudiar, no solo marcar. Hoy hay dos:

| Ruta | Rama | Contenido | Estado |
|------|------|-----------|--------|
| **Kotlin + Jetpack Compose** | Aplicaciones móviles | 9 fases: de los fundamentos de Kotlin a publicar una app Android con login, Room, Firebase Auth y README de proyecto. Los 59 temas llevan su explicación y su código. | Publicada |
| **Inglés para entrevistas** | Preparación profesional | 10 etapas: mapa de la entrevista, presentación de 60 s, método STAR, 12 preguntas de conducta reales, preguntas hipotéticas, tus preguntas para el entrevistador, vocabulario técnico con IPA y audio, errores de hispanohablantes, 26 fichas de memoria y seguimiento. | Publicada |

No es un sitio de enlaces a tutoriales: cada fase trae su clase, un proyecto, autoevaluación, tarjetas de memoria y un porcentaje de avance que se calcula de verdad.

---

## Reglas de contenido (la parte importante)

Cuatro reglas que no se negocian:

1. **Cada fase dice de dónde sale.** Declara su fuente base y enlaza la fuente primaria cuando aplica.
2. **Lo que se practica es literal, lo que es modelo está marcado.** Las frases de entrevista son literales de las fuentes citadas. Los guiones inventados para este sitio (la respuesta STAR de ejemplo, el guion de una pregunta hipotética) lo dicen de forma expresa: **no describen hechos reales**.
3. **Los enlaces se verificaron el 15 de noviembre de 2026**, y la numeración de unidades del curso de Android corresponde a la versión vigente del curso oficial (8 unidades).
4. **Lo que no se puede comprobar no se escribe.** Se omite o queda marcado como «investiga». Por eso la sección de rutas type-safe de Navigation enlaza a las notas de versión en lugar de afirmar una versión concreta que cambia entre publicaciones.

La tabla completa de fuentes está en la portada del sitio (`De dónde sale todo`) y en cada etapa.

---

## Funcionalidades

- **Navegación por pestañas** con enlace directo: `index.html#/kotlin`, `index.html#/ingles`. También acepta `?tab=kotlin` / `?tab=ingles`.
- **Cada tema es una clase**: la explicación y el código mínimo van delante de la casilla, no después de una lista de tareas.
- **Progreso real**: cada tema, cada proyecto práctico y la autoevaluación son casillas. El porcentaje se recalcula al instante, sin recargar.
- **Notas por fase**, guardadas junto al avance.
- **Audio de pronunciación** en cada frase, palabra y ficha, con la voz inglesa del navegador (Web Speech API). Una segunda pulsación para; si el navegador no puede hablar, se explica por qué en vez de fallar en silencio.
- **Fichas de memoria con repetición espaciada** (4 niveles: 1, 2, 4 y 8 días). Botón «La sé» / «Repasar».
- **Exportar / importar** el avance en JSON.
- **Impresión de tarjetas** en dos columnas, con CSS de impresión.
- **Tema claro y oscuro** automático según el sistema.
- **Sin dependencias**: HTML, CSS y JavaScript planos. No hay build, no hay `node_modules`, no hay framework.

---

## Estructura del proyecto

```
.
├── index.html                     # Portada, pestañas, pie con perfil profesional
├── README.md
├── package.json                   # Solo para los scripts de comprobación (no hay build)
├── LICENSE                        # Apache-2.0
├── .gitignore
├── scripts/
│   ├── validar-contenido.js       # Comprueba la estructura del contenido
│   ├── verificar-navegacion.js    # Comprueba en un navegador simulado que todo funciona
│   ├── comprobar-html-temas.js    # Comprueba el HTML de las explicaciones de los temas
│   ├── escanear-texto.js          # Busca texto corrupto (mojibake, mezclas de idiomas)
│   ├── reparar-mojibake.js        # Repara el mojibake si vuelve a colarse
│   └── ver-fase.js                # Muestra una fase renderizada en texto plano
└── assets/
    ├── css/
    │   └── styles.css             # Estilos, tema, responsive e impresión
    ├── js/
    │   ├── data-kotlin.js         # Contenido de la ruta Kotlin (9 fases)
    │   ├── data-ingles.js         # Contenido de la ruta de inglés (10 etapas + 26 fichas)
    │   └── app.js                 # Motor: pestañas, progreso, audio, fichas, export/import
    └── img/
        ├── logo.svg               # Logotipo
        ├── favicon.svg            # Icono de la pestaña
        ├── hero-kotlin.svg        # Ilustración de portada (ruta Kotlin)
        └── hero-ingles.svg        # Ilustración de portada (ruta inglés)
```

---

## Cómo verlo en local

No necesita nada instalado más allá de un servidor estático. Desde la raíz del repositorio:

```bash
python -m http.server 8000
# o
npx serve .
```

Luego abre <http://localhost:8000>. También funciona abrir `index.html` directamente con doble clic (el sitio no usa `fetch` ni módulos ES).

> Nota: algunas funciones del navegador (síntesis de voz) están limitadas en contextos `file://`. Si el audio no funciona, usa el servidor local.

### Si el botón 🔊 no suena

El audio usa la síntesis de voz del navegador (`SpeechSynthesis`), no hay archivos de sonido en el repositorio. Si el botón no hace nada:

1. **Abre el sitio por `http://localhost:8000`** y no con doble clic sobre `index.html`. Chrome limita la síntesis de voz en `file://`.
2. **Usa Chrome, Edge o Safari.** Firefox y Safari funcionan, pero la lista de voces installed puede estar vacía si el sistema no tiene ninguna voz en inglés.
3. **Pulsa otra vez para parar.** La segunda pulsación del mismo botón cancela la locución.
4. Si aun así no suena, el sitio lo dice en pantalla con un aviso en la parte inferior: el botón ya no falla en silencio, te explica qué ha pasado.

---

## Cómo publicar en GitHub Pages

GitHub Pages publica sitios **estáticos**: toma HTML, CSS y JS de un repositorio y los sirve. No ejecuta código de servidor, así que no sirve para un backend, pero para este sitio es exactamente lo que hace falta.

1. Sube el contenido a la rama `main` (o la rama que elijas).
2. En el repositorio: **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch** y la rama `main` con carpeta `/ (root)`.
4. Espera el despliegue y el sitio queda disponible en `https://<usuario>.github.io/<repositorio>/`.

Detalle exacto y actualizado en la documentación oficial: <https://docs.github.com/en/pages>.

Consideraciones:

- En el plan gratuito, GitHub Pages exige un repositorio **público**.
- El progreso del usuario **no** vive en GitHub: cada navegador y cada dispositivo tiene el suyo (localStorage). Por eso la página insiste en exportar el avance.
- Si el repositorio debe ser privado, hay que usar otro hosting estático (Cloudflare Pages, Netlify, Vercel) o una cuenta de GitHub con GitHub Pages para repositorios privados.

---

## Cómo crecer el sitio

### Añadir una fase o una etapa

1. Edita `assets/js/data-kotlin.js` o `assets/js/data-ingles.js`.
2. Añade un objeto con esta forma:

```js
{
  n:'Fase 9', t:'Título de la fase', goal:'Meta concreta.',
  proj:'Qué vas a construir.',
  flow:['Paso 1','Paso 2'],
  topics:['Tema verificable', { t:'Tema con explicación', html:'<p>La clase del tema…</p>' }],
  q:[['Pregunta de autoevaluación','Respuesta.']],
  cards:[['Título de tarjeta','código']],
  src:'Fuente base de la fase',
  tools:[{ title:'Caja explicativa', html:'<p>HTML</p>', links:[['Texto','https://…']] }]
}
```

**Un tema puede ser de dos formas.** Un tema escrito como texto plano es solo
una casilla de la lista de progreso. Un tema escrito como objeto
`{ t, html }` es una **clase**: la casilla del tema aparece con su explicación
debajo, con el código mínimo para entenderlo. En la ruta de Kotlin **todos**
los temas llevan explicación; en la de inglés, la clase va en el bloque
`blocks` que sigue a la lista de temas.

En la ruta de inglés hay además el bloque `blocks`, que acepta estos tipos:

| Tipo | Para qué sirve |
|------|----------------|
| `note` | Caja destacada con explicación y enlaces |
| `list` | Lista de puntos |
| `steps` | Pasos numerados (cada uno con título y cuerpo) |
| `table` | Tabla con encabezado, filas y nota al pie |
| `phrases` | Frases en inglés con traducción y botón de audio |
| `vocab` | Vocabulario con IPA, aproximación en español y audio |
| `qa` | Banco de preguntas con «qué busca», «cómo responder» y follow-up |
| `errors` | Tabla de errores frecuentes (columnas: incorrecto / correcto / por qué) |
| `script` | Guion modelo, marcado como tal |
| `checklist` | Lista de verificación por grupos |

3. El progreso, el contador de pasos y las tarjetas impresas se recalculan solos: no hay que tocar `app.js`.

### Añadir una ficha de memoria

En `assets/js/data-ingles.js`, dentro de `INGLES_FLASHCARDS`:

```js
{ f:'Anverso (pregunta o concepto)',
  b:'Reverso (respuesta o regla)',
  s:'Texto en inglés que suena al pulsar el audio' }
```

### Añadir una rama nueva

La estructura ya está preparada: crea `assets/js/data-<rama>.js` con el mismo formato de fases, un `view` con `id="vista-<rama>"` en `index.html`, un botón de navegación con `data-tab="<rama>"` y añade `<rama>` a la lista `TABS` en `app.js`. Las ramas ya planteadas (bases de datos, DevOps, algoritmos) están listadas en la portada **solo como candidatas**: no se publican hasta tener contenido completo y con fuentes.

### Revisión rápida

Añadiendo `?openall=1` a la URL se abren todas las fases a la vez, útil para revisar el contenido completo o presentarlo.

### Validar el contenido antes de publicar

Hay un validador sin dependencias que comprueba la estructura de las dos rutas (campos obligatorios, filas de tabla con el mismo número de celdas que el encabezado, IPA con formato válido, enlaces a Cambridge, fichas duplicadas, y que todo tema con explicación tenga su `t` y su `html`) y avisa si las cifras del texto ya no coinciden con el contenido real:

```bash
npm run validate
# o directamente
node scripts/validar-contenido.js
```

Salida esperada:

```
Kotlin            : 9 fases
Inglés            : 10 etapas
Vocabulario       : 28 palabras
Preguntas de conducta: 12
Fichas de memoria : 26
Sin errores.
```

### Comprobar que la página funciona de verdad

El validador anterior mira los datos, no el navegador. `verificar-navegacion.js`
levanta la página en un navegador simulado (jsdom) y comprueba el comportamiento:
que las pestañas cambian de vista, que las 9 fases y las 10 etapas se renderizan,
que cada tema trae su explicación, que marcar una casilla guarda el avance y que
el botón de audio pide leer la frase en inglés con voz inglesa.

```bash
npm run verify
```

Necesita `jsdom` instalado (`npm install --no-save jsdom`). Es una herramienta de
desarrollo: no forma parte del sitio ni de GitHub Pages.

### Detectar texto corrupto

Una generación automática puede colar mojibake (UTF-8 guardado como Latin-1) o
palabras en inglés dentro de frases en español. `escanear-texto.js` las busca:

```bash
npm run scan
```

Y si aparecen, `node scripts/reparar-mojibake.js` las repara.

El HTML de las explicaciones de los temas se comprueba aparte, porque un `<`
sin escapar dentro de un bloque de código rompe la página:

```bash
npm run check:html
```

### Revisar una fase sin abrir el navegador

```bash
npm run ver:fase -- 1 kotlin     # la fase 1 de la ruta Kotlin, en texto plano
npm run ver:fase -- 0 ingles     # la etapa 0 de la ruta de inglés
```

---

## Detalles técnicos

- **Estado**: un único objeto JSON en `localStorage`, con la clave `mi-aprendizaje-v2`. El formato es `{ "k_t0_1": true, "i_n3": "notas…", "fc_…": { level, due } }`.
- **Audio**: `SpeechSynthesis` con `lang="en-US"` y selección de la voz inglesa disponible en el sistema. Se recarga la lista de voces en cada pulsación (Chrome las carga de forma asíncrona), se reanuda el motor si quedó en pausa y la locución se encola en el ciclo siguiente a `cancel()` — Chrome descarta la utterance si ambas cosas pasan en el mismo instante. Si la síntesis no arranca en dos segundos, o falla, se muestra un aviso en pantalla en vez de dejar el botón mudo. Referencias: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API>.
- **Fichas**: repetición espaciada simplificada (4 niveles). Los intervalos 1/2/4/8 días están en `FLASH_INTERVALS` en `app.js`.
- **Accesibilidad**: navegación por teclado, `aria-selected` en las pestañas, foco visible, `alt` descriptivo en las ilustraciones y respeto por `prefers-reduced-motion`.
- **Privacidad**: no hay servidor, ni analítica, ni cookies. Todo se queda en el navegador. El correo de contacto es un enlace `mailto:` en el pie de página.

---

## Fuentes principales

Verificadas el 15-nov-2026. La lista completa, con el uso exacto de cada una, está en la portada del sitio.

**Ruta Kotlin**

- [Android Basics with Compose](https://developer.android.com/courses/android-basics-compose/course) — 8 unidades; estructura de la ruta.
- [Android Basics with Compose and Firebase](https://developer.android.com/courses/android-basics-compose-firebase/course) — autenticación y el patrón de datos de prueba.
- [Vistas previas componibles](https://developer.android.com/develop/ui/compose/tooling/previews) y [desarrollo iterativo / Live Edit](https://developer.android.com/develop/ui/compose/tooling/iterative-development) — cómo ver la pantalla mientras se diseña.
- [Capa de datos](https://developer.android.com/topic/architecture/data-layer) y [capa de UI](https://developer.android.com/topic/architecture/ui-layer) — repositorio con interfaces, ViewModel, UiState y flujo unidireccional.
- [Modern Android Development](https://developer.android.com/modern-android-development) — arquitectura, calidad y publicación.
- [kotlinlang.org](https://kotlinlang.org/docs/home.html) y [Firebase Auth](https://firebase.google.com/docs/auth).

**Ruta de inglés**

- [Google re:Work — guía de entrevista estructurada](https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices) — atributos evaluados, escala de calificación, behavioral vs. hypothetical, ejemplo publicado y follow-up questions.
- [Grow with Google — cómo preparar una entrevista](https://grow.google/grow-your-career/articles/interview-tips/) — los cuatro tipos de pregunta, el método STAR, la presentación de 30-60 s, las preguntas de referencia y el seguimiento en 24 h.
- [MIT CAPD — el método STAR](https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/) — reparto del tiempo, primera persona y banco de 3 a 5 historias.
- [Cambridge Dictionary](https://dictionary.cambridge.org/) y [Cambridge English Grammar](https://dictionary.cambridge.org/grammar/) — transcripciones IPA y normas de uso.
- [MDN — Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) — base técnica del botón de audio.
- [GitHub Pages](https://docs.github.com/en/pages) — publicación.

---

## Autor

**Eliasib C. — Ingeniero de Sistemas.** Diseño, contenido y mantenimiento del sitio.

- YouTube: <https://www.youtube.com/channel/UCKfpqhYwDoKaGYctopUxBfQ>
- LinkedIn: <https://www.linkedin.com/in/ingeniero-eliasib-c>
- GitHub: <https://github.com/ingeEliasib>

> El nombre del repositorio (`AprenderKotlinComposejecpack`) es histórico: nació con una sola ruta y hoy cubre dos.

---

## Licencia

Apache License 2.0 — ver [LICENSE](LICENSE).

El contenido educativo cita fuentes de terceros (Google re:Work, Grow with Google, MIT CAPD, Cambridge Dictionary, Android Developers); sus citas se mantienen con atribución.
