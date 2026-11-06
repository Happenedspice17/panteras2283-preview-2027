# Guía FIRST / FRC — Panteras 2283

> Esta guía no incluye fechas ni precios de 2027. Las fechas exactas se confirman en firstinspires.org; los precios cambian cada temporada.

Leyenda: **Oficial FIRST** = fuente oficial de FIRST o software soportado por FIRST. **Comunidad** = proveedor externo, foro o herramienta no oficial.

## 1. FIRST oficial

Fuentes oficiales de FIRST. Las reglas, el registro y los resultados oficiales viven aquí.

### [FIRST (firstinspires.org)](https://www.firstinspires.org) — **Oficial FIRST**

- **URL:** https://www.firstinspires.org
- **Para qué sirve:** Portal principal de FIRST: programas, temporada, reglas y materiales del juego.
- **Cuándo usarlo:** Al inicio de temporada y cada vez que salga una actualización del juego.
- **Tip:** En la página "Game and Season Materials" están el manual del juego y sus actualizaciones. Anota la fecha de la versión del manual que usa el equipo.

### [FIRST Dashboard](https://dashboard.firstinspires.org) — **Oficial FIRST**

- **URL:** https://dashboard.firstinspires.org
- **Para qué sirve:** Registro del equipo, pagos, consentimientos y Youth Protection, roster y envío de Impact, Woodie Flowers y Dean's List.
- **Cuándo usarlo:** Registro y consentimientos antes del kickoff; envíos de premios según la fecha de cierre de cada uno.
- **Tip:** Cada alumno menor necesita consentimiento del tutor. Forja no activa a un menor como alumno o líder sin ese consentimiento, así que haz ambos registros juntos.

### [FRC Q&A](https://frc-qa.firstinspires.org) — **Oficial FIRST**

- **URL:** https://frc-qa.firstinspires.org
- **Para qué sirve:** Preguntas oficiales sobre reglas, respondidas por FIRST.
- **Cuándo usarlo:** Cuando una regla no sea clara para tu diseño o estrategia, antes de construir.
- **Tip:** Busca primero. Si la respuesta ya existe, cítala por su número. Pregunta sobre la situación concreta, no sobre la estrategia.

### [FRC Events](https://frc-events.firstinspires.org) — **Oficial FIRST**

- **URL:** https://frc-events.firstinspires.org
- **Para qué sirve:** Eventos, equipos inscritos, resultados oficiales y rankings.
- **Cuándo usarlo:** Durante las competencias y para revisar rivales antes de cada partido.
- **Tip:** Son los resultados oficiales. Si un análisis depende de ellos, verifica la cifra aquí antes de publicarla.

### [FRC Events API](https://frc-events.firstinspires.org) — **Oficial FIRST**

- **URL:** https://frc-events.firstinspires.org
- **Para qué sirve:** Acceso programático a eventos, partidos y rankings.
- **Cuándo usarlo:** Cuando quieras automatizar un reporte de scouting o un tablero.
- **Tip:** Requiere credenciales. Guárdalas fuera del repositorio y nunca en el código.
- **Nota:** La documentación de la API se encuentra desde el portal de FRC Events; URL exacta no verificada.

### [FIRST Youth Protection Program](https://www.firstinspires.org) — **Oficial FIRST**

- **URL:** https://www.firstinspires.org
- **Para qué sirve:** Políticas y capacitación de protección a menores que aplican a todo adulto del equipo.
- **Cuándo usarlo:** Antes de que un adulto tenga contacto con alumnos: mentores, coaches y voluntarios.
- **Tip:** Mentores y coaches deben completar la capacitación antes de su primera sesión con alumnos. El seguimiento se hace desde el Dashboard.
- **Nota:** Entra desde firstinspires.org; URL exacta de la sección no verificada.

### [Volunteer (FIRST)](https://volunteer.firstinspires.org) — **Oficial FIRST**

- **URL:** https://volunteer.firstinspires.org
- **Para qué sirve:** Registro de voluntarios para eventos FIRST.
- **Cuándo usarlo:** Cuando un adulto del equipo quiera apoyar un evento como voluntario.
- **Tip:** Revisa con tu coach quién va a cada evento antes de registrarse.

### [Blog de FRC](https://community.firstinspires.org) — **Oficial FIRST**

- **URL:** https://community.firstinspires.org
- **Para qué sirve:** Anuncios y artículos del programa FRC.
- **Cuándo usarlo:** Al inicio de temporada y cuando salgan cambios de reglas o fechas.
- **Tip:** Anota los anuncios que cambien fechas o reglas y compártelos en la junta del equipo.
- **Nota:** Ubicación exacta del blog no verificada; el dominio raíz es el punto de partida.

### [Kit of Parts y FIRST Choice](https://www.firstinspires.org) — **Oficial FIRST**

- **URL:** https://www.firstinspires.org
- **Para qué sirve:** Kit of Parts: piezas que FIRST entrega cada temporada. FIRST Choice: programa de selección de componentes adicionales.
- **Cuándo usarlo:** Al inicio de temporada, al planear el BOM.
- **Tip:** Antes de pedir piezas, revisa el Kit of Parts y registra lo que ya tienes en el BOM de Forja para no comprar de más.
- **Nota:** Las condiciones de FIRST Choice se publican por temporada; URL exacta no verificada.

### [Virtual Kit y vouchers](https://www.firstinspires.org) — **Oficial FIRST**

- **URL:** https://www.firstinspires.org
- **Para qué sirve:** Kit virtual de software y recursos, y vouchers de compra de piezas que FIRST publique cada temporada.
- **Cuándo usarlo:** Cuando haya que comprar piezas o licencias para el equipo.
- **Tip:** Los vouchers tienen fecha límite y condiciones. Anota la fecha en el Calendario de Forja.
- **Nota:** Disponibilidad y condiciones dependen de cada temporada; URL exacta no verificada.

### [FIRST México](https://www.firstinspires.org) — **Oficial FIRST**

- **URL:** https://www.firstinspires.org
- **Para qué sirve:** Información regional en español: eventos y contacto para equipos mexicanos.
- **Cuándo usarlo:** Al planear eventos regionales.
- **Tip:** Pregunta a tu coach qué canal regional usa el equipo para avisos.
- **Nota:** Ubicar la sección de México dentro de firstinspires.org; URL exacta no verificada.

## 2. Software oficial o soportado

Herramientas que FIRST soporta para programar y operar el robot.

### [WPILib (docs.wpilib.org)](https://docs.wpilib.org) — **Oficial FIRST**

- **URL:** https://docs.wpilib.org
- **Para qué sirve:** Programación del robot (Java, C++ y Python), instalación de VS Code con WPILib, Driver Station, imaging del roboRIO, y librerías RevLib y Phoenix.
- **Cuándo usarlo:** Desde la instalación del entorno de programación hasta cada actualización de librerías.
- **Tip:** Instala la misma versión de WPILib en todas las laptops del equipo y fíjala en el proyecto. Versiones distintas causan errores difíciles de rastrear.
- **Nota:** Soportado oficialmente para FRC; lo desarrolla WPI junto con FIRST.

### [NI FRC Game Tools](https://www.ni.com) — **Oficial FIRST**

- **URL:** https://www.ni.com
- **Para qué sirve:** Herramientas de NI para el roboRIO: imaging, firmware y utilidades de conexión.
- **Cuándo usarlo:** Al configurar un roboRIO nuevo o al actualizar firmware antes de un evento.
- **Tip:** Usa la versión que indique la temporada. No actualices firmware la semana del evento sin probarlo antes.
- **Nota:** Busca "FRC Game Tools" en ni.com; URL exacta no verificada.

### [Driver Station](https://docs.wpilib.org) — **Oficial FIRST**

- **URL:** https://docs.wpilib.org
- **Para qué sirve:** Control del robot en pruebas y competencia; muestra estado de conexión y registros.
- **Cuándo usarlo:** En cada práctica y en competencia, antes de cada partido.
- **Tip:** Antes de cada partido verifica que el Driver Station muestre comunicación y código del robot listos, y prueba el control de todos los sistemas.
- **Nota:** Se instala con WPILib o con FRC Game Tools según la temporada.

## 3. Diseño en Onshape

Onshape es un proveedor externo, no oficial de FIRST. Estas herramientas se usan para el diseño CAD del equipo.

### [Onshape for Education](https://www.onshape.com) — Comunidad

- **URL:** https://www.onshape.com
- **Para qué sirve:** Plan educativo gratuito de Onshape para estudiantes y equipos.
- **Cuándo usarlo:** Al dar de alta a cada alumno que vaya a diseñar.
- **Tip:** Crea la cuenta educativa de cada alumno con un correo que el equipo pueda controlar. Revisa las condiciones vigentes del programa para equipos.
- **Nota:** Proveedor externo. Confirma que el programa educativo siga vigente y aplique a equipos FRC; sección exacta no verificada.

### [Onshape Learn (learn.onshape.com)](https://learn.onshape.com) — Comunidad

- **URL:** https://learn.onshape.com
- **Para qué sirve:** Cursos gratuitos de Onshape: modelado de piezas, ensambles y planos.
- **Cuándo usarlo:** Para alumnos nuevos, antes de su primer diseño.
- **Tip:** Pide a los alumnos nuevos el curso básico de Part Studios y ensambles antes de tocar el documento maestro.

### FRCDesignLib — Comunidad

- **Para qué sirve:** Librería de piezas comerciales de FRC (motores, ruedas, perfiles) para Onshape.
- **Cuándo usarlo:** Al diseñar un subsistema que use piezas del kit o comerciales.
- **Tip:** Importa las piezas de la librería en vez de modelarlas. Así las medidas coinciden con el catálogo del proveedor.
- **Nota:** URL exacta no verificada. Busca "FRCDesignLib" dentro de Onshape (documentos públicos).

### MKCad — Comunidad

- **Para qué sirve:** Librería de piezas comerciales de FRC para Onshape, similar a FRCDesignLib.
- **Cuándo usarlo:** Mismo caso que FRCDesignLib.
- **Tip:** Compara piezas de ambas librerías antes de elegir y usa la que tenga el modelo exacto que compraste.
- **Nota:** URL exacta no verificada. Busca "MKCad" dentro de Onshape.

### Organizar el documento en Onshape

- Un Part Studio por subsistema (chasis, brazo, intake, etc.).
- Un ensamble maestro que solo referencie subsistemas, sin piezas sueltas.
- Antes de un cambio grande, crea una versión con nombre en Onshape para poder volver atrás.
- Usa branches para probar ideas y integra solo lo que pase la revisión del equipo.
- Exporta el BOM del ensamble maestro a CSV e impórtalo en Forja (página BOM, /bom).

## 4. Comunidad y datos

No son oficiales de FIRST. Son útiles para análisis y aprendizaje, pero las reglas y los resultados oficiales están en el grupo 1.

### [The Blue Alliance](https://www.thebluealliance.com) — Comunidad

- **URL:** https://www.thebluealliance.com
- **Para qué sirve:** Resultados, partidos, rankings y estadísticas por equipo y por evento.
- **Cuándo usarlo:** En scouting, preparación de partidos y análisis después de cada evento.
- **Tip:** Compara con FRC Events antes de publicar cifras oficiales.

### [Statbotics](https://www.statbotics.io) — Comunidad

- **URL:** https://www.statbotics.io
- **Para qué sirve:** Estadísticas y predicciones de desempeño por equipo y por evento.
- **Cuándo usarlo:** Al seleccionar alianzas y definir estrategia en eventos.
- **Tip:** Las predicciones son estimaciones. Úsalas como referencia, no como verdad.

### [Chief Delphi](https://www.chiefdelphi.com) — Comunidad

- **URL:** https://www.chiefdelphi.com
- **Para qué sirve:** Foro de la comunidad FRC: dudas técnicas, ideas de diseño y experiencias de otros equipos.
- **Cuándo usarlo:** Cuando tengas una duda técnica o quieras ver cómo resolvieron otros equipos un problema.
- **Tip:** Busca antes de preguntar. No publiques datos personales ni de alumnos menores.

### FRC Discord — Comunidad

- **Para qué sirve:** Chat de la comunidad FRC en tiempo real.
- **Cuándo usarlo:** Consultas rápidas durante la temporada.
- **Tip:** Pide la invitación a tu coach. Los alumnos menores siguen las reglas de contacto del equipo.
- **Nota:** Sin URL fija verificada; la invitación la comparte el equipo o la comunidad.

### The Open Alliance — Comunidad

- **Para qué sirve:** Documentación pública de equipos: diseño, código y procesos.
- **Cuándo usarlo:** Para ver ejemplos de documentación técnica o de programación.
- **Tip:** Empieza por equipos con resultados parecidos a los tuyos.
- **Nota:** URL exacta no verificada. Busca "The Open Alliance" en Chief Delphi.

### [FRCDesign.org](https://www.frcdesign.org) — Comunidad

- **URL:** https://www.frcdesign.org
- **Para qué sirve:** Recursos de diseño mecánico para FRC.
- **Cuándo usarlo:** Al empezar un subsistema nuevo.
- **Tip:** Úsalo como guía de prácticas, no como reglas. Verifica que el contenido esté vigente.

### [AndyMark](https://www.andymark.com) — Comunidad

- **URL:** https://www.andymark.com
- **Para qué sirve:** Tienda de piezas FRC: ruedas, motores y perfiles.
- **Cuándo usarlo:** Al pedir piezas del BOM.
- **Tip:** Compara precio y tiempo de envío con otros proveedores y registra el proveedor elegido en el BOM.

### [REV Robotics](https://www.revrobotics.com) — Comunidad

- **URL:** https://www.revrobotics.com
- **Para qué sirve:** Motores, controladores y sensores REV, con su documentación de hardware.
- **Cuándo usarlo:** Al integrar hardware REV.
- **Tip:** Usa la documentación del fabricante y revisa la versión de firmware antes de cada evento.

### [West Coast Products (WCP)](https://www.wcproducts.com) — Comunidad

- **URL:** https://www.wcproducts.com
- **Para qué sirve:** Piezas de chasis, ruedas y tracción.
- **Cuándo usarlo:** Al pedir piezas del BOM.
- **Tip:** Revisa las medidas en el sitio antes de rediseñar una pieza.

### [CTRE](https://www.ctr-electronics.com) — Comunidad

- **URL:** https://www.ctr-electronics.com
- **Para qué sirve:** Controladores Phoenix y documentación de motores CTRE.
- **Cuándo usarlo:** Al integrar hardware CTRE.
- **Tip:** La versión de Phoenix debe ser compatible con la de WPILib. Revísalo al actualizar.

### [Binders de Spectrum 3847 y 254 Tech](https://www.team254.com) — Comunidad

- **URL:** https://www.team254.com
- **Para qué sirve:** Documentación técnica de equipos de alto nivel: diseño, procesos y programación.
- **Cuándo usarlo:** Para aprender prácticas de ingeniería y de organización del equipo.
- **Tip:** Son referencia. Adapta las ideas a tus recursos en vez de copiar diseños.
- **Nota:** El binder de Spectrum 3847 tiene URL no verificada; la de 254 Tech es el sitio del equipo.

## 5. Calendario clave de la temporada

Resumen de hitos. Las fechas exactas se confirman en firstinspires.org y se registran en la página Calendario de Forja.

### Kickoff (enero) — **Oficial FIRST**

- **Para qué sirve:** Inicio oficial de la temporada: se publica el juego.
- **Cuándo usarlo:** Enero. Confirma la fecha en firstinspires.org.
- **Tip:** Ten listo el arranque: revisa el manual en cuanto se publique.

### Cierres de Impact, Woodie Flowers y Dean's List — **Oficial FIRST**

- **Para qué sirve:** Fechas límite para enviar las postulaciones de premios en el Dashboard.
- **Cuándo usarlo:** Durante la temporada, según cada premio.
- **Tip:** Empieza las postulaciones antes del cierre; los textos requieren revisión del equipo.

### Week Zero — **Oficial FIRST**

- **Para qué sirve:** Periodo de arranque previo a las semanas de competencia.
- **Cuándo usarlo:** Confirma las fechas en firstinspires.org.
- **Tip:** Úsalo para cerrar el diseño inicial y el BOM antes de las semanas de competencia.

### Semanas 1 a 7 — **Oficial FIRST**

- **Para qué sirve:** Eventos regionales y distritales de la temporada.
- **Cuándo usarlo:** Según el calendario oficial de cada evento.
- **Tip:** Revisa el robot después de cada evento y registra los pendientes en el calendario de Forja.

### Championship — **Oficial FIRST**

- **Para qué sirve:** Evento final de la temporada.
- **Cuándo usarlo:** Según la fecha oficial de FIRST.
- **Tip:** Calcula las fechas de trabajo hacia atrás desde esta fecha.

Ver también: [Ver el calendario de Forja](/calendario) (ruta dentro de Forja).
