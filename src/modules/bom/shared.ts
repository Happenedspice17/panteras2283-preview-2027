import type { InventoryItem, Part } from '../../lib/types'

export const PRIO_LABEL: Record<string, string> = { esencial: 'Esencial', estrategico: 'Estratégico', aspiracional: 'Aspiracional' }
export const STATUS_LABEL: Record<string, string> = { pendiente: 'Pendiente', pedido: 'Pedido', recibido: 'Recibido', en_inventario: 'En inventario' }
export const PRIO_ORDER: Record<string, number> = { esencial: 0, estrategico: 1, aspiracional: 2 }

export const findInv = (inv: InventoryItem[], p: Pick<Part, 'sku' | 'name'>) => {
  const sku = p.sku?.trim().toLowerCase()
  const name = p.name.trim().toLowerCase()
  return inv.find((i) => (sku && i.sku?.trim().toLowerCase() === sku) || i.name.trim().toLowerCase() === name)
}

export function parseCsv(text: string): string[][] {
  const first = text.split('\n')[0] ?? ''
  const delim = [',', ';', '\t'].map((d) => [d, first.split(d).length] as const).sort((a, b) => b[1] - a[1])[0][0]
  const rows: string[][] = []
  let row: string[] = [], cell = '', q = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++ }
      else if (c === '"') q = false
      else cell += c
    } else if (c === '"') q = true
    else if (c === delim) { row.push(cell); cell = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(cell); cell = ''
      if (row.some((x) => x.trim())) rows.push(row)
      row = []
    } else cell += c
  }
  row.push(cell)
  if (row.some((x) => x.trim())) rows.push(row)
  return rows
}
