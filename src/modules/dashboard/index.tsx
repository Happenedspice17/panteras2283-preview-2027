import { Link } from 'react-router-dom'
import { Page, Card, Stat, Empty, Loading, Badge } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows, buildWeek, expectedProgress, fmtDate, mxn } from '../../lib/db'
import type { Profile, EventRow, Objective, CompRole, Mentoring, Part, Budget, Submission } from '../../lib/types'

type Sev = 'bad' | 'warn' | 'info'
interface Alert { sev: Sev; text: string; to: string }

const dayDiff = (d: string) => Math.ceil((new Date(d + 'T00:00:00').getTime() - new Date().setHours(0, 0, 0, 0)) / 864e5)

export default function Dashboard() {
  const { season, isStaff, isCoach } = useAuth()
  const sid = season?.id ?? 0
  const skip = !season
  const profiles = useRows<Profile & { id: string }>('profiles', { skip })
  const events = useRows<EventRow>('events', { filter: { season_id: sid }, order: 'date_start', skip })
  const parts = useRows<Part>('parts', { filter: { season_id: sid }, skip })
  const budgets = useRows<Budget>('budgets', { filter: { season_id: sid }, skip })
  const objectives = useRows<Objective>('objectives', { filter: { season_id: sid }, skip })
  const roles = useRows<CompRole>('comp_roles', { filter: { season_id: sid }, skip })
  const mentoring = useRows<Mentoring>('mentoring', { skip })
  const subs = useRows<Submission>('submissions', { skip })

  if (!season) return <Page title="Tablero"><Empty>No hay temporada activa. Un coach debe crear la temporada en el módulo Temporada.</Empty></Page>
  const loading = [profiles, events, parts, budgets, objectives, roles, mentoring, subs].some((r) => r.loading)
  if (loading) return <Page title="Tablero"><Loading /></Page>

  const week = buildWeek(season.kickoff)
  const toKickoff = dayDiff(season.kickoff)
  const toMain = dayDiff(season.main_event)
  const students = profiles.rows.filter((p) => (p.role === 'alumno' || p.role === 'lider') && p.active)
  const noSafety = students.filter((p) => !p.safety_ok)
  const safetyPct = students.length ? Math.round((100 * (students.length - noSafety.length)) / students.length) : 0
  const assigned = budgets.rows.reduce((s, b) => s + Number(b.amount_mxn), 0)
  const spent = (area?: string) => parts.rows
    .filter((p) => p.status !== 'pendiente' && (!area || p.area === area))
    .reduce((s, p) => s + p.qty * Number(p.unit_cost_usd) * Number(season.usd_mxn), 0)
  const totalSpent = spent()
  const upcoming = events.rows.filter((e) => dayDiff(e.date_end ?? e.date_start) >= 0).slice(0, 5)

  const alerts: Alert[] = []
  if (noSafety.length) alerts.push({ sev: 'bad', to: '/equipo', text: `${noSafety.length} alumno(s) sin inducción de seguridad: ${noSafety.slice(0, 5).map((p) => p.full_name ?? p.email).join(', ')}${noSafety.length > 5 ? '…' : ''}` })
  const pend = profiles.rows.filter((p) => p.role === 'pendiente')
  if (isCoach && pend.length) alerts.push({ sev: 'info', to: '/equipo', text: `${pend.length} registro(s) esperando aprobación de rol` })
  parts.rows.filter((p) => p.priority === 'esencial' && p.status === 'pendiente' && p.needed_by && dayDiff(p.needed_by) <= 14)
    .forEach((p) => alerts.push({ sev: 'bad', to: '/bom', text: `Pieza esencial pendiente: ${p.name} (${dayDiff(p.needed_by!) < 0 ? 'vencida' : 'necesaria'} ${fmtDate(p.needed_by)})` }))
  budgets.rows.forEach((b) => {
    const s = spent(b.area)
    if (s > Number(b.amount_mxn)) alerts.push({ sev: 'bad', to: '/temporada', text: `Presupuesto excedido en ${b.area}: ${mxn(s)} de ${mxn(Number(b.amount_mxn))}` })
  })
  parts.rows.filter((p) => Number(p.unit_cost_usd) > Number(season.cost_limit_usd))
    .forEach((p) => alerts.push({ sev: 'warn', to: '/bom', text: `${p.name} excede el límite de costo por pieza (US$${p.unit_cost_usd} > US$${season.cost_limit_usd})` }))
  const noBackup = roles.rows.filter((r) => !r.primary_id || !r.backup_id)
  if (noBackup.length) alerts.push({ sev: 'warn', to: '/equipo', text: `${noBackup.length} rol(es) de competencia sin titular o suplente: ${noBackup.slice(0, 4).map((r) => r.role_name).join(', ')}` })
  objectives.rows.forEach((o) => {
    if (o.progress >= 100) return
    if (week > o.week_due) alerts.push({ sev: 'bad', to: '/temporada', text: `Objetivo vencido (semana ${o.week_due}): ${o.title} al ${o.progress}%` })
    else if (o.progress < expectedProgress(o.week_start, o.week_due, week) - 15)
      alerts.push({ sev: 'warn', to: '/temporada', text: `Objetivo atrasado: ${o.title} (${o.progress}% vs ${expectedProgress(o.week_start, o.week_due, week)}% esperado)` })
  })
  const req = mentoring.rows.filter((m) => m.status === 'solicitada').length
  if (req) alerts.push({ sev: 'info', to: '/asesorias', text: `${req} asesoría(s) solicitada(s) por agendar` })
  const unrated = mentoring.rows.filter((m) => m.status === 'realizada' && !m.rating).length
  if (unrated) alerts.push({ sev: 'info', to: '/asesorias', text: `${unrated} asesoría(s) realizada(s) sin calificar` })
  const toValidate = subs.rows.filter((s) => s.status === 'enviado').length
  if (isStaff && toValidate) alerts.push({ sev: 'info', to: '/practicas', text: `${toValidate} entrega(s) de prácticas por validar` })
  events.rows.filter((e) => e.kind === 'fecha_limite' && dayDiff(e.date_start) >= 0 && dayDiff(e.date_start) <= 14)
    .forEach((e) => alerts.push({ sev: 'warn', to: '/calendario', text: `Fecha límite en ${dayDiff(e.date_start)} día(s): ${e.title} (${fmtDate(e.date_start)})` }))
  const order = { bad: 0, warn: 1, info: 2 }
  alerts.sort((a, b) => order[a.sev] - order[b.sev])

  const atRisk = objectives.rows.filter((o) => o.progress < 100 && (week > o.week_due || o.progress < expectedProgress(o.week_start, o.week_due, week) - 15)).length

  return (
    <Page title="Tablero">
      <Card title={`${season.name} · semana ${Math.max(week, 0)} de construcción`}>
        <div className="row">
          {toKickoff > 0 ? <Badge tone="info">Kickoff en {toKickoff} días</Badge> : <Badge tone="ok">Kickoff hace {-toKickoff} días</Badge>}
          <Badge tone={toMain < 0 ? 'neutral' : 'warn'}>{toMain >= 0 ? `Evento principal en ${toMain} días (${fmtDate(season.main_event)})` : 'Evento principal concluido'}</Badge>
        </div>
      </Card>
      <div className="grid" style={{ margin: '16px 0' }}>
        <Stat label="Alumnos activos" value={students.length} />
        <Stat label="Con inducción de seguridad" value={`${safetyPct}%`} />
        <Stat label="Objetivos en riesgo" value={atRisk} />
        <Stat label="Presupuesto ejercido" value={mxn(totalSpent)} hint={`de ${mxn(assigned)} asignado`} />
      </div>
      <div className="grid">
        <Card title={`Alertas (${alerts.length})`}>
          {alerts.length === 0 ? <Empty>Sin alertas. Todo en orden.</Empty> : alerts.map((a, i) => (
            <div key={i} className={`alert alert-${a.sev}`}><Link to={a.to}>{a.text}</Link></div>
          ))}
        </Card>
        <Card title="Próximos eventos">
          {upcoming.length === 0 ? <Empty>No hay eventos próximos.</Empty> : upcoming.map((e) => (
            <p key={e.id}><Link to="/calendario"><strong>{e.title}</strong></Link> <span className="muted small">{fmtDate(e.date_start)} · {e.kind}</span></p>
          ))}
        </Card>
      </div>
    </Page>
  )
}
