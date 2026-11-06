-- Temporada 2027 (verificar fechas en firstinspires.org)
insert into seasons (year, name, kickoff, main_event, cost_limit_usd, current, matrix_criteria)
values (2027, 'BIOCORE', '2027-01-09', '2027-04-14', 600, true,
  '[{"name":"Puntos","weight":5},{"name":"Fiabilidad","weight":5},{"name":"Simplicidad","weight":4},{"name":"Costo","weight":2},{"name":"Tiempo de fabricación","weight":3}]');

insert into budgets (season_id, area, amount_mxn)
select 1, a, 0 from unnest(enum_range(null::area)) a;

insert into events (season_id, title, kind, date_start, date_end, location) values
(1,'Cierre de registro y pago del evento inicial','fecha_limite','2026-11-17',null,null),
(1,'Kickoff FRC 2027','oficial','2027-01-09',null,null),
(1,'Pago de eventos adicionales','fecha_limite','2027-01-21',null,null),
(1,'Cierre FIRST Leadership Award y Woodie Flowers','fecha_limite','2027-02-04',null,null),
(1,'Cierre FIRST Impact Award','fecha_limite','2027-02-11',null,null),
(1,'Week Zero','oficial','2027-02-20',null,null),
(1,'Regional Monterrey (Semana 1)','oficial','2027-03-03','2027-03-06','Monterrey'),
(1,'Pago del FIRST Championship','fecha_limite','2027-04-16',null,null),
(1,'Regional León (Semana 7)','competencia','2027-04-14','2027-04-17','Tec de Monterrey Campus León'),
(1,'FIRST Championship','oficial','2027-04-28','2027-05-01','Houston');

insert into pit_checklist (event_id, item, category) values
(null,'Baterías cargadas y etiquetadas (mín. 6)','Eléctrico'),
(null,'Cargadores y extensiones','Eléctrico'),
(null,'Radio y cable Ethernet de repuesto','Eléctrico'),
(null,'Laptop del driver station + cargador','Programación'),
(null,'Código en la rama de competencia y etiquetado','Programación'),
(null,'Bumpers de ambos colores','Mecánica'),
(null,'Kit de herramientas y llaves Allen','Mecánica'),
(null,'Repuestos críticos (bandas, engranes, motores)','Mecánica'),
(null,'Lentes de seguridad para todo el equipo','Seguridad'),
(null,'Botiquín','Seguridad'),
(null,'Permisos firmados de todos los asistentes','Organización'),
(null,'Material de Impact / presentación a jueces','Organización');

insert into quizzes (area, title, pass_score, questions) values
('seguridad','Inducción de seguridad del taller',100,'[
 {"q":"¿Cuándo se usan lentes de seguridad en el taller?","options":["Solo con herramienta eléctrica","Siempre que estés en el taller","Solo si lo pide el coach"],"answer":1,"why":"En el taller y en pits los lentes son obligatorios en todo momento."},
 {"q":"Antes de trabajar en el robot debes...","options":["Desconectar la batería / abrir el breaker principal","Solo apagar la Driver Station","Nada si el robot está deshabilitado"],"answer":0,"why":"El robot puede moverse si queda energizado."},
 {"q":"¿Puedes usar una herramienta eléctrica que nunca te han enseñado?","options":["Sí, si tengo cuidado","No, primero capacitación y supervisión de un adulto","Sí, si es pequeña"],"answer":1,"why":"Solo con capacitación y adulto presente."},
 {"q":"Una batería LiPo/SLA dañada o hinchada se debe...","options":["Usar hasta que falle","Retirar, etiquetar y avisar a un adulto","Guardar con las demás"],"answer":1,"why":"Riesgo de incendio o fuga de ácido."},
 {"q":"Cabello largo, ropa suelta y joyería cerca de máquinas...","options":["No importan","Se recogen o retiran","Solo en la fresadora"],"answer":1,"why":"Pueden atorarse en partes giratorias."}
]');
