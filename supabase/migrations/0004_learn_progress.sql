-- Lern-Fortschritt pro Frage (geräteübergreifend, nur mit Login)
-- Anwenden: Supabase Studio (SQL Editor)

create table public.learn_progress (
  user_id uuid not null references public.profiles (id) on delete cascade,
  exam_slug text not null references public.exams (slug) on delete cascade,
  question_id text not null,
  last_score numeric not null default 0,     -- 0..1 (Teilpunkte möglich)
  times_seen int not null default 1,
  times_correct int not null default 0,
  last_answered_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create index learn_progress_user_exam_idx
  on public.learn_progress (user_id, exam_slug);

-- Zugriff ausschließlich serverseitig (Service Role); keine Policies = deny-all.
alter table public.learn_progress enable row level security;
