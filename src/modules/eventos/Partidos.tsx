import { useState } from 'react'
import { Card, Table, Badge, Button, Input, Select, Field, Stat, Empty } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import type { EventRow, Match } from '../../lib/types'

const calc = (a: string, b: string): Match['result'] => {
  if (a === '' || b === '') return null
  const x = Number(a), y = Number(b)
  return x > y ? 'W' : x < y ? 'L' : 'T'
}
const TONE = { W: 'ok', L: 'bad', T: 'neutral' } as const
const blank = { match_label: '', alliance: 'red', our: '', opp: '', rank: '', notes: '' }

export default function Partidos({ ev }: { ev: EventRow }) {
  const { isStaff } = useAuth()
  const m = useRows<Match>('matches', { filter: { event_id: ev.id }, order: 'id' })
  const [f, setF] = useState(blank)
  const set = (k: keyof typeof blank, v: string) => setF({ ...f, [k]: v })

  const count = (r: string) => m.rows.filter((x) => x.result === r).length
  const lastRank = [...m.rows].reverse().find((x) => x.rank_after !== null)?.rank_after

  const save = async () => {
    if (!f.match_label.trim()) return
    const n = (s: string) => (s === '' ? null : Number(s))
    const ok = await m.insert({
      event_id: ev.id, match_label: f.match_label.trim(), alliance: f.alliance, our_score: n(f.our), opp_score: n(f.opp),
      result: calc(f.our, f.opp), rank_after: n(f.rank), notes: f.notes || null,
    })
    if (ok) setF(blank)
  }

  return (
    <>
      <div className="grid">
        <Stat label="Récord W-L-T" value={`${count('W')}-${count('L')}-${count('T')}`} />
        <Stat label="Último ranking" value={lastRank ?? '—'} />
      </div>
      {isStaff && (
        <Card title="Registrar partido">
          <div className="form">
            <Field label="Etiqueta (Q12, SF3…)"><Input value={f.match_label} onChange={(e) => set('match_label', e.target.value)} /></Field>
            <Field label="Alianza"><Select value={f.alliance} onChange={(e) => set('alliance', e.target.value)} options={[{ value: 'red', label: 'Roja' }, { value: 'blue', label: 'Azul' }]} /></Field>
            <Field label="Nuestros puntos"><Input type="number" value={f.our} onChange={(e) => set('our', e.target.value)} /></Field>
            <Field label="Puntos rival"><Input type="number" value={f.opp} onChange={(e) => set('opp', e.target.value)} /></Field>
            <Field label="Ranking después"><Input type="number" value={f.rank} onChange={(e) => set('rank', e.target.value)} /></Field>
            <Field label="Notas"><Input value={f.notes} onChange={(e) => set('notes', e.target.value)} /></Field>
            <div><Button onClick={save}>Guardar</Button> {f.our !== '' && f.opp !== '' && <Badge tone={TONE[calc(f.our, f.opp)!]}>{calc(f.our, f.opp)}</Badge>}</div>
          </div>
        </Card>
      )}
      <Card title="Partidos">
        {!m.rows.length ? <Empty>Sin partidos registrados.</Empty> : (
          <Table head={['Partido', 'Alianza', 'Marcador', 'Resultado', 'Rank', 'Notas', '']}>
            {m.rows.map((x) => (
              <tr key={x.id}>
                <td>{x.match_label}</td>
                <td><Badge tone={x.alliance === 'red' ? 'bad' : 'info'}>{x.alliance === 'red' ? 'Roja' : 'Azul'}</Badge></td>
                <td>{x.our_score ?? '—'} - {x.opp_score ?? '—'}</td>
                <td>{x.result ? <Badge tone={TONE[x.result]}>{x.result}</Badge> : '—'}</td>
                <td>{x.rank_after ?? '—'}</td>
                <td>{x.notes}</td>
                <td>{isStaff && <Button variant="danger" onClick={() => confirm('¿Eliminar partido?') && m.remove(x.id)}>×</Button>}</td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </>
  )
}
