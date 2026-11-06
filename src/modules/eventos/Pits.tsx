import { useState } from 'react'
import { Card, Badge, Button, Input, Progress, Empty, Field } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import type { EventRow, PitItem } from '../../lib/types'

export default function Pits({ ev }: { ev: EventRow }) {
  const { isStaff } = useAuth()
  const items = useRows<PitItem>('pit_checklist', { filter: { event_id: ev.id }, order: 'id' })
  const tpl = useRows<PitItem>('pit_checklist', { filter: { event_id: null }, order: 'id' })
  const [item, setItem] = useState('')
  const [cat, setCat] = useState('')

  const done = items.rows.filter((i) => i.done).length
  const pct = items.rows.length ? Math.round((done / items.rows.length) * 100) : 0
  const groups = [...new Set(items.rows.map((i) => i.category || 'General'))]

  const fromTpl = () => items.insert(tpl.rows.map((t) => ({ event_id: ev.id, item: t.item, category: t.category, done: false })))
  const add = async () => {
    if (!item.trim()) return
    if (await items.insert({ event_id: ev.id, item: item.trim(), category: cat.trim() || null })) { setItem(''); setCat('') }
  }

  return (
    <>
      <Card title={`Avance: ${pct}% (${done}/${items.rows.length})`}
        actions={isStaff && !items.rows.length && <Button onClick={fromTpl} disabled={!tpl.rows.length}>Crear desde plantilla ({tpl.rows.length})</Button>}>
        <Progress value={pct} />
      </Card>
      {isStaff && (
        <Card title="Agregar item">
          <div className="form">
            <Field label="Item"><Input value={item} onChange={(e) => setItem(e.target.value)} /></Field>
            <Field label="Categoría"><Input value={cat} onChange={(e) => setCat(e.target.value)} list="cats" /></Field>
            <datalist id="cats">{groups.map((g) => <option key={g} value={g} />)}</datalist>
            <div><Button onClick={add}>Agregar</Button></div>
          </div>
        </Card>
      )}
      {!items.rows.length ? <Empty>Checklist vacío.{isStaff ? ' Crea uno desde la plantilla o agrega items.' : ''}</Empty> : groups.map((g) => {
        const list = items.rows.filter((i) => (i.category || 'General') === g)
        return (
          <Card key={g} title={g} actions={<Badge tone={list.every((i) => i.done) ? 'ok' : 'neutral'}>{list.filter((i) => i.done).length}/{list.length}</Badge>}>
            {list.map((i) => (
              <div key={i.id} className="row" style={{ justifyContent: 'space-between', padding: '4px 0' }}>
                <label className="row">
                  <input type="checkbox" checked={i.done} onChange={(e) => items.update(i.id, { done: e.target.checked })} />
                  <span style={{ textDecoration: i.done ? 'line-through' : 'none' }}>{i.item}</span>
                </label>
                {isStaff && <Button variant="danger" onClick={() => items.remove(i.id)}>×</Button>}
              </div>
            ))}
          </Card>
        )
      })}
    </>
  )
}
