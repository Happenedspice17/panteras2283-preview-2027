import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Badge, Button, Select, Empty } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import { supabase } from '../../lib/supabase'
import type { Attendee, CompRole, EventRow, Profile } from '../../lib/types'

export default function Logistica({ ev, seasonId }: { ev: EventRow; seasonId: number }) {
  const { isStaff } = useAuth()
  const att = useRows<Attendee & { id?: number }>('event_attendees', { filter: { event_id: ev.id } })
  const profs = useRows<Profile>('profiles', { filter: { active: true }, order: 'full_name' })
  const roles = useRows<CompRole>('comp_roles', { filter: { season_id: seasonId } })
  const [add, setAdd] = useState('')

  const name = (id: string | null) => profs.rows.find((p) => p.id === id)?.full_name ?? '—'
  const evRoles = roles.rows.filter((r) => r.event_id === ev.id)
  const scope = evRoles.length ? evRoles : roles.rows.filter((r) => r.event_id === null)
  const count: Record<string, number> = {}
  scope.forEach((r) => { if (r.primary_id) count[r.primary_id] = (count[r.primary_id] ?? 0) + 1 })
  const conflicts = Object.entries(count).filter(([, n]) => n > 1)
  const taken = new Set(att.rows.map((a) => a.user_id))
  const avail = profs.rows.filter((p) => !taken.has(p.id))

  const patch = async (uid: string, v: Partial<Attendee>) => { await supabase.from('event_attendees').update(v).eq('event_id', ev.id).eq('user_id', uid); att.reload() }
  const addOne = async () => {
    if (!add) return
    const { error } = await supabase.from('event_attendees').insert({ event_id: ev.id, user_id: add })
    if (error) alert(error.message)
    setAdd(''); att.reload()
  }
  const del = async (uid: string) => { await supabase.from('event_attendees').delete().eq('event_id', ev.id).eq('user_id', uid); att.reload() }

  return (
    <>
      {conflicts.map(([id, n]) => (
        <div key={id} className="alert alert-warn">Conflicto de roles: {name(id)} es principal en {n} roles de competencia{evRoles.length ? '' : ' de temporada'}.</div>
      ))}
      <Card title={`Asistentes (${att.rows.length})`}>
        {isStaff && (
          <div className="form" style={{ marginBottom: 12 }}>
            <Select value={add} onChange={(e) => setAdd(e.target.value)} options={[{ value: '', label: 'Agregar perfil…' }, ...avail.map((p) => ({ value: p.id, label: p.full_name ?? p.email ?? p.id }))]} />
            <div><Button onClick={addOne} disabled={!add}>Agregar</Button></div>
          </div>
        )}
        {!att.rows.length ? <Empty>Sin asistentes.</Empty> : (
          <Table head={['Nombre', 'Permiso firmado', 'Seguridad', 'Estado', '']}>
            {att.rows.map((a) => {
              const p = profs.rows.find((x) => x.id === a.user_id)
              const ok = a.permit_ok && !!p?.safety_ok
              return (
                <tr key={a.user_id}>
                  <td>{name(a.user_id)}</td>
                  <td><input type="checkbox" checked={a.permit_ok} disabled={!isStaff} onChange={(e) => patch(a.user_id, { permit_ok: e.target.checked })} /></td>
                  <td>{p?.safety_ok ? <Badge tone="ok">OK</Badge> : <Badge tone="bad">Sin seguridad</Badge>}</td>
                  <td>{ok ? <Badge tone="ok">Listo</Badge> : <Badge tone="bad">{!a.permit_ok ? 'Sin permiso' : 'Pendiente'}</Badge>}</td>
                  <td>{isStaff && <Button variant="danger" onClick={() => del(a.user_id)}>Quitar</Button>}</td>
                </tr>
              )
            })}
          </Table>
        )}
      </Card>
      <Card title="Roles de competencia" actions={<Link to="/equipo">Editar en Equipo</Link>}>
        {!evRoles.length ? <Empty>Este evento no tiene roles propios. <Link to="/equipo">Ir a Equipo</Link></Empty> : (
          <Table head={['Rol', 'Principal', 'Respaldo']}>
            {evRoles.map((r) => <tr key={r.id}><td>{r.role_name}</td><td>{name(r.primary_id)}</td><td>{name(r.backup_id)}</td></tr>)}
          </Table>
        )}
      </Card>
    </>
  )
}
