-- Permite que o dono do ministério (owner_user_id) se adicione em ministry_users
-- como owner ao criar o ministério. Sem isso, a inserção em ministry_users falha
-- porque is_ministry_admin(ministry_id) ainda é false (usuário não está na tabela).
drop policy if exists "ministry_users_insert_owner_self" on public.ministry_users;
create policy "ministry_users_insert_owner_self"
on public.ministry_users
for insert
with check (
  auth.uid() = user_id
  and role = 'owner'
  and exists (
    select 1
    from public.ministries m
    where m.id = ministry_id
      and m.owner_user_id = auth.uid()
  )
);
