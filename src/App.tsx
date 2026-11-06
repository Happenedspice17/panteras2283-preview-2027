import { useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './lib/auth'
import { configured } from './lib/supabase'
import { GUIAS, ROLE_LABEL } from './lib/constants'
import Login from './pages/Login'
import Setup from './pages/Setup'
import Dashboard from './modules/dashboard'
import Temporada from './modules/temporada'
import Calendario from './modules/calendario'
import Eventos from './modules/eventos'
import Equipo from './modules/equipo'
import Practicas from './modules/practicas'
import Formacion from './modules/formacion'
import Asistentes from './modules/asistentes'
import Asesorias from './modules/asesorias'
import Bom from './modules/bom'
import Memoria from './modules/memoria'
import Reporte from './modules/reporte'
import Recursos from './modules/recursos'
import Guias from './modules/guias'

const NAV: { group: string; items: [string, string][] }[] = [
  { group: 'Reglas de diseño', items: GUIAS.map(([id, t]) => [`/guias/${id}`, t]) },
  { group: 'Temporada', items: [['/', 'Tablero'], ['/temporada', 'Arranque y objetivos'], ['/calendario', 'Calendario'], ['/eventos', 'Eventos']] },
  { group: 'Personas', items: [['/equipo', 'Equipo y roles'], ['/practicas', 'Prácticas'], ['/formacion', 'Formación'], ['/asistentes', 'Asistentes IA'], ['/asesorias', 'Asesorías']] },
  { group: 'Recursos', items: [['/bom', 'BOM e inventario'], ['/memoria', 'Memoria del equipo'], ['/reporte', 'Reporte patrocinadores'], ['/recursos', 'Guía FIRST / FRC']] },
]

export default function App() {
  const { session, profile, loading, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  if (!configured) return <Setup />
  if (loading) return <div className="center muted">Cargando…</div>
  if (!session) return <Login />
  if (!profile) return <div className="center muted">Creando perfil…</div>

  if (profile.role === 'pendiente') return (
    <div className="center"><div className="card" style={{ maxWidth: 440 }}>
      <h2>Cuenta pendiente</h2>
      <p>Un coach debe aprobar tu cuenta (y registrar el consentimiento de tu tutor si eres menor de edad).</p>
      <button className="btn btn-ghost" onClick={signOut}>Salir</button>
    </div></div>
  )

  if (profile.role === 'patrocinador') return (
    <main className="main"><Reporte /><button className="btn btn-ghost" onClick={signOut}>Salir</button></main>
  )

  return (
    <div className="layout">
      <header className="topbar">
        <button className="btn btn-ghost" aria-label="Abrir menú" onClick={() => setOpen(true)}>☰</button>
        <b>Forja · 2283</b>
      </header>
      <div className={`backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <div className="brand">Forja · Panteras 2283<small>{profile.full_name} · {ROLE_LABEL[profile.role]}</small></div>
        <nav className="nav">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="nav-group">{g.group}</div>
              {g.items.map(([to, label]) => <NavLink key={to} to={to} end>{label}</NavLink>)}
            </div>
          ))}
        </nav>
        <div style={{ padding: 10 }}><button className="btn btn-ghost" onClick={signOut}>Salir</button></div>
      </aside>
      <main className="main">
        <nav className="quick" aria-label="Reglas de diseño">
          <span className="quick-label">Reglas de diseño</span>
          {GUIAS.map(([id, t]) => <NavLink key={id} to={`/guias/${id}`}>{t}</NavLink>)}
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/temporada" element={<Temporada />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/practicas" element={<Practicas />} />
          <Route path="/formacion" element={<Formacion />} />
          <Route path="/asistentes" element={<Asistentes />} />
          <Route path="/asesorias" element={<Asesorias />} />
          <Route path="/bom" element={<Bom />} />
          <Route path="/memoria" element={<Memoria />} />
          <Route path="/reporte" element={<Reporte />} />
          <Route path="/guias" element={<Navigate to="/guias/diseno-robot" />} />
          <Route path="/guias/:id" element={<Guias />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
