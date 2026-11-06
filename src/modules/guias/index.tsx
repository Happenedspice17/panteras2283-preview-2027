import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import { useNavigate, useParams } from 'react-router-dom'
import { Page, Input } from '../../components/ui'
import { GUIAS } from '../../lib/constants'

const files = import.meta.glob('../../../docs/guias/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const ORDER = GUIAS.map(([id]) => id)

const guias = Object.entries(files)
  .map(([path, md]) => {
    const id = path.split('/').pop()!.replace('.md', '')
    return { id, md, title: md.match(/^#\s+(.+)$/m)?.[1] ?? id }
  })
  .sort((a, b) => (ORDER.indexOf(a.id) + 99) % 99 - (ORDER.indexOf(b.id) + 99) % 99)

const TAGS: [RegExp, string][] = [[/\[FIRST\]/g, 'info'], [/\[Fabricante\]/g, 'warn'], [/\[Buena práctica\]/g, 'ok']]

export default function Guias() {
  const { id: sel } = useParams()
  const nav = useNavigate()
  const setSel = (id: string) => nav(`/guias/${id}`)
  const [q, setQ] = useState('')
  const ref = useRef<HTMLElement>(null)
  const g = guias.find((x) => x.id === sel) ?? guias[0]

  const html = useMemo(() => {
    if (!g) return ''
    let h = marked.parse(g.md, { async: false }) as string
    for (const [re, tone] of TAGS) h = h.replace(re, (m) => `<span class="badge badge-${tone}">${m.slice(1, -1)}</span>`)
    h = h.replace(/<a /g, '<a target="_blank" rel="noopener" ')
    return h
  }, [g])

  useEffect(() => {
    ref.current?.querySelectorAll('pre').forEach((pre) => {
      const b = document.createElement('button')
      b.className = 'btn btn-ghost copy-btn'
      b.textContent = 'Copiar'
      b.onclick = async () => {
        try { await navigator.clipboard.writeText((pre.querySelector('code') ?? pre).textContent?.trim() ?? ''); b.textContent = 'Copiado' } catch { b.textContent = 'Selecciona y copia' }
        setTimeout(() => (b.textContent = 'Copiar'), 1500)
      }
      pre.append(b)
    })
  }, [html])

  const hits = q.length > 2
    ? guias.flatMap((x) => x.md.split('\n').filter((l) => l.toLowerCase().includes(q.toLowerCase())).slice(0, 5).map((l) => ({ id: x.id, title: x.title, l })))
    : []

  return (
    <Page title={g?.title ?? "Reglas de diseño"} actions={<Input placeholder="Buscar en todas las guías…" value={q} onChange={(e) => setQ(e.target.value)} />}>
      <p className="muted small legend-guias">
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
      {g ? <article ref={ref} className="card md" dangerouslySetInnerHTML={{ __html: html }} /> : <p className="empty">Sin guías.</p>}
    </Page>
  )
}
