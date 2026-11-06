export const AREAS = ['estrategia', 'mecanica', 'electronica', 'programacion', 'organizacion'] as const
export type Area = (typeof AREAS)[number]
export const AREA_LABEL: Record<Area, string> = {
  estrategia: 'Desempeño y estrategia',
  mecanica: 'Mecánica y CAD',
  electronica: 'Electrónica',
  programacion: 'Programación',
  organizacion: 'Organización del equipo',
}

export const LEVELS = ['basico', 'intermedio', 'avanzado'] as const
export type Level = (typeof LEVELS)[number]
export const LEVEL_LABEL: Record<Level, string> = { basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado' }

export const ROLES = ['pendiente', 'alumno', 'lider', 'coach', 'mentor', 'patrocinador'] as const
export type Role = (typeof ROLES)[number]
export const ROLE_LABEL: Record<Role, string> = {
  pendiente: 'Pendiente de aprobación',
  alumno: 'Alumno',
  lider: 'Líder de área',
  coach: 'Coach',
  mentor: 'Mentor',
  patrocinador: 'Patrocinador',
}

export const PRIORITIES = ['esencial', 'estrategico', 'aspiracional'] as const
export const PART_STATUS = ['pendiente', 'pedido', 'recibido', 'en_inventario'] as const

export const GUIAS: [string, string][] = [
  ['diseno-robot', 'Diseño del robot'], ['manufactura', 'Manufactura'], ['taller', 'Taller'],
  ['electronica', 'Electrónica'], ['motores-controladores', 'Motores'],
]
