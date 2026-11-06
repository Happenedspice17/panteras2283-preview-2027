import { useState } from 'react'
import { AREAS, AREA_LABEL, LEVELS, LEVEL_LABEL, type Area } from '../../lib/constants'
import { fmtDate } from '../../lib/db'
import type { Profile, TrainingHours } from '../../lib/types'
import { Button, Card, Empty, Field, Input, Select, Table } from '../../components/ui'

const hoy = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10)
}
const suma = (xs: TrainingHours[]) => xs.reduce((acc, h) => acc + Number(h.hours), 0)

export function Horas({ horas, perfiles, isStaff, insert, remove }: {
  horas: TrainingHours[]
  perfiles: Profile[]
  isStaff: boolean
  insert: (v: Partial<TrainingHours>) => Promise<boolean>
  remove: (id: number) => Promise<boolean>
}) {
  const [form, setForm] = useState({ user_id: '', area: 'mecanica' as Area, hours: '', date: hoy(), note: '' })
  const nombre = (id: string) => perfiles.find((p) => p.id === id)?.full_name ?? '—'
  const nivelDe = (h: TrainingHours) => perfiles.find((p) => p.id === h.user_id)?.level ?? null

  async function registrar() {
    const hours = Number(form.hours)
    if (!form.user_id || !(hours > 0)) return
    const ok = await insert({ user_id: form.user_id, area: form.area, hours, date: form.date, note: form.note.trim() || null })
    if (ok) setForm({ ...form, hours: '', note: '' })
  }

  const porNivel = [...LEVELS.map((l) => ({ key: l, label: LEVEL_LABEL[l], total: suma(horas.filter((h) => nivelDe(h) === l)) })),
    { key: 'sin', label: 'Sin perfil', total: suma(horas.filter((h) => nivelDe(h) === null)) }].filter((g) => g.key !== 'sin' || g.total > 0)

  return (
    <>
      {isStaff && (
        <Card title="Registrar horas de formación">
          <div className="form">
            <Field label="Alumno">
              <Select value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} options={[{ value: '', label: '— Elige —' }, ...perfiles.filter((p) => p.role !== 'pendiente').map((p) => ({ value: p.id, label: p.full_name ?? p.email ?? p.id }))]} />
            </Field>
            <Field label="Área">
              <Select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value as Area })} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} />
            </Field>
            <Field label="Horas"><Input type="number" min={0.5} step={0.5} value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} /></Field>
            <Field label="Fecha"><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
            <Field label="Nota"><Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
            <Button onClick={registrar}>Registrar</Button>
          </div>
        </Card>
      )}

      <Card title="Horas por área">
        <Table head={['Área', 'Horas']}>
          {AREAS.map((a) => (
            <tr key={a}><td>{AREA_LABEL[a]}</td><td>{suma(horas.filter((h) => h.area === a))}</td></tr>
          ))}
          <tr><td><strong>Total</strong></td><td><strong>{suma(horas)}</strong></td></tr>
        </Table>
      </Card>

      {isStaff && (
        <Card title="Horas por nivel de alumnos">
          <Table head={['Nivel', 'Horas']}>
            {porNivel.map((g) => <tr key={g.key}><td>{g.label}</td><td>{g.total}</td></tr>)}
          </Table>
        </Card>
      )}

      <Card title={isStaff ? 'Registro de horas' : 'Mis horas'}>
        {horas.length === 0 ? <Empty>{isStaff ? 'Aún no hay horas registradas.' : 'Aún no tienes horas registradas.'}</Empty> : (
          <Table head={['Fecha', ...(isStaff ? ['Alumno'] : []), 'Área', 'Horas', 'Nota', ...(isStaff ? [''] : [])]}>
            {horas.map((h) => (
              <tr key={h.id}>
                <td>{fmtDate(h.date)}</td>
                {isStaff && <td>{nombre(h.user_id)}</td>}
                <td>{AREA_LABEL[h.area]}</td>
                <td>{h.hours}</td>
                <td>{h.note ?? ''}</td>
                {isStaff && <td><Button variant="danger" onClick={() => { if (confirm('¿Eliminar este registro de horas?')) remove(h.id) }}>Eliminar</Button></td>}
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </>
  )
}
