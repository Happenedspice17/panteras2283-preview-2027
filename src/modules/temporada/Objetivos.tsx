import { useState } from 'react'
import { Card, Table, Field, Input, Select, Button, Badge, Progress, Empty, Loading } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows, buildWeek, expectedProgress } from '../../lib/db'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import type { Objective } from '../../lib/types'

const blank = { area: 'mecanica' as Area, title: '', week_start: 1, week_due: 4, progress: 0, is_milestone: false }

export default function Objetivos() {
  const { season, isStaff } = useAuth()
  const s = season!
  const { rows, loading, insert, update, remove } = useRows<Objective>('objectives', { filter: { season_id: s.id }, order: 'week_due' })
  const [f, setF] = useState(blank)
  const [editing, setEditing] = useState<number | null>(null)
  const week = buildWeek(s.kickoff)

  const save = async () => {
    if (!f.title.trim()) return
    const ok = editing ? await update(editing, f) : await insert({ ...f, season_id: s.id })
    if (ok) { setF(blank); setEditing(null) }
  }
  const edit = (o: Objective) => { setEditing(o.id); setF({ area: o.area, title: o.title, week_start: o.week_start, week_due: o.week_due, progress: o.progress, is_milestone: o.is_milestone }) }
  const num = (k: 'week_start' | 'week_due' | 'progress') => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: Number(e.target.value) })

  return (
    <>
      <p className="muted small">Semana actual de construcción: {week}</p>
      {isStaff && (
        <Card title={editing ? 'Editar objetivo' : 'Nuevo objetivo'}>
          <div className="form">
            <Field label="Área"><Select value={f.area} onChange={(e) => setF({ ...f, area: e.target.value as Area })} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>
            <Field label="Objetivo"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
            <Field label="Semana inicio"><Input type="number" min={1} value={f.week_start} onChange={num('week_start')} /></Field>
            <Field label="Semana límite"><Input type="number" min={1} value={f.week_due} onChange={num('week_due')} /></Field>
            <Field label="Avance %"><Input type="number" min={0} max={100} value={f.progress} onChange={num('progress')} /></Field>
            <label className="row"><input type="checkbox" checked={f.is_milestone} onChange={(e) => setF({ ...f, is_milestone: e.target.checked })} /> Hito</label>
            <div className="row"><Button onClick={save}>{editing ? 'Guardar' : 'Agregar'}</Button>{editing && <Button variant="ghost" onClick={() => { setEditing(null); setF(blank) }}>Cancelar</Button>}</div>
          </div>
        </Card>
      )}
      {loading ? <Loading /> : AREAS.map((a) => {
        const list = rows.filter((o) => o.area === a)
        return (
          <Card key={a} title={AREA_LABEL[a]}>
            {list.length === 0 ? <Empty>Sin objetivos.</Empty> : (
              <Table head={['Objetivo', 'Semanas', 'Avance', ...(isStaff ? [''] : [])]}>
                {list.map((o) => {
                  const exp = expectedProgress(o.week_start, o.week_due, week)
                  return (
                    <tr key={o.id}>
                      <td>{o.is_milestone && <Badge tone="info">Hito</Badge>} {o.title}</td>
                      <td>{o.week_start}–{o.week_due}</td>
                      <td style={{ minWidth: 140 }}><Progress value={o.progress} expected={exp} /><span className="muted small">{o.progress}% (esperado {exp}%)</span></td>
                      {isStaff && <td className="row"><Button variant="ghost" onClick={() => edit(o)}>Editar</Button><Button variant="danger" onClick={() => confirm('¿Eliminar objetivo?') && remove(o.id)}>Borrar</Button></td>}
                    </tr>
                  )
                })}
              </Table>
            )}
          </Card>
        )
      })}
    </>
  )
}
