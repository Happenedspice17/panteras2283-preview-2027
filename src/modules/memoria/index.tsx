import { useState, type FormEvent } from 'react'
import { useAuth } from '../../lib/auth'
import { useRows, fmtDate } from '../../lib/db'
import { AREAS, AREA_LABEL } from '../../lib/constants'
import type { Doc } from '../../lib/types'
import { Page, Card, Field, Input, Select, Textarea, Button, Badge, Empty, Table } from '../../components/ui'

type Kind = Doc['kind']
type Tone = 'neutral' | 'ok' | 'warn' | 'bad' | 'info'

const KIND: Record<Kind, { label: string; tone: Tone }> = {
  decision: { label: 'Decisión', tone: 'info' },
  retrospectiva: { label: 'Retrospectiva', tone: 'ok' },
  minuta: { label: 'Minuta', tone: 'neutral' },
  impact: { label: 'Impacto', tone: 'warn' },
}

const PLANTILLAS: Record<Kind, string> = {
  decision: 'Contexto:\n\n\nOpciones:\n- \n- \n\nDecisión:\n\n\nPor qué:\n',
  retrospectiva: 'Qué salió bien:\n- \n\nQué mejorar:\n- \n\nAcciones (responsable y fecha):\n- ',
  minuta: 'Asistentes:\n- \n\nAcuerdos (responsable y fecha):\n- [ ] \n\nTemas tratados:\n- ',
  impact: 'Evidencia:\n- \n\nFecha:\n\nImpacto:\n\nEnlace:\n',
}

interface FormState { id?: number; kind: Kind; title: string; area: string; date: string; body: string }
const hoy = () => new Date().toLocaleDateString('en-CA')
const BLANK: FormState = { kind: 'decision', title: '', area: '', date: hoy(), body: PLANTILLAS.decision }

export default function Memoria() {
  const { isStaff, season } = useAuth()
  if (!season) return <Page title="Memoria"><Empty>Un coach debe crear la temporada para usar la memoria del equipo.</Empty></Page>
  return <MemoriaLista isStaff={isStaff} />
}

function MemoriaLista({ isStaff }: { isStaff: boolean }) {
  const docs = useRows<Doc>('docs', { order: 'date', asc: false })
  const [filtroKind, setFiltroKind] = useState('todos')
  const [filtroArea, setFiltroArea] = useState('todas')
  const [texto, setTexto] = useState('')
  const [form, setForm] = useState<FormState | null>(null)
  const [verId, setVerId] = useState<number | null>(null)

  const q = texto.trim().toLowerCase()
  const visibles = docs.rows.filter((d) =>
    (filtroKind === 'todos' || d.kind === filtroKind) &&
    (filtroArea === 'todas' || (filtroArea === 'ninguna' ? !d.area : d.area === filtroArea)) &&
    (!q || d.title.toLowerCase().includes(q) || (d.body ?? '').toLowerCase().includes(q)),
  )
  const ver = docs.rows.find((d) => d.id === verId) ?? null

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => setForm({ ...form!, [k]: e.target.value })

  function cambiarKind(kind: Kind) {
    const f = form!
    const eraPlantilla = f.body === '' || Object.values(PLANTILLAS).includes(f.body)
    setForm({ ...f, kind, body: f.id === undefined && eraPlantilla ? PLANTILLAS[kind] : f.body })
  }

  function nuevo() { setForm(BLANK) }

  function editar(d: Doc) {
    setForm({ id: d.id, kind: d.kind, title: d.title, area: d.area ?? '', date: d.date, body: d.body ?? '' })
  }

  async function guardar(e: FormEvent) {
    e.preventDefault()
    const f = form!
    if (!f.title.trim()) return
    const v = { kind: f.kind, title: f.title.trim(), area: (f.area || null) as Doc['area'], date: f.date, body: f.body }
    const ok = f.id !== undefined ? await docs.update(f.id, v) : await docs.insert(v)
    if (ok) setForm(null)
  }

  const head = ['Fecha', 'Tipo', 'Título', 'Área', 'Acciones']

  return (
    <Page title="Memoria del equipo" actions={isStaff && <Button onClick={() => (form ? setForm(null) : nuevo())}>{form ? 'Cerrar' : 'Nuevo documento'}</Button>}>
      {form && (
        <Card title={form.id !== undefined ? 'Editar documento' : 'Nuevo documento'}>
          <form className="form" onSubmit={guardar} style={{ gridTemplateColumns: '1fr' }}>
            <div className="form" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              <Field label="Tipo">
                <Select value={form.kind} onChange={(e) => cambiarKind(e.target.value as Kind)} options={Object.entries(KIND).map(([value, k]) => ({ value, label: k.label }))} />
              </Field>
              <Field label="Título"><Input required value={form.title} onChange={set('title')} /></Field>
              <Field label="Área">
                <Select value={form.area} onChange={set('area')} options={[{ value: '', label: 'Sin área' }, ...AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))]} />
              </Field>
              <Field label="Fecha"><Input type="date" required value={form.date} onChange={set('date')} /></Field>
            </div>
            <Field label="Cuerpo"><Textarea rows={12} value={form.body} onChange={set('body')} /></Field>
            <div className="row"><Button type="submit">Guardar</Button></div>
          </form>
        </Card>
      )}

      {ver && (
        <Card
          title={ver.title}
          actions={<><Badge tone={KIND[ver.kind].tone}>{KIND[ver.kind].label}</Badge>{isStaff && <Button variant="ghost" onClick={() => editar(ver)}>Editar</Button>}<Button variant="ghost" onClick={() => setVerId(null)}>Cerrar</Button></>}
        >
          <p className="muted small">{fmtDate(ver.date)}{ver.area && ` · ${AREA_LABEL[ver.area]}`}</p>
          <div style={{ whiteSpace: 'pre-wrap' }}>{ver.body || <span className="muted">Sin contenido.</span>}</div>
        </Card>
      )}

      <div className="row" style={{ marginBottom: 12 }}>
        <Field label="Buscar">
          <Input type="search" placeholder="Título o cuerpo" value={texto} onChange={(e) => setTexto(e.target.value)} />
        </Field>
        <Field label="Tipo">
          <Select value={filtroKind} onChange={(e) => setFiltroKind(e.target.value)} options={[{ value: 'todos', label: 'Todos' }, ...Object.entries(KIND).map(([value, k]) => ({ value, label: k.label }))]} />
        </Field>
        <Field label="Área">
          <Select value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)} options={[{ value: 'todas', label: 'Todas' }, { value: 'ninguna', label: 'Sin área' }, ...AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))]} />
        </Field>
      </div>

      {docs.loading && <p className="muted">Cargando…</p>}
      {!docs.loading && !visibles.length && <Empty>No hay documentos con esos filtros.</Empty>}
      {!!visibles.length && (
        <Card>
          <Table head={head}>
            {visibles.map((d) => (
              <tr key={d.id}>
                <td>{fmtDate(d.date)}</td>
                <td><Badge tone={KIND[d.kind].tone}>{KIND[d.kind].label}</Badge></td>
                <td>{d.title}</td>
                <td>{d.area ? AREA_LABEL[d.area] : '—'}</td>
                <td>
                  <div className="row">
                    <Button variant="ghost" onClick={() => setVerId(d.id)}>Ver</Button>
                    {isStaff && <Button variant="ghost" onClick={() => editar(d)}>Editar</Button>}
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      )}
    </Page>
  )
}
