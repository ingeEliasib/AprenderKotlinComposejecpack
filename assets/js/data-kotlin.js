/* ============================================================================
   Ruta 1 — Kotlin + Jetpack Compose
   Datos del módulo. Estructura por fase:
     n      etiqueta de fase
     t      título
     goal   meta concreta de la fase
     proj   proyecto práctico
     flow   pasos del flujo (cadena)
     topics lista de temas (marcas de progreso).
            Cada tema puede ser una cadena suelta o un objeto {t, html}: con
            objeto, la casilla viene con la explicación del tema delante, que
            es lo que hace que esto sea una clase y no una lista de tareas.
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
    {t:'Instalar Android Studio y correr un proyecto en emulador',
     html:'<p>Android Studio trae todo: el editor, el compilador de Kotlin, el emulador y el generador de proyectos. La primera vez tarda, porque descarga la imagen del sistema (Android 34 o superior) y crea el dispositivo virtual. Es normal, no se ha colgado.</p><p>El camino mínimo es <b>New Project → Empty Activity</b>, nombre y paquete <code>com.tuempresa.aplicacion</code>, lenguaje Kotlin, y <b>Run</b>. Si arranca el emulador y ves una pantalla vacía, ya tienes el ciclo completo: escribir, ejecutar, ver.</p><p>Un consejo para quien viene de VB: no empieces por un proyecto vacío. Crea la plantilla <i>Empty Activity</i> y ábrela: verás <code>MainActivity.kt</code> con un <code>setContent</code> y un <code>Text</code>. Esa es toda la estructura que vas a usar en la Fase 1, y conviene verla funcionando antes de tocar nada.</p>'},
    {t:'val vs var (inmutable vs mutable) frente a Dim de VB',
     html:'<p>En VB, <code>Dim x As Integer</code> siempre es mutable: no hay forma de declarar que no va a cambiar. Kotlin te obliga a decidir cada vez, y esa decisión se lee en el código:</p><pre><code>val total = 0        // no se puede reasignar\nvar contador = 0     // sí se puede reasignar\ncontador = 1         // ok\n// total = 1        // error de compilación</code></pre><p><code>val</code> es la opción por defecto y la que deberías usar el 90 % del tiempo. Un valor inmutable es más fácil de razonar y Compose lo agradece: si el dato no puede cambiar, el compilador descarta esa ruta de recomposición.</p><p>El equivalente mental es directo: <code>Dim</code> es <code>var</code>, y <code>val</code> no existía en VB.</p>'},
    {t:'Tipos, String templates y null safety (String?, ?. y ?:)',
     html:'<p>Los tipos se escriben delante de la variable, como en VB: <code>var nombre: String = "Eliasib"</code>. No hacen falta conversiones: <code>var total: Int = 10 + 5</code>.</p><p>Los <i>string templates</i> sustituyen la concatenación. Donde en VB escribías <code>"Hola " &amp; nombre</code>, en Kotlin escribes <code>"Hola $nombre"</code>; para meter una expresión, <code>"Hola ${nombre.uppercase()}"</code>.</p><pre><code>val nombre = "Eliasib"\nprintln("Hola $nombre")               // Hola Eliasib\nprintln("Hola ${nombre.uppercase()}")   // Hola ELIASIB</code></pre><p>Lo que de verdad cambia respecto a VB es la seguridad ante nulos. <code>String?</code> significa «puede ser nulo»; <code>String</code> significa «no puede ser nulo», y el compilador te obliga a decidir:</p><pre><code>val apodo: String? = null\nprintln(apodo?.length)        // null: no rompe nada (operador seguro)\nprintln(apodo ?: "sin apodo") // valor alterno (operador Elvis)</code></pre><p>Traducción desde VB: <code>Nothing</code> es <code>null</code>, y <code>IsNothing</code>… no se escribe, porque el compilador te avisa antes. <code>?.</code> es «si no es nulo, haz esto»; <code>?:</code> es «si es nulo, usa esto otro».</p>'},
    {t:'Funciones con parámetros por defecto y nombrados',
     html:'<p>Una función se declara con <code>fun</code>, y el tipo de retorno va detrás de dos puntos:</p><pre><code>fun sumar(a: Int, b: Int): Int = a + b</code></pre><p>Los parámetros con valor por defecto se declaran con <code>=</code> y <b>se pueden saltar</b> al llamar. Y los argumentos se pueden pasar <i>por nombre</i>, algo que en VB con <code>Optional</code> no existía:</p><pre><code>fun presentar(nombre: String, edad: Int = 30, ciudad: String = "Cali") {\n    println("$nombre, $edad años, de $ciudad")\n}\n\npresentar("Eliasib")                    // usa los valores por defecto\npresentar("Eliasib", 35)                // solo cambia la edad\npresentar("Eliasib", ciudad = "Bogotá") // solo cambia la ciudad</code></pre><p>Los parámetros con valor por defecto van <b>al final</b> de la lista, y el orden de llamada también: primero los posicionales, después los nombrados. Es la diferencia entre <code>Optional(Of As Integer)</code> y algo que se lee sin mirar la firma.</p>'},
    {t:'if y when como expresiones',
     html:'<p>En Kotlin el <code>if</code> puede devolver un valor, como el <code>IIF</code> de VB pero sin la función:</p><pre><code>val mayor = if (a &gt; b) a else b</code></pre><p>Y <code>when</code> es el <code>Select Case</code> del lenguaje, con la diferencia de que también es una expresión:</p><pre><code>val estado = when {\n    intentos &gt;= 5 -&gt; "bloqueado"\n    intentos &gt;= 3 -&gt; "sospechoso"\n    else -&gt; "normal"\n}</code></pre><p>Una ventaja real de <code>when</code>: si es exhaustivo sobre un <code>enum</code> o una <code>sealed class</code>, el compilador te obliga a cubrir todos los casos. Si mañana añades un estado nuevo, el error aparece al compilar y no en producción. En VB habría que acordarse de revisarlo a mano.</p>'},
    {t:'List, MutableList, Map, for y while',
     html:'<p>Las colecciones inmutables (<code>List</code>, <code>Map</code>) y mutables (<code>MutableList</code>, <code>MutableMap</code>) están separadas a propósito. En VB usabas <code>ArrayList</code> y <code>Dictionary</code> para todo; aquí eliges:</p><pre><code>val fijo = listOf("a", "b")           // inmutable\nval mutable = mutableListOf("a", "b")  // mutable\nmutable.add("c")\n\nval mapa = mapOf("a" to 1, "b" to 2)\nval total = mapa["a"] ?: 0</code></pre><p>Recorridos:</p><pre><code>for (nombre in fijo) println(nombre)\nfor ((clave, valor) in mapa) println("$clave = $valor")\n\nvar i = 0\nwhile (i &lt; 3) { println(i); i++ }\ndo { i-- } while (i &gt; 0)</code></pre><p>Si necesitas el índice, <code>forEachIndexed</code> te lo da sin hacer el <code>for (i in 0 until lista.size)</code> de VB:</p><pre><code>fijo.forEachIndexed { indice, valor -&gt; println("$indice: $valor") }</code></pre>'},
    {t:'Lambdas y filter / map / sumOf',
     html:'<p>Aquí es donde Kotlin se parece a lo que ya sabes de otros lenguajes: las lambdas. Una lambda es una función sin nombre, y se escribe entre llaves con <code>-&gt;</code>:</p><pre><code>val dobles = listOf(1, 2, 3).map { it * 2 }   // [2, 4, 6]</code></pre><p>Si no usas <code>it</code>, nombra el parámetro:</p><pre><code>val pares = listOf(1, 2, 3, 4).filter { numero -&gt; numero % 2 == 0 }</code></pre><p>Las que vas a usar todo el rato:</p><ul><li><code>filter</code> — quédate con los que cumplen una condición.</li><li><code>map</code> — transforma cada elemento.</li><li><code>sumOf</code> — suma (también <code>sumOf { it.precio * it.cantidad }</code>).</li><li><code>sortedBy</code> y <code>sortedWith</code> — ordenar.</li><li><code>firstOrNull</code> — el primero que cumple, o <code>null</code>: no revienta si no hay ninguno.</li><li><code>groupBy</code> — agrupa por un criterio.</li></ul><p>Si vienes de VB, <code>filter</code> es un <code>For Each</code> con <code>If</code> que acumula y <code>map</code> es un <code>For Each</code> que construye otra lista. La diferencia es que aquí no tocas una variable de fuera: devuelves el resultado y el original queda intacto. Esa es la razón por la que encajan tan bien con <code>remember</code> y con Compose.</p>'},
    {t:'Clases y data class',
     html:'<p>Una clase en Kotlin, con propiedades y una función:</p><pre><code>class Producto(val nombre: String, var precio: Int) {\n    fun conDescuento(porcentaje: Int): Producto =\n        Producto(nombre, precio * (100 - porcentaje) / 100)\n}</code></pre><p><code>val</code> en el constructor es una propiedad de solo lectura; <code>var</code> tiene setter. Si necesitas código al construir, usa un bloque <code>init</code>.</p><p>La <code>data class</code> es la que vas a usar el 90 %: genera sola <code>equals()</code>, <code>toString()</code>, <code>hashCode()</code> y <code>copy()</code>.</p><pre><code>data class Cliente(val id: Int = 0, val nombre: String, val telefono: String)\n\nval a = Cliente(nombre = "Ana", telefono = "300")\nval b = a.copy(nombre = "Ana María")   // copia con un campo cambiado\na == b                                  // false: equals mira todos los campos</code></pre><p>Ese <code>copy()</code> es el que hace posible el patrón de estado inmutable de la Fase 5. Guárdalo en la cabeza: en Compose, «cambiar el estado» es «crear una copia con un campo distinto».</p>'}
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
    {t:'Qué es un composable y por qué reemplaza al XML',
     html:'<p>Un composable es una <b>función</b> que describe un trozo de pantalla. Se marca con <code>@Composable</code> y se llama desde otra función igual. No hay XML, no hay <code>findViewById</code>, no hay <code>setContentView</code>.</p><pre><code>@Composable\nfun Saludo(nombre: String) {\n    Text("Hola $nombre")\n}\n\nsetContent {\n    Saludo("Eliasib")\n}</code></pre><p>La diferencia con VB no es la sintaxis: es <b>dónde vive la interfaz</b>. En el patrón clásico (XML + Activity) la pantalla se declara en un archivo y la Activity la busca por id. En Compose la pantalla <i>es</i> una función de Kotlin: el código que la dibuja está junto al código que la rellena, y el compilador comprueba que los tipos cuadren.</p><p>No significa que Compose sea mejor en todo. Significa que para pintar un texto ya no necesitas dos archivos.</p>'},
    {t:'Text, Image, Icon',
     html:'<p>Tres composables que aparecen en todas las pantallas:</p><pre><code>Text("Hola")\nText("Hola", style = MaterialTheme.typography.headlineSmall)\nImage(\n    painter = painterResource(id = R.drawable.logo),\n    contentDescription = "Logotipo"\n)\nIcon(imageVector = Icons.Filled.Home, contentDescription = "Inicio")</code></pre><p><code>contentDescription</code> no es opcional de verdad: es lo que lee el lector de pantalla. Ponlo siempre, y si la imagen es decorativa (un icono junto a un texto que ya lo explica) ponle <code>null</code>.</p><p>Y el texto va en <code>res/values/strings.xml</code>, no en el código:</p><pre><code>Text(stringResource(id = R.string.saludo))</code></pre><p>Es una de las reglas que Android revisa al publicar: un texto escrito a mano en la interfaz es un texto que no se puede traducir.</p>'},
    {t:'Column, Row y Box',
     html:'<p>Tres formas de colocar cosas, y con solo tres lo resuelves todo:</p><ul><li><code>Column</code> — elementos <b>verticales</b>, uno debajo del otro.</li><li><code>Row</code> — elementos <b>horizontales</b>, uno al lado del otro.</li><li><code>Box</code> — elementos <b>superpuestos</b>: el primero va al fondo.</li></ul><pre><code>Column {\n    Text("Encabezado")\n    Row {\n        Text("Etiqueta")\n        Spacer(Modifier.weight(1f))\n        Text("Valor")\n    }\n}</code></pre><p><code>Spacer(Modifier.weight(1f))</code> es el truco para empujar un elemento al otro extremo de la fila: el <code>weight</code> le dice que ocupe todo el espacio sobrante.</p><p>Y no te compliques: si necesitas dos columnas, es un <code>Row</code> con dos <code>Column</code> dentro, cada una con su <code>Modifier.weight(1f)</code>.</p>'},
    {t:'Modifier: padding, size, fillMaxWidth, background',
     html:'<p>El <code>Modifier</code> es la cadena de instrucciones que le das a un elemento: tamaño, espacio, fondo, clic. Se escribe después del composable y se encadena con <code>.</code>:</p><pre><code>Text(\n    "Hola",\n    modifier = Modifier\n        .padding(16.dp)\n        .fillMaxWidth()\n        .background(Color.Gray)\n)</code></pre><p><b>El orden importa</b>, y es la causa número uno de «¿por qué no hace lo que yo quiero?»:</p><ul><li><code>.padding(16.dp).background(Color.Gray)</code> → el fondo se dibuja <b>dentro</b> del padding: gris con margen alrededor.</li><li><code>.background(Color.Gray).padding(16.dp)</code> → el fondo cubre <b>todo</b>, incluido el margen: gris plano.</li></ul><p>Regla práctica: el <b>padding va primero</b> en casi todos los casos.</p><p>Unidades: <code>dp</code> para tamaños y espacios (independientes de la densidad de pantalla) y <code>sp</code> para el texto, que además respeta el tamaño de letra que el usuario tenga puesto en el sistema.</p>'},
    {t:'Arrangement y Alignment',
     html:'<p>Dos ajustes que se confunden todo el tiempo:</p><ul><li><code>Arrangement</code> — <b>cómo se reparten los hijos entre sí</b>: <code>Arrangement.Center</code>, <code>Arrangement.SpaceBetween</code>, <code>Arrangement.spacedBy(8.dp)</code>. Solo tiene efecto dentro de <code>Column</code> y <code>Row</code>.</li><li><code>Alignment</code> — <b>dónde se coloca el contenido dentro del contenedor</b>: <code>Alignment.Center</code>, <code>Alignment.TopStart</code>…</li></ul><pre><code>Column(\n    modifier = Modifier.fillMaxSize(),\n    verticalArrangement = Arrangement.Center,\n    horizontalAlignment = Alignment.CenterHorizontally\n) {\n    Text("Centro")\n}</code></pre><p>La regla para no liarla: <i>arrangement</i> reparte los hijos entre sí; <i>alignment</i> alinea al hijo con su padre.</p>'},
    {t:'@Preview para ver sin emulador',
     html:'<p>Un <code>@Preview</code> le dice a Android Studio «pinta esta pantalla aquí, sin instalar nada». Es el ciclo más rápido que vas a tener en el desarrollo de Android.</p><pre><code>@Composable\nfun TarjetaProducto() {\n    Card { Text("Manzana") }\n}\n\n@Preview(showBackground = true)\n@Preview(widthDp = 320, heightDp = 200)\n@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)\nprivate fun TarjetaProductoPreview() { TarjetaProducto() }</code></pre><p>Una sola función de preview puede llevar <b>varias anotaciones</b>: así ves la pantalla normal, con tamaño de móvil y en modo oscuro, sin tocar nada. Y el preview se actualiza solo mientras escribes.</p><p>Existe un segundo modo, el <b>modo interactivo</b>, donde dentro del preview puedes hacer clic, escribir texto y probar estados: es un sandbox aislado, no la app real.</p><p>El límite importante: en el preview <b>no hay Activity, no hay ViewModel y no hay red</b>. Por eso una pantalla que lee datos de Firebase falla en la vista previa… y esa es exactamente la Fase 7.</p>'},
    {t:'Recursos: strings.xml e imágenes en res/drawable',
     html:'<p>En <code>res/</code> vive todo lo que no es código:</p><ul><li><code>res/values/strings.xml</code> — los textos, con <code>stringResource(R.string.saludo)</code>.</li><li><code>res/drawable/</code> — imágenes (PNG, JPG, WebP o vector XML).</li><li><code>res/mipmap/</code> — el icono de la app.</li><li><code>res/xml/</code> — ficheros de configuración.</li></ul><pre><code>&lt;!-- strings.xml --&gt;\n&lt;string name="saludo"&gt;Hola, %1$s&lt;/string&gt;\n\n// en el composable\nText(stringResource(id = R.string.saludo, nombre))</code></pre><p>Para imágenes, <code>painterResource(id = R.drawable.logo)</code> devuelve algo que se le pasa a <code>Image</code>. En <code>res/drawable</code> también puedes poner vectores XML: escalan sin pixelarse y pesan menos que un PNG.</p><p>Y la regla que Android comprueba al publicar: <b>ningún texto escrito directamente en el código</b>. Todo pasa por <code>strings.xml</code>.</p>'}
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
    html:'<p>Existen <b>cuatro formas distintas</b> de «ver la pantalla mientras la diseñas». No son la misma cosa:</p><ol><li><b>Vista previa de Compose (<code>@Preview</code>)</b> — creas un composable anotado con <code>@Preview</code> y Android Studio lo dibuja en el panel de diseño <i>sin</i> compilar ni instalar nada; se actualiza solo cada vez que editas el código.</li><li><b>Modo interactivo</b> — dentro de la vista previa, un sandbox aislado donde puedes hacer clic, escribir texto y probar estados, gestos y animaciones.</li><li><b>Ejecutar la vista previa en un dispositivo</b> — con el icono <i>Run Preview</i> se despliega ese <code>@Preview</code> en el emulador o el teléfono real, dentro de la misma app y como una <code>Activity</code> nueva (comparte contexto y permisos; los parámetros del <code>@Preview</code> no se aplican en este modo).</li><li><b>Live Edit</b> — actualiza la app <b>que ya está corriendo</b> en el emulador o el teléfono, sin compilación completa. Es la opción para iterar sobre una pantalla real.</li></ol><p><b>Live Edit</b> se activa en <code>File ▸ Settings ▸ Editor ▸ Live Edit</code> (Windows/Linux) o <code>Android Studio ▸ Settings ▸ Editor ▸ Live Edit</code> (macOS), y tiene tres modos: <b>Manual</b> (Ctrl + \'), <b>Manual on Save</b> (Ctrl + S) y <b>Automático</b>. Requisitos y límites reales: Android Studio Giraffe o superior, Compose Runtime 1.3.0+, AGP 8.1.0-alpha05+, API 30+, solo permite editar el <i>cuerpo</i> de una función y solo en procesos depurables.</p><p>Plantillas de editor que ahorran tiempo: <code>comp</code> (crea el composable), <code>prev</code> (crea la vista previa), <code>paddp</code> (padding en dp), <code>weight</code>, <code>W</code>/<code>WR</code>/<code>WC</code> (envolver en Box / Row / Column).</p><p><b>Cuándo usar cada una:</b> vista previa para desarrollar un composable aislado; Live Edit para ver el efecto sobre la pantalla completa en la app en ejecución.</p>',
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
    {t:'Qué es el estado y qué es recomposición',
     html:'<p>El estado es cualquier dato que la pantalla muestra y que puede cambiar: el texto que escribe el usuario, la lista de clientes, el indicador de «cargando».</p><p>Cuando ese dato cambia, Compose <b>vuelve a ejecutar</b> la función que lo leyó, y solo esa parte. A ese volver a dibujar se le llama <b>recomposición</b>: no se reconstruye la pantalla entera, se vuelve a pintar el subárbol afectado.</p><pre><code>var total by remember { mutableStateOf(0) }\nText("Total: $total")   // esta línea vuelve a ejecutarse al cambiar total</code></pre><p>El error de partida es pensar que la recomposición «redibuja todo y va lento». Compose solo recompone lo que lee el estado que cambió. El problema aparece cuando un estado grande vive en un composable padre: entonces sí se recompone de más, y la solución es subir el estado o partir el subárbol.</p>'},
    {t:'remember y mutableStateOf',
     html:'<p>Un <code>var</code> normal dentro de un composable <b>se reinicia en cada recomposición</b>: la variable se crea de nuevo y vuelve a su valor inicial. Por eso hace falta <code>remember</code>.</p><pre><code>var contador = 0                             // se pierde al recomponerse\nvar contador by remember { mutableStateOf(0) }   // sobrevive</code></pre><p><code>mutableStateOf</code> es lo que le dice a Compose «este valor es observable»: cuando cambia, la pantalla se entera. <code>remember</code> solo guarda el valor entre recomposiciones.</p><p><b>La trampa</b>: <code>remember</code> sobrevive a las recomposiciones, pero <b>no</b> a un cambio de configuración (girar el móvil). Para eso está el <code>ViewModel</code>, en la Fase 5.</p><p>Y el orden de las palabras importa: <code>by remember { mutableStateOf(0) }</code>, no al revés. Si te sale un error de tipos ahí, está invertido.</p>'},
    {t:'TextField y onValueChange',
     html:'<p>El <code>TextField</code> no guarda el texto: te lo <b>entrega</b> y tú decides qué hacer con él.</p><pre><code>var nombre by remember { mutableStateOf("") }\n\nTextField(\n    value = nombre,\n    onValueChange = { nombre = it },\n    label = { Text("Nombre") },\n    singleLine = true\n)</code></pre><p><code>value</code> es lo que se ve; <code>onValueChange</code> recibe cada tecla. Si el estado vive dentro del <code>TextField</code>, el componente es el dueño del texto y no puedes controlarlo bien (por ejemplo, para forzar mayúsculas o filtrar un número).</p><p>La forma correcta es la de arriba: <b>el texto vive arriba</b> y el <code>TextField</code> solo lo pinta. Es el mismo <i>state hoisting</i> del tema siguiente.</p>'},
    {t:'Button y onClick',
     html:'<p>Un botón es un composable que, al pulsarse, llama a una función:</p><pre><code>Button(onClick = { total = total + 10 }) {\n    Text("Sumar 10")\n}</code></pre><p>El <code>onClick</code> no debería contener lógica de negocio: como mucho, actualiza el estado. Si hay que llamar a una API o escribir en la base de datos, ahí entra el <code>ViewModel</code>.</p><p>Las variantes que vas a ver: <code>TextButton</code> (sin fondo), <code>OutlinedButton</code> (con borde), <code>FilledTonalButton</code> e <code>IconButton</code> para un solo icono. Todas aceptan el mismo <code>onClick</code>.</p>'},
    {t:'State hoisting (elevar el estado al padre)',
     html:'<p>Hoisting es subir el estado al padre y pasarle a cada hijo <b>dos cosas</b>: el valor actual y la función para cambiarlo. El hijo no sabe de dónde viene el dato.</p><pre><code>// Padre: dueño del estado\nvar nombre by remember { mutableStateOf("") }\n\nCampo(valor = nombre, onCambio = { nombre = it })\n\n// Hijo: solo pinta y avisa\n@Composable\nfun Campo(valor: String, onCambio: (String) -&gt; Unit) {\n    TextField(value = valor, onValueChange = onCambio)\n}</code></pre><p>El beneficio real: el hijo es <b>predecible y reutilizable</b>. Puedes ponerlo en un <code>@Preview</code> con un texto inventado, probarlo con datos falsos y saber exactamente qué hace sin mirar el resto de la app.</p><p>De aquí sale la regla que se repite en toda la documentación de Compose: <b>el estado sube, los eventos bajan</b>.</p>'},
    {t:'Convertir texto a número de forma segura (toDoubleOrNull)',
     html:'<p>Un <code>TextField</code> te devuelve un <code>String</code>. Si el usuario escribe «abc», un <code>toDouble()</code> revienta la app. La versión segura devuelve <code>null</code>:</p><pre><code>val kilos = texto.toDoubleOrNull()\nif (kilos == null) {\n    // mostrar error: "no es un número"\n} else {\n    total = kilos * precio\n}</code></pre><p><code>toIntOrNull()</code>, <code>toLongOrNull()</code> y <code>toDoubleOrNull()</code> son el mismo patrón. Úsalos siempre que el dato venga de un teclado: es la diferencia entre un mensaje de error y un crash.</p><p>Y si además quieres controlar el formato (solo un separador decimal, máximo dos decimales), <code>toDoubleOrNull()</code> no basta: hay que filtrar el texto <i>antes</i> de convertirlo.</p>'}
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
    {t:'LazyColumn e items()',
     html:'<p>Para una lista, <code>LazyColumn</code> es a <code>Column</code> lo que el modo virtual de un <code>DataGrid</code> era a una rejilla: solo crea las filas que se ven.</p><pre><code>LazyColumn {\n    items(lista) { cliente -&gt;\n        Row {\n            Text(cliente.nombre)\n            Text(cliente.telefono)\n        }\n    }\n}</code></pre><p>El <code>items</code> de aquí no es un bucle: no hay índice, ni <code>next</code>, ni <code>NextItem</code>. Compose llama a tu bloque por cada elemento visible.</p><p>Dos detalles que importan:</p><ul><li>Si necesitas el índice, <code>itemsIndexed</code>.</li><li>Si la lista puede cambiar de tamaño mientras se ve, dale una <code>key</code> estable: <code>items(lista, key = { it.id })</code>. Sin <code>key</code>, Compose reutiliza las filas por posición y el orden «salta» al borrar un elemento.</li></ul>'},
    {t:'Card, ListItem y Divider',
     html:'<p>Tres piezas de Material 3 que aparecen en casi cualquier pantalla:</p><pre><code>Card {\n    Column(Modifier.padding(16.dp)) {\n        Text("Manzana", style = MaterialTheme.typography.titleMedium)\n        Text("2.500", style = MaterialTheme.typography.bodyMedium)\n    }\n}\n\nListItem(\n    headlineContent = { Text("Ana") },\n    supportingContent = { Text("300 123 4567") }\n)\n\nHorizontalDivider()</code></pre><p>La diferencia entre <code>Card</code> y <code>ListItem</code> es de <b>jerarquía</b>: la tarjeta agrupa contenido que va junto (un pedido, una ficha de cliente), y el <code>ListItem</code> es una fila dentro de una lista de datos. El <code>Divider</code> separa filas.</p>'},
    {t:'Scaffold con TopAppBar',
     html:'<p>El <code>Scaffold</code> es el esqueleto de una pantalla: barra superior, contenido y, si hace falta, botón flotante. Define los <b>huecos</b> y Compose te los pasa para que el contenido no quede debajo de la barra.</p><pre><code>Scaffold(\n    topBar = { TopAppBar(title = { Text("Clientes") }) },\n    floatingActionButton = {\n        FloatingActionButton(onClick = { }) { Text("+") }\n    }\n) { padding -&gt;\n    Column(Modifier.padding(padding)) {\n        // el contenido\n    }\n}</code></pre><p>El <code>padding</code> que recibe el bloque es la clave: si no lo aplicas, la lista se mete debajo de la barra superior y las primeras filas quedan tapadas. Es el error más común al empezar.</p>'},
    {t:'MaterialTheme: colores, tipografía, formas',
     html:'<p>El tema se define <b>una sola vez</b> en la app y todas las pantallas lo heredan. Por eso nunca escribes <code>Color.Red</code> suelto en un composable de negocio.</p><pre><code>MaterialTheme(\n    colorScheme = lightColorScheme(\n        primary = Color(0xFF1B7F5C),\n        onPrimary = Color.White\n    )\n) {\n    // aquí dentro, todas las pantallas\n}</code></pre><p>Los tres palos del tema:</p><ul><li><code>colorScheme</code> — <code>primary</code>, <code>onPrimary</code>, <code>background</code>, <code>error</code>…</li><li><code>typography</code> — <code>headlineLarge</code>, <code>titleMedium</code>, <code>bodySmall</code>…</li><li><code>shapes</code> — los radios de esquina.</li></ul><p>En una pantalla se consume así: <code>MaterialTheme.colorScheme.primary</code> o <code>MaterialTheme.typography.titleMedium</code>. Si el color está metido en un <code>Text</code> suelto, cambiar el tema ya no cambia esa pantalla, y la app deja de verse coherente.</p>'},
    {t:'Modo oscuro',
     html:'<p>El modo oscuro no se activa en cada pantalla: se cambia el <code>ColorScheme</code> entero. Defines dos, <code>lightColorScheme</code> y <code>darkColorScheme</code>, y Android elige según la configuración del sistema.</p><pre><code>val colores = if (isSystemInDarkTheme()) darkColorScheme(...) else lightColorScheme(...)</code></pre><p>Dos avisos:</p><ul><li><code>isSystemInDarkTheme()</code> devuelve <code>true</code> cuando el sistema está en oscuro.</li><li>Los colores <b>hardcodeados</b> (<code>Color.White</code>) se ven horribles en modo oscuro. Usa siempre <code>MaterialTheme.colorScheme.onBackground</code> y compañía.</li></ul><p>Puedes probarlo sin tocar el emulador: la anotación <code>@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)</code> te enseña la pantalla en oscuro.</p>'},
    {t:'Animación simple (animateContentSize)',
     html:'<p>Las animaciones en Compose son modificadores. El más útil de todos:</p><pre><code>Row(modifier = Modifier.animateContentSize()) { /* … */ }</code></pre><p>Lo que hace es <b>animar el cambio de tamaño</b> del contenedor cuando su contenido crece o se encoge. Es lo que evita el salto brusco al abrir un desplegable o al filtrar una lista.</p><p>Las dos familias que verás después:</p><ul><li><code>animate*AsState</code> — un valor que cambia solo y se interpola.</li><li><code>AnimatedVisibility</code> — aparece y desaparece con transición.</li></ul><p>Y un consejo de rendimiento: <b>no animes lo que cambia con cada tecla</b>. Animar el texto de un <code>TextField</code> en cada pulsación se siente lento aunque el equipo no lo note.</p>'}
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
    {t:'NavController y NavHost',
     html:'<p>La navegación en Compose se parece a la de VB, pero sin un archivo por formulario: hay un <b>NavController</b> que sabe en qué pantalla estás y un <code>NavHost</code> que dibuja esa pantalla.</p><pre><code>val navController = rememberNavController()\n\nNavHost(navController = navController, startDestination = "login") {\n    composable("login") { PantallaLogin(navController) }\n    composable("home") { PantallaHome(navController) }\n}</code></pre><p>El <code>NavController</code> se crea con <code>rememberNavController()</code> y vive en el composable raíz (el <code>setContent</code>). Todas las pantallas lo reciben como parámetro.</p><p>Lo que cambia respecto al patrón clásico es que <b>no hay un archivo por pantalla</b>: cada ruta es una función de Kotlin, y la pantalla anterior conserva su estado en la pila de navegación.</p>'},
    {t:'Definir rutas (composable("login"))',
     html:'<p>Cada <code>composable("ruta")</code> es una pantalla. El nombre de la ruta es una cadena, y es la misma cadena la que usas luego para navegar:</p><pre><code>composable("login") { … }\ncomposable("home") { … }\ncomposable("cliente/{id}") { id -&gt; … }</code></pre><p>Las claves entre llaves (<code>{id}</code>) son <b>argumentos</b>: van declarados en la ruta y se reciben como parámetro en el bloque.</p><p>El punto débil de este enfoque son las cadenas mágicas: si escribes <code>"hme"</code> en un sitio y <code>"home"</code> en otro, el compilador no dice nada y la app falla al navegar. La solución moderna son las rutas type-safe, que se ven en el último tema de esta fase.</p>'},
    {t:'Navegar con navigate() y evitar volver al login (popUpTo)',
     html:'<p>Navegar es una línea:</p><pre><code>navController.navigate("home")</code></pre><p>El problema aparece al pulsar «atrás»: vuelves a la pantalla de login y el usuario puede volver a entrar. La solución es limpiar la pila al navegar:</p><pre><code>navController.navigate("home") {\n    popUpTo("login") { inclusive = true }\n}</code></pre><p>Qué hace cada parte: <code>popUpTo("login")</code> elimina la pantalla de login de la pila, e <code>inclusive = true</code> elimina también la propia pantalla de login, no solo las que había encima. El botón «atrás» ahora sale de la app en vez de devolverte al formulario.</p><p>Y el caso contrario, cuando el login <b>debe</b> poder volver atrás (un flujo de varios pasos), se usa <code>launchSingleTop = true</code> para no apilar dos veces la misma pantalla.</p>'},
    {t:'Pasar un argumento (nombre del usuario) a otra pantalla',
     html:'<p>Un argumento va en la ruta con <code>{nombre}</code> y se declara con <code>navArgument</code>:</p><pre><code>NavHost(navController, startDestination = "login") {\n    composable(\n        route = "bienvenida/{nombre}",\n        arguments = listOf(navArgument("nombre") { type = NavType.StringType })\n    ) { entry -&gt;\n        val nombre = entry.arguments?.getString("nombre")\n        PantallaBienvenida(nombre)\n    }\n}</code></pre><p>Y al navegar, el valor va dentro de la ruta:</p><pre><code>navController.navigate("bienvenida/$nombre")</code></pre><p>Si el valor tiene espacios o caracteres especiales, codifícalo antes: <code>Uri.encode(nombre)</code>, y decodifícalo al recibirlo con <code>Uri.decode()</code>. Sin eso, un nombre con espacio rompe la navegación.</p><p>Para pasar algo más grande que un texto, la alternativa es guardar el objeto en el <code>ViewModel</code> compartido y pasar solo el identificador por la ruta.</p>'},
    {t:'Validar campos vacíos y mostrar error en el TextField',
     html:'<p>La validación también es estado: un mensaje de error es un texto que se guarda. El patrón es el mismo en todos los formularios:</p><pre><code>var usuario by remember { mutableStateOf("") }\nvar error by remember { mutableStateOf&lt;String?&gt;(null) }\n\nif (error != null) {\n    Text(error!!, color = MaterialTheme.colorScheme.error)\n}</code></pre><p>La validación se dispara al pulsar el botón, no en cada tecla: es más usable y evita regañar al usuario mientras escribe.</p><p><b>Y no confíes en el cliente.</b> Validar en la pantalla es una cortesía para el usuario; la validación real (que la clave sea correcta, que el correo exista) ocurre en el servidor. En la Fase 7 lo ves con Firebase: la app manda el intento y el servidor responde.</p>'},
    {t:'Ocultar la clave (PasswordVisualTransformation)',
     html:'<p>Un campo de contraseña se hace con <code>visualTransformation</code>:</p><pre><code>OutlinedTextField(\n    value = clave,\n    onValueChange = { clave = it },\n    label = { Text("Contraseña") },\n    visualTransformation = PasswordVisualTransformation(),\n    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password)\n)</code></pre><p><code>PasswordVisualTransformation</code> dibuja los puntos, pero <b>el texto sigue siendo el mismo</b> por dentro: no es cifrado. Para poder copiar y pegar la contraseña hace falta <code>KeyboardOptions</code> con <code>autoCorrectEnabled = false</code>, y para el icono de «mostrar contraseña» se usa <code>visualTransformation = if (visible) VisualTransformation.None else PasswordVisualTransformation()</code>.</p><p>Y recuerda lo de la Fase 0: lo que validas en la pantalla es cortesía, no seguridad.</p>'},
    {t:'Investiga: rutas type-safe en la versión actual de Navigation Compose',
     html:'<p>Este tema queda abierto a propósito, porque la API cambia entre versiones. Lo que hay que tener en cuenta:</p><ul><li>Las rutas con cadenas libres (<code>"home/{id}"</code>) no las comprueba el compilador: un error de dedo es un error en tiempo de ejecución.</li><li>Navigation Compose ofrece <b>rutas type-safe</b>: defines los destinos como objetos Kotlin tipados y el compilador verifica que los argumentos coincidan.</li><li>Antes de adoptarlas, mira las <b>notas de versión</b> de Navigation Compose: la API ha cambiado más de una vez entre versiones estables.</li></ul><p>Notas de versión: <a href="https://developer.android.com/jetpack/androidx/releases/navigation" target="_blank" rel="noopener">developer.android.com/jetpack/androidx/releases/navigation</a>.</p>'}
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
    {t:'Por qué el estado en el composable se pierde al rotar la pantalla',
     html:'<p><code>remember</code> sobrevive a las recomposiciones, pero <b>no</b> al cambio de configuración. Al girar el móvil, Android destruye la Activity y la reconstruye: el composable vuelve a ejecutarse desde cero y <code>remember</code> arranca de nuevo.</p><p>Lo que ves: escribes un usuario, rotas el móvil y el campo se vacía. No es un fallo de Compose, es el ciclo de vida de Android.</p><p>La solución es no guardar en el composable lo que debe sobrevivir a la rotación. Ese estado vive en un <code>ViewModel</code>, que sobrevive al cambio de configuración. Es el siguiente tema.</p>'},
    {t:'ViewModel',
     html:'<p>Un <code>ViewModel</code> es una clase que sobrevive a los cambios de configuración (rotación) y se destruye cuando el usuario sale de la pantalla de verdad.</p><pre><code>class LoginViewModel : ViewModel() {\n    var usuario by mutableStateOf("")\n    fun onUsuarioCambia(valor: String) { usuario = valor }\n}</code></pre><p>Y se obtiene en el composable con la biblioteca de lifecycle:</p><pre><code>val viewModel: LoginViewModel = viewModel()\nTextField(value = viewModel.usuario, onValueChange = viewModel::onUsuarioCambia)</code></pre><p>La idea es separar <b>qué se muestra</b> (el composable) de <b>qué se recuerda y qué ocurre</b> (el ViewModel). El composable no guarda nada: solo pinta lo que el ViewModel le da y le devuelve los eventos.</p>'},
    {t:'Data class UiState (usuario, clave, error, cargando)',
     html:'<p>Un <code>UiState</code> es una <code>data class</code> que junta <b>todo</b> el estado de la pantalla en un solo valor. En vez de cuatro variables sueltas, una:</p><pre><code>data class LoginUiState(\n    val usuario: String = "",\n    val clave: String = "",\n    val error: String? = null,\n    val cargando: Boolean = false\n)</code></pre><p>El beneficio aparece en cuanto hay dos estados que van juntos: «cargando» y «error» no pueden estar activos los dos a la vez, y con variables sueltas se puede. Con un solo objeto, esa incoherencia es imposible por construcción.</p><p>Y como es una <code>data class</code>, se copia con <code>copy()</code>:</p><pre><code>estado = estado.copy(cargando = true)</code></pre>'},
    {t:'StateFlow y collectAsState',
     html:'<p>Un <code>StateFlow</code> es un flujo que <b>siempre tiene un valor actual</b>. A diferencia de un flujo normal, no se pierde lo emitido antes de que alguien se suscriba.</p><pre><code>class LoginViewModel : ViewModel() {\n    private val _ui = MutableStateFlow(LoginUiState())\n    val ui: StateFlow&lt;LoginUiState&gt; = _ui.asStateFlow()\n\n    fun onUsuarioCambia(v: String) {\n        _ui.value = _ui.value.copy(usuario = v)\n    }\n}</code></pre><p>La regla importante: el flujo que se expone es <b>de solo lectura</b> (<code>asStateFlow()</code>). Así nadie cambia el estado desde fuera del ViewModel.</p><p>En la pantalla:</p><pre><code>val ui by viewModel.ui.collectAsState()\nTextField(value = ui.usuario, onValueChange = { viewModel.onUsuarioCambia(it) })</code></pre>'},
    {t:'Flujo unidireccional de datos (UDF)',
     html:'<p>UDF es una frase, no una librería. Dice: <b>el estado baja y los eventos suben</b>. Nada más.</p><pre><code>UI  ──evento──▶  ViewModel  ──estado nuevo──▶  UI</code></pre><p>Lo que se prohíbe es que la UI escriba el estado directamente. Si un <code>TextField</code> guardara el texto en su propia variable, el ViewModel no sabría nada y el estado se partiría en dos.</p><p>La forma de comprobar que lo estás haciendo bien es preguntarte: <b>¿puedo dibujar toda la pantalla sin tocar la lógica?</b> Si la respuesta es sí, la UI está limpia.</p>'},
    {t:'Pruebas unitarias del ViewModel (básico)',
     html:'<p>La ventaja grande del UDF es que el ViewModel se puede probar sin Android: no hace falta emulador ni instrumentación.</p><pre><code>class LoginViewModelTest {\n    @Test\n    fun `usuario vacio muestra error`() {\n        val vm = LoginViewModel()\n        vm.intentarEntrar()\n        assertEquals("El usuario es obligatorio", vm.ui.value.error)\n    }\n}</code></pre><p>La prueba se escribe casi igual que la regla de negocio: «dado X, cuando Y, entonces Z». Es la ventaja de que el estado viva en un <code>data class</code> y no repartido en la pantalla.</p><p>Dos cosas hacen posibles estas pruebas: <b>inyectar dependencias</b> (el ViewModel recibe el repositorio en el constructor, así que le pasas uno falso) y <b>no depender del reloj</b> (si tu ViewModel lanza corrutinas, inyecta el dispatcher para que la prueba no dependa del tiempo real).</p>'}
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
    {t:'SQL básico (INSERT, SELECT, UPDATE, DELETE)',
     html:'<p>Antes de Room, el SQL. Las cuatro operaciones:</p><pre><code>SELECT * FROM cliente WHERE activo = 1;\nINSERT INTO cliente (nombre, telefono) VALUES (\'Ana\', \'300\');\nUPDATE cliente SET telefono = \'301\' WHERE id = 1;\nDELETE FROM cliente WHERE id = 1;</code></pre><p>Lo que más se te va a olvidar: el <code>WHERE</code>. Un <code>UPDATE</code> sin <code>WHERE</code> actualiza la tabla entera. Es el mismo error de siempre, solo que ahora afecta a los datos del usuario.</p><p>Y el orden en que se cuentan las columnas: <code>INSERT INTO cliente (nombre, telefono)</code>. La lista explícita evita que el resultado dependa del orden en que definiste la tabla.</p>'},
    {t:'Room: @Entity, @Dao, @Database',
     html:'<p>Room te deja escribir SQL de verdad y lo convierte en código tipado, sin <code>ContentValues</code> ni <code>Cursor</code>.</p><pre><code>@Entity(tableName = "clientes")\ndata class Cliente(\n    @PrimaryKey(autoGenerate = true) val id: Int = 0,\n    val nombre: String,\n    val telefono: String,\n    val entregado: Boolean = false\n)\n\n@Dao\ninterface ClienteDao {\n    @Query("SELECT * FROM clientes")\n    fun todos(): Flow&lt;List&lt;Cliente&gt;&gt;\n\n    @Insert\n    suspend fun insertar(cliente: Cliente)\n\n    @Delete\n    suspend fun borrar(cliente: Cliente)\n}\n\n@Database(entities = [Cliente::class], version = 1)\nabstract class AppDatabase : RoomDatabase() {\n    abstract fun clienteDao(): ClienteDao\n}</code></pre><p>Las tres piezas: <code>@Entity</code> es la tabla, <code>@Dao</code> son las consultas y <code>@Database</code> es la base de datos que las junta. Room comprueba el SQL <b>al compilar</b>: si escribes una columna que no existe, el error sale al compilar y no en producción.</p>'},
    {t:'Corrutinas: suspend y viewModelScope',
     html:'<p>Acceder a la base de datos bloquea el hilo. Por eso las consultas van en corrutinas.</p><pre><code>// En el DAO\n@Query("SELECT * FROM clientes")\nsuspend fun todos(): List&lt;Cliente&gt;\n\n// En el ViewModel\nfun cargar() {\n    viewModelScope.launch {\n        val lista = dao.todos()\n        _ui.value = _ui.value.copy(listas = lista)\n    }\n}</code></pre><p><code>suspend</code> marca una función que puede pausarse y retomarse sin bloquear el hilo. <code>viewModelScope.launch</code> es el <code>Task.Run</code> de Kotlin: lanza la operación en segundo plano y la cancela sola cuando el ViewModel se destruye.</p><p>El error clásico: <code>suspend</code> en el DAO pero olvidar el <code>launch</code> al llamar. Una función <code>suspend</code> solo se puede llamar desde otra corrutina.</p>'},
    {t:'Flow desde el DAO',
     html:'<p>Si el DAO devuelve un <code>Flow</code>, la lista <b>se actualiza sola</b> cuando cambia la base de datos. No hace falta recargar a mano.</p><pre><code>@Query("SELECT * FROM clientes")\nfun todos(): Flow&lt;List&lt;Cliente&gt;&gt;\n\n// en el ViewModel\nval clientes: StateFlow&lt;List&lt;Cliente&gt;&gt; = dao.todos()\n    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())\n\n// en la pantalla\nval lista by viewModel.clientes.collectAsState()</code></pre><p>El <code>Flow</code> del DAO es la parte «reactiva» de Room: insertas un cliente y la pantalla lo muestra sin que nadie llame a «recargar».</p><p><code>stateIn</code> convierte el flujo en un <code>StateFlow</code> con un valor inicial, y <code>WhileSubscribed(5000)</code> evita que la consulta se corte en cuanto nadie mira: sin eso, al rotar la pantalla se volvería a consultar la base de datos.</p>'},
    {t:'Repository para centralizar el acceso',
     html:'<p>El repositorio es una capa entre los datos y la pantalla. Su trabajo no es «esconder SQL»: es <b>no atar la pantalla a dónde vienen los datos</b>.</p><pre><code>interface ClienteRepository {\n    fun todos(): Flow&lt;List&lt;Cliente&gt;&gt;\n    suspend fun guardar(cliente: Cliente)\n}\n\nclass ClienteRepositoryImpl(private val dao: ClienteDao) : ClienteRepository {\n    override fun todos() = dao.todos()\n    override suspend fun guardar(cliente: Cliente) = dao.insertar(cliente)\n}</code></pre><p>La pantalla habla con la <b>interfaz</b>, nunca con la implementación. El día que quieras los datos de Firebase en vez de Room, cambias la implementación y la pantalla ni se entera. Eso es exactamente lo que hace posible la «vista quemada» de la Fase 7.</p><p>Y da otra ventaja concreta: en las pruebas del ViewModel puedes meter un repositorio falso, sin base de datos ni emulador.</p>'},
    {t:'Pantallas: lista, agregar, editar, eliminar',
     html:'<p>Con la capa de datos lista, las cuatro pantallas salen casi del mismo patrón:</p><ul><li><b>Lista</b> — <code>LazyColumn</code> con <code>items(lista, key = { it.id })</code> y un botón flotante que lleva a «agregar».</li><li><b>Agregar y editar</b> — el mismo formulario, con el ID como argumento de ruta. Si la ruta trae ID, editas; si no, creas.</li><li><b>Eliminar</b> — un <code>IconButton</code> con <code>AlertDialog</code> de confirmación. Borrar sin preguntar es la forma más rápida de perder la confianza del usuario.</li></ul><p>El flujo completo es siempre el mismo: la pantalla pide datos al repositorio, el ViewModel los expone como estado y la pantalla solo pinta. Ninguna pantalla toca el DAO.</p>'}
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
    {t:'Crear proyecto en la consola de Firebase y conectarlo a la app',
     html:'<p>El flujo, una vez:</p><ul><li>En la <b>consola de Firebase</b>, «Agregar proyecto», con el mismo nombre que tu app.</li><li>«Agregar app → Android» → introduces el <b>package name</b> exacto de tu app (el de <code>build.gradle.kts</code>), descargas el <code>google-services.json</code> y lo copias en la carpeta <code>app/</code>.</li><li>En el <code>build.gradle.kts</code> de la app aplicas el plugin <code>com.google.gms.google-services</code>; en el del proyecto, la dependencia <code>com.google.gms:google-services</code>.</li><li>Activas <b>Authentication → Sign-in method → Email/Password</b>.</li></ul><p>El paso que más gente se salta es el último: si no habilitas el método de acceso, la app da error aunque el SDK esté bien configurado.</p>'},
    {t:'Registro con correo y clave',
     html:'<p>El registro son dos llamadas: crear el usuario e iniciar sesión con él.</p><pre><code>auth.createUserWithEmailAndPassword(correo, clave)\n    .addOnSuccessListener { /* sesión iniciada */ }\n    .addOnFailureListener { e -&gt; /* error */ }</code></pre><p>El <code>Task</code> devuelve un resultado asíncrono: o la cuenta se crea y hay sesión, o vuelve un error. <b>Nunca</b> validas la contraseña por tu cuenta ni la mandas a un servidor propio en esta fase.</p><p>Y el error que más se ve: <b>«email address is already in use»</b>. No es un problema del código: ese correo ya tiene cuenta. El mensaje que muestras tiene que decirlo, no salir con «error desconocido».</p>'},
    {t:'Inicio y cierre de sesión',
     html:'<p>Iniciar sesión es el mismo par con otro método:</p><pre><code>auth.signInWithEmailAndPassword(correo, clave)</code></pre><p>Y cerrar sesión, una línea… más un detalle que se olvida:</p><pre><code>auth.signOut()\nnavController.popBackStack(navController.graph.startDestinationId, inclusive = false)</code></pre><p>Al cerrar sesión hay que <b>quitar la pantalla de inicio de la pila</b>. Si no, el botón «atrás» del teléfono devuelve al usuario a la app ya cerrada y puede ver la sesión anterior a medias.</p>'},
    {t:'Detectar sesión activa al abrir la app',
     html:'<p>No puedes asumir que el usuario está desconectado. Al abrir la app hay que preguntarle a Firebase quién es el usuario actual:</p><pre><code>val usuario = auth.currentUser</code></pre><p>Si no es <code>null</code>, hay sesión abierta: navegas directo a la pantalla principal. Si es <code>null</code>, al login.</p><p>Y el detalle que cambia el comportamiento real: <code>currentUser</code> <b>no</b> se actualiza solo en un servidor con varios dispositivos. Para eso está el <code>AuthStateListener</code>:</p><pre><code>auth.addAuthStateListener { firebase -&gt; /* cambió el usuario */ }</code></pre><p>Sin ese listener, si el usuario cierra sesión en el teléfono y la tablet sigue creyendo que hay sesión. La sesión es un dato <b>del servidor</b>, no del dispositivo.</p>'},
    {t:'Manejo de errores (clave débil, correo ya usado)',
     html:'<p>Los errores de Firebase llegan como <code>FirebaseAuthException</code>, y cada código significa algo distinto. El patrón es traducirlos a un mensaje que el usuario entienda:</p><pre><code>try {\n    auth.createUserWithEmailAndPassword(correo, clave).await()\n} catch (e: FirebaseAuthException) {\n    val mensaje = when (e.errorCode) {\n        "ERROR_WEAK_PASSWORD" -&gt; "La clave necesita al menos 6 caracteres"\n        "ERROR_EMAIL_ALREADY_IN_USE" -&gt; "Ese correo ya tiene una cuenta"\n        "ERROR_INVALID_EMAIL" -&gt; "El correo no tiene un formato válido"\n        else -&gt; "No se pudo crear la cuenta. Inténtalo de nuevo."\n    }\n}</code></pre><p>Lo que hay que evitar es el <code>catch (e: Exception)</code> genérico con un «algo salió mal»: el usuario no puede arreglarlo. Y tampoco el error crudo de Firebase, que sale en inglés y con un código.</p><p>Un caso aparte: la <b>debilidad de la clave</b>. Firebase pide 6 caracteres, pero el mensaje real es que la clave se puede adivinar. Si guardas datos reales, exige un mínimo más alto.</p>'},
    {t:'Investiga: dónde guardar y qué NO subir a GitHub (google-services.json)',
     html:'<p>El <code>google-services.json</code> es la configuración de tu proyecto de Firebase. No es una clave secreta —no contiene la clave privada del servidor— pero sí identifica tu proyecto, y por eso se trata como configuración sensible.</p><p>La práctica correcta, y la que se sigue en la documentación:</p><ul><li>No lo subas al repositorio: añádelo al <code>.gitignore</code>.</li><li>Cada entorno (desarrollo, pruebas, producción) tiene su <b>propio</b> archivo. No se copia el de producción al de pruebas.</li><li>La <b>API key</b> que aparece dentro se restringe en la consola de Firebase por paquete y por huella digital, para que no se pueda usar desde otra app.</li></ul><p>Y lo que no se sube nunca, en ningún sitio: las <b>reglas de seguridad</b> de Firestore en modo abierto, las claves privadas de servicio ni los archivos <code>service-account</code>.</p>'}
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
    html:'<p><b>Respuesta corta:</b> sí, una vista previa que intente leer Firebase directamente falla, y <b>eso no es un error del proyecto</b>: es el diseño correcto. La vista previa corre en un sandbox aislado, sin Activity real, sin ViewModel construido por la app y sin red. Por eso el patrón correcto es:</p><ol><li><b>Separa el composable con estado del que solo dibuja.</b> El primero (el que usa el ViewModel o el repositorio) no se previsualiza; el segundo recibe datos por parámetro y <i>sí</i> se previsualiza con datos de ejemplo.</li><li><b>Detrás de una interfaz.</b> La pantalla pide datos a una interfaz de repositorio. En la app real se inyecta la implementación con Firebase; en la vista previa se inyecta una implementación <i>falsa</i> con datos locales. La pantalla no cambia ni una línea.</li><li><b>Si necesitas una diferencia real entre preview y app</b>, existe <code>LocalInspectionMode.current</code>, que es <code>true</code> únicamente dentro de una vista previa. Úsalo con moderación: el patrón de separar composables es más limpio.</li></ol><p>Consecuencia: la vista previa es <b>una herramienta de diseño</b>, no el producto. Muestra la forma, el color, los estados vacío/cargando/error y la legibilidad; los datos que ves son de mentira y suenan a mentira a propósito. Lo que hay que probar de verdad (registro real, sesión persistente, reglas de seguridad) se prueba en el emulador o en el teléfono.</p>',
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
    {t:'Dibujar en papel el mapa de pantallas antes de codificar',
     html:'<p>Antes de la primera línea de código, dibuja las pantallas en papel. Cuatro recuadros bastan:</p><pre><code>[Login] ──▶ [Clientes] ──▶ [Detalle]\n                    │             │\n                    └──▶ [Resumen del día]</code></pre><p>Con el dibujo delante se responden tres preguntas que, si no, aparecen a mitad del desarrollo:</p><ul><li>¿Qué pantallas hay y cómo se pasa de una a otra?</li><li>¿Qué datos necesita cada una?</li><li>¿De dónde sale cada dato?</li></ul><p>Es el mismo consejo de la Fase 0 aplicado al diseño: el mapa cuesta una hoja de papel y evita reescribir media app.</p>'},
    {t:'Estructura de carpetas por capas (ui, data)',
     html:'<p>La estructura por capas es lo que hace el proyecto ampliable. La mínima que ya tienes:</p><pre><code>app/src/main/java/com/tuempresa/mensajero/\n├── data/\n│   ├── entity/Cliente.kt\n│   ├── dao/ClienteDao.kt\n│   ├── repo/ClienteRepository.kt\n│   └── remote/AuthRepository.kt\n├── ui/\n│   ├── login/LoginScreen.kt\n│   ├── login/LoginViewModel.kt\n│   ├── clientes/ClientesScreen.kt\n│   └── tema/Tema.kt\n└── MainActivity.kt</code></pre><p>La regla que lo sostiene: <b>nada de <code>data/</code> importa <code>ui/</code></b>. La UI no sabe si los datos vienen de Room, de Firebase o de una API. Si algún día aparece un <code>import</code> de Firebase en una pantalla, el proyecto está mal montado.</p><p>Y dentro de <code>ui/</code>, una pantalla y su ViewModel van juntos: <code>LoginScreen.kt</code> y <code>LoginViewModel.kt</code> en la misma carpeta.</p>'},
    {t:'Commits pequeños con mensajes claros',
     html:'<p>Un commit es una unidad de cambio con un motivo. «Pequeño» significa que se puede revisar, revertir y explicar.</p><pre><code>git add -A\n git commit -m "feat: agrega pantalla de login con validación de campos"\n git commit -m "fix: corrige el salto al validar el email vacío"</code></pre><p>El mensaje dice <b>qué</b> y, cuando hace falta, <b>por qué</b>. «Arreglado» no sirve de nada: seis meses después nadie sabe qué se arregló ni por qué.</p><p>Y el orden importa: un commit por cosa. Si metes tres arreglos en un commit, cuando algo falle no sabes cuál de los tres era.</p>'},
    {t:'Probar en un teléfono real',
     html:'<p>El emulador es cómodo, pero miente en cosas que importan: el rendimiento, el consumo de batería, los permisos y la cámara. Antes de publicar, prueba en un teléfono de verdad.</p><ul><li><b>Depuración por USB</b>: activa las <i>Opciones de desarrollador</i> y la <i>depuración USB</i>, y conecta el teléfono. Aparece en el desplegable de dispositivos de Android Studio.</li><li><b>Prueba sin cobertura de red</b>: pon el móvil en modo avión y comprueba que la app avisa en vez de fallar.</li><li><b>Prueba el proceso muerto</b>: en las opciones de desarrollador, «No mantener actividades» reproduce lo que pasa cuando el sistema mata la app por falta de memoria.</li><li><b>Prueba la rotación</b> y el modo oscuro: ahí es donde se rompen los estados guardados en el composable.</li></ul>'},
    {t:'Investiga: generar APK/AAB firmado',
     html:'<p>Este tema queda abierto a propósito: los detalles cambian entre versiones del Android Gradle Plugin. Lo que hay que tener claro:</p><ul><li><b>Debug y release</b> son builds distintas. La de release es la que se sube; la de debug lleva <code>android:debuggable</code> y no vale para publicar.</li><li><b>Firma</b>: se genera un <i>keystore</i> con <code>keytool</code> y la app se firma con él. Sin firma, la app no se puede publicar.</li><li><b>APK o AAB</b>: Google Play pide un <b>AAB</b> (Android App Bundle), que genera las variantes por dispositivo; el APK es para distribución manual.</li><li><b>La clave hay que guardarla</b>: si la pierdes, no puedes publicar una actualización de esa app.</li></ul><p>El procedimiento exacto y vigente está en la guía oficial de publicación de Android Developers: <a href="https://developer.android.com/studio/publish/app-signing" target="_blank" rel="noopener">developer.android.com/studio/publish/app-signing</a>.</p>'},
    {t:'Escribir un README con capturas',
     html:'<p>El README es lo primero que ve alguien que abre tu repositorio. Con cinco cosas queda bien:</p><ul><li><b>Qué es</b> la app, en dos líneas.</li><li><b>Capturas</b>: dos o tres pantallas. Una captura vale más que tres párrafos.</li><li><b>Cómo se compila</b>: el SDK mínimo, el JDK y los pasos exactos.</li><li><b>Qué usa</b>: las librerías y para qué.</li><li><b>La licencia</b>.</li></ul><p>Un truco: escribe el README <b>antes</b> de terminar la app. Si no puedes explicarlo, igual te falta una parte.</p>'},
    {t:'Elegir tu siguiente app propia (por ejemplo el puesto de frutas con inventario)',
     html:'<p>La segunda app es donde se consolida lo aprendido, así que conviene que sea <b>tuya</b> y que tenga los tres ingredientes: datos que guardar, usuarios que autenticar y un flujo de pantallas.</p><p>El puesto de frutas con inventario cumple los tres:</p><ul><li><b>Datos</b>: una tabla de productos con existencias, precio y fecha de entrada.</li><li><b>Sesión</b>: aunque sea un PIN, ya tienes autenticación.</li><li><b>Flujo</b>: entrar → ver inventario → registrar entrada o salida → ver el total del día.</li></ul><p>La idea es que <b>no copies la app de las fases</b>: ya tienes las piezas, ahora el reto es unirlas con tu propio dominio. Si te las sabes de memoria, sabrás en qué parte de Android te estás atascando.</p>'}
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
