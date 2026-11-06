# Reglas generales de diseño del robot

Guía de criterios de diseño para el robot de Panteras 2283: restricciones de FIRST, presupuestos, organización en Onshape y revisión de diseño.

> **Aviso 2027:** todo lo marcado **[FIRST]** viene de temporadas anteriores y **cambia cada año**. Verifícalo en el Manual del Juego 2027 al salir el kickoff (9 ene 2027) antes de tomar decisiones de diseño. Los números de abajo son referencia, no regla.

Leyenda: **[FIRST]** requisito del manual · **[Fabricante]** recomendación del fabricante · **[Buena práctica]** práctica común de equipos FRC.

---

## 1. Restricciones de FIRST que afectan el diseño

| Tema | Qué suele decir el manual (verificar 2027) | Tipo |
|---|---|---|
| **Frame perimeter** | El perímetro del frame debe ser fijo (no articulado), con un máximo de perímetro total; protrusiones menores (~0.25") permitidas. Ver sección Robot Construction (R101 en 2026, verificar). | [FIRST] |
| **Altura y extensión** | Límite de altura del robot (histórico ~4 ft / 48") y límite de extensión más allá del frame perimeter (histórico ~12"). Cambian con el juego. | [FIRST] |
| **Peso máximo** | 2026: 115 lb sin bumpers ni batería; robot + bumpers <= 135 lb según el checklist de inspección 2026. Verificar cifras 2027. | [FIRST] |
| **Bumpers** | Deben cubrir una zona del perímetro, tener tela de color de alianza, ir sujetos con un sistema que soporte golpes, y respetar anchos/alturas y extensión desde el perímetro (2026: partes del bumper <= 4.25" del perímetro; partes duras <= 1.5", R403/R404 según el checklist). Ver sección Bumpers del manual. | [FIRST] |
| **Costo por pieza** | Límite de costo de cada ítem comercial o fabricado, y límite total de costo del robot (varía por año; histórico ~$600 por pieza y ~$4,000-$7,500 total). Consulta Robot Construction. | [FIRST] |
| **Materiales prohibidos** | Hay restricciones sobre materiales peligrosos, resortes de gran energía, hidráulicos, líquidos peligrosos, etc. Lee la lista completa del manual. | [FIRST] |
| **Partes del Kit** | Lo que viene en el Kit of Parts y lo que se puede usar sin cuenta de costo; lista cambia cada año. | [FIRST] |
| **Seguridad** | No bordes filosos, no piezas que dañen el campo o robots rivales, no estructura que se desprenda. | [FIRST] |

**[Buena práctica]** Crea un documento "Reglas clave 2027" con la regla, su número y quién la verificó. Reléelo en el design review.

---

## 2. Presupuesto de peso por subsistema

Reparte desde el inicio (en lb; ajusta al límite 2027):

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

- Diseñar sin revisar las reglas 2027.
- No presupuestar peso hasta que ya sobrepasa.
- Diseñar el mecanismo ideal sin prototipo.
- No considerar la altura del CG.
- Cableado como "después".
- Piezas imposibles de ensamblar o reemplazar.
- Archivo de Onshape sin orden ni versiones.

## 9. Checklist de design review

- [ ] Reglas [FIRST] 2027 revisadas y documentadas.
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
