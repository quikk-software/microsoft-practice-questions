-- Laufende Prüfungs-Sessions (Resume nach Reload/Gerätewechsel, nur mit Login)
-- Anwenden: Supabase Studio (SQL Editor)

create table public.exam_sessions (
  user_id uuid not null references public.profiles (id) on delete cascade,
  exam_slug text not null references public.exams (slug) on delete cascade,
  question_ids jsonb not null,          -- gezogene Fragen in Reihenfolge
  answers jsonb not null default '{}',  -- questionId -> Answer
  checked_ids jsonb not null default '[]',
  current_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, exam_slug)
);

-- Zugriff nur serverseitig (Service Role); keine Policies = deny-all für Clients.
alter table public.exam_sessions enable row level security;
