import { useMemo, useState } from 'react'
import { Button, Card, Field, Input, Select, Table, Textarea } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import type { Part } from '../../lib/types'
import { parseCsv } from './shared'

const find = (h: string[], names: string[]) => h.findIndex((x) => names.includes(x.trim().toLowerCase()))

export default function ImportTab({ insert, onDone }: { insert: (v: Partial<Part>[]) => Promise<boolean>; onDone: () => void }) {
  const { season } = useAuth()
  const [text, setText] = useState('')
  const [subsystem, setSubsystem] = useState('')
  const [area, setArea] = useState<Area>('mecanica')

  const items = useMemo(() => {
    const rows = parseCsv(text)
    if (rows.length < 2) return []
    const h = rows[0]
    const iName = find(h, ['name', 'nombre', 'description', 'descripción'])
    const iSku = find(h, ['part number', 'sku', 'partnumber', 'part no', 'part no.'])
    const iQty = find(h, ['quantity', 'qty', 'cantidad'])
    const iDesc = find(h, ['description', 'descripción'])
    return rows.slice(1).map((r) => {
      const name = (r[iName] || (iDesc >= 0 ? r[iDesc] : '') || r[iSku] || '').trim()
      return { name, sku: iSku >= 0 ? r[iSku]?.trim() || null : null, qty: Math.max(1, parseInt(r[iQty] ?? '1') || 1) }
    }).filter((x) => x.name)
  }, [text])

  const onFile = async (f?: File) => { if (f) setText(await f.text()) }

  const go = async () => {
    if (!subsystem.trim()) return alert('Indica el subsistema destino.')
    const ok = await insert(items.map((i) => ({ ...i, season_id: season!.id, subsystem: subsystem.trim(), area })))
    if (ok) { setText(''); onDone() }
  }

  return (
    <Card title="Importar BOM desde Onshape">
      <p className="muted small">
        En Onshape abre el Assembly, ve a la tabla BOM (Bill of materials), usa el menú de la tabla y elige «Export → CSV». Pega el contenido aquí o sube el archivo.
        Se reconocen las columnas Name, Part number / SKU y Quantity.
      </p>
      <div className="grid">
        <Field label="Archivo CSV"><Input type="file" accept=".csv,text/csv" onChange={(e) => onFile(e.target.files?.[0])} /></Field>
        <Field label="Subsistema destino"><Input value={subsystem} onChange={(e) => setSubsystem(e.target.value)} placeholder="Ej. Elevador" /></Field>
        <Field label="Área"><Select value={area} onChange={(e) => setArea(e.target.value as Area)} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} /></Field>
      </div>
      <Field label="Contenido CSV"><Textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={'Item,Quantity,Part number,Name,Description,Material\n1,4,AM-1234,"Placa, 1/8",Soporte,Aluminio'} /></Field>
      {text && !items.length && <div className="alert alert-warn">No se encontraron filas válidas. Revisa los encabezados.</div>}
      {items.length > 0 && (
        <>
          <h3>Vista previa ({items.length} piezas)</h3>
          <Table head={['Nombre', 'SKU', 'Cant.']}>
            {items.map((i, k) => <tr key={k}><td>{i.name}</td><td>{i.sku ?? '—'}</td><td>{i.qty}</td></tr>)}
          </Table>
          <div className="row" style={{ marginTop: 10 }}><Button onClick={go}>Insertar {items.length} piezas</Button></div>
        </>
      )}
    </Card>
  )
}
