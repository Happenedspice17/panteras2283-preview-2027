# Prompts para aprender con IA

Prompts listos para copiar en Claude, ChatGPT, Gemini o el asistente de Forja. Están hechos para que la IA **te enseñe y te haga pensar**, no para que haga el trabajo por ti.

> **Reglas de uso del equipo**
> - La IA se equivoca, sobre todo con reglas y números. **El manual FRC vigente siempre gana** (hoy 2026; desde el 9 ene 2027, el 2027). Si la IA cita una regla, búscala tú en el manual.
> - Nunca pegues datos personales (nombres, correos, teléfonos) de alumnos.
> - Si la respuesta implica riesgo (baterías, herramientas, máquinas), **pregúntale a un mentor antes de hacerlo**.
> - Cambia lo que está entre `[corchetes]`.

## 0. Prompt maestro (pégalo primero en cualquier chat nuevo)

```
Actúa como mentor de un equipo de robótica FIRST Robotics Competition (FRC), Panteras 2283, de preparatoria en Ciudad de México. Diseñamos en Onshape, programamos en Java con WPILib (command-based) y usamos motores y controladores REV y CTRE.
Mi nivel: [nuevo / intermedio / avanzado]. Mi área: [mecánica y CAD / electrónica / programación / estrategia / organización].
Cómo quiero que me ayudes:
- Explícame con ejemplos de robots FRC y en español sencillo; usa términos en inglés cuando así se usen en FRC.
- Antes de darme una respuesta completa, hazme 1-3 preguntas para entender qué ya sé y qué intenté.
- Prefiero pistas y preguntas guía antes que soluciones completas.
- Si algo depende del reglamento, dime qué regla buscar en el manual vigente y no la interpretes como definitiva.
- Si algo tiene riesgo de seguridad, dilo primero.
- Al final, dame un mini reto o pregunta para comprobar que entendí.
```

## 1. Soy nuevo: ¿por dónde empiezo?

```
Soy nuevo en FRC y entro al área de [área]. Hazme un plan de aprendizaje de 4 semanas, 3-4 horas por semana, con:
- Los 5 conceptos más importantes que debo dominar primero y por qué.
- Un ejercicio práctico por semana que pueda hacer en el taller o en la computadora.
- Recursos gratuitos oficiales (docs.wpilib.org, learn.onshape.com, firstinspires.org, fabricantes).
- Palabras clave del área que voy a escuchar en el equipo, con definición de una línea.
Empieza preguntándome qué ya sé.
```

## 2. Explícame un concepto (modo profesor)

```
Explícame [concepto: p. ej. relación de reducción / PID / CAN bus / K-factor de doblez / swerve] en 3 niveles:
1) Como si tuviera 12 años, con una analogía.
2) Como alumno de prepa con física básica, con un ejemplo de un robot FRC.
3) Lo que necesita saber alguien que lo va a diseñar o programar, con números típicos.
Después hazme 3 preguntas de opción múltiple para comprobar que entendí y espera mis respuestas.
```

## 3. Entender una regla del manual

```
Te pego el texto exacto de una regla del manual FRC [año] (sección [número]):
"""
[pega aquí la regla]
"""
1) Explícala en palabras simples.
2) Dame 2 ejemplos de diseños que la cumplen y 2 que no.
3) ¿Qué términos en MAYÚSCULAS (definidos en el manual) usa y qué significan?
4) ¿Qué dudas razonables podrían ir al Q&A oficial?
No inventes texto que no esté en la regla; si no estás seguro, dilo.
```

## 4. Revisar un diseño para manufactura (DFM)

```
Te comparto [captura del Onshape / dibujo / descripción] de una pieza:
- Material y espesor: [p. ej. aluminio 5052 de 0.090"]
- Proceso: [lámina doblada / router CNC / torno / impresión 3D en PETG / corte láser]
- Función y cargas: [qué sostiene, de dónde le pegan]
- Tornillería: [#10-32 socket / button / flat]
Revísala como lo haría un ingeniero de manufactura. Dime en una tabla: problema, por qué importa, cómo corregirlo.
Revisa: radios y distancias a dobleces y bordes, holguras de agujeros, accesos para herramienta y llave Allen, orientación de capas (si es 3D), puntos débiles y si se puede hacer más simple o ligera.
No rediseñes la pieza por mí: dame las observaciones y yo hago los cambios.
```

## 5. Elegir motor y reducción

```
Necesito elegir motor y relación de reducción para [mecanismo: elevador / brazo / intake / shooter / climber].
Datos: carga [kg o lb], recorrido [distancia o ángulo], tiempo deseado [s], diámetro de polea/rueda/spool [in], motores que tenemos: [Kraken X60, NEO, NEO Vortex, NEO 550...].
1) Explícame qué cálculo hay que hacer y por qué (velocidad, torque, corriente).
2) Guíame paso a paso para que yo lo calcule; luego compara con lo que me daría ReCalc (reca.lc).
3) ¿Qué límite de corriente pondrías y por qué?
4) Riesgos: ¿qué pasa si me quedo corto o me paso de reducción?
```

## 6. Depurar código (WPILib, Java)

```
Mi robot hace [lo que pasa] pero esperaba [lo que debería pasar].
Contexto: WPILib [versión], command-based, motor [modelo] con controlador [SPARK MAX / Talon FX].
Código relevante:
"""
[pega solo la clase o método involucrado]
"""
Mensajes de la Driver Station / consola:
"""
[pega errores]
"""
No me reescribas todo. Primero dime 3 hipótesis ordenadas por probabilidad, cómo comprobar cada una (qué imprimir, qué ver en AdvantageScope o el Driver Station) y espera lo que encuentre.
```

## 7. Diagnosticar electrónica (brownouts, desconexiones, CAN)

```
Síntoma: [el robot se reinicia / se pierde la comunicación / un motor no responde / luces de error].
Cuándo pasa: [al acelerar / al subir el elevador / al azar].
Lo que ya revisé: [batería, conectores, luces de los controladores...].
Guíame con un árbol de diagnóstico: de lo más probable y fácil de revisar a lo menos probable. Para cada paso dime qué debo ver (colores de LED, voltaje, logs) y qué significa.
Recuérdame las precauciones de seguridad antes de tocar el robot energizado.
```

## 8. Analizar el juego después del kickoff

```
Te resumo el juego FRC [año]: [objetivos, cómo se anota, puntos de autónomo, teleop y endgame, ranking points].
Ayúdame a pensar como estratega:
1) ¿Cuántos puntos hace un robot promedio, uno bueno y uno de élite? Explícame cómo lo estimas.
2) Lista de acciones del robot ordenadas por puntos por segundo y por dificultad.
3) ¿Qué es "imprescindible", "deseable" y "aspiracional" para un equipo con [nuestros recursos]?
4) Preguntas que debemos responder en el manual antes de decidir.
No me digas qué robot construir; ayúdame a decidir con criterios.
```

## 9. Scouting y elección de alianza

```
Tengo estos datos de scouting (sin nombres de alumnos):
"""
[pega tabla: equipo, partidos, puntos auto, teleop, endgame, defensa, fallas]
"""
1) ¿Qué métricas importan más para este juego y por qué?
2) Ordena los equipos para elegir alianza según [nuestra estrategia] y explica el criterio.
3) ¿Qué datos me faltan o son poco confiables?
Muestra tus cálculos.
```

## 10. Impact Award, ensayos y presentaciones (sin que la IA lo escriba)

```
Este es mi borrador de [ensayo del Impact Award / presentación a jueces / correo a patrocinador]:
"""
[pega tu texto]
"""
No lo reescribas. Dame retroalimentación como juez de FIRST:
- 3 fortalezas y 3 cosas a mejorar, citando frases exactas.
- ¿Dónde falta evidencia (números, fechas, impacto medible)?
- Preguntas que me haría un juez después de leerlo.
```

## 11. Preparar una asesoría con un mentor

```
Tengo 1 hora con un mentor experto en [área]. Situación: [semana de construcción, qué intentamos, qué tenemos que decidir].
Ayúdame a llegar preparado:
1) Resume el problema en 5 líneas.
2) Las 3 preguntas más valiosas que debo hacer.
3) Qué información o fotos debo llevar.
4) Cómo documentar acuerdos (qué, quién, cuándo).
```

## 12. Estudiar para dominar un tema (técnica Feynman)

```
Voy a explicarte [tema] como si tú fueras alumno nuevo del equipo. Después:
- Señala lo que expliqué mal o incompleto.
- Hazme preguntas "¿y por qué?" hasta que encuentre el límite de lo que sé.
- Dame una lista de qué repasar y dónde (documentación oficial).
Mi explicación: [escribe aquí]
```

## 13. Retrospectiva después de un evento

```
Acabamos de competir en [evento]. Datos: récord [W-L-T], ranking [n], problemas [lista], lo que salió bien [lista].
Facilita una retrospectiva:
1) Agrupa los problemas por causa raíz (diseño, fabricación, software, estrategia, organización).
2) Para cada causa, una acción concreta con responsable (rol, no nombre) y fecha.
3) ¿Qué deberíamos dejar de hacer, empezar a hacer y seguir haciendo?
```

## Consejos para mejores respuestas

- **Da contexto:** área, nivel, qué intentaste, qué esperabas. Más contexto, mejor respuesta.
- **Pega texto real** (regla, código, error) en vez de describirlo de memoria.
- **Pide fuentes** y verifícalas; si no las da, desconfía de los números.
- **Itera:** "más simple", "dame un ejemplo con un elevador", "¿y si el motor fuera un NEO?".
- **Pide que te pregunte:** "antes de responder, hazme las preguntas que necesites".
- **Comprueba** con una pieza de prueba, un cálculo propio o un mentor antes de fabricar o cablear.
