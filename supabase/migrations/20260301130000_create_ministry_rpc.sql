-- Cria ministério e vínculo ministry_users em uma única operação.
-- Usa SECURITY DEFINER para que os INSERTs não dependam do JWT no contexto RLS
-- (evita erro 42501 quando auth.uid() vem null no PostgREST).
create or replace function public.create_ministry_for_current_user(p_name text, p_slug text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid;
  v_ministry_id uuid;
begin
  v_uid := auth.uid();
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.ministries (name, slug, owner_user_id)
  values (p_name, p_slug, v_uid)
  returning id into v_ministry_id;

  insert into public.ministry_users (ministry_id, user_id, role)
  values (v_ministry_id, v_uid, 'owner');

  return v_ministry_id;
end;
$$;

grant execute on function public.create_ministry_for_current_user(text, text) to authenticated;
grant execute on function public.create_ministry_for_current_user(text, text) to service_role;
