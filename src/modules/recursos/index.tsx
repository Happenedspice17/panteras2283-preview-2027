import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page, Card, Input, Badge, Empty } from '../../components/ui'
import { AVISO_FECHAS, GRUPOS, type Grupo, type Recurso } from './data'

const textoRecurso = (r: Recurso) => [r.nombre, r.para, r.cuando, r.tip, r.nota ?? ''].join(' ')

export default function Recursos() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()

  const grupos = useMemo(() => GRUPOS.map((g) => {
    const match = (s: string) => !term || s.toLowerCase().includes(term)
    const recursos = g.recursos.filter((r) => match(textoRecurso(r)) || match(g.titulo))
    const consejos = (g.consejos ?? []).filter(match)
    return { ...g, recursos, consejos, visible: recursos.length + consejos.length > 0 }
  }).filter((g) => g.visible), [term])

  return (
    <Page title="Guía FIRST / FRC">
      <p className="muted small">{AVISO_FECHAS}</p>
      <div className="row" style={{ marginBottom: 16 }}>
        <Input type="search" placeholder="Buscar sitio, herramienta o tema…" value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 420 }} />
        <Badge tone="ok">Oficial FIRST</Badge>
        <Badge>Comunidad</Badge>
      </div>
      {grupos.length === 0 && <Empty>Ningún recurso coincide con la búsqueda.</Empty>}
      {grupos.map((g) => <GrupoCard key={g.id} grupo={g} />)}
    </Page>
  )
}

function GrupoCard({ grupo: g }: { grupo: Grupo & { recursos: Recurso[]; consejos: string[] } }) {
  return (
    <Card title={g.titulo}>
      <p className="muted small" style={{ marginTop: 0 }}>{g.intro}</p>
      {g.recursos.map((r) => (
        <article key={r.nombre} style={{ padding: '10px 0', borderTop: '1px solid var(--line)' }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <strong>{r.url ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.nombre}</a> : r.nombre}</strong>
            <Badge tone={r.oficial ? 'ok' : 'neutral'}>{r.oficial ? 'Oficial FIRST' : 'Comunidad'}</Badge>
          </div>
          {r.url && <div className="small muted" style={{ wordBreak: 'break-all' }}>{r.url}</div>}
          <p style={{ margin: '6px 0 2px' }}><span className="muted small">Para qué:</span> {r.para}</p>
          <p style={{ margin: '2px 0' }}><span className="muted small">Cuándo usarlo:</span> {r.cuando}</p>
          <p style={{ margin: '2px 0' }}><span className="muted small">Tip:</span> {r.tip}</p>
          {r.nota && <p className="small muted" style={{ margin: '4px 0 0' }}>{r.nota}</p>}
        </article>
      ))}
      {g.consejos.length > 0 && (
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10 }}>
          <h2 style={{ fontSize: '.95rem', marginBottom: 6 }}>Organizar el documento en Onshape</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>{g.consejos.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      )}
      {g.enlace && <p style={{ marginBottom: 0 }}><Link to={g.enlace.to}>{g.enlace.texto}</Link></p>}
    </Card>
  )
}
