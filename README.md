# Mi Aprendizaje

Rutas de aprendizaje estructuradas, verificables y medibles. Hoy hay dos:

| Ruta | Rama | Contenido | Estado |
|------|------|-----------|--------|
| **Kotlin + Jetpack Compose** | Aplicaciones móviles | 9 fases: de los fundamentos de Kotlin a publicar una app Android con login, Room, Firebase Auth y README de proyecto. | Publicada |
| **Inglés para entrevistas** | Preparación profesional | 10 etapas: mapa de la entrevista, presentación de 60 s, método STAR, 12 preguntas de conducta reales, preguntas hipotéticas, tus preguntas para el entrevistador, vocabulario técnico con IPA y audio, errores de hispanohablantes, 26 fichas de memoria y seguimiento. | Publicada |

No es un sitio de enlaces a tutoriales: es un recorrido con principio y fin, un proyecto por fase, autoevaluación, tarjetas de memoria y un porcentaje de avance que se calcula de verdad.

---

## Reglas de contenido (la parte importante)

Este sitio se construyó con una regla que no se negocia:

1. **Nada sin fuente.** Cada fase y cada etapa declaran su fuente base, y enlazan la fuente primaria cuando aplica.
2. **Nada inventado.** Las frases de entrevista que se practican son literales de las fuentes citadas. Los guiones que son modelos (por ejemplo, la respuesta STAR de ejemplo o el guion de una pregunta hipotética) están marcados como tales: son escritos para este sitio y **no describen hechos reales**.
3. **Nada desactualizado.** Los enlaces se verificaron el **15 de noviembre de 2026**. La numeración de unidades del curso de Android corresponde a la versión vigente del curso oficial (8 unidades).
4. **Si no existe, no se escribe.** Cuando algo no se puede comprobar o homologar, no aparece: se omite o queda marcado como «investiga». Por ejemplo, la sección de rutas type-safe de Navigation enlaza a las notas de versión en lugar de afirmar una versión concreta que cambia entre publicaciones.

La tabla completa de fuentes está en la portada del sitio (`Fuentes verificadas`) y en cada etapa.

---

## Funcionalidades

- **Navegación por pestañas** con enlace directo: `index.html#/kotlin`, `index.html#/ingles`. También acepta `?tab=kotlin` / `?tab=ingles`.
- **Progreso real**: cada tema, cada proyecto práctico y la autoevaluación son casillas. El porcentaje se recalcula al instante, sin recargar.
- **Notas por fase**, guardadas junto al avance.
- **Audio de pronunciación** en cada frase, palabra y ficha, con la voz inglesa del navegador (Web Speech API).
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
├── package.json                   # Solo para el validador de contenido (no hay build)
├── LICENSE                        # Apache-2.0
├── .gitignore
├── scripts/
│   └── validar-contenido.js       # Comprueba la estructura del contenido
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
  topics:['Tema verificable','Otro tema'],
  q:[['Pregunta de autoevaluación','Respuesta.']],
  cards:[['Título de tarjeta','código']],
  src:'Fuente base de la fase',
  tools:[{ title:'Caja explicativa', html:'<p>HTML</p>', links:[['Texto','https://…']] }]
}
```

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

Hay un validador sin dependencias que comprueba la estructura de las dos rutas (campos obligatorios, filas de tabla con el mismo número de celdas que el encabezado, IPA con formato válido, enlaces a Cambridge, fichas duplicadas) y avisa si las cifras del texto ya no coinciden con el contenido real:

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

---

## Detalles técnicos

- **Estado**: un único objeto JSON en `localStorage`, con la clave `mi-aprendizaje-v2`. El formato es `{ "k_t0_1": true, "i_n3": "notas…", "fc_…": { level, due } }`.
- **Audio**: `SpeechSynthesis` con `lang="en-US"` y selección de la voz inglesa disponible en el sistema. Si el navegador no soporta la API, se avisa al usuario en lugar de fallar en silencio. Referencias: <https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API>.
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
