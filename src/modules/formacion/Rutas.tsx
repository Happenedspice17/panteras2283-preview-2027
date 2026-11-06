import { AREAS, AREA_LABEL, LEVELS, LEVEL_LABEL, type Area } from '../../lib/constants'
import type { Practice, Profile, Quiz, QuizAttempt, Submission } from '../../lib/types'
import { Badge, Card, Empty, Table } from '../../components/ui'

const ordenArea = (a: Area | null) => (a ? AREAS.indexOf(a) : AREAS.length)

export function Rutas({ perfiles, practicas, entregas, quizzes, intentos }: {
  perfiles: Profile[]
  practicas: Practice[]
  entregas: Submission[]
  quizzes: Quiz[]
  intentos: QuizAttempt[]
}) {
  const alumnos = perfiles
    .filter((p) => (p.role === 'alumno' || p.role === 'lider') && p.active)
    .sort((a, b) => ordenArea(a.area) - ordenArea(b.area)
      || LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level)
      || (a.full_name ?? '').localeCompare(b.full_name ?? ''))

  const practicaPor = new Map(practicas.map((x) => [x.id, x]))
  const quizPor = new Map(quizzes.map((x) => [x.id, x]))

  const filas = alumnos.map((p) => {
    const validadas = entregas.filter((s) => {
      const pr = practicaPor.get(s.practice_id)
      return s.student_id === p.id && s.status === 'validado' && pr?.area === p.area && pr?.level === p.level
    }).length
    const aprobados = intentos.filter((a) => {
      const q = quizPor.get(a.quiz_id)
      return a.user_id === p.id && q?.area === p.area && a.score >= (q?.pass_score ?? 101)
    }).length
    return { p, validadas, aprobados }
  })

  return (
    <Card title="Rutas por nivel">
      {filas.length === 0 ? <Empty>Aún no hay alumnos activos.</Empty> : (
        <Table head={['Alumno', 'Área', 'Nivel', 'Prácticas validadas (su nivel)', 'Intentos aprobados (su área)']}>
          {filas.map(({ p, validadas, aprobados }) => (
            <tr key={p.id}>
              <td>{p.full_name ?? p.email}</td>
              <td>{p.area ? AREA_LABEL[p.area] : <span className="muted">Sin área</span>}</td>
              <td>{LEVEL_LABEL[p.level]}</td>
              <td><Badge tone={validadas > 0 ? 'ok' : 'neutral'}>{validadas}</Badge></td>
              <td><Badge tone={aprobados > 0 ? 'ok' : 'neutral'}>{aprobados}</Badge></td>
            </tr>
          ))}
        </Table>
      )}
    </Card>
  )
}
