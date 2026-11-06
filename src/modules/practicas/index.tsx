import { useMemo, useState } from 'react'
import { Page, Card, Field, Input, Textarea, Select, Button, Badge, Progress, Empty, Loading } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import { supabase } from '../../lib/supabase'
import { AREAS, AREA_LABEL, LEVELS, LEVEL_LABEL, type Area, type Level } from '../../lib/constants'
import type { Practice, Submission, Profile } from '../../lib/types'

const TONE = { enviado: 'info', validado: 'ok', rechazado: 'bad' } as const
const STATUS_LABEL = { enviado: 'En revisión', validado: 'Validada', rechazado: 'Rechazada' } as const
const lines = (s: string | null) => (s ?? '').split('\n').map((l) => l.trim()).filter(Boolean)

function Resources({ text }: { text: string | null }) {
  const items = lines(text).map((l) => {
    const [a, b] = l.split('|').map((x) => x.trim())
    return b ? { label: a, url: b } : { label: a, url: a }
  })
  if (!items.length) return null
  return (
    <ul>
      {items.map((r, i) => (
        <li key={i}>{/^https?:\/\//.test(r.url) ? <a href={r.url} target="_blank" rel="noreferrer">{r.label}</a> : r.label}</li>
      ))}
    </ul>
  )
}

function PracticeForm({ initial, area, level, onSave, onCancel }: {
  initial?: Practice; area: Area; level: Level
  onSave: (v: Partial<Practice>) => void; onCancel: () => void
}) {
  const [v, setV] = useState<Partial<Practice>>(initial ?? { area, level, week: 1, title: '' })
  const set = (k: keyof Practice, x: string | number) => setV({ ...v, [k]: x })
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); onSave(v) }}>
      <div className="row">
        <Field label="Área"><Select value={v.area} onChange={(e) => set('area', e.target.value)} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>
        <Field label="Nivel"><Select value={v.level} onChange={(e) => set('level', e.target.value)} options={LEVELS.map((l) => ({ value: l, label: LEVEL_LABEL[l] }))} /></Field>
        <Field label="Semana"><Input type="number" min={1} value={v.week ?? 1} onChange={(e) => set('week', Number(e.target.value))} /></Field>
      </div>
      <Field label="Título"><Input required value={v.title ?? ''} onChange={(e) => set('title', e.target.value)} /></Field>
      <Field label="Objetivo"><Textarea value={v.objective ?? ''} onChange={(e) => set('objective', e.target.value)} /></Field>
      <Field label="Entregable"><Textarea value={v.deliverable ?? ''} onChange={(e) => set('deliverable', e.target.value)} /></Field>
      <Field label="Rúbrica (un criterio por línea)"><Textarea rows={4} value={v.rubric ?? ''} onChange={(e) => set('rubric', e.target.value)} /></Field>
      <Field label="Recursos (Título | URL, uno por línea)"><Textarea rows={4} value={v.resources ?? ''} onChange={(e) => set('resources', e.target.value)} /></Field>
      <div className="row"><Button type="submit">Guardar</Button><Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button></div>
    </form>
  )
}

function SubmitForm({ practice, current, userId, onDone }: { practice: Practice; current?: Submission; userId: string; onDone: () => void }) {
  const [url, setUrl] = useState(current?.evidence_url ?? '')
  const [notes, setNotes] = useState(current?.notes ?? '')
  const [busy, setBusy] = useState(false)
  async function send(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    const { error } = await supabase.from('submissions').upsert(
      { practice_id: practice.id, student_id: userId, evidence_url: url, notes, status: 'enviado', feedback: null, validated_by: null },
      { onConflict: 'practice_id,student_id' },
    )
    setBusy(false)
    if (error) return alert(error.message)
    onDone()
  }
  return (
    <form className="form" onSubmit={send}>
      <Field label="Evidencia (enlace a Drive, Onshape, GitHub o video)"><Input type="url" required placeholder="https://" value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
      <Field label="Notas"><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
      <div><Button type="submit" disabled={busy}>{current ? 'Reenviar evidencia' : 'Enviar evidencia'}</Button></div>
    </form>
  )
}

function Validation() {
  const { profile } = useAuth()
  const subs = useRows<Submission>('submissions', { filter: { status: 'enviado' }, order: 'created_at' })
  const practices = useRows<Practice>('practices')
  const students = useRows<Profile>('profiles', { select: 'id,full_name,email,area,level' })
  const [fb, setFb] = useState<Record<number, string>>({})

  if (subs.loading || practices.loading) return <Loading />
  if (!subs.rows.length) return <Empty>No hay evidencias pendientes de revisar.</Empty>

  const decide = (s: Submission, status: 'validado' | 'rechazado') =>
    subs.update(s.id, { status, feedback: fb[s.id] || null, validated_by: profile!.id })

  return (
    <div className="grid">
      {subs.rows.map((s) => {
        const p = practices.rows.find((x) => x.id === s.practice_id)
        const st = students.rows.find((x) => x.id === s.student_id)
        return (
          <Card key={s.id} title={p?.title ?? 'Práctica'}>
            <p><strong>{st?.full_name || st?.email || 'Alumno'}</strong> <span className="muted small">{p ? `${AREA_LABEL[p.area]} · ${LEVEL_LABEL[p.level]}` : ''}</span></p>
            <p>Evidencia: {s.evidence_url ? <a href={s.evidence_url} target="_blank" rel="noreferrer">{s.evidence_url}</a> : '—'}</p>
            {s.notes && <p className="muted">{s.notes}</p>}
            {p && <ul>{lines(p.rubric).map((r, i) => <li key={i}>{r}</li>)}</ul>}
            <Field label="Retroalimentación"><Textarea value={fb[s.id] ?? ''} onChange={(e) => setFb({ ...fb, [s.id]: e.target.value })} /></Field>
            <div className="row">
              <Button onClick={() => decide(s, 'validado')}>Validar</Button>
              <Button variant="danger" onClick={() => decide(s, 'rechazado')}>Rechazar</Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default function Practicas() {
  const { profile, season, isStaff, isCoach } = useAuth()
  const [tab, setTab] = useState<'lista' | 'validacion'>('lista')
  const [area, setArea] = useState<Area>(profile?.area ?? 'mecanica')
  const [level, setLevel] = useState<Level>(profile?.level ?? 'basico')
  const [open, setOpen] = useState<number | null>(null)
  const [editing, setEditing] = useState<Practice | 'new' | null>(null)

  const practices = useRows<Practice>('practices', { order: 'week' })
  const subs = useRows<Submission>('submissions', { filter: { student_id: profile?.id ?? '' }, skip: !profile })
  const list = useMemo(() => practices.rows.filter((p) => p.area === area && p.level === level), [practices.rows, area, level])

  if (!season) return <Page title="Prácticas de aprendizaje"><Empty>Un coach debe crear la temporada para comenzar.</Empty></Page>
  if (practices.loading || subs.loading) return <Page title="Prácticas de aprendizaje"><Loading /></Page>

  const subOf = (id: number) => subs.rows.find((s) => s.practice_id === id)
  const validated = list.filter((p) => subOf(p.id)?.status === 'validado').length
  const pct = list.length ? Math.round((100 * validated) / list.length) : 0
  const isOwnScope = profile?.area === area && profile?.level === level

  async function save(v: Partial<Practice>) {
    const ok = v.id ? await practices.update(v.id, v) : await practices.insert(v)
    if (ok) setEditing(null)
  }

  const actions = (
    <>
      {isCoach && (
        <>
          <Button variant={tab === 'lista' ? 'primary' : 'ghost'} onClick={() => setTab('lista')}>Prácticas</Button>
          <Button variant={tab === 'validacion' ? 'primary' : 'ghost'} onClick={() => setTab('validacion')}>Validación</Button>
        </>
      )}
      {isStaff && tab === 'lista' && <Button onClick={() => setEditing('new')}>Nueva práctica</Button>}
    </>
  )

  return (
    <Page title="Prácticas de aprendizaje" actions={actions}>
      {tab === 'validacion' && isCoach ? <Validation /> : (
        <>
          <div className="row">
            <Field label="Área"><Select value={area} onChange={(e) => setArea(e.target.value as Area)} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>
            <Field label="Nivel"><Select value={level} onChange={(e) => setLevel(e.target.value as Level)} options={LEVELS.map((l) => ({ value: l, label: LEVEL_LABEL[l] }))} /></Field>
          </div>

          {editing && (
            <Card title={editing === 'new' ? 'Nueva práctica' : 'Editar práctica'}>
              <PracticeForm initial={editing === 'new' ? undefined : editing} area={area} level={level} onSave={save} onCancel={() => setEditing(null)} />
            </Card>
          )}

          <Card title={`Progreso: ${validated} de ${list.length} validadas (${pct}%)`}>
            <Progress value={pct} />
            {pct === 100 && list.length > 0 && isOwnScope && profile?.level !== 'avanzado' && (
              <p className="alert alert-info">Listo para subir de nivel. Habla con tu coach para que actualice tu nivel.</p>
            )}
            {pct === 100 && list.length > 0 && isOwnScope && profile?.level === 'avanzado' && (
              <p className="alert alert-info">Completaste todo el nivel avanzado de tu área.</p>
            )}
          </Card>

          {!list.length ? <Empty>No hay prácticas para esta área y nivel.</Empty> : (
            <div className="grid">
              {list.map((p) => {
                const s = subOf(p.id)
                const canSend = !!profile && s?.status !== 'validado' && s?.status !== 'enviado'
                return (
                  <Card key={p.id} title={`Semana ${p.week} · ${p.title}`}
                    actions={<>
                      {s ? <Badge tone={TONE[s.status]}>{STATUS_LABEL[s.status]}</Badge> : <Badge>Pendiente</Badge>}
                      {isStaff && <Button variant="ghost" onClick={() => setEditing(p)}>Editar</Button>}
                      {isStaff && <Button variant="danger" onClick={() => confirm('¿Eliminar esta práctica?') && practices.remove(p.id)}>Eliminar</Button>}
                    </>}>
                    {p.objective && <p><strong>Objetivo:</strong> {p.objective}</p>}
                    {p.deliverable && <p><strong>Entregable:</strong> {p.deliverable}</p>}
                    {!!lines(p.rubric).length && <><strong>Rúbrica</strong><ul>{lines(p.rubric).map((r, i) => <li key={i}>{r}</li>)}</ul></>}
                    {!!lines(p.resources).length && <><strong>Recursos</strong><Resources text={p.resources} /></>}
                    {s?.feedback && <p className={`alert ${s.status === 'rechazado' ? 'alert-bad' : 'alert-info'}`}>Retroalimentación: {s.feedback}</p>}
                    {s?.evidence_url && <p className="small muted">Enviado: <a href={s.evidence_url} target="_blank" rel="noreferrer">{s.evidence_url}</a></p>}
                    {canSend && (open === p.id
                      ? <SubmitForm practice={p} current={s} userId={profile!.id} onDone={() => { setOpen(null); subs.reload() }} />
                      : <Button variant="ghost" onClick={() => setOpen(p.id)}>{s ? 'Reenviar evidencia' : 'Enviar evidencia'}</Button>)}
                  </Card>
                )
              })}
            </div>
          )}
        </>
      )}
    </Page>
  )
}
