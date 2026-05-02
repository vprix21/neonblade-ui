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
- Website: Next.js + TypeScript + Tailwind CSS v4
- Components: TypeScript + Tailwind CSS v4 + plain CSS (when justified)

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

Please read `CONTRIBUTING.md` before opening a pull request.

## License

MIT License. See `LICENSE` for details.
