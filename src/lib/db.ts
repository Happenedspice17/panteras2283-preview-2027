import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'

type Filter = Record<string, string | number | boolean | null>

/** Lee una tabla con filtros de igualdad y orden; expone CRUD que recarga la lista. */
export function useRows<T extends { id?: number | string }>(
  table: string,
  opts: { filter?: Filter; order?: string; asc?: boolean; select?: string; skip?: boolean } = {},
) {
  const [rows, setRows] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const key = JSON.stringify(opts)

  const reload = useCallback(async () => {
    if (opts.skip) { setLoading(false); return }
    let q = supabase.from(table).select(opts.select ?? '*')
    for (const [k, v] of Object.entries(opts.filter ?? {})) q = v === null ? q.is(k, null) : q.eq(k, v)
    if (opts.order) q = q.order(opts.order, { ascending: opts.asc ?? true })
    const { data, error } = await q
    setError(error?.message ?? null)
    setRows((data ?? []) as unknown as T[])
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, key])

  useEffect(() => { reload() }, [reload])

  const run = async (p: PromiseLike<{ error: { message: string } | null }>) => {
    const { error } = await p
    if (error) { setError(error.message); alert(error.message); return false }
    await reload()
    return true
  }

  return {
    rows, loading, error, reload,
    insert: (v: Partial<T> | Partial<T>[]) => run(supabase.from(table).insert(v as never)),
    update: (id: number | string, v: Partial<T>) => run(supabase.from(table).update(v as never).eq('id', id)),
    remove: (id: number | string) => run(supabase.from(table).delete().eq('id', id)),
  }
}

/** Semana de construcción (1 = semana del kickoff). */
export function buildWeek(kickoff: string, date = new Date()) {
  const ms = date.getTime() - new Date(kickoff + 'T00:00:00').getTime()
  return Math.floor(ms / (7 * 864e5)) + 1
}

/** Avance esperado (%) de un objetivo según la semana actual. */
export function expectedProgress(weekStart: number, weekDue: number, week: number) {
  if (week < weekStart) return 0
  if (week >= weekDue) return 100
  return Math.round(((week - weekStart + 1) / (weekDue - weekStart + 1)) * 100)
}

export const fmtDate = (d: string | null) =>
  d ? new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

export const mxn = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })
export const usd = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
