# NeonBlade UI

Futuristic React UI components for modern web apps.

Website: https://neonbladeui.neuronrush.com/

NeonBlade UI is a curated component system inspired by neon, sci-fi, and cyberpunk interface design. The goal is simple: bring future-facing visual language to the web today through reusable, highly customizable components.

## Why NeonBlade UI

- Strong futuristic visual identity (neon, sci-fi, modern)
- Components are copied into your codebase, so you keep full control
- High customizability through props is a default expectation
- Tailwind CSS v4-first styling approach, with optional plain CSS where needed

## Highlights

- React + TypeScript component ecosystem
- CLI-based component installation
- Remote registry distribution model
- Tailwind CSS v4 as primary styling engine
- Curated quality bar for consistency and maintainability

## Install a Component

Use the CLI directly in your project:

```bash
npx neonblade add <component-name>
```

Example:

```bash
npx neonblade add ascii-rain
```

List all available components:

```bash
npx neonblade add
```

How it works:

1. CLI fetches component manifest from the registry.
2. Component files are written into your app.
3. Required dependencies are installed automatically.

Registry base URL:

`https://neonbladeui-registry.vercel.app`

## Tech Stack

- Monorepo: Turborepo
- Package manager: pnpm
- Website app: Next.js (App Router) + React + TypeScript
- Styling: Tailwind CSS v4 + component-scoped CSS (when justified)
- Code quality: ESLint + Prettier
- DX/shared tooling: shared TypeScript config + shared ESLint config packages
- UI/runtime libraries: Framer Motion, Lucide React, clsx, tailwind-merge
- Analytics: Vercel Analytics

## Monorepo Overview

```text
apps/
  neonblade-ui-web/      # Full website (landing, components, docs, templates)

packages/
  cli/                   # neonblade CLI (npx neonblade ...)
  registry/              # Component registry manifests and component sources
  eslint-config/         # Shared ESLint configs
  typescript-config/     # Shared TypeScript configs
```

## Local Development

Prerequisites:

- Node.js 18+
- pnpm 9+

Install dependencies:

```bash
pnpm install
```

Run everything in dev mode:

```bash
pnpm dev
```

Useful commands:

```bash
pnpm build
pnpm lint
pnpm check-types
pnpm format
```

## Styling and Animation Guidelines

- Prefer Tailwind CSS v4 utilities first.
- Use component-scoped CSS only when Tailwind alone is not enough.
- Avoid global CSS leakage.
- Advanced animation/effects libraries are allowed only when clearly justified and kept minimal.

## Contributing

NeonBlade UI is community-friendly and quality-curated.

Whether you want to forge a new sci-fi component, tweak a neon glow, or refine the docs, your help is welcome. Let's bring true futuristic and neon-driven interfaces to the modern web together!

Please read `CONTRIBUTING.md` before opening a pull request.

## Maintainer

Created and maintained by **[Vinay Kalwale](https://github.com/vprix21)** (**NeuronRush**).

## License

MIT License. See `LICENSE` for details.
