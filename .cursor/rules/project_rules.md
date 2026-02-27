---
description: Regras globais de arquitetura e estilo do monorepo LevitasFlow
alwaysApply: true
---

# Project Rules (Obrigatórias)

## Naming

- Sempre usar `camelCase` para variáveis e funções.
- Componentes React devem usar `PascalCase`.
- Não usar `snake_case`.
- Não usar `kebab-case` em nomes de arquivos TypeScript.

## Organização de Componentes (Obrigatório)

Estrutura obrigatória para todo componente React:

```text
components/NomeDoComponente/
  index.tsx
  styles.ts (quando necessário)
  types.ts (quando necessário)
```

Nunca criar: `Button.tsx`, `Card.tsx`, `UserItem.tsx`.
Sempre criar: `Button/index.tsx`, `Card/index.tsx`, `UserItem/index.tsx`.

## Imports

- Proibido `../../../`.
- Usar aliases:
  - `@shared/*`
  - `@supabase/*`
  - `@web/*`
  - `@mobile/*`

## Clean Code

- Função com responsabilidade única.
- Funções pequenas.
- Evitar arquivo acima de 300 linhas.
- Evitar `useEffect` grande.
- Hooks reutilizáveis em `/hooks`.
- Nunca acessar banco dentro da UI.
- Sempre criar `services` e `useCases` para dados.

## React

- Preferir function components.
- Sempre usar arrow functions.
- Tipar todas as props.
- Nunca usar `any`.
- Criar `type` ou `interface` para props.

## Validação

- Toda entrada deve ser validada com Zod.
- Schemas em `packages/shared/schemas`.

## Supabase

- Somente camada `infra/services` acessa banco.
- Proibido acesso direto em pages/screens.

## Arquitetura

- `domain`: entidades e regras puras.
- `application`: use-cases.
- `infra`: integrações externas.
- `presentation`: UI.

Regra crítica: nenhuma lógica de negócio em componentes visuais.
