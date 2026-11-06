-- Plan de pretemporada: 5 áreas x 3 niveles x 4 prácticas (60 filas).
-- Rúbrica: un criterio por línea. Recursos: 'Título | URL' por línea.
-- Idempotente: reemplaza solo prácticas con el mismo area/level/week/title.
insert into practices (area, level, week, title, objective, deliverable, rubric, resources) values
  ('estrategia', 'basico', 1, 'Lectura guiada del manual del juego', 'Entender reglas de puntuación, ciclos de partido y restricciones del robot.', 'Resumen de 1 página con puntos por acción, fases del partido y 5 reglas críticas.', 'Cita la sección del manual de cada regla
Incluye valores de puntos correctos
Identifica al menos 3 penalizaciones (faltas) frecuentes
Redacción propia, sin copiar texto literal', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
FRC Q&A (preguntas al manual) | https://frc-qa.firstinspires.org/
FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('estrategia', 'basico', 2, 'Matriz de ciclos y puntos', 'Estimar cuántos puntos vale cada acción por segundo de partido.', 'Hoja de cálculo con acciones, tiempo estimado por ciclo y puntos por ciclo.', 'Al menos 6 acciones analizadas
Tiempos justificados (video o cálculo)
Orden de acciones de mayor a menor valor
Conclusión de 3 líneas', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
The Blue Alliance | https://www.thebluealliance.com/'),
  ('estrategia', 'basico', 3, 'Introducción a The Blue Alliance', 'Aprender a consultar equipos, eventos y resultados históricos.', 'Ficha de 3 equipos referentes con su desempeño en la temporada pasada.', 'Datos tomados de The Blue Alliance
Incluye ranking y OPR/EPA de cada equipo
Explica qué hace bien cada equipo
Enlaces a los eventos consultados', 'The Blue Alliance | https://www.thebluealliance.com/
Statbotics | https://www.statbotics.io/'),
  ('estrategia', 'basico', 4, 'Roles del equipo de competencia', 'Conocer los roles del drive team y del pit crew.', 'Tabla de roles (driver, operator, coach, human player, pit) con responsabilidades.', 'Define responsabilidades claras por rol
Incluye reglas de elegibilidad del manual
Propone criterio de selección
Canal de comunicación en partido definido', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
FRC Docs | https://frc-docs.readthedocs.io/'),
  ('estrategia', 'intermedio', 1, 'Análisis de partidos con Statbotics', 'Usar métricas EPA para comparar equipos y entender el nivel del evento.', 'Informe de 2 páginas con top 10 de un evento previo y qué los distingue.', 'Usa EPA/OPR con fuente
Compara al menos 3 mecanismos
Identifica tendencias de estrategia
Recomendación aplicable a nuestro robot', 'Statbotics | https://www.statbotics.io/
The Blue Alliance | https://www.thebluealliance.com/'),
  ('estrategia', 'intermedio', 2, 'Diseño de hoja de scouting', 'Definir qué datos capturar de cada partido de forma rápida y consistente.', 'Formato de scouting (papel o digital) probado con 2 partidos grabados.', 'Máximo 12 campos capturables en un partido
Campos objetivos (conteos, no opiniones)
Probado con video real
Instrucciones para el scout', 'The Blue Alliance | https://www.thebluealliance.com/
Statbotics | https://www.statbotics.io/
Chief Delphi | https://www.chiefdelphi.com/'),
  ('estrategia', 'intermedio', 3, 'Priorización de mecanismos', 'Decidir qué mecanismos construir con una matriz de decisión ponderada.', 'Matriz de decisión con criterios ponderados y recomendación final.', 'Criterios y pesos justificados
Al menos 4 alternativas evaluadas
Incluye riesgo y costo
Decisión documentada para la minuta', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
Chief Delphi | https://www.chiefdelphi.com/'),
  ('estrategia', 'intermedio', 4, 'Estrategia de alianza y autónomo', 'Planear rutinas de autónomo y roles de alianza según el juego.', 'Documento con 3 rutinas de autónomo y plan de alianza (primera, segunda, tercera selección).', 'Cada autónomo con puntos esperados
Riesgos y plan B
Compatibilidad con otros robots
Trazas dibujadas sobre el campo', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
FRC Q&A (preguntas al manual) | https://frc-qa.firstinspires.org/'),
  ('estrategia', 'avanzado', 1, 'Simulación de ranking y selecciones', 'Estimar probabilidades de ranking y construir lista de selección.', 'Modelo en hoja de cálculo con probabilidad de clasificar y lista priorizada de 24 equipos.', 'Usa datos reales de Statbotics/TBA
Supuestos explícitos
Lista justificada por complementariedad
Proceso reproducible por otro miembro', 'Statbotics | https://www.statbotics.io/
The Blue Alliance | https://www.thebluealliance.com/'),
  ('estrategia', 'avanzado', 2, 'Tablero de scouting en evento', 'Operar el scouting completo durante un evento.', 'Base de datos de scouting con al menos 30 partidos y resumen por equipo.', 'Datos completos y sin duplicados
Resumen visual por equipo
Verificación cruzada con TBA
Reporte listo antes de selecciones', 'The Blue Alliance | https://www.thebluealliance.com/
Statbotics | https://www.statbotics.io/'),
  ('estrategia', 'avanzado', 3, 'Entrenamiento del drive team', 'Diseñar un plan de práctica con métricas de desempeño.', 'Plan de 4 sesiones con tiempos de ciclo medidos y mejoras registradas.', 'Metas de tiempo por ciclo
Registro de cada sesión
Análisis de errores recurrentes
Mejora medible entre sesión 1 y 4', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
Chief Delphi | https://www.chiefdelphi.com/'),
  ('estrategia', 'avanzado', 4, 'Retrospectiva estratégica', 'Evaluar decisiones de estrategia tras el evento y extraer lecciones.', 'Retrospectiva de 2 páginas con decisiones, resultados y acciones.', 'Datos objetivos de apoyo
Identifica 3 aciertos y 3 errores
Acciones con responsable y fecha
Publicada en la documentación del equipo', 'The Blue Alliance | https://www.thebluealliance.com/
Chief Delphi | https://www.chiefdelphi.com/'),
  ('mecanica', 'basico', 1, 'Primeros pasos en Onshape', 'Dominar la interfaz, sketches y operaciones básicas.', 'Documento de Onshape con 3 piezas simples (placa, soporte, eje) totalmente definidas.', 'Sketches completamente restringidos (negro)
Cotas con nombres claros
Unidades en pulgadas o mm consistentes
Enlace con permisos de lectura para el equipo', 'Onshape Learning Center | https://learn.onshape.com/'),
  ('mecanica', 'basico', 2, 'Part Studio organizado', 'Crear varias piezas en un Part Studio con features ordenados.', 'Part Studio con 4 piezas, features nombrados y variables usadas.', 'Features con nombres descriptivos
Usa al menos 2 variables
Piezas con material asignado
Sin features en error', 'Onshape Learning Center | https://learn.onshape.com/
FRCDesign.org (FRCDesignLib) | https://www.frcdesign.org/'),
  ('mecanica', 'basico', 3, 'Primer ensamble con mates', 'Armar un ensamble usando mates correctos.', 'Assembly de un mecanismo simple con 3+ piezas y mates tipo fastened, revolute y slider.', 'Grados de libertad correctos
Sin piezas flotando (fijar solo la base)
Mates con nombres claros
Movimiento probado con arrastre', 'Onshape Learning Center | https://learn.onshape.com/'),
  ('mecanica', 'basico', 4, 'Seguridad en taller y herramientas', 'Usar de forma segura herramientas manuales y eléctricas.', 'Checklist de seguridad firmado y demostración práctica supervisada.', 'Usa EPP correcto (lentes, calzado)
Identifica riesgos de cada herramienta
Orden y limpieza al terminar
Validado por un adulto responsable', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc
FRC Docs | https://frc-docs.readthedocs.io/'),
  ('mecanica', 'intermedio', 1, 'Piezas COTS con MKCad y FRCDesignLib', 'Insertar componentes comerciales en el diseño sin modelarlos desde cero.', 'Assembly con 6 piezas COTS (perfiles, rodamientos, motores) importadas de MKCad o FRCDesignLib.', 'Parte correcta con SKU identificable
Mates correctos en agujeros de patrón
Sin duplicar modelos innecesarios
Lista de piezas coincide con el ensamble', 'MKCad (piezas COTS para Onshape) | https://www.mkcad.org/
FRCDesign.org (FRCDesignLib) | https://www.frcdesign.org/
Onshape Learning Center | https://learn.onshape.com/'),
  ('mecanica', 'intermedio', 2, 'Dibujos para fabricación', 'Generar dibujos con cotas para piezas maquinadas o cortadas.', 'Drawings en Onshape de 3 piezas con vistas, cotas y tolerancias.', 'Vistas suficientes sin ambigüedad
Cotas completas y legibles
Material y espesor indicados
Exportado a PDF', 'Onshape Learning Center | https://learn.onshape.com/'),
  ('mecanica', 'intermedio', 3, 'Diseño de transmisión y relación de engranes', 'Calcular relaciones y velocidad de salida de un mecanismo.', 'Hoja de cálculo y diseño en Onshape de una caja con relación definida.', 'Cálculos de velocidad y torque
Verificación de distancia entre centros
Motor y límite de corriente justificados
Modelo coincide con el cálculo', 'Documentación REV Robotics | https://docs.revrobotics.com/
FRC Docs | https://frc-docs.readthedocs.io/'),
  ('mecanica', 'intermedio', 4, 'Exportar BOM del diseño', 'Producir una lista de materiales (BOM) confiable para compras.', 'BOM exportada desde Onshape con cantidades, SKU y proveedor.', 'Cantidades coinciden con el ensamble
SKU o enlace por cada parte
Proveedor y costo estimado
Subida al módulo de BOM del equipo', 'Onshape Learning Center | https://learn.onshape.com/
MKCad (piezas COTS para Onshape) | https://www.mkcad.org/'),
  ('mecanica', 'avanzado', 1, 'Diseño de subsistema completo', 'Diseñar un subsistema (intake, elevador o brazo) listo para fabricar.', 'Assembly del subsistema con análisis de carga y dibujos de piezas.', 'Cumple restricciones de tamaño del manual
Análisis de torque/carga documentado
Piezas con dibujos de fabricación
Revisión de diseño aprobada por mentor', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
Onshape Learning Center | https://learn.onshape.com/
FRCDesign.org (FRCDesignLib) | https://www.frcdesign.org/'),
  ('mecanica', 'avanzado', 2, 'Diseño para fabricación y ensamble', 'Reducir piezas y simplificar el armado.', 'Revisión DFM de un subsistema con lista de mejoras aplicadas.', 'Menos piezas o más reutilización
Tolerancias realistas para nuestro taller
Acceso a herramientas para el armado
Comparativa antes/después', 'Onshape Learning Center | https://learn.onshape.com/
Chief Delphi | https://www.chiefdelphi.com/'),
  ('mecanica', 'avanzado', 3, 'Integración y control de versiones en Onshape', 'Gestionar versiones, ramas y cambios del diseño del robot.', 'Documento maestro con versiones nombradas y registro de cambios.', 'Versiones con nombres claros
Uso de ramas para experimentos
Merge sin pérdida de trabajo
Registro de cambios por semana', 'Onshape Learning Center | https://learn.onshape.com/'),
  ('mecanica', 'avanzado', 4, 'Pruebas y mejora mecánica', 'Probar un prototipo, medir y rediseñar.', 'Reporte de prueba con datos medidos y rediseño propuesto.', 'Variables medidas con método claro
Comparación contra el cálculo
Causa raíz de fallas
Rediseño modelado en Onshape', 'Chief Delphi | https://www.chiefdelphi.com/
Documentación REV Robotics | https://docs.revrobotics.com/'),
  ('electronica', 'basico', 1, 'Componentes del sistema de control', 'Identificar roboRIO, PDH, radio, breakers y baterías.', 'Diagrama etiquetado del sistema de control del robot.', 'Todos los componentes principales nombrados
Función de cada componente
Flujo de energía correcto
Referencias a la documentación oficial', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
FRC Docs | https://frc-docs.readthedocs.io/'),
  ('electronica', 'basico', 2, 'Cableado estándar de un tablero', 'Cablear un tablero de práctica siguiendo el esquema oficial.', 'Tablero cableado con PDH, roboRIO, radio y 2 motores, con foto de evidencia.', 'Calibres y breakers correctos
Polaridad correcta
Terminales bien crimpadas
Validado por mentor', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
FRC Docs | https://frc-docs.readthedocs.io/'),
  ('electronica', 'basico', 3, 'Seguridad eléctrica y baterías', 'Manejar y cargar baterías de forma segura.', 'Checklist de seguridad de baterías aplicado a 3 baterías reales.', 'Registro de voltaje y año de cada batería
Procedimiento de carga seguro
Identifica señales de daño
Usa EPP y almacén correcto', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc
FRC Docs | https://frc-docs.readthedocs.io/'),
  ('electronica', 'basico', 4, 'Primer encendido y diagnóstico', 'Energizar el tablero y verificar luces de estado.', 'Registro de primer encendido con estado de cada indicador.', 'Interpreta luces del roboRIO y radio
Conexión con Driver Station
Motor probado con control manual
Hallazgos anotados', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
Documentación WPILib | https://docs.wpilib.org/en/stable/'),
  ('electronica', 'intermedio', 1, 'Red CAN y asignación de IDs', 'Configurar dispositivos CAN y evitar IDs duplicados.', 'Tabla de IDs CAN y captura de configuración en herramienta de fabricante.', 'Sin IDs repetidos
Firmware actualizado
Topología daisy chain correcta
Resistencias terminadoras revisadas', 'WPILib: dispositivos CAN | https://docs.wpilib.org/en/stable/docs/software/can-devices/index.html
Documentación REV Robotics | https://docs.revrobotics.com/
Documentación CTR Electronics (Phoenix 6) | https://v6.docs.ctr-electronics.com/'),
  ('electronica', 'intermedio', 2, 'Distribución de potencia y breakers', 'Dimensionar canales y breakers por mecanismo.', 'Hoja de cálculo de consumo por canal PDH con breaker y calibre.', 'Corrientes máximas estimadas
Breaker acorde al motor
Calibre adecuado por canal
Margen de seguridad justificado', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
Documentación REV Robotics | https://docs.revrobotics.com/
Documentación CTR Electronics (Phoenix 6) | https://v6.docs.ctr-electronics.com/'),
  ('electronica', 'intermedio', 3, 'Cableado limpio y organizado', 'Mejorar rutas, sujeción y alivio de tensión.', 'Tablero rehecho con rutas limpias y etiquetas, con fotos antes/después.', 'Cables etiquetados en ambos extremos
Alivio de tensión en conectores móviles
Sin cables sueltos
Accesible para mantenimiento', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
Chief Delphi | https://www.chiefdelphi.com/'),
  ('electronica', 'intermedio', 4, 'Sensores y encoders', 'Conectar y validar encoders y sensores de límite.', 'Prueba de encoder con lectura en Shuffleboard o AdvantageScope.', 'Cableado correcto de señal
Lectura estable verificada
Unidades definidas
Procedimiento de calibración', 'Documentación REV Robotics | https://docs.revrobotics.com/
Documentación CTR Electronics (Phoenix 6) | https://v6.docs.ctr-electronics.com/
AdvantageScope | https://docs.advantagescope.org/'),
  ('electronica', 'avanzado', 1, 'Diagnóstico de fallas y brownouts', 'Detectar causas de caídas de voltaje y reinicios.', 'Informe de diagnóstico con logs de Driver Station y corrección.', 'Usa registro de voltaje real
Identifica causa raíz
Aplica solución verificable
Prueba posterior sin brownout', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
Documentación CTR Electronics (Phoenix 6) | https://v6.docs.ctr-electronics.com/
AdvantageScope | https://docs.advantagescope.org/'),
  ('electronica', 'avanzado', 2, 'Inspección previa a competencia', 'Aplicar la inspección técnica del evento al robot.', 'Checklist de inspección completado y firmado por inspector interno.', 'Alineado con el manual vigente
Marcos y bumpers verificados
Reglas eléctricas revisadas
Correcciones documentadas', 'FIRST: juego y temporada FRC | https://www.firstinspires.org/robotics/frc/game-and-season
FRC Q&A (preguntas al manual) | https://frc-qa.firstinspires.org/'),
  ('electronica', 'avanzado', 3, 'Esquemático y documentación eléctrica', 'Documentar el robot para mantenimiento.', 'Esquemático completo del robot y mapa de IDs CAN/PWM.', 'Todos los dispositivos incluidos
Versión fechada y almacenada en el repositorio
Legible para otro miembro
Actualizado tras cambios', 'WPILib: fundamentos de hardware | https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html
WPILib: dispositivos CAN | https://docs.wpilib.org/en/stable/docs/software/can-devices/index.html'),
  ('electronica', 'avanzado', 4, 'Mantenimiento preventivo de baterías y tablero', 'Crear un plan para el evento y las prácticas.', 'Plan de mantenimiento semanal con registro de ciclos de baterías.', 'Rotación de baterías definida
Registro de ciclos y resistencia interna
Tareas semanales claras
Responsable por tarea', 'FRC Docs | https://frc-docs.readthedocs.io/
Documentación REV Robotics | https://docs.revrobotics.com/'),
  ('programacion', 'basico', 1, 'Entorno WPILib y primer proyecto', 'Instalar WPILib VS Code y crear un proyecto command-based.', 'Repositorio con proyecto compilable y README de instalación.', 'Compila sin errores
Estructura command-based correcta
README reproducible
Primer commit con mensaje claro', 'Documentación WPILib | https://docs.wpilib.org/en/stable/
GitHub: acerca de Git | https://docs.github.com/es/get-started/using-git/about-git'),
  ('programacion', 'basico', 2, 'Git y GitHub para el equipo', 'Usar ramas, commits y pull requests.', 'Un pull request propio revisado por otro miembro.', 'Rama con nombre descriptivo
Commits pequeños y claros
PR con descripción
Revisión aprobada y mergeada', 'GitHub: acerca de Git | https://docs.github.com/es/get-started/using-git/about-git'),
  ('programacion', 'basico', 3, 'Subsistema y comando básicos', 'Crear un subsistema simple y comandos asociados.', 'Subsistema con motor controlado por un botón del gamepad.', 'Separación subsistema/comando
Binding en RobotContainer
Sin lógica de control en Robot.java
Probado en simulación o robot', 'WPILib: programación basada en comandos | https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html
Documentación WPILib | https://docs.wpilib.org/en/stable/'),
  ('programacion', 'basico', 4, 'Primer vistazo a la simulación', 'Ejecutar el robot en simulación y ver las entradas.', 'Video corto o capturas del simulador respondiendo al código.', 'Simulación inicia sin errores
Entrada de gamepad virtual probada
Salida visible en el simulador
Pasos documentados', 'WPILib: simulación de robot | https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/introduction.html'),
  ('programacion', 'intermedio', 1, 'Drivetrain con odometría', 'Implementar tracción con odometría y reinicio de pose.', 'Subsistema drivetrain con pose estimada y prueba en simulación.', 'Unidades en SI
Pose actualizada cada ciclo
Reset de pose funcional
Visualizada en AdvantageScope', 'Documentación WPILib | https://docs.wpilib.org/en/stable/
WPILib: simulación de robot | https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/introduction.html
AdvantageScope | https://docs.advantagescope.org/'),
  ('programacion', 'intermedio', 2, 'Autónomo con PathPlanner', 'Crear y ejecutar rutas autónomas.', 'Dos autónomos funcionando en simulación o en robot.', 'Rutas con waypoints bien definidos
Eventos o comandos ejecutados en ruta
Selector de autónomo en dashboard
Probado y documentado', 'PathPlanner | https://pathplanner.dev/home.html
WPILib: programación basada en comandos | https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html'),
  ('programacion', 'intermedio', 3, 'Registro y análisis con AdvantageScope', 'Registrar datos y analizarlos para depurar.', 'Registro de una sesión y hallazgo documentado.', 'Registro de entradas y salidas clave
Gráficas con ejes etiquetados
Problema identificado a partir de datos
Ajuste de código verificado', 'AdvantageScope | https://docs.advantagescope.org/
Documentación WPILib | https://docs.wpilib.org/en/stable/'),
  ('programacion', 'intermedio', 4, 'Control de mecanismos con PID/feedforward', 'Controlar un brazo o elevador con control en lazo cerrado.', 'Mecanismo controlado con PID y feedforward con gráficas de respuesta.', 'Constantes expuestas y ajustables
Respuesta sin oscilaciones graves
Límites de seguridad en software
Gráficas antes/después', 'Documentación WPILib | https://docs.wpilib.org/en/stable/
Documentación REV Robotics | https://docs.revrobotics.com/
Documentación CTR Electronics (Phoenix 6) | https://v6.docs.ctr-electronics.com/'),
  ('programacion', 'avanzado', 1, 'Arquitectura y pruebas de unidad', 'Estructurar el código para mantener y probar.', 'Proyecto con pruebas JUnit para lógica no dependiente de hardware.', 'Lógica separada de hardware
Al menos 5 pruebas útiles
CI o script que ejecute las pruebas
Cobertura de casos límite', 'Documentación WPILib | https://docs.wpilib.org/en/stable/
GitHub: acerca de Git | https://docs.github.com/es/get-started/using-git/about-git'),
  ('programacion', 'avanzado', 2, 'Visión y estimación de pose', 'Incorporar mediciones de visión a la odometría.', 'Pose fusionada con visión validada contra una referencia.', 'Latencia considerada
Rechazo de mediciones malas
Resultados comparados con odometría
Explicación del filtro usado', 'Documentación WPILib | https://docs.wpilib.org/en/stable/
WPILib: simulación de robot | https://docs.wpilib.org/en/stable/docs/software/wpilib-tools/robot-simulation/introduction.html
AdvantageScope | https://docs.advantagescope.org/'),
  ('programacion', 'avanzado', 3, 'Autónomo robusto y recuperación', 'Hacer rutinas autónomas tolerantes a fallas.', 'Autónomo con detección de falla y plan alternativo probado.', 'Condiciones de falla definidas
Comportamiento seguro ante error
Pruebas repetidas (5 de 5)
Registro de los intentos', 'PathPlanner | https://pathplanner.dev/home.html
WPILib: programación basada en comandos | https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html
AdvantageScope | https://docs.advantagescope.org/'),
  ('programacion', 'avanzado', 4, 'Revisión de código y despliegue', 'Establecer un proceso de revisión antes de competencia.', 'Lista de revisión y 3 pull requests revisados con la lista.', 'Estilo y convenciones acordados
Sin código muerto ni valores mágicos
Cambios probados antes de merge
Versión etiquetada para competencia', 'GitHub: acerca de Git | https://docs.github.com/es/get-started/using-git/about-git
Documentación WPILib | https://docs.wpilib.org/en/stable/'),
  ('organizacion', 'basico', 1, 'Conocer FIRST y los valores del equipo', 'Entender Gracious Professionalism y Coopertition.', 'Reflexión de 1 página y presentación de 2 minutos al equipo.', 'Explica ambos valores con ejemplos
Relación con el equipo
Claridad en la presentación
Propuesta personal de aplicación', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('organizacion', 'basico', 2, 'Roles y calendario del equipo', 'Conocer áreas, responsables y calendario de temporada.', 'Mapa de áreas y calendario personal de 4 semanas.', 'Áreas y responsables identificados
Fechas clave de temporada incluidas
Horario realista personal
Compromisos confirmados con tutores si aplica', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('organizacion', 'basico', 3, 'Bitácora de ingeniería', 'Documentar el trabajo semanal.', 'Bitácora de una semana con fecha, trabajo, resultados y fotos.', 'Entradas fechadas
Decisiones y razones registradas
Fotos o capturas relevantes
Lenguaje claro', 'FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards'),
  ('organizacion', 'basico', 4, 'Comunicación y reuniones efectivas', 'Aplicar agenda, minuta y acuerdos.', 'Minuta de una reunión con acuerdos, responsables y fechas.', 'Agenda previa
Acuerdos con responsable y fecha
Compartida con el equipo
Seguimiento en la siguiente reunión', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('organizacion', 'intermedio', 1, 'Presupuesto de temporada', 'Construir y dar seguimiento a un presupuesto por área.', 'Presupuesto en hoja de cálculo con ingresos, gastos y saldo.', 'Categorías por área
Estimaciones respaldadas por cotización
Incluye cuotas de inscripción y viaje
Actualizado semanalmente', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('organizacion', 'intermedio', 2, 'Mapa y propuesta a patrocinadores', 'Identificar patrocinadores y preparar una propuesta.', 'Lista de 10 prospectos y propuesta de patrocinio de 1 página.', 'Prospectos con contacto e interés
Beneficios claros para patrocinador
Solicitud concreta (monto o especie)
Revisada por el coach', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc
FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards'),
  ('organizacion', 'intermedio', 3, 'Plan de outreach y divulgación', 'Planear una actividad de STEM con la comunidad.', 'Plan de actividad con objetivo, público, recursos y medición.', 'Objetivo medible
Plan de seguridad para menores
Materiales y responsables
Evidencia de resultados', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc
FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards'),
  ('organizacion', 'intermedio', 4, 'Documentación del proceso de diseño', 'Registrar decisiones y aprendizajes del equipo.', 'Tres documentos de decisión y una retrospectiva.', 'Contexto y alternativas explicadas
Decisión y razón claras
Retrospectiva con acciones
Almacenado en la plataforma del equipo', 'FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards'),
  ('organizacion', 'avanzado', 1, 'Borrador de presentación del Impact Award', 'Preparar un relato del impacto del equipo.', 'Borrador de ensayo y presentación del premio Impact.', 'Evidencia con datos del impacto
Historia coherente de 3 años
Alineado con criterios oficiales
Ensayo con retroalimentación externa', 'FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards
FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('organizacion', 'avanzado', 2, 'Estrategia anual de patrocinios', 'Gestionar relaciones y reportes con patrocinadores.', 'Plan anual con calendario de contacto y reportes.', 'Metas de ingreso por trimestre
Reporte de impacto sin datos personales
Agradecimientos y seguimiento
Responsable asignado', 'FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards'),
  ('organizacion', 'avanzado', 3, 'Logística de evento y viaje', 'Planear transporte, hospedaje, permisos y comida.', 'Plan logístico completo para un evento.', 'Presupuesto por rubro
Permisos y consentimientos de menores
Roles de adultos responsables
Plan de contingencia', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc'),
  ('organizacion', 'avanzado', 4, 'Sucesión y transferencia de conocimiento', 'Preparar relevo de liderazgo y documentación.', 'Manual de transición por área y plan de mentoría a novatos.', 'Responsabilidades documentadas
Accesos y recursos listados
Plan de capacitación
Validado por el coach', 'FIRST Robotics Competition | https://www.firstinspires.org/robotics/frc
FIRST: premios FRC | https://www.firstinspires.org/robotics/frc/awards');
