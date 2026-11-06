# Electrónica y cableado FRC

Guía para diseñar, cablear y preparar para inspección la electrónica de un robot FRC del equipo Panteras 2283.

> **Aviso importante (2027).** Las reglas marcadas **[FIRST]** están tomadas de la **Lista de Inspección 2026** (Rev. 0) y de la documentación de WPILib. Cambian cada año. **Verifícalas contra el Manual del Juego 2027 al salir el kickoff (9 ene 2027)**, sobre todo la sección *Robot Construction / Electrical*. En 2027 el sistema de control cambia (ver "SystemCore"); lo que aquí aparece del roboRIO 2 puede dejar de ser legal o relevante.

**Tipos de regla usados:** **[FIRST]** = requisito del manual. **[Fabricante]** = recomendación de REV/CTR/WPILib. **[Buena práctica]** = práctica común de equipos.

**Seguridad primero.**
- Una batería FRC puede entregar cientos de amperes: un corto con una herramienta o con un cable pelado causa quemaduras, chispas y fuego. **Todo trabajo de cableado con batería conectada o de soldadura requiere supervisión de un mentor adulto.**
- Cableado normal: **batería desconectada** (SB50 separado) y breaker principal abierto.
- Usa lentes de seguridad al crimpar, cortar y soldar. La soldadura requiere ventilación y adulto presente.
- El robot se prueba **sobre bloques** (ruedas en el aire) la primera vez que se energiza.

---

## 1. Arquitectura del sistema de control (reglas 2026)

```
Batería 12V (SB50) ──► Main breaker 120A ──► PDH / PDP ──┬─► breakers 40A/30A/20A ──► controladores de motor ──► motores
                                                          ├─► fusible/breaker ──► roboRIO 2
                                                          ├─► fusible/breaker ──► radio VH-109 (y/o PoE)
                                                          ├─► RSL (Robot Signal Light)
                                                          └─► sensores / CANivore / Pigeon / luces (10A o menos)
roboRIO ◄─Ethernet─► Radio (puerto RIO) ◄─ WiFi ─► Driver Station
roboRIO ──CAN (amarillo/verde)──► dispositivo 1 ─► dispositivo 2 ─► ... ─► PDH/PDP (terminación)
```

| Componente | Qué hace | Notas |
|---|---|---|
| Batería | 12V, **17-18.2 Ah**, única, sujeta dentro del robot, ventilación libre **[FIRST]** (R601, R605, R606) | Todas sus conexiones aisladas siempre (R607) |
| Main breaker 120A | Un solo interruptor entre batería y PD, **rápido y seguro de accionar** **[FIRST]** (R612) | Sirve como "apagado de emergencia" |
| PD (PDH de REV o PDP de CTR) | Única, con breakers y cableado **fácilmente visibles** **[FIRST]** (R613) | El PDH tiene canales con breaker (ATO/Mini) y canales con fusible (20-22 sin switch) |
| roboRIO 2 | Computadora del robot | Alimentación **directa** de terminales del PD con **fusible/breaker de 10A** **[FIRST]** (R615) |
| Radio Vivid Hosting VH-109 (WCP-1538) | Único radio autorizado, con LEDs visibles al personal del campo **[FIRST]** (R702, R707, R708) | Ver sección de radio |
| RSL (luz de señal) | Máx. 2, visible a 36 in (91 cm) desde al menos un lado, conectada al puerto RSL del roboRIO **[FIRST]** (R709) | Si la frame la tapa, muévela a un lugar visible |

### Radio VH-109: alimentación y red
- **[FIRST]** Alimentación por inyección PoE en el puerto **RIO** del radio y/o directo al **conector de 12V** desde el PD (R616).
- **[FIRST]** El roboRIO se conecta al puerto **RIO** del radio (VH-109 v1.5, sticker holográfico azul). Con VH-109 v1.0: por inyector PoE, cable Ethernet modificado, o puerto **AUX** con el DIP switch apagado (R703).
- **[Fabricante]** WPILib recomienda alimentar el radio **por dos vías** (12V directo + PoE) para redundancia: si un cable se daña, el radio no se apaga.
- **[Fabricante]** El adaptador PoE de Vivid está cableado al revés que el de REV; **no sustituyas uno por otro** ni conectes el cable PoE pasivo de REV directo al roboRIO.
- **[Fabricante]** Usa ferrules en los cables rojo y negro del adaptador PoE en las terminales del PDH. Alimenta el radio desde un canal fusible no conmutable (20-22) con fusible de 10A.
- **[Buena práctica]** Montaje con aislamiento de vibración (espuma, soportes flexibles). Los LEDs del radio deben verse desde fuera del robot.
- Verifica en 2027 si el radio sigue siendo el VH-109 o cambia con el nuevo controlador.

### Nota sobre VRM y puertos de radio
El **VRM** (módulo de regulación de voltaje) del sistema anterior (roboRIO 1 + radio OM5P) ya no es parte del sistema vigente 2026: el radio VH-109 se alimenta con 12V directo o PoE. Si ves un VRM en robots viejos del taller, no lo copies sin confirmar su legalidad.

### SystemCore (sistema de control 2027)
- **Qué sabemos (fuentes WPILib):** WPILib describe el cambio del roboRIO a **Systemcore** como "la mayor actualización del sistema de control desde el cRIO". El hardware es el **Limelight Systemcore**, basado en Raspberry Pi Compute Module 5 (CM5), CPU ARM Cortex-A76 de 4 núcleos, con CAN, I2C, USB y Ethernet, E/S reconfigurable (PWM, DIO, analógica), pantalla, LEDs e IMU integrada. Soporta varios buses CAN.
- **WPILib 2027** deja de correr en el roboRIO; se eliminan relay, salida analógica y SPI; **Talon y VictorSP no serán legales en 2027**.
- **Alimentación (repositorio de pruebas de WPILib, alfa):** cable **18 AWG** con ferrules blancos Weidmuller; **no usar a la vez** las dos entradas de energía (Bridge y Weidmuller).
- **Lo que NO está confirmado:** fecha y forma exacta de distribución (un foro dice que habrá uno en el Kit of Parts, **sin confirmación oficial**), radio, fusible requerido, reglas de montaje y puertos. **Espera al Manual 2027 y a la documentación de WPILib 2027** antes de diseñar el panel definitivo.
- **[Buena práctica]** Diseña el panel dejando espacio extra para cambiar el controlador (aprox. 2 in de margen alrededor del roboRIO) y no pegues nada permanente que impida moverlo.

---

## 2. Calibres de cable mínimos

**[FIRST]** (R610, R621, R622): un solo breaker/fusible por circuito; el cable mínimo depende del breaker. Valores de la lista de inspección 2026:

| Circuito | Protección | Calibre mínimo | Fuente |
|---|---|---|---|
| Batería - main breaker - PD | Main breaker 120A | **6 AWG** (16 mm²) | Lista 2026 (R607, R609) |
| Motores de alta corriente | Breaker **40A** | **12 AWG** (4 mm²) | R621/R622 |
| Circuitos medios | Breaker **30A** | **14 AWG** (2.5 mm²) | R621/R622 |
| Circuitos de 20A | Breaker **20A** | **18 AWG** (1 mm²) | R621/R622 |
| Menos de 20A (fusible 10A, 5A, etc.) | Fusible/breaker pequeño | Según **Tabla 8-4** del manual | Verifica en el manual |
| CAN / señal | n/a | 22 AWG torcido (estándar WPILib) | [Fabricante] |

- **[Buena práctica]** Equipos usan **10 AWG** para motores de 40A para menos caída de voltaje y 4 AWG para la batería (legal ya que 6 AWG es el mínimo). Más grueso es siempre legal; más delgado nunca.
- **[Buena práctica]** Wiki de equipos (3255, basada en el manual 2026, **no verificada en el manual**): 18 AWG para roboRIO/radio, 22 AWG mínimo para 5A o fusible 10A de sensores pequeños. **Confirma Tabla 8-4.**
- **[FIRST]** Solo cobre o aluminio revestido de cobre (CCA); la señal queda excluida (R622).
- **[FIRST]** **Solo 1 cable por terminal WAGO.** Los empalmes o bloques de terminales pueden repartir potencia, pero todos los cables del empalme deben cumplir el calibre del breaker (R618).
- **[Buena práctica]** Si en un conector entran varios cables, súmalos: el calibre efectivo baja alrededor de 3 AWG por cada duplicación del área. Dos cables de 18 AWG equivalen aproximadamente a 15 AWG (wiki 3255).

## 3. Colores de cable

| Uso | Color | Tipo |
|---|---|---|
| Potencia positiva (+24, +12, +5 V) | **Rojo, amarillo, blanco, café, o negro con raya** | **[FIRST]** (R624) |
| Potencia común (negativo) | **Negro o azul** | **[FIRST]** (R624) |
| CAN High | **Amarillo** | [Fabricante] |
| CAN Low | **Verde** | [Fabricante] |
| Motor (controlador con cables blanco/verde) | rojo a blanco, negro a verde | [Fabricante] |
| PWM | negro hacia afuera del roboRIO | [Fabricante] |

- Se exceptúa el cable original del fabricante.
- **[Buena práctica]** Usa **rojo = +** y **negro = −** siempre; evita azul/amarillo en potencia para que nadie confunda CAN con potencia.
- **[Buena práctica]** Etiqueta ambos extremos con banderas (FROM / TO) y mantén una hoja de canales del PD.

---

## 4. Bus CAN

- **Topología:** cadena o **daisy chain**: roboRIO, luego cada dispositivo, y al final el PDH/PDP. **[Fabricante]** (WPILib). Sin estrellas ni ramas largas.
- **Terminación 120 Ω:** el roboRIO y el PDP/PDH ya traen terminadores. Deja los dispositivos **entre** roboRIO y PD. Si el PD queda a mitad del bus, apaga su terminación (switch TERM/jumper en OFF) y pon una resistencia de 120 Ω al final. **[Fabricante]**
- **Cable:** par torcido, **amarillo = CAN High**, **verde = CAN Low**. Si el cable es de 4 conductores, el blanco cuenta como amarillo (wiki 3255). **[Buena práctica]**
- **Cable de retención:** los cables preterminados (SPARK MAX) deben llevar su clip de retención; si no hay, cinta o zip tie. **[Fabricante]**
- **IDs:** cada dispositivo del mismo tipo necesita un **ID único** (por defecto es 0). Asigna por rangos y documéntalos. **[Buena práctica]**

| Rango sugerido de ID | Uso |
|---|---|
| 1-4 | Tracción (drive), orden fijo |
| 5-8 | Dirección (steer) swerve |
| 9-12 | CANcoders / encoders absolutos |
| 13+ | Mecanismos (intake, shooter, elevador...) |
| 20+ | Sensores (Pigeon, CANdle) |

- **Heartbeat:** el roboRIO manda un heartbeat cada 20 ms; si pasan 100 ms sin él, los dispositivos se deshabilitan (WPILib). Un bus CAN malo puede deshabilitar el robot.
- **CAN FD / CANivore:** el CANivore de CTR es un adaptador USB a **CAN FD** con terminación de 120 Ω seleccionable por software. Solo dispositivos compatibles con CAN FD (p. ej. Talon FX/Kraken) aprovechan CAN FD. Práctica común: dispositivos de la tracción y Pigeon en el bus CANivore, el resto en el bus del controlador. **[Fabricante / Buena práctica]**
- **SystemCore:** tendrá varios buses CAN integrados; verifica si el CANivore sigue siendo necesario o legal en 2027.
- **[Buena práctica]** Revisa la utilización del bus en el Driver Station y en Phoenix Tuner / REV Hardware Client; mucha utilización provoca lag y timeouts.

---

## 5. Conectores y herramientas

| Conector | Uso | Reglas y consejos |
|---|---|---|
| **Anderson SB50** | Batería - robot | Estándar del manual. Sujeta con clip o zip tie. Conecta la batería al lado del robot **al final** **[Fabricante]** |
| **Anderson Powerpole** | Cargadores, extensiones pequeñas | Crimpa con la herramienta correcta, no con pinzas |
| **WAGO 221** (palanca) | Motores y sensores | **1 cable por terminal** **[FIRST]** (R618). Pela ~11-12 mm (confirma en el empaque), **no estañes** el cable, levanta la palanca, inserta completo y verifica por la ventana |
| **WAGO del PDH/PDP** | Canales del PD | Acepta cable fino sin ferrule según el modelo; no estañar |
| **Weidmuller** (roboRIO, radio, SystemCore) | Alimentación de controladores | Acepta 16-24 AWG; pela ~8 mm (5/16"); usa **ferrule** |
| **Ferrules** | Cable multifilar en terminales de tornillo/resorte | Crimpado cuadrado; el hilo sobresale poco del ferrule |
| **Terminal de ojo (lug)** | Cable 6 AWG a main breaker/PD | Crimpadora de 6 AWG, tirón de prueba |

- **Crimpado correcto [Buena práctica]:** (1) pela la longitud exacta, (2) sin hilos sueltos ("whiskers"), (3) herramienta del tamaño correcto, (4) **tira del cable con la mano** para probar, (5) revisa visualmente. Un crimpado malo es la causa No. 1 de fallas intermitentes.
- **Soldadura [Buena práctica]:** solo con adulto y ventilación. Usa **termofil** (heat shrink con adhesivo) sobre toda la unión. No sueldes cables que van a recibir flexión repetida; los cables soldados se rompen justo donde acaba la soldadura. Nunca sueldes en un conector WAGO.
- **Herramientas mínimas:** pelacables de calibres, crimpadora de ferrules, crimpadora para lugs 6 AWG, crimpadora Anderson, pistola de calor, multímetro, probador de continuidad, etiquetadora.
- **[Fabricante]** Tapa con cinta o funda los dos terminales del main breaker y cualquier terminal expuesta del PDP.

---

## 6. Baterías

- **[FIRST]** Una sola batería 12V de **17-18.2 Ah**, sujeta dentro del robot con ventilación libre (R601, R605, R606) y con todas las conexiones aisladas (R607). Los modelos legales exactos se listan en el manual (SLA tipo MK ES17-12, Power Sonic PS-12180 y equivalentes); **verifica la lista vigente**.
- **Carga [Buena práctica]:** usa un cargador SLA inteligente de 12V; carga a corriente moderada; no cargues en superficies inflamables ni sin vigilancia; guarda cargada, no descargada a fondo.
- **Rotación [Fabricante]:** rota las baterías uniformemente para que se carguen, descansen y se desgasten igual. Etiqueta cada una con número y fecha (edad).
- **Prueba con analizador [Fabricante/Buena práctica]:** mide la **resistencia interna** con un analizador de baterías (p. ej. CBA o similar); predice mejor el rendimiento que el voltaje en vacío. Retira las que muestren resistencia alta.
- **Daños:** una batería **caída** se marca como mala hasta probarla; el daño en celdas puede no verse en el voltaje **[Fabricante]**. Hinchada, con fuga, caliente o con terminales dañadas: **sácala de uso y avisa al mentor**.
- **Manejo seguro:** nunca cargues la batería por sus cables (daña las conexiones internas). Aisla terminales al guardar. No hagas corto con herramientas. Lleva siempre lentes al manejarlas y no las expongas a calor.
- **Baterías extra [FIRST]:** solo USB ≤100 Wh para computadoras/cámaras COTS (R602).

---

## 7. Breakers y fusibles

- **[FIRST]** Solo se permiten los breakers listados: VB3-A, AT2-A, MX5-A o -L, REV ATO o CTR ATO (todos de 40A o menos) en las ranuras ATO/Maxi del PD; en ranuras ATM, fusibles/breakers hasta el valor permitido (R619).
- **[FIRST]** Fusibles ATC/ATO ≤10A; en PDH, fusibles ATM ≤15A y hasta uno de 20A para PCM/PH (R620).
- **[FIRST]** El PD, sus breakers y su cableado deben verse fácilmente para inspección (R613).
- **[Fabricante]** Asienta bien cada fusible: uno bien colocado es difícil de sacar con la mano.
- **[Buena práctica]** Usa breaker de 40A para motores grandes (Kraken/NEO/Falcon), 30A para NEO 550 o mecanismos medianos, y mantén los 20A y menos para actuadores pequeños. Un breaker que se dispara es información: revisa el mecanismo (atoramiento) antes de subir el calibre.

---

## 8. Aislamiento del chasis

- **[FIRST]** La frame debe estar **eléctricamente aislada**: **> 120 Ω** entre cualquier poste de batería del PD y el chasis (R611).
- **Prueba:** con el robot apagado, mide con multímetro en ohms entre el poste (+) y (−) del PD y un punto **sin pintura** de la frame. Ambos deben marcar abierto o > 120 Ω.
- **[Buena práctica]** Causas comunes de fuga: cable con aislamiento pelado contra una placa, tornillo largo de un motor, terminal de ojo rozando el aluminio, cinta aplastada. Revisa y reencamina.
- Nunca conectes el negativo de la batería a la frame (ni como "tierra").

---

## 9. Diseño de panel (recomendaciones)

El panel o "board" de electrónica se diseña en CAD desde el inicio, no se improvisa.

**Dimensiones [Buena práctica]:** referencia del kitbot: ~24 x 16 in (60 x 40 cm) en material de 1/4"-1/2" (6-12 mm). Ajusta a tu chasis.

**Reglas de colocación**
1. **Acceso:** main breaker accesible rápido y seguro (R612); en el borde del robot, nunca debajo de un mecanismo.
2. **Visibilidad:** PD y sus breakers visibles de frente (R613); LEDs de estado del radio y RSL visibles desde fuera (R708, R709).
3. **Orden de flujo:** batería, main breaker, PD, controladores, motores. Los cables de potencia cortos y rectos.
4. **PD cerca de los controladores:** hacia atrás del robot pero con espacio para cables al roboRIO **[Fabricante]**.
5. **Separa potencia de señal:** CAN y cables de sensor lejos de los cables de motor de 40A para evitar ruido.
6. **Controladores de motor cerca de sus motores** cuando sea posible (menos cable de 12 AWG largo, menos caída de voltaje).
7. **Alivio de tensión:** asegura el cable cerca de cada conector con slack, para que el conector no cargue tensión **[Fabricante]**. No amarres de más: complica el diagnóstico.
8. **Rutas de cable:** canaletas, ojales o cinta en bordes de aluminio; protege los cables que pasan por láminas **[Fabricante]**. Mantén holgura lejos de cadenas, bandas y mecanismos que giran o se extienden (dibuja la ruta en el CAD con el mecanismo en todas sus posiciones).
9. **Protección contra virutas:** limpia todo antes de energizar; cubre el panel (policarbonato) para evitar virutas metálicas y tornillos caídos sobre las terminales **[Buena práctica]**.
10. **Sujeción:** tornillería (tuerca y perno) o zip ties; Dual Lock solo no basta en choques **[Fabricante]**. Amortigua radio y coprocesadores con espuma/aisladores.
11. **Baterías:** a un costado, bajas, con correa, ventilación libre y cambio rápido (sin quitar mecanismos) **[FIRST]** R605/R606.
12. **Pre-cablea el panel fuera del robot**, es mucho más fácil que dentro **[Fabricante]**.
13. **Etiqueta** todo: canal del PD, ID CAN, FROM/TO **[Buena práctica]**.

---

## 10. Sensores comunes y cómo cablearlos

| Sensor | Conexión | Notas |
|---|---|---|
| **Encoder integrado del motor** (NEO, Kraken) | Cable del propio controlador/motor | Lo más simple; no lo cortes |
| **Encoder absoluto CAN** (CANcoder) | Cadena CAN + 12V de un canal pequeño del PD (10A) | Necesario para swerve; ID único |
| **Encoder absoluto PWM/DIO** (Through Bore) | Puerto DIO/Absolute del controlador o roboRIO | Cable corto, con strain relief |
| **Limit switch / sensor de haz** | DIO (señal + tierra) al controlador o roboRIO | Usa normalmente cerrado para detectar cable roto (falla segura) **[Buena práctica]** |
| **Gyro / IMU** (Pigeon 2.0, navX) | Pigeon 2.0 por CAN (22 AWG integrado) con su alimentación; navX por MXP/USB | Móntalo plano, rígido y en el centro del robot |
| **Cámaras / Limelight** | Ethernet CAT5e+ al puerto AUX del radio + alimentación (12V, breaker 20A) | Quita tensión del cable y amortigua |

- **[FIRST]** Los circuitos personalizados y sensores **no pueden alterar** la ruta de potencia batería-PD-controlador-motor (R625); no exceden 24V (R614).
- Con SystemCore (2027) cambian puertos y librerías (CANPort, SPI eliminado); no cablees sensores SPI hoy si piensas migrar.
- **[Buena práctica]** Alimentación de sensores con fusible de 10A; empalma varios sensores del mismo canal con WAGO 221 en Y.

---

## 11. Errores comunes (brownouts y desconexiones)

| Problema | Síntoma | Qué revisar |
|---|---|---|
| **Cables flojos** (batería, main breaker, PD, roboRIO) | Reinicios, apagones al chocar | Tirón de prueba; terminales de tornillo bien apretadas (no se giran a mano) |
| **Conector SB50 sin asegurar** | Robot muerto tras un golpe | Clip o zip tie al SB50 |
| **Radio**: Ethernet/PoE flojos, radio sin amortiguar | Desconexiones del Driver Station | Cable PoE bien asentado; alimentación redundante; revisa conectores RJ45 |
| **CAN roto o mal terminado** | Motores que se apagan, dispositivos "perdidos" | Continuidad amarillo/verde; terminación (120 Ω entre CAN-H y CAN-L ≈ 60 Ω medido en el bus) |
| **Batería débil o vieja** | Brownout en match | Analizador de resistencia interna; rota y retira |
| **Cables delgados o largos** en motores de 40A | Caída de voltaje, brownouts | Calibre correcto y rutas cortas |
| **Mala crimpa / cable con hilos sueltos** | Fallas intermitentes | Rehaz el crimp; tirón de prueba |
| **Cable atrapado en mecanismo** | Corto, cable cortado | Ruta con holgura; revisar a todo recorrido |
| **Breaker disparado por atoramiento** | Motor se detiene | Revisa mecanismo antes de cambiar el breaker |
| **Revisión solo antes del evento** | Aflojamientos acumulados | Revisión de conexiones tras los primeros partidos |

**Re-chequeos [Fabricante]:** terminales rotativos (batería, PD) cada 1-3 partidos; conexiones de resorte (WAGO/Weidmuller) cada evento. Revisa los logs del Driver Station tras cada partido (voltaje de batería, corriente).

---

## 12. Checklist antes de inspección

**Batería y potencia**
- [ ] Batería única 12V 17-18.2 Ah, sujeta, con ventilación libre, etiquetada, probada
- [ ] Todas las conexiones de batería aisladas; SB50 asegurado
- [ ] Main breaker 120A accesible y visible, con cable 6 AWG (o más grueso) a la PD
- [ ] Un solo PD; breakers y cableado visibles
- [ ] Breakers/fusibles de modelos permitidos y bien asentados

**Cableado**
- [ ] 40A con 12 AWG mínimo; 30A con 14 AWG; 20A con 18 AWG; menores según Tabla 8-4
- [ ] Colores: positivo rojo/amarillo/blanco/café/negro con raya; negativo negro o azul
- [ ] Un cable por WAGO; sin hilos sueltos; tirón de prueba hecho
- [ ] Cables protegidos en bordes, con alivio de tensión y lejos de piezas móviles
- [ ] Todo etiquetado y documentado

**Control y red**
- [ ] roboRIO (o controlador 2027) alimentado directo del PD con 10A
- [ ] Radio VH-109 con LEDs visibles, conectado a puerto RIO, programado para el evento
- [ ] RSL visible a 36 in y destellando junto con el roboRIO
- [ ] CAN en cadena, terminación correcta, IDs únicos y anotados

**Chasis**
- [ ] Prueba de aislamiento: > 120 Ω entre postes del PD y la frame
- [ ] Panel protegido contra virutas y bien sujeto
- [ ] Robot probado sobre bloques

**Verificación final**
- [ ] Revisamos las reglas contra el **Manual 2027**

---

## Fuentes
- Lista de inspección FRC 2026 Rev. 0: https://firstfrc.blob.core.windows.net/frc2026/Manual/2026FRCInspectionChecklist.pdf (calibres, colores, R6xx; abierto y leído)
- WPILib, Introduction to FRC Robot Wiring: https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-1/basic-robot-wiring.html
- WPILib, How to Wire (kitbot) / intro wiring: https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-1/intro-to-frc-robot-wiring.html
- WPILib, Wiring Best Practices: https://docs.wpilib.org/en/latest/docs/hardware/hardware-basics/wiring-best-practices.html
- WPILib, CAN Wiring Basics: https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/can-wiring-basics.html
- WPILib, CAN addressing: https://docs.wpilib.org/en/stable/docs/software/can-devices/can-addressing.html
- WPILib, New for 2027 (Systemcore): https://docs.wpilib.org/en/latest/docs/yearly-overview/yearly-changelog.html
- WPILib, Systemcore Introduction: https://docs.wpilib.org/en/latest/_sources/docs/software/systemcore-info/systemcore-introduction.rst.txt
- WPILib SystemcoreTesting (alfa): https://github.com/wpilibsuite/SystemcoreTesting
- CTR Electronics, CANivore Intro: https://v6.docs.ctr-electronics.com/en/stable/docs/canivore/canivore-intro.html
- Wiring Cheat Sheet, equipo 3255 (secundaria, no oficial): https://frcteam3255.github.io/Wiki/Electrical/Wiring%20Cheat%20Sheet
