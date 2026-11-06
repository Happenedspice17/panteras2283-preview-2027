import { useState } from 'react'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import type { Quiz } from '../../lib/types'
import { Badge, Button, Card, Empty, Field, Input, Select, Table, Textarea } from '../../components/ui'

interface QDraft { q: string; opciones: string; answer: string; why: string }
interface Draft { id?: number; title: string; area: string; pass_score: string; preguntas: QDraft[] }

const vacia: QDraft = { q: '', opciones: '', answer: '0', why: '' }
const nuevo = (): Draft => ({ title: '', area: 'seguridad', pass_score: '80', preguntas: [{ ...vacia }] })
const etiquetaArea = (a: string) => (a === 'seguridad' ? 'Seguridad' : AREA_LABEL[a as Area] ?? a)

export function QuizEditor({ quizzes, insert, update, remove }: {
  quizzes: Quiz[]
  insert: (v: Partial<Quiz>) => Promise<boolean>
  update: (id: number, v: Partial<Quiz>) => Promise<boolean>
  remove: (id: number) => Promise<boolean>
}) {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [error, setError] = useState<string | null>(null)

  const editar = (q: Quiz): Draft => ({
    id: q.id, title: q.title, area: q.area, pass_score: String(q.pass_score),
    preguntas: q.questions.map((x) => ({ q: x.q, opciones: x.options.join('\n'), answer: String(x.answer), why: x.why ?? '' })),
  })

  const setPregunta = (i: number, cambio: Partial<QDraft>) =>
    draft && setDraft({ ...draft, preguntas: draft.preguntas.map((p, k) => (k === i ? { ...p, ...cambio } : p)) })

  async function guardar() {
    if (!draft) return
    const preguntas = draft.preguntas.filter((p) => p.q.trim()).map((p) => ({
      q: p.q.trim(),
      options: p.opciones.split('\n').map((s) => s.trim()).filter(Boolean),
      answer: Number(p.answer),
      why: p.why.trim(),
    }))
    const bad = preguntas.findIndex((p) => p.options.length < 2 || !Number.isInteger(p.answer) || p.answer < 0 || p.answer >= p.options.length)
    if (!draft.title.trim()) return setError('Escribe el título del quiz.')
    if (!preguntas.length) return setError('Agrega al menos una pregunta.')
    if (bad >= 0) return setError(`Pregunta ${bad + 1}: necesita al menos 2 opciones y un índice correcto válido (0 = primera opción).`)
    setError(null)
    const v = { title: draft.title.trim(), area: draft.area, pass_score: Number(draft.pass_score), questions: preguntas }
    const ok = draft.id ? await update(draft.id, v) : await insert(v)
    if (ok) setDraft(null)
  }

  async function borrar(q: Quiz) {
    if (confirm(`¿Eliminar "${q.title}"? Se borran también sus intentos.`)) await remove(q.id)
  }

  return (
    <Card title="Gestionar quizzes" actions={!draft && <Button onClick={() => setDraft(nuevo())}>Nuevo quiz</Button>}>
      {draft && (
        <div style={{ marginBottom: 16 }}>
          <div className="form">
            <Field label="Título"><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></Field>
            <Field label="Área">
              <Select value={draft.area} onChange={(e) => setDraft({ ...draft, area: e.target.value })} options={[{ value: 'seguridad', label: 'Seguridad' }, ...AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))]} />
            </Field>
            <Field label="Mínimo para aprobar (%)"><Input type="number" min={0} max={100} value={draft.pass_score} onChange={(e) => setDraft({ ...draft, pass_score: e.target.value })} /></Field>
          </div>

          {draft.preguntas.map((p, i) => (
            <div key={i} className="card" style={{ marginTop: 12 }}>
              <div className="card-head">
                <strong>Pregunta {i + 1}</strong>
                <Button variant="danger" disabled={draft.preguntas.length === 1} onClick={() => setDraft({ ...draft, preguntas: draft.preguntas.filter((_, k) => k !== i) })}>Quitar</Button>
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <Field label="Pregunta"><Input value={p.q} onChange={(e) => setPregunta(i, { q: e.target.value })} /></Field>
                <Field label="Opciones (una por línea)"><Textarea value={p.opciones} onChange={(e) => setPregunta(i, { opciones: e.target.value })} /></Field>
                <Field label="Índice de la opción correcta (0 = primera)"><Input type="number" min={0} value={p.answer} onChange={(e) => setPregunta(i, { answer: e.target.value })} /></Field>
                <Field label="Retroalimentación (por qué)"><Textarea value={p.why} onChange={(e) => setPregunta(i, { why: e.target.value })} /></Field>
              </div>
            </div>
          ))}

          {error && <div className="alert alert-bad" style={{ marginTop: 12 }}>{error}</div>}
          <div className="row" style={{ marginTop: 12 }}>
            <Button variant="ghost" onClick={() => setDraft({ ...draft, preguntas: [...draft.preguntas, { ...vacia }] })}>Agregar pregunta</Button>
            <Button onClick={guardar}>{draft.id ? 'Guardar cambios' : 'Crear quiz'}</Button>
            <Button variant="ghost" onClick={() => { setDraft(null); setError(null) }}>Cancelar</Button>
          </div>
        </div>
      )}

      {quizzes.length === 0 ? <Empty>Aún no hay quizzes.</Empty> : (
        <Table head={['Quiz', 'Área', 'Preguntas', 'Mínimo', '']}>
          {quizzes.map((q) => (
            <tr key={q.id}>
              <td>{q.title}</td>
              <td><Badge>{etiquetaArea(q.area)}</Badge></td>
              <td>{q.questions.length}</td>
              <td>{q.pass_score}%</td>
              <td>
                <div className="row">
                  <Button variant="ghost" onClick={() => { setDraft(editar(q)); setError(null) }}>Editar</Button>
                  <Button variant="danger" onClick={() => borrar(q)}>Eliminar</Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </Card>
  )
}
