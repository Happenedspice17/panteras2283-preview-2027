# Reglas del robot FRC (manual vigente: 2026)

Resumen en español de la **sección 8 "ROBOT Construction Rules" (R101-R907)** del manual del juego FRC 2026 (REBUILT), para que los alumnos de Panteras 2283 consulten rápido qué exige el manual y cómo afecta al diseño en Onshape.

> **Política del manual vigente (léelo primero).** El **único manual que cuenta es el vigente: hoy, el de 2026**. El de 2027 sale el **9 de enero de 2027** y lo **reemplazará por completo**; cuando salga, este archivo se reemplaza (no se "parcha"). El manual 2025 aparece solo como **contexto histórico** en la sección "Cambios 2025 → 2026": **nunca apliques una restricción de un año anterior**. Si algo estaba prohibido en 2025 pero 2026 no lo prohíbe o no lo menciona, **en 2026 es legal**. Al revés también aplica: lo que 2026 no lista como permitido (motores, controladores) no está permitido aunque lo estuviera en 2025.
>
> **Fidelidad y límites.** Texto base: extracción del PDF oficial 2026 (versión "TU22", sección 8, págs. 78-114). La extracción **no incluye las figuras** (p. ej. Figuras 8-1 a 8-14) ni el resto del manual (secciones 5, 9, 10, etc.); donde el texto extraído es ambiguo se indica. Las reglas de inspección (sección 9) y de juego (G###) no se resumen aquí. Ante cualquier duda, manda el manual PDF y el Lead Robot Inspector (LRI) del evento.

**Cómo leer las tablas.** Columna *Regla* = número R### del manual 2026. *Qué exige* = resumen fiel con números exactos (pulgadas como en el manual; cm entre paréntesis cuando el manual los da). *Impacto en diseño* = interpretación práctica del equipo (no es texto del manual). Las reglas que dependen de elementos del juego 2026 se marcan **(específica del juego 2026)**.

**Seguridad primero.** Las reglas de 8.2 y 8.6 existen para evitar lesiones e incendios. Cualquier trabajo con batería conectada, soldadura o neumática presurizada requiere supervisión de un mentor adulto.

---

## 8.1 General ROBOT Design

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R101 | El ROBOT PERIMETER (sin bumpers) debe ser **fijo**: formado por elementos estructurales fijos, no articulados, dentro de la BUMPER ZONE y definido en STARTING CONFIGURATION. Protrusiones menores **<= 0.25 in (0.64 cm)** (cabezas de pernos, puntas de fasteners, cordones de soldadura, remaches) no cuentan. Se mide con un hilo tensado a la altura de la BUMPER ZONE (R405). | El frame perimeter no puede tener partes móviles. Un chasis en "U" cuenta como rectángulo (el hilo cruza el hueco). Diseña pernos que no sobresalgan más de 0.25 in. |
| R102 | En STARTING CONFIGURATION ninguna parte del robot sale de la proyección vertical del ROBOT PERIMETER, salvo bumpers y protrusiones menores (pernos, remaches, cable ties). Prueba: con bumpers quitados y cada lado contra una pared vertical, solo toca el perímetro. Si usas mecanismos intercambiables (I103), debes mostrar cumplimiento de R102 y R105 en todas las configuraciones. | Intake, brazos y cámaras deben plegarse **dentro** del perímetro al iniciar. Modela la configuración inicial en Onshape con una restricción de pared. |
| R103 | Peso máximo del robot: **115.0 lb (52.16 kg)**. Se pesa la estructura básica + todos los elementos de los mecanismos que se usen en **una** configuración. **Excluidos** del peso: A) bumpers; B) batería y su mitad del conector Anderson (con cable, lugs, pernos y aislante); C) tags de localización del evento. | Presupuesto de peso por subsistema desde el inicio. La batería y los bumpers no cuentan aquí (sí cuentan en R408). El texto 2026 ya no menciona un largo máximo de cable de batería excluido (ver cambios). |
| R104 | STARTING CONFIGURATION: ROBOT PERIMETER **<= 110.0 in (2.794 m)** (perímetro total, no por lado) y altura **<= 30 in (76.2 cm)**. Considerar carrito, puertas y caja de envío. | Ejemplos de perímetro: 27x27 in = 108 in; 28x27 in = 110 in (aritmética del equipo). Sin bumpers. Los bumpers (8.4) pueden imponer restricciones adicionales. |
| R105 | El robot no puede extenderse más de **12 in (30.48 cm)** más allá de la proyección vertical de su ROBOT PERIMETER. Se debe poder demostrar en inspección que el robot se limita a sí mismo (hardware o software). | Limita carrera de elevadores/brazos/intakes a 12 in fuera del frame; añade límites mecánicos o de software. |
| R106 | **Extensión en una sola dirección a la vez**: el robot no puede extenderse más allá de su perímetro sobre más de 1 lado a la vez, y la extensión no puede salir de la proyección de ese lado. Un tramo circular cuenta como infinitos lados. Excepciones: bumpers y protrusiones menores de R101. Violaciones en partido: G413 (hay excepción para acciones MOMENTANEAS sin beneficio estratégico, como un cable tie que se balancea). | No diseñes mecanismos que salgan por dos lados a la vez (p. ej. intake frontal + brazo lateral desplegados juntos). Cuidado con perímetros redondeados. |
| R107 | Altura total del robot **<= 30.0 in (76.2 cm)**. Se mide como si el robot estuviera sobre piso plano sin cambiar su configuración (perpendicular al polígono del perímetro), no respecto a la alfombra en ese instante. | La altura máxima aplica también extendido (no solo al iniciar). Elevadores y brazos deben quedar en 30 in. |
| R108 **(en parte específica del juego 2026)** | Las extensiones del robot no pueden interactuar con la alfombra, las BUMPS o la TOWER BASE de modo que los **bumpers se levanten fuera de la BUMPER ZONE** (R405). | Mecanismos que apoyan en piso o estructuras del campo no deben "palanquear" el robot. BUMPS/TOWER BASE son elementos del juego 2026. |

---

## 8.2 ROBOT Safety & Damage Prevention

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R201 | Los **dispositivos de tracción** (todo lo diseñado para transmitir fuerzas de empuje o frenado entre robot y alfombra) no pueden tener superficies que dañen el ARENA: metal, lija, studs inflexibles, cleats, velcro (hook-loop) o similares. | Ruedas/llantas sin metal ni tacos rígidos expuestos a la alfombra. |
| R202 | Protrusiones y superficies expuestas no deben ser un peligro para elementos del ARENA (incl. SCORING ELEMENTS) ni personas. El acrílico u otros materiales que se rompen en filos **no están prohibidos**, pero cualquier rotura debe corregirse de inmediato. | Lima/desbarba bordes; cubre filos. Repara de inmediato piezas rotas. |
| R203 | Partes del robot no pueden ser de materiales peligrosos, inseguras, crear condiciones inseguras ni interferir con otros robots. **Ejemplos prohibidos:** A) escudos/cortinas que limiten la visión del drive team; B) bocinas/sirenas/audio que distraiga; C) dispositivos o decoración que busquen interferir con sensores de otros robots (incl. imágenes que usen o imiten AprilTags 36h11); D) **láseres que no sean IEC/EN 60825-1 "Clase 1" o IEC/EN 62471 "Exempt"**; E) gases inflamables; F) llamas/pirotecnia; G) fluidos o elementos **hidráulicos**; H) interruptores con **mercurio** líquido; I) circuitos que generen **más de 24 V**; J) lastre mal asegurado (arena, balines); K) **materiales peligrosos (p. ej. plomo, encapsulado o no)**; L) fuentes de luz de alta intensidad (tipo "militar"): solo encendidas brevemente al apuntar y posiblemente con pantalla; M) luces que parpadeen **más de ~5 veces por segundo** (E108). | No uses lastre de plomo; usa acero/latón/tungsteno asegurado con pernos. Sin estrobos. Cuida los stickers cerca de cámaras (nada parecido a AprilTags). Láseres: solo Clase 1/Exempt. |
| R204 | El robot debe permitir sacar los SCORING ELEMENTS y salir de elementos del campo estando **DISABLED y apagado**. | Piezas del juego atoradas deben poder liberarse sin energía; evita mecanismos que "atrapan" sin poder abrirse a mano. |
| R205 | Líquidos, geles, grasas y **partículas finas** no deben contaminar el campo ni otros robots. | Lubricación contenida; sin polvos ni fugas. |
| R206 | Elementos del robot que contactan SCORING ELEMENTS no deben representar un peligro significativo para ellos (rayones normales sí; picar, arrancar pedazos o marcarlos rutinariamente, no). | Revisa filos y superficies de intakes/garras. |

---

## 8.3 Budget Constraints & Fabrication Schedule

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R301 | Ningún ítem **no-KOP** o software puede tener un FMV (Fair Market Value) **> $600 USD**. Compras en volumen pueden superar $600 en total mientras cada COMPONENTE individual no pase de $600. FMV de COTS = precio del proveedor (disponible para todos los equipos durante la temporada; sin ofertas/cupones); **no incluye** impuestos, aranceles ni envío. Software gratis (incl. Virtual KOP) = $0. Piezas FABRICADAS = material + mano de obra, excepto mano de obra de miembros del equipo, de otros equipos o de talleres del evento. Sistemas/kits modulares: si solo funcionan en una configuración, cuenta el sistema completo; si los módulos son combinables, cada módulo por separado. Un proveedor que vende un sistema = se usa el FMV del sistema completo (no se vale comprar "mano", "muñeca" y "brazo" por separado para evadir el límite). Excepción: IMU ADIS16448 se considera legal sin importar su FMV. | Guarda cotizaciones/precios del proveedor para piezas cerca de $600. El texto de la sección 8 2026 **no trae límite de costo total** del robot. |
| R302 | Los **MAJOR MECHANISMS** (definición en I101) **creados antes del kickoff no están permitidos**. No hay umbral numérico; se espera honestidad. Ejemplos de trampa: preensamblar partes grandes antes del kickoff y unirlas después; quitar una pieza pequeña antes y reponerla después. | Nada de armar subsistemas grandes del robot de competencia antes del kickoff de la temporada; prototipos y práctica sí (el criterio es la honestidad del equipo). |
| R303 | Diseños y software hechos antes del kickoff **solo se permiten si sus archivos fuente están disponibles públicamente antes del kickoff**. Reescribir desde cero usando código viejo como referencia de algoritmos es válido; copiar código/CAD privado previo, no. | Si el equipo quiere reutilizar un diseño, publícalo (CAD/código) antes del kickoff. |

---

## 8.4 BUMPER Rules

Los bumpers son un ensamble obligatorio que se une al frame. Todas las dimensiones de esta sección son **nominales y se miden con tolerancia de 0.25 in (0.63 cm)**: los máximos admiten +0.25 in y los mínimos -0.25 in. Diseña al valor nominal y reserva la tolerancia para error de manufactura.

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R401 | Bumpers protegen **todo el ROBOT PERIMETER**. Huecos **< 1.25 in (3.17 cm)** entre segmentos adyacentes, siempre que todas las esquinas estén llenas (R406). Se permite **un solo hueco mayor a 1.25 in** si hay al menos **5.0 in (12.7 cm)** de perímetro protegido por bumper a cada lado de cada esquina. Un arco = infinitas esquinas: no puede tener hueco > 1.25 in. | Se puede dejar un solo hueco (p. ej. para una salida de intake) con 5 in de bumper a cada lado de las esquinas. |
| R402 | Toda sección vertical del bumper debe incluir A, B y C (excepto padding/cubierta que llegan a esquinas y tela que envuelve extremos). **A) Padding:** >= **2.25 in (5.72 cm)** de profundidad y >= **4.5 in (11.43 cm)** de alto; bloques/láminas/varillas apiladas de: i) **pool noodles sólidos** o backer rod; ii) espuma de **polietileno** celda cerrada sólida (incl. reticulado) de **1.5 a 3.0 lb/ft3 (24.03 a 48.05 kg/m3)**; iii) espuma **EVA** celda cerrada sólida de **2.0 a 6.0 lb/ft3 (32.04 a 96.11 kg/m3)**; iv) foam floor tiles. Se pueden combinar tipos/capas. **B) Backing:** >= **4.5 in (11.43 cm)** de alto, soporta el padding (sin voladizos salvo en esquinas) y permite instalar/quitar (R410); se pueden añadir elementos para reforzar, rellenar espacio, sujetar o "cualquier otro fin". **C) Cubierta:** tela (R411) sobre todas las caras externas, superiores e inferiores del padding. **D) Sistema de sujeción:** rígido y robusto (no velcro, cinta ni cable ties); aguanta juego rudo. Los fasteners removibles pueden contar como parte del bumper o del robot para el peso (R103/R408). | Ten datos del material (densidad) listos para inspección. Usa pool noodles **sólidos**. Bumper estándar: 2.25 in de espuma y backing de 4.5 in. Pernos o pasadores (no velcro) para fijarlo. |
| R403 | Los bumpers no pueden extenderse más de **4.0 in (10.16 cm)** del ROBOT PERIMETER. | Máximo bumper + holgura: 4 in desde el frame. |
| R404 | Partes **duras** del bumper (tuercas, pernos, cable ties, plásticos duros) no pueden salir más de **1.25 in (3.17 cm)** del perímetro; más allá solo padding, cubierta (con recubrimientos/marcas) y fasteners blandos. El padding debe extenderse **>= 2.0 in (5.08 cm)** más allá de cualquier parte dura. **Sin límite** de cuánto pueden entrar las partes duras dentro del perímetro. | Backing de madera/aluminio dentro; que la espuma sobresalga al menos 2 in de lo duro. |
| R405 | Mientras navega el campo normalmente, todos los bumpers deben tener padding (R402-A) soportado por backing (R402-B) que **llene por completo la BUMPER ZONE: entre 2.5 in (6.35 cm) y 5.75 in (14.61 cm) desde el piso**. Se mide en la(s) configuración(es) esperada(s) navegando, relativo a la superficie por la que se conduce. Que los bumpers salgan de la zona por volcarse involuntariamente no es violación. | Centra la espuma en la franja 2.5-5.75 in (3.25 in de altura de zona; el padding mide >= 4.5 in, así que cubre la zona con margen). |
| R406 | Las esquinas entre bumpers deben llenarse con padding **sin comprimir**, por lo menos **2.25 in (5.72 cm)** desde la esquina, sin huecos. Dos segmentos que se juntan en inglete (miter) con cubierta **no** cuentan como relleno. | Diseña bloques de espuma de esquina (o espuma que sobrepase); no inglete simple. |
| R407 | Los bumpers **no deben funcionar como cuñas** al interactuar con otros bumpers. Ejemplos que invitan escrutinio: espuma más blanda arriba; perfiles excesivamente redondeados (un solo semicírculo); padding más delgado o grueso hacia arriba o abajo (cónico/escalonado). | Perfil rectangular, densidad uniforme. |
| R408 | Peso total del robot (como en R103) **con bumpers <= 135.0 lb (61.23 kg)**. | Los bumpers (y su sujeción) suman al peso; el límite sin bumpers sigue en 115 lb. |
| R409 | Los bumpers deben estar **fijos** respecto al ROBOT PERIMETER. **No pueden contener elementos que se muevan durante el partido ni elementos eléctricos.** La compresión/flexión de cubierta o espuma y flexión mínima de backing/sujeción no cuentan como violación. | Nada de luces LED, sensores, cableado ni mecanismos dentro del bumper. |
| R410 | Los bumpers deben poder instalarse y quitarse para facilitar inspección y pesaje. Guía: **2 personas en menos de 5 minutos**. | Diseña sujeción con pasadores/pernos accesibles. |
| R411 | El robot debe poder mostrar cubiertas de bumper **roja o azul** según la alianza del cronograma del evento. Marcas contrastantes en caras externas/superiores/inferiores de la cubierta prohibidas, salvo: A) las de R412; B) velcro, broches o equivalentes respaldados por partes duras del bumper; C) **logos FIRST blancos de 4.75 a 5.25 in (12.06 a 13.33 cm)** de ancho (como los del Virtual Kit); D) zonas angostas de tela expuesta en costuras, esquinas o dobleces. | Necesitas **dos juegos de cubiertas** (roja y azul), números blancos y cambio rápido entre partidos. |
| R412 | Número de equipo en la cubierta, en **al menos 3 ubicaciones separadas ~90 grados**, legible sin ambigüedad desde cualquier punto de vista hasta ~**720 in (18.29 m)**. Criterios: A) solo **numerales árabes blancos**, **>= 3.75 in (9.53 cm)** de alto y **>= 0.5 in (1.27 cm)** de grosor de trazo (en la mayoría del trazo; serifas o remates menores permitidos); B) no envolver esquinas agudas (**< 135.0 grados**) del perímetro; C) no partir dígitos de modo ambiguo (separaciones > ~4.0 in / 10.16 cm pueden ser ambiguas); D) no sustituir numerales por logos o íconos. Se puede repartir el número en secciones distintas. Uso excesivo de material en el número invita escrutinio. | "2283" en blanco, 3.75 in de alto mínimo, en 3+ puntos del perímetro. Si hay esquina muy aguda, el número no debe envolverla. |

---

## 8.5 Motors & Actuators

### R501 - Motores y actuadores permitidos (Tabla 8-1, "en cualquier cantidad")

| Motor | Números de parte (según Tabla 8-1) |
|---|---|
| AndyMark 9015 | am-0912 |
| AndyMark NeveRest | am-3104 |
| AndyMark PG | am-2161 (alt. am-2765); am-2194 (alt. am-2766) |
| AndyMark RedLine | am-3775; am-3775a |
| AndyMark Snow Blower | am-2235; am-2235a |
| Banebots | am-3830; M5-RS550-12; M7-RS775-18; RS550VC-7527; RS775WC-8514; RS550 |
| CIM | FR801-001; PM25R-45F-1004; M4-R0062-12; PM25R-45F-1003; AM802-001A; PMR25R-45F-1003; 217-2000; PMR25R-44F-1005; PM25R-44F-1005; am-0255 |
| CTR Electronics Minion | 24-777378; WCP-1691 |
| CTR Electronics/VEX Falcon 500 | 217-6515; 19-708850; am-6515; am-6515_Short |
| Motores automotrices KOP actuales/anteriores | Denso AE235100-0160; Denso 262100-3040; Denso 5-163800-RC1; Bosch 6 004 RA3 194-06; Denso 262100-3030; Johnson Electric JE-PLG-149; Johnson Electric JE-PLG-410 |
| Playing with Fusion Venom | BDC-10001 |
| REV HD Hex | REV-41-1291 |
| REV NEO Brushless | REV-21-1650 (v1.0 o v1.1); REV-21-1653; am-4258; am-4258a |
| REV NEO 550 | REV-21-1651; am-4259 |
| REV NEO Vortex | REV-21-1652; am-5275 |
| Thrifty Bot Pulsar 775 | TTB-0350 |
| VEX BAG | 217-3351 |
| VEX Mini-CIM | 217-3371 |
| WCP Kraken x44 | WCP-0941 |
| WCP Kraken x60 | WCP-0940; am-5274 |
| WCP RS775 Pro | 217-4347 |

**Otros actuadores permitidos (mismo renglón de R501):**
- Ventiladores **<= 120 mm** (nominal) y **<= 10 W** continuos a 12 VDC.
- Motores de disco duro de un dispositivo de cómputo COTS legal; motores de vibración/autofocus de fábrica de dispositivos COTS (p. ej. vibrador de celular).
- Servos PWM COTS rotativos con corriente de atascamiento **<= 4 A** y potencia mecánica **<= 8 W a 6 V**; servos lineales PWM con corriente de atascamiento **<= 1 A a 6 V**.
- Motores integrales a un sensor COTS (LIDAR, sonar...), sin modificarlo salvo para montarlo.
- **1 compresor** conforme a R806.
- **Motores de escobillas (brushed) COTS, actuadores lineales, solenoides eléctricos o electroimanes** de **12 V** conectados a un dispositivo regulador aprobado **aguas abajo de un breaker de 20 A o menos**. Solenoides/electroimanes usados a 24 V deben estar clasificados para 24 V.

**Notas del manual:** el roboRIO entrega máx. **2.2 A en el riel de 6 V** (12.4 W): suma el consumo de tus servos. Potencia mecánica de servo = 0.25 x (torque de atascamiento en N-m) x (velocidad en vacío en rad/s). Muchos motores a la vez pueden hundir el voltaje de la batería y disparar el breaker principal o el brownout del roboRIO. Los gearmotors AndyMark PG etiquetados am-3651 a am-3656 contienen motores legales y pueden usarse con o sin su caja.

### Reglas R501-R506

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R501 | Solo los motores/actuadores listados arriba (cantidad libre). | Es lista cerrada: motor no listado = ilegal. |
| R502 | Máximo **4 motores de propulsión** (los que permiten mover el robot sobre la alfombra). No cuentan: A) motores que solo alinean una rueda (steering de swerve); B) motores de ruedas de mecanismo que apenas rozan la alfombra; C) motores que cambian la velocidad con un shifter sin aportar propulsión significativa; **D) motores que mueven al robot por contacto con superficies no alfombradas de elementos del campo**. | Swerve: 4 de tracción + 4 de steering es legal (steering no cuenta). Cuidado con ruedas de mecanismo que empujen. |
| R503 | No modificar el sistema mecánico/eléctrico integral de motores, servos y solenoides, **salvo:** A) soportes y/o eje/interfaz de salida; B) recortar cables y añadir conectores/empalmes; C) quitar los pasadores de seguro de motores de ventana (262100-3030 y -3040); D) carcasas de conectores de motores KOP automotrices; E) servos según el fabricante; F) etiquetado mínimo; G) **quitar cualquier cantidad de tornillos #10-32 de plug del Falcon 500 y Kraken X60**; H) aislante en terminales; I) reparaciones sin cambiar desempeño; J) mantenimiento recomendado por el fabricante. Intención: modificar orejas de montaje, no aligerar comprometiendo la estructura. | Puedes maquinar la interfaz de salida y las orejas de montaje; no abras ni recortes el cuerpo del motor. |
| R504 | Todo actuador (salvo servos, ventiladores y motores integrados a sensores/cómputo COTS) se controla con un dispositivo regulador aprobado: **A) Controladores de motor:** Koors40 (am-5600); Spark Flex (REV-11-2159, am-5276); Spark (REV-11-1200, am-4260); Spark MAX (REV-11-2158, am-4261); Talon FX (217-6515, 19-708850, am-6515, am-6515_Short, WCP-0940, WCP-0941; solo para Falcon 500 / Kraken X60 / X44 integrados); Talon FXS (24-708883, WCP-1692); Talon (CTRE_Talon, CTRE_Talon_SR, am-2195); Talon SRX (217-8080, am-2854, 14-838288); Thrifty Nova (TTB-0100); Venom (BDC-10001, solo su motor integrado); Victor SP (217-9090, am-2855, 14-868380); Victor SPX (217-9191, 17-868388, am-3748). **B) Relés:** Spike H-Bridge (217-0220, SPIKE-RELAY-H); Automation Direct (AD-SSR6M12-DC-200D, AD-SSRM6M25-DC-200D, AD-SSR6M40-DC-200D; son unidireccionales y no se pueden combinar para control bidireccional); canal conmutado del PDH (REV-11-1850) solo para CUSTOM CIRCUITS que no sean actuadores. **C) Neumática:** Pneumatics Control Module (am-2858, 217-4243); Pneumatic Hub (REV-11-1852). **D) Servos:** Servo Hub (REV-11-1855). | Elige controlador acorde al motor (Spark MAX/Flex para NEO/Vortex, Talon FX/FXS para Kraken/Falcon/Minion, etc.). Los controladores no listados no son legales. |
| R505 | Cada dispositivo regulador controla las cargas de la Tabla 8-2; salvo nota, **1 y solo 1 carga eléctrica** por dispositivo. | Un controlador por motor (con las excepciones de la tabla). |
| R506 | Los servos se conectan **solo** a: A) puertos PWM del roboRIO; B) puertos PWM de WCP Spartan Sensor Board (WCP-0045); C) REV Servo Power Module (REV-11-1144); o D) REV Servo Hub (REV-11-1855). | Servos solo por esas vías. |

### R505 - Tabla 8-2: asignación de cargas a dispositivos reguladores

| Carga eléctrica | Controlador de motor | Módulo de relé | Controlador neumático |
|---|---|---|---|
| AndyMark RedLine, Banebots, CIM, CTR Minion, REV NEO Brushless, REV NEO 550, REV NEO Vortex, ThriftyBot Pulsar 775, VEX Mini-CIM, WCP RS775 Pro | Sí | No | No |
| AndyMark 9015, VEXpro BAG | Sí (hasta 2 por controlador) | No | No |
| AndyMark PG, motores automotrices KOP, NeveRest, Snow Blower, REV HD Hex (*) | Sí (hasta 2 por controlador) | Sí | No |
| Otro motor brushed, actuador lineal | Sí (breaker 20 A máx.) | Sí (breaker 20 A máx.) | No |
| Falcon 500, Playing With Fusion Venom, WCP Kraken X44, WCP Kraken X60 | Sí (solo controlador integrado) | No | No |
| Compresor | No | Sí | Sí |
| Válvulas solenoides neumáticas | No | Sí (varias) | Sí (1 por canal) |
| Solenoides eléctricos | Sí (varios) | Sí (varios) | Sí (1 por canal) |
| CUSTOM CIRCUITS | Sí (varios) | Sí (varios) | Sí (varios) |

(*) El texto extraído muestra a REV HD Hex justo antes de "Otro motor brushed" y es ambiguo en la agrupación de celdas; en 2025 el HD Hex estaba en el grupo "hasta 2 por controlador / relé sí". Verifica la tabla en el PDF oficial.

---

## 8.6 Power Distribution

Las reglas de esta sección aplican **todo el tiempo en el evento**, no solo durante partidos.

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R601 | Única fuente de energía: **1 sola batería SLA** (plomo-ácido sellada, no derramable) con: 12 V nominal; capacidad a 20 h **17 Ah mín. - 18.2 Ah máx.**; forma rectangular; dimensiones nominales **7.1 x 3.0 x 6.6 in, +/-0.1 in** cada una (18.03 x 7.62 x 16.76 cm, +/-0.25 cm); peso **11.0 a 14.5 lb (4.99 a 6.57 kg)**; terminales de tuerca y perno; **los respiraderos no deben obstruirse durante la carga** (basta no sellar ni cubrir directamente los lados cortos del rectángulo de venteo). Ejemplos: Enersys NP18-12/NP18-12B/NP18-12BFR, MK ES17-12, Battery Mart SLA-12V18, Sigma SP12-18, Universal UB12180, Power Patrol SLA1116, Werker WKA12-18NB, Power Sonic PS-12180NB, Yuasa NP18-12B, Panasonic LC-RD-1217, Interstate BSL1116, Duracell DURA12-18NB. | Diseña el compartimiento para 7.1 x 3.0 x 6.6 in (+/-0.1) con espacio para el conector y sujeción (R606). |
| R602 | Otras baterías solo para cámaras/cómputo: power banks USB COTS **<= 100 Wh (27000 mAh a 3.7 V)** con salida **5 V/5 A máx.** o **12 V/5 A máx. con USB-PD** por puerto; baterías integradas a dispositivo COTS de cómputo o cámara autocontenida; baterías de CMOS/RTC. Deben estar bien sujetas, con cables COTS sin modificar y cargadas según el fabricante. | Mini-PC/cámara con power bank: asegúralo con soporte. |
| R603 | Todo cargador de batería debe tener el conector Anderson SB correspondiente instalado. | Sin cocodrilos. |
| R604 | El cargador no puede exceder **6 A de corriente promedio de carga**. | Cargador limitado a 6 A. |
| R605 | No se permiten más baterías que las de R601/R602 en el robot (ni de lastre), estén o no en uso. | No uses baterías extra como peso. |
| R606 | La batería debe estar sujeta para que no se salga con interacción violenta, **ni volteado o en cualquier orientación**. | Retén positivo (correa + tope), no solo velcro. |
| R607 | Cada terminal de la batería, del breaker principal y sus conexiones (lugs, puntas de cable) deben estar **totalmente aisladas en todo momento**. | Cubre lugs con termocontraíble o tapas. |
| R608 | Energía no eléctrica almacenada al inicio del partido solo de: A) aire comprimido cargado conforme a R806/R807; B) cambio de altura del centro de gravedad; C) deformación de piezas (resortes, bandas); D) amortiguadores de gas COTS de lazo cerrado; E) llantas neumáticas (con aire). | Resortes y gas shocks son legales; nada de combustión ni otras fuentes. |
| R609 | Estos elementos se conectan con **cobre 6 AWG (7 SWG o 16 mm2) o mayor** (cobre revestido de aluminio cuenta como cobre): A) 1 batería; B) 1 par de conectores Anderson **SB de 2 polos**; C) **1 breaker principal de 120 A** de montaje en superficie (Cooper Bussman CB185-120, CB185F-120, CB285-120, CB285F-120, CB285120F u Optifuse 153120, 253120); D) 1 dispositivo de distribución (PD): CTR PDP (am-2856, 217-4244, 14-806880), CTR PDP 2.0 (24-806880, WCP-1690), REV PDH (REV-11-1850) o AndyMark Power Distribution AMPD (am-5754). **Sin dispositivos o modificaciones adicionales**, salvo: monitoreo (R625), adaptadores SB-50 a SB-120 presentados a inspección y terminación de cables con lugs adecuados. Las baterías de FIRST traen conector rojo/rosa SB50 que no debe retirarse. | Ruta de potencia principal en 6 AWG. Sin interruptores ni sensores intercalados salvo los permitidos. |
| R610 | Todos los circuitos (excepto los de R615 y R617) se conectan **solo** a un par de conectores protegido del PD, y no se alimentan de otra fuente. **Los circuitos no deben conectarse a la entrada principal de potencia del PD.** | Toda carga cuelga de un canal con breaker/fusible. |
| R611 | El **frame no es un cable**: todo cableado y dispositivo eléctrico debe estar aislado eléctricamente del frame. Se comprueba con **> 120 ohm** entre el poste (+) o (-) del conector APP del PD y cualquier punto del robot. Los controladores con carcasa metálica legales están aislados y pueden montarse al frame. Cámaras, luces y sensores (algunos encoders, sensores IR) pueden tener carcasa conectada a tierra o plástico conductor: aíslalos. | Revisa con multímetro; usa arandelas/espaciadores aislantes en sensores y cámaras. |
| R612 | El **breaker de 120 A** debe ser rápida y seguramente accesible desde el exterior del robot (no cubierto por panel o puerta, ni sobre/bajo/junto a componentes móviles). Es el único de 120 A permitido. Se recomienda etiquetarlo claramente y protegerlo de golpes accidentales por game pieces. | Colócalo en un costado accesible, con guarda. |
| R613 | El PD, el cableado asociado y todos los breakers deben ser **visibles para inspección** (no necesariamente en STARTING CONFIGURATION, pero sí poder mostrarlos). | Panel de electrónica con acceso/tapas removibles. |
| R614 | Cualquier elemento eléctrico activo que no sea actuador (R501) o parte del sistema de control (R710) es un **CUSTOM CIRCUIT**: no puede producir voltajes **> 24 V**, salvo inyectores PoE COTS con cables y receptores COTS. | Voltajes elevados (boost) prohibidos. |
| R615 | La entrada de energía del **roboRIO** va directo a un par de terminales de salida protegido y **no conmutado** del PD con **fusible o breaker de 10 A**. Nada más en ese circuito. | Canal dedicado de 10 A solo para el roboRIO. |
| R616 | Alimentación del **radio**: **A) VH-109:** desde el PD por una o ambas vías: (a) inyectada al puerto "RIO" del radio con un inyector pasivo o cable Ethernet modificado conectado directo al PD, y/o (b) cableada directo a la entrada de 12 V del radio desde el PD. **B) OM5P (solo eventos en China):** desde la salida 12 V/2 A de un VRM (am-2857, 217-4245) como única carga de esos terminales, o con cable Ethernet entre REV Radio Power Module (REV-11-1856) y el puerto "18-24v PoE". No se pueden usar inyectores PoE activos (sí conductores pasivos). | Para el VH-109: PoE pasivo o 12 V directo desde el PD, sin VRM/RPM. |
| R617 | El dispositivo que alimenta al radio (R616) va conectado directo a un par de terminales de salida protegido y **no conmutado** del PD con fusible/breaker de **10 A**; excepción: pares VRM/PCM compartidos de un PDP 1.0, que pueden llevar **20 A**. Nada más en ese circuito (salvo un PCM en los puertos compartidos de un PDP 1.0). | Canal dedicado de 10 A para el radio. |
| R618 | **Solo 1 cable por terminal** del PD. Para distribuir a varios módulos (varios PCM/VRM desde un circuito de 20 A) empalma los cables entrantes en un solo cable principal (bloque de terminales aislado, empalme crimpado o soldado) y mete ese único cable al terminal. | Usa bloques de empalme/WAGO para derivar. |
| R619 | Breakers permitidos en el PD: A) Snap Action VB3-A o AT2-A, terminal F57, **<= 40 A**; B) Snap Action MX5-A o MX5-L, **<= 40 A**; C) REV ATO autorreset, **<= 40 A**; D) CTR ATO autorreset, **<= 40 A**; E) cualquier breaker ATM de valor <= a los fusibles permitidos en R620. | Máx. 40 A por circuito. |
| R620 | Fusibles permitidos en el PD (blade automotriz): A) en el PDP, ATM con valor igual al impreso en su portafusible; B) en **todos** los PD, ATC/ATO de **10 A o menos**; C) en el PDH, ATM de **15 A o menos**, salvo **un fusible de 20 A** para alimentar un PCM o PH. Los fusibles deben presionarse muy firme: un mal asiento reinicia el dispositivo al recibir un golpe. | Presiona fusibles a fondo; revisa tras golpes. |
| R621 | Cada circuito derivado se protege con **1 y solo 1 breaker/fusible** del PD según la Tabla 8-3. Sin otra carga en ese breaker, salvo dispositivos aguas abajo de una **placa adaptadora de potencia de motor** permitida entre el PD y el controlador (WCP-1380, WCP-1903, WCP-1904, RF-4003, RF-4004, RF-4005). | Las placas adaptadoras Powerpole permiten derivar. |
| R622 | Todo circuito con **cable de cobre aislado de calibre adecuado** (cables de nivel de señal no tienen que ser de cobre; cobre revestido de aluminio cuenta como cobre). Ver Tabla 8-4. Los cables recomendados por el fabricante u originales de dispositivos legales son parte del dispositivo y quedan exentos si están protegidos por el menor fusible/breaker que permita operarlos. Usa cable con calibre impreso o prepárate a demostrarlo. | Cumple la Tabla 8-4 al elegir cable y crimpar. |
| R623 | Los circuitos pueden incluir elementos intermedios (conectores COTS, empalmes, contactos deslizantes/rodantes COTS, slip rings COTS) si **todo el camino eléctrico** usa elementos de calibre/clasificación adecuados. Slip rings con mercurio prohibidos (R203). | Conectores Powerpole/Anderson con calibre correcto. |
| R624 | Todo cableado de **no señal** con polaridad constante (no salidas de relés, controladores o sensores) debe ser del color fabricado a lo largo de todo el cable: **positivo (+): rojo, amarillo, blanco, café o negro con raya**; **negativo/común (-): negro o azul**. Excepciones: cables originales de dispositivos legales y extensiones del mismo color; cable Ethernet de PoE. | Compra cable rojo/negro (no pintes ni uses cinta de color). |
| R625 | Los CUSTOM CIRCUITS **no pueden alterar directamente** las rutas de potencia entre batería, PD, controladores, relés, motores/actuadores, válvulas neumáticas u otros elementos de R710. Se permite monitoreo de voltaje (alta impedancia) o de corriente (baja impedancia) si el efecto es inconsecuente. Filtros de ruido permitidos (totalmente aislados): capacitor **<= 1 uF** no polarizado en los cables de cualquier motor (lo más cerca posible del motor), o resistencia como carga en derivación para la señal PWM de un servo. | Nada de interruptores o reguladores propios en la ruta de potencia. |
| R626 | La salida PoE del **VH-109** solo puede usarse si: A) el dispositivo es COTS (o adaptador COTS a un solo dispositivo COTS) con consumo **<= 2 A a 12 V**; B) cable Cat5e/6/7/8 estándar; C) el VH-109 se alimenta por los terminales de 12 V con cable **18 AWG o mayor** (puede además usar PoE de entrada). | Pasar la señal a una cámara/switch desde el radio. |

### R621 - Tabla 8-3: protección de circuitos derivados

| Circuito derivado | Valor máx. del breaker/fusible | Cantidad por breaker |
|---|---|---|
| Controlador de motor | hasta 40 A | 1 |
| CUSTOM CIRCUIT | hasta 40 A | sin límite |
| Relé Automation Direct 40 A (*6M40*) | hasta 40 A | 1 |
| Ventiladores permitidos por R501 y que no sean parte de dispositivos COTS de cómputo | hasta 20 A | sin límite |
| Módulo Spike | hasta 20 A | 1 |
| Relé Automation Direct 25 A (*6M25*) | hasta 20 A | 1 |
| PCM/PH con compresor | hasta 20 A | 1 |
| Servo Power Module / Servo Hub | hasta 20 A | 1 |
| VRM adicional (no radio) / PCM/PH adicional (sin compresor) | hasta 20 A | 3 en total |
| Relé Automation Direct 12 A (*6M12*) | hasta 10 A | 1 |

Notas: la regla no prohíbe breakers menores en el PD ni fusibles/breakers dentro de CUSTOM CIRCUITS; los ventiladores de R501 pueden ir en CUSTOM CIRCUITS.

### R622 - Tabla 8-4: calibre mínimo de cable por protección

| Aplicación | Calibre mínimo |
|---|---|
| Circuito con breaker de **31-40 A** | **12 AWG** (13 SWG o 4 mm2) |
| Circuito con breaker de **21-30 A** | **14 AWG** (16 SWG o 2.5 mm2) |
| Breaker de **6-20 A**; fusible de **11-20 A**; entre terminales dedicadas del PDP y VRM/RPM o PCM/PH; salidas del compresor desde el PCM/PH | **18 AWG** (19 SWG o 1 mm2) |
| Circuito protegido tras placa adaptadora de potencia de motor; breaker **<= 5 A**; fusible **<= 10 A** | **22 AWG** (22 SWG o 0.5 mm2) |
| Circuitos de 2 A del VRM; fusible **<= 2 A** | **24 AWG** (24 SWG o 0.25 mm2) |
| Paso por el VH-109 (R626) | Cat5e/6/7/8, **2 pares** en total (1 par V+, 1 par tierra) |
| Salidas PWM del roboRIO; fusible **<= 1 A** | **26 AWG** (27 SWG o 0.14 mm2) o Cat5e/6/7/8 de **un par** |
| Circuitos de **nivel de señal** (<= 1 A continuo y fuente incapaz de dar > 1 A: salidas no PWM del roboRIO, CAN, salidas de solenoide del PCM/PH, salidas de 500 mA del VRM, salidas del RPM, salidas de Arduino) | **28 AWG** (29 SWG o 0.08 mm2) |

Nota de ambigüedad: la Tabla 8-4 de 2025 tenía filas para "PDH a PCM/PH", "PDP/PDP2.0/PDH a roboRIO" y "PDH a VRM/RPM" (18 AWG); en el texto extraído de 2026 **no aparecen** esas filas. La alimentación del roboRIO (fusible de 10 A, R615) caería por tabla en "fusible <= 10 A = 22 AWG", pero es una **inferencia**, no una frase explícita del manual. **[Buena práctica]**: seguir cableando el roboRIO y las líneas principales con 18 AWG o más hasta confirmar con el inspector.

---

## 8.7 Control, Command & Signals System

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R701 | El robot se controla con **1 roboRIO o roboRIO 2.0** (am3000 o am3000a), imagen **2026_v1.2 o posterior**. No se prohíben coprocesadores si los comandos de habilitar/deshabilitar todos los dispositivos reguladores salen del roboRIO (incl. controladores CAN). | Coprocesador (Raspberry Pi, Limelight...) legal si el roboRIO manda las habilitaciones. |
| R702 | Único dispositivo de comunicación en partido: **1 radio Vivid Hosting VH-109 (VH-109, WCP-1538)** configurado con la llave de tu equipo en cada evento. Eventos en **China**: OpenMesh OM5P-AN u OM5P-AC. | Montaje del radio (R708). |
| R703 | Puerto Ethernet del roboRIO: **A) VH-109 v1.5:** al puerto "RIO", directo, por pigtail Cat5 o con inyector/adaptador PoE pasivo. **B) VH-109 v1.0:** (a) al puerto "RIO" vía inyector/adaptador PoE pasivo (se use o no para alimentar) o cable Ethernet con los hilos adecuados quitados en el lado roboRIO, todo aislado; o (b) a "AUX 1" o "AUX 2" con el DIP switch en off (default). **C) OM5P (China):** al puerto "18-24v PoE" (directo, por switch, RPM o pigtail). Un switch entre roboRIO y radio puede dificultar el diagnóstico; el personal puede pedir conexión directa. Si no usas el puerto "RIO" del VH-109 v1.0, se recomienda cubrirlo. | Mantén la ruta roboRIO-radio simple y directa. |
| R704 | Comunicación robot-OPERATOR CONSOLE limitada a los puertos de la Tabla 8-5 y a **7.0 Mbit/s (VH-109)** o **4.0 Mbit/s (OpenMesh)**; el radio hace cumplir el límite. | Cuida el ancho de banda del video (cámaras): ver FMS Whitepaper. |
| R705 | roboRIO, Driver Station Software y radio configurados con el **número de equipo correcto**. | Configura antes del evento. |
| R706 | Todas las señales vienen del OPERATOR CONSOLE y llegan al robot por la red Ethernet del ARENA. | Sin radios o controles propios. |
| R707 | Único wireless permitido hacia/desde/dentro del robot: A) lo requerido por R702/R706; B) tags de localización del evento; C) RFID/NFC usados solo dentro del robot. Cámaras y sensores no-RF sin comandos humanos (beam break, IR) no cuentan como wireless. | Sin Bluetooth ni Wi-Fi propios en el robot. |
| R708 | El radio debe montarse con las luces de diagnóstico **visibles para el personal del campo**. Se recomienda alejarlo de motores, PCM/PH y VRM/RPM. | Posición visible y lejos de ruido. |
| R709 | Usar **1 o 2 RSL** (Robot Signal Light, P/N 855PB-B12ME522 y/o am-3583): visible estando a **36.0 in (91.44 cm)** de al menos un lado, conectada a los terminales "RSL" del roboRIO y, si es la 855PB-B12ME522, cableada para luz fija con un jumper entre "La" y "Lb". | RSL arriba y visible desde al menos un lado. |
| R710 | **No modificar** Driver Station Software, roboRIO, PD, PCM/PH, VRM/RPM, RSL, breaker de 120 A, controladores de motor, dispositivos MXP que controlen actuadores (R713-C), relés (R504-B), radio, breakers y fusibles del PD, Servo Power Module, Servo Hub, placas adaptadoras de motor y baterías (taladrar, cortar, maquinar, recablear, desarmar, pintar...). **Excepciones:** A) código de usuario del roboRIO; B) calibrar controladores según su manual; C) ventiladores en controladores/alimentados de sus terminales; D) cambiar el fusible de un Spike que alimenta el compresor por un breaker VB3A-20A; E) conectar por los puntos estándar; F) fasteners/adhesivos para fijar el dispositivo o asegurar cables; G) pasta térmica; H) etiquetado; I) cambiar jumpers de su posición; J) quitar jumpers de límite de un Jaguar y poner un circuito de límite propio; K) firmware del fabricante; L) cortar/pelar/conectorizar cables integrales de controladores; M) reparaciones con desempeño idéntico (bajo tu riesgo; se pierde la garantía); N) quitar la tapa del puerto de datos de Talon SRX/FX; O) cinta eléctrica sobre la placa de aluminio del radio; P) omitir la tapa de terminales de entrada del PDP; Q) cambiar la SD del roboRIO 2.0 por una de cualquier capacidad; R) aislante en conductores expuestos; S) cambiar bloques de terminales de potencia (p. ej. el conector del RSL) por equivalentes funcionales; T) cinta para protección contra residuos; U) actualizar VH-109 v1.0 a v1.5 con materiales e instrucciones del fabricante. | No taladres carcasas de controladores ni PDH. Aprovecha las excepciones (F, H, R, T). |
| R711 | Ni 12 VDC ni salidas de relés o controladores se conectan directo al roboRIO, salvo la entrada designada de 12 VDC. | Cuida el cableado de potencia vs. señal. |
| R712 | Todo relé, servo, Servo Power Module y controlador PWM va al puerto correspondiente del roboRIO (relés a Relay, servos y PWM a PWM), directo, por WCP Spartan Sensor Board o por conexión MXP legal (R713); no se controlan con señales de otra fuente. | Controladores PWM solo desde el roboRIO. |
| R713 | Si un motor se controla por el **MXP**, su dispositivo regulador se conecta: A) directo a pines PWM; B) por una red de conductores PASIVOS que extiendan los pines PWM; o C) vía **1 dispositivo ACTIVO aprobado:** Kauai Labs navX MXP, navX2 MXP, RCAL MXP Daughterboard, REV RIOduino, REV Digit Board, WCP Spartan Sensor Board o Huskie Robotics HUSKIE 2.0 Board. Conectar un sensor activo a un pin MXP no impide usar otros pines según B. | Rara vez relevante con CAN, pero respeta la lista. |
| R714 | Cada controlador de motor CAN se controla con habilitar/deshabilitar originado en el roboRIO, por **PWM (R713) o CAN** (directo o en cadena), **nunca ambos a la vez** en el mismo dispositivo. Con el CAN bien cableado (heartbeat del roboRIO) se pueden usar todas las funciones de lazo cerrado del controlador. Estrella o hub solo con conductores PASIVOS. | PID en el controlador (Spark/Talon) es legal. |
| R715 | PCM, PH y Servo Hub se controlan desde el roboRIO por **CAN** (directo o en cadena desde el CAN integrado del roboRIO). | PCM/PH al bus CAN del roboRIO. |
| R716 | Ningún dispositivo que interfiera, altere o bloquee la comunicación CAN entre roboRIO, PCM/PH y/o controladores CAN. **Solo 1 cable por terminal** del conector Weidmuller de CAN. | No metas dos cables en un terminal CAN. |
| R717 | Se pueden añadir buses CAN con el **CTR CANivore** (21-678682, WCP-1522) USB-a-CAN; el bus adicional cumple R714. | Útil para muchos Krakens/Falcons. |

### R704 - Tabla 8-5: puertos de red abiertos (FMS)

| Puerto | Designación | Bidireccional |
|---|---|---|
| UDP/TCP 1180-1190 | Datos de cámara del roboRIO al dashboard (cámara por USB) | Sí |
| TCP 1735 | SmartDashboard | Sí |
| UDP 1130 | Datos de control Dashboard-a-robot | Sí |
| UDP 1140 | Datos de estado robot-a-Dashboard | Sí |
| HTTP 80 | Cámara conectada por switch en el robot | Sí |
| HTTP 443 | Cámara conectada por switch en el robot | Sí |
| UDP/TCP 554 | Real-Time Streaming Protocol (h.264) | Sí |
| UDP/TCP 1250 | Servidor de diagnóstico CTRE | Sí |
| UDP/TCP 5800-5810 | Uso del equipo | Sí |

Los puertos pueden usarse a gusto si no se emplean como se describe (p. ej. TCP 1180 para datos entre robot y Driver Station si no usas cámara USB).

---

## 8.8 Pneumatic System

Aplica **todo el tiempo en el evento**. Si no usas neumática, no hay requisitos de esta sección.

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R801 | No se usan piezas neumáticas distintas a las explícitamente permitidas en 8.8. | Lista cerrada. |
| R802 | Todo elemento neumático debe ser **COTS** y: A) estar clasificado por su fabricante para **>= 125.0 psi (861.8 kPa, 8.618 Bar)**; o B) estar **aguas abajo del regulador primario** con relevado (R809) y clasificado para **>= 70.0 psi (482.6 kPa, 4.826 Bar)**. Cualquier presión especificada ("working", "operating", "maximum") sirve. Recomendado: >= 60.0 psi (413.7 kPa) de trabajo. | Verifica la hoja de datos de cilindros y fittings. |
| R803 | Componentes neumáticos en su estado original. **Excepciones:** A) cortar tubería; B) modificar cableado para interfaz con el control; C) ensamblar con roscas, soportes, quick-connects existentes; D) quitar el pasador de montaje de un cilindro sin modificarlo; E) etiquetas. No pintar, limar, maquinar ni lijar piezas neumáticas. | No taladres ni lijes cilindros ni tanques. |
| R804 | Únicos elementos neumáticos permitidos: A) válvulas de venteo (vent plug) equivalentes a las del KOP (p. ej. Parker PV609-2, MV709-2); B) válvulas de alivio equivalentes a las del KOP (Norgren 16-004-011, 16-004-003, McMaster-Carr 48435K714), ajustables/preajustadas a **125.0 psi** y con capacidad de aliviar **>= 1.0 scfm (471.9 cm3/s)**; C) válvulas solenoides con puerto de máx. **1/8 in** NPT/BSPP/BSPT o conexión rápida integrada para tubo de **1/4 in** de diámetro exterior; D) tubería adicional de máx. **1/4 in** de diámetro exterior; E) transductores y manómetros de presión, válvulas de aguja (control de flujo pasivo), manifolds y fittings (incl. U-tubes COTS); F) válvulas check y de escape rápido, si se cumple R813; G) válvulas de corte que liberan la presión aguas abajo a la atmósfera al cerrar (3 vías); H) reguladores con salida máxima ajustada **<= 60.0 psi**; I) cilindros, actuadores lineales y rotativos neumáticos; J) tanques de almacenamiento (excepto los tanques blancos Clippard AVT-PP-41); K) **1 compresor** conforme a R806; L) filtros de residuos o coalescentes; M) válvulas Venturi (el lado de alta presión es neumático; el lado de vacío está exento). **No cuentan como neumática** (pero cumplen las demás reglas): dispositivos que crean vacío, gas shocks COTS de lazo cerrado, llantas neumáticas, y dispositivos neumáticos que no contienen aire presurizado. | Para garra de vacío con Venturi, sigue las reglas del lado de alta presión. |
| R805 | Si hay neumática, son **obligatorios**: A) 1 compresor legal (R806); B) válvula de alivio conectada y calibrada (R804-B, R811); C) interruptor de presión Nason **SM-2B-115R/443** y/o sensor analógico REV **REV-11-1107** (R812); D) al menos 1 vent plug (R813); E) manómetros de presión almacenada y de trabajo (R810); F) 1 regulador primario de presión de trabajo (R808). | Circuito base: compresor, alivio, switch, vent plug, 2 manómetros, regulador. |
| R806 | Todo el aire comprimido viene de **1 compresor a bordo**, con flujo nominal **<= 1.1 cfm (519.1 cm3/s) a 12 VDC a cualquier presión**. Puede sustituirse el compresor, pero solo uno designado a la vez. Viair serie C (máx. 120 psi) cumple. | Un compresor; cámbialo en vez de añadir otro. |
| R807 | Presión almacenada **<= 120.0 psi (~827 kPa, 8.2 Bar)**. Nada de presión almacenada fuera del robot. | No pre-cargues tanques externos. |
| R808 | Presión de trabajo **<= 60.0 psi (413.7 kPa, 4.137 Bar)**, a través de un único **regulador primario** ajustable con relevado (Norgren R07-100-RNEA, Monnier 101-3002-1). Reguladores adicionales solo aguas abajo. | Un regulador primario a 60 psi o menos. |
| R809 | Aguas arriba del regulador (alta presión) solo: compresor, alivio, interruptor de presión, vent plug, manómetro, tanques, tubería, transductores, filtros y fittings. Se recomienda clasificar todo ese lado a **>= 115.0 psi (792.9 kPa)**. | No pongas solenoides ni cilindros en alta presión. |
| R810 | Manómetros en lugares **fácilmente visibles** antes y después del regulador (almacenada y de trabajo), en psi, kPa o Bar. | Ubica los manómetros visibles al abrir el robot. |
| R811 | La válvula de alivio va directo al compresor o con fittings duros legales (latón, nylon). **Hay que revisar/ajustar para que libere a 125.0 psi (861.8 kPa, 8.618 Bar)**; puede venir sin calibrar. | Calibra con la guía del Pneumatics Manual. |
| R812 | El interruptor/sensor de presión se conecta en el **lado de alta presión**. **A) Nason SM-2B-115R/443:** sus 2 cables van directo a la entrada del PCM/PH que controla el compresor, o (con roboRIO y relé) al roboRIO, programado para evitar sobrepresión. **B) REV-11-1107:** salida analógica directo a la **entrada analógica 0 del PH** (firmware 22.0.2 o más nuevo); solo con control de compresor del PH (no con PCM). | Cableado según el tipo de switch. |
| R813 | Todo vent plug debe: A) al accionarse manualmente, venteando a la atmósfera, liberar toda la presión almacenada en tiempo razonable; B) estar **visible y de fácil acceso** en el robot. | Colócalo al exterior. |
| R814 | No se combina el aire de salida de varias válvulas solenoides. Manifolds, válvulas lanzadera y similares que no combinan flujos no violan la regla. | Cada solenoide alimenta su propio actuador. |

---

## 8.9 OPERATOR CONSOLE (extra)

Tu lista no pedía esta subsección, pero forma parte de las reglas R de la sección 8 y se incluye completa.

| Regla | Qué exige | Impacto en diseño |
|---|---|---|
| R901 | El Driver Station Software de National Instruments es la única aplicación que fija el modo (AUTO/TELEOP) y el estado (Enable/Disable); debe ser versión **26.0 o más nueva**. Se puede usar laptop o tableta. | Actualiza el DS al inicio de temporada. |
| R902 | La OPERATOR CONSOLE debe incluir una **pantalla** con la información de diagnóstico del DS, visible en inspección y partido. | Monta la pantalla visible. |
| R903 | El equipo con el DS se conecta al FMS **solo** por el cable Ethernet del DRIVER STATION (no por switch), directo, con pigtail o convertidor de un puerto. El puerto debe ser de fácil y rápido acceso. Se recomienda pigtail con alivio de tensión. | Pigtail Ethernet fijo. |
| R904 | La OPERATOR CONSOLE: no más de **60.0 in (1.524 m)** de largo; no más de **16.0 in (40.64 cm)** de profundidad (sin contar lo que los drivers sostienen o visten); no más de **78.0 in (1.981 m)** sobre el piso; sin fijarse al ARENA salvo con la cinta loop (sec. 5.9.1) o **sujetando con clamp al estante** de soporte del DRIVER STATION sin dañarlo. La cinta "loop" es de 54.0 in (1.372 m) x 2.0 in (5.08 cm). Sin límite duro de peso, pero **> 30 lb (13.61 kg)** invita escrutinio. | Diseña la consola portátil dentro de 60 x 16 in. |
| R905 | Aparte del sistema del campo, no hay otro wireless en la OPERATOR CONSOLE (sin tarjetas de red activas ni Bluetooth; un sensor de movimiento tipo Kinect sí). | Controles con cable (USB). |
| R906 | Consola sin materiales peligrosos, ni inseguras, ni que interfieran con otros equipos o robots. | |
| R907 | La consola **no puede contener inversores AC**. | |

---

## Cambios 2025 → 2026 (contexto; lo que 2026 ya no prohíbe es legal)

Comparación del texto de la sección 8: 2025 = versión V11 (REEFSCAPE); 2026 = versión TU22 (REBUILT). **Solo cuenta lo que dice 2026.**

### Reglas nuevas o que 2026 agregó
- **R106** (extensión en una sola dirección a la vez), **R107** (altura total <= 30 in), **R108** (extensiones no pueden levantar bumpers fuera de la BUMPER ZONE).
- **R203-M**: luces que parpadean más de ~5 veces por segundo (E108).
- **R401**: ahora se permite **un solo hueco mayor a 1.25 in** si quedan >= 5.0 in de bumper a cada lado de cada esquina (en 2025 solo se permitían huecos < 1.25 in).
- **R409**: los bumpers no pueden tener elementos móviles **ni eléctricos** (2025 R409 solo decía "no articulados").
- **R412**: número del equipo en **>= 3 lugares ~90 grados**, visible hasta 720 in (2025: "desde cualquier punto de vista", ~60 ft = 720 in).
- **R502-D**: motores que mueven al robot por contacto con superficies no alfombradas del campo no son de propulsión.
- **R501**: nuevo motor **Thrifty Bot Pulsar 775 (TTB-0350)**, número **REV-21-1653** del NEO, y se agrega "**COTS brushed motors**" de 12 V tras breaker de 20 A o menos (2025 solo mencionaba actuadores lineales, solenoides y electroimanes).
- **R601-G**: respiraderos de la batería sin obstruir durante la carga.
- **R609-D**: PD permitidos ahora incluyen **AndyMark AMPD (am-5754)** y PDP 2.0 **WCP-1690**.
- **R619-D**: breakers ATO autorreset de **CTR** (hasta 40 A).
- **R621**: placas adaptadoras de potencia de motor permitidas: WCP-1380, **WCP-1903, WCP-1904, RF-4003, RF-4004, RF-4005** (2025: solo WCP-1380 y RF-4003, "Kraken X60 Powerpole adapter").
- **R710-U**: VH-109 v1.0 puede actualizarse a v1.5; **R703** reorganizada por versión de radio.
- **R904-D**: la consola puede **sujetarse con clamp** al estante del DRIVER STATION (2025: solo la cinta loop).
- **R202** y **R402-B**: notas aclaratorias nuevas (acrílico que se rompe; backing puede tener "cualquier otro fin").

### Reglas que 2026 endureció
- **R104**: perímetro máx. **110 in** (2025: 120 in) y altura inicial **30 in** (2025 R104: 3 ft 6 in = 42 in).
- **R105**: extensión horizontal **12 in** (2025: 1 ft 6 in = 18 in).
- **R203-K**: materiales peligrosos como **plomo, encapsulado o no, prohibidos** (2025 R203-K permitía plomo pintado/encapsulado/sellado si no se maquinaba en el evento).
- **R203-D**: láseres solo Clase 1 / Exempt (2025: "láseres expuestos que no sean Clase I").
- **R205**: ahora cubre líquidos, geles, grasas y partículas finas (2025: solo lubricantes).
- **R402-A-i**: pool noodles **sólidos** (2025: huecos o sólidos).
- **R616**: el VH-109 ya **no** puede alimentarse desde VRM/RPM (2025 R616 lo permitía como transición y anunciaba el cambio); ahora debe ir desde el PD (inyector pasivo al puerto "RIO" o 12 V directo). VRM/RPM solo para OM5P (China).
- **R701**: roboRIO con imagen **2026_v1.2** (2025: 2025_v2.0); **R901**: DS **26.0** (2025: 25.0).
- **R702**: excepción de radio OpenMesh solo en **China** (2025: China y Taipéi Chino).

### Reglas que 2026 relajó o aclaró
- **R103-B**: 2025 excluía de peso la batería y su mitad Anderson con "no más de 12 in (~30 cm) de cable por pierna"; el texto 2026 **ya no menciona ese límite de 12 in**.
- **R404**: 2026 aclara que **no hay límite** de cuánto pueden entrar las partes duras dentro del perímetro.
- **R405**: ahora aplica "mientras navega el campo normalmente"; volcarse sin querer no viola. (2025 medía "como si el robot estuviera sobre piso plano"; en 2026 esa lógica pasó a R108 y a la nota de R107.)
- **R610**: texto genérico "par de conectores protegido del PD" (2025: conector WAGO "no los tornillos M6"); se agrega que los circuitos no se conectan a la entrada principal del PD.
- **R615/R617/R620**: redactadas de forma genérica para "PD"; fusibles ATC/ATO de **10 A o menos** valen para **todos los PD** (2025: solo PDP 2.0).
- **R406**: 2026 solo conserva el ejemplo del inglete (miter) como relleno inválido; el ejemplo de 2025 "espuma doblada alrededor de una esquina aguda (< 135 grados) es comprimida" **ya no aparece**. Ambigüedad: R406 sigue exigiendo padding **sin comprimir** y sin huecos; consulta con el inspector si usarás espuma doblada.

### Reglas, elementos y permisos que 2026 quitó
- **R304** (no trabajar en el robot fuera del horario de pits durante un evento): **no aparece en la sección 8.3 de 2026**. Según la política, no se aplica. El texto extraído solo cubre la sección 8: no pude verificar reglas de evento (sección E o G) fuera de este archivo.
- **R203-L** (prohibición de sellador de llantas): **ya no existe en 2026**; por política, no se aplica.
- **Nidec Dynamo BLDC** (R501, R503-F, R504-A-d, R505, R712): **ya no está en las listas 2026**; como R501 es lista cerrada, **no es legal en 2026**.
- **Controladores de motor ya no listados** (R504-A 2026): DMC 60/60c, Jaguar, SD540, Victor 884, Victor 888. **No son legales en 2026** (R504 es lista cerrada). Nota: R710-J todavía menciona los jumpers de límite del Jaguar, aparentemente un residuo del texto.
- **R716**: la frase sobre el bus CAN ya no menciona al "PDP/PDH" (2026: "roboRIO y los PCM/PH y/o controladores CAN").
- **R622 Tabla 8-4**: sin las filas 2025 "PDH a PCM/PH", "PDP/PDP2.0/PDH a roboRIO" y "PDH a VRM/RPM" (ver nota de ambigüedad en 8.6).
- **Sin cambios de fondo** (mismos valores): R101 (0.25 in), R103 (115 lb), R201, R204, R206, R301 ($600), R302-R303 (salvo nombre del juego), R402 (2.25 in / 4.5 in), R403 (4 in), R404 (1.25 in / 2 in), R405 (2.5-5.75 in), R406 (2.25 in), R407, R408 (135 lb), R410, R411, R501 (cantidades), R502 (4 propulsión), R601-R608, R609 (6 AWG, 120 A), R611-R614, R618, R621-R622 (calibres), R624-R626, R704 (7/4 Mbit/s), R705-R708, R709 (RSL a 36 in / 3 ft), R711, R713-R715, R717, R801-R814 (presiones: 125/120/60 psi, 1.1 cfm), R902-R903, R905-R907.

---

## Errores comunes

- Calcular el perímetro **con bumpers**: R104 (110 in) mide el frame sin bumpers; los bumpers van aparte (R403, hasta 4 in).
- Olvidar que el robot debe ser <= 30 in de **alto total** también extendido (R107), no solo plegado.
- Usar pool noodles **huecos** (en 2026 deben ser sólidos, R402-A) o lastre de **plomo** (prohibido, R203-K).
- Poner luces, cables o sensores **dentro** del bumper (R409 lo prohíbe en 2026).
- Cable con calibre menor al de la Tabla 8-4, o cables de color distinto a rojo/negro (R624).
- Cablear el radio VH-109 a un VRM/RPM (en 2026 va al PD, R616).
- Montar el breaker de 120 A detrás de un panel o junto a partes móviles (R612).
- Usar una pieza (motor, controlador) que **ya no está** en la lista 2026 (Nidec Dynamo, Victor 884/888, Jaguar, DMC 60, SD540).
- Dejar que un mecanismo salga por dos lados a la vez (R106) o más de 12 in (R105).

## Checklist antes de inspección

- [ ] Perímetro del frame <= 110 in y altura inicial <= 30 in (R104); nada sobresale del perímetro salvo bumpers y protrusiones <= 0.25 in (R101, R102).
- [ ] Extensión horizontal <= 12 in, en un solo lado a la vez (R105, R106); altura total <= 30 in (R107); sin levantar bumpers fuera de la zona (R108).
- [ ] Peso <= 115.0 lb sin bumpers ni batería (R103) y <= 135.0 lb con bumpers (R408).
- [ ] Bumpers: cobertura (R401), espuma >= 2.25 x 4.5 in con densidades correctas (R402), <= 4 in de extensión (R403), partes duras <= 1.25 in (R404), zona 2.5-5.75 in (R405), esquinas rellenas (R406), sin cuña (R407), sin elementos móviles ni eléctricos (R409), removibles (R410), cubiertas roja y azul (R411), número blanco en >= 3 lugares (R412).
- [ ] Motores y controladores en las listas 2026; máx. 4 motores de propulsión (R501, R502, R504).
- [ ] Batería 12 V SLA 17-18.2 Ah, sujeta y con bornes aislados; cargador con SB y <= 6 A (R601-R607).
- [ ] Breaker de 120 A accesible y etiquetado; cableado principal en 6 AWG (R609, R612).
- [ ] Un cable por terminal del PD; breakers/fusibles permitidos; roboRIO y radio en canales de 10 A (R615-R620).
- [ ] Calibres de cable por Tabla 8-4 y colores rojo/negro (R622, R624); frame aislado (> 120 ohm, R611).
- [ ] Radio visible, con RSL visible a 36 in; ningún wireless extra (R707-R709).
- [ ] Si hay neumática: alivio calibrado a 125 psi, almacenamiento <= 120 psi, trabajo <= 60 psi, manómetros y vent plug visibles (R805-R813).
- [ ] Dudas anotadas para el LRI (R406 con espuma doblada, tabla 8-2 de HD Hex, calibre del cable del roboRIO).

## Fuentes

- Manual del juego FRC 2026 (vigente), sección 8 (versión TU22): https://firstfrc.blob.core.windows.net/frc2026/Manual/2026GameManual.pdf
- Manual del juego FRC 2025 (solo contexto histórico, versión V11): https://firstfrc.blob.core.windows.net/frc2025/Manual/2025GameManual.pdf
- Ambos se leyeron a través de texto extraído de la sección 8 (no se abrió la web ni se revisaron las figuras). Las tablas 8-1 a 8-5 se transcribieron de ese texto. Las referencias a otras secciones (E108, G413, I101, I103, 5.9.1, etc.) no se verificaron en este archivo.
