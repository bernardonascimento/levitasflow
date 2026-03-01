-- Reset: limpa todas as tabelas do schema public (dados do app).
-- Não altera auth.users: seu usuário continua existindo para login.
-- Use após 20260301160000 para zerar os dados novamente.

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
