import { useEffect, useState } from 'react'
import { Card, Table, Field, Input, Textarea, Select, Button, Badge, Empty, Loading } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import { supabase } from '../../lib/supabase'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import type { KickoffItem, KickoffVote } from '../../lib/types'

const STEPS = ['Examen de reglas', 'Preguntas por equipo de análisis', 'Lista de Whats', 'Votación (10 puntos)', 'Hows y matriz de mecanismos']
const BAG = 10

export default function Kickoff() {
  const { season, isStaff, profile, refresh } = useAuth()
  const s = season!
  const items = useRows<KickoffItem>('kickoff_items', { filter: { season_id: s.id }, order: 'id' })
  const votes = useRows<KickoffVote & { id?: number }>('kickoff_votes')
  const [view, setView] = useState(s.kickoff_step)
  const [text, setText] = useState('')
  const [area, setArea] = useState<Area>('estrategia')
  const [parent, setParent] = useState('')
  const [mine, setMine] = useState<Record<number, number>>({})
  const [crit, setCrit] = useState(s.matrix_criteria)

  const all = items.rows
  const whats = all.filter((i) => i.type === 'what')
  const ids = new Set(whats.map((w) => w.id))
  const seasonVotes = votes.rows.filter((v) => ids.has(v.item_id))

  useEffect(() => {
    const m: Record<number, number> = {}
    seasonVotes.filter((v) => v.user_id === profile?.id).forEach((v) => { m[v.item_id] = v.points })
    setMine(m)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votes.rows, items.rows])

  if (items.loading || votes.loading) return <Loading />

  const setStep = async (n: number) => {
    const { error } = await supabase.from('seasons').update({ kickoff_step: n }).eq('id', s.id)
    if (error) alert(error.message); else { await refresh(); setView(n) }
  }
  const add = async (type: KickoffItem['type'], extra: Partial<KickoffItem> = {}) => {
    if (!text.trim()) return
    if (await items.insert({ season_id: s.id, type, text: text.trim(), ...extra })) setText('')
  }
  const del = (i: KickoffItem) => isStaff && <Button variant="danger" onClick={() => confirm('¿Eliminar?') && items.remove(i.id)}>×</Button>
  const addForm = (type: KickoffItem['type'], label: string, extra: Partial<KickoffItem> = {}, withArea = false) => (
    <div className="form" style={{ marginBottom: 12 }}>
      {withArea && <Field label="Equipo de análisis"><Select value={area} onChange={(e) => setArea(e.target.value as Area)} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>}
      <Field label={label}><Input value={text} onChange={(e) => setText(e.target.value)} /></Field>
      <Button onClick={() => add(type, withArea ? { area } : extra)}>Agregar</Button>
    </div>
  )

  const used = Object.values(mine).reduce((a, b) => a + b, 0)
  const saveVotes = async () => {
    if (used > BAG || !profile) return
    const rowsUp = whats.map((w) => ({ item_id: w.id, user_id: profile.id, points: mine[w.id] ?? 0 }))
    const { error } = await supabase.from('kickoff_votes').upsert(rowsUp, { onConflict: 'item_id,user_id' })
    if (error) alert(error.message); else votes.reload()
  }
  const total = (id: number) => seasonVotes.filter((v) => v.item_id === id).reduce((a, v) => a + v.points, 0)
  const ranking = [...whats].sort((a, b) => total(b.id) - total(a.id))

  const wSum = crit.reduce((a, c) => a + Number(c.weight || 0), 0) || 1
  const score = (h: KickoffItem) => crit.reduce((a, c) => a + (h.scores[c.name] ?? 0) * Number(c.weight || 0), 0) / wSum
  const saveCrit = async () => {
    const { error } = await supabase.from('seasons').update({ matrix_criteria: crit.filter((c) => c.name.trim()) }).eq('id', s.id)
    if (error) alert(error.message); else refresh()
  }

  return (
    <>
      <div className="row" style={{ marginBottom: 12 }}>
        {STEPS.map((l, i) => (
          <Button key={i} variant={view === i + 1 ? 'primary' : 'ghost'} onClick={() => setView(i + 1)}>
            {i + 1}. {l} {s.kickoff_step === i + 1 && '●'}
          </Button>
        ))}
      </div>
      {isStaff && (
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="muted small">Paso activo del equipo: {s.kickoff_step}</span>
          <Button variant="ghost" disabled={s.kickoff_step <= 1} onClick={() => setStep(s.kickoff_step - 1)}>Retroceder</Button>
          <Button disabled={s.kickoff_step >= 5} onClick={() => setStep(s.kickoff_step + 1)}>Avanzar paso</Button>
        </div>
      )}

      {view === 1 && (
        <Card title="Paso 1 · Examen de reglas">
          {addForm('regla', 'Pregunta sobre el manual de reglas')}
          {all.filter((i) => i.type === 'regla').length === 0 ? <Empty>Sin preguntas.</Empty> : all.filter((i) => i.type === 'regla').map((i) => (
            <div key={i.id} className="card">
              <div className="row"><strong>{i.text}</strong>{del(i)}</div>
              {isStaff ? <AnswerBox item={i} onSave={(a) => items.update(i.id, { answer: a })} /> : <p className={i.answer ? '' : 'muted'}>{i.answer ?? 'Pendiente de respuesta del staff.'}</p>}
            </div>
          ))}
        </Card>
      )}

      {view === 2 && (
        <Card title="Paso 2 · Preguntas por equipo de análisis">
          {addForm('pregunta', 'Pregunta', {}, true)}
          {AREAS.map((a) => {
            const l = all.filter((i) => i.type === 'pregunta' && i.area === a)
            return <div key={a}><h3>{AREA_LABEL[a]}</h3>{l.length === 0 ? <Empty>Sin preguntas.</Empty> : l.map((i) => <div key={i.id} className="row">• {i.text}{del(i)}</div>)}</div>
          })}
        </Card>
      )}

      {view === 3 && (
        <Card title="Paso 3 · Lista de Whats (requisitos y acciones del juego)">
          {addForm('what', 'What')}
          {whats.length === 0 ? <Empty>Sin Whats.</Empty> : whats.map((i) => <div key={i.id} className="row">• {i.text}{del(i)}</div>)}
        </Card>
      )}

      {view === 4 && (
        <Card title="Paso 4 · Votación con bolsa de puntos" actions={<Badge tone={used > BAG ? 'bad' : 'info'}>{used}/{BAG} puntos</Badge>}>
          {whats.length === 0 ? <Empty>Primero agrega Whats en el paso 3.</Empty> : (
            <>
              <Table head={['What', 'Mis puntos', 'Total equipo']}>
                {ranking.map((w) => (
                  <tr key={w.id}>
                    <td>{w.text}</td>
                    <td><Input type="number" min={0} max={BAG} style={{ width: 70 }} value={mine[w.id] ?? 0} onChange={(e) => setMine({ ...mine, [w.id]: Math.max(0, Number(e.target.value)) })} /></td>
                    <td><strong>{total(w.id)}</strong></td>
                  </tr>
                ))}
              </Table>
              {used > BAG && <div className="alert alert-bad">Te pasaste de {BAG} puntos.</div>}
              <Button onClick={saveVotes} disabled={used > BAG}>Guardar mis votos</Button>
            </>
          )}
        </Card>
      )}

      {view === 5 && (
        <>
          {isStaff && (
            <Card title="Criterios de la matriz" actions={<Button onClick={saveCrit}>Guardar criterios</Button>}>
              {crit.map((c, i) => (
                <div key={i} className="row" style={{ marginBottom: 6 }}>
                  <Input placeholder="Criterio" value={c.name} onChange={(e) => setCrit(crit.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                  <Input type="number" min={0} style={{ width: 80 }} value={c.weight} onChange={(e) => setCrit(crit.map((x, j) => j === i ? { ...x, weight: Number(e.target.value) } : x))} />
                  <Button variant="danger" onClick={() => setCrit(crit.filter((_, j) => j !== i))}>×</Button>
                </div>
              ))}
              <Button variant="ghost" onClick={() => setCrit([...crit, { name: '', weight: 1 }])}>+ Criterio</Button>
            </Card>
          )}
          <Card title="Paso 5 · Hows y matriz de mecanismos">
            {whats.length === 0 ? <Empty>Primero agrega Whats en el paso 3.</Empty> : (
              <>
                <div className="form" style={{ marginBottom: 12 }}>
                  <Field label="What"><Select value={parent} onChange={(e) => setParent(e.target.value)} options={[{ value: '', label: 'Elegir…' }, ...ranking.map((w) => ({ value: w.id, label: `${w.text} (${total(w.id)} pts)` }))]} /></Field>
                  <Field label="How (mecanismo)"><Input value={text} onChange={(e) => setText(e.target.value)} /></Field>
                  <Button disabled={!parent} onClick={() => add('how', { parent_id: Number(parent) })}>Agregar</Button>
                </div>
                {crit.length === 0 && <div className="alert alert-info">Define criterios para calificar.</div>}
                {ranking.map((w) => {
                  const hows = all.filter((i) => i.type === 'how' && i.parent_id === w.id)
                  if (!hows.length) return null
                  return (
                    <div key={w.id}>
                      <h3>{w.text}</h3>
                      <Table head={['How', ...s.matrix_criteria.map((c) => `${c.name} (×${c.weight})`), 'Total /5', '']}>
                        {hows.map((h) => (
                          <tr key={h.id}>
                            <td>{h.chosen && <Badge tone="ok">Elegido</Badge>} {h.text}</td>
                            {s.matrix_criteria.map((c) => (
                              <td key={c.name}>
                                {isStaff ? <Select value={h.scores[c.name] ?? 0} onChange={(e) => items.update(h.id, { scores: { ...h.scores, [c.name]: Number(e.target.value) } })} options={[0, 1, 2, 3, 4, 5].map((n) => ({ value: n, label: n ? String(n) : '—' }))} /> : (h.scores[c.name] ?? '—')}
                              </td>
                            ))}
                            <td><strong>{score(h).toFixed(2)}</strong></td>
                            <td className="row">
                              {isStaff && <Button variant="ghost" onClick={() => items.update(h.id, { chosen: !h.chosen })}>{h.chosen ? 'Quitar' : 'Elegir'}</Button>}
                              {del(h)}
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </div>
                  )
                })}
              </>
            )}
          </Card>
        </>
      )}
    </>
  )
}

function AnswerBox({ item, onSave }: { item: KickoffItem; onSave: (a: string) => void }) {
  const [a, setA] = useState(item.answer ?? '')
  return (
    <div>
      <Textarea placeholder="Respuesta" value={a} onChange={(e) => setA(e.target.value)} />
      <Button variant="ghost" onClick={() => onSave(a)}>Guardar respuesta</Button>
    </div>
  )
}
