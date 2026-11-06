export interface Recurso {
  nombre: string
  url?: string
  oficial: boolean
  para: string
  cuando: string
  tip: string
  nota?: string
}

export interface Grupo {
  id: string
  titulo: string
  intro: string
  recursos: Recurso[]
  consejos?: string[]
  enlace?: { to: string; texto: string }
}

export const AVISO_FECHAS = 'Esta guía no incluye fechas ni precios de 2027. Las fechas exactas se confirman en firstinspires.org; los precios cambian cada temporada.'

export const GRUPOS: Grupo[] = [
  {
    id: 'first',
    titulo: '1. FIRST oficial',
    intro: 'Fuentes oficiales de FIRST. Las reglas, el registro y los resultados oficiales viven aquí.',
    recursos: [
      {
        nombre: 'FIRST (firstinspires.org)',
        url: 'https://www.firstinspires.org',
        oficial: true,
        para: 'Portal principal de FIRST: programas, temporada, reglas y materiales del juego.',
        cuando: 'Al inicio de temporada y cada vez que salga una actualización del juego.',
        tip: 'En la página "Game and Season Materials" están el manual del juego y sus actualizaciones. Anota la fecha de la versión del manual que usa el equipo.',
      },
      {
        nombre: 'FIRST Dashboard',
        url: 'https://dashboard.firstinspires.org',
        oficial: true,
        para: 'Registro del equipo, pagos, consentimientos y Youth Protection, roster y envío de Impact, Woodie Flowers y Dean\'s List.',
        cuando: 'Registro y consentimientos antes del kickoff; envíos de premios según la fecha de cierre de cada uno.',
        tip: 'Cada alumno menor necesita consentimiento del tutor. Forja no activa a un menor como alumno o líder sin ese consentimiento, así que haz ambos registros juntos.',
      },
      {
        nombre: 'FRC Q&A',
        url: 'https://frc-qa.firstinspires.org',
        oficial: true,
        para: 'Preguntas oficiales sobre reglas, respondidas por FIRST.',
        cuando: 'Cuando una regla no sea clara para tu diseño o estrategia, antes de construir.',
        tip: 'Busca primero. Si la respuesta ya existe, cítala por su número. Pregunta sobre la situación concreta, no sobre la estrategia.',
      },
      {
        nombre: 'FRC Events',
        url: 'https://frc-events.firstinspires.org',
        oficial: true,
        para: 'Eventos, equipos inscritos, resultados oficiales y rankings.',
        cuando: 'Durante las competencias y para revisar rivales antes de cada partido.',
        tip: 'Son los resultados oficiales. Si un análisis depende de ellos, verifica la cifra aquí antes de publicarla.',
      },
      {
        nombre: 'FRC Events API',
        url: 'https://frc-events.firstinspires.org',
        oficial: true,
        para: 'Acceso programático a eventos, partidos y rankings.',
        cuando: 'Cuando quieras automatizar un reporte de scouting o un tablero.',
        tip: 'Requiere credenciales. Guárdalas fuera del repositorio y nunca en el código.',
        nota: 'La documentación de la API se encuentra desde el portal de FRC Events; URL exacta no verificada.',
      },
      {
        nombre: 'FIRST Youth Protection Program',
        url: 'https://www.firstinspires.org',
        oficial: true,
        para: 'Políticas y capacitación de protección a menores que aplican a todo adulto del equipo.',
        cuando: 'Antes de que un adulto tenga contacto con alumnos: mentores, coaches y voluntarios.',
        tip: 'Mentores y coaches deben completar la capacitación antes de su primera sesión con alumnos. El seguimiento se hace desde el Dashboard.',
        nota: 'Entra desde firstinspires.org; URL exacta de la sección no verificada.',
      },
      {
        nombre: 'Volunteer (FIRST)',
        url: 'https://volunteer.firstinspires.org',
        oficial: true,
        para: 'Registro de voluntarios para eventos FIRST.',
        cuando: 'Cuando un adulto del equipo quiera apoyar un evento como voluntario.',
        tip: 'Revisa con tu coach quién va a cada evento antes de registrarse.',
      },
      {
        nombre: 'Blog de FRC',
        url: 'https://community.firstinspires.org',
        oficial: true,
        para: 'Anuncios y artículos del programa FRC.',
        cuando: 'Al inicio de temporada y cuando salgan cambios de reglas o fechas.',
        tip: 'Anota los anuncios que cambien fechas o reglas y compártelos en la junta del equipo.',
        nota: 'Ubicación exacta del blog no verificada; el dominio raíz es el punto de partida.',
      },
      {
        nombre: 'Kit of Parts y FIRST Choice',
        url: 'https://www.firstinspires.org',
        oficial: true,
        para: 'Kit of Parts: piezas que FIRST entrega cada temporada. FIRST Choice: programa de selección de componentes adicionales.',
        cuando: 'Al inicio de temporada, al planear el BOM.',
        tip: 'Antes de pedir piezas, revisa el Kit of Parts y registra lo que ya tienes en el BOM de Forja para no comprar de más.',
        nota: 'Las condiciones de FIRST Choice se publican por temporada; URL exacta no verificada.',
      },
      {
        nombre: 'Virtual Kit y vouchers',
        url: 'https://www.firstinspires.org',
        oficial: true,
        para: 'Kit virtual de software y recursos, y vouchers de compra de piezas que FIRST publique cada temporada.',
        cuando: 'Cuando haya que comprar piezas o licencias para el equipo.',
        tip: 'Los vouchers tienen fecha límite y condiciones. Anota la fecha en el Calendario de Forja.',
        nota: 'Disponibilidad y condiciones dependen de cada temporada; URL exacta no verificada.',
      },
      {
        nombre: 'FIRST México',
        url: 'https://www.firstinspires.org',
        oficial: true,
        para: 'Información regional en español: eventos y contacto para equipos mexicanos.',
        cuando: 'Al planear eventos regionales.',
        tip: 'Pregunta a tu coach qué canal regional usa el equipo para avisos.',
        nota: 'Ubicar la sección de México dentro de firstinspires.org; URL exacta no verificada.',
      },
    ],
  },
  {
    id: 'software',
    titulo: '2. Software oficial o soportado',
    intro: 'Herramientas que FIRST soporta para programar y operar el robot.',
    recursos: [
      {
        nombre: 'WPILib (docs.wpilib.org)',
        url: 'https://docs.wpilib.org',
        oficial: true,
        para: 'Programación del robot (Java, C++ y Python), instalación de VS Code con WPILib, Driver Station, imaging del roboRIO, y librerías RevLib y Phoenix.',
        cuando: 'Desde la instalación del entorno de programación hasta cada actualización de librerías.',
        tip: 'Instala la misma versión de WPILib en todas las laptops del equipo y fíjala en el proyecto. Versiones distintas causan errores difíciles de rastrear.',
        nota: 'Soportado oficialmente para FRC; lo desarrolla WPI junto con FIRST.',
      },
      {
        nombre: 'NI FRC Game Tools',
        url: 'https://www.ni.com',
        oficial: true,
        para: 'Herramientas de NI para el roboRIO: imaging, firmware y utilidades de conexión.',
        cuando: 'Al configurar un roboRIO nuevo o al actualizar firmware antes de un evento.',
        tip: 'Usa la versión que indique la temporada. No actualices firmware la semana del evento sin probarlo antes.',
        nota: 'Busca "FRC Game Tools" en ni.com; URL exacta no verificada.',
      },
      {
        nombre: 'Driver Station',
        url: 'https://docs.wpilib.org',
        oficial: true,
        para: 'Control del robot en pruebas y competencia; muestra estado de conexión y registros.',
        cuando: 'En cada práctica y en competencia, antes de cada partido.',
        tip: 'Antes de cada partido verifica que el Driver Station muestre comunicación y código del robot listos, y prueba el control de todos los sistemas.',
        nota: 'Se instala con WPILib o con FRC Game Tools según la temporada.',
      },
    ],
  },
  {
    id: 'onshape',
    titulo: '3. Diseño en Onshape',
    intro: 'Onshape es un proveedor externo, no oficial de FIRST. Estas herramientas se usan para el diseño CAD del equipo.',
    recursos: [
      {
        nombre: 'Onshape for Education',
        url: 'https://www.onshape.com',
        oficial: false,
        para: 'Plan educativo gratuito de Onshape para estudiantes y equipos.',
        cuando: 'Al dar de alta a cada alumno que vaya a diseñar.',
        tip: 'Crea la cuenta educativa de cada alumno con un correo que el equipo pueda controlar. Revisa las condiciones vigentes del programa para equipos.',
        nota: 'Proveedor externo. Confirma que el programa educativo siga vigente y aplique a equipos FRC; sección exacta no verificada.',
      },
      {
        nombre: 'Onshape Learn (learn.onshape.com)',
        url: 'https://learn.onshape.com',
        oficial: false,
        para: 'Cursos gratuitos de Onshape: modelado de piezas, ensambles y planos.',
        cuando: 'Para alumnos nuevos, antes de su primer diseño.',
        tip: 'Pide a los alumnos nuevos el curso básico de Part Studios y ensambles antes de tocar el documento maestro.',
      },
      {
        nombre: 'FRCDesignLib',
        oficial: false,
        para: 'Librería de piezas comerciales de FRC (motores, ruedas, perfiles) para Onshape.',
        cuando: 'Al diseñar un subsistema que use piezas del kit o comerciales.',
        tip: 'Importa las piezas de la librería en vez de modelarlas. Así las medidas coinciden con el catálogo del proveedor.',
        nota: 'URL exacta no verificada. Busca "FRCDesignLib" dentro de Onshape (documentos públicos).',
      },
      {
        nombre: 'MKCad',
        oficial: false,
        para: 'Librería de piezas comerciales de FRC para Onshape, similar a FRCDesignLib.',
        cuando: 'Mismo caso que FRCDesignLib.',
        tip: 'Compara piezas de ambas librerías antes de elegir y usa la que tenga el modelo exacto que compraste.',
        nota: 'URL exacta no verificada. Busca "MKCad" dentro de Onshape.',
      },
    ],
    consejos: [
      'Un Part Studio por subsistema (chasis, brazo, intake, etc.).',
      'Un ensamble maestro que solo referencie subsistemas, sin piezas sueltas.',
      'Antes de un cambio grande, crea una versión con nombre en Onshape para poder volver atrás.',
      'Usa branches para probar ideas y integra solo lo que pase la revisión del equipo.',
      'Exporta el BOM del ensamble maestro a CSV e impórtalo en Forja (página BOM, /bom).',
    ],
  },
  {
    id: 'comunidad',
    titulo: '4. Comunidad y datos',
    intro: 'No son oficiales de FIRST. Son útiles para análisis y aprendizaje, pero las reglas y los resultados oficiales están en el grupo 1.',
    recursos: [
      {
        nombre: 'The Blue Alliance',
        url: 'https://www.thebluealliance.com',
        oficial: false,
        para: 'Resultados, partidos, rankings y estadísticas por equipo y por evento.',
        cuando: 'En scouting, preparación de partidos y análisis después de cada evento.',
        tip: 'Compara con FRC Events antes de publicar cifras oficiales.',
      },
      {
        nombre: 'Statbotics',
        url: 'https://www.statbotics.io',
        oficial: false,
        para: 'Estadísticas y predicciones de desempeño por equipo y por evento.',
        cuando: 'Al seleccionar alianzas y definir estrategia en eventos.',
        tip: 'Las predicciones son estimaciones. Úsalas como referencia, no como verdad.',
      },
      {
        nombre: 'Chief Delphi',
        url: 'https://www.chiefdelphi.com',
        oficial: false,
        para: 'Foro de la comunidad FRC: dudas técnicas, ideas de diseño y experiencias de otros equipos.',
        cuando: 'Cuando tengas una duda técnica o quieras ver cómo resolvieron otros equipos un problema.',
        tip: 'Busca antes de preguntar. No publiques datos personales ni de alumnos menores.',
      },
      {
        nombre: 'FRC Discord',
        oficial: false,
        para: 'Chat de la comunidad FRC en tiempo real.',
        cuando: 'Consultas rápidas durante la temporada.',
        tip: 'Pide la invitación a tu coach. Los alumnos menores siguen las reglas de contacto del equipo.',
        nota: 'Sin URL fija verificada; la invitación la comparte el equipo o la comunidad.',
      },
      {
        nombre: 'The Open Alliance',
        oficial: false,
        para: 'Documentación pública de equipos: diseño, código y procesos.',
        cuando: 'Para ver ejemplos de documentación técnica o de programación.',
        tip: 'Empieza por equipos con resultados parecidos a los tuyos.',
        nota: 'URL exacta no verificada. Busca "The Open Alliance" en Chief Delphi.',
      },
      {
        nombre: 'FRCDesign.org',
        url: 'https://www.frcdesign.org',
        oficial: false,
        para: 'Recursos de diseño mecánico para FRC.',
        cuando: 'Al empezar un subsistema nuevo.',
        tip: 'Úsalo como guía de prácticas, no como reglas. Verifica que el contenido esté vigente.',
      },
      {
        nombre: 'AndyMark',
        url: 'https://www.andymark.com',
        oficial: false,
        para: 'Tienda de piezas FRC: ruedas, motores y perfiles.',
        cuando: 'Al pedir piezas del BOM.',
        tip: 'Compara precio y tiempo de envío con otros proveedores y registra el proveedor elegido en el BOM.',
      },
      {
        nombre: 'REV Robotics',
        url: 'https://www.revrobotics.com',
        oficial: false,
        para: 'Motores, controladores y sensores REV, con su documentación de hardware.',
        cuando: 'Al integrar hardware REV.',
        tip: 'Usa la documentación del fabricante y revisa la versión de firmware antes de cada evento.',
      },
      {
        nombre: 'West Coast Products (WCP)',
        url: 'https://www.wcproducts.com',
        oficial: false,
        para: 'Piezas de chasis, ruedas y tracción.',
        cuando: 'Al pedir piezas del BOM.',
        tip: 'Revisa las medidas en el sitio antes de rediseñar una pieza.',
      },
      {
        nombre: 'CTRE',
        url: 'https://www.ctr-electronics.com',
        oficial: false,
        para: 'Controladores Phoenix y documentación de motores CTRE.',
        cuando: 'Al integrar hardware CTRE.',
        tip: 'La versión de Phoenix debe ser compatible con la de WPILib. Revísalo al actualizar.',
      },
      {
        nombre: 'Binders de Spectrum 3847 y 254 Tech',
        url: 'https://www.team254.com',
        oficial: false,
        para: 'Documentación técnica de equipos de alto nivel: diseño, procesos y programación.',
        cuando: 'Para aprender prácticas de ingeniería y de organización del equipo.',
        tip: 'Son referencia. Adapta las ideas a tus recursos en vez de copiar diseños.',
        nota: 'El binder de Spectrum 3847 tiene URL no verificada; la de 254 Tech es el sitio del equipo.',
      },
    ],
  },
  {
    id: 'calendario',
    titulo: '5. Calendario clave de la temporada',
    intro: 'Resumen de hitos. Las fechas exactas se confirman en firstinspires.org y se registran en la página Calendario de Forja.',
    recursos: [
      {
        nombre: 'Kickoff (enero)',
        oficial: true,
        para: 'Inicio oficial de la temporada: se publica el juego.',
        cuando: 'Enero. Confirma la fecha en firstinspires.org.',
        tip: 'Ten listo el arranque: revisa el manual en cuanto se publique.',
      },
      {
        nombre: 'Cierres de Impact, Woodie Flowers y Dean\'s List',
        oficial: true,
        para: 'Fechas límite para enviar las postulaciones de premios en el Dashboard.',
        cuando: 'Durante la temporada, según cada premio.',
        tip: 'Empieza las postulaciones antes del cierre; los textos requieren revisión del equipo.',
      },
      {
        nombre: 'Week Zero',
        oficial: true,
        para: 'Periodo de arranque previo a las semanas de competencia.',
        cuando: 'Confirma las fechas en firstinspires.org.',
        tip: 'Úsalo para cerrar el diseño inicial y el BOM antes de las semanas de competencia.',
      },
      {
        nombre: 'Semanas 1 a 7',
        oficial: true,
        para: 'Eventos regionales y distritales de la temporada.',
        cuando: 'Según el calendario oficial de cada evento.',
        tip: 'Revisa el robot después de cada evento y registra los pendientes en el calendario de Forja.',
      },
      {
        nombre: 'Championship',
        oficial: true,
        para: 'Evento final de la temporada.',
        cuando: 'Según la fecha oficial de FIRST.',
        tip: 'Calcula las fechas de trabajo hacia atrás desde esta fecha.',
      },
    ],
    enlace: { to: '/calendario', texto: 'Ver el calendario de Forja' },
  },
]
