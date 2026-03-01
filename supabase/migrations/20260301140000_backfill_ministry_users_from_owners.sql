-- Preenche ministry_users para ministérios que já existem em public.ministries
-- mas não têm o dono (owner_user_id) em ministry_users.
-- Resolve o caso em que há dados em ministries mas a lista de ministérios do usuário vem vazia.
insert into public.ministry_users (ministry_id, user_id, role)
select m.id, m.owner_user_id, 'owner'
from public.ministries m
where not exists (
  select 1
  from public.ministry_users mu
  where mu.ministry_id = m.id
    and mu.user_id = m.owner_user_id
)
on conflict (ministry_id, user_id) do nothing;
