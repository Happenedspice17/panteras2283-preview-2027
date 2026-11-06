import { useMemo, useState } from 'react'
import { marked } from 'marked'
import { Page, Input } from '../../components/ui'

const files = import.meta.glob('../../../docs/guias/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const ORDER = ['diseno-robot', 'manufactura', 'taller', 'electronica', 'motores-controladores']

const guias = Object.entries(files)
  .map(([path, md]) => {
    const id = path.split('/').pop()!.replace('.md', '')
    return { id, md, title: md.match(/^#\s+(.+)$/m)?.[1] ?? id }
  })
  .sort((a, b) => (ORDER.indexOf(a.id) + 99) % 99 - (ORDER.indexOf(b.id) + 99) % 99)

const TAGS: [RegExp, string][] = [[/\[FIRST\]/g, 'info'], [/\[Fabricante\]/g, 'warn'], [/\[Buena práctica\]/g, 'ok']]

export default function Guias() {
  const [sel, setSel] = useState(guias[0]?.id)
  const [q, setQ] = useState('')
  const g = guias.find((x) => x.id === sel)

  const html = useMemo(() => {
    if (!g) return ''
    let h = marked.parse(g.md, { async: false }) as string
    for (const [re, tone] of TAGS) h = h.replace(re, (m) => `<span class="badge badge-${tone}">${m.slice(1, -1)}</span>`)
    h = h.replace(/<a /g, '<a target="_blank" rel="noopener" ')
    return h
  }, [g])

  const hits = q.length > 2
    ? guias.flatMap((x) => x.md.split('\n').filter((l) => l.toLowerCase().includes(q.toLowerCase())).slice(0, 5).map((l) => ({ id: x.id, title: x.title, l })))
    : []

  return (
    <Page title="Guías de diseño" actions={<Input placeholder="Buscar en todas las guías…" value={q} onChange={(e) => setQ(e.target.value)} />}>
      <p className="muted small">
        <span className="badge badge-info">FIRST</span> regla del manual (verificar cada año) ·{' '}
        <span className="badge badge-warn">Fabricante</span> recomendación del fabricante ·{' '}
        <span className="badge badge-ok">Buena práctica</span> práctica común de equipos
      </p>
      {hits.length > 0 && (
        <div className="card">
          {hits.map((h, i) => (
            <div key={i} className="small" style={{ cursor: 'pointer', padding: '4px 0' }} onClick={() => { setSel(h.id); setQ('') }}>
              <b>{h.title}:</b> {h.l.replace(/[#*|`[\]]/g, ' ').slice(0, 160)}
            </div>
          ))}
        </div>
      )}
      <div className="row" style={{ marginBottom: 12 }}>
        {guias.map((x) => (
          <button key={x.id} className={`btn ${x.id === sel ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setSel(x.id)}>{x.title}</button>
        ))}
      </div>
      {g ? <article className="card md" dangerouslySetInnerHTML={{ __html: html }} /> : <p className="empty">Sin guías.</p>}
    </Page>
  )
}
