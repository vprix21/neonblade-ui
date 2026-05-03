# Contributing to NeonBlade UI

Thanks for your interest in contributing.

Whether you're forging a new component, refining a neon effect, or fixing a bug, your work helps push the boundaries of UI design. Let’s bring true futuristic, neon-driven interfaces to the modern web together.

NeonBlade UI is a curated futuristic component library. We welcome contributions that are visually strong, reusable, and production-minded.

## Contribution Philosophy

This project values quality over quantity.

Every accepted contribution should:

- Match the futuristic / neon / sci-fi design direction
- Preserve consistency with existing component language
- Be highly customizable through props
- Keep code clean, readable, and maintainable

## Scope of Contributions

At this stage, NeonBlade UI accepts contributions primarily for:

- New components
- Improvements to existing components
- Bug fixes in components

Website structure, layout, and design are currently maintained by the core maintainer to preserve consistency and direction.

Small fixes (typos, broken links, minor issues) may be accepted, but larger website changes should not be submitted as pull requests.

## Before You Start

1. Check if a similar component or feature already exists.
2. Open an issue for larger changes to align early.
3. Keep PRs focused (one component or one clear improvement).

## Branch Naming

Use clear branch names so contribution intent is obvious:

- `feat/<name>` for new components or features
- `fix/<name>` for bug fixes
- `docs/<name>` for documentation-only updates

Examples:

- `feat/neon-tabs-component`
- `fix/ascii-rain-import-path`
- `docs/contributing-pr-checklist`

## Local Setup

```bash
pnpm install
pnpm dev
```

Validation before pushing:

```bash
pnpm lint
pnpm check-types
pnpm build
```

## Tech Stack (Current)

- Monorepo orchestration: Turborepo
- Workspace/package manager: pnpm
- Website framework: Next.js (App Router) with React + TypeScript
- Styling: Tailwind CSS v4 first, plain CSS only when needed
- Linting/formatting: ESLint + Prettier
- Shared config packages: `@repo/eslint-config`, `@repo/typescript-config`
- Common UI/runtime libs in the web app: Framer Motion, Lucide React, clsx, tailwind-merge

## Monorepo Areas

- `apps/neonblade-ui-web`: the full website app (landing page, components listing/previews, usage/source/props/deps/CLI docs, docs page, templates page)
- `packages/registry`: component registry source + manifests
- `packages/cli`: component installation CLI

## Adding a New Component

For a complete component contribution, follow this workflow:

1. Create the component in `src/lib/components/ui/<category>/<ComponentName>`.
2. If no suitable category exists, create a new category folder first.
3. Test the component by using it somewhere in the website while developing.
4. Add docs files in `src/lib/docs/components/<component-name>/`: `demo.tsx`, `props.ts`, and `usage.ts`.
5. Update the docs maps: `demomap`, `foldermap`, `propsmap`, and `usagemap`.
6. Update `src/lib/docs/data.ts` with the category-wise component metadata entry.
7. Copy source files to `packages/registry/components/<component-name>/` and add `index.json`.
8. Update `packages/registry/registry.json`.

Typical registry structure:

```text
packages/registry/components/<component-name>/
  index.tsx
  index.json
  <optional>.css
```

## Naming Conventions

- Component names: PascalCase (for exported React components)
- Registry folder names: kebab-case (example: `ascii-rain`)
- CSS files: kebab-case and colocated with the component

## Styling Rules

- Tailwind CSS v4 is the primary styling path.
- Use plain CSS only when needed for effect complexity or maintainability.
- Keep styles scoped to the component.
- Do not introduce global CSS side effects.

## Dependencies and Performance

- Prefer zero or minimal extra dependencies.
- Add animation/rendering libraries only when necessary.
- Justify heavy dependencies in the PR description.
- Optimize for smooth runtime performance and bundle impact awareness.

## Pull Requests

We welcome PRs from everyone as long as they follow project standards.

Submission flow:

1. Fork the repository.
2. Create a branch using the naming convention above.
3. Make your changes and validate locally.
4. Open a PR targeting the `main` branch.

PR description expectations:

- Use a clear, descriptive title.
- Explain what changed and why.
- For visual changes, include screenshots or a short video when possible.

## PR Checklist

- Component is reusable and customizable via props.
- Component follows the complete integration workflow in this document.
- Naming and folde
  r conventions are followed.
- Types are clear and safe.
- Docs integration is complete (`demo.tsx`, `props.ts`, `usage.ts`, map updates, and `src/lib/docs/data.ts`).
- Component preview is added/updated on the components page through the docs integration flow.
- Responsiveness is tested on small, medium, and large screen sizes.
- Browser console is checked on relevant pages and has no new errors.
- Lint, type-check, and build pass.

## AI Tooling Policy

AI-assisted development is fully allowed. Contributors may use AI code generators, agents, Copilot, and similar tools for implementation, refactoring, and docs updates.

You are responsible for reviewing and validating generated code before opening a PR.

## Website Contributions

The website is a core part of NeonBlade’s identity and is intentionally curated.

Pull requests that significantly alter:

- Landing page design
- Layout structure
- Navigation
- Visual direction

will not be accepted at this stage.

If you have ideas, feel free to open an issue for discussion.

## Review Timeline

Maintainer review is typically targeted within 2 days, but this may take longer depending on workload and PR volume.

Thanks for your patience when review queues are high.

## What We Usually Reject

- Generic components without NeonBlade identity
- Visually inconsistent design language
- Unnecessary dependencies
- Breaking structural conventions
- Low-quality or unmaintained code submissions

## Review and Acceptance

All pull requests are reviewed by maintainers.

Acceptance is based on:

- Visual quality and brand fit
- API quality and customization depth
- Code quality and maintainability
- Performance and implementation clarity

Submitting a PR does not guarantee merge. Curation is intentional.

## License and Attribution

By contributing, you agree that your contributions are licensed under the MIT License used by this repository.

Contributors are credited through Git history and PR records.
