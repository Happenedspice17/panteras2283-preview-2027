import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const redirectTo = window.location.origin + window.location.pathname

  return (
    <div className="center">
      <div className="card" style={{ width: 360 }}>
        <h1>Forja</h1>
        <p className="muted">Panteras 2283 · sistema de temporada</p>
        <button className="btn btn-primary" style={{ width: '100%' }}
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })}>
          Entrar con Google
        </button>
        <p className="muted small" style={{ textAlign: 'center' }}>o con enlace por correo</p>
        {sent ? <p>Revisa tu correo.</p> : (
          <form className="row" onSubmit={async (e) => {
            e.preventDefault()
            const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } })
            if (error) alert(error.message); else setSent(true)
          }}>
            <input type="email" required placeholder="correo@up.edu.mx" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-ghost">Enviar</button>
          </form>
        )}
      </div>
    </div>
  )
}
