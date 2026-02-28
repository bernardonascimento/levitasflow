# LevitasFlow Monorepo

Monorepo com `pnpm` + `Turborepo`, contendo:

- `apps/web`: Next.js (App Router + Tailwind)
- `apps/mobile`: Expo React Native + NativeWind (Tailwind no mobile)
- `packages/shared`: utilitários, tipos e schemas Zod
- `packages/config`: configs compartilhadas de ESLint, Prettier e TS
- `packages/supabase`: tipos e helpers para cliente Supabase (web/mobile)

## Pré-requisitos

- Node.js LTS (recomendado >= 20.11)
- pnpm 9+

## Instalação

```bash
pnpm install
```

## Comandos principais

```bash
pnpm dev
pnpm dev:web
pnpm dev:mobile
pnpm lint
pnpm format
pnpm typecheck
pnpm test
```

## Como rodar

### Web (Next.js)

```bash
pnpm dev:web
```

App em `http://localhost:3000`.

Para rodar somente o app web:

```bash
pnpm --filter @repo/web dev
```

### Mobile (Expo)

```bash
pnpm dev:mobile
```

Abra no Expo Go (QR code) ou use `a`/`i` no terminal.

## Variáveis de ambiente

### Raiz do monorepo

```bash
cp .env.example .env
```

Preencha:

- Web:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Mobile:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Web (`apps/web`)

Crie um `.env.local` em `apps/web` a partir do exemplo:

```bash
cp apps/web/.env.local.example apps/web/.env.local
```

Variáveis necessárias:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (local: `http://localhost:3000`)

Nunca commitar `apps/web/.env.local`.

## Supabase Auth (Web)

O web app usa:

- Cliente browser: `apps/web/src/lib/supabase/browser.ts`
- Cliente server (cookies): `apps/web/src/lib/supabase/server.ts`
- Middleware de sessão/redirect: `apps/web/src/lib/supabase/middleware.ts`
- Telas: `/login` e `/signup`
- Callback OAuth: `/auth/callback`

Fluxos implementados:

- Email/senha:
  - `supabase.auth.signInWithPassword`
  - `supabase.auth.signUp`
- Google OAuth:
  - `supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: \`${NEXT_PUBLIC_SITE_URL}/auth/callback\` } })`

### Redirect URLs no Supabase (Authentication → URL Configuration)

Adicione:

- Local: `http://localhost:3000/auth/callback`
- Produção: `https://www.levitasflow.com.br/auth/callback`

## Configurar Google OAuth (Supabase)

1. No Google Cloud Console, crie um projeto (ou use existente).
2. Vá em **APIs & Services → Credentials** e crie um **OAuth Client ID** (Web Application).
3. Em **Authorized redirect URIs**, adicione:
   - `https://<PROJECT>.supabase.co/auth/v1/callback`
4. Copie `Client ID` e `Client Secret`.
5. No Supabase, abra **Authentication → Providers → Google**.
6. Ative o provider e cole `Client ID` e `Client Secret`.
7. Salve as configurações.

Nunca coloque `Client Secret` no repositório.

## Validar auth localmente

```bash
pnpm --filter @repo/web dev
```

Checklist:

- Abrir `/login`
- Login por email/senha
- Login com Google (ida e volta em `/auth/callback`)
- Usuário autenticado acessa `/app`

## Gerar types do Supabase

Exemplo com Supabase CLI:

```bash
pnpm dlx supabase gen types typescript --project-id <PROJECT_ID> --schema public > packages/supabase/src/types/database.ts
```

## Supabase local (opcional)

Como o repositório possui `supabase/migrations`, você pode usar Supabase local.

1. Instalar Supabase CLI:

```bash
pnpm dlx supabase --version
```

2. Login na CLI:

```bash
pnpm dlx supabase login
```

3. Inicializar (se necessário):

```bash
pnpm dlx supabase init
```

4. Subir stack local:

```bash
pnpm dlx supabase start
```

5. Aplicar migrations:

```bash
pnpm dlx supabase db reset
```

## Arquitetura (Clean Architecture leve)

- `domain`: entidades e regras puras
- `application`: use-cases/services
- `infra`: integrações externas
- `presentation`: UI

Regra central: lógica de negócio nunca deve ficar em componentes de UI.
