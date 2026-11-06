import { useState } from 'react'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import { useAuth } from '../../lib/auth'
import { useRows, fmtDate } from '../../lib/db'
import type { Practice, Profile, Quiz, QuizAttempt, Submission, TrainingHours } from '../../lib/types'
import { Badge, Button, Card, Empty, Loading, Page, Table } from '../../components/ui'
import { QuizTomar } from './QuizTomar'
import { QuizEditor } from './QuizEditor'
import { Horas } from './Horas'
import { Rutas } from './Rutas'

const etiquetaArea = (a: string) => (a === 'seguridad' ? 'Seguridad' : AREA_LABEL[a as Area] ?? a)

export default function Formacion() {
  const { profile, isStaff } = useAuth()
  const uid = profile?.id ?? ''
  const quizzes = useRows<Quiz>('quizzes', { order: 'id' })
  const intentos = useRows<QuizAttempt>('quiz_attempts', { filter: isStaff ? {} : { user_id: uid }, order: 'created_at', asc: false })
  const horas = useRows<TrainingHours>('training_hours', { filter: isStaff ? {} : { user_id: uid }, order: 'date', asc: false })
  const perfiles = useRows<Profile>('profiles', { order: 'full_name', skip: !isStaff })
  const practicas = useRows<Practice>('practices', { skip: !isStaff })
  const entregas = useRows<Submission>('submissions', { skip: !isStaff })
  const [activo, setActivo] = useState<Quiz | null>(null)

  if (quizzes.loading) return <Page title="Formación"><Loading /></Page>

  const seguridad = quizzes.rows.filter((q) => q.area === 'seguridad')
  const porArea = quizzes.rows.filter((q) => q.area !== 'seguridad' && AREAS.includes(q.area as Area))
  const mios = intentos.rows.filter((a) => a.user_id === uid)
  const mejor = (q: Quiz) => Math.max(-1, ...mios.filter((a) => a.quiz_id === q.id).map((a) => a.score))

  const tabla = (lista: Quiz[], conTitulo: boolean) => (
    lista.length === 0 ? <Empty>Aún no hay quizzes aquí.</Empty> : (
      <Table head={['Quiz', ...(conTitulo ? ['Área'] : []), 'Preguntas', 'Mínimo', 'Mi mejor intento', '']}>
        {lista.map((q) => {
          const m = mejor(q)
          return (
            <tr key={q.id}>
              <td>{q.title}</td>
              {conTitulo && <td><Badge>{etiquetaArea(q.area)}</Badge></td>}
              <td>{q.questions.length}</td>
              <td>{q.pass_score}%</td>
              <td>{m < 0 ? <span className="muted">Sin intentos</span> : <Badge tone={m >= q.pass_score ? 'ok' : 'warn'}>{m}%</Badge>}</td>
              <td><Button variant="ghost" onClick={() => setActivo(q)}>{m >= q.pass_score ? 'Repetir' : 'Tomar'}</Button></td>
            </tr>
          )
        })}
      </Table>
    )
  )

  return (
    <Page title="Formación">
      {activo && <QuizTomar key={activo.id} quiz={activo} registrar={intentos.insert} onSalir={() => setActivo(null)} />}

      <Card title="Inducción de seguridad">
        <p style={{ marginTop: 0 }}>
          Estado:{' '}
          {profile?.safety_ok
            ? <Badge tone="ok">Completa {profile.safety_date ? `· ${fmtDate(profile.safety_date)}` : ''}</Badge>
            : <Badge tone="bad">Pendiente</Badge>}
        </p>
        {tabla(seguridad, false)}
      </Card>

      <Card title="Quizzes por área">
        {tabla(porArea, true)}
      </Card>

      {isStaff && <QuizEditor quizzes={quizzes.rows} insert={quizzes.insert} update={quizzes.update} remove={quizzes.remove} />}

      <Horas horas={horas.rows} perfiles={perfiles.rows} isStaff={isStaff} insert={horas.insert} remove={horas.remove} />

      {isStaff && <Rutas perfiles={perfiles.rows} practicas={practicas.rows} entregas={entregas.rows} quizzes={quizzes.rows} intentos={intentos.rows} />}
    </Page>
  )
}
