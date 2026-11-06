# Diseño para manufactura (DFM)

Guía para que lo que diseñas en Onshape se pueda fabricar bien, rápido y barato: lámina, perfil, láser, router, waterjet e impresión 3D.

> **Manual vigente: FRC 2026.** Las reglas [FIRST] citan el manual 2026; al salir el de 2027 (9 ene 2027) se actualizan y solo cuenta el vigente. Detalle completo en reglas-frc.md.

Los valores de tolerancia son punto de partida: **siempre corta una pieza de prueba** con tu máquina y tu material antes de fabricar la serie.

Leyenda: **[FIRST]** requisito del manual · **[Fabricante]** recomendación del fabricante · **[Buena práctica]** práctica común de equipos FRC.

> **Seguridad:** corte, router, taladro, láser y soldadura requieren supervisión de un adulto capacitado, lentes de seguridad y cabello/ropa recogidos. Nunca uses guantes cerca de taladros o fresas.

---

## 1. Materiales

### 1.1 Aluminio

| Material | Uso típico | Notas |
|---|---|---|
| **6061-T6** | Placas maquinadas (router/CNC), perfil, tubo | Rígido, maquinable, **se agrieta si lo doblas cerrado**. No doblar (o con radios enormes). |
| **5052-H32** | Lámina doblada | Muy dúctil, dobla bien con radios pequeños. Menos rígido que 6061-T6 pero para lámina es lo ideal. |
| 6061-T6 en lámina | Solo si la pieza va plana o con dobleces a radio grande | Si necesitas doblar 6061-T6, usa radio interior >= 3x espesor y confirma con el proveedor (algunos lo ofrecen en T4 para doblar). |

**[Buena práctica]** Lámina doblada: 5052-H32. Placas planas, gussets y piezas maquinadas: 6061-T6.

### 1.2 Espesores comunes

| Espesor | Uso | Comentario |
|---|---|---|
| 0.063" (1/16", 1.6 mm) | Cubiertas, soportes ligeros, electrónica | Muy ligero; se dobla fácil, ojo con rigidez |
| 0.090" (2.3 mm) | Lámina doblada estructural ligera, soportes de mecanismos | Compromiso muy popular |
| 0.125" (1/8", 3.2 mm) | Placas de swerve/elevador, estructura | Rígido; peso notable |
| 0.25" (6.4 mm) | Placas muy cargadas | Pesado; úsalo solo con aligeramiento |

### 1.3 Tubo / perfil rectangular ("PTR" en México)

| Perfil | Pared | Uso típico |
|---|---|---|
| 2x1 | 0.125" | Frame, brazos cargados, elevadores |
| 2x1 | 1/16" (0.0625") | Frame ligero, rieles (con patrón de agujeros ya existente en la mayoría) |
| 1x1 | 1/16" | Soportes, travesaños, brazos ligeros |

- Existen perfiles **con patrón de agujeros ya hecho**: WCP, REV (MAXTube), Thrifty Bot. Ahorran tiempo de taladrado y reducen peso. **[Fabricante]** Patrón común: agujeros a 0.5" (centro a centro) con diámetro para #10 (o 0.201"/0.196" según proveedor). Revisa la ficha del proveedor, no asumas.
- En México el PTR comercial de ferretería suele ser de **aleación y medidas distintas** (a veces en mm, paredes mayores). Confirma aleación (6061/6063) y espesor real con calibrador antes de diseñar.

### 1.4 Plásticos y otros

| Material | Para qué | Cuidado |
|---|---|---|
| **Policarbonato (Lexan)** | Protecciones, paneles de electrónica, cubiertas | NO cortar con láser (ver sección 4). Corta con router/sierra de mesa/cizalla. Muy tenaz. |
| **Delrin (POM)** | Bujes, guías, piezas de desgaste | Maquina muy bien; poco fricción. Costoso. |
| **HDPE / UHMW** | Guías, skids, bajo desgaste | Blando, se deforma; usa fresas afiladas |
| **Acero** | Ejes, tornillería, cadenas, piezas que requieren dureza o desgaste | Pesado (~2.9x aluminio): solo donde haga falta |
| Fibra de carbono / G10 | Placas ligeras | **Polvo nocivo**: corta con extracción y mascarilla; requiere adulto |

### 1.5 Peso y rigidez (orientativo)

- Densidad: aluminio ~2.7 g/cm³ · acero ~7.8 · policarbonato ~1.2 · HDPE ~0.95.
- Rigidez a flexión de un tubo crece con el **cubo de la altura**: un 2x1 orientado con el lado de 2" en la dirección de la carga es mucho más rígido que acostado. **[Buena práctica]** Orienta el lado largo hacia la carga.
- Aligerar quita peso pero también rigidez: aligera zonas poco cargadas, deja las pestañas y bordes.
- Usa ReCalc (reca.lc) y la herramienta de Mass Properties de Onshape para estimar.

---

## 2. Lámina de aluminio (sheet metal)

### 2.1 Radio interior mínimo de doblez

Valores **conservadores** (asumen doblez perpendicular a la veta). Confirma con tu proveedor/dobladora.

| Espesor | 5052-H32 | 6061-T6 |
|---|---|---|
| 0.063" | 0.063" (1x espesor) | >= 0.19" (3x) o no doblar |
| 0.090" | 0.090" (1x) | >= 0.27" (3x) o no doblar |
| 0.125" | 0.125" (1x) | >= 0.375" (3x) o no doblar |

**[Buena práctica]** Diseña un solo radio para todos los dobleces de una pieza (igual al espesor, p. ej.) para que usen la misma herramienta. Dobla **perpendicular a la veta** cuando sea posible.

### 2.2 K-factor y bend deduction

- **K-factor** = posición del eje neutro / espesor. Valor típico para aluminio con radios pequeños: **0.33-0.45**. Si no sabes, **pregunta al proveedor** (SendCutSend, por ejemplo, publica sus valores) y úsalo en Onshape.
- **Bend deduction (BD)** = cuánto se resta de la suma de las dos alas para obtener el desarrollo plano. Onshape lo calcula si le das K-factor y radio; no lo hagas a mano salvo para verificar.
- Si el taller te pide un patrón plano sin doblez ya calculado, pregunta qué K-factor usa; un K-factor equivocado cambia la pieza final 0.5-1 mm por doblez.

### 2.3 Reglas geométricas

| Regla | Valor mínimo recomendado | Tipo |
|---|---|---|
| Alivio de doblez (bend relief) | Ancho >= ~espesor, profundidad >= radio + espesor | [Buena práctica] |
| Agujero a doblez (borde del agujero a línea de doblez) | >= 2.5x espesor + radio | [Buena práctica] |
| Agujero a borde de la pieza | >= 1.5-2x espesor (y >= 1 diámetro del agujero de preferencia) | [Buena práctica] |
| Pestaña mínima (alto de ala doblada) | >= 4x espesor (+ radio) | [Buena práctica] |
| Ranura/slot a doblez | Igual que agujero; si cruzan el doblez se deforman | [Buena práctica] |
| Agujero a agujero | >= 2x espesor entre bordes | [Buena práctica] |

Si un agujero queda más cerca del doblez que esto, se **ovala**. Alternativa: taladrar después del doblez.

### 2.4 Aligeramiento (lightening / pocketing)

- Dentro de placas de 0.125", deja **almas (webs) >= 0.25"** entre agujeros/bolsillos y **>= 0.125"** de pared contra el borde; en 0.090" no quites más de lo que dejas ~0.2".
- Radios de esquina de los bolsillos **>= 0.0625"** si es láser/waterjet (según tamaño de herramienta), y **>= radio de la fresa** si es router (ver sección 5).
- Patrón triangular/hexagonal es eficiente; evita esquinas agudas (concentran esfuerzos): redondea.
- **[Buena práctica]** Aligerar al final del diseño, tras revisar con FEA simple o con tu experiencia de qué se flexiona.

### 2.5 Sheet metal en Onshape

1. Crea un sketch de la silueta y usa **Sheet metal > Make** (Sheet metal model / "Make joint") para generar la lámina con espesor, radio y K-factor.
2. Agrega alas con **Flange** y bordes con **Hem** si lo necesitas; usa **Bend relief** automático.
3. Verifica con **Flat pattern** (en la pestaña Part Studio, "Sheet metal table" muestra la vista plana y las líneas de doblez).
4. Exporta el patrón plano: clic derecho en el flat pattern > **Export** > formato **DXF** (unidades en pulgadas). Revisa que haya capas separadas para corte y para líneas de doblez, y **borra las líneas de doblez si el proveedor no las quiere** o ponlas en capa aparte.
5. Cada pieza en su propio DXF, un archivo por espesor/material.

---

## 3. Perfil / tubo

- **Cortes:** sierra de cinta, cortadora de disco para aluminio o ingletadora con disco para no-ferrosos. Marca y escuadra; corta ligeramente largo y lima. Rebabea siempre.
- **Ejes del patrón:** conserva la orientación del patrón de agujeros. Si cortas, corta **entre agujeros** para que el patrón siga alineado a 0.5".
- **Agujero a extremo:** >= 1 diámetro del agujero (mejor >= 0.5") para que no se rompa la pared.
- **Uniones:**
  - **Remaches POP** (aluminio): 3/16" para frame; 5/32" para zonas ligeras. El **rango de agarre (grip range)** debe cubrir la suma de espesores; un remache muy corto no cierra, muy largo se queda flojo. Taladro típico: 3/16" -> 0.196" (#9); 5/32" -> 0.159" (#21). Verifica en la ficha.
  - **Tornillos #10-32 y 1/4-20:** con **tuercas nyloc**, rondanas planas grandes de ambos lados, y largo que sobresalga 1-2 hilos. **[Buena práctica]** Usa Loctite 242 azul en tornillos con rosca en aluminio roscado.
  - **Gussets** (escuadras) en esquinas de frame y uniones de torre: mejoran rigidez notablemente por poco peso.
  - **Inserts** (roscas insertadas tipo helicoil/key-lock) para roscas que se reutilizan seguido; aluminio roscado directo se desgasta.
- **Soldadura:** **no sueldes aluminio** salvo que el equipo tenga un soldador/taller con experiencia y supervisión de adulto; la soldadura por calor reduce la resistencia del T6 y deforma. Prefiere remaches/tornillos. Acero: solo con adulto.
- **Taladrado:** taladro de banco o prensa con **abrazadera**, nunca sostengas la pieza con la mano. Usa fluido de corte (o WD-40) en aluminio; broca afilada, rebabea.

---

## 4. Corte láser

> **Seguridad crítica:** los siguientes materiales NO se cortan con láser: **PVC, vinilo** (liberan cloro/ácido clorhídrico: tóxico y corrosivo para la máquina), **policarbonato/Lexan** (se quema, produce humo tóxico y bordes amarillos y quebradizos, riesgo de incendio), ABS (humo tóxico), fibra de carbono/G10 (polvo y resinas), cualquier plástico sin ficha de seguridad. El láser solo lo opera un adulto capacitado, con extracción de humos y extintor cerca.

| Material | ¿Láser? | Nota |
|---|---|---|
| Acrílico (PMMA, "cast") | Sí | Buen corte; ideal para prototipos y cubiertas. |
| MDF, triplay (plywood) | Sí | Excelente para prototipos; olor y humo: extracción. |
| Cartón, cartulina | Sí | Prototipos rapidísimos. |
| Delrin/POM | **Evitar** | Libera formaldehído; no recomendado |
| Policarbonato, PVC, vinilo | **NO** | Ver aviso |
| Aluminio | Solo con **láser de fibra industrial** | Láseres CO2 de escritorio no cortan aluminio. Usa taller/proveedor. |

### 4.1 Kerf y tolerancias

- **Kerf** (ancho del corte): ~0.1-0.25 mm en láser CO2 sobre acrílico/MDF; cambia por máquina. Mide con un cuadrado de prueba y compensa.
- Compensación: agujeros salen ligeramente **más grandes** (el kerf se come el material por dentro) y piezas exteriores más chicas; compensa en CAM o diseña con medida ajustada.
- **Agujeros de paso:** diseña para #10 con 0.201" (ver sección 8) y confirma en prueba.
- **Tamaño mínimo de detalle:** agujero >= espesor del material (idealmente >= 1.5x); ancho de puente/almas >= espesor.

### 4.2 DXF limpio

- Curvas **cerradas**, sin líneas duplicadas ni superpuestas (el láser cortaría dos veces).
- Sin splines enormes ni elipses raras: usa arcos y líneas.
- Unidades correctas (pulgadas o mm) y **escala 1:1**; verifica midiendo una cota en el programa del proveedor.
- Una pieza por capa o por archivo; elimina cotas, texto y geometría de construcción.
- Orden: agujeros interiores primero se maneja en el CAM, no te preocupes en el DXF.

---

## 5. Router CNC (Omio, Shapeoko, Avid)

> **Seguridad:** adulto presente, lentes y protección auditiva, extracción de polvo/viruta, sujeción firme, nunca limpiar con la máquina en marcha, botón de paro accesible.

- **Fresas típicas:** 1/8" (3.175 mm) para detalle y radios pequeños; 1/4" (6.35 mm) para desbaste y contornos grandes. **Fresas de 1 o 2 filos, de carburo, "O-flute" o para aluminio** (O-flute para plásticos/aluminio).
- **Radios internos:** nunca más cerrados que el radio de la fresa. Fresa 1/4" -> radio >= 0.125". Para esquinas internas rectas que deben aceptar una pieza cuadrada, usa **dogbones** (alivios circulares en la esquina) o diseña la pieza con esquinas redondeadas.
- **Tabs (puentes):** deja 2-4 tabs de ~0.1" en el contorno para que la pieza no se mueva al cortarse; quítalos con corte y lima después.
- **Sujeción:** tornillos al sacrificio (spoilboard), cinta de doble cara, abrazaderas. Aluminio: sujeción rígida y refrigerante/lubricante (WD-40 o fluido) con pasadas ligeras.
- **Feeds y speeds (conceptual):** pasadas ligeras (profundidad de corte ~ 0.5-1x diámetro de fresa en plásticos, **mucho menos en aluminio**, ~0.02-0.05"), avance moderado y RPM altas; si la fresa chilla o la viruta se suelda, baja RPM/avance o más lubricante. Parte de los valores del fabricante de la fresa y de tu máquina; no copies números de otra máquina.
- **Tolerancias en agujeros:** los agujeros salen ligeramente chicos/ovalados; para rodamientos de **1.125" OD** haz un agujero de prueba y ajusta en CAM (ver sección 8). **Bearing bore con ajuste:** presión (press fit) o holgado (slip fit) según cómo vaya a sujetarse.
- **CAM:** Onshape tiene **CAM Studio** (integrado) o puedes usar Fusion. Flujo: importar pieza -> definir stock y orígenes -> Contour, Pocket, Drill -> simular -> postprocesar a g-code de tu máquina.

---

## 6. Waterjet y proveedores externos

| Opción | Cuándo usarla | Preparación de archivos |
|---|---|---|
| **SendCutSend** y similares (OSH Cut, Xometry, Protolabs) | Piezas de lámina o placa cortadas y dobladas; buena precisión, entrega en días | DXF/STEP por pieza, material y espesor definidos, K-factor del proveedor, tolerancias en la ficha. Importación a México: considera tiempos, aduana y costo. |
| **Waterjet** | Placas gruesas, materiales delicados (no distorsiona por calor) | Geometría 2D limpia, sin esquinas internas extremadamente agudas; el chorro deja conicidad ("taper") |
| **Talleres locales CDMX** (corte láser de fibra, plasma, dobladoras) | Piezas sencillas en aluminio y acero; entrega rápida y sin importar | Lleva DXF limpio (curvas cerradas, 1:1), indica material/espesor, pide muestra. **Plasma** deja borde rugoso y más zona afectada por calor: no ideal para aluminio de precisión. |

**[Buena práctica]** Prepara el paquete: DXF por pieza, STEP del ensamble, tabla con cantidad/material/espesor/dobleces, y pregunta qué tolerancia garantizan (normalmente +/-0.005" en láser/waterjet).

---

## 7. Impresión 3D

### Impresión 3D que no se rompe: reglas clave

1. **[Buena práctica]** Orienta las capas para que la carga **no las separe**: la fuerza debe ir a lo largo de las capas, no abriéndolas (ver 7.2).
2. **[Buena práctica]** **Perímetros > relleno**: 3-4 perímetros o más aportan más que subir el infill.
3. **[Buena práctica]** Pon **radios (filetes) en esquinas internas** (≥1-2 mm); una esquina viva concentra el esfuerzo y ahí se rompe.
4. **[Buena práctica]** Espesor mínimo de pared: al menos 3 perímetros (≈1.2-2 mm según boquilla); no diseñes paredes de 1 línea en piezas con carga.
5. **[Buena práctica]** Para tornillos que se aprietan seguido: **inserto térmico** (heat-set) en vez de rosca impresa; **tuerca cautiva** si hay espacio (ver 7.3).
6. **[Buena práctica]** Piezas que reciben golpes: **PA (nylon) o TPU**, no PLA.
7. **[Buena práctica]** **PLA no** en zonas calientes (motores, regulación de potencia) ni donde haya impacto.
8. **[Fabricante]** Seca el filamento (nylon sobre todo) y respeta temperaturas y cámara del fabricante (Bambu, Prusa, Polymaker); una pieza impresa con filamento húmedo sale débil y porosa.

Por material del equipo (valores relativos, orientativos; confirma en la ficha técnica del filamento):

| Material | Uso en el robot | Resist. / rigidez / impacto / temp. | Requisitos | Perímetros / relleno | No usar para |
|---|---|---|---|---|---|
| **PLA** | Prototipos, spacers, soportes ligeros | Rigidez alta / impacto bajo (frágil) / temp. baja (~55-60 C) | Sin cámara cerrada; cama ~55-60 C | 3 / 20-30 % | Zonas calientes, impacto, piezas con carga sostenida (se deforma) |
| **PETG** | Soportes de sensores, cubiertas, piezas con algo de impacto | Resist. media / rigidez media / impacto medio / temp. media | Secar si está húmedo; cama ~70-80 C | 3-4 / 25-40 % | Cargas altas sostenidas; estructura crítica |
| **PETG-GF / PA-GF** (fibra de vidrio) | Soportes rígidos, piezas estructurales ligeras | Rigidez alta / impacto medio / temp. media-alta (PA-GF mayor) | **Boquilla endurecida**; secar (PA-GF higroscópico); PA-GF cámara cerrada y cama ~80-100 C | 4 / 30-40 % | Piezas con contacto de desgaste (abrasivo); no lijar en seco |
| **PA / Nylon** | Poleas, bujes, engranes, intake wheels, piezas con golpe | Resist. alta / rigidez media / **impacto alto** / temp. alta | **Secar el filamento (es higroscópico)** y secarlo durante la impresión; cámara cerrada; cama ~80-100 C | 4 / 30-40 % | Piezas de tolerancia fina sin considerar absorción de humedad (cambia medidas) |
| **PA-CF** | Piezas estructurales ligeras y rígidas | Rigidez muy alta / impacto medio / temp. alta | **Boquilla endurecida**, secado, cámara cerrada; polvo de fibra: no lijar en seco | 4 / 30-40 % | Impacto fuerte (menos tenaz que PA liso); piezas que rozan otras piezas (abrasivo) |
| **TPU** | Ruedas de intake, amortiguadores, fundas | Flexible; impacto muy alto; rigidez baja | Secar; imprimir lento, retracción mínima o nula; cama ~50-60 C | 3 / 15-25 % | Piezas que deban ser rígidas o precisas |

**Recocido (annealing) de nylon / PA-CF (opcional):** calentar la pieza en horno (ver la ficha del filamento para temperatura y tiempo) mejora cristalinidad, rigidez y temperatura de uso, pero la pieza se encoge y deforma un poco: diseña con margen y haz una prueba. **Requiere adulto** (horno caliente).

---

### 7.1 Materiales

| Material | Uso en FRC | Notas |
|---|---|---|
| **PLA / PLA+** | Prototipos, spacers, soportes simples, piezas decorativas | Fácil; se deforma con calor (~55-60 C), frágil |
| **PETG** | Soportes de sensores, cubiertas, piezas con algo de impacto | Más tenaz y resistente al calor que PLA, algo flexible |
| **ABS / ASA** | Piezas con calor o intemperie | Requiere cámara cerrada; humos: ventilar |
| **Nylon (PA)** | Poleas, engranes, bujes, intake wheels | Muy tenaz y resistente al desgaste; higroscópico (secar el filamento) |
| **Nylon-CF / PETG-CF** | Piezas estructurales ligeras y rígidas | Boquilla endurecida; polvo de fibra: no lijar en seco |
| **TPU** | Ruedas de intake, amortiguadores, fundas | Flexible; imprime lento y sin retracción |

### 7.2 Resistencia y orientación

- Las capas son el eslabón débil: **la carga debe ir a lo largo de las capas, no despegándolas**. Orienta la pieza para que el esfuerzo no abra capas (no imprimas un gancho vertical con la carga hacia arriba).
- **Paredes (perímetros):** 3-4 para piezas estructurales; el perímetro aporta más resistencia que el relleno.
- **Relleno (infill):** 25-40 % (gyroid o cúbico) para piezas funcionales; 100 % solo para piezas muy pequeñas/cargadas (el aumento es poco versus más perímetros).
- Capa 0.2 mm es buen compromiso; 0.12-0.16 mm para ajustes finos.

### 7.3 Agujeros y ensambles

- **Los agujeros salen chicos:** añade **0.2-0.4 mm** de holgura al diámetro. Para tornillos #10 (4.83 mm), diseña con ~5.1-5.2 mm.
- **Insertos térmicos (heat-set):** agujero ligeramente menor que el diámetro exterior del inserto según la ficha del fabricante; calienta con soldador (~220-250 C para PLA/PETG; ajusta por material). Típico: M3 -> agujero ~4.0-4.2 mm; verifica el modelo exacto.
- **Tuercas cautivas:** bolsillo hexagonal con holgura 0.2-0.3 mm por lado y lengüeta abierta para insertar.
- **Overhangs y puentes:** >45 grados requiere soporte; puentes cortos (<~30 mm) se imprimen bien. Diseña chaflanes en lugar de salientes.
- **Tolerancia entre piezas impresas:** 0.2-0.4 mm de holgura entre piezas que deben deslizar o encajar.

### 7.4 Cuándo NO imprimir

- Piezas de **alto impacto** (colisiones directas, intakes que golpean la pared) a menos que sean de Nylon/TPU y estén diseñadas para sacrificarse.
- Piezas cerca de **calor** (motores, conexiones de potencia) con PLA.
- Estructura crítica de seguridad o que soporta cargas dinámicas altas.
- Piezas que ya se fabrican mejor en lámina (más barato, más resistente).

---

## 8. Holguras y tolerancias recomendadas

### 8.1 Agujeros de paso y rodamientos

| Aplicación | Medida de diseño | Nota |
|---|---|---|
| Paso para **#10** (close fit) | 0.196" (#9) | Poco juego, requiere buena precisión |
| Paso para **#10** (free fit) | 0.201" (#7) o 0.206" (#5) | Recomendado en frames con tolerancias de taller |
| Paso para **1/4-20** (close) | 0.257" (F) | |
| Paso para **1/4-20** (free) | 0.266" (H) | |
| Rodamiento **1.125" OD** — *press fit* | ~1.123-1.124" | Ajuste de prensa; prueba antes |
| Rodamiento **1.125" OD** — *slip fit* | ~1.126-1.128" | Retener con tapa o anillo |
| Eje hex **1/2"** (agujero hex, ajuste holgado) | 0.503-0.505" a través de planos | Mide con tu máquina; los hex tienden a redondearse |
| Eje redondo | +0.002-0.005" sobre el nominal | |

Estas cifras son orientativas; **valida con una pieza de prueba**. **[Fabricante]** Consulta las recomendaciones de REV/WCP/AndyMark para sus rodamientos y ejes.

### 8.2 Brocas para machuelo (tap drill)

| Rosca | Broca (tap drill) | Equivalente |
|---|---|---|
| #6-32 | #36 | 0.1065" |
| #8-32 | #29 | 0.1360" |
| **#10-32** | **#21** | 0.1590" |
| **1/4-20** | **#7** | 0.2010" |
| M3 x 0.5 | 2.5 mm | |
| M4 x 0.7 | 3.3 mm | |
| M5 x 0.8 | 4.2 mm | |
| M6 x 1.0 | 5.0 mm | |

Usa fluido de corte, machuelo de espiral o de punta según el caso, gira 1/2 vuelta y retrocede 1/4 para romper la viruta.

---

## 9. Diseñar para ensamblar y reparar

- **Acceso:** verifica en Onshape que cada tornillo se alcance con la llave/Allen real (modela una herramienta si es necesario).
- **Misma tornillería:** limita a pocos tamaños (#10-32 y 1/4-20, M3-M5) para llevar menos herramientas y repuestos.
- **Piezas simétricas** o que no admitan armarse al revés (o márcalas con asimetría clara).
- **Repuestos:** fabrica 1-2 extras de las piezas que se rompen (intake, soportes, poleas).
- **Meta:** cambiar un módulo completo (swerve, intake) en pits en **menos de 5 minutos**: conectores accesibles, tornillos grandes, sin pasos ocultos.
- **Etiqueta** cables y piezas.

---

## 9.1 Reglas FIRST que afectan lo que fabricamos

- **[FIRST]** (R301 2026) Ningún ítem no-KOP, comprado o fabricado, puede tener un valor justo de mercado (FMV) mayor a **$600 USD**. En piezas fabricadas cuenta el material (la cantidad mínima comprable de donde sale la pieza) y la mano de obra, excepto la de miembros del equipo, de otros equipos y de talleres del evento. Un kit o sistema vendido como conjunto cuenta completo.
- **[FIRST]** (R302, R303 2026) Los MAJOR MECHANISMS no pueden construirse antes del kickoff; diseños y software previos solo valen si sus archivos fuente eran públicos antes del kickoff.
- **[FIRST]** (R202, R206 2026) Nada de bordes filosos ni salientes que dañen el ARENA, las piezas de juego o personas: rebabea y lima. El acrílico u otros materiales que se astillan no están prohibidos, pero cualquier rotura debe corregirse de inmediato.
- **[FIRST]** (R203 2026) No se permiten partes de materiales peligrosos (p. ej. plomo, encapsulado o no), lastre suelto, fluidos hidráulicos ni circuitos de más de 24 V.
- **[FIRST]** (R201 2026) Las superficies de tracción no pueden tener elementos que dañen la alfombra (metal, lija, tacos rígidos, velcro).
- **[FIRST]** (R103, R408 2026) Peso máximo 115 lb sin bumpers ni batería y 135 lb con bumpers: pesa las piezas fabricadas.
- **[FIRST]** (R404 2026) Las partes duras de los bumpers (soportes, tornillos, plásticos duros) no pueden sobresalir más de 1.25" del perímetro del robot.

---

## 10. Errores comunes

- Dobleces demasiado cerca de agujeros o con radio inferior al permitido.
- DXF en unidades incorrectas, o con líneas duplicadas.
- Agujeros sin holgura para impresión/CNC (nada entra).
- No pedir muestra de rodamiento: ajuste a presión inviable.
- Usar 6061-T6 doblado con radio cerrado (se agrieta).
- Olvidar rebabear y limar.
- Tornillos sin Loctite o sin nyloc en zonas de vibración.
- Cortar con láser un plástico no apto (PVC, policarbonato, ABS: gases tóxicos o mal corte) **[Buena práctica]**.

## 11. Checklist antes de mandar a fabricar

- [ ] Material y espesor correctos (5052 para doblez, 6061-T6 plano).
- [ ] Radios y distancias a doblez/borde cumplen la tabla.
- [ ] Flat pattern generado y DXF exportado a 1:1 en las unidades correctas.
- [ ] Curvas cerradas, sin líneas duplicadas, sin cotas ni texto.
- [ ] Agujeros con holgura según proceso (láser/router/3D).
- [ ] Tolerancias de rodamientos y ejes verificadas con pieza de prueba.
- [ ] Tornillería estandarizada y accesible.
- [ ] Peso estimado y dentro del presupuesto del subsistema.
- [ ] Un adulto revisó seguridad (láser, router, soldadura, taladro).
- [ ] Cantidad de repuestos definida.
- [ ] Nombre de archivo = nombre de pieza en Onshape.

## Fuentes

- Manual del Juego FRC 2026, sección 8 (R2xx, R3xx, R4xx; vigente)
- https://firstfrc.blob.core.windows.net/frc2026/Manual/2026FRCInspectionChecklist.pdf
- Valores de roscas, brocas y holguras: tablas estándar de maquinista (Machinery's Handbook); valores de proceso: práctica común de equipos FRC. Verifica con tu proveedor y fabricante (REV, WCP, Thrifty Bot, SendCutSend).
