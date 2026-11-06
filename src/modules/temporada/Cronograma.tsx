import { Card, Badge, Empty, Loading } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows, buildWeek } from '../../lib/db'
import { AREAS, AREA_LABEL } from '../../lib/constants'
import type { Objective } from '../../lib/types'

export default function Cronograma() {
  const { season } = useAuth()
  const s = season!
  const { rows, loading } = useRows<Objective>('objectives', { filter: { season_id: s.id }, order: 'week_due' })
  const week = buildWeek(s.kickoff)
  const total = Math.max(1, Math.ceil((new Date(s.main_event + 'T00:00:00').getTime() - new Date(s.kickoff + 'T00:00:00').getTime()) / (7 * 864e5)))
  const weeks = Array.from({ length: total }, (_, i) => i + 1)
  if (loading) return <Loading />
  const late = rows.filter((o) => o.week_due < week && o.progress < 100)
  return (
    <Card title={`Cronograma (${total} semanas · actual: ${week})`}>
      {rows.length === 0 && <Empty>Aún no hay objetivos.</Empty>}
      {late.length > 0 && <div className="alert alert-bad">{late.length} objetivo(s) vencidos sin completar.</div>}
      <div className="table-wrap">
        <table>
          <thead><tr><th>Área</th>{weeks.map((w) => <th key={w} style={w === week ? { background: 'var(--info)', color: '#fff' } : undefined}>S{w}</th>)}</tr></thead>
          <tbody>
            {AREAS.map((a) => (
              <tr key={a}>
                <td><strong>{AREA_LABEL[a]}</strong></td>
                {weeks.map((w) => (
                  <td key={w} style={w === week ? { background: 'rgba(80,140,255,.12)', verticalAlign: 'top' } : { verticalAlign: 'top' }}>
                    {rows.filter((o) => o.area === a && o.week_due === w).map((o) => (
                      <div key={o.id} className="small" style={{ marginBottom: 4 }}>
                        {o.is_milestone && '★ '}{o.title} <Badge tone={o.progress >= 100 ? 'ok' : 'neutral'}>{o.progress}%</Badge>
                        {w < week && o.progress < 100 && <> <Badge tone="bad">Atrasado</Badge></>}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted small">Los objetivos se muestran en su semana límite.</p>
    </Card>
  )
}
