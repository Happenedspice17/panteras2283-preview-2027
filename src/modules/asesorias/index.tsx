import { useState, type FormEvent } from 'react'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import type { CompRole, Mentoring, Objective, Part, Season } from '../../lib/types'
import { Page, Card, Field, Input, Select, Textarea, Button, Badge, Empty, Table, Stat } from '../../components/ui'
import { resumenContexto, rangoSemana } from './resumen'

type Status = Mentoring['status']
type Agreement = Mentoring['agreements'][number]
type Tone = 'neutral' | 'ok' | 'warn' | 'bad' | 'info'

const STATUS: Record<Status, { label: string; tone: Tone }> = {
  solicitada: { label: 'Solicitada', tone: 'warn' },
  agendada: { label: 'Agendada', tone: 'info' },
  realizada: { label: 'Realizada', tone: 'ok' },
  cancelada: { label: 'Cancelada', tone: 'neutral' },
}
const MAX_HORAS_AREA_SEMANA = 1
const fmtFecha = (iso: string) => new Date(iso).toLocaleString('es-MX', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const aLocal = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() - new Date(iso).getTimezoneOffset() * 6e4).toISOString().slice(0, 16) : '')

interface FormState { area: Area; topic: string; tried: string; decide: string; scheduled: string; responsible_adult: string; summary: string }
const BLANK: FormState = { area: 'estrategia', topic: '', tried: '', decide: '', scheduled: '', responsible_adult: '', summary: '' }

interface Draft {
  status: Status; scheduled: string; mentor_name: string; minutes: string; hours: string
  agreements: Agreement[]; rating: string; comment: string
}

export default function Asesorias() {
  const { season, isStaff, profile } = useAuth()
  if (!season) return <Page title="Asesorías"><Empty>Un coach debe crear la temporada para usar asesorías.</Empty></Page>
  return <AsesoriasTemporada season={season} isStaff={isStaff} canEdit={isStaff || profile?.role === 'mentor'} />
}

function AsesoriasTemporada({ season, isStaff, canEdit }: { season: Season; isStaff: boolean; canEdit: boolean }) {
  const asesorias = useRows<Mentoring>('mentoring', { order: 'created_at', asc: false })
  const objetivos = useRows<Objective>('objectives', { filter: { season_id: season.id } })
  const piezas = useRows<Part>('parts', { filter: { season_id: season.id } })
  const roles = useRows<CompRole>('comp_roles', { filter: { season_id: season.id } })
  const rows = asesorias.rows

  const [filtro, setFiltro] = useState<'todos' | Status>('todos')
  const [form, setForm] = useState<FormState | null>(null)
  const [abiertoId, setAbiertoId] = useState<number | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)

  const visibles = rows.filter((r) => filtro === 'todos' || r.status === filtro)
  const abierto = rows.find((r) => r.id === abiertoId) ?? null

  function horasUsadas(area: Area, iso: string | null, excluirId?: number) {
    if (!iso) return 0
    const [ini, fin] = rangoSemana(new Date(iso))
    return rows
      .filter((r) => r.id !== excluirId && r.area === area && r.status !== 'cancelada' && r.scheduled_at && new Date(r.scheduled_at).getTime() >= ini && new Date(r.scheduled_at).getTime() < fin)
      .reduce((s, r) => s + (r.hours ?? 0), 0)
  }

  const [ini, fin] = rangoSemana(new Date())
  const horasSemana = (area: Area) => rows
    .filter((r) => r.area === area && (r.status === 'agendada' || r.status === 'realizada') && r.scheduled_at && new Date(r.scheduled_at).getTime() >= ini && new Date(r.scheduled_at).getTime() < fin)
    .reduce((s, r) => s + (r.hours ?? 0), 0)
  const calificadas = rows.filter((r) => r.rating != null)
  const promedio = calificadas.length ? (calificadas.reduce((s, r) => s + (r.rating ?? 0), 0) / calificadas.length).toFixed(1) : '—'
  const acuerdos = rows.flatMap((r) => r.agreements ?? [])
  const cumplidos = acuerdos.filter((a) => a.done).length
  const pctAcuerdos = acuerdos.length ? `${Math.round((100 * cumplidos) / acuerdos.length)}%` : '—'

  const setF = (k: keyof FormState) => (e: { target: { value: string } }) => setForm({ ...form!, [k]: e.target.value })

  function generarResumen() {
    if (!form) return
    setForm({ ...form, summary: resumenContexto(form.area, season, objetivos.rows, piezas.rows, roles.rows) })
  }

  async function solicitar(e: FormEvent) {
    e.preventDefault()
    const f = form!
    if (!f.topic.trim() || !f.responsible_adult.trim()) return
    let scheduled: string | null = null
    if (f.scheduled) {
      const t = new Date(f.scheduled)
      if (t.getTime() - Date.now() < 48 * 3600e3) { alert('La fecha propuesta debe tener al menos 48 horas de anticipación.'); return }
      scheduled = t.toISOString()
    }
    const usadas = horasUsadas(f.area, scheduled)
    if (usadas + 1 > MAX_HORAS_AREA_SEMANA && !confirm(`${AREA_LABEL[f.area]} ya tiene ${usadas} h en esa semana (máximo ${MAX_HORAS_AREA_SEMANA} h por área). ¿Continuar?`)) return
    const ok = await asesorias.insert({
      area: f.area, topic: f.topic.trim(), tried: f.tried.trim() || null, decide: f.decide.trim() || null,
      scheduled_at: scheduled, responsible_adult: f.responsible_adult.trim(), context_summary: f.summary || null,
      status: 'solicitada',
    })
    if (ok) setForm(null)
  }

  function abrir(m: Mentoring) {
    setAbiertoId(m.id)
    setDraft({
      status: m.status, scheduled: aLocal(m.scheduled_at), mentor_name: m.mentor_name ?? '', minutes: m.minutes ?? '',
      hours: String(m.hours ?? 1), agreements: m.agreements ?? [], rating: m.rating ? String(m.rating) : '', comment: m.comment ?? '',
    })
  }

  async function guardarDetalle() {
    if (!abierto || !draft) return
    const scheduled = draft.scheduled ? new Date(draft.scheduled).toISOString() : null
    const hours = Number(draft.hours) || 0
    const usadas = horasUsadas(abierto.area, scheduled, abierto.id)
    if (draft.status !== 'cancelada' && scheduled && usadas + hours > MAX_HORAS_AREA_SEMANA
      && !confirm(`${AREA_LABEL[abierto.area]} sumaría ${usadas + hours} h en esa semana (máximo ${MAX_HORAS_AREA_SEMANA} h por área). ¿Guardar?`)) return
    const ok = await asesorias.update(abierto.id, {
      status: draft.status, scheduled_at: scheduled, mentor_name: draft.mentor_name.trim() || null,
      minutes: draft.minutes.trim() || null, hours, agreements: draft.agreements,
      rating: draft.rating ? Number(draft.rating) : null, comment: draft.comment.trim() || null,
    })
    if (ok) setAbiertoId(null)
  }

  const setD = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft({ ...draft!, [k]: v })
  const setAcuerdo = (i: number, patch: Partial<Agreement>) =>
    setD('agreements', draft!.agreements.map((a, j) => (j === i ? { ...a, ...patch } : a)))

  return (
    <Page title="Asesorías" actions={isStaff && <Button onClick={() => setForm(form ? null : BLANK)}>{form ? 'Cerrar' : 'Nueva solicitud'}</Button>}>
      <div className="grid" style={{ marginBottom: 16 }}>
        {AREAS.map((a) => {
          const h = horasSemana(a)
          return <Stat key={a} label={`${AREA_LABEL[a]} · horas esta semana`} value={`${h} h`} hint={h > MAX_HORAS_AREA_SEMANA ? `Excede el máximo de ${MAX_HORAS_AREA_SEMANA} h` : `Máximo ${MAX_HORAS_AREA_SEMANA} h`} />
        })}
        <Stat label="Calificación promedio" value={promedio} hint={`${calificadas.length} calificadas`} />
        <Stat label="Acuerdos cumplidos" value={pctAcuerdos} hint={`${cumplidos} de ${acuerdos.length}`} />
      </div>

      {isStaff && form && (
        <Card title="Nueva solicitud de asesoría">
          <form onSubmit={solicitar} style={{ display: 'grid', gap: 10 }}>
            <div className="form">
              <Field label="Área"><Select value={form.area} onChange={setF('area')} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>
              <Field label="Tema"><Input required value={form.topic} onChange={setF('topic')} /></Field>
              <Field label="Adulto responsable"><Input required value={form.responsible_adult} onChange={setF('responsible_adult')} /></Field>
              <Field label="Fecha y hora propuesta (mín. 48 h)"><Input type="datetime-local" value={form.scheduled} onChange={setF('scheduled')} /></Field>
            </div>
            <Field label="Qué han intentado"><Textarea value={form.tried} onChange={setF('tried')} /></Field>
            <Field label="Qué necesitan decidir"><Textarea value={form.decide} onChange={setF('decide')} /></Field>
            <div className="row">
              <Button type="button" variant="ghost" onClick={generarResumen}>Generar resumen de contexto</Button>
            </div>
            {form.summary && <Field label="Resumen de contexto (sin nombres de alumnos)"><Textarea rows={8} value={form.summary} onChange={setF('summary')} /></Field>}
            <div className="row"><Button type="submit">Enviar solicitud</Button></div>
          </form>
        </Card>
      )}

      {abierto && draft && (
        <Card
          title={`${abierto.topic} · ${AREA_LABEL[abierto.area]}`}
          actions={<Button variant="ghost" onClick={() => setAbiertoId(null)}>Cerrar</Button>}
        >
          <p className="small muted">Adulto responsable: {abierto.responsible_adult}</p>
          {abierto.tried && <p><strong>Han intentado:</strong> {abierto.tried}</p>}
          {abierto.decide && <p><strong>Necesitan decidir:</strong> {abierto.decide}</p>}
          {abierto.context_summary && <details className="small"><summary>Resumen de contexto</summary><div style={{ whiteSpace: 'pre-wrap' }}>{abierto.context_summary}</div></details>}

          {!canEdit && (
            <div style={{ whiteSpace: 'pre-wrap', marginTop: 12 }}>
              {abierto.minutes && <p><strong>Minuta:</strong> {abierto.minutes}</p>}
              {abierto.agreements?.length > 0 && <p><strong>Acuerdos:</strong> {abierto.agreements.map((a) => `${a.text} (${a.owner}${a.due ? `, ${a.due}` : ''}) ${a.done ? '✔' : '○'}`).join(' · ')}</p>}
            </div>
          )}

          {canEdit ? (
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              <div className="form">
                <Field label="Estado">
                  <Select value={draft.status} onChange={(e) => setD('status', e.target.value as Status)} options={Object.entries(STATUS).map(([value, s]) => ({ value, label: s.label }))} />
                </Field>
                <Field label="Fecha y hora agendada"><Input type="datetime-local" value={draft.scheduled} onChange={(e) => setD('scheduled', e.target.value)} /></Field>
                <Field label="Mentor"><Input value={draft.mentor_name} onChange={(e) => setD('mentor_name', e.target.value)} /></Field>
                <Field label="Horas"><Input type="number" min={0} step={0.5} value={draft.hours} onChange={(e) => setD('hours', e.target.value)} /></Field>
              </div>
              <Field label="Minuta"><Textarea rows={5} value={draft.minutes} onChange={(e) => setD('minutes', e.target.value)} /></Field>

              <div>
                <strong>Acuerdos</strong>
                {draft.agreements.map((a, i) => (
                  <div key={i} className="form" style={{ marginTop: 6 }}>
                    <Field label="Acuerdo"><Input value={a.text} onChange={(e) => setAcuerdo(i, { text: e.target.value })} /></Field>
                    <Field label="Responsable"><Input value={a.owner} onChange={(e) => setAcuerdo(i, { owner: e.target.value })} /></Field>
                    <Field label="Fecha límite"><Input type="date" value={a.due} onChange={(e) => setAcuerdo(i, { due: e.target.value })} /></Field>
                    <label className="field"><span>Cumplido</span><input type="checkbox" checked={a.done} onChange={(e) => setAcuerdo(i, { done: e.target.checked })} /></label>
                    <div><Button variant="danger" onClick={() => setD('agreements', draft.agreements.filter((_, j) => j !== i))}>Quitar</Button></div>
                  </div>
                ))}
                <Button variant="ghost" style={{ marginTop: 8 }} onClick={() => setD('agreements', [...draft.agreements, { text: '', owner: '', due: '', done: false }])}>Agregar acuerdo</Button>
              </div>

              <div className="form">
                <Field label="Calificación (1 a 5)">
                  <Select value={draft.rating} onChange={(e) => setD('rating', e.target.value)} options={[{ value: '', label: 'Sin calificar' }, ...[1, 2, 3, 4, 5].map((n) => ({ value: n, label: String(n) }))]} />
                </Field>
                <Field label="Comentario"><Input value={draft.comment} onChange={(e) => setD('comment', e.target.value)} /></Field>
              </div>
              <div className="row"><Button onClick={guardarDetalle}>Guardar</Button></div>
            </div>
          ) : (
            <p className="muted small">Solo staff o mentor pueden editar esta asesoría.</p>
          )}
        </Card>
      )}

      <div className="row" style={{ marginBottom: 12 }}>
        <Field label="Estado">
          <Select value={filtro} onChange={(e) => setFiltro(e.target.value as 'todos' | Status)} options={[{ value: 'todos', label: 'Todos' }, ...Object.entries(STATUS).map(([value, s]) => ({ value, label: s.label }))]} />
        </Field>
      </div>

      {asesorias.loading && <p className="muted">Cargando…</p>}
      {!asesorias.loading && !visibles.length && <Empty>No hay asesorías en este estado.</Empty>}
      {!!visibles.length && (
        <Card>
          <Table head={['Área', 'Tema', 'Estado', 'Programada', 'Adulto responsable', 'Mentor', 'Horas', 'Calificación', '']}>
            {visibles.map((m) => (
              <tr key={m.id}>
                <td>{AREA_LABEL[m.area]}</td>
                <td>{m.topic}</td>
                <td><Badge tone={STATUS[m.status].tone}>{STATUS[m.status].label}</Badge></td>
                <td>{m.scheduled_at ? fmtFecha(m.scheduled_at) : '—'}</td>
                <td>{m.responsible_adult}</td>
                <td>{m.mentor_name ?? '—'}</td>
                <td>{m.hours ?? '—'}</td>
                <td>{m.rating ?? '—'}</td>
                <td><Button variant="ghost" onClick={() => abrir(m)}>{canEdit ? 'Gestionar' : 'Ver'}</Button></td>
              </tr>
            ))}
          </Table>
        </Card>
      )}
    </Page>
  )
}
