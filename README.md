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

### Mobile (Expo)

```bash
pnpm dev:mobile
```

Abra no Expo Go (QR code) ou use `a`/`i` no terminal.

## Variáveis de ambiente

1. Copie:

```bash
cp .env.example .env
```

2. Preencha:

- Web:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Mobile:
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Gerar types do Supabase

Exemplo com Supabase CLI:

```bash
pnpm dlx supabase gen types typescript --project-id <PROJECT_ID> --schema public > packages/supabase/src/types/database.ts
```

## Arquitetura (Clean Architecture leve)

- `domain`: entidades e regras puras
- `application`: use-cases/services
- `infra`: integrações externas
- `presentation`: UI

Regra central: lógica de negócio nunca deve ficar em componentes de UI.
