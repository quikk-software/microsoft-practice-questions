-- Initiales Schema für Microsoft Practice Exams
-- Anwenden: Supabase Studio (SQL Editor) oder `supabase db push`

create extension if not exists vector;

-- ===== Identity / Rollen =====

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  created_at timestamptz not null default now()
);

-- Bei Signup automatisch Profil anlegen
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Rolle eines Users lesen (für RLS-Policies)
create or replace function public.current_role()
returns text
language sql
stable security definer set search_path = public
as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'anon');
$$;

-- ===== Kurse / Examen =====

create table public.exams (
  slug text primary key,
  published boolean not null default true,
  config jsonb not null,           -- komplettes ExamConfig-Objekt (lib/types.ts)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.questions (
  id text primary key,
  exam_slug text not null references public.exams (slug) on delete cascade,
  type text not null,
  skill_area text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  topic text not null,
  status text not null default 'published' check (status in ('draft', 'published')),
  data jsonb not null,             -- komplettes Question-Objekt (inkl. Lösungen!)
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index questions_exam_idx on public.questions (exam_slug, status);

create table public.content_units (
  uid text primary key,
  exam_slug text not null references public.exams (slug) on delete cascade,
  module_slug text not null,
  module_title text not null,
  title text not null,
  url text not null,
  position int not null default 0,
  markdown text not null,
  ingested_at timestamptz not null default now()
);
create index content_units_exam_idx on public.content_units (exam_slug);

-- ===== RAG =====

create table public.content_chunks (
  id text primary key,
  exam_slug text not null references public.exams (slug) on delete cascade,
  unit_uid text not null references public.content_units (uid) on delete cascade,
  heading text,
  text text not null,
  embedding vector(1536)           -- text-embedding-3-small
);
create index content_chunks_exam_idx on public.content_chunks (exam_slug);

create or replace function public.match_content_chunks(
  p_exam_slug text,
  p_query vector(1536),
  p_count int default 4
)
returns table (
  id text, unit_uid text, heading text, "text" text, similarity float
)
language sql stable
as $$
  select c.id, c.unit_uid, c.heading, c.text,
         1 - (c.embedding <=> p_query) as similarity
  from public.content_chunks c
  where c.exam_slug = p_exam_slug and c.embedding is not null
  order by c.embedding <=> p_query
  limit p_count;
$$;

-- ===== Prüfungs-Verlauf =====

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  exam_slug text not null references public.exams (slug) on delete cascade,
  scaled_score int not null,
  max_score int not null,
  pass_score int not null,
  passed boolean not null,
  per_skill_area jsonb not null,   -- [{id,name,score,total}]
  created_at timestamptz not null default now()
);
create index attempts_user_idx on public.attempts (user_id, created_at desc);

-- ===== Row Level Security =====
-- Serverseitige Checks sind die primäre Verteidigung; RLS ist die zweite Linie.
-- Der Server nutzt für Datenpflege den Service-Role-Key (umgeht RLS bewusst).

alter table public.profiles enable row level security;
alter table public.exams enable row level security;
alter table public.questions enable row level security;
alter table public.content_units enable row level security;
alter table public.content_chunks enable row level security;
alter table public.attempts enable row level security;

-- profiles: nur eigenes Profil lesen; Rollen ändern nur admin (über Service-Role serverseitig)
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

-- exams: veröffentlichte für alle lesbar; Pflege nur editor/admin
create policy "exams: read published" on public.exams
  for select using (published or public.current_role() in ('editor', 'admin'));
create policy "exams: write staff" on public.exams
  for all using (public.current_role() in ('editor', 'admin'))
  with check (public.current_role() in ('editor', 'admin'));

-- questions: enthalten Lösungen -> KEIN Read für anon/user über die API;
-- die Practice-App liest serverseitig (Service Role) und strippt die Lösungen.
create policy "questions: staff only" on public.questions
  for all using (public.current_role() in ('editor', 'admin'))
  with check (public.current_role() in ('editor', 'admin'));

-- content: lesbar für alle (öffentliche Microsoft-Learn-Inhalte), Pflege nur staff
create policy "content_units: read all" on public.content_units
  for select using (true);
create policy "content_units: write staff" on public.content_units
  for all using (public.current_role() in ('editor', 'admin'))
  with check (public.current_role() in ('editor', 'admin'));
create policy "content_chunks: read all" on public.content_chunks
  for select using (true);
create policy "content_chunks: write staff" on public.content_chunks
  for all using (public.current_role() in ('editor', 'admin'))
  with check (public.current_role() in ('editor', 'admin'));

-- attempts: jeder sieht/schreibt nur seine eigenen
create policy "attempts: own" on public.attempts
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ===== Ersten Admin setzen (nach der Registrierung ausführen) =====
-- update public.profiles set role = 'admin' where email = 'joyce@quikk.de';
