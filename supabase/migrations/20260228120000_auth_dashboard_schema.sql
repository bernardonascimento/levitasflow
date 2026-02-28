create extension if not exists pgcrypto;

create table if not exists public.ministries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.ministry_users (
  ministry_id uuid not null references public.ministries (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (ministry_id, user_id)
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  ministry_id uuid not null references public.ministries (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  ministry_id uuid not null references public.ministries (id) on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  linked_user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (ministry_id, email)
);

create table if not exists public.team_members (
  team_id uuid not null references public.teams (id) on delete cascade,
  member_id uuid not null references public.members (id) on delete cascade,
  permission text not null default 'member' check (permission in ('admin', 'member')),
  status text not null default 'active' check (status in ('active', 'invited')),
  created_at timestamptz not null default now(),
  primary key (team_id, member_id)
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  ministry_id uuid not null references public.ministries (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (ministry_id, name)
);

create table if not exists public.member_roles (
  member_id uuid not null references public.members (id) on delete cascade,
  role_id uuid not null references public.roles (id) on delete cascade,
  primary key (member_id, role_id)
);

create or replace function public.is_ministry_admin(target_ministry_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.ministry_users mu
    where mu.ministry_id = target_ministry_id
      and mu.user_id = auth.uid()
      and mu.role in ('owner', 'admin')
  );
$$;

create or replace function public.has_ministry_access(target_ministry_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.ministry_users mu
    where mu.ministry_id = target_ministry_id
      and mu.user_id = auth.uid()
  );
$$;

alter table public.ministries enable row level security;
alter table public.ministry_users enable row level security;
alter table public.teams enable row level security;
alter table public.members enable row level security;
alter table public.team_members enable row level security;
alter table public.roles enable row level security;
alter table public.member_roles enable row level security;

drop policy if exists "ministries_select_access" on public.ministries;
create policy "ministries_select_access"
on public.ministries
for select
using (public.has_ministry_access(id));

drop policy if exists "ministries_insert_owner" on public.ministries;
create policy "ministries_insert_owner"
on public.ministries
for insert
with check (auth.uid() = owner_user_id);

drop policy if exists "ministries_update_admin" on public.ministries;
create policy "ministries_update_admin"
on public.ministries
for update
using (public.is_ministry_admin(id))
with check (public.is_ministry_admin(id));

drop policy if exists "ministry_users_select_access" on public.ministry_users;
create policy "ministry_users_select_access"
on public.ministry_users
for select
using (public.has_ministry_access(ministry_id));

drop policy if exists "ministry_users_insert_admin" on public.ministry_users;
create policy "ministry_users_insert_admin"
on public.ministry_users
for insert
with check (public.is_ministry_admin(ministry_id));

drop policy if exists "ministry_users_update_admin" on public.ministry_users;
create policy "ministry_users_update_admin"
on public.ministry_users
for update
using (public.is_ministry_admin(ministry_id))
with check (public.is_ministry_admin(ministry_id));

drop policy if exists "teams_select_access" on public.teams;
create policy "teams_select_access"
on public.teams
for select
using (public.has_ministry_access(ministry_id));

drop policy if exists "teams_mutation_admin" on public.teams;
create policy "teams_mutation_admin"
on public.teams
for all
using (public.is_ministry_admin(ministry_id))
with check (public.is_ministry_admin(ministry_id));

drop policy if exists "members_select_access" on public.members;
create policy "members_select_access"
on public.members
for select
using (public.has_ministry_access(ministry_id));

drop policy if exists "members_mutation_admin" on public.members;
create policy "members_mutation_admin"
on public.members
for all
using (public.is_ministry_admin(ministry_id))
with check (public.is_ministry_admin(ministry_id));

drop policy if exists "roles_select_access" on public.roles;
create policy "roles_select_access"
on public.roles
for select
using (public.has_ministry_access(ministry_id));

drop policy if exists "roles_mutation_admin" on public.roles;
create policy "roles_mutation_admin"
on public.roles
for all
using (public.is_ministry_admin(ministry_id))
with check (public.is_ministry_admin(ministry_id));

drop policy if exists "team_members_select_access" on public.team_members;
create policy "team_members_select_access"
on public.team_members
for select
using (
  exists (
    select 1
    from public.teams t
    where t.id = team_id
      and public.has_ministry_access(t.ministry_id)
  )
);

drop policy if exists "team_members_mutation_admin" on public.team_members;
create policy "team_members_mutation_admin"
on public.team_members
for all
using (
  exists (
    select 1
    from public.teams t
    where t.id = team_id
      and public.is_ministry_admin(t.ministry_id)
  )
)
with check (
  exists (
    select 1
    from public.teams t
    where t.id = team_id
      and public.is_ministry_admin(t.ministry_id)
  )
);

drop policy if exists "member_roles_select_access" on public.member_roles;
create policy "member_roles_select_access"
on public.member_roles
for select
using (
  exists (
    select 1
    from public.members m
    where m.id = member_id
      and public.has_ministry_access(m.ministry_id)
  )
);

drop policy if exists "member_roles_mutation_admin" on public.member_roles;
create policy "member_roles_mutation_admin"
on public.member_roles
for all
using (
  exists (
    select 1
    from public.members m
    where m.id = member_id
      and public.is_ministry_admin(m.ministry_id)
  )
)
with check (
  exists (
    select 1
    from public.members m
    where m.id = member_id
      and public.is_ministry_admin(m.ministry_id)
  )
);
