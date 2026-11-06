-- Forja Panteras 2283 · esquema base
-- Roles: pendiente (recién registrado), alumno, lider (alumno líder de área), coach, mentor, patrocinador

create type rol as enum ('pendiente','alumno','lider','coach','mentor','patrocinador');
create type area as enum ('estrategia','mecanica','electronica','programacion','organizacion');
create type nivel as enum ('basico','intermedio','avanzado');

-- ───────── Perfiles ─────────
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  role rol not null default 'pendiente',
  area area,
  level nivel not null default 'basico',
  is_minor boolean not null default true,
  guardian_consent boolean not null default false,
  safety_ok boolean not null default false,
  safety_date date,
  active boolean not null default true,
  created_at timestamptz default now()
);

create function my_role() returns rol language sql stable security definer set search_path = public as
$$ select role from profiles where id = auth.uid() $$;
create function is_member() returns boolean language sql stable as
$$ select coalesce(my_role() in ('alumno','lider','coach','mentor'), false) $$;
create function is_staff() returns boolean language sql stable as
$$ select coalesce(my_role() in ('lider','coach'), false) $$;
create function is_coach() returns boolean language sql stable as
$$ select coalesce(my_role() = 'coach', false) $$;

create function handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- Alumno menor sin consentimiento no puede quedar activo como alumno/líder
create function check_consent() returns trigger language plpgsql as $$
begin
  if new.role in ('alumno','lider') and new.is_minor and not new.guardian_consent then
    raise exception 'Falta consentimiento del tutor para activar a este alumno';
  end if;
  return new;
end $$;
create trigger profiles_consent before insert or update on profiles
  for each row execute function check_consent();

-- ───────── Temporada ─────────
create table seasons (
  id serial primary key,
  year int not null unique,
  name text not null,
  kickoff date not null,
  main_event date not null,
  cost_limit_usd numeric not null default 600,
  usd_mxn numeric not null default 18,
  kickoff_step int not null default 1,            -- 1..5
  matrix_criteria jsonb not null default '[]',    -- [{name, weight}]
  current boolean not null default false
);

create table budgets (
  id serial primary key,
  season_id int references seasons on delete cascade,
  area area not null,
  amount_mxn numeric not null default 0,
  unique (season_id, area)
);

-- Calendario: oficiales, internas, juntas, competencias
create table events (
  id serial primary key,
  season_id int references seasons on delete cascade,
  title text not null,
  kind text not null default 'interno',  -- oficial | interno | junta | competencia | fecha_limite
  date_start date not null,
  date_end date,
  location text,
  notes text,
  parent_id int references events on delete cascade  -- juntas previa/posterior ligadas a un evento
);

-- Objetivos e hitos por área con avance real vs esperado
create table objectives (
  id serial primary key,
  season_id int references seasons on delete cascade,
  area area not null,
  title text not null,
  week_start int not null default 1,
  week_due int not null,
  progress int not null default 0 check (progress between 0 and 100),
  is_milestone boolean not null default false,
  owner_id uuid references profiles,
  done_at date
);

-- ───────── Kickoff (5 pasos) ─────────
-- type: regla (examen de reglas) | pregunta (por equipo de análisis) | what | how
create table kickoff_items (
  id serial primary key,
  season_id int references seasons on delete cascade,
  type text not null,
  area area,
  text text not null,
  answer text,
  parent_id int references kickoff_items on delete cascade,  -- how -> what
  scores jsonb not null default '{}',                          -- how: {criterio: 1..5}
  chosen boolean not null default false,
  author_id uuid references profiles default auth.uid(),
  created_at timestamptz default now()
);
create table kickoff_votes (
  item_id int references kickoff_items on delete cascade,
  user_id uuid references profiles default auth.uid(),
  points int not null check (points >= 0),
  primary key (item_id, user_id)
);

-- ───────── Equipo: roles de competencia ─────────
create table comp_roles (
  id serial primary key,
  season_id int references seasons on delete cascade,
  event_id int references events on delete cascade,  -- null = rol de temporada
  role_name text not null,      -- driver, operador, coach de drive, human player, pit, scouting, presentador...
  primary_id uuid references profiles,
  backup_id uuid references profiles
);

-- ───────── Prácticas de aprendizaje ─────────
create table practices (
  id serial primary key,
  area area not null,
  level nivel not null,
  week int not null default 1,
  title text not null,
  objective text,
  deliverable text,
  rubric text,
  resources text
);
create table submissions (
  id serial primary key,
  practice_id int references practices on delete cascade,
  student_id uuid references profiles default auth.uid(),
  evidence_url text,
  notes text,
  status text not null default 'enviado',  -- enviado | validado | rechazado
  feedback text,
  validated_by uuid references profiles,
  created_at timestamptz default now(),
  unique (practice_id, student_id)
);

-- ───────── Formación ─────────
create table quizzes (
  id serial primary key,
  area text not null,        -- área o 'seguridad'
  title text not null,
  pass_score int not null default 80,
  questions jsonb not null default '[]'   -- [{q, options:[..], answer: idx, why}]
);
create table quiz_attempts (
  id serial primary key,
  quiz_id int references quizzes on delete cascade,
  user_id uuid references profiles default auth.uid(),
  score int not null,
  created_at timestamptz default now()
);
create table training_hours (
  id serial primary key,
  user_id uuid references profiles,
  area area not null,
  hours numeric not null,
  date date not null default current_date,
  note text
);

-- Aprobar quiz de seguridad marca la inducción
create function quiz_safety() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from quizzes q where q.id = new.quiz_id and q.area = 'seguridad' and new.score >= q.pass_score) then
    update profiles set safety_ok = true, safety_date = current_date where id = new.user_id;
  end if;
  return new;
end $$;
create trigger quiz_attempt_safety after insert on quiz_attempts
  for each row execute function quiz_safety();

-- ───────── Asesorías ─────────
create table mentoring (
  id serial primary key,
  area area not null,
  topic text not null,
  tried text,
  decide text,
  scheduled_at timestamptz,
  responsible_adult text not null,
  mentor_name text,
  context_summary text,
  minutes text,
  agreements jsonb not null default '[]',  -- [{text, owner, due, done}]
  hours numeric default 1,
  rating int check (rating between 1 and 5),
  comment text,
  status text not null default 'solicitada',  -- solicitada | agendada | realizada | cancelada
  created_by uuid references profiles default auth.uid(),
  created_at timestamptz default now()
);

-- ───────── BOM e inventario ─────────
create table inventory (
  id serial primary key,
  name text not null,
  sku text,
  category text,
  qty int not null default 0,
  location text,
  is_battery boolean not null default false,
  battery_year int,
  battery_cycles int,
  battery_notes text
);
create table parts (
  id serial primary key,
  season_id int references seasons on delete cascade,
  area area not null default 'mecanica',
  subsystem text not null,
  name text not null,
  sku text,
  qty int not null default 1,
  unit_cost_usd numeric not null default 0,
  vendor text,
  url text,
  onshape_url text,
  priority text not null default 'esencial',  -- esencial | estrategico | aspiracional
  status text not null default 'pendiente',   -- pendiente | pedido | recibido | en_inventario
  inventory_id int references inventory,
  needed_by date
);

-- ───────── Eventos: logística, pits, partidos, scouting ─────────
create table event_attendees (
  event_id int references events on delete cascade,
  user_id uuid references profiles,
  permit_ok boolean not null default false,
  primary key (event_id, user_id)
);
create table pit_checklist (
  id serial primary key,
  event_id int references events on delete cascade,  -- null = plantilla reutilizable
  item text not null,
  category text,
  done boolean not null default false
);
create table matches (
  id serial primary key,
  event_id int references events on delete cascade,
  match_label text not null,
  alliance text,
  our_score int,
  opp_score int,
  result text,      -- W | L | T
  rank_after int,
  notes text
);
create table scouting (
  id serial primary key,
  event_id int references events on delete cascade,
  team_number int not null,
  match_label text,
  data jsonb not null default '{}',
  notes text,
  scout_id uuid references profiles default auth.uid(),
  created_at timestamptz default now()
);

-- ───────── Memoria del equipo ─────────
create table docs (
  id serial primary key,
  kind text not null,  -- decision | retrospectiva | minuta | impact
  title text not null,
  body text,
  area area,
  date date not null default current_date,
  event_id int references events on delete set null,
  author_id uuid references profiles default auth.uid()
);

-- ───────── RLS ─────────
do $$
declare t text;
begin
  foreach t in array array['seasons','budgets','events','objectives','kickoff_items','comp_roles',
    'practices','quizzes','training_hours','inventory','parts','event_attendees','pit_checklist',
    'matches','docs']
  loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "%s_read" on %I for select using (is_member())', t, t);
    execute format('create policy "%s_write" on %I for all using (is_staff()) with check (is_staff())', t, t);
  end loop;
end $$;

-- miembros pueden proponer items de kickoff
create policy "kickoff_items_member_insert" on kickoff_items for insert with check (is_member());

alter table profiles enable row level security;
create policy "profiles_read" on profiles for select using (is_member() or id = auth.uid());
create policy "profiles_coach" on profiles for update using (is_coach()) with check (is_coach());

alter table kickoff_votes enable row level security;
create policy "votes_read" on kickoff_votes for select using (is_member());
create policy "votes_own" on kickoff_votes for all using (user_id = auth.uid()) with check (user_id = auth.uid() and is_member());

alter table submissions enable row level security;
create policy "subs_read" on submissions for select using (is_member());
create policy "subs_own_insert" on submissions for insert with check (student_id = auth.uid() and is_member());
create policy "subs_own_update" on submissions for update using (student_id = auth.uid() and status <> 'validado');
create policy "subs_coach" on submissions for all using (is_coach()) with check (is_coach());

alter table quiz_attempts enable row level security;
create policy "attempts_read" on quiz_attempts for select using (is_member());
create policy "attempts_own" on quiz_attempts for insert with check (user_id = auth.uid() and is_member());

alter table mentoring enable row level security;
create policy "mentoring_read" on mentoring for select using (is_member());
create policy "mentoring_staff" on mentoring for all using (is_staff() or my_role() = 'mentor')
  with check (is_staff() or my_role() = 'mentor');

alter table scouting enable row level security;
create policy "scouting_read" on scouting for select using (is_member());
create policy "scouting_insert" on scouting for insert with check (is_member());
create policy "scouting_staff" on scouting for update using (is_staff() or scout_id = auth.uid());

-- ───────── Reporte para patrocinadores (sin datos personales) ─────────
create function sponsor_report(p_season int default null) returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  if p_season is null then select id into p_season from seasons where current limit 1; end if;
  return (select case when my_role() in ('patrocinador','coach','mentor','lider') then jsonb_build_object(
    'temporada', (select year || ' ' || name from seasons where id = p_season),
    'alumnos_activos', (select count(*) from profiles where role in ('alumno','lider') and active),
    'por_nivel', (select coalesce(jsonb_object_agg(level, n), '{}') from (select level, count(*) n from profiles where role in ('alumno','lider') and active group by level) x),
    'induccion_pct', (select round(100.0 * count(*) filter (where safety_ok) / nullif(count(*),0)) from profiles where role in ('alumno','lider') and active),
    'horas_formacion', (select coalesce(sum(hours),0) from training_hours),
    'practicas_validadas', (select count(*) from submissions where status = 'validado'),
    'objetivos', (select jsonb_build_object('total', count(*), 'completos', count(*) filter (where progress = 100)) from objectives where season_id = p_season),
    'presupuesto', (select jsonb_build_object(
        'asignado_mxn', (select coalesce(sum(amount_mxn),0) from budgets where season_id = p_season),
        'ejercido_mxn', (select coalesce(sum(p.qty * p.unit_cost_usd * s.usd_mxn),0) from parts p join seasons s on s.id = p.season_id where p.season_id = p_season and p.status <> 'pendiente'))),
    'partidos', (select jsonb_build_object('W', count(*) filter (where result='W'), 'L', count(*) filter (where result='L'), 'T', count(*) filter (where result='T')) from matches m join events e on e.id = m.event_id where e.season_id = p_season),
    'asesorias_realizadas', (select count(*) from mentoring where status = 'realizada')
  ) end);
end $$;
