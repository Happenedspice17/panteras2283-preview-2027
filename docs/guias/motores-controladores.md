# Motores, controladores y sensores

Guía para elegir motor, controlador, reducción y sensor de cada mecanismo del robot, y configurar límites de corriente y modo brake/coast.

> **Aviso (leer primero).** Las reglas marcadas **[FIRST]** (motores legales, límites de corriente de breakers, cantidad de motores, cableado) cambian cada año. Verifícalas en el manual del juego 2027 cuando salga el kickoff (9 de enero de 2027), sección *Robot Construction / Electrical* (reglas de "Motors" y "Power"), y en el *Blue Box* de las reglas. Esta guía no sustituye al manual. Los datos de motores son del fabricante a la fecha de escritura; algunos son preliminares y se marcan.

**Tipos de viñeta:** **[FIRST]** = requisito del manual · **[Fabricante]** = recomendación del fabricante · **[Buena práctica]** = práctica común de equipos FRC.

---

## 1. Resumen rápido

- **[Buena práctica]** Para casi todo lo nuevo: **Kraken X60** (potencia alta), **Kraken X44 / Minion** (mecanismos medianos) y **NEO / NEO Vortex / NEO 550** si el equipo ya tiene ecosistema REV (SPARK MAX/Flex).
- **[Fabricante]** El Kraken trae su controlador (Talon FX) integrado. El Minion se controla con **Talon FXS**. El NEO y NEO 550 van con **SPARK MAX** (o Flex); el NEO Vortex va con **SPARK Flex**.
- **Nunca** conectes un motor brushless a un controlador que solo maneja brushed ni al revés (ver sección 3).
- **[FIRST]** Solo se pueden usar motores de la lista del manual vigente. Confirma que cada motor y cada controlador siguen siendo legales para 2027 antes de comprarlos.

---

## 2. Tabla de motores

Valores a 12 V del fabricante (Kraken con conmutación trapezoidal salvo que se indique). **Free speed** = RPM sin carga. Usa estos números en ReCalc o en el simulador de WPILib.

| Motor | Tipo | Free speed (RPM) | Stall torque (N·m) | Stall current (A) | Peso | Controlador | Eje / interfaz |
|---|---|---|---|---|---|---|---|
| **Kraken X60** (WCP / CTRE) | Brushless, Talon FX integrado | 6,000 | 7.09 | 366 | ~1.2 lb (≈0.54 kg)* | Integrado (Talon FX) | SplineXS (no reemplazable) |
| Kraken X60 en modo FOC (requiere Phoenix Pro) | igual | 5,800 | 9.37 | 483 | igual | Integrado | SplineXS |
| **Kraken X44** (WCP / CTRE) | Brushless, Talon FX integrado | 7,758 | 4.11 | 279 | ~0.75 lb (≈0.34 kg)* | Integrado (Talon FX) | SplineXS (mismo boss y largo que X60) |
| Kraken X44 en modo FOC | igual | 7,368 | 5.01 | 329 | igual | Integrado | SplineXS |
| **Minion** (CTRE) | Brushless, **sin** controlador | ≈7,000 a 7,384 (preliminar, varía según la fuente) | 3.1 | **verificar en ficha CTRE** | 0.65 lb (≈0.29 kg) | **Talon FXS** | SplineXS; 1.5 in de diámetro x 2.85 in de largo |
| **NEO v1.1** (REV) | Brushless con hall sensors | 5,820 (5,676 en la ficha de producto) | 3.0 (2.6 en la ficha) | 160 (105 en la ficha) | 0.938 lb (0.425 kg) | SPARK MAX o SPARK Flex | Eje 8 mm con cuña (keyed), 35 mm de largo |
| **NEO Vortex** (REV) | Brushless, hall, eje pasante | 6,784 | 3.6 | 211 | 0.99 lb (447 g) | **SPARK Flex** (directo) o SPARK MAX con adaptador *Vortex Solo Adapter* | Hex 1/2 in pasante, cónico; acepta ejes especiales (8 mm keyed, spline tipo Falcon, MAXSwerve, MAXPlanetary) |
| **NEO 550** (REV) | Brushless, chico | 11,000 | 0.97 | 100 | 0.313 lb (0.142 kg) | SPARK MAX | Eje 0.125 in (3.175 mm) |
| **Falcon 500** (VEX/CTRE) **(estado: ver nota)** | Brushless, Talon FX integrado | 6,380 | 4.69 | 257 | ~1.1 lb* | Integrado (Talon FX) | Spline (Falcon) |
| **CIM** (legacy) | **Brushed** | 5,310 | 2.425 | 131 | ~2.8 lb* | Talon SRX / Victor SPX / SPARK MAX (modo brushed) | Eje 8 mm con cuña (keyed)... confirmar en ficha |
| **Mini CIM** (legacy) | Brushed | 5,840 | 1.41 | 89 | ~2.16 lb* | igual | confirmar en ficha |
| **BAG** (legacy) | Brushed | 13,180 | 0.43 | 53 | ~0.71 lb* | igual | confirmar en ficha |
| **775pro** (legacy) | Brushed | **no verificado** | no verificado | no verificado | no verificado | igual | no verificado |

\* Peso tomado de una wiki de equipo (FRC 3255), no del fabricante; úsalo como aproximación y pesa el motor real.

**Notas**

- **[FIRST]** La legalidad de cada motor (y el número máximo por mecanismo o por robot) se define en el manual 2027. No asumas que un motor legal en 2026 sigue legal.
- **Falcon 500:** no encontré un anuncio oficial de fin de vida; fuentes de equipos lo dan por descontinuado y la tienda de CTRE lo muestra sin existencias. Su legalidad en 2027 hay que confirmarla en el manual. Para diseño nuevo, elige Kraken.
- **Minion:** CTRE publica dos free speed distintos (7,000 en la tabla preliminar, 7,384 en la sección sin FOC). Revisa la ficha vigente. Stall current no lo pude verificar.
- **Kraken X44:** WCP publicó valores preliminares anteriores (7,530 RPM, 4.05 N·m, 275 A). Los de la tabla son los de la documentación actual de WCP. CTRE mantiene datos de dinamómetro actualizados en su *Motor Testing Lab*.
- **NEO v1.1:** la documentación de REV muestra dos juegos de datos (comparativa: 5,820 RPM / 3.0 N·m / 160 A; ficha de producto: 5,676 / 2.6 / 105). Para cálculos usa la comparativa más reciente y deja margen.
- **CIM, mini CIM, BAG:** valores de una wiki de equipo (FRC 3255); no los contrasté con la ficha de AndyMark/VEX. Confirma que la legalidad y la interfaz de eje.
- **Stall** (motor trabado) es un límite teórico: nunca diseñes para operar ahí. Sirve para dimensionar fusibles y límites de corriente.

---

## 3. Controladores

| Controlador | Para qué motores | Notas |
|---|---|---|
| **Talon FX (integrado)** | Kraken X60, Kraken X44, Falcon 500 | Controlador dentro del motor. CAN (y PWM con detección automática en Kraken). 1 kHz de PID en el motor. Voltaje de operación 6 a 24 V (ficha). FOC solo con licencia Phoenix Pro. |
| **Talon FXS** | **Minion** y "una amplia gama de motores brushed y brushless de terceros" (CTRE) | CAN FD, detección automática PWM/CAN, protección de polaridad inversa, soporte de hall avanzado con Phoenix Pro. Límites de corriente exactos: ver la guía del usuario de CTRE. |
| **SPARK MAX** (REV) | NEO, NEO 550, motores brushed 12 V y brushless con sensores | Tensión de operación 5.5 a 24 V (máx. absoluto 30 V). Corriente continua 60 A, pico 100 A por 2 s. |
| **SPARK Flex** (REV) | NEO Vortex (se acopla directo); NEO y otros con adaptador | CAN y PWM, USB-C. Brushed solo mediante adaptador. |
| **Victor SPX / Talon SRX** (CTRE, legacy) | Motores **brushed** (CIM, mini CIM, BAG, 775pro) | Solo para motores heredados. No sirven para brushless de FRC. |

### Brushed vs brushless (seguridad del equipo)

- **[Fabricante]** Un motor **brushless** tiene tres fases y necesita un controlador brushless configurado para ese motor. Un motor **brushed** tiene dos cables.
- **Nunca** conectes un brushless (NEO, Vortex, Minion, 550...) a un controlador brushed-only (Victor SPX, Talon SRX) ni configures un brushed como brushless. Se dañan el motor o el controlador.
- **[Fabricante]** En SPARK MAX/Flex el **tipo de motor** se configura en el controlador (NEO/NEO 550: *REV NEO Brushless* con sensor *Hall Effect*; brushed: *Brushed*). Verifica el LED y el tipo de motor antes de dar potencia.
- **[Buena práctica]** Prueba con el robot **sobre bloques (ruedas en el aire)** y con el área despejada la primera vez que energizas un motor nuevo. Mano lejos de mecanismos.
- **[FIRST]** Calibre de cable, breaker y fusible por motor/controlador: ver sección *Electrical* del manual vigente y *Wiring the FRC Control System* en docs.wpilib.org.

---

## 4. Qué motor por aplicación

Regla general **[Buena práctica]**: empieza por la carga (peso, fuerza, velocidad deseada) y calcula con ReCalc; el motor sale de ahí, no al revés.

| Mecanismo | Motor típico | Por qué / detalles |
|---|---|---|
| **Drivetrain tanque / West Coast** | 4 a 6 Kraken X60 (o NEO/Vortex), 2 o 3 por lado | Alta corriente sostenida; la reducción define la velocidad. |
| **Swerve, drive** | Kraken X60 o NEO Vortex / NEO | Los módulos comerciales ya definen la reducción (tabla abajo). |
| **Swerve, steer (azimut)** | Kraken X44, NEO 550 o Minion según el módulo | Requiere posición precisa y poco torque; los módulos actuales usan motores chicos. |
| **Elevador** | Kraken X60 o X44, NEO | Torque constante contra gravedad; reducción alta; límite de corriente conservador; **brake**. |
| **Brazo / pivote** | Kraken X60/X44, Minion, NEO | Encoder absoluto en el eje de salida; reducción alta (a menudo > 50:1), freno o resorte. |
| **Intake de rodillos** | NEO 550, Minion, Kraken X44 | Bajo torque, velocidad alta; reducción 2:1 a 5:1 típica. Límite de corriente por si se atora una pieza de juego. |
| **Shooter / flywheel** | Kraken X60, NEO Vortex, X44 | Velocidad alta, inercia grande; control de velocidad con feedforward + PID; modo **coast**. |
| **Climber** | Kraken X60/X44, NEO | Torque alto y baja velocidad; **brake** obligatorio en la práctica (sostener el peso). |
| **Torreta** | Minion, Kraken X44, NEO 550 | Posición precisa; encoder absoluto; el cableado no debe enredarse (límites de giro por software). |

> Los "típicos" son prácticas comunes, no reglas. Valida con ReCalc y con pruebas.

### Módulos swerve comerciales (relaciones y velocidades)

**[Fabricante]** Consulta la hoja del módulo para free speed exacta con tu motor y rueda.

| Módulo | Relaciones de drive | Paso (steer) | Notas |
|---|---|---|---|
| **SDS MK4i** | L1 8.14:1, L2 6.75:1, L3 6.12:1 | 150/7:1 (≈21.43:1) | L2 es la más usada en robots de peso completo; L3 más agresiva (robots ligeros). Un kit opcional de piñón de 16T sube la velocidad ≈14%. |
| **SDS MK5i** | Tres relaciones (R1, R2, R3) | verificar | No pude confirmar los valores; ver la hoja de SDS/AndyMark. |
| **WCP Swerve X2 / X2S** | Varias opciones (tablas de WCP) | verificar | Diseñado en torno a Kraken X60 (drive) y X44 (steer). |
| **REV MAXSwerve (3 in)** | Seleccionable por piñón (12T/13T/14T) y engranes; hay kit de actualización | NEO 550 + UltraPlanetary | Funciona con NEO (y Vortex con eje especial). Peso ≈ 3.8 lb con NEO. |
| **Thrifty Swerve** | verificar | verificar | Opción económica; no consulté su hoja. |

---

## 5. Elegir la relación de reducción

**Idea:** el motor gira rápido y con poco torque; la reducción cambia velocidad por torque.

1. **Define el objetivo**: velocidad lineal (drivetrain, elevador), tiempo de recorrido (elevador/brazo) o RPM final (shooter/rodillos).
2. **Calcula con ReCalc** (https://www.reca.lc): ingresa motor, cantidad, reducción, peso/carga y límite de corriente; obtienes velocidad, tiempo de recorrido y corriente.
3. **Revisa la corriente**: si el mecanismo se mueve con corriente cerca de stall, la reducción es muy baja o la carga muy alta.
4. **Regla práctica [Buena práctica]**: usa 70% a 85% de la free speed teórica como velocidad real; las pérdidas de eficiencia y la caída de voltaje la reducen.
5. **Compara velocidad y aceleración**: una reducción muy alta da torque pero tarda; muy baja patina las ruedas o no levanta la carga.
6. **Margen**: deja 20% a 30% de torque extra para fricción, desalineación y desgaste.

### Límites de corriente: supply vs stator

- **Stator current** = corriente que circula por el motor; proporcional al **torque**. **[Fabricante, CTRE]** Limítala para evitar patinaje de ruedas, daños en topes mecánicos y calentamiento.
- **Supply current** = corriente que sale de la **batería**. **[Fabricante, CTRE]** Limítala para evitar brownouts y disparo de breakers.
- **[Fabricante, CTRE]** Configura primero el stator; añade supply solo si hace falta (el stator ya suele evitar brownouts). Supply es más útil en mecanismos de alta inercia (flywheels) o para dejar corriente a otros sistemas.
- **Cómo hallar el valor [Fabricante]:** sobre alfombra y contra una pared, sube la salida despacio, grafica velocidad y corriente de stator en Tuner X, y fija el límite **por debajo** de donde empiezan a patinar las ruedas. No lo pongas tan bajo que se pierda aceleración.
- **Ejemplos de CTRE** (no universales): ~70 A de supply en drive swerve y ~30 A en un elevador.
- **SPARK MAX/Flex [Fabricante, REV]:** el *Smart Current Limit* por defecto es 80 A para cualquier motor; REV sugiere empezar con **40 a 60 A para NEO** y **20 a 40 A para NEO 550**. Un límite fuera de rango puede dañar el motor y no está cubierto por garantía. Guarda los parámetros en la memoria flash (*Persist Parameters*) para que sobrevivan a un reinicio.
- **Brownout:** el roboRIO deshabilita actuadores por debajo de ~6.3 V (roboRIO 1) o 6.75 V por defecto (roboRIO 2). Antes de apretar límites, revisa batería, conexiones y cableado.
- **[FIRST]** Los breakers del PDP/PDH y sus amperajes por circuito están definidos en el manual vigente. Los límites por software **no sustituyen** al breaker correcto.

### Modo brake vs coast

| Modo | Efecto | Úsalo en |
|---|---|---|
| **Brake** | El motor se frena al estar en 0% (cortocircuita fases); resiste moverse | Elevador, brazo, climber, torreta |
| **Coast** | El motor gira libre | Shooter/flywheel, rodillos, a veces el drive |

- **[Buena práctica]** Brake no es un freno de sostén: bajo carga grande el mecanismo puede ceder. Añade resorte, freno mecánico o control de posición.
- **[Buena práctica]** Un drive en brake frena más rápido pero aumenta el riesgo de volcar con CG alto; muchos equipos usan coast al conducir y brake en modo disabled/autónomo, o lo ajustan por piloto.
- **[Buena práctica]** Los modos neutros tienen efecto con el robot habilitado; con el robot deshabilitado no confíes en que el motor sostenga nada.

---

## 6. Reductores, cadenas y bandas

### Reductores (gearboxes)

| Reductor | Proveedor | Notas |
|---|---|---|
| **MAXPlanetary** | REV | Etapas de 3:1, 4:1, 5:1 apilables; entrada para NEO/Vortex. |
| **UltraPlanetary** | REV | Cartuchos 3:1/4:1/5:1; usado en el azimut del MAXSwerve con NEO 550. |
| **VersaPlanetary** | VEX/AndyMark | Heredado; muchas opciones de relación. |
| **Reductores Kraken / WCP** | WCP | Engranajes para Kraken; eje SplineXS. Revisa su documentación para opciones de relación. |

- **[Buena práctica]** Verifica compatibilidad de la interfaz de eje (sección 7) antes de comprar la etapa.
- **[Buena práctica]** Lubrica según el fabricante y respeta el par máximo de salida de cada etapa.

### Cadenas vs bandas

| | Cadena #25 | Cadena #35 | Banda HTD 5 mm | Banda GT2 (3 mm) |
|---|---|---|---|---|
| Resistencia | Media | Alta | Media | Media-baja |
| Peso | Ligera | Más pesada | Muy ligera | Muy ligera |
| Ruido / mantenimiento | Lubricar | Lubricar | Sin lubricación, silenciosa | Sin lubricación, silenciosa |
| Tensión | Tensor o distancia fija | Igual | Distancia fija o tensor | Igual |
| Uso típico | Intakes, brazos, elevadores | Cargas altas (climber) | Intakes, transferencias, torreta | Mecanismos ligeros |

- **[Buena práctica]** **#25** para la mayoría de transmisiones de carga media; **#35** si #25 se rompe o estira por la carga; **banda** donde importe peso y ruido y la distancia entre ejes sea estable.
- **[Buena práctica]** Las bandas no toleran bien ejes que se flexionan o se alejan; la cadena perdona más. Ambos necesitan tensión correcta.
- **[Buena práctica]** Calcula la **distancia entre ejes** para que el número de eslabones/dientes sea entero. Usa herramientas de calculadora de cadena/banda de ReCalc o del proveedor.
- **Seguridad:** cadenas y bandas pueden atrapar dedos; usa guardas y manos fuera del mecanismo al energizar.

---

## 7. Ejes y rodamientos

| Eje | Uso común | Nota |
|---|---|---|
| **Hex 1/2 in** | Estándar FRC (REV, AndyMark, VEX, WCP) | Buen torque; fácil de maquinar; huecos hex en engranes y poleas. |
| **Rounded hex 1/2 in** | Variante con esquinas redondeadas | Se desliza mejor en rodamientos; revisa compatibilidad con tus engranes. |
| **Hex 3/8 in** | Mecanismos ligeros | Menos torque y rigidez. |
| **MAXSpline (REV)** | Sistema REV | Interfaz propia de REV; verifica piezas compatibles. |
| **SplineXS (CTRE/WCP)** | Salida de Kraken X60/X44 y Minion | Bajo juego; no reemplazable en el motor. |
| **Eje 8 mm con cuña (keyed)** | NEO v1.1 | Usa cuña/pinion según el motor. |

- **[Buena práctica]** Rodamientos en **cada soporte** del eje; no dejes un eje largo apoyado solo en un lado (voladizo) si lleva carga alta.
- **[Buena práctica]** Para cargas radiales y axiales altas usa rodamientos de bolas con brida o placa de montaje que los retenga; no dependas de que un eje "se sostenga" por el motor.
- **[Buena práctica]** Mide holguras y alineación: dos soportes desalineados atoran el mecanismo y suben la corriente.
- **[Buena práctica]** Los ejes hex se cortan con herramientas de taller (sierra, torno); es trabajo con **adulto/mentor presente** y protección ocular.

---

## 8. Sensores

### Encoders

| Sensor | Tipo | Notas |
|---|---|---|
| **Encoder interno del motor** (Kraken, NEO, Vortex) | **Relativo** (cuenta desde el encendido) | Útil para velocidad y posición relativa; pierde la referencia al apagar. |
| **CANcoder** (CTRE) | **Absoluto**, CAN | Típico para el ángulo de módulos swerve; memoriza el offset. |
| **REV Through Bore Encoder** | Absoluto y relativo | Se monta en eje hex; lo lee un SPARK o el roboRIO. Verifica la interfaz exacta en la ficha de REV. |

- **Absoluto vs relativo:** un **relativo** solo cuenta pulsos desde que enciende, por lo que debe "homearse" (por ejemplo, contra un tope) al inicio. Un **absoluto** conoce la posición del eje al encender (necesario en pivotes y módulos swerve). Muchos equipos usan los dos: absoluto para inicializar y relativo para el lazo rápido.
- **[Buena práctica]** Pon el encoder absoluto lo más cerca posible del **eje de salida** del mecanismo, no del motor, para que mida el mecanismo real.
- **[Buena práctica]** Define **límites de software** (soft limits) y de recorrido para evitar golpear los topes; si el mecanismo tiene límite físico, respáldalo con un sensor.

### Giroscopios (IMU)

- **Pigeon 2.0** (CTRE, CAN) y **navX** (Studica) miden la orientación del robot, para swerve orientado al campo y autónomo. Móntalos **rígidos y planos**, lejos de fuentes de vibración fuerte. Revisa la documentación del fabricante para ejes y calibración.

### Sensores de pieza de juego

- **Beam break / sensor de distancia:** detectan una pieza de juego en el intake o shooter. Un beam break es simple y confiable; los de distancia son sensibles a luz y reflexión. **[Buena práctica]** Pruébalos con la iluminación del evento.
- **Switches de límite:** para homing y topes. Cablea en normalmente cerrado cuando la seguridad dependa de ellos (si se rompe el cable, el sistema se detiene).

### Cámaras

- **Limelight** y **PhotonVision** (con cámaras compatibles) rastrean AprilTags y objetos para apuntar y localizar el robot. **[Buena práctica]** Monta la cámara rígida, con vista despejada, y calibra. La posición de la cámara respecto al robot debe medirse con cuidado (se alimenta al estimador de pose).

---

## 9. Control (nivel conceptual)

No es una guía de programación; esto ayuda a que diseño y software hablen el mismo idioma.

- **PID:** corrige el error entre meta y medición. P = proporcional al error, I = acumulado (úsalo poco), D = tasa de cambio. Un buen mecanismo mecánico necesita menos PID.
- **Feedforward:** estima el voltaje necesario según el modelo (gravedad, fricción, velocidad). Mejora mucho el seguimiento y reduce el trabajo del PID. Elevadores y brazos usan feedforward de gravedad.
- **Perfiles de movimiento:** limitan velocidad y aceleración para moverse suave. En CTRE: **Motion Magic**; en REV: **MAXMotion**. Ambos corren en el controlador del motor.
- **Diseño que ayuda al control:** poco juego (backlash), fricción baja y consistente, sensor bien colocado, reducción adecuada.

Enlaces (WPILib): 
- Introducción a controles avanzados: https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/index.html (cubre PID, feedforward de motor DC, elevador con perfiles de movimiento, flywheel, torreta y brazo).
- Sensores en WPILib: https://docs.wpilib.org/en/stable/docs/software/hardware-apis/sensors/index.html

---

## 10. Errores comunes

1. Elegir el motor por moda y no por cálculo (sin pasar por ReCalc).
2. Diseñar con la **free speed** como si fuera la velocidad real del mecanismo.
3. Dejar el límite de corriente por defecto (80 A en SPARK) en mecanismos que no lo resisten.
4. Conectar un motor brushless a un controlador brushed (o configurar mal el tipo de motor).
5. No dejar acceso al conector, a la cuña o al tornillo del motor al armar.
6. Encoder absoluto en el motor en lugar de en el eje de salida.
7. Usar brake en un mecanismo con peso y creer que "sostiene" para siempre.
8. Cadena o banda sin tensión o sin la distancia entre ejes calculada.
9. Eje largo sin soporte de rodamiento en ambos lados.
10. No verificar la legalidad de motores/controladores en el manual del año.
11. No guardar la configuración del controlador (parámetros sin persistir).
12. Ruedas patinando porque no se limitó el stator del drive.

---

## 11. Checklist de selección

**Antes de cotizar o diseñar**
- [ ] Confirmé en el manual 2027 que el motor y el controlador son legales y cuántos puedo usar.
- [ ] Definí velocidad, carga y tiempo de recorrido del mecanismo.
- [ ] Corrí ReCalc con motor, reducción, carga y límite de corriente; la corriente está lejos de stall.
- [ ] Hay un controlador compatible con el motor (brushed/brushless correcto).
- [ ] Revisé la interfaz de eje (hex, spline, keyed) y que el reductor la acepta.

**Antes de fabricar**
- [ ] Rodamientos en cada soporte; ejes alineados.
- [ ] Cadena/banda con distancia entre ejes y tensión definidas.
- [ ] Acceso a conectores, tornillos del motor y botón/LED del controlador.
- [ ] Sensor/encoder en el eje de salida; ruta de cable sin tensión.
- [ ] Brake/coast y topes (físicos y de software) definidos para cada mecanismo.

**Antes de inspección / energizar**
- [ ] Tipo de motor y límites de corriente configurados y guardados en cada controlador.
- [ ] Robot sobre bloques en la primera prueba, con área despejada.
- [ ] Cableado, breakers y conexiones revisados contra el manual vigente.
- [ ] Un adulto/mentor supervisó la primera energización.

---

## Fuentes

- Kraken X60 y X44 (rendimiento y datos), documentación de WCP: https://docs.wcproducts.com/welcome/llms-full.txt
- Kraken X60 en la tienda de CTRE: https://store.ctr-electronics.com/products/kraken-x60
- Kraken X44 en la tienda de CTRE: https://store.ctr-electronics.com/products/kraken-x44
- Minion en la tienda de CTRE: https://store.ctr-electronics.com/products/minion-brushless-motor
- Talon FXS en la tienda de CTRE: https://store.ctr-electronics.com/products/talon-fxs
- Límites de corriente (CTRE, Phoenix 6): https://v6.docs.ctr-electronics.com/en/stable/docs/hardware-reference/talonfx/improving-performance-with-current-limits.html
- NEO Vortex (REV): https://docs.revrobotics.com/brushless/neo/vortex
- NEO v1.1 (REV): https://docs.revrobotics.com/brushless/neo/v1.1
- NEO 550 (REV): https://docs.revrobotics.com/brushless/neo/550.md
- Comparación NEO / Vortex (REV): https://docs.revrobotics.com/brushless/neo/compare
- SPARK MAX especificaciones (REV): https://docs.revrobotics.com/brushless/spark-max/specs
- SPARK MAX descripción general (REV): https://docs.revrobotics.com/brushless/spark-max/overview
- SPARK Flex descripción general (REV): https://docs.revrobotics.com/brushless/spark-flex/overview
- SPARK MAX "Make it spin" (límite de corriente, tipo de motor): https://docs.revrobotics.com/brushless/spark-max/gs/make-it-spin
- MAXSwerve (REV): https://docs.revrobotics.com/ion-build-system/motion/maxswerve
- Relaciones SDS MK4/MK4i (AndyMark): https://andymark.com/products/sds-gear-ratio-kits
- SDS MK4i (SDS): https://www.swervedrivespecialties.com/products/mk4i-swerve-module
- Datos de CIM, mini CIM, BAG, Falcon y pesos (wiki de FRC 3255): https://frcteam3255.github.io/Wiki/Mechanical/Motor%20Specs
- Falcon 500 (Chief Delphi, 2023): https://www.chiefdelphi.com/t/2023-falcon-updates-and-availability/420604
- WPILib, controles avanzados: https://docs.wpilib.org/en/stable/docs/software/advanced-controls/introduction/index.html
- WPILib, sensores: https://docs.wpilib.org/en/stable/docs/software/hardware-apis/sensors/index.html
- ReCalc: https://www.reca.lc (referencia de uso, no abierta durante la investigación)
