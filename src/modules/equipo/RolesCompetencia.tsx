import { useState } from 'react'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import type { CompRole, EventRow, Profile } from '../../lib/types'
import { Badge, Button, Card, Empty, Field, Input, Select, Table } from '../../components/ui'

const SUGERENCIAS = ['Driver', 'Operador', 'Coach de drive', 'Human player', 'Técnico de pits', 'Líder de scouting', 'Scout', 'Presentador Impact', 'Presentador jueces', 'Seguridad']

interface Draft { id?: number; role_name: string; event_id: string; primary_id: string; backup_id: string }
const vacio: Draft = { role_name: '', event_id: '', primary_id: '', backup_id: '' }

export function RolesCompetencia({ perfiles, isStaff }: { perfiles: Profile[]; isStaff: boolean }) {
  const { season } = useAuth()
  const sid = season?.id ?? 0
  const roles = useRows<CompRole>('comp_roles', { filter: { season_id: sid }, order: 'id', skip: !season })
  const eventos = useRows<EventRow>('events', { filter: { season_id: sid }, order: 'date_start', skip: !season })
  const [draft, setDraft] = useState<Draft | null>(null)

  const nombre = (id: string | null) => (id ? perfiles.find((p) => p.id === id)?.full_name ?? '?' : '—')
  const evento = (r: CompRole) => (r.event_id === null ? 'Toda la temporada' : eventos.rows.find((e) => e.id === r.event_id)?.title ?? '—')
  const elegibles = perfiles.filter((p) => p.active && (p.role === 'alumno' || p.role === 'lider') || p.id === draft?.primary_id || p.id === draft?.backup_id)
  const opcionesPerfil = [{ value: '', label: '— Sin asignar —' }, ...elegibles.map((p) => ({ value: p.id, label: p.full_name ?? p.email ?? p.id }))]

  async function guardar() {
    if (!season || !draft || !draft.role_name.trim()) return
    const v = {
      role_name: draft.role_name.trim(),
      event_id: draft.event_id ? Number(draft.event_id) : null,
      primary_id: draft.primary_id || null,
      backup_id: draft.backup_id || null,
    }
    const ok = draft.id ? await roles.update(draft.id, v) : await roles.insert({ ...v, season_id: season.id })
    if (ok) setDraft(null)
  }

  function estado(r: CompRole) {
    const out = []
    if (r.primary_id && r.primary_id === r.backup_id) out.push(<Badge key="eq" tone="bad">Titular = suplente</Badge>)
    if (!r.primary_id) out.push(<Badge key="p" tone="warn">Falta titular</Badge>)
    if (!r.backup_id) out.push(<Badge key="s" tone="warn">Falta suplente</Badge>)
    return out.length ? out : <Badge tone="ok">Completo</Badge>
  }

  const head = ['Rol', 'Evento', 'Titular', 'Suplente', 'Estado', ...(isStaff ? [''] : [])]

  return (
    <Card
      title="Roles de competencia"
      actions={isStaff && season && <Button onClick={() => setDraft({ ...vacio })}>Nuevo rol</Button>}
    >
      {!season ? <Empty>Un coach debe crear la temporada para asignar roles de competencia.</Empty> : (
        <>
          {isStaff && draft && (
            <div className="form" style={{ marginBottom: 16 }}>
              <Field label="Rol">
                <Input list="roles-sugeridos" value={draft.role_name} onChange={(e) => setDraft({ ...draft, role_name: e.target.value })} />
                <datalist id="roles-sugeridos">{SUGERENCIAS.map((s) => <option key={s} value={s} />)}</datalist>
              </Field>
              <Field label="Evento">
                <Select value={draft.event_id} onChange={(e) => setDraft({ ...draft, event_id: e.target.value })} options={[{ value: '', label: 'Toda la temporada' }, ...eventos.rows.map((e) => ({ value: e.id, label: e.title }))]} />
              </Field>
              <Field label="Titular">
                <Select value={draft.primary_id} onChange={(e) => setDraft({ ...draft, primary_id: e.target.value })} options={opcionesPerfil} />
              </Field>
              <Field label="Suplente">
                <Select value={draft.backup_id} onChange={(e) => setDraft({ ...draft, backup_id: e.target.value })} options={opcionesPerfil} />
              </Field>
              <div className="row">
                <Button onClick={guardar}>{draft.id ? 'Guardar cambios' : 'Crear'}</Button>
                <Button variant="ghost" onClick={() => setDraft(null)}>Cancelar</Button>
              </div>
            </div>
          )}
          {roles.rows.length === 0 ? <Empty>Sin roles de competencia en esta temporada.</Empty> : (
            <Table head={head}>
              {roles.rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.role_name}</td>
                  <td>{evento(r)}</td>
                  <td>{nombre(r.primary_id)}</td>
                  <td>{nombre(r.backup_id)}</td>
                  <td><div className="row">{estado(r)}</div></td>
                  {isStaff && (
                    <td>
                      <div className="row">
                        <Button variant="ghost" onClick={() => setDraft({ id: r.id, role_name: r.role_name, event_id: r.event_id?.toString() ?? '', primary_id: r.primary_id ?? '', backup_id: r.backup_id ?? '' })}>Editar</Button>
                        <Button variant="danger" onClick={() => { if (confirm(`¿Eliminar el rol "${r.role_name}"?`)) roles.remove(r.id) }}>Eliminar</Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </Table>
          )}
        </>
      )}
    </Card>
  )
}
