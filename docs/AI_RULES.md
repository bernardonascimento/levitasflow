# Regras Permanentes para Geração de Código

Estas regras são obrigatórias para qualquer código novo ou alteração no projeto.

## Naming

- Sempre usar `camelCase` para variáveis e funções.
- Componentes React devem usar `PascalCase`.
- Não usar `snake_case`.
- Não usar `kebab-case` em nomes de arquivos TypeScript.

## Organização de Componentes (Obrigatório)

Todo componente React deve seguir:

```text
components/NomeDoComponente/
  index.tsx
  styles.ts (quando necessário)
  types.ts (quando necessário)
```

Nunca criar componentes como `Button.tsx`, `Card.tsx` ou `UserItem.tsx`.
Sempre criar como `Button/index.tsx`, `Card/index.tsx`, `UserItem/index.tsx`.

## Imports

- Proibido import relativo longo com `../../../`.
- Sempre usar aliases:
  - `@shared/*`
  - `@supabase/*`
  - `@web/*`
  - `@mobile/*`

## Clean Code

- Funções com responsabilidade única.
- Funções pequenas e legíveis.
- Evitar arquivos com mais de 300 linhas.
- Evitar `useEffect` gigante.
- Separar hooks personalizados em `/hooks`.
- Nunca acessar banco diretamente dentro de componentes.
- Criar `services`/`useCases` para acesso a dados e regras.

## React

- Preferir function components.
- Sempre usar funções em arrow function.
- Sempre tipar props.
- Nunca usar `any`.
- Sempre criar `interface` ou `type` para props.

## Validação

- Toda entrada de dados deve usar Zod.
- Zod schemas devem ficar em `packages/shared/schemas`.

## Supabase

- Acesso ao banco apenas via camada `infra/services`.
- Não acessar Supabase direto dentro de `pages` ou `screens`.

## Arquitetura (Clean Architecture Leve)

- `domain`: entidades e regras puras (sem dependência externa).
- `application`: use-cases e services de aplicação.
- `infra`: integrações externas (supabase, storage, api).
- `presentation`: UI (Next.js e React Native).

Regra principal: nunca colocar lógica de negócio dentro de componentes de UI.
