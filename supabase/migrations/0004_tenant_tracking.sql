-- Mandanten-Tracking: Bei welchem Mandanten hat sich ein User registriert?
-- Anwenden: Supabase Studio (SQL Editor)

alter table public.profiles
  add column if not exists tenant_id text;

-- Signup-Trigger erweitern: tenant_id aus den User-Metadaten übernehmen.
-- (Der Auth-Adapter schickt sie beim signUp als options.data mit.)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, tenant_id)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data ->> 'tenant_id', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create index if not exists profiles_tenant_idx on public.profiles (tenant_id);
