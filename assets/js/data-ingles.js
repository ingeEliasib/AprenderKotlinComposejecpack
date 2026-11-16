/* ============================================================================
   Ruta 2 — Inglés para entrevistas técnicas (perfil: ingeniería de sistemas)
   Datos del módulo.

   Cada etapa tiene:
     n, t, goal, proj, flow, topics, q, cards, src
     blocks: contenido enriquecido, en orden de lectura. Tipos admitidos:
       note   {title, html, links}
       steps  {title, items:[{t, body}]}
       list   {title, items:[html]}
       table  {title, head:[], rows:[[]], note, links}
       phrases{title, items:[{en, ipa, es}], note}
       vocab  {title, items:[{en, ipa, approx, es}], note}
       qa     {title, items:[{q, es, listens, star, follow}]}
       errors {title, rows:[[malo, bien, por_que]]}
       script {title, body, note}
       checklist {title, groups:[{t, items:[]}]}

   Regla de contenido: todo lo que aparece aquí es trazable a una fuente
   pública citada en `src` o en las cajas `note`. No se inventan frases de
   entrevista: cuando una frase es un guion propio se marca como tal.
   Verificado el 15-nov-2026.
   ========================================================================== */

const INGLES_PATH = [
{
  n:'Etapa 0', t:'El mapa de la entrevista: qué te preguntan y cómo te califican',
  goal:'Saber la estructura del proceso antes de practicar el idioma.',
  proj:'Dibujar el mapa de una entrevista técnica de ingeniería de software y anotarlo en tus notas.',
  flow:['Mapa','4 tipos de pregunta','3 atributos','Rúbrica'],
  topics:[
    'Los cuatro tipos de pregunta de una entrevista',
    'Entrevista estructurada: la misma pregunta y la misma rúbrica para todos',
    'Los tres atributos que evalúan (RRK, problem solving, leadership)',
    'Escala de calificación: outstanding, solid, borderline, poor',
    'Diferencia entre pregunta de conducta y pregunta hipotética',
    'Qué es (y qué no es) esta ruta de inglés'
  ],
  q:[
    ['¿Cuáles son los tres atributos que evalúan?','Conocimiento propio del puesto (RRK), resolución de problemas y liderazgo (incluido el liderazgo emergente en perfiles no gerenciales).'],
    ['¿Cuál es la diferencia entre una pregunta de conducta y una hipotética?','La de conducta pide un hecho real pasado («Tell me about a time…»); la hipotética plantea una situación futura («Imagine if…»).'],
    ['¿Por qué una misma rúbrica para todos?','Para que la comparación entre candidatos sea consistente y no dependa del criterio de quien entrevista.']
  ],
  cards:[
    ['Conductual','"Tell me about a time\nwhen you …"'],
    ['Hipotética','"Imagine you …\nWhat would you do?"'],
    ['Follow-up','"What was your\nprimary goal and why?"']
  ],
  src:'Google re:Work, «A guide to structured interviewing for better hiring practices» (actualizado en marzo de 2026) y Grow with Google, «How to prepare for an interview» (11-dic-2025)',
  blocks:[
    {type:'note', title:'Qué es esta ruta y qué no es', html:'<p>Esta ruta <b>no</b> es un curso de inglés conversacional ni de inglés de negocios genérico. Es inglés <b>de entrevista técnica</b>, la variante que se usa en los procesos de contratación para un puesto de ingeniería de software. Todo lo que se practica aquí aparece en una entrevista real: la presentación personal, las preguntas de conducta, las preguntas hipotéticas, el vocabulario técnico y el seguimiento.</p><p>La regla de oro de la ruta: <b>si una frase no la vas a decir en una entrevista, no la practicas aquí.</b> Por eso no hay diálogos, ni stories, ni «small talk», ni vocabulario de viajes.</p>', links:[['Cómo se estructura la entrevista: re:Work','https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices']]},
    {type:'list', title:'Los cuatro tipos de pregunta (clasificación de Grow with Google)', items:[
      '<b>«Tell me about yourself»</b> — el llamado <i>elevator pitch</i>: un resumen de 30 a 60 segundos de quién eres, qué haces y por que encajas en el puesto.',
      '<b>Behavioral / de conducta</b> — describen una situación real pasada: «Tell me about a time…». Se responden con el método STAR (etapa 2).',
      '<b>Situational / hipotética</b> — «What would you do if…?». Evalúan cómo piensas ante algo que todavía no ocurrió.',
      '<b>General o de personalidad</b> — fortalezas, debilidades, dónde te ves en cinco años, por qué dejas tu trabajo actual.'
    ]},
    {type:'note', title:'Qué significa «entrevista estructurada» (la base de todo)', html:'<p>Google re:Work define la entrevista estructurada como cuatro cosas: (1) <b>preguntas preparadas y de calidad</b>, relevantes para el puesto; (2) <b>registro del feedback</b> de cada respuesta para que cualquiera pueda revisarlas; (3) <b>rúbricas estandarizadas</b> que describen qué se ve en una respuesta <i>outstanding</i>, <i>solid</i>, <i>borderline</i> o <i>poor</i>; y (4) <b>entrenamiento y calibración</b> de quienes entrevista.</p><p>La consecuencia práctica para ti: <b>no te están «conversando»</b>. Te están comparando con una escala. Por eso una respuesta correcta y bien estructurada vale más que una respuesta brillante y confusa, y por eso el método STAR (etapa 2) no es opcional.</p>'},
    {type:'table', title:'Los tres atributos que se evalúan y qué evidencia buscar', head:['Atributo','Qué mide','Tipo de pregunta que lo evidencia'], rows:[
      ['Role-related knowledge (RRK)','Si tienes las habilidades y la experiencia concreta del puesto','Conductual: «Tell me about a time when you applied your X in a real project…»'],
      ['Problem solving','Cómo descompones un problema complejo y propones una solución con lógica','Hipotética: «Imagine if…»'],
      ['Leadership',' Iniciativa, colaboración y crecimiento personal (sin necesidad de ser jefe)','Conductual + preguntas de seguimiento']
    ], note:'Atributos y definiciones tomados literalmente de la guía de re:Work. «Emergent leadership» es el término de Google para el liderazgo de quien no tiene subordinados.', links:[['re:Work — guía de entrevista estructurada','https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices']]},
    {type:'list', title:'Conductual vs. hipotética: no las respondas igual', items:[
      '<b>Conductual:</b> el hecho es real y ya pasó. Estructura <b>STAR</b>: Situation → Task → Action → Result. Se evalúa lo que hiciste, con números.',
      '<b>Hipotética:</b> la situación es inventada por el entrevistador. No hay STAR; se evalúa <b>el proceso de razonamiento</b>: cómo planteas el problema, qué supuestos asumes, qué alternativas consideras y por qué recomiendas una.',
      '<b>Error clásico:</b> responder una pregunta hipotética contando una anécdota real. Google lo dice de forma explícita: las preguntas están diseñadas «so that candidates cannot solve them from job experience alone».'
    ]},
    {type:'table', title:'La escala de calificación, etapa por etapa', head:['Nivel','Qué significa','Cómo se ve en tu respuesta'], rows:[
      ['<b>Outstanding</b>','Supera el nivel esperado para el puesto.','Trae estructura (STAR), un dato concreto y una conclusión. En una hipotética, dos alternativas comparadas con el mismo criterio y una recomendación.'],
      ['<b>Solid</b>','Cumple el nivel esperado para el puesto.','La respuesta está bien plantada y llega a algo válido. Es la nota de quien sí puede hacer ese trabajo.'],
      ['<b>Borderline</b>','Se acerca al nivel esperado, pero con huecos.','Hay señales, pero no evidencia: es general, no trae datos y no cierra.'],
      ['<b>Poor</b>','No muestra el atributo que se evalúa.','No hay ejemplo, o el ejemplo no se relaciona con lo que se preguntó. Una respuesta genérica sin ninguna situación real cae aquí.']
    ], note:'<p>Google documenta, para cada atributo, ejemplos ilustrativos de lo que cubre una respuesta <i>poor</i>, <i>borderline</i>, <i>solid</i> y <i>outstanding</i>. El contenido exacto de cada ejemplo cambia según el puesto: por eso lo que te sirve a ti no es memorizar el ejemplo, sino <b>reconocer la forma</b> de cada nivel en tus propias respuestas.</p><p>Una consecuencia práctica: el mismo contenido puede ser <i>solid</i> en una respuesta y <i>poor</i> en otra, según cómo lo cuentes. No es que te falten cosas: es que la forma de darlas es lo que se califica.</p>', links:[['re:Work — entrevista estructurada','https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices']]},
    {type:'note', title:'El error de idioma más caro de esta etapa', html:'<p>Cuando te sientes bajo presión en inglés, el cerebro traduce <i>literalmente</i> y suena raro. La estrategia que funciona: <b>aprende frases completas, no palabras sueltas</b>. En las etapas siguientes hay bloques de frases con botón de audio: memorízalas como bloques y úsalas tal cual, con tus datos.</p><p>El botón de audio usa la <b>síntesis de voz del navegador</b> (Web Speech API) con voz inglesa: es tu referencia de pronunciación, no una fuente de contenido. El contenido de las frases es real y está citado.</p>', links:[['MDN — Web Speech API','https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API']]}
  ]
},
{
  n:'Etapa 1', t:'Presentarte en 60 segundos ("Tell me about yourself")',
  goal:'Tener un discurso de presentación de 30 a 60 segundos, listo y sin improvisar.',
  proj:'Grabar tu presentación personal en video o audio, cronometrada, y repetirla hasta que suene natural.',
  flow:['Quién soy hoy','Prueba concreta','Por qué este puesto','Cierre'],
  topics:[
    'La estructura de 4 bloques de un elevator pitch',
    'Duração real: 30 a 60 segundos',
    'Plantilla rellenable con tus datos',
    'El error de contar toda tu historia profesional',
    'Conectar con la vacante concreta',
    'Frases de apertura y cierre'
  ],
  q:[
    ['¿Cuánto debe durar?','De 30 a 60 segundos. Más es contar tu currículum, no presentarte.'],
    ['¿Con qué se empieza?','Con quién eres hoy en lo profesional, no con dónde naciste ni con tus estudios.'],
    ['¿Qué tiene que incluir?','Un dato que pruebe lo que afirmas: un proyecto, una métrica, un resultado.']
  ],
  cards:[
    ['Bloque 1','"I\'m a systems engineer\nwith 11+ years of\n experience."'],
    ['Bloque 2','"One project I\'m proud\n of is HalloCam, an app\n I built for Google Play."'],
    ['Bloque 3','"That\'s why I\'m interested\n in this role."']
  ],
  src:'Grow with Google, «How to prepare for an interview»: «Aim for a succinct 30-60 second professional pitch that has been well-practiced but doesn\'t feel scripted»',
  blocks:[
    {type:'steps', title:'Los cuatro bloques (usa esta plantilla)', items:[
      {t:'1. Quién soy hoy (10 s)', body:'<p>Rol, años de experiencia y tu especialidad concreta. Nada de biografía.</p><p class="en-line"><b>«I\'m a systems engineer with more than eleven years of experience.»</b></p>'},
      {t:'2. La prueba (20 s)', body:'<p>Un proyecto real que demuestra lo que acabas de decir, con un resultado concreto y, si la hay, una métrica.</p><p class="en-line"><b>«One project I\'m proud of is …»</b></p>'},
      {t:'3. El puente con el puesto (15 s)', body:'<p>Por qué ese puesto concreto encaja con tu perfil. Menciona algo real de la oferta: su producto, su stack, su reto técnico.</p><p class="en-line"><b>«That\'s why I\'m interested in this role.»</b></p>'},
      {t:'4. Cierre (5 s)', body:'<p>Cierre simple. Dejar espacio a la pregunta siguiente.</p><p class="en-line"><b>«That\'s all about me. What would you like to know about my experience?»</b></p>'}
    ]},
    {type:'script', title:'Ejemplo con tus datos reales (no es un guion inventado)', body:'<p class="en-line"><b>«I\'m a systems engineer with more than eleven years of experience, and I currently work at Ismocol de Colombia, where I build and maintain software for clients. For most of my career I worked with Visual Basic and SQL Server, and over the last few years I moved into mobile development with Kotlin and Jetpack Compose in Android Studio.</p><p>One project I\'m proud of is HalloCam, an app I built that controls a camera mount through an Arduino module over Wi-Fi; it\'s published on Google Play. I also work with AWS and MongoDB as a cloud engineer apprentice, and I\'m comfortable with Python, JavaScript and SQL.</p><p>What draws me to this role is the chance to work on a product end to end, and to keep growing as a mobile engineer. That\'s all about me. What would you like to know about my experience?»</b></p>', note:'<p>Datos tomados de tu perfil público de LinkedIn (verificado el 15-nov-2026):Systems Engineer en Ismocol de Colombia S.A., título de Ingeniero de Sistemas, Cloud Engineer Apprentice, y el proyecto HalloCam publicado en Google Play. <b>Ajusta las cifras y el puesto exacto: tu perfil es la fuente, no este texto.</b></p>'},
    {type:'phrases', title:'Frases de esta etapa (pulsa el altavoz para escucharlas)', items:[
      {en:'I\'m a systems engineer with more than eleven years of experience.', es:'Soy ingeniero de sistemas con más de once años de experiencia.'},
      {en:'I currently work at Ismocol de Colombia, where I build and maintain software for clients.', es:'Actualmente trabajo en Ismocol de Colombia, donde construyo y mantengo software para clientes.'},
      {en:'One project I\'m proud of is HalloCam, an app I built that controls a camera mount through an Arduino module over Wi-Fi.', es:'Un proyecto del que estoy orgulloso es HalloCam, una app que construí para controlar un soporte de cámara mediante un módulo Arduino por Wi-Fi.'},
      {en:'That\'s why I\'m interested in this role.', es:'Por eso me interesa este puesto.'},
      {en:'That\'s all about me. What would you like to know about my experience?', es:'Eso es todo sobre mí. ¿Qué te gustaría saber de mi experiencia?'},
      {en:'Let me give you a quick overview of my background.', es:'Déjame darte un resumen rápido de mi trayectoria.'},
      {en:'The part of my job I enjoy most is …', es:'La parte de mi trabajo que más disfruto es …'}
    ]},
    {type:'list', title:'Tres errores que se repiten', items:[
      '<b>Contar la historia completa desde la universidad.</b> Google lo dice explícitamente: «A common mistake is to tell your entire professional or personal history, which can quickly lose the interviewer\'s attention».',
      '<b>Empezar por lo personal</b> (familia, dónde vives, por qué te cambiaron de ciudad). Va después, si preguntan.',
      '<b>Seguir sin parar.</b> Si no te preguntan nada después de tu presentación, sigue con una frase puente: «The part I\'m most proud of is …».'
    ]},
    {type:'checklist', title:'Checklist de tu presentación (marcálo cuando esté listo)', groups:[
      {t:'Contenido', items:['Empiezo con mi rol y mis años de experiencia, no con mi historia personal.','Incluyo al menos un proyecto real con un resultado concreto.','Nombro al menos una tecnología concreta del puesto al que postulo.','Dura entre 30 y 60 segundos cronometrados.','Termino con una frase puente, no con «…y ya».']},
      {t:'Inglés', items:['Lo puedo decir a velocidad natural, sin leer.','Las frases que uso son bloques completos, no palabras sueltas.','No tengo muletillas: «eh…», «mmm…», «I think…» repetido.']}
    ]}
  ]
},
{
  n:'Etapa 2', t:'El método STAR: cómo estructurar cualquier respuesta',
  goal:'Poder responder cualquier pregunta de conducta con una estructura que se pueda calificar.',
  proj:'Escribir 3 historias reales tuyas en formato STAR (no 5: empieza con 3 y crece).',
  flow:['Situation','Task','Action','Result'],
  topics:[
    'Qué significa cada letra de STAR',
    'El reparto del tiempo: 20 % / 10 % / 60 % / 10 %',
    'Hablar en primera persona del singular',
    'Preparar 3 a 5 historias que sirvan para varias preguntas',
    'Incluir números y resultados medibles',
    'Terminar con lo que aprendiste'
  ],
  q:[
    ['¿Qué porcentaje del tiempo es la Action?','Alrededor del 60 %. Es la parte más importante de la respuesta.'],
    ['¿Primera o tercera persona?','Primera del singular para tus acciones («I implemented…»). El «we» esconde lo que hiciste tú.'],
    ['¿Cuántas historias preparo?','De 3 a 5 historias bien identificadas que puedas adaptar a distintas preguntas.']
  ],
  cards:[
    ['S — Situation','Contexto: empresa, proyecto,\nqué estaba en juego.'],
    ['T — Task','Tu responsabilidad\nconcreta dentro de eso.'],
    ['A — Action','Lo que hiciste tú,\npaso a paso. ~60 %.'],
    ['R — Result','Resultado con dato +\nlo que aprendiste. ~10 %.']
  ],
  src:'MIT Career Advising & Professional Development (CAPD), «Using the STAR method for your next behavioral interview» (2022) y Grow with Google, «How to prepare for an interview»',
  blocks:[
    {type:'table', title:'STAR y el tiempo que le das a cada parte', head:['Letra','Qué dices','Tiempo aproximado'], rows:[
      ['<b>S</b> — Situation','El contexto: dónde estabas, qué problema existía, por qué importaba. No todos los detalles: solo los que el entrevistador necesita para entender.','~20 %'],
      ['<b>T</b> — Task','Tu tarea o responsabilidad concreta dentro de esa situación. Qué te tocaba resolver a ti.','~10 %'],
      ['<b>A</b> — Action','Lo que <b>haciste tú</b>, en pasado y en primera persona, con los pasos y las decisiones. Es la parte más larga y la que más se evalúa.','~60 %'],
      ['<b>R</b> — Result','El resultado, con datos si los hay, y qué aprendiste. Si el resultado no fue el esperado, dilo: se evalúa la reflexión.','~10 %']
    ], note:'Los porcentajes son la guía de MIT CAPD; no son una regla rígida, pero sí dicen dónde poner el esfuerzo: en la acción.', links:[['MIT CAPD — el método STAR','https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/']]},
    {type:'note', title:'La diferencia entre una respuesta buena y una mediocre', html:'<p>Google lo expresa en su guía: es más eficaz decir <i>«I negotiated a 15% reduction in costs with our vendors, saving the company $50,000 annually without compromising quality»</i> que <i>«I helped save the company money»</i>. No es un tema de inglés: es un tema de <b>estructura y evidencia</b>. Tu inglés solo tiene que ser capaz de soportarlo.</p><p>Y una regla de MIT CAPD que cambia el resultado: <b>habla de lo que tú hiciste</b>. «Describe the actions that you personally took». Si el logro fue del equipo, dilo, pero separa: «We delivered the release. My part was …».</p>'},
    {type:'script', title:'Guion modelo (ejemplo inventado a propósito: reemplázalo por tus hechos)', body:'<p><b>S — Situation:</b> «In my previous company, the invoicing process was handled by hand in spreadsheets, and month-end took three people about four days. <i>(20 %)</i></p><p><b>T — Task:</b> «I was responsible for automating the invoice generation. <i>(10 %)</i></p><p><b>A — Action:</b> «I designed the data model first, then wrote a small service that read the same spreadsheets, applied the tax rules and generated PDFs in the required format. I did it in three steps: I extracted the rules into a single configuration file, I wrote unit tests for each rule, and I ran the new process in parallel with the old one for two months so we could compare the output. <i>(60 %)</i></p><p><b>R — Result:</b> «Month-end went from four days to one, and we stopped having mismatches between what we billed and what we shipped. What I learned was to always keep the old process running in parallel before switching. <i>(10 %)</i></p>', note:'<p>Este guion es un <b>modelo escrito para este sitio</b>, no un hecho real. Su único propósito es mostrar la proporción de tiempo y el tono. Tu historia debe ser verdadera: en una entrevista estructurada las follow-up questions delatan una historia inventada.</p>'},
    {type:'list', title:'Tu banco de historias (3 a 5)', items:[
      '<b>Una de liderazgo o iniciativa</b> (tomaste la iniciativa sin que te lo pidieran).',
      '<b>Una de conflicto o desacuerdo</b> (cómo lo resolviste con alguien difícil).',
      '<b>Una de presión o error</b> (algo salió mal y explicaste qué hiciste).',
      '<b>Una de aprendizaje técnico</b> (una tecnología o un dominio nuevo que dominaste).',
      '<b>Una de impacto medible</b> (un proyecto con número: tiempo, dinero, usuarios,Errores).'
    ]},
    {type:'note', title:'Verbos de acción que suenan a ingeniero senior', html:'<p>Usa verbos concretos en pasado. Esta lista es la que aparece en los ejemplos de las guías públicas de preparación:</p><p class="en-line"><b>designed · implemented · migrated · refactored · automated · diagnosed · shipped · reviewed · coordinated · measured · reduced · resolved · introduced · documented</b></p><p>Y el patrón de resultado con métrica: <i>reduced X from A to B</i>, <i>cut Y by Z%</i>, <i>shipped in N weeks</i>, <i>eliminated the manual step entirely</i>.</p>'}
  ]
},
{
  n:'Etapa 3', t:'Banco de preguntas de conducta: 12 preguntas reales y cómo responderlas',
  goal:'Tener, para cada pregunta clásica de conducta, la estructura de respuesta y la prueba que busca el evaluador.',
  proj:'Responder por escrito las 12 preguntas en STAR y ensayar tres en voz alta.',
  flow:['Pregunta','Qué evalúa','STAR','Follow-up'],
  topics:[
    'Las 12 preguntas de conducta más usadas en entrevistas de ingeniería',
    'Qué evidencia busca cada una según la rúbrica',
    'Las 3 follow-up questions que hace un entrevistador estructurado',
    'Cómo responder sin inventar: si no te ha pasado, dilo y usa una situación real',
    'Fortalezas y debilidades: la respuesta que no se puede preparar'
  ],
  q:[
    ['¿Qué hago si no me ha pasado nunca lo que preguntan?','Nunca inventes. Dilo y ofrece la situación real más cercana: «I haven\'t been in that exact situation, but the closest was …». Una historia inventada se rompe en la follow-up question.'],
    ['¿Por qué preguntan por debilidades?','Para ver cómo te evalúas y qué haces al respecto. Una debilidad que no estés trabajando no es respuesta.'],
    ['¿Las 3 follow-up questions son igual para todos?','Sí, están previstas de antemano. Es la estructura, no la improvisación.']
  ],
  cards:[
    ['Follow-up 1','"What was your primary\ngoal and why?"'],
    ['Follow-up 2','"How did your teammates\nrespond?"'],
    ['Follow-up 3','"Moving forward,\nwhat\'s your plan?"']
  ],
  src:'MIT CAPD (guía de STAR con su lista de preguntas de competencia), Google re:Work (ejemplo publicado de pregunta de conducta y follow-ups) y Grow with Google (fortalezas, debilidades, cinco años, por qué dejas)',
  blocks:[
    {type:'qa', title:'Las 12 preguntas de conducta, con guía de respuesta', items:[
      {q:'Tell me about a time when something went wrong at work and you took charge.', es:'Cuéntame de una vez en que algo salió mal en el trabajo y tú tomaste el control.',
       listens:'Iniciativa y responsabilidad personal ante un problema. Qué hiciste sin que nadie te lo pidiera.',
       star:'Situation: el fallo concreto y su impacto. Task: qué asumiste tú. Action: las decisiones que tomaste para recuperar el control. Result: cómo quedó la situación y qué cambiaste para que no se repitiera.',
       follow:'Los «what if» de re:Work: ¿qué buscabas? ¿cómo reaccionó el equipo? ¿qué harías distinto ahora?'},
      {q:'Describe a time when you used teamwork to overcome a challenge.', es:'Describe una vez en que usaste el trabajo en equipo para superar un desafío.',
       listens:'Colaboración real, no «el equipo hizo su parte». Busca tu contribución concreta y cómo ayudaste a otros.',
       star:'Situation: el desafío que requería más de una persona. Task: tu rol dentro del equipo. Action: cómo coordinaste, qué acordasteis y cómo resolvisteis el bloqueo. Result: resultado compartido y qué aprendiste sobre el equipo.',
       follow:'¿Cómo reaccionó el equipo? ¿Qué habrías hecho distinto?'},
      {q:'Tell me about a time you worked with a difficult colleague. How did you work with them?', es:'Cuéntame de una vez en que trabajaste con un compañero difícil. ¿Cómo trabajaste con él?',
       listens:'Manejo del conflicto sin Evoitarlo ni buscar culpables. Qué entendiste del otro y qué cambiaste en tu manera de trabajar.',
       star:'Situation: el conflicto y por qué era difícil. Task: tu responsabilidad. Action: cómo abordaste la conversación (datos, nobaucher; hechos, no atribuye), qué cambiaste de tu lado. Result: cómo evolucionó la relación y qué aprendiste.',
       follow:'¿Qué aprendiste sobre la otra persona? ¿Qué harías distinto?'},
      {q:'Tell me about a time when you had to prioritize multiple tasks.', es:'Cuéntame de una vez en que tuviste que priorizar varias tareas.',
       listens:'Criterio para decidir. No «worked harder»: cómo decidiste qué va primero y por qué.',
       star:'Situation: variastasks compitiendo por el tiempo. Task: qué tenías que entregar sí o sí. Action: el criterio que usaste (impacto, dependencia, fecha límite) y cómo comunicaste las prioridades. Result: qué se entregó a tiempo y qué se ajustó.',
       follow:'¿Qué criterio usaste? ¿Cómo lo comunicaste?'},
      {q:'Give me an example of how you set goals and achieved them.', es:'Dame un ejemplo de cómo fijaste objetivos y los alcanzaste.',
       listens:'Orientación a resultados y seguimiento, no solo esfuerzo.',
       star:'Situation: el objetivo y de dónde salió. Task: tu parte. Action: cómo lo dividiste, cómo mediste el avance y qué ajustaste. Result: el número final contra el objetivo.',
       follow:'¿Cómo mediste el progreso? ¿Qué cambiaste cuando te atrasaste?'},
      {q:'Tell me about a situation where you realized you were not going to meet the deadline. What did you do?', es:'Cuéntame una situación en la que te diste cuenta de que no ibas a cumplir el plazo. ¿Qué hiciste?',
       listens:'Reacción bajo presión: recognize the problema, comunicar y proponer opciones. Es la pregunta de «qué haces cuando no te sale».',
       star:'Situation: el plazo y por qué se te fue de las manos. Task: tu compromiso. Action: qué le comunicaste a quién, con qué datos, y qué opciones ofreciste (acortar alcance, pedir ayuda, replanificar). Result: cómo acabó y qué aprendiste de tu propia estimación.',
       follow:'¿A quién se lo comunicaste? ¿Qué opciones ofreciste?'},
      {q:'Provide an example of how you handled change in the workplace.', es:'Dame un ejemplo de cómo manejaste un cambio en el trabajo.',
       listens:'Adaptabilidad y la ausencia de resistencia estéril. Se evalúa tu balance entre aceptar el cambio y hablar con criterio.',
       star:'Situation: qué cambió (proceso, herramienta, equipo, dirección). Task: tu rol y lo que tenías que rehacer. Action: qué hiciste para adaptarte y qué aportaste tú. Result: cómo quedó el trabajo y qué mejoró o qué aprendiste.',
       follow:'¿Qué te costó? ¿Qué cambiaste de tu manera de trabajar?'},
      {q:'Tell me about a time when you learned and used a new technology.', es:'Cuéntame de una vez en que aprendiste y usaste una tecnología nueva.',
       listens:'Curiosity técnica y capacidad de aprender lo necesario para el trabajo. Se evalúa cómo aprendiste, no solo que lo aprendiste.',
       star:'Situation: la necesidad concreta (por ejemplo, una app que había que hacer en Kotlin). Task: tu meta de aprendizaje. Action: el método (curso, documentación, proyecto pequeño, mentoría) y en qué lo usaste. Result: qué entregaste con esa tecnología.',
       follow:'¿Cómo lo aprendiste? ¿Cómo lo aplicarías en este puesto?'},
      {q:'Tell me about a time your behavior had a positive impact on your team.', es:'Cuéntame de una vez en que tu comportamiento tuvo un impacto positivo en tu equipo.',
       listens:'Es el ejemplo que publica Google re:Work para explicar las preguntas de conducta, con sus follow-ups previstas.',
       star:'Situation: el equipo y el punto de partida. Task: qué cambió. Action: qué hiciste tú, en concreto, que provocara el cambio. Result: el efecto en el equipo, con evidencia.',
       follow:'Las tres follow-ups de re:Work: «What was your primary goal and why?», «How did your teammates respond?», «Moving forward, what\'s your plan?»'},
      {q:'What are your strengths? / What are your weaknesses?', es:'¿Cuáles son tus fortalezas? / ¿Cuáles son tus debilidades?',
       listens:'Autoconocimiento y honestidad. Grow with Google recomienda responder con honestidad pero de forma positiva y profesional.',
       star:'Fortaleza: una, con evidencia (un proyecto donde se vio). Debilidad: una real, con qué estás haciendo para mejorarla y un ejemplo de progreso. Nunca «no tengo debilidades».',
       follow:'¿Qué has hecho concretamente para mejorarla?'},
      {q:'Where do you see yourself in five years?', es:'¿Dónde te ves dentro de cinco años?',
       listens:'Coherencia entre lo que dices querer y el puesto que ofrecen. Se evalúa si tus expectativas son realistas con la vacante.',
       star:'Enfócate en el rol: seguir creciendo en ingeniería de software, dar el paso a mobile o a la nube, asumir liderazgo técnico. Conecta con la empresa, no con tu vida personal.',
       follow:'¿Cómo lo relacionas con el puesto que estamos cubriendo?'},
      {q:'Why are you leaving your current job?', es:'¿Por qué dejas tu trabajo actual?',
       listens:'Grow with Google: sé honesto, pero positivo y profesional. Nunca critiques a tu empleador anterior.',
       star:'Motivo real y profesional: crecimiento técnico, un reto nuevo, cambio de ciudad, la búsqueda de un equipo con un producto que me ocupe de verdad. Sin drama y sin comparar salarios en la primera frase.',
       follow:'¿Qué harías distinto aquí?'}
    ]},
    {type:'note', title:'Las tres follow-up questions de un entrevistador estructurado', html:'<p>Google re:Work explica que cada pregunta va acompañada de <b>preguntas de seguimiento predeterminadas</b>, pensadas para obligarte a detallar el proceso, y que el entrevistador <b>no las improvisa</b>. Para la pregunta de conducta que publica como ejemplo, las follow-ups son:</p><ul><li><b>«What was your primary goal and why?»</b> — ¿cuál era el objetivo principal y por qué?</li><li><b>«How did your teammates respond?»</b> — ¿cómo respondieron tus compañeros?</li><li><b>«Moving forward, what\'s your plan?»</b> — ¿y ahora cuál es tu plan?</li></ul><p>La palabra clave es <b>why</b>: prepárate para el <i>por qué</i> de cada decisión que tomaste. Ahí es donde las historias bien contadas se separan de las que suenan a guion.</p>', links:[['re:Work — preguntas de seguimiento predeterminadas','https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices']]},
    {type:'list', title:'Errores que descalifican una respuesta de conducta', items:[
      '<b>Contar la historia en presente.</b> Es una anécdota, no un hecho: usa pasado.',
      '<b>Contar la historia del equipo con «we» y nada de «I».</b> El evaluador no puede saber qué hiciste tú.',
      '<b>Terminar sin resultado.</b> Si no hay resultado, no hay STAR; hay anécdota.',
      '<b>Inventar un episodio heroico que no ocurrió.</b> Las follow-up questions la desarman en dos minutos.',
      '<b>Ir más de tres minutos.</b> Hay 45 minutos de entrevista y varias preguntas: sé conciso.'
    ]}
  ]
},
{
  n:'Etapa 4', t:'Preguntas situacionales e hipotéticas: cómo piensas en voz alta',
  goal:'Responder preguntas que no tienen historia previa: el evaluador quiere ver tu razonamiento.',
  proj:'Escribir la respuesta completa a una pregunta hipotética y ensayarla en voz alta cronometrada.',
  flow:['Aclarar','Descomponer','Opciones','Trade-offs','Recomendación'],
  topics:[
    'Qué es una pregunta hipotética y cómo se evalúa',
    'El ejemplo de pregunta hipotética publicado por Google',
    'El método de 5 pasos para responder sin entrar en pánico',
    'Cómo declarar supuestos sin sonar inseguro',
    'Adaptar el método a un contexto técnico (diseño, incidente, migración)'
  ],
  q:[
    ['¿Por qué no debo contar una historia real aquí?','Porque el entrevistador evalúa cómo piensas ante algo nuevo; una anécdota real no demuestra razonamiento, y además se lo has dicho en la pregunta de conducta.'],
    ['¿Tengo que dar una respuesta cerrada?','No. Google dice que lo que evalúa no es una respuesta correcta sino el proceso: descomponer, asumir, proponer y recomendar.'],
    ['¿Qué hago si no sé el dato técnico?','Lo dices y defines el supuesto: «Assuming the traffic doubles, I would…». Declarar supuestos es parte del método, no una debilidad.']
  ],
  cards:[
    ['Paso 1','"Let me make sure\nI understand the\n scenario."'],
    ['Paso 3','"There are two\n options I\'d\n consider."'],
    ['Paso 5','"My recommendation\n would be …"']
  ],
  src:'Google re:Work, «A guide to structured interviewing for better hiring practices» (apartado de preguntas hipotéticas, con el ejemplo publicado) y Grow with Google (preguntas situacionales)',
  blocks:[
    {type:'note', title:'La pregunta hipotética que Google publica como ejemplo', html:'<p>Google re:Work publica esta pregunta hipotética como ejemplo de cómo se construye una pregunta de entrevista estructurada:</p><p class="en-line"><b>«Imagine you\'re working on an email product and a competitor starts charging a $5 monthly fee for their product. How would you assess the situation and what recommendation would you make to your team?»</b></p><p>Y sus follow-ups previstas:</p><p class="en-line"><b>«What factors would you take into consideration when making your recommendation? What are the pros and cons of your recommendation? How would you assess if this was a sustainable model moving forward? What impact would this have on the organization as a whole?»</b></p><p>Fíjate en la forma de las follow-ups: no preguntan por datos, preguntan por <b>factores, pros y contras, sostenibilidad e impacto</b>. Eso te dice exactamente qué dimensiones evalúa.</p>', links:[['re:Work — behavioral vs. hypothetical','https://rework.withgoogle.com/intl/en/guides/a-guide-to-structured-interviewing-for-better-hiring-practices']]},
    {type:'steps', title:'El método de 5 pasos (sirve para cualquier pregunta hipotética)', items:[
      {t:'1. Aclarar y declarar supuestos', body:'<p>Repite el problema en una frase y pon por delante los supuestos que asumes. Esto te compra tiempo de pensamiento y demuestra criterio.</p><p class="en-line"><b>«Let me make sure I understand the scenario. Assuming we can\'t change the data model, here\'s how I\'d approach it.»</b></p>'},
      {t:'2. Descomponer el problema', body:'<p>Parte el problema en partes. Google evalúa exactamente esto: «how you process information, can you break down a problem into its component parts».</p><p class="en-line"><b>«There are three parts to this: the technical side, the user impact, and the cost.»</b></p>'},
      {t:'3. Generar opciones', body:'<p>Di al menos dos opciones reales. Una sola opción es una respuesta, no un análisis.</p><p class="en-line"><b>«There are two options I\'d consider: …»</b></p>'},
      {t:'4. Trade-offs', body:'<p>Compara con el mismo criterio: coste, tiempo, riesgo, reversibilidad. Esto es justo lo que las follow-ups preguntan.</p><p class="en-line"><b>«The trade-off is that the first option ships faster but creates a maintenance cost.»</b></p>'},
      {t:'5. Recomendación + cómo lo mediría', body:'<p>Recomienda y di cómo medirías si la recomendación funcionó. Las preguntas de Google sobre sustainability e impacto se contestan aquí.</p><p class="en-line"><b>«My recommendation would be …, and I\'d measure it by …»</b></p>'}
    ]},
    {type:'script', title:'Adaptación al contexto de software (guion modelo)', body:'<p>El método es el mismo; la pregunta se cambia a un escenario de ingeniería. <b>Esta adaptación es un guion modelo escrito para este sitio</b>, no una pregunta real de ningún entrevistador:</p><p class="en-line"><b>«Let me make sure I understand the scenario: we have an app that is slow for some users, and we believe the problem is in the API layer.</b><br><br><b>Assuming we can\'t add more servers right now, I\'d break this into three parts: where the time is going, which users are affected, and how much of it we can fix without touching the backend.</b><br><br><b>There are two options I\'d consider. First, caching the most expensive queries, which is cheap and reversible but only helps repeated reads. Second, restructuring the queries themselves, which fixes the root cause but takes longer and needs testing.</b><br><br><b>The trade-off is speed of delivery versus durability. My recommendation would be to start with the query analysis and the caching, measure the improvement with real response-time data, and only restructure what caching doesn\'t fix. I\'d measure it by the p95 latency before and after.»</b></p>', note:'<p>«p95» se escribe <i>percentile</i> en inglés: <i>ninety-fifth percentile latency</i>. Si dices «p95» en voz alta, pronúncialo <b>«p ninety-five»</b> (<i>pee ninety-five</i>).</p>'},
    {type:'list', title:'Frases de Transition que suenan profesionales', items:[
      '<b>«Let me make sure I understand the scenario.»</b> — Déjame confirmar que entendí el escenario.',
      '<b>«Assuming X, I would…»</b> — Suponiendo X, yo…',
      '<b>«There are a couple of options I\'d consider.»</b> — Hay un par de opciones que consideraría.',
      '<b>«The trade-off here is…»</b> — El trade-off aquí es…',
      '<b>«My recommendation would be…»</b> — Mi recomendación sería…',
      '<b>«I\'d measure that by…»</b> — Lo mediría con…',
      '<b>«I don\'t have that number off the top of my head, but…»</b> — No tengo ese dato de memoria, pero… (digo lo que sé y lo que no)'
    ]},
    {type:'note', title:'La honestidad técnica también puntúa', html:'<p>En una entrevista técnica, admitir <b>«no sé el dato exacto, pero puedo decirte cómo lo obtendría»</b> no resta: es señal de criterio. Lo que resta es inventar el dato. La guía de Google sobre preguntas hipotéticas deja claro que lo que se evalúa es el razonamiento, y la de Grow with Google pide responder «direct and concise» y hablar despacio y claro aunque estés nervioso.</p>'}
  ]
},
{
  n:'Etapa 5', t:'Las preguntas que tú le haces: la entrevista también es un filtro',
  goal:'Salir de la entrevista con información real sobre el puesto, el equipo y el proceso.',
  proj:'Escribir y ensayar 5 preguntas propias, adaptadas a una oferta concreta.',
  flow:['Sobre el rol','Sobre el equipo','Sobre el proceso'],
  topics:[
    'Por qué las entrevistas son bidireccionales',
    'Las dos preguntas de référence publicadas por Grow with Google',
    'Preguntas de proceso (siguientes pasos, timeline, salario)',
    'Preguntas de equipo y de reto técnico',
    'Preguntas de crecimiento y de carrera',
    'Cómo cerrar la entrevista sin dejarla a medias'
  ],
  q:[
    ['¿Cuál es la mejor pregunta que puedo hacer?','La que demuestra que pensaste en cómo sería trabajar ahí: qué significa el éxito en ese puesto.'],
    ['¿Debo preguntar por el salario?','Sí, en la etapa de proceso, no en la primera conversación técnica. Preguntar no es ofensivo; no preguntar sí te deja sin información.'],
    ['¿Qué pasa si no tengo preguntas?','Se lee como falta de interés o de preparación. Ten siempre tres guardadas.']
  ],
  cards:[
    ['Rol','"What does success look\n like in this role\n in the first 90 days?"'],
    ['Equipo','"What are the biggest\n challenges the team is\n facing right now?"'],
    ['Cierre','"What are the next steps\n in the process?"']
  ],
  src:'Grow with Google, «How to prepare for an interview» (preguntas de referencia publicadas literalmente) y re:Work (entrevista como conversación bidireccional)',
  blocks:[
    {type:'note', title:'Las dos preguntas que publica Google como ejemplo', html:'<p>La guía de Grow with Google es explícita: «The best interviews are two-way conversations» y recomienda preguntas que muestren que piensas en el éxito del puesto:</p><ul><li><b>«What does success look like in this role during the first 90 days?»</b> — ¿Cómo sería el éxito en este puesto durante los primeros 90 días?</li><li><b>«What are the biggest challenges the team is currently facing, and how would this role help solve them?»</b> — ¿Cuáles son los mayores retos del equipo ahora y cómo ayudaría este puesto a resolverlos?</li></ul><p>Son buenas porque obligan a la otra parte a ser concreta, y porque te dan información que de verdad necesitas para decidir si quieres el puesto.</p>', links:[['Grow with Google — cómo preparar una entrevista','https://grow.google/grow-your-career/articles/interview-tips/']]},
    {type:'list', title:'Banco de preguntas por categoría (todas de uso habitual en entrevistas técnicas)', items:[
      '<b>Sobre el rol:</b> «What would a successful first month look like?», «What are the main responsibilities in the first six months?», «What does the team look like and who would I work with?», «What is the current tech stack, and what is the team planning to add or replace?»',
      '<b>Sobre el reto técnico:</b> «What is the most interesting technical problem the team is working on right now?», «How does the team decide what to build next?», «How do you handle technical debt?».',
      '<b>Sobre el proceso:</b> «What are the next steps in the process?», «What is the expected timeline?», «How many rounds are there and what do they cover?», «Who else will I be meeting?».',
      '<b>Sobre condiciones:</b> «What does the compensation range for this role look like?», «How does the remote work policy work in practice?», «What is the on-call rotation like?».',
      '<b>Sobre crecimiento:</b> «How do you support a developer\'s growth in the first year?», «What does career progression look like on this team?».'
    ]},
    {type:'phrases', title:'Frases para abrir y cerrar la parte de preguntas', items:[
      {en:'I have a couple of questions about the role and the team.', es:'Tengo un par de preguntas sobre el puesto y el equipo.'},
      {en:'What does success look like in this role during the first 90 days?', es:'¿Cómo sería el éxito en este puesto durante los primeros 90 días?'},
      {en:'What are the biggest challenges the team is currently facing?', es:'¿Cuáles son los mayores retos que enfrenta el equipo actualmente?'},
      {en:'How would this role help solve them?', es:'¿Cómo ayudaría este puesto a resolverlos?'},
      {en:'What are the next steps in the interview process?', es:'¿Cuáles son los siguientes pasos en el proceso de selección?'},
      {en:'Thank you for your time today. I\'d really enjoy staying in touch.', es:'Gracias por tu tiempo hoy. Me gustaría mucho seguir en contacto.'},
      {en:'Could you tell me a bit more about how the team works day to day?', es:'¿Podrías contarme un poco más sobre cómo trabaja el equipo en el día a día?'}
    ]},
    {type:'note', title:'Cerrar la entrevista correctamente', html:'<p>Termina con una frase de cierre que confirme el interés y deja abierta la siguiente ronda. Grow with Google insiste en el seguimiento posterior: un correo de agradecimiento breve, mencionando algo concreto de la conversación, enviado <b>dentro de las 24 horas</b>. En la etapa 9 tienes la plantilla.</p>'}
  ]
},
{
  n:'Etapa 6', t:'El inglés técnico: el vocabulario que de verdad suena',
  goal:'Poder explicar tu trabajo en inglés con el vocabulario real del puesto.',
  proj:'Escuchar y repetir las 28 palabras de la tabla hasta reconocerlas oídas.',
  flow:['Escuchar','Repetir','Usar'],
  topics:[
    '28 palabras técnicas con IPA y pronunciación guiada',
    'Palabras que el español deforma: th, -ed, vowels',
    'Términos de arquitectura, datos, despliegue y proceso',
    'Falsos amigos del inglés técnico'
  ],
  q:[
    ['¿Cuál es la palabra que más se malpronuncia?','«schedule»: en inglés es /ˈskedʒ.uːl/ en Estados Unidos y /ˈʃedʒ.uːl/ en Gran Bretaña. No es «es-qué-du-lo».'],
    ['¿Qué hago con las palabras que no conozco?','Di la frase completa y explica el concepto en palabras simples: «It\'s like a cache — the app keeps a copy of the data in memory instead of asking the server every time.»'],
    ['¿Con qué pronuncio «th»?','Con la punta de la lengua entre los dientes. Son dos sonidos: /θ/ sin voz (think, three) y /ð/ con voz (the, this, that).']
  ],
  cards:[
    ['th /θ/','think · three ·\nthrough'],
    ['th /ð/','the · this ·\nthat'],
    ['-ed','worked = /t/\nplayed = /d/\nasked = /t/']
  ],
  src:'Cambridge Dictionary (entradas enlazadas una por una) y Cambridge English Grammar. La pronunciación de referencia es el audio del navegador en en-US.',
  blocks:[
    {type:'note', title:'Cómo usar esta tabla', html:'<p>El <b>botón de audio</b> reproduce la palabra con la voz inglesa del sistema: es tu referencia de pronunciación. El <b>IPA</b> es la transcripción de Cambridge Dictionary para la pronunciación británica (UK), y en la fila de <i>schedule</i> están ambas variantes. La <b>guía en español</b> es una aproximación para hispanohablantes: sirve para arrancar, no para cómo se pronuncia de verdad.</p><p>No trates de memorizar el IPA: úsalo para entender por qué una palabra suena como suena, y quédate con el sonido que escuchas en el audio.</p>', links:[['Cambridge Dictionary','https://dictionary.cambridge.org/dictionary/english/algorithm'],['Cambridge English Grammar','https://dictionary.cambridge.org/grammar/']]},
    {type:'vocab', title:'Vocabulario de entrevista de ingeniería de software', items:[
      {en:'algorithm', ipa:'/ˈæl.ɡər.ɪ.ðəm/', approx:'ál-gue-ri-dum', es:'Algoritmo. «I optimized the algorithm so the query runs in linear time.»'},
      {en:'architecture', ipa:'/ˈɑː.kɪ.tek.tʃər/', approx:'ár-ki-tek-cher', es:'Arquitectura (de software). «We changed the architecture to move the logic to the client side.»'},
      {en:'asynchronous', ipa:'/eɪˈsɪŋ.krə.nəs/', approx:'ei-SIN-kro-nos', es:'Asíncrono. «The API call is asynchronous, so the UI doesn\'t freeze.»'},
      {en:'benchmark', ipa:'/ˈbentʃ.mɑːk/', approx:'bench-mark', es:'Prueba de rendimiento. «We benchmarked both versions before choosing.»'},
      {en:'bottleneck', ipa:'/ˈbɒt.əl.nek/', approx:'botel-nek', es:'Cuello de botella. «The database was the bottleneck.»'},
      {en:'branch', ipa:'/brɑːntʃ/', approx:'brunch', es:'Rama (de Git). «I created a branch for the feature.»'},
      {en:'cache', ipa:'/kæʃ/', approx:'cash', es:'Caché. «We added a cache to avoid hitting the API on every request.»'},
      {en:'colleague', ipa:'/ˈkɒl.iːɡ/', approx:'KO-li-gue', es:'Colega. «I reviewed the code with a colleague.»'},
      {en:'commit', ipa:'/kəˈmɪt/', approx:'ko-MIT', es:'Confirmación (de Git). «I made small commits with clear messages.»'},
      {en:'dependency', ipa:'/dɪˈpen.dən.si/', approx:'di-PEN-den-si', es:'Dependencia. «We removed an outdated dependency.»'},
      {en:'deployment', ipa:'/dɪˈplɔɪ.mənt/', approx:'di-PLOI-ment', es:'Despliegue. «The deployment takes about ten minutes.»'},
      {en:'endpoint', ipa:'/ˈendˌpɔɪnt/', approx:'end-point', es:'Endpoint. «This endpoint returns the customer data.»'},
      {en:'framework', ipa:'/ˈfreɪm.wɜːk/', approx:'freim-work', es:'Framework. «The project uses a lightweight framework.»'},
      {en:'heuristic', ipa:'/hjʊəˈrɪs.tɪk/', approx:'jiu-RIS-tik', es:'Heurística. «It\'s just a heuristic, not an exact calculation.»'},
      {en:'latency', ipa:'/ˈleɪ.tən.si/', approx:'lei-ten-si', es:'Latencia. «We reduced the average latency from 800 to 200 milliseconds.»'},
      {en:'merge conflict', ipa:'/ˈmɜːdʒ ˈkɒn.flɪkt/', approx:'merch con-flict', es:'Conflicto de fusión. «I resolved a merge conflict in the config file.»', links:[['merge','https://dictionary.cambridge.org/dictionary/english/merge'],['conflict','https://dictionary.cambridge.org/dictionary/english/conflict']]},
      {en:'pull request', ipa:'/ˈpʊl rɪˈkwest/', approx:'pul ri-kuest', es:'Pull request. «I opened a pull request and asked for two reviews.»', links:[['pull','https://dictionary.cambridge.org/dictionary/english/pull'],['request','https://dictionary.cambridge.org/dictionary/english/request']]},
      {en:'regression', ipa:'/rɪˈɡreʃ.ən/', approx:'ri-GRE-shon', es:'Regresión (error introducido). «The release caused a regression in the login flow.»'},
      {en:'repository', ipa:'/rɪˈpɒz.ɪ.tər.i/ UK · /rɪˈpɑː.zɪ.tɔːr.i/ US', approx:'ri-PO-si-to-ri (UK) · ri-PA-zi-to-ri (US)', es:'Repositorio. «The code lives in a shared repository.»'},
      {en:'retrospective', ipa:'/ˌret.rəˈspek.tɪv/', approx:'re-tro-SPEK-tiv', es:'Retrospectiva (de equipo). «We do a retrospective every sprint.»'},
      {en:'rollback', ipa:'/ˈrəʊl.bæk/', approx:'RÓUL-bak', es:'Reversión de un despliegue. «If the migration fails, we do a rollback.»'},
      {en:'scalability', ipa:'/ˌskeɪ.ləˈbɪl.ə.ti/', approx:'skei-la-BILI-ti', es:'Escalabilidad. «Scalability was one of the main requirements.»'},
      {en:'schedule', ipa:'/ˈʃedʒ.uːl/ UK · /ˈskedʒ.uːl/ US', approx:'ched-yul (UK) · sked-yul (US)', es:'Cronograma. «What does success look like in the first 90 days?» se suele oír «in the first ninety days».'},
      {en:'thorough', ipa:'/ˈθʌr.ə/', approx:'THU-ro', es:'Exhaustivo / minucioso. «I did a thorough review before the release.»'},
      {en:'throughput', ipa:'/ˈθruː.pʊt/', approx:'THRU-put', es:'Rendimiento (procesamiento por unidad de tiempo). «We increased throughput without adding servers.»'},
      {en:'backlog', ipa:'/ˈbæk.lɒɡ/', approx:'bak-log', es:'Backlog. «It was at the top of the backlog.»'},
      {en:'standalone', ipa:'/ˈstændəˌləʊn/', approx:'stan-de-loun', es:'Independiente / autónomo. «It was a standalone desktop app.»'},
      {en:'prototype', ipa:'/ˈprəʊ.tə.taɪp/', approx:'PRO-tə-taip', es:'Prototipo. «We built a prototype to validate the idea before writing the real thing.»'}
    ], note:'<p>Cada palabra enlaza a su entrada en el <b>Cambridge Dictionary</b> y el IPA es su transcripción británica (UK) tal como la publica Cambridge, no una interpretación propia. Los compuestos (<i>merge conflict</i>, <i>pull request</i>) enlazan a sus dos componentes, cada uno con su propia entrada. La pronunciación de referencia es siempre el audio: la voz inglesa del sistema puede usar una variante distinta de la de Cambridge.</p>'},
    {type:'list', title:'Falsos amigos del inglés técnico (traducción literal que NO existe)', items:[
      '<b>«actually»</b> = <i>en realidad</i>, no «actualmente». Para decir «actualmente» se usa <i>currently</i> / <i>at the moment</i>.',
      '<b>«eventually»</b> = <i>finalmente</i>, no «eventualmente». Para «eventualmente / a la larga» se usa <i>eventually</i> en el sentido contrario… mejor no usarlo: di <i>in the long run</i>.',
      '<b>«library»</b> = <i>biblioteca de código</i>, no «librería» de libros.',
      '<b>«assist»</b> = <i>ayudar</i>, no «asistir» a un evento.',
      '<b>«resume»</b> = <i>currículum</i> (CV) cuando hablas de tu candidatura; como verbo, <i>reanudar</i> (el trabajo, la reunión).',
      '<b>«issue»</b> = <i>incidencia o problema</i>, no «número de revista».',
      '<b>«schedule»</b> = <i>cronograma</i>, no «es-qué-du-lo».',
      '<b>«decide»</b> = <i>decidir</i>, no «de-cidir» la situación.'
    ]}
  ]
},
{
  n:'Etapa 7', t:'Errores típicos de hispanohablantes en entrevista',
  goal:'Eliminar los errores que más se oyen en una entrevista en inglés.',
  proj:'Revisar la tabla, marcar los que cometes y rehacer tu presentación y dos respuestas STAR.',
  flow:['Detectar','Corregir','Repetir'],
  topics:[
    'Errores de preposición y de gerundio',
    'Errores de artículos y de contable/no contable',
    'Errores de tiempo verbal y de concordancia',
    'Errores de false friend que suenan naturales en español',
    'El vicio de traducir el CV literal'
  ],
  q:[
    ['¿Cuál es el error más grave?','Los de preposición y gerundio en frases fijas: «look forward to hearing», «I\'m used to working». Son errores que un entrevistador nativo detecta enseguida.'],
    ['¿Cuál es el error más común?','«I have a experience», «there is a lot of people», y empezar cada frase con «I think…».'],
    ['¿Debo preocuparme por los artículos?','Sí, en la presentación: «a systems engineer», no «the engineer». El artículo es parte de la corrección gramatical que más se nota.']
  ],
  cards:[
    ['Gerundio','"I look forward to\n hearing from you."'],
    ['Used to','"I\'m used to working\n with Java."'],
    ['Artículo','"I\'m a systems\n engineer."']
  ],
  src:'Cambridge Dictionary y Cambridge English Grammar (preposiciones y gerundio, artículos, contables y no contables, concordancia de sujeto). Los ejemplos de error son los más frecuentes documentados para hispanohablantes.',
  blocks:[
    {type:'errors', title:'Tabla de corrección (revisada con Cambridge Grammar)', rows:[
      ['<span class="bad">I look forward to hear from you.</span>','<span class="good">I look forward to hearing from you.</span>','Tras <i>look forward to</i> va un <b>gerundio</b> (-ing), no un infinitivo.'],
      ['<span class="bad">I am used to work with Java.</span>','<span class="good">I\'m used to working with Java.</span>','<i>be used to + gerundio</i> = estar acostumbrado. <i>used to + infinitivo</i> = solía hacer algo en el pasado.'],
      ['<span class="bad">I am responsible of the project.</span>','<span class="good">I\'m responsible for the project.</span>','La preposición es <b>for</b>.'],
      ['<span class="bad">I am in charge for the migration.</span>','<span class="good">I\'m in charge of the migration.</span>','La preposición de <i>in charge of</i> es <b>of</b>. Y <i>responsible for</i> + <i>in charge of</i> no son sinónimos exactos: la primera marca responsabilidad, la segunda, el mando.'],
      ['<span class="bad">I have a experience.</span>','<span class="good">I have experience.</span>','<i>Experience</i> es incontable: sin artículo y normalmente sin <i>a</i>.'],
      ['<span class="bad">There is a lot of people in the team.</span>','<span class="good">There are a lot of people in the team.</span>','Concordancia sujeto-verbo: <i>people</i> es plural.'],
      ['<span class="bad">I did a training in SQL Server.</span>','<span class="good">I took a course in SQL Server.</span>','<i>take a course</i> / <i>attend training</i>.'],
      ['<span class="bad">I made the application for Android.</span>','<span class="good">I built the application for Android.</span>','En inglés de software: <b>build</b> una app, <b>write</b> código, <b>deploy</b> un release.'],
      ['<span class="bad">I worked in the payments module.</span>','<span class="good">I worked on the payments module.</span>','<i>work on</i> = trabajar sobre algo concreto; <i>work for/in</i> = trabajar para/en una empresa o ciudad.'],
      ['<span class="bad">I am engineer.</span>','<span class="good">I\'m a systems engineer.</span>','Artículo <b>a</b> antes del sustantivo y artículo <b>an</b> antes de vocal: <i>an engineer</i>.'],
      ['<span class="bad">I have 11 years of experience.</span>','<span class="good">I\'ve worked for 11 years. / I have 11 years of experience.</span>','Ambas son correctas: la primera suena más natural al hablar; la segunda es la que enfoca en la competencia.'],
      ['<span class="bad">I am very responsible with the team.</span>','<span class="good">I owned the delivery of the module end to end.</span>','Un sustantivo abstracto no demuestra nada: di la acción y el resultado.'],
      ['<span class="bad">I did a good job.</span>','<span class="good">I cut the processing time in half.</span>','Con dato, siempre.'],
      ['<span class="bad">We need to improve the requirement of the client.</span>','<span class="good">We need to clarify the client\'s requirements.</span>','Plural <i>requirements</i>, y el genitivo <i>client\'s</i>.']
    ]},
    {type:'note', title:'El vicio de fondo: traducir el CV', html:'<p>La causa raíz de casi todos esos errores es que el CV está escrito en español y se traduce palabra por palabra. La solución no es estudiar gramática: es <b>escribir las frases en inglés primero</b> y luego rellenarlas con tus datos. Por eso en la etapa 1 te di frases completas y en la etapa 2 un guion modelo: son plantillas para copiar y personalizar, no ejercicios de traducción.</p><p>Otro vicio: empezar cada respuesta con <b>«I think…»</b>. En inglés suena a que no estás seguro de lo que sí sabes. Si no estás seguro de un dato, dilo al final: «I don\'t have the exact number, but…».</p>'},
    {type:'phrases', title:'Frases para marcar incertidumbre sin perder credibilidad', items:[
      {en:'I don\'t have the exact number off the top of my head, but roughly…', es:'No tengo el número exacto de memoria, pero aproximadamente…'},
      {en:'I\'d have to check, but I believe it was around…', es:'Tendría que verificarlo, pero creo que fue alrededor de…'},
      {en:'That\'s outside my current experience, but here\'s what I did in a similar situation…', es:'Eso está fuera de mi experiencia actual, pero esto es lo que hice en una situación parecida…'},
      {en:'Let me think for a second.', es:'Déjame pensar un segundo.'}
    ]}
  ]
},
{
  n:'Etapa 8', t:'Fichas de memoria: repaso espaciado de lo esencial',
  goal:'Fijar las 26 fichas clave del módulo con un sistema de repetición espaciada.',
  proj:'Repasar las fichas cada día hasta que todas pasen a nivel 3 (dominadas).',
  flow:['Repasar','Marcar','Volver en días'],
  topics:[
    'Cómo funciona el repaso espaciado de este módulo',
    'Niveles 0 a 3 y qué días volverá cada ficha',
    'Qué significa cada nivel (nuevo / en proceso / conocido / dominado)'
  ],
  q:[
    ['¿Cada cuánto debo repasar?','El sistema usa intervalos crecientes: al día siguiente, a los 2 días, a los 4 y a los 8. Si marcas «Repasar», la ficha vuelve al día siguiente.'],
    ['¿Qué hago si no sé la respuesta?','Marca «Repasar». No pasa nada: el objetivo es que la vuelvas a ver, no que la sepas la primera vez.'],
    ['¿Dónde se guardan mis fichas?','En este navegador (localStorage). Si borras los datos del navegador, se pierden: exporta tu avance desde la barra superior.']
  ],
  cards:[
    ['Nivel 0','Nueva —\nmañana'],
    ['Nivel 2','En proceso —\nen 4 días'],
    ['Nivel 3','Dominada —\nen 8 días']
  ],
  src:'Método de repetición espaciada de Leitner simplificado en 4 niveles (implementado en este sitio, sin dependencias externas).',
  blocks:[
    {type:'note', title:'Cómo usar las fichas', html:'<p>Las 26 fichas son el mínimo vital de la ruta: las preguntas de conducta más frecuentes, las frases de transición, el vocabulario que más se malpronuncia y las trampas del inglés de entrevista.</p><p>Hazlo así: <b>10 minutos al día</b>, antes de la práctica. Pulsa «La sé» si la dijiste sin dudar; «Repasar» si la dudaste. Las fichas que no dominas vuelven al día siguiente; las dominadas se espacian hasta cada 8 días. El botón de audio te deja oír la ficha antes de responder, que es como funciona en una entrevista real.</p>'}
  ]
},
{
  n:'Etapa 9', t:'Ensayo final, seguimiento y checklist',
  goal:'Cerrar el ciclo: preparar, ensayar, enviar el seguimiento.',
  proj:'Hacer una simulación completa de 45 minutos y enviar el correo de seguimiento.',
  flow:['Preparar','Ensayar','Enviar seguimiento'],
  topics:[
    'Plan de preparación de 5 días',
    'Checklist del día de la entrevista',
    'Qué hacer durante la entrevista (hablar despacio y claro)',
    'El correo de seguimiento dentro de las 24 horas',
    'Cómo responder a «we\'ll be in touch»',
    'Medir tu avance: qué se espera al terminar el módulo'
  ],
  q:[
    ['¿Cuánto dura un ensayo?','Una simulación completa debe durar unos 45 minutos, como una ronda real de entrevista.'],
    ['¿Qué hago si me quedo en blanco?','Di la frase de relleno y avanza: «That\'s a good question, let me think for a second.» Perder diez segundos es mejor que el silencio.'],
    ['¿Cuándo se envía el seguimiento?','Dentro de las 24 horas. Grow with Google lo recomienda explícitamente: un mensaje breve que mencione algo concreto de la conversación y que muestre tu interés real.']
  ],
  cards:[
    ['Antes','Investiga la empresa\ny escribe 3 preguntas.'],
    ['Durante','Habla despacio\ny con frases cortas.'],
    ['Después','Correo en menos\nde 24 horas.']
  ],
  src:'Grow with Google, «How to prepare for an interview» (ensayo, mock interviews y seguimiento en 24 horas) y re:Work (estructura de la entrevista)',
  blocks:[
    {type:'table', title:'Plan de preparación de 5 días', head:['Día','Qué haces','Tiempo'], rows:[
      ['<b>Día 1</b>','Escribe tu presentación de 60 segundos y grábala. Corrige hasta que suene natural.','45 min'],
      ['<b>Día 2</b>','Escribe 3 historias en STAR. Léelas en voz alta y cronométralas.','60 min'],
      ['<b>Día 3</b>','Ensaya las 12 preguntas de conducta de la etapa 3 (una por pregunta, 90 segundos cada una).','60 min'],
      ['<b>Día 4</b>','Repasa el vocabulario técnico y las 26 fichas. Prepara tus 5 preguntas para el entrevistador.','45 min'],
      ['<b>Día 5</b>','Simulación completa de 45 minutos en voz alta, con las preguntas de la etapa 4 incluidas.','60 min']
    ]},
    {type:'checklist', title:'Checklist del día de la entrevista', groups:[
      {t:'Antes (el día anterior)', items:['Repaso de fichas (10 min).','Historia fresca ensayada en voz alta (15 min).','Cuestionario: ¿cómo se llama el interviewer? ¿cuánto dura? ¿quién más está? (Google: «Structure the candidate experience»).','Copias de tu CV impresas, si es presencial.','Prueba de audio y cámara si es virtual.']},
      {t:'Durante', items:['Habla despacio y claro: Grow with Google lo recomienda expresamente.','Responde con STAR en las de conducta; con los 5 pasos en las hipotéticas.','Si no entiendes la pregunta, pide que la repitan: «Could you rephrase that?» No es un defecto.','Números concretos en lugar de adjetivos.','Toma notas de los nombres y de lo que te prometieron.']},
      {t:'Después (mismo día)', items:['Anota qué te preguntaron y qué respondiste (sirve para la siguiente entrevista).','Envía el correo de seguimiento dentro de las 24 horas.','Actualiza el estado de tu candidatura.']}
    ]},
    {type:'script', title:'Plantilla de correo de seguimiento (escrita para este sitio)', body:'<p class="en-line"><b>Subject: Thank you — [Role title] interview</b></p><p class="en-line"><b>Hi [Name],</b><br><br><b>Thank you for taking the time to speak with me on [day] about the [role title] position. I especially enjoyed our conversation about [the specific topic you talked about: for example, how the team handles technical debt / how the release process works].</b><br><br><b>Your explanation of [X] gave me a much clearer picture of what the role involves, and it confirmed my interest in joining the team.</b><br><br><b>I\'m happy to provide any additional information or code samples you might need. Please let me know if there\'s anything else I can help with.</b><br><br><b>Best regards,<br>[Tu nombre]</b></p>', note:'<p><b>Reglas de la plantilla</b> (según Grow with Google: breve, mencionando algo concreto de la conversación, dentro de las 24 horas): (1) nombra algo <b>concreto</b> de la conversación, no genéricos; (2) confirma el interés en el puesto; (3) ofrece lo que falte; (4) si no hay nada más, no lo estires.</p><p>Si te hicieron una pregunta de diseño o de código y te fue bien, puedes añadir una línea: <i>«I also enjoyed the discussion about [X]; I\'d be happy to walk you through my approach in more detail.»</i></p>'},
    {type:'phrases', title:'Frases para el momento de cierre', items:[
      {en:'Thank you for your time today. I\'d really enjoy staying in touch.', es:'Gracias por tu tiempo hoy. Me gustaría mucho seguir en contacto.'},
      {en:'Could you tell me what the next steps in the process are?', es:'¿Podrías decirme cuáles son los siguientes pasos del proceso?'},
      {en:'Thank you for letting me know. Please let me know if you need anything else from my side.', es:'Gracias por avisarme. Avísame si necesitan algo más de mi parte.'},
      {en:'I\'ll follow up with an email summarizing our conversation.', es:'Enviaré un correo resumiendo nuestra conversación.'}
    ]},
    {type:'note', title:'Qué se espera al terminar este módulo', html:'<p>Si completaste las 10 etapas: tienes una presentación de 60 segundos grabada y cronometrada, 3 historias en STAR escritas, 12 preguntas de conducta con guía, un método para preguntas hipotéticas, 5 preguntas propias, 28 palabras técnicas con pronunciación, la tabla de errores corregida, las 26 fichas en repaso espaciado y un plan de 5 días listo para repetir antes de cada entrevista.</p><p>Lo que <b>no</b> te va a dar: la garantía de que la entrevista saldrá bien. Lo que sí te da es que, cuando el inglés se te mezclan las ideas, tienes una estructura que no depende de tu nivel de inglés para improvisar. Esa es la diferencia entre un candidato que entiende la pregunta y uno que además la responde.</p>'}
  ]
}
];

/* --- Fichas de memoria de la ruta de inglés -------------------------------
   front: anverso (pregunta o concepto) · back: respuesta o regla
   esc:  texto en inglés que se escucha con el botón de audio
   ------------------------------------------------------------------------ */
const INGLES_FLASHCARDS = [
  {f:'Opening: «I\'m a systems engineer with more than eleven years of experience.»', b:'Abre tu presentación con rol + años de experiencia. Nada de biografía. (Etapa 1)', s:'I\'m a systems engineer with more than eleven years of experience.'},
  {f:'«One project I\'m proud of is …»', b:'Introduce la prueba concreta de lo que afirmas. (Etapa 1)', s:'One project I\'m proud of is …'},
  {f:'«That\'s why I\'m interested in this role.»', b:'Puente con la vacante. (Etapa 1)', s:'That\'s why I\'m interested in this role.'},
  {f:'«Let me make sure I understand the scenario.»', b:'Inicio de una pregunta hipotética: aclara y declara supuestos. (Etapa 4)', s:'Let me make sure I understand the scenario.'},
  {f:'«There are two options I\'d consider: …»', b:'Genera alternativas antes de recomendar. (Etapa 4)', s:'There are two options I\'d consider.'},
  {f:'«The trade-off here is …»', b:'Compara con el mismo criterio. (Etapa 4)', s:'The trade-off here is …'},
  {f:'«My recommendation would be …»', b:'Cierra el análisis con una recomendación. (Etapa 4)', s:'My recommendation would be …'},
  {f:'«I\'d measure that by …»', b:'Di cómo sabrías que la recomendación funcionó. (Etapa 4)', s:'I\'d measure that by …'},
  {f:'Follow-up 1: «What was your primary goal and why?»', b:'Las follow-ups predeterminadas de re:Work. Prepárate para el «why». (Etapa 3)', s:'What was your primary goal and why?'},
  {f:'Follow-up 2: «How did your teammates respond?»', b:'Las follow-ups predeterminadas de re:Work. (Etapa 3)', s:'How did your teammates respond?'},
  {f:'Follow-up 3: «Moving forward, what\'s your plan?»', b:'Las follow-ups predeterminadas de re:Work. (Etapa 3)', s:'Moving forward, what\'s your plan?'},
  {f:'Conductual: «Tell me about a time when something went wrong…»', b:'STAR. Situación, tarea, acción propia (60 %), resultado con dato. (Etapa 3)', s:'Tell me about a time when something went wrong at work and you took charge.'},
  {f:'Hipotética: «Imagine you…»', b:'No hay STAR: se evalúa el razonamiento. Aclara, descompón, opciones, trade-offs, recomendación. (Etapa 4)', s:'Imagine you\'re working on a product and a competitor changes the rules.'},
  {f:'«What does success look like in this role during the first 90 days?»', b:'Pregunta de referencia publicada por Grow with Google. (Etapa 5)', s:'What does success look like in this role during the first 90 days?'},
  {f:'«What are the biggest challenges the team is currently facing?»', b:'Segunda pregunta de referencia de Grow with Google. (Etapa 5)', s:'What are the biggest challenges the team is currently facing?'},
  {f:'«What are the next steps in the process?»', b:'Pregunta de proceso antes de terminar. (Etapa 5)', s:'What are the next steps in the interview process?'},
  {f:'«I look forward to hearing from you.»', b:'Con gerundio, no «to hear». Error clásico. (Etapa 7)', s:'I look forward to hearing from you.'},
  {f:'«I\'m used to working with Java.»', b:'be used to + gerundio. (Etapa 7)', s:'I\'m used to working with Java.'},
  {f:'«I\'m responsible for the migration.»', b:'Preposición «for», no «of». (Etapa 7)', s:'I\'m responsible for the migration.'},
  {f:'«I have experience in…» / «I\'ve worked for 11 years.»', b:'Experience es incontable: sin «a». Ambas formas son correctas. (Etapa 7)', s:'I\'ve worked for eleven years.'},
  {f:'«I built the application for Android.»', b:'Se construye (build), no se «hace» (make). (Etapa 7)', s:'I built the application for Android.'},
  {f:'Vocabulario: «algorithm» /ˈæl.ɡər.ɪ.ðəm/', b:'pronunciación: «ál-gue-ri-dum». (Etapa 6)', s:'algorithm'},
  {f:'Vocabulario: «schedule» /ˈskedʒ.uːl/ (US) · /ˈʃedʒ.uːl/ (UK)', b:'«sked-yul» en US, «ched-yul» en UK. (Etapa 6)', s:'schedule'},
  {f:'Vocabulario: «latency» /ˈleɪ.tən.si/', b:'«lei-ten-si». Métrica clave en una respuesta técnica. (Etapa 6)', s:'latency'},
  {f:'Vocabulario: «rollback» /ˈrəʊl.bæk/ y «regression» /rɪˈɡreʃ.ən/', b:'«RÓUL-bak» y «ri-GRE-shon». Dos palabras que todo ingeniero usa. (Etapa 6)', s:'rollback'},
  {f:'Cierre: «Thank you for your time today. I\'d really enjoy staying in touch.»', b:'Cierra la entrevista y deja abierta la siguiente ronda. (Etapa 9)', s:'Thank you for your time today. I\'d really enjoy staying in touch.'}
];
