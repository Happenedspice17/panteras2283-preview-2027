import { useState } from 'react'
import { Card, Table, Badge, Button, Input, Select, Textarea, Field, Empty } from '../../components/ui'
import { useRows } from '../../lib/db'
import type { EventRow, Scouting as S } from '../../lib/types'

const num = (v: unknown) => Number(v) || 0
const blank = { team: '', label: '', auto: '0', tele: '0', endgame: 'nada', defensa: '3', conf: '3', roto: false, notes: '' }
const avg = (a: number[]) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0)
const f1 = (n: number) => n.toFixed(1)

export default function Scouting({ ev }: { ev: EventRow }) {
  const sc = useRows<S>('scouting', { filter: { event_id: ev.id }, order: 'id' })
  const [f, setF] = useState(blank)
  const [sortBy, setSortBy] = useState<'total' | 'team'>('total')
  const [detail, setDetail] = useState<number | null>(null)
  const set = (k: keyof typeof blank, v: string | boolean) => setF({ ...f, [k]: v })

  const save = async () => {
    if (!f.team) return
    const ok = await sc.insert({
      event_id: ev.id, team_number: Number(f.team), match_label: f.label || null, notes: f.notes || null,
      data: { auto_puntos: Number(f.auto), teleop_puntos: Number(f.tele), endgame: f.endgame, defensa: Number(f.defensa), confiabilidad: Number(f.conf), se_descompuso: f.roto },
    })
    if (ok) setF({ ...blank, label: f.label })
  }

  const teams = [...new Set(sc.rows.map((r) => r.team_number))].map((t) => {
    const r = sc.rows.filter((x) => x.team_number === t)
    const a = avg(r.map((x) => num(x.data.auto_puntos))), te = avg(r.map((x) => num(x.data.teleop_puntos)))
    return {
      t, n: r.length, auto: a, tele: te, total: a + te,
      def: avg(r.map((x) => num(x.data.defensa))), conf: avg(r.map((x) => num(x.data.confiabilidad))),
      roto: (r.filter((x) => x.data.se_descompuso === true).length / r.length) * 100,
    }
  }).sort((a, b) => (sortBy === 'total' ? b.total - a.total : a.t - b.t))

  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const head = ['equipo', 'partido', 'auto_puntos', 'teleop_puntos', 'endgame', 'defensa', 'confiabilidad', 'se_descompuso', 'notas']
    const lines = sc.rows.map((r) => [r.team_number, r.match_label, r.data.auto_puntos, r.data.teleop_puntos, r.data.endgame, r.data.defensa, r.data.confiabilidad, r.data.se_descompuso ? 'si' : 'no', r.notes].map(esc).join(','))
    const url = URL.createObjectURL(new Blob(['﻿' + [head.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url; a.download = `scouting-${ev.id}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const d = sc.rows.filter((r) => r.team_number === detail)
  const opt = (v: string[]) => v.map((x) => ({ value: x, label: x }))

  return (
    <>
      <Card title="Nuevo registro">
        <div className="form">
          <Field label="Equipo #"><Input type="number" inputMode="numeric" value={f.team} onChange={(e) => set('team', e.target.value)} /></Field>
          <Field label="Partido"><Input value={f.label} onChange={(e) => set('label', e.target.value)} placeholder="Q12" /></Field>
          <Field label="Puntos auto"><Input type="number" inputMode="numeric" value={f.auto} onChange={(e) => set('auto', e.target.value)} /></Field>
          <Field label="Puntos teleop"><Input type="number" inputMode="numeric" value={f.tele} onChange={(e) => set('tele', e.target.value)} /></Field>
          <Field label="Endgame"><Select value={f.endgame} onChange={(e) => set('endgame', e.target.value)} options={opt(['nada', 'parcial', 'completo'])} /></Field>
          <Field label="Defensa (1-5)"><Select value={f.defensa} onChange={(e) => set('defensa', e.target.value)} options={opt(['1', '2', '3', '4', '5'])} /></Field>
          <Field label="Confiabilidad (1-5)"><Select value={f.conf} onChange={(e) => set('conf', e.target.value)} options={opt(['1', '2', '3', '4', '5'])} /></Field>
          <label className="row"><input type="checkbox" checked={f.roto} onChange={(e) => set('roto', e.target.checked)} /> Se descompuso</label>
        </div>
        <Field label="Notas"><Textarea value={f.notes} onChange={(e) => set('notes', e.target.value)} /></Field>
        <div style={{ marginTop: 10 }}><Button onClick={save} disabled={!f.team}>Guardar registro</Button></div>
        <p className="muted small">Los campos del formulario se pueden adaptar al juego 2027.</p>
      </Card>
      <Card title="Resumen por equipo" actions={<>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'total' | 'team')} options={[{ value: 'total', label: 'Orden: promedio total' }, { value: 'team', label: 'Orden: # equipo' }]} />
        <Button variant="ghost" onClick={exportCsv} disabled={!sc.rows.length}>Exportar CSV</Button>
      </>}>
        {!teams.length ? <Empty>Sin registros de scouting.</Empty> : (
          <Table head={['Equipo', 'Partidos', 'Auto', 'Teleop', 'Total', 'Defensa', 'Confiab.', '% descompuso', '']}>
            {teams.map((x) => (
              <tr key={x.t}>
                <td><b>{x.t}</b></td><td>{x.n}</td><td>{f1(x.auto)}</td><td>{f1(x.tele)}</td><td>{f1(x.total)}</td>
                <td>{f1(x.def)}</td><td>{f1(x.conf)}</td>
                <td><Badge tone={x.roto > 25 ? 'bad' : x.roto > 0 ? 'warn' : 'ok'}>{Math.round(x.roto)}%</Badge></td>
                <td><Button variant="ghost" onClick={() => setDetail(detail === x.t ? null : x.t)}>Detalle</Button></td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
      {detail !== null && (
        <Card title={`Detalle equipo ${detail}`}>
          <Table head={['Partido', 'Auto', 'Teleop', 'Endgame', 'Def.', 'Conf.', 'Descompuso', 'Notas']}>
            {d.map((r) => (
              <tr key={r.id}>
                <td>{r.match_label ?? '—'}</td><td>{String(r.data.auto_puntos ?? '')}</td><td>{String(r.data.teleop_puntos ?? '')}</td>
                <td>{String(r.data.endgame ?? '')}</td><td>{String(r.data.defensa ?? '')}</td><td>{String(r.data.confiabilidad ?? '')}</td>
                <td>{r.data.se_descompuso ? 'Sí' : 'No'}</td><td>{r.notes}</td>
              </tr>
            ))}
          </Table>
        </Card>
      )}
    </>
  )
}
