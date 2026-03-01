-- Corrige recursão infinita na RLS de ministry_users.
-- A política antiga usava has_ministry_access(ministry_id), que faz SELECT em
-- ministry_users, disparando a mesma política de novo → stack depth exceeded (54001).
-- O usuário só precisa ver as próprias linhas em ministry_users, então a política
-- correta é: user_id = auth.uid() (sem chamar has_ministry_access).

drop policy if exists "ministry_users_select_access" on public.ministry_users;
create policy "ministry_users_select_access"
on public.ministry_users
for select
using (user_id = auth.uid());
