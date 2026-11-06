import { useState } from 'react'
import { Card, Button, Input, Textarea, Field, Empty } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows, fmtDate } from '../../lib/db'
import type { Doc, EventRow } from '../../lib/types'

export default function Revision({ ev }: { ev: EventRow }) {
  const { isStaff } = useAuth()
  const docs = useRows<Doc>('docs', { filter: { kind: 'retrospectiva', event_id: ev.id }, order: 'date', asc: false })
  const [f, setF] = useState({ title: `Revisión: ${ev.title}`, bien: '', mejorar: '', acciones: '' })

  const save = async () => {
    const body = `## Qué salió bien\n${f.bien}\n\n## Qué mejorar\n${f.mejorar}\n\n## Acciones\n${f.acciones}`
    if (await docs.insert({ kind: 'retrospectiva', title: f.title, body, event_id: ev.id })) setF({ ...f, bien: '', mejorar: '', acciones: '' })
  }

  return (
    <>
      {isStaff && (
        <Card title="Nueva revisión">
          <div className="form" style={{ gridTemplateColumns: '1fr' }}>
            <Field label="Título"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
            <Field label="Qué salió bien"><Textarea value={f.bien} onChange={(e) => setF({ ...f, bien: e.target.value })} /></Field>
            <Field label="Qué mejorar"><Textarea value={f.mejorar} onChange={(e) => setF({ ...f, mejorar: e.target.value })} /></Field>
            <Field label="Acciones"><Textarea value={f.acciones} onChange={(e) => setF({ ...f, acciones: e.target.value })} /></Field>
            <div><Button onClick={save} disabled={!f.title.trim()}>Guardar revisión</Button></div>
          </div>
        </Card>
      )}
      {!docs.rows.length ? <Empty>Aún no hay revisiones de este evento.</Empty> : docs.rows.map((d) => (
        <Card key={d.id} title={`${d.title} · ${fmtDate(d.date)}`}>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{d.body}</p>
        </Card>
      ))}
    </>
  )
}
