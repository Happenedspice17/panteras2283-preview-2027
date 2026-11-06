import { useState } from 'react'
import { Badge, Button, Card, Input, Table } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import { AREAS, AREA_LABEL, PRIORITIES } from '../../lib/constants'
import { mxn } from '../../lib/db'
import type { Budget, Part } from '../../lib/types'
import { PRIO_LABEL } from './shared'

export default function BudgetTab({ parts, budgets, reload }: { parts: Part[]; budgets: Budget[]; reload: () => Promise<void> }) {
  const { season, isStaff } = useAuth()
  const [edit, setEdit] = useState<Record<string, string>>({})
  const rate = season!.usd_mxn

  const save = async (area: string) => {
    const amount = Number(edit[area])
    if (isNaN(amount) || amount < 0) return alert('Monto inválido.')
    const { error } = await supabase.from('budgets').upsert({ season_id: season!.id, area, amount_mxn: amount }, { onConflict: 'season_id,area' })
    if (error) return alert(error.message)
    setEdit(({ [area]: _, ...rest }) => rest)
    await reload()
  }

  const spent = (area: string, prio?: string) =>
    parts.filter((p) => p.area === area && p.status !== 'pendiente' && (!prio || p.priority === prio))
      .reduce((s, p) => s + p.qty * p.unit_cost_usd * rate, 0)

  return (
    <Card title="Presupuesto por área">
      <Table head={['Área', 'Asignado', 'Ejercido', 'Disponible', ...PRIORITIES.map((p) => `Ejercido ${PRIO_LABEL[p].toLowerCase()}`), 'Estado']}>
        {AREAS.map((a) => {
          const assigned = budgets.find((b) => b.area === a)?.amount_mxn ?? 0
          const used = spent(a)
          return (
            <tr key={a}>
              <td>{AREA_LABEL[a]}</td>
              <td>
                {isStaff ? (
                  <div className="row">
                    <Input type="number" min={0} style={{ width: 120 }} value={edit[a] ?? assigned} onChange={(e) => setEdit({ ...edit, [a]: e.target.value })} />
                    {a in edit && <Button onClick={() => save(a)}>Guardar</Button>}
                  </div>
                ) : mxn(assigned)}
              </td>
              <td>{mxn(used)}</td>
              <td>{mxn(assigned - used)}</td>
              {PRIORITIES.map((p) => <td key={p}>{mxn(spent(a, p))}</td>)}
              <td>{used > assigned ? <Badge tone="bad">excede presupuesto</Badge> : <Badge tone="ok">dentro</Badge>}</td>
            </tr>
          )
        })}
      </Table>
      <p className="muted small">Ejercido = piezas con estado distinto de pendiente (pedido, recibido, en inventario) × tipo de cambio {rate}.</p>
    </Card>
  )
}
