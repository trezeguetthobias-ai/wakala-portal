
create type public.app_role as enum ('admin','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.user_roles where user_id=_user_id and role=_role)
$$;

create policy "view own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "admin view roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(),'admin'));

create type public.app_type as enum ('wakala','lipa');
create type public.app_status as enum ('pending','processing','approved','rejected');
create type public.lipa_category as enum ('MACHINGA','BINAFSI','COMPANY_LIMITED');

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ref_no text not null unique default ('GJ-' || to_char(now(),'YYMMDD') || '-' || substr(md5(random()::text),1,6)),
  type app_type not null,
  status app_status not null default 'pending',
  category lipa_category,
  customer_name text not null,
  phone text not null,
  alt_phone text,
  tin text,
  id_type text,
  id_number text,
  business_name text,
  business_type text,
  email text,
  ward text,
  district text,
  region text,
  has_agent_line boolean default false,
  notes text,
  signature_data text,
  documents jsonb default '{}'::jsonb,
  contract_path text,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.applications enable row level security;

create policy "users view own apps" on public.applications for select to authenticated using (auth.uid()=user_id);
create policy "users create own apps" on public.applications for insert to authenticated with check (auth.uid()=user_id);
create policy "users update own apps" on public.applications for update to authenticated using (auth.uid()=user_id);
create policy "admins view all apps" on public.applications for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admins update all apps" on public.applications for update to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.tg_set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger applications_updated before update on public.applications for each row execute function public.tg_set_updated_at();
