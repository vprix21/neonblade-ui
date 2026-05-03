# neonblade-ui-web

Website application for NeonBlade UI.

## Tech Stack

- Framework: Next.js (App Router)
- Runtime/UI: React + TypeScript
- Styling: Tailwind CSS v4 + component-scoped CSS when needed
- Motion/icons/helpers: Framer Motion, Lucide React, react-icons, clsx, tailwind-merge
- Tooling: ESLint, PostCSS, TypeScript
- Analytics: Vercel Analytics

## Development

From the monorepo root:

```bash
pnpm dev
```

Or run only this app:

```bash
pnpm --filter neonblade-ui-web dev
```

Build this app:

```bash
pnpm --filter neonblade-ui-web build
```
