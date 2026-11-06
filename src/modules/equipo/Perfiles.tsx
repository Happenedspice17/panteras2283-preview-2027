import { useState, Fragment } from 'react'
import { AREAS, AREA_LABEL, LEVELS, LEVEL_LABEL, ROLES, ROLE_LABEL, type Area } from '../../lib/constants'
import type { Profile } from '../../lib/types'
import { Badge, Button, Card, Empty, Field, Select, Table } from '../../components/ui'

type Update = (id: string, v: Partial<Profile>) => Promise<boolean>

export function Perfiles({ perfiles, isCoach, update }: { perfiles: Profile[]; isCoach: boolean; update: Update }) {
  const pendientes = perfiles.filter((p) => p.role === 'pendiente')
  const activos = perfiles.filter((p) => p.role !== 'pendiente')
  const grupos = [...AREAS, null].map((area) => ({ area, items: activos.filter((p) => p.area === area) })).filter((g) => g.items.length)
  const head = ['Nombre', 'Rol', 'Nivel', 'Inducción', 'Consentimiento tutor', ...(isCoach ? [''] : [])]

  return (
    <>
      <Card title="Pendientes de aprobación">
        {pendientes.length === 0 ? <Empty>No hay solicitudes pendientes.</Empty> : (
          <Table head={head}>
            {pendientes.map((p) => <PerfilFila key={p.id} p={p} isCoach={isCoach} update={update} />)}
          </Table>
        )}
      </Card>
      <Card title="Roster por área">
        {grupos.length === 0 ? <Empty>Aún no hay perfiles activos.</Empty> : grupos.map((g) => (
          <div key={g.area ?? 'sin'} style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: '.95rem', margin: '0 0 6px' }}>{g.area ? AREA_LABEL[g.area] : 'Sin área'} <span className="muted small">({g.items.length})</span></h3>
            <Table head={head}>
              {g.items.map((p) => <PerfilFila key={p.id} p={p} isCoach={isCoach} update={update} />)}
            </Table>
          </div>
        ))}
      </Card>
    </>
  )
}

function PerfilFila({ p, isCoach, update }: { p: Profile; isCoach: boolean; update: Update }) {
  const [editando, setEditando] = useState(false)
  const consent = !p.is_minor ? <Badge>No aplica (mayor)</Badge> : p.guardian_consent ? <Badge tone="ok">Sí</Badge> : <Badge tone="bad">Falta</Badge>

  return (
    <Fragment>
      <tr>
        <td>{p.full_name ?? p.email}{!p.active && <> <Badge tone="warn">Inactivo</Badge></>}<div className="muted small">{p.email}</div></td>
        <td>{ROLE_LABEL[p.role]}</td>
        <td>{LEVEL_LABEL[p.level]}</td>
        <td>{p.safety_ok ? <Badge tone="ok">Lista {p.safety_date ?? ''}</Badge> : <Badge tone="bad">Pendiente</Badge>}</td>
        <td>{consent}</td>
        {isCoach && <td><Button variant="ghost" onClick={() => setEditando((v) => !v)}>{editando ? 'Cerrar' : 'Editar'}</Button></td>}
      </tr>
      {isCoach && editando && (
        <tr><td colSpan={6}><PerfilForm p={p} update={update} onDone={() => setEditando(false)} /></td></tr>
      )}
    </Fragment>
  )
}

function PerfilForm({ p, update, onDone }: { p: Profile; update: Update; onDone: () => void }) {
  const [d, setD] = useState({ role: p.role, area: p.area ?? '', level: p.level, is_minor: p.is_minor, guardian_consent: p.guardian_consent, active: p.active })

  async function guardar() {
    const ok = await update(p.id, { ...d, area: (d.area || null) as Area | null })
    if (ok) onDone()
  }

  return (
    <div className="form">
      <Field label="Rol">
        <Select value={d.role} onChange={(e) => setD({ ...d, role: e.target.value as Profile['role'] })} options={ROLES.map((r) => ({ value: r, label: ROLE_LABEL[r] }))} />
      </Field>
      <Field label="Área">
        <Select value={d.area} onChange={(e) => setD({ ...d, area: e.target.value as Area | '' })} options={[{ value: '', label: 'Sin área' }, ...AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))]} />
      </Field>
      <Field label="Nivel">
        <Select value={d.level} onChange={(e) => setD({ ...d, level: e.target.value as Profile['level'] })} options={LEVELS.map((l) => ({ value: l, label: LEVEL_LABEL[l] }))} />
      </Field>
      <label className="row"><input type="checkbox" checked={d.is_minor} onChange={(e) => setD({ ...d, is_minor: e.target.checked })} /> Menor de edad</label>
      <label className="row"><input type="checkbox" checked={d.guardian_consent} onChange={(e) => setD({ ...d, guardian_consent: e.target.checked })} /> Consentimiento tutor</label>
      <label className="row"><input type="checkbox" checked={d.active} onChange={(e) => setD({ ...d, active: e.target.checked })} /> Activo</label>
      <div className="row">
        <Button onClick={guardar}>Guardar</Button>
        <Button variant="ghost" onClick={onDone}>Cancelar</Button>
      </div>
    </div>
  )
}
