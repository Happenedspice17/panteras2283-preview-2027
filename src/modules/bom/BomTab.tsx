import { useState } from 'react'
import { Badge, Button, Card, Field, Input, Select, Table } from '../../components/ui'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../lib/auth'
import { AREAS, AREA_LABEL, PRIORITIES, PART_STATUS, type Area } from '../../lib/constants'
import { usd } from '../../lib/db'
import type { InventoryItem, Part } from '../../lib/types'
import { PRIO_LABEL, STATUS_LABEL, findInv } from './shared'

type Rows = { rows: Part[]; insert: (v: Partial<Part>) => Promise<boolean>; update: (id: number, v: Partial<Part>) => Promise<boolean>; remove: (id: number) => Promise<boolean>; reload: () => Promise<void> }

const blank = (): Partial<Part> => ({ area: 'mecanica', subsystem: '', name: '', sku: '', qty: 1, unit_cost_usd: 0, vendor: '', url: '', onshape_url: '', priority: 'esencial', status: 'pendiente', needed_by: null })

export default function BomTab({ parts, inventory, reloadInv }: { parts: Rows; inventory: InventoryItem[]; reloadInv: () => Promise<void> }) {
  const { season, isStaff } = useAuth()
  const [form, setForm] = useState<Partial<Part> | null>(null)
  const set = (k: keyof Part, v: unknown) => setForm((f) => ({ ...f!, [k]: v }))
  const limit = season!.cost_limit_usd

  const save = async () => {
    if (!form?.name?.trim() || !form.subsystem?.trim()) return alert('Nombre y subsistema son obligatorios.')
    const v = { ...form, sku: form.sku || null, vendor: form.vendor || null, url: form.url || null, onshape_url: form.onshape_url || null, needed_by: form.needed_by || null }
    const ok = form.id ? await parts.update(form.id, v) : await parts.insert({ ...v, season_id: season!.id })
    if (ok) setForm(null)
  }

  const toInventory = async (p: Part) => {
    const inv = findInv(inventory, p)
    let id = inv?.id
    if (inv) {
      const { error } = await supabase.from('inventory').update({ qty: inv.qty + p.qty }).eq('id', inv.id)
      if (error) return alert(error.message)
    } else {
      const { data, error } = await supabase.from('inventory').insert({ name: p.name, sku: p.sku, qty: p.qty, category: p.subsystem }).select('id').single()
      if (error) return alert(error.message)
      id = data.id
    }
    await parts.update(p.id, { status: 'en_inventario', inventory_id: id })
    await reloadInv()
  }

  const groups = [...new Set(parts.rows.map((p) => p.subsystem))].sort()
  const total = parts.rows.reduce((s, p) => s + p.qty * p.unit_cost_usd, 0)

  return (
    <>
      {isStaff && (
        <Card title={form ? (form.id ? 'Editar pieza' : 'Nueva pieza') : 'Piezas'} actions={!form && <Button onClick={() => setForm(blank())}>Agregar pieza</Button>}>
          {form ? (
            <>
              <div className="form">
                <Field label="Nombre"><Input value={form.name ?? ''} onChange={(e) => set('name', e.target.value)} /></Field>
                <Field label="SKU"><Input value={form.sku ?? ''} onChange={(e) => set('sku', e.target.value)} /></Field>
                <Field label="Subsistema"><Input value={form.subsystem ?? ''} onChange={(e) => set('subsystem', e.target.value)} list="subs" /></Field>
                <datalist id="subs">{groups.map((g) => <option key={g} value={g} />)}</datalist>
                <Field label="Área"><Select value={form.area} onChange={(e) => set('area', e.target.value as Area)} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>
                <Field label="Cantidad"><Input type="number" min={1} value={form.qty ?? 1} onChange={(e) => set('qty', Number(e.target.value))} /></Field>
                <Field label="Costo unitario USD"><Input type="number" min={0} step="0.01" value={form.unit_cost_usd ?? 0} onChange={(e) => set('unit_cost_usd', Number(e.target.value))} /></Field>
                <Field label="Prioridad"><Select value={form.priority} onChange={(e) => set('priority', e.target.value)} options={PRIORITIES.map((p) => ({ value: p, label: PRIO_LABEL[p] }))} /></Field>
                <Field label="Estado"><Select value={form.status} onChange={(e) => set('status', e.target.value)} options={PART_STATUS.map((p) => ({ value: p, label: STATUS_LABEL[p] }))} /></Field>
                <Field label="Proveedor"><Input value={form.vendor ?? ''} onChange={(e) => set('vendor', e.target.value)} /></Field>
                <Field label="Enlace proveedor"><Input type="url" value={form.url ?? ''} onChange={(e) => set('url', e.target.value)} /></Field>
                <Field label="Enlace Onshape"><Input type="url" value={form.onshape_url ?? ''} onChange={(e) => set('onshape_url', e.target.value)} /></Field>
                <Field label="Necesaria para"><Input type="date" value={form.needed_by ?? ''} onChange={(e) => set('needed_by', e.target.value)} /></Field>
              </div>
              <div className="row" style={{ marginTop: 10 }}>
                <Button onClick={save}>Guardar</Button><Button variant="ghost" onClick={() => setForm(null)}>Cancelar</Button>
              </div>
            </>
          ) : <p className="muted small">Límite de costo por pieza del reglamento: {usd(limit)}. Total del BOM: {usd(total)}.</p>}
        </Card>
      )}
      {!parts.rows.length && <p className="empty">Aún no hay piezas en el BOM.</p>}
      {groups.map((g) => {
        const list = parts.rows.filter((p) => p.subsystem === g)
        return (
          <Card key={g} title={`${g} · ${usd(list.reduce((s, p) => s + p.qty * p.unit_cost_usd, 0))}`}>
            <Table head={['Nombre', 'SKU', 'Cant.', 'Costo unit.', 'Subtotal', 'Prioridad', 'Estado', 'Enlaces', '']}>
              {list.map((p) => {
                const inv = findInv(inventory, p)
                return (
                  <tr key={p.id}>
                    <td>
                      {p.name}
                      {inv && p.status !== 'en_inventario' && <div className="muted small">ya hay {inv.qty} en inventario</div>}
                    </td>
                    <td>{p.sku ?? '—'}</td>
                    <td>{p.qty}</td>
                    <td>
                      {usd(p.unit_cost_usd)}{' '}
                      {p.unit_cost_usd > limit && <span title="excede límite de costo por pieza del reglamento"><Badge tone="bad">excede límite</Badge></span>}
                    </td>
                    <td>{usd(p.qty * p.unit_cost_usd)}</td>
                    <td><Badge tone={p.priority === 'esencial' ? 'info' : 'neutral'}>{PRIO_LABEL[p.priority]}</Badge></td>
                    <td><Badge tone={p.status === 'pendiente' ? 'warn' : 'ok'}>{STATUS_LABEL[p.status]}</Badge></td>
                    <td>
                      {p.url && <a href={p.url} target="_blank" rel="noreferrer">Proveedor</a>}{p.url && p.onshape_url && ' · '}
                      {p.onshape_url && <a href={p.onshape_url} target="_blank" rel="noreferrer">Onshape</a>}
                    </td>
                    <td>
                      {isStaff && (
                        <div className="row">
                          {p.status === 'recibido' && <Button onClick={() => toInventory(p)}>Pasar a inventario</Button>}
                          <Button variant="ghost" onClick={() => setForm(p)}>Editar</Button>
                          <Button variant="danger" onClick={() => confirm(`¿Eliminar "${p.name}"?`) && parts.remove(p.id)}>Eliminar</Button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </Table>
          </Card>
        )
      })}
    </>
  )
}
