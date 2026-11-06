import { buildWeek, expectedProgress } from '../../lib/db'
import { AREA_LABEL, type Area } from '../../lib/constants'
import type { CompRole, Objective, Part, Season } from '../../lib/types'

/** Resumen de contexto para una asesoría. No incluye nombres de alumnos. */
export function resumenContexto(area: Area, season: Season, objetivos: Objective[], piezas: Part[], roles: CompRole[]) {
  const semana = buildWeek(season.kickoff)
  const objs = objetivos.filter((o) => o.area === area)
  const pendientes = piezas.filter((p) => p.area === area && p.status === 'pendiente')
  const sinTitular = roles.filter((r) => !r.primary_id).length
  const sinSuplente = roles.filter((r) => !r.backup_id).length
  return [
    `Área: ${AREA_LABEL[area]}`,
    `Temporada ${season.name}, semana de construcción ${semana}`,
    '',
    `Objetivos del área (${objs.length}):`,
    ...(objs.length ? objs.map((o) => `- ${o.title}: ${o.progress}% (esperado ${expectedProgress(o.week_start, o.week_due, semana)}%)`) : ['- Sin objetivos registrados']),
    '',
    `Piezas pendientes del área (${pendientes.length}):`,
    ...(pendientes.length ? pendientes.map((p) => `- ${p.subsystem}: ${p.name} (x${p.qty}, ${p.priority})`) : ['- Ninguna']),
    '',
    `Roles de competencia sin titular: ${sinTitular}`,
    `Roles de competencia sin suplente: ${sinSuplente}`,
  ].join('\n')
}

/** Rango [inicio, fin) en milisegundos de la semana (lunes a domingo, hora local) que contiene `ref`. */
export function rangoSemana(ref: Date): [number, number] {
  const d = new Date(ref)
  const dow = (d.getDay() + 6) % 7
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - dow)
  const ini = d.getTime()
  const fin = new Date(d)
  fin.setDate(fin.getDate() + 7)
  return [ini, fin.getTime()]
}
