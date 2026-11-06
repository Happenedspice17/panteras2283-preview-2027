import type { Area, Level, Role } from './constants'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: Role
  area: Area | null
  level: Level
  is_minor: boolean
  guardian_consent: boolean
  safety_ok: boolean
  safety_date: string | null
  active: boolean
}

export interface Season {
  id: number
  year: number
  name: string
  kickoff: string
  main_event: string
  cost_limit_usd: number
  usd_mxn: number
  kickoff_step: number
  matrix_criteria: { name: string; weight: number }[]
  current: boolean
}

export interface Budget { id: number; season_id: number; area: Area; amount_mxn: number }

export interface EventRow {
  id: number; season_id: number; title: string; kind: string
  date_start: string; date_end: string | null; location: string | null; notes: string | null; parent_id: number | null
}

export interface Objective {
  id: number; season_id: number; area: Area; title: string; week_start: number; week_due: number
  progress: number; is_milestone: boolean; owner_id: string | null; done_at: string | null
}

export interface KickoffItem {
  id: number; season_id: number; type: 'regla' | 'pregunta' | 'what' | 'how'; area: Area | null
  text: string; answer: string | null; parent_id: number | null; scores: Record<string, number>
  chosen: boolean; author_id: string | null
}
export interface KickoffVote { item_id: number; user_id: string; points: number }

export interface CompRole { id: number; season_id: number; event_id: number | null; role_name: string; primary_id: string | null; backup_id: string | null }

export interface Practice {
  id: number; area: Area; level: Level; week: number; title: string
  objective: string | null; deliverable: string | null; rubric: string | null; resources: string | null
}
export interface Submission {
  id: number; practice_id: number; student_id: string; evidence_url: string | null; notes: string | null
  status: 'enviado' | 'validado' | 'rechazado'; feedback: string | null; validated_by: string | null; created_at: string
}

export interface Quiz { id: number; area: string; title: string; pass_score: number; questions: { q: string; options: string[]; answer: number; why?: string }[] }
export interface QuizAttempt { id: number; quiz_id: number; user_id: string; score: number; created_at: string }
export interface TrainingHours { id: number; user_id: string; area: Area; hours: number; date: string; note: string | null }

export interface Mentoring {
  id: number; area: Area; topic: string; tried: string | null; decide: string | null; scheduled_at: string | null
  responsible_adult: string; mentor_name: string | null; context_summary: string | null; minutes: string | null
  agreements: { text: string; owner: string; due: string; done: boolean }[]; hours: number | null
  rating: number | null; comment: string | null; status: 'solicitada' | 'agendada' | 'realizada' | 'cancelada'
}

export interface InventoryItem {
  id: number; name: string; sku: string | null; category: string | null; qty: number; location: string | null
  is_battery: boolean; battery_year: number | null; battery_cycles: number | null; battery_notes: string | null
}
export interface Part {
  id: number; season_id: number; area: Area; subsystem: string; name: string; sku: string | null; qty: number
  unit_cost_usd: number; vendor: string | null; url: string | null; onshape_url: string | null
  priority: 'esencial' | 'estrategico' | 'aspiracional'; status: 'pendiente' | 'pedido' | 'recibido' | 'en_inventario'
  inventory_id: number | null; needed_by: string | null
}

export interface Attendee { event_id: number; user_id: string; permit_ok: boolean }
export interface PitItem { id: number; event_id: number | null; item: string; category: string | null; done: boolean }
export interface Match { id: number; event_id: number; match_label: string; alliance: string | null; our_score: number | null; opp_score: number | null; result: 'W' | 'L' | 'T' | null; rank_after: number | null; notes: string | null }
export interface Scouting { id: number; event_id: number; team_number: number; match_label: string | null; data: Record<string, unknown>; notes: string | null; scout_id: string | null }

export interface Doc { id: number; kind: 'decision' | 'retrospectiva' | 'minuta' | 'impact'; title: string; body: string | null; area: Area | null; date: string; event_id: number | null; author_id: string | null }
