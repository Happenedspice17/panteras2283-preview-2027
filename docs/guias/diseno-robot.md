# Reglas generales de diseño del robot

Guía de criterios de diseño para el robot de Panteras 2283: restricciones de FIRST, presupuestos, organización en Onshape y revisión de diseño.

> **Manual vigente: FRC 2026.** Las reglas [FIRST] citan el manual 2026; al salir el de 2027 (9 ene 2027) se actualizan y solo cuenta el vigente. Detalle completo en reglas-frc.md.

Leyenda: **[FIRST]** requisito del manual · **[Fabricante]** recomendación del fabricante · **[Buena práctica]** práctica común de equipos FRC.

---

## 1. Restricciones de FIRST que afectan el diseño

| Tema | Qué dice el manual 2026 | Tipo |
|---|---|---|
| **Frame perimeter** | El ROBOT PERIMETER debe ser fijo (sin elementos articulados) y quedar dentro de la BUMPER ZONE; protrusiones menores <= 0.25" (pernos, remaches, soldaduras) no cuentan. En configuración inicial el perímetro no puede exceder **110 in** (2.794 m) y nada puede sobresalir de su proyección vertical (salvo bumpers y protrusiones menores). | **[FIRST]** (R101, R102, R104 2026) |
| **Altura y extensión** | Altura máxima **30 in** (76.2 cm), tanto en configuración inicial como en total (R104, R107). Extensión horizontal máxima **12 in** más allá de la proyección del perímetro (R105), y solo hacia un lado a la vez (R106). Las extensiones no pueden levantar los bumpers fuera de la BUMPER ZONE al interactuar con alfombra, BUMPS o TOWER BASE (R108). | **[FIRST]** (R104, R105, R106, R107, R108 2026) |
| **Peso máximo** | Robot **<= 115.0 lb** (52.16 kg) sin bumpers ni batería (con su mitad del cable Anderson) (R103). Robot con bumpers (sin batería) **<= 135.0 lb** (61.23 kg) (R408). | **[FIRST]** (R103, R408 2026) |
| **Bumpers** | Cubren todo el perímetro (huecos < 1.25"; un hueco mayor permitido si quedan >= 5" protegidos a cada lado de cada esquina) (R401). Espuma >= 2.25" de profundidad y >= 4.5" de alto, backing >= 4.5", cubierta de tela y fijación rígida (no velcro, cinta ni cable ties) (R402). Extensión máx. **4.0"** del perímetro (R403); partes duras máx. **1.25"** y la espuma debe sobresalir >= 2.0" de ellas (R404). Deben llenar la BUMPER ZONE de **2.5" a 5.75"** del piso (R405), esquinas rellenas con >= 2.25" de espuma sin comprimir (R406), sin forma de cuña (R407), pasivos (R409), removibles en < 5 min con 2 personas como guía (R410), tela roja o azul según alianza (R411) y número de equipo blanco, >= 3.75" de alto, en >= 3 lugares (R412). | **[FIRST]** (R401-R412 2026) |
| **Costo por pieza** | Ningún ítem no-KOP o software puede tener un valor justo de mercado (FMV) mayor a **$600 USD** (R301). El manual 2026 (sección 8) no trae un límite de costo total del robot en esta sección. Un kit o sistema de un proveedor cuenta como un solo ítem. | **[FIRST]** (R301 2026) |
| **Materiales prohibidos** | Prohibido: materiales peligrosos (p. ej. plomo, encapsulado o no), hidráulicos, gases inflamables, pirotecnia, mercurio líquido, circuitos > 24 V, lastre suelto, láseres que no sean Clase 1, luces estroboscópicas > ~5 Hz y luces de alta intensidad sin control (R203). Tracción sin superficies que dañen la alfombra (metal, lija, tacos rígidos, velcro) (R201). Sin líquidos, geles, grasas ni partículas finas que contaminen el campo (R205). | **[FIRST]** (R201, R203, R205 2026) |
| **Neumática** | Solo piezas COTS permitidas (R801, R802, R804). Almacenamiento <= **120 psi** (R807), trabajo <= **60 psi** con un regulador primario (R808), válvula de alivio a 125 psi (R811). Si usas neumática son obligatorios: 1 compresor <= 1.1 cfm, válvula de alivio, switch/sensor de presión, tapón de venteo, 2 manómetros y regulador (R805, R806). Sin modificar las piezas (R803). | **[FIRST]** (R801-R814 2026) |
| **Partes del Kit** | Los ítems del KOP quedan fuera del límite de $600 de R301. Las partes del KOP se listan en la Virtual KOP del año; el manual 2026 sección 8 solo las menciona de forma indirecta. Los diseños y software hechos antes del kickoff solo valen si eran públicos (R303); los MAJOR MECHANISMS no pueden construirse antes del kickoff (R302). | **[FIRST]** (R301, R302, R303 2026) |
| **Seguridad** | Sin bordes o protrusiones que dañen el ARENA, SCORING ELEMENTS o personas (R202, R206); el robot debe permitir sacar piezas de juego y salir del campo estando deshabilitado y apagado (R204); nada que dañe o interfiera con otros robots (R203). | **[FIRST]** (R202, R203, R204, R206 2026) |

**[Buena práctica]** Crea un documento "Reglas clave" con la regla, su número y quién la verificó. Reléelo en el design review.

---

## 2. Presupuesto de peso por subsistema

Reparte desde el inicio (en lb; ajusta al límite vigente: 115 lb sin bumpers ni batería, R103 2026):

| Subsistema | % orientativo | Notas |
|---|---|---|
| Chasis / drivetrain (con swerve) | 35-40 % | Módulos swerve ~ 5-6 lb c/u + frame |
| Electrónica y batería | 10-12 % | La batería se cuenta aparte en la inspección, pero pesa en la práctica |
| Mecanismo principal (elevador/brazo/shooter) | 25-30 % | Mantenerlo bajo y centrado |
| Intake | 8-12 % | |
| Cableado, neumática, misc. | 5-8 % | |
| Bumpers | Aparte | Cuentan en el límite combinado |
| **Reserva** | **>= 3-5 lb** | No te la gastes hasta el final |

**[Buena práctica]** Mantén una hoja de peso viva (Onshape Mass Properties + báscula real). Revisa cada semana.

---

## 3. Centro de gravedad (CG)

- Mantén el CG **bajo** y **centrado** para evitar volcaduras y mejorar tracción.
- Pesos pesados (batería, elevador base) abajo y cerca del centro.
- Considera el CG con el mecanismo extendido; simula en Onshape (Mass Properties) la posición más desfavorable.
- Un CG alto con swerve = volcadura y pérdida de tracción en frenado.

---

## 4. Diseño simple y robusto

- Cada mecanismo extra = más cosas que fallan. Prefiere **menos grados de libertad**.
- **Un solo job por mecanismo.** Si dos tareas necesitan mecanismos distintos, sepáralos.
- Evita tolerancias apretadas: diseña para que funcione aunque la manufactura sea +/-0.010".
- Elementos de **desgaste y golpe** (intake) fáciles de reemplazar.
- Protege electrónica y cables de impactos.

## 5. Prototipado rápido

| Método | Para qué | Ventajas |
|---|---|---|
| Cartón / foamboard | Validar tamaño, alcance, geometría | Minutos, gratis |
| Madera / triplay (láser o router) | Prototipos funcionales de intake y brazos | Rápido, barato |
| Impresión 3D | Poleas, spacers, soportes | Iteración en horas |
| "Cad on cardboard" | Combinar CAD con cartón a escala 1:1 | Ayuda a ver interferencias |

**[Buena práctica]** Prueba la idea con el objeto real del juego antes de diseñar la versión final.

---

## 6. Revisión de diseño (design review)

Haz al menos tres: concepto, diseño detallado, antes de fabricar. Pregunta:

- ¿Qué problema resuelve y cómo medimos que funciona?
- ¿Cabe dentro del perímetro, altura y extensión?
- ¿Cuánto pesa y cuál es el presupuesto del subsistema?
- ¿Se puede fabricar con lo que tenemos (máquinas, tiempo, dinero)?
- ¿Cómo se ensambla y cómo se repara en pits en <5 min?
- ¿Cómo falla? ¿Qué pasa si se rompe en partido?
- ¿Cumple las reglas [FIRST] (costo, materiales, bumpers)?
- ¿Cómo va el cableado y los sensores?
- ¿Hay riesgos de seguridad?

---

## 7. Organización en Onshape

- **Master sketch / skeleton:** un sketch o Part Studio maestro con el perímetro, ejes y puntos de montaje; los subsistemas se referencian a él.
- **Part Studios por subsistema** (drivetrain, intake, elevador...) y un **Assembly** principal.
- **Configuraciones** para variantes (largo de brazo, versión A/B) en lugar de copiar piezas.
- **Versionado:** crea una **versión** en cada hito (concepto, pre-fabricación, post-competencia) y usa ramas (branches) para experimentar.
- **Nomenclatura:** `2283-2027-SUBSISTEMA-PIEZA` consistente.
- **Bibliotecas:** **MKCad** y **FRCDesignLib** (Onshape) para componentes comunes (motores, rodamientos, tornillería, perfiles).
- **Mates:** usa pocos y bien nombrados; fija el primer componente (Fix).
- **Exportes:** DXF desde flat patterns, STEP del ensamble, BOM actualizado.

---

## 8. Errores comunes

- Diseñar sin revisar el manual vigente.
- No presupuestar peso hasta que ya sobrepasa.
- Diseñar el mecanismo ideal sin prototipo.
- No considerar la altura del CG.
- Cableado como "después".
- Piezas imposibles de ensamblar o reemplazar.
- Archivo de Onshape sin orden ni versiones.

## 9. Checklist de design review

- [ ] Reglas [FIRST] 2026 revisadas y documentadas.
- [ ] Perímetro, altura, extensión verificados en CAD.
- [ ] Peso total y por subsistema dentro del presupuesto con reserva.
- [ ] CG calculado en configuraciones extendidas.
- [ ] Prototipo validado con el objeto del juego.
- [ ] Manufactura confirmada (ver guía de manufactura).
- [ ] Ensamble y reparación (<5 min por módulo) planificados.
- [ ] Cableado y sensores considerados.
- [ ] Bumpers y montaje diseñados.
- [ ] Onshape ordenado, versionado y con BOM actualizado.
- [ ] Un adulto aprobó los aspectos de seguridad.

## Fuentes

- https://firstfrc.blob.core.windows.net/frc2026/Manual/2026FRCInspectionChecklist.pdf (checklist 2026: peso, perímetro, extensión de bumpers)
- https://info.firstinspires.org/hubfs/blog/frc/2024-bumper-rule-changes.pdf
- Referencias generales (no abiertas en esta sesión; consultar): FRCDesign.org, ReCalc (reca.lc), Chief Delphi, MKCad/FRCDesignLib en Onshape.
