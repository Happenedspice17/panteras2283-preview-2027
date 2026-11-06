import { useState } from 'react'
import { Button, Empty, Loading, Page } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { useRows } from '../../lib/db'
import type { Budget, InventoryItem, Part } from '../../lib/types'
import BomTab from './BomTab'
import BudgetTab from './BudgetTab'
import ImportTab from './ImportTab'
import InventoryTab from './InventoryTab'
import ShoppingTab from './ShoppingTab'

const TABS = [['bom', 'BOM'], ['import', 'Importar de Onshape'], ['compras', 'Lista de compras'], ['inv', 'Inventario'], ['budget', 'Presupuesto']] as const

export default function Bom() {
  const { season, isStaff } = useAuth()
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('bom')
  const sid = season?.id ?? 0
  const parts = useRows<Part>('parts', { filter: { season_id: sid }, order: 'name', skip: !season })
  const inv = useRows<InventoryItem>('inventory', { order: 'name' })
  const budgets = useRows<Budget>('budgets', { filter: { season_id: sid }, skip: !season })

  if (!season) return <Page title="BOM e inventario"><Empty>No hay temporada actual. Un coach debe crear la temporada.</Empty></Page>
  if (parts.loading || inv.loading || budgets.loading) return <Page title="BOM e inventario"><Loading /></Page>

  const tabs = TABS.filter(([k]) => k !== 'import' || isStaff)
  return (
    <Page title="BOM e inventario">
      <div className="row" style={{ marginBottom: 12 }}>
        {tabs.map(([k, l]) => <Button key={k} variant={tab === k ? 'primary' : 'ghost'} onClick={() => setTab(k)}>{l}</Button>)}
      </div>
      {(parts.error || inv.error) && <div className="alert alert-bad">{parts.error || inv.error}</div>}
      {tab === 'bom' && <BomTab parts={parts} inventory={inv.rows} reloadInv={inv.reload} />}
      {tab === 'import' && isStaff && <ImportTab insert={parts.insert} onDone={() => setTab('bom')} />}
      {tab === 'compras' && <ShoppingTab parts={parts.rows} inventory={inv.rows} />}
      {tab === 'inv' && <InventoryTab inv={inv} />}
      {tab === 'budget' && <BudgetTab parts={parts.rows} budgets={budgets.rows} reload={budgets.reload} />}
    </Page>
  )
}
