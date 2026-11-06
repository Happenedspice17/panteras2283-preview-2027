import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { Profile, Season } from './types'

interface Ctx {
  session: Session | null
  profile: Profile | null
  season: Season | null
  loading: boolean
  isStaff: boolean
  isCoach: boolean
  refresh: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthCtx = createContext<Ctx>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [season, setSeason] = useState<Season | null>(null)
  const [loading, setLoading] = useState(true)

  async function load(s: Session | null) {
    setSession(s)
    if (!s) { setProfile(null); setLoading(false); return }
    const [{ data: p }, { data: se }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', s.user.id).single(),
      supabase.from('seasons').select('*').eq('current', true).maybeSingle(),
    ])
    setProfile(p as Profile)
    setSeason(se as Season | null)
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => load(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => { load(s) })
    return () => data.subscription.unsubscribe()
  }, [])

  const role = profile?.role
  const value: Ctx = {
    session, profile, season, loading,
    isStaff: role === 'coach' || role === 'lider',
    isCoach: role === 'coach',
    refresh: () => load(session),
    signOut: async () => { await supabase.auth.signOut() },
  }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
