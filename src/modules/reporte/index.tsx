import { useEffect, useState } from 'react'
import { Page, Card, Stat, Button, Empty, Loading } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import { mxn } from '../../lib/db'
import { LEVEL_LABEL, type Level } from '../../lib/constants'

interface Report {
  temporada: string | null
  alumnos_activos: number
  por_nivel: Record<string, number>
  induccion_pct: number | null
  horas_formacion: number
  practicas_validadas: number
  objetivos: { total: number; completos: number }
  presupuesto: { asignado_mxn: number; ejercido_mxn: number }
  partidos: { W: number; L: number; T: number }
  asesorias_realizadas: number
}

export default function Reporte() {
  const { season } = useAuth()
  const seasonId = season?.id ?? null
  const [r, setR] = useState<Report | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase.rpc('sponsor_report', { p_season: seasonId }).then(({ data, error }) => {
      setErr(error?.message ?? null)
      setR((data as Report | null) ?? null)
      setLoading(false)
    })
  }, [seasonId])

  const label = r?.temporada ?? (season ? `${season.year} ${season.name}` : 'actual')
  const lvl = (r: Report) => (['basico', 'intermedio', 'avanzado'] as Level[]).map((l) => `${LEVEL_LABEL[l]}: ${r.por_nivel[l] ?? 0}`).join(' · ')
  const summary = (r: Report) => [
    `Reporte de temporada · Panteras 2283 (${label})`,
    `Alumnos activos: ${r.alumnos_activos} (${lvl(r)})`,
    `Inducción de seguridad: ${r.induccion_pct ?? 0}%`,
    `Horas de formación: ${r.horas_formacion}`,
    `Prácticas validadas: ${r.practicas_validadas}`,
    `Objetivos completos: ${r.objetivos.completos}/${r.objetivos.total}`,
    `Presupuesto: ejercido ${mxn(Number(r.presupuesto.ejercido_mxn))} de ${mxn(Number(r.presupuesto.asignado_mxn))}`,
    `Récord (W-L-T): ${r.partidos.W}-${r.partidos.L}-${r.partidos.T}`,
    `Asesorías realizadas: ${r.asesorias_realizadas}`,
  ].join('\n')

  const copy = async () => {
    if (!r) return
    try { await navigator.clipboard.writeText(summary(r)); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    catch { alert('No se pudo copiar al portapapeles') }
  }

  const title = 'Reporte de temporada · Panteras 2283'
  if (loading) return <Page title={title}><Loading /></Page>
  if (err || !r) return <Page title={title}><Empty>{err ?? 'Sin acceso al reporte.'}</Empty></Page>

  return (
    <Page title={title} actions={<>
      <Button variant="ghost" onClick={copy}>{copied ? 'Copiado' : 'Copiar resumen'}</Button>
      <Button onClick={() => window.print()}>Imprimir / PDF</Button>
    </>}>
      <style>{`@media print { .sidebar, .menu-btn, button, .btn { display: none !important; } }`}</style>
      <p className="muted">Temporada {label}. Cifras agregadas, sin datos personales.</p>
      <div className="grid" style={{ marginBottom: 16 }}>
        <Stat label="Alumnos activos" value={r.alumnos_activos} hint={lvl(r)} />
        <Stat label="Inducción de seguridad" value={`${r.induccion_pct ?? 0}%`} />
        <Stat label="Horas de formación" value={r.horas_formacion} />
        <Stat label="Prácticas validadas" value={r.practicas_validadas} />
        <Stat label="Objetivos completos" value={`${r.objetivos.completos}/${r.objetivos.total}`} />
        <Stat label="Asesorías realizadas" value={r.asesorias_realizadas} />
      </div>
      <div className="grid">
        <Card title="Presupuesto">
          <p>Asignado: <strong>{mxn(Number(r.presupuesto.asignado_mxn))}</strong></p>
          <p>Ejercido: <strong>{mxn(Number(r.presupuesto.ejercido_mxn))}</strong></p>
        </Card>
        <Card title="Récord de competencia (W-L-T)">
          <p><strong>{r.partidos.W}-{r.partidos.L}-{r.partidos.T}</strong></p>
        </Card>
      </div>
    </Page>
  )
}
