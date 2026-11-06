import { useState } from 'react'
import { Page, Card, Empty, Loading, Select, Button } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows, fmtDate } from '../../lib/db'
import type { EventRow } from '../../lib/types'
import Logistica from './Logistica'
import Pits from './Pits'
import Partidos from './Partidos'
import Scouting from './Scouting'
import Revision from './Revision'

const TABS = [['log', 'Logística'], ['pits', 'Checklist de pits'], ['par', 'Partidos'], ['sco', 'Scouting'], ['rev', 'Revisión posterior']] as const

export default function Eventos() {
  const { season } = useAuth()
  const { rows, loading } = useRows<EventRow>('events', { filter: { season_id: season?.id ?? 0 }, order: 'date_start', skip: !season })
  const [sel, setSel] = useState<number | null>(null)
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('log')

  if (!season) return <Page title="Eventos"><Empty>No hay temporada activa. Un coach debe crearla.</Empty></Page>
  if (loading) return <Page title="Eventos"><Loading /></Page>
  const evs = rows.filter((e) => e.kind === 'competencia' || e.kind === 'oficial')
  if (!evs.length) return <Page title="Eventos"><Empty>No hay eventos de competencia u oficiales en el calendario de la temporada.</Empty></Page>
  const ev = evs.find((e) => e.id === sel) ?? evs[0]

  return (
    <Page title="Eventos">
      <Card>
        <div className="form">
          <Select value={ev.id} onChange={(e) => setSel(Number(e.target.value))}
            options={evs.map((e) => ({ value: e.id, label: `${e.title} · ${fmtDate(e.date_start)}` }))} />
          <div className="muted small">{ev.location ?? 'Sin sede'}{ev.notes ? ` · ${ev.notes}` : ''}</div>
        </div>
        <div className="row" style={{ marginTop: 12 }}>
          {TABS.map(([k, l]) => <Button key={k} variant={tab === k ? 'primary' : 'ghost'} onClick={() => setTab(k)}>{l}</Button>)}
        </div>
      </Card>
      {tab === 'log' && <Logistica ev={ev} seasonId={season.id} />}
      {tab === 'pits' && <Pits ev={ev} />}
      {tab === 'par' && <Partidos ev={ev} />}
      {tab === 'sco' && <Scouting ev={ev} />}
      {tab === 'rev' && <Revision ev={ev} />}
    </Page>
  )
}
