/* ============================================================================
   Ruta 1 — Kotlin + Jetpack Compose
   Datos del módulo. Estructura por fase:
     n      etiqueta de fase
     t      título
     goal   meta concreta de la fase
     proj   proyecto práctico
     flow   pasos del flujo (cadena)
     topics lista de temas (marcas de progreso)
     q      autoevaluación [pregunta, respuesta]
     cards  tarjetas imprimibles [título, código]
     tools  cajas explicativas adicionales {title, html, links}
     src    fuente base de la fase
   Contenido verificado contra la documentación oficial de Android Developers
   (verificado el 15-nov-2026).
   ========================================================================== */

const KOTLIN_PATH = [
{
  n:'Fase 0', t:'Kotlin para quien viene de Visual Basic',
  goal:'Leer y escribir Kotlin básico en Android Studio.',
  proj:'Programa de consola: calcula el total de una compra de frutas con una lista de precios.',
  flow:['Variable','Función','Lista','Bucle','Resultado'],
  topics:[
    'Instalar Android Studio y correr un proyecto en emulador',
    'val vs var (inmutable vs mutable) frente a Dim de VB',
    'Tipos, String templates y null safety (String?, ?. y ?:)',
    'Funciones con parámetros por defecto y nombrados',
    'if y when como expresiones',
    'List, MutableList, Map, for y while',
    'Lambdas y filter / map / sumOf',
    'Clases y data class'
  ],
  q:[
    ['¿Diferencia entre val y var?','val no se reasigna; var sí.'],
    ['¿Qué hace el operador ?: ?','Da un valor alterno cuando la expresión de la izquierda es null.'],
    ['¿Para qué sirve una data class?','Para guardar datos; genera equals, copy y toString.']
  ],
  cards:[
    ['val / var','val precio = 500\nvar total = 0'],
    ['Null safety','val n: String? = null\nn?.length ?: 0'],
    ['Lambda','frutas.filter { it.precio > 1000 }']
  ],
  src:'Curso «Android Basics with Compose», Unit 1 (Pathway 1: Kotlin basics) y kotlinlang.org',
  tools:[{
    title:'Ruta base y orden recomendado',
    html:'<p>El curso oficial <b>Android Basics with Compose</b> tiene <b>8 unidades</b> (verificado el 15-nov-2026). Esta ruta reordena el contenido por proyecto, no por unidad del curso: primero se entiende el lenguaje, luego la interfaz, después el estado y la arquitectura, y al final los datos y la publicación.</p><p>Unidad por unidad: <b>U1</b> primera app y Kotlin · <b>U2</b> UI y estado · <b>U3</b> listas y Material 3 · <b>U4</b> navegación y arquitectura (ViewModel, StateFlow, UDF) · <b>U5</b> internet (corrutinas, Retrofit, repositorio, inyección de dependencias manual) · <b>U6</b> persistencia (SQL, Room, DataStore) · <b>U7</b> WorkManager · <b>U8</b> interoperabilidad Views ↔ Compose.</p><p>Esta ruta usa U1–U6 y añade la ruta paralela de <b>Firebase</b> (curso oficial aparte, 5 unidades) para el tema de autenticación y Firestore.</p>',
    links:[['Curso Android Basics with Compose','https://developer.android.com/courses/android-basics-compose/course']]
  }]
},
{
  n:'Fase 1', t:'Compose básico: tu primera pantalla',
  goal:'Construir interfaces estáticas sin XML.',
  proj:'Tarjeta digital del puesto de frutas: logo, nombre, teléfono y dirección.',
  flow:['@Composable','Column / Row','Modifier','Preview'],
  topics:[
    'Qué es un composable y por qué reemplaza al XML',
    'Text, Image, Icon',
    'Column, Row y Box',
    'Modifier: padding, size, fillMaxWidth, background',
    'Arrangement y Alignment',
    '@Preview para ver sin emulador',
    'Recursos: strings.xml e imágenes en res/drawable'
  ],
  q:[
    ['¿Qué anotación define un composable?','@Composable.'],
    ['¿Cuándo se usa Box?','Para apilar elementos uno sobre otro.'],
    ['¿Qué hace Modifier?','Cambia tamaño, espacio, fondo y comportamiento de un composable.']
  ],
  cards:[
    ['Composable','@Composable\nfun Saludo(n: String){\n  Text("Hola $n")\n}'],
    ['Column','Column {\n  Text("A")\n  Text("B")\n}'],
    ['Modifier','Modifier.padding(16.dp)\n  .fillMaxWidth()']
  ],
  src:'Curso «Android Basics with Compose», Unit 1 Pathway 3 (proyecto: app de tarjeta de presentación)',
  tools:[{
    title:'Cómo ver la vista previa mientras diseñas (lo que faltaba explicar)',
    html:'<p>Existen <b>cuatro formas distintas</b> de «ver la pantalla mientras la diseñas». No son la misma cosa:</p><ol><li><b>Vista previa de Compose (<code>@Preview</code>)</b> — creas un composable anotado con <code>@Preview</code> y Android Studio lo dibuja en el panel de diseño <i>sin</i> compilar ni instalar nada; se actualiza solo cada vez que editas el código.</li><li><b>Modo interactivo</b> — dentro de la vista previa, un sandbox aislado donde puedes hacer clic, escribir texto y probar estados, gestos y animaciones.</li><li><b>Ejecutar la vista previa en un dispositivo</b> — con el icono <i>Run Preview</i> se despliega ese <code>@Preview</code> en el emulador o el teléfono real, dentro de la misma app y como una <code>Activity</code> nueva (comparte contexto y permisos; los parámetros del <code>@Preview</code> no se aplican en este modo).</li><li><b>Live Edit</b> — actualiza la app <b>que ya está corriendo</b> en el emulador o el teléfono, sin compilación completa. Es la opción para iterar sobre una pantalla real.</li></ol><p><b>Live Edit</b> se activa en <code>File ▸ Settings ▸ Editor ▸ Live Edit</code> (Windows/Linux) o <code>Android Studio ▸ Settings ▸ Editor ▸ Live Edit</code> (macOS), y tiene tres modos: <b>Manual</b> (Ctrl + \'), <b>Manual on Save</b> (Ctrl + S) y <b>Automático</b>. Requisitos y límites reales: Android Studio Giraffe o superior, Compose Runtime 1.3.0+, AGP 8.1.0-alpha05+, API 30+, solo permite editar el <i>cuerpo</i> de una función y solo en procesos depurables.</p><p>Plantillas de editor que ahorran tiempo: <code>comp</code> (crea el composable), <code>prev</code> (crea la vista previa), <code>paddp</code> (padding en dp), <code>weight</code>, <code>W</code>/<code>WR</code>/<code>WC</code> (envolver en Box / Row / Column).</p><p><b>Cuándo usar cada una:</b> vista previa para develops un composable aislado; Live Edit para ver el efecto sobre la pantalla completa en la app en ejecución.</p>',
    links:[
      ['Vistas previas componibles','https://developer.android.com/develop/ui/compose/tooling/previews'],
      ['Desarrollo iterativo (Live Edit)','https://developer.android.com/develop/ui/compose/tooling/iterative-development'],
      ['Acciones del editor','https://developer.android.com/develop/ui/compose/tooling/editor-actions']
    ]
  }]
},
{
  n:'Fase 2', t:'Estado: que la pantalla reaccione',
  goal:'Entender recomposición y estado.',
  proj:'Calculadora de venta: escribes kilos y precio, ves el total al instante.',
  flow:['Usuario escribe','Estado cambia','Recomposición','UI nueva'],
  topics:[
    'Qué es el estado y qué es recomposición',
    'remember y mutableStateOf',
    'TextField y onValueChange',
    'Button y onClick',
    'State hoisting (elevar el estado al padre)',
    'Convertir texto a número de forma segura (toDoubleOrNull)'
  ],
  q:[
    ['¿Por qué se usa remember?','Para que el valor sobreviva a las recomposiciones.'],
    ['¿Qué es state hoisting?','Mover el estado al padre y pasar valor + evento al hijo.'],
    ['¿Qué pasa si cambia un State?','Compose vuelve a dibujar los composables que lo leen.']
  ],
  cards:[
    ['Estado','var kg by remember {\n  mutableStateOf("")\n}'],
    ['TextField','TextField(value = kg,\n  onValueChange = { kg = it })'],
    ['Hoisting','fun Campo(v: String,\n  onChange: (String)->Unit)']
  ],
  src:'Curso «Android Basics with Compose», Unit 2 Pathway 3 (tip calculator y «Understanding state in Compose»)',
  tools:[{
    title:'Regla práctica para no pelearte con Compose',
    html:'<p>Compose redibuja <b>lo que lee el estado</b>, no toda la pantalla. Tres reglas que evitan el 90 % de los «se redibuja todo»:</p><ul><li>El estado vive lo más alto posible (state hoisting), normalmente en el ViewModel.</li><li>Las funciones que reciben lambdas en vez de objetos con estado se recomponen menos.</li><li>Si un recompositor es caro, extrae el subárbol a una función aparte o dale una clave estable con <code>key(...)</code>.</li></ul><p>En la práctica: el estado de la <i>interfaz</i> (lo que el usuario está escribiendo) puede vivir en el composable; el estado del <i>dominio</i> (el total calculado, la lista de clientes) debe vivir en el ViewModel.</p>',
    links:[['Capa de UI (arquitectura moderna)','https://developer.android.com/topic/architecture/ui-layer']]
  }]
},
{
  n:'Fase 3', t:'Listas y Material 3',
  goal:'Mostrar colecciones y dar estilo coherente.',
  proj:'Catálogo de frutas con nombre, precio y botón «agregar al pedido».',
  flow:['Lista de datos','LazyColumn','Item','Tema M3'],
  topics:[
    'LazyColumn e items()',
    'Card, ListItem y Divider',
    'Scaffold con TopAppBar',
    'MaterialTheme: colores, tipografía, formas',
    'Modo oscuro',
    'Animación simple (animateContentSize)'
  ],
  q:[
    ['¿Por qué LazyColumn y no Column?','Solo compone lo visible; es eficiente con listas largas.'],
    ['¿Para qué sirve Scaffold?','Estructura de pantalla: barra superior, contenido, botón flotante.'],
    ['¿Dónde se define el color primario?','En el tema (MaterialTheme / ColorScheme).']
  ],
  cards:[
    ['LazyColumn','LazyColumn {\n  items(frutas) { f ->\n    Text(f.nombre)\n  }\n}'],
    ['Scaffold','Scaffold(topBar = {...}) {\n  padding -> ...\n}'],
    ['Tema','MaterialTheme.colorScheme\n  .primary']
  ],
  src:'Curso «Android Basics with Compose», Unit 3 (Affirmations, Material Theming, Superheroes)',
  tools:[{
    title:'Detalle de Material 3 que no se explica en los tutoriales',
    html:'<p>El tema no se «pinta» en cada pantalla: se define una sola vez en el tema de la app y todas las pantallas lo heredan. Cambias el tema y toda la interfaz cambia; por eso <code>MaterialTheme.colorScheme.primary</code> nunca se escribe a mano en un composable de negocio.</p><p>En modo oscuro se cambia el <code>ColorScheme</code> (no los colores sueltos): la app debe tener un tema claro y uno oscuro, y Android elige según la configuración del sistema.</p>',
    links:[['Documentación de Jetpack Compose','https://developer.android.com/compose']]
  }]
},
{
  n:'Fase 4', t:'Login + navegación entre pantallas',
  goal:'Tu primer flujo completo: Login → Bienvenida.',
  proj:'Login del mensajero (usuario y clave con validación local) que abre una pantalla de bienvenida con su nombre.',
  flow:['LoginScreen','Valida','navigate()','HomeScreen'],
  topics:[
    'NavController y NavHost',
    'Definir rutas (composable("login"))',
    'Navegar con navigate() y evitar volver al login (popUpTo)',
    'Pasar un argumento (nombre del usuario) a otra pantalla',
    'Validar campos vacíos y mostrar error en el TextField',
    'Ocultar la clave (PasswordVisualTransformation)',
    'Investiga: rutas type-safe en la versión actual de Navigation Compose'
  ],
  q:[
    ['¿Qué es NavHost?','El contenedor que muestra la pantalla de la ruta actual.'],
    ['¿Cómo evitas volver al login con «atrás»?','Con popUpTo + inclusive al navegar a Home.'],
    ['¿Por qué no guardar la clave real en el código?','Cualquiera puede decompilar el APK; la validación real va en un servidor (Fase 7).']
  ],
  cards:[
    ['NavHost','NavHost(nav, "login") {\n  composable("login"){...}\n  composable("home"){...}\n}'],
    ['Navegar','nav.navigate("home")'],
    ['Clave','visualTransformation =\n PasswordVisualTransformation()']
  ],
  src:'Curso «Android Basics with Compose», Unit 4 Pathway 2 (navegación en Jetpack Compose)',
  tools:[{
    title:'Rutas type-safe: el salto de "cadenas mágicas" a código tipado',
    html:'<p>Las rutas de texto libre (<code>"home/{id}"</code>) son frágiles: un error de dedo no lo detecta el compilador. Navigation Compose ya ofrece <b>rutas type-safe</b>: defines los destinos como objetos Kotlin con el tipo del argumento y la navegación se comprueba al compilar.</p><p>Verifica la versión vigente en las notas de versión de Navigation Compose antes de adoptarlas, porque la API ha cambiado entre versiones estables.</p>',
    links:[
      ['Navegación en Compose','https://developer.android.com/develop/ui/compose/navigation'],
      ['Notas de versión de Navigation Compose','https://developer.android.com/jetpack/androidx/releases/navigation']
    ]
  }]
},
{
  n:'Fase 5', t:'Arquitectura: ViewModel y UiState',
  goal:'Separar lógica de interfaz.',
  proj:'Rehacer el login con LoginViewModel y un LoginUiState.',
  flow:['UI','Evento','ViewModel','StateFlow','UI'],
  topics:[
    'Por qué el estado en el composable se pierde al rotar la pantalla',
    'ViewModel',
    'Data class UiState (usuario, clave, error, cargando)',
    'StateFlow y collectAsState',
    'Flujo unidireccional de datos (UDF)',
    'Pruebas unitarias del ViewModel (básico)'
  ],
  q:[
    ['¿Qué problema resuelve ViewModel?','Conserva el estado ante cambios de configuración como rotar.'],
    ['¿Qué es UDF?','El estado baja a la UI y los eventos suben al ViewModel.'],
    ['¿Qué expone el ViewModel?','Un StateFlow de solo lectura con el UiState.']
  ],
  cards:[
    ['UiState','data class LoginUi(\n val user:String="",\n val error:String?=null)'],
    ['ViewModel','class LoginVm: ViewModel() {\n private val _ui =\n  MutableStateFlow(LoginUi())\n}'],
    ['UDF','Estado ↓  Eventos ↑']
  ],
  src:'Curso «Android Basics with Compose», Unit 4 Pathway 1 (ViewModel, UI State y StateFlow)',
  tools:[{
    title:'UDF en una frase (para recordarlo sin releer)',
    html:'<p><b>U</b>nicamente la <b>U</b>I lee el estado; la UI nunca cambia el estado directamente, solo <b>envía eventos</b>. El ViewModel recibe el evento, decide y publica un nuevo estado. La UI se redibuja porque el estado cambió, no porque la UI «pidió» redibujarse.</p>',
    links:[['Guía de la capa de UI','https://developer.android.com/topic/architecture/ui-layer']]
  }]
},
{
  n:'Fase 6', t:'Datos locales con Room',
  goal:'Que la app recuerde datos sin internet.',
  proj:'Agenda de clientes del mensajero: nombre, dirección, estado de entrega.',
  flow:['Pantalla','ViewModel','Repository','DAO','Room (SQLite)'],
  topics:[
    'SQL básico (INSERT, SELECT, UPDATE, DELETE)',
    'Room: @Entity, @Dao, @Database',
    'Corrutinas: suspend y viewModelScope',
    'Flow desde el DAO',
    'Repository para centralizar el acceso',
    'Pantallas: lista, agregar, editar, eliminar'
  ],
  q:[
    ['¿Qué anotaciones forman Room?','@Entity, @Dao y @Database.'],
    ['¿Por qué las consultas van en corrutinas?','Para no bloquear el hilo principal de la interfaz.'],
    ['¿Qué aporta el Repository?','Un solo punto de acceso a los datos, oculta de dónde vienen.']
  ],
  cards:[
    ['Entity','@Entity\ndata class Cliente(\n @PrimaryKey(autoGenerate=true)\n val id:Int=0,\n val nombre:String)'],
    ['DAO','@Dao interface ClienteDao {\n @Query("SELECT * FROM Cliente")\n fun todos(): Flow<List<Cliente>>\n}'],
    ['suspend','suspend fun guardar(c: Cliente)']
  ],
  src:'Curso «Android Basics with Compose», Unit 6 (persistencia con Room) y Unit 5 (corrutinas)',
  tools:[{
    title:'Esta fase es la clave de la siguiente: el patrón Repository',
    html:'<p>La guía oficial de arquitectura dice: «relying on interfaces makes API implementations swappable in your app… it favors testability because you can inject fake data source implementations in tests».</p><p>Consecuencia práctica: la capa de datos debe hablar con el mundo exterior <b>solo</b> a través de interfaces, y quien llama a la base de datos o a Firebase nunca es la pantalla. Esto es exactamente lo que hace posible la «vista quemada» de la Fase 7: cambias la implementación real por una falsa y la pantalla ni se entera.</p>',
    links:[['Capa de datos (arquitectura)','https://developer.android.com/topic/architecture/data-layer']]
  }]
},
{
  n:'Fase 7', t:'Login real con Firebase Authentication',
  goal:'Autenticar usuarios contra un servicio, no contra código local.',
  proj:'Cambiar el login de la Fase 4 para registrarse e ingresar con correo y clave.',
  flow:['Login UI','ViewModel','Firebase Auth','Sesión','Home'],
  topics:[
    'Crear proyecto en la consola de Firebase y conectarlo a la app',
    'Registro con correo y clave',
    'Inicio y cierre de sesión',
    'Detectar sesión activa al abrir la app',
    'Manejo de errores (clave débil, correo ya usado)',
    'Investiga: dónde guardar y qué NO subir a GitHub (google-services.json)'
  ],
  q:[
    ['¿Por qué usar un servicio de autenticación?','No guardas ni validas claves tú mismo; el servidor lo hace de forma segura.'],
    ['¿Cómo sabes si ya hay sesión al abrir?','Consultando el usuario actual de Firebase Auth.'],
    ['¿Qué haces ante error de red?','Mostrar mensaje claro en el UiState, no cerrar la app.']
  ],
  cards:[
    ['Registro','auth.createUserWith\n  EmailAndPassword(e, p)'],
    ['Ingreso','auth.signInWith\n  EmailAndPassword(e, p)'],
    ['Sesión','auth.currentUser != null']
  ],
  src:'Curso «Android Basics with Compose and Firebase» (Unit 5) y firebase.google.com/docs/auth',
  tools:[{
    title:'Si la vista usa Firebase, ¿la vista previa se rompe? La "vista quemada" es a propósito',
    html:'<p><b>Respuesta corta:</b> sí, una vista previa que intente leer Firebase directamente falla, y <b>eso no es un error del proyecto</b>: es el diseño correcto. La vista previa corre en un sandbox aislado, sin Activity real, sin ViewModel construido por la app y sin red. Por eso el patrón correcto es:</p><ol><li><b>Separa el composable con estado del que solo dibuja.</b> El primero (el que usa el ViewModel o el repositorio) no se previsualiza; el segundo recibe datos por parámetro y <i>sí</i> se previsualiza con datos de ejemplo.</li><li><b>Detrás de una interfaz.</b> La pantalla pide datos a una interfaz de repositorio. En la app real se inyecta la implementación con Firebase; en la vista previa se inyecta una implementación <i>falsa</i> con datos locales. La pantalla no cambia ni una línea.</li><li><b>Si necesitas una diferencia real entre preview y app</b>, existe <code>LocalInspectionMode.current</code>, que es <code>true</code> únicamente dentro de una vista previa. Úsalo con moderación: el patrón de separar composables es más limpio.</li></ol><p>Consecuencia: la vista previa es <b>una herramienta de diseño</b>, no el producto. Muestra la forma, el color, los estados vacío/cargando/error y la legibilidad; los datos que ves son de mentira y suenen a mentira a propósito. Lo que hay que probar de verdad (registro real, sesión persistente, reglas de seguridad) se prueba en el emulador o en el teléfono.</p>',
    links:[
      ['Vistas previas componibles','https://developer.android.com/develop/ui/compose/tooling/previews'],
      ['Capa de datos (inyección de fakes)','https://developer.android.com/topic/architecture/data-layer'],
      ['Curso oficial con Firebase','https://developer.android.com/courses/android-basics-compose-firebase/course']
    ]
  }]
},
{
  n:'Fase 8', t:'Proyecto final: app del mensajero',
  goal:'Unir todo y entregar algo que usarías de verdad.',
  proj:'Login → lista de clientes → marcar entrega → resumen del día. Código en GitHub con README.',
  flow:['Login','Clientes','Entrega','Resumen'],
  topics:[
    'Dibujar en papel el mapa de pantallas antes de codificar',
    'Estructura de carpetas por capas (ui, data)',
    'Commits pequeños con mensajes claros',
    'Probar en un teléfono real',
    'Investiga: generar APK/AAB firmado',
    'Escribir un README con capturas',
    'Elegir tu siguiente app propia (por ejemplo el puesto de frutas con inventario)'
  ],
  q:[
    ['¿Por qué dibujar el mapa de pantallas antes?','Define rutas, datos y flujo antes de escribir código.'],
    ['¿Qué capa NO debe conocer de la UI?','La capa de datos (Room, repositorio).'],
    ['¿Cómo sabes que estás listo?','Puedes iniciar un proyecto nuevo desde cero sin copiar un tutorial.']
  ],
  cards:[
    ['Mapa de pantallas','Login → Lista → Detalle\n   ↘ Resumen'],
    ['Capas','ui → viewmodel →\nrepository → datos'],
    ['Meta','Una app propia,\nde cero, sin tutorial']
  ],
  src:'Modern Android Development (developer.android.com/modern-android-development)',
  tools:[{
    title:'Ampliaciones opcionales según a dónde quieras ir',
    html:'<p>Cuando la ruta esté completa, estas son las unidades del curso oficial que encajan como ampliación:</p><ul><li><b>Unit 5</b> — conexión a internet: corrutinas, HTTP/REST, Retrofit, Coil, repositorio e inyección de dependencias manual. Convierte tu app local en una app que habla con un servidor real.</li><li><b>Unit 7</b> — WorkManager: trabajo en segundo plano que sobrevive al cierre de la app (sincronizar pedidos, subir fotos de las entregas).</li><li><b>Unit 8</b> — Views y Compose en la misma app: migración incremental de una app que ya existe en XML.</li></ul><p>Y para el paso final: la guía <b>Modern Android Development</b> recoge patrones de arquitectura, calidad y publicación para llevar un proyecto de ejemplo a producción.</p>',
    links:[
      ['Curso Android Basics with Compose','https://developer.android.com/courses/android-basics-compose/course'],
      ['Modern Android Development','https://developer.android.com/modern-android-development']
    ]
  }]
}
];
