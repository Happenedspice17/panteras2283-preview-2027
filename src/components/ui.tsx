import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from 'react'

export function Page({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="page">
      <header className="page-head"><h1>{title}</h1><div className="row">{actions}</div></header>
      {children}
    </section>
  )
}

export function Card({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="card">
      {(title || actions) && <div className="card-head"><h2>{title}</h2><div className="row">{actions}</div></div>}
      {children}
    </div>
  )
}

export function Table({ head, children }: { head: ReactNode[]; children: ReactNode }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>
}

export const Input = (p: InputHTMLAttributes<HTMLInputElement>) => <input {...p} />
export const Textarea = (p: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea rows={3} {...p} />

export function Select({ options, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string | number; label: string }[] }) {
  return <select {...p}>{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
}

export function Button({ variant = 'primary', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }) {
  return <button className={`btn btn-${variant}`} {...p} />
}

export function Badge({ tone = 'neutral', children }: { tone?: 'neutral' | 'ok' | 'warn' | 'bad' | 'info'; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

export function Progress({ value, expected }: { value: number; expected?: number }) {
  const tone = expected === undefined || value >= expected ? 'ok' : value >= expected - 15 ? 'warn' : 'bad'
  return (
    <div className="progress" title={`${value}%${expected !== undefined ? ` (esperado ${expected}%)` : ''}`}>
      <div className={`progress-bar ${tone}`} style={{ width: `${value}%` }} />
      {expected !== undefined && <div className="progress-mark" style={{ left: `${expected}%` }} />}
    </div>
  )
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return <div className="stat"><div className="stat-value">{value}</div><div className="stat-label">{label}</div>{hint && <div className="muted small">{hint}</div>}</div>
}

export const Empty = ({ children }: { children: ReactNode }) => <p className="empty">{children}</p>
export const Loading = () => <p className="muted">Cargando…</p>
