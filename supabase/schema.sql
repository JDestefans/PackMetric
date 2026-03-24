-- PackMetric initial schema (single-tenant v1)
create table if not exists trainer_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  business_name text not null,
  display_name text not null,
  location text,
  contact_email text,
  training_style_primary text not null,
  training_style_secondary text[],
  allowed_tools text[] default '{}',
  never_recommend_tools text[] default '{}',
  philosophy text,
  services text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references trainer_profiles(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  household_notes text,
  status text not null default 'lead',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists dogs (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references trainer_profiles(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  name text not null,
  breed text,
  age_months int,
  sex text,
  weight_kg numeric,
  health_notes text,
  behavior_flags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists assessments (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid not null references trainer_profiles(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  dog_id uuid not null references dogs(id) on delete cascade,
  mode text not null,
  training_style text not null,
  payload jsonb not null,
  ai_draft jsonb,
  trainer_decision text,
  trainer_decision_notes text,
  approved_plan jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists assessment_media_submissions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references assessments(id) on delete cascade,
  task_id text not null,
  media_url text not null,
  context_notes text,
  created_at timestamptz not null default now()
);
