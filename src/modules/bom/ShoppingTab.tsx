import { useState } from 'react'
import { Button, Card, Empty, Stat, Table } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { fmtDate, mxn, usd } from '../../lib/db'
import type { InventoryItem, Part } from '../../lib/types'
import { PRIO_LABEL, PRIO_ORDER, findInv } from './shared'

export default function ShoppingTab({ parts, inventory }: { parts: Part[]; inventory: InventoryItem[] }) {
  const { season } = useAuth()
  const [copied, setCopied] = useState(false)
  const rate = season!.usd_mxn

  const list = parts
    .filter((p) => p.status === 'pendiente')
    .map((p) => {
      const need = Math.max(0, p.qty - (findInv(inventory, p)?.qty ?? 0))
      return { p, need, cost: need * p.unit_cost_usd }
    })
    .filter((x) => x.need > 0)
    .sort((a, b) => PRIO_ORDER[a.p.priority] - PRIO_ORDER[b.p.priority] || (a.p.needed_by ?? '9999').localeCompare(b.p.needed_by ?? '9999'))

  const totalUsd = list.reduce((s, x) => s + x.cost, 0)

  const copy = async () => {
    const txt = list.map((x) => `- ${x.need} x ${x.p.name}${x.p.sku ? ` (${x.p.sku})` : ''} · ${usd(x.cost)} · ${PRIO_LABEL[x.p.priority]}${x.p.needed_by ? ` · para ${fmtDate(x.p.needed_by)}` : ''}${x.p.url ? ` · ${x.p.url}` : ''}`).join('\n')
    await navigator.clipboard.writeText(`Lista de compras\n${txt}\nTotal: ${usd(totalUsd)} / ${mxn(totalUsd * rate)}`)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card title="Lista de compras" actions={<Button onClick={copy} disabled={!list.length}>{copied ? 'Copiado' : 'Copiar como texto'}</Button>}>
      <div className="grid" style={{ marginBottom: 12 }}>
        <Stat label="Total USD" value={usd(totalUsd)} />
        <Stat label="Total MXN" value={mxn(totalUsd * rate)} hint={`Tipo de cambio ${rate}`} />
      </div>
      {!list.length ? <Empty>No hay piezas pendientes por comprar.</Empty> : (
        <Table head={['Pieza', 'SKU', 'Por comprar', 'Prioridad', 'Necesaria para', 'Subtotal USD', 'Proveedor']}>
          {list.map(({ p, need, cost }) => (
            <tr key={p.id}>
              <td>{p.name}</td><td>{p.sku ?? '—'}</td>
              <td>{need}{need < p.qty && <span className="muted small"> (de {p.qty}, hay {p.qty - need})</span>}</td>
              <td>{PRIO_LABEL[p.priority]}</td><td>{fmtDate(p.needed_by)}</td><td>{usd(cost)}</td>
              <td>{p.url ? <a href={p.url} target="_blank" rel="noreferrer">{p.vendor || 'Enlace'}</a> : p.vendor ?? '—'}</td>
            </tr>
          ))}
        </Table>
      )}
    </Card>
  )
}
