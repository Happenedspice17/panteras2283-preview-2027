import { useState, type FormEvent } from 'react'
import { useAuth } from '../../lib/auth'
import { useRows, fmtDate } from '../../lib/db'
import type { EventRow, Season } from '../../lib/types'
import { Page, Card, Field, Input, Select, Textarea, Button, Badge, Empty, Table } from '../../components/ui'

type Tone = 'neutral' | 'ok' | 'warn' | 'bad' | 'info'

const KIND: Record<string, { label: string; tone: Tone }> = {
  oficial: { label: 'Oficial', tone: 'info' },
  interno: { label: 'Interno', tone: 'neutral' },
  junta: { label: 'Junta', tone: 'warn' },
  competencia: { label: 'Competencia', tone: 'ok' },
  fecha_limite: { label: 'Fecha límite', tone: 'bad' },
}

const iso = (d: Date) => d.toISOString().slice(0, 10)
const addDays = (s: string, n: number) => { const d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d) }
const todayStr = () => { const d = new Date(); return iso(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))) }
const compact = (s: string) => s.replace(/-/g, '')

interface FormState { id?: number; title: string; kind: string; date_start: string; date_end: string; location: string; notes: string }
const BLANK: FormState = { title: '', kind: 'interno', date_start: '', date_end: '', location: '', notes: '' }

function exportarIcs(rows: EventRow[], season: Season) {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
  const plegar = (l: string) => (l.match(/.{1,74}/g) ?? ['']).join('\r\n ')
  const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Forja Panteras 2283//Calendario//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH']
  for (const r of rows) {
    lines.push('BEGIN:VEVENT', `UID:evento-${r.id}@forja-panteras-2283`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${compact(r.date_start)}`, `DTEND;VALUE=DATE:${compact(addDays(r.date_end ?? r.date_start, 1))}`,
      `SUMMARY:${esc(r.title)}`, `CATEGORIES:${esc(KIND[r.kind]?.label ?? r.kind)}`)
    if (r.location) lines.push(`LOCATION:${esc(r.location)}`)
    if (r.notes) lines.push(`DESCRIPTION:${esc(r.notes)}`)
    lines.push('END:VEVENT')
  }
  lines.push('END:VCALENDAR')
  const blob = new Blob([lines.map(plegar).join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `calendario-${season.year}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Calendario() {
  const { season, isStaff } = useAuth()
  if (!season) return <Page title="Calendario"><Empty>Un coach debe crear la temporada para ver el calendario.</Empty></Page>
  return <CalendarioTemporada season={season} isStaff={isStaff} />
}

function CalendarioTemporada({ season, isStaff }: { season: Season; isStaff: boolean }) {
  const evs = useRows<EventRow>('events', { filter: { season_id: season.id }, order: 'date_start' })
  const rows = evs.rows
  const [filtro, setFiltro] = useState('todos')
  const [form, setForm] = useState<FormState>(BLANK)
  const [editando, setEditando] = useState(false)
  const hoy = todayStr()

  const visibles = rows.filter((r) => filtro === 'todos' || r.kind === filtro)
  const meses = visibles.reduce<Record<string, EventRow[]>>((acc, r) => {
    const k = r.date_start.slice(0, 7)
    acc[k] = acc[k] || []
    acc[k].push(r)
    return acc
  }, {})

  const esHoy = (r: EventRow) => r.date_start <= hoy && hoy <= (r.date_end ?? r.date_start)
  const set = (k: keyof FormState) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })

  async function guardar(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.date_start) return
    if (form.date_end && form.date_end < form.date_start) { alert('La fecha de fin es anterior a la de inicio.'); return }
    const v = {
      title: form.title.trim(), kind: form.kind, date_start: form.date_start, date_end: form.date_end || null,
      location: form.location.trim() || null, notes: form.notes.trim() || null,
    }
    const ok = form.id !== undefined ? await evs.update(form.id, v) : await evs.insert({ ...v, season_id: season.id })
    if (ok) { setForm(BLANK); setEditando(false) }
  }

  function editar(r: EventRow) {
    setForm({ id: r.id, title: r.title, kind: r.kind, date_start: r.date_start, date_end: r.date_end ?? '', location: r.location ?? '', notes: r.notes ?? '' })
    setEditando(true)
  }

  async function eliminar(r: EventRow) {
    if (confirm(`¿Eliminar "${r.title}"? También se borran sus juntas ligadas.`)) await evs.remove(r.id)
  }

  async function generarJuntas(r: EventRow) {
    const fin = r.date_end ?? r.date_start
    const existentes = new Set(rows.filter((x) => x.parent_id === r.id).map((x) => x.title))
    const nuevos = [
      { title: `Previa: ${r.title}`, date_start: addDays(r.date_start, -7) },
      { title: `Posterior: ${r.title}`, date_start: addDays(fin, 3) },
    ]
      .filter((x) => !existentes.has(x.title))
      .map((x) => ({ ...x, kind: 'junta', season_id: season.id, parent_id: r.id }))
    if (!nuevos.length) { alert('Las juntas de este evento ya existen.'); return }
    await evs.insert(nuevos)
  }

  async function generarSemanales() {
    const existe = new Set(rows.map((r) => `${r.title}|${r.date_start}`))
    const nuevos: Partial<EventRow>[] = []
    for (let d = season.kickoff; d <= season.main_event; d = addDays(d, 1)) {
      const dow = new Date(d + 'T00:00:00Z').getUTCDay()
      const title = dow === 1 ? 'Planeación semanal' : dow === 5 ? 'Coordinación de adultos' : null
      if (title && !existe.has(`${title}|${d}`)) nuevos.push({ title, kind: 'junta', date_start: d, season_id: season.id })
    }
    if (!nuevos.length) { alert('No hay juntas semanales nuevas que crear.'); return }
    if (!confirm(`Crear ${nuevos.length} juntas semanales (lunes y viernes)?`)) return
    await evs.insert(nuevos)
  }

  const head = ['Fecha', 'Título', 'Tipo', 'Lugar', ...(isStaff ? ['Acciones'] : [])]

  return (
    <Page
      title="Calendario"
      actions={isStaff && (
        <>
          <Button variant="ghost" onClick={generarSemanales}>Generar juntas semanales</Button>
          <Button variant="ghost" onClick={() => exportarIcs(rows, season)} disabled={!rows.length}>Exportar .ics</Button>
          <Button onClick={() => { setForm(BLANK); setEditando(!editando) }}>{editando ? 'Cerrar formulario' : 'Nuevo evento'}</Button>
        </>
      )}
    >
      {!isStaff && (
        <div className="row" style={{ marginBottom: 12 }}>
          <Button variant="ghost" onClick={() => exportarIcs(rows, season)} disabled={!rows.length}>Exportar .ics</Button>
        </div>
      )}

      {isStaff && editando && (
        <Card title={form.id !== undefined ? 'Editar evento' : 'Nuevo evento'}>
          <form className="form" onSubmit={guardar}>
            <Field label="Título"><Input required value={form.title} onChange={set('title')} /></Field>
            <Field label="Tipo">
              <Select value={form.kind} onChange={set('kind')} options={Object.entries(KIND).map(([value, k]) => ({ value, label: k.label }))} />
            </Field>
            <Field label="Inicio"><Input type="date" required value={form.date_start} onChange={set('date_start')} /></Field>
            <Field label="Fin (opcional)"><Input type="date" value={form.date_end} min={form.date_start || undefined} onChange={set('date_end')} /></Field>
            <Field label="Lugar"><Input value={form.location} onChange={set('location')} /></Field>
            <Field label="Notas"><Textarea value={form.notes} onChange={set('notes')} /></Field>
            <div className="row"><Button type="submit">Guardar</Button></div>
          </form>
        </Card>
      )}

      <div className="row" style={{ marginBottom: 12 }}>
        <Field label="Filtrar por tipo">
          <Select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            options={[{ value: 'todos', label: 'Todos' }, ...Object.entries(KIND).map(([value, k]) => ({ value, label: k.label }))]}
          />
        </Field>
      </div>

      {evs.loading && <p className="muted">Cargando…</p>}
      {!evs.loading && !visibles.length && <Empty>No hay eventos{filtro !== 'todos' ? ' de este tipo' : ''} en la temporada.</Empty>}

      {Object.entries(meses).map(([mes, lista]) => (
        <Card key={mes} title={new Date(mes + '-01T00:00:00').toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}>
          <Table head={head}>
            {lista.map((r) => {
              const k = KIND[r.kind] ?? { label: r.kind, tone: 'neutral' as Tone }
              return (
                <tr key={r.id} style={esHoy(r) ? { background: 'var(--bg)', fontWeight: 600 } : undefined}>
                  <td>
                    {fmtDate(r.date_start)}{r.date_end && ` – ${fmtDate(r.date_end)}`}
                    {esHoy(r) && <> <Badge tone="info">Hoy</Badge></>}
                  </td>
                  <td>{r.parent_id ? '↳ ' : ''}{r.title}</td>
                  <td><Badge tone={k.tone}>{k.label}</Badge></td>
                  <td>{r.location ?? '—'}</td>
                  {isStaff && (
                    <td>
                      <div className="row">
                        <Button variant="ghost" onClick={() => editar(r)}>Editar</Button>
                        {(r.kind === 'oficial' || r.kind === 'competencia') && (
                          <Button variant="ghost" onClick={() => generarJuntas(r)}>Generar juntas</Button>
                        )}
                        <Button variant="danger" onClick={() => eliminar(r)}>Eliminar</Button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </Table>
        </Card>
      ))}
    </Page>
  )
}
