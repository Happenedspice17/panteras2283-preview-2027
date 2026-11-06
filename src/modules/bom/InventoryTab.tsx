import { useState } from 'react'
import { Badge, Button, Card, Field, Input, Table, Textarea } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import type { InventoryItem } from '../../lib/types'

type Rows = { rows: InventoryItem[]; insert: (v: Partial<InventoryItem>) => Promise<boolean>; update: (id: number, v: Partial<InventoryItem>) => Promise<boolean>; remove: (id: number) => Promise<boolean> }

const blank = (): Partial<InventoryItem> => ({ name: '', sku: '', category: '', qty: 0, location: '', is_battery: false, battery_year: null, battery_cycles: null, battery_notes: '' })

function batteryWarnings(b: InventoryItem) {
  const year = new Date().getFullYear()
  const notes = (b.battery_notes ?? '').toLowerCase()
  const bad = notes.includes('hinch') || notes.includes('dañ')
  const warn: string[] = []
  if (b.battery_year != null && b.battery_year <= year - 3) warn.push('batería con 3 años o más')
  if ((b.battery_cycles ?? 0) > 50) warn.push('más de 50 ciclos')
  return { bad, warn }
}

export default function InventoryTab({ inv }: { inv: Rows }) {
  const { isStaff } = useAuth()
  const [form, setForm] = useState<Partial<InventoryItem> | null>(null)
  const set = (k: keyof InventoryItem, v: unknown) => setForm((f) => ({ ...f!, [k]: v }))
  const batteries = inv.rows.filter((i) => i.is_battery)

  const save = async () => {
    if (!form?.name?.trim()) return alert('El nombre es obligatorio.')
    const v = { ...form, sku: form.sku || null, category: form.category || null, location: form.location || null, battery_notes: form.battery_notes || null }
    if (!v.is_battery) Object.assign(v, { battery_year: null, battery_cycles: null, battery_notes: null })
    if (await (form.id ? inv.update(form.id, v) : inv.insert(v))) setForm(null)
  }

  const actions = (i: InventoryItem) => isStaff && (
    <div className="row">
      <Button variant="ghost" onClick={() => setForm(i)}>Editar</Button>
      <Button variant="danger" onClick={() => confirm(`¿Eliminar "${i.name}"?`) && inv.remove(i.id)}>Eliminar</Button>
    </div>
  )

  return (
    <>
      {isStaff && (
        <Card title={form ? (form.id ? 'Editar item' : 'Nuevo item') : 'Inventario'} actions={!form && <Button onClick={() => setForm(blank())}>Agregar item</Button>}>
          {form && (
            <>
              <div className="form">
                <Field label="Nombre"><Input value={form.name ?? ''} onChange={(e) => set('name', e.target.value)} /></Field>
                <Field label="SKU"><Input value={form.sku ?? ''} onChange={(e) => set('sku', e.target.value)} /></Field>
                <Field label="Categoría"><Input value={form.category ?? ''} onChange={(e) => set('category', e.target.value)} /></Field>
                <Field label="Cantidad"><Input type="number" min={0} value={form.qty ?? 0} onChange={(e) => set('qty', Number(e.target.value))} /></Field>
                <Field label="Ubicación"><Input value={form.location ?? ''} onChange={(e) => set('location', e.target.value)} /></Field>
                <label className="row"><input type="checkbox" checked={!!form.is_battery} onChange={(e) => set('is_battery', e.target.checked)} /> Es batería</label>
              </div>
              {form.is_battery && (
                <div className="form" style={{ marginTop: 10 }}>
                  <Field label="Año de la batería"><Input type="number" value={form.battery_year ?? ''} onChange={(e) => set('battery_year', e.target.value ? Number(e.target.value) : null)} /></Field>
                  <Field label="Ciclos"><Input type="number" min={0} value={form.battery_cycles ?? ''} onChange={(e) => set('battery_cycles', e.target.value ? Number(e.target.value) : null)} /></Field>
                  <Field label="Notas"><Textarea rows={2} value={form.battery_notes ?? ''} onChange={(e) => set('battery_notes', e.target.value)} /></Field>
                </div>
              )}
              <div className="row" style={{ marginTop: 10 }}><Button onClick={save}>Guardar</Button><Button variant="ghost" onClick={() => setForm(null)}>Cancelar</Button></div>
            </>
          )}
        </Card>
      )}
      <Card title="Piezas y materiales">
        {!inv.rows.length ? <p className="empty">El inventario está vacío.</p> : (
          <Table head={['Nombre', 'SKU', 'Categoría', 'Cant.', 'Ubicación', '']}>
            {inv.rows.filter((i) => !i.is_battery).map((i) => (
              <tr key={i.id}><td>{i.name}</td><td>{i.sku ?? '—'}</td><td>{i.category ?? '—'}</td><td>{i.qty}</td><td>{i.location ?? '—'}</td><td>{actions(i)}</td></tr>
            ))}
          </Table>
        )}
      </Card>
      <Card title="Baterías">
        {!batteries.length ? <p className="empty">No hay baterías registradas.</p> : (
          <Table head={['Nombre', 'Cant.', 'Año', 'Ciclos', 'Notas', 'Estado', '']}>
            {batteries.map((b) => {
              const { bad, warn } = batteryWarnings(b)
              return (
                <tr key={b.id}>
                  <td>{b.name}</td><td>{b.qty}</td><td>{b.battery_year ?? '—'}</td><td>{b.battery_cycles ?? '—'}</td><td>{b.battery_notes ?? '—'}</td>
                  <td>
                    {bad && <Badge tone="bad">posible daño o hinchazón: retirar</Badge>}{' '}
                    {warn.map((w) => <Badge key={w} tone="warn">{w}</Badge>)}
                    {!bad && !warn.length && <Badge tone="ok">ok</Badge>}
                  </td>
                  <td>{actions(b)}</td>
                </tr>
              )
            })}
          </Table>
        )}
      </Card>
    </>
  )
}
