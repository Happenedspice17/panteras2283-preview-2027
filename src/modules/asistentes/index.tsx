import { useState } from 'react'
import { Page, Card, Button, Select, Textarea, Empty, Loading } from '../../components/ui'
import { useAuth } from '../../lib/auth'
import { supabase } from '../../lib/supabase'
import { AREAS, AREA_LABEL, type Area } from '../../lib/constants'
import { buildWeek, useRows } from '../../lib/db'
import type { Objective, Practice } from '../../lib/types'
import { buildSystemPrompt } from './prompts'

interface Msg { role: 'user' | 'assistant'; content: string }

export default function Asistentes() {
  const { season } = useAuth()
  const [area, setArea] = useState<Area>(AREAS[0])
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [offline, setOffline] = useState(false)
  const [copied, setCopied] = useState(false)

  const objs = useRows<Objective>('objectives', { filter: { season_id: season?.id ?? 0, area }, skip: !season })
  const pracs = useRows<Practice>('practices', { filter: { area }, order: 'week' })
  const week = season ? buildWeek(season.kickoff) : 0

  const changeArea = (a: Area) => { setArea(a); setMsgs([]); setError(null) }

  const send = async () => {
    const content = text.trim()
    if (!content || busy) return
    const next = [...msgs, { role: 'user' as const, content }]
    setMsgs(next); setText(''); setBusy(true); setError(null)
    const { data, error: err } = await supabase.functions.invoke('asistente', { body: { area, messages: next } })
    setBusy(false)
    if (err || data?.error) {
      const detail = await (err as { context?: Response } | null)?.context?.json?.().catch(() => null)
      const m: string = data?.error ?? detail?.error ?? err?.message ?? 'Error'
      if (/no configurado/i.test(m)) setOffline(true)
      else setError(m)
      return
    }
    setMsgs([...next, { role: 'assistant', content: data.reply }])
  }

  const copyPrompt = async () => {
    const p = pracs.rows.find((r) => r.week === week)
    const prompt = buildSystemPrompt(area, {
      season: season ? { name: season.name, week } : null,
      objectives: objs.rows.map((o) => ({ title: o.title, progress: o.progress })),
      practice: p ?? null,
    })
    await navigator.clipboard.writeText(prompt)
    setCopied(true); setTimeout(() => setCopied(false), 2500)
  }

  return (
    <Page title="Asistentes">
      <div className="alert alert-warn">Orienta, no hace la tarea. Ante cualquier riesgo, busca a un adulto.</div>
      {!season && <Empty>No hay temporada activa. Un coach debe crear la temporada.</Empty>}
      {season && (
        <Card title={AREA_LABEL[area]} actions={
          <Select value={area} onChange={(e) => changeArea(e.target.value as Area)} options={AREAS.map((a) => ({ value: a, label: AREA_LABEL[a] }))} />
        }>
          {offline ? (
            <div className="alert alert-info">
              <p>El asistente no está configurado todavía. Modo sin costo: copia el prompt y pégalo en Claude.ai o cualquier chat gratuito, y luego escribe tu duda ahí.</p>
              {pracs.loading || objs.loading ? <Loading /> : <Button onClick={copyPrompt}>{copied ? 'Copiado' : 'Copiar prompt'}</Button>}
            </div>
          ) : (
            <>
              <div className="grid">
                {msgs.length === 0 && <Empty>Cuéntame en qué estás trabajando y qué has intentado.</Empty>}
                {msgs.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'alert alert-info' : 'alert'} style={{ whiteSpace: 'pre-wrap' }}>
                    <strong>{m.role === 'user' ? 'Tú' : 'Asistente'}</strong>
                    <div>{m.content}</div>
                  </div>
                ))}
                {busy && <p className="muted">Pensando…</p>}
                {error && <div className="alert alert-bad">{error}</div>}
              </div>
              <form className="form" onSubmit={(e) => { e.preventDefault(); send() }}>
                <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe tu duda…" maxLength={2000} />
                <div className="row">
                  <Button type="submit" disabled={busy || !text.trim()}>Enviar</Button>
                  {msgs.length > 0 && <Button type="button" variant="ghost" onClick={() => setMsgs([])}>Nueva conversación</Button>}
                </div>
              </form>
              <p className="muted small">La conversación no se guarda. No compartas datos personales.</p>
            </>
          )}
        </Card>
      )}
    </Page>
  )
}
