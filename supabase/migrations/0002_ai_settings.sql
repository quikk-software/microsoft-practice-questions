-- BYOK: Pro-User-AI-Einstellungen (Provider, Modell, verschlüsselter API-Key)
-- Anwenden: Supabase Studio (SQL Editor)

create table public.ai_settings (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  provider text not null,
  model text not null,
  api_key_encrypted text not null,   -- AES-256-GCM, base64(iv|tag|ciphertext); Schlüssel liegt NUR in der App-ENV
  api_key_hint text not null,        -- z. B. "sk-…abcd" für die UI
  updated_at timestamptz not null default now()
);

-- Keine Policies = deny-all für Anon-/User-Tokens.
-- Zugriff ausschließlich serverseitig (Service Role); Autorisierung passiert in den API-Routen.
alter table public.ai_settings enable row level security;
