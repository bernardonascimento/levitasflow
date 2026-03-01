-- Reset: limpa todas as tabelas do schema public (dados do app).
-- Não altera auth.users: seu usuário continua existindo para login.

truncate table
  public.member_roles,
  public.team_members,
  public.roles,
  public.members,
  public.teams,
  public.ministry_users,
  public.ministries
restart identity
cascade;
