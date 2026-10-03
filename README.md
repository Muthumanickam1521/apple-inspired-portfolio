# Muthumanickam Portfolio

A Next.js portfolio with an original, Apple-inspired visual language. All editable portfolio content is in [`content/portfolio.yml`](./content/portfolio.yml).

## Edit content

Open `content/portfolio.yml`. It uses standard YAML—similar to Docker Compose—so projects, skills, work history, education, interests, links, and copy can be changed without touching the interface code.

### Case studies

Each project tile opens a case study at `/work/<slug>`. Write it in `content/work/<slug>.md`, where `<slug>` matches the project's `slug` in `portfolio.yml`. The front matter holds the role, timeline, team and an optional cover image; the body has four sections: The problem, My role, Key decisions and Outcome.

### Résumé

The Résumé link in the header and footer opens `public/resume.pdf`. Replace the placeholder file with yours (or change `profile.resume`).

### Link previews

The favicon is `app/icon.svg`. The image shown when a link is shared is drawn by `app/opengraph-image.tsx` (and `app/work/[slug]/opengraph-image.tsx` for case studies), so it updates with the content.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Vitest unit tests (content, case studies, theme)
```

GitHub Actions runs these, plus a production build, on every push and pull request to `master` (`.github/workflows/ci.yml`). Pull requests also get an AI security review from [Claude Code Security Review](https://github.com/anthropics/claude-code-security-review) (`.github/workflows/security-review.yml`), which needs an `ANTHROPIC_API_KEY` repository secret. Vercel deploys `master` as before.

## Upkeep

- **Dependabot** (`.github/dependabot.yml`) opens weekly update PRs for npm packages and GitHub Actions. Minor and patch bumps come grouped in one PR.
- **Uptime check** (`.github/workflows/uptime.yml`) loads https://www.muthumanickam.tech every 30 minutes. If it fails, it opens a `site-down` issue, and closes it once the site is back.
- **Error monitoring** uses [Sentry](https://sentry.io). It is off until you add a `NEXT_PUBLIC_SENTRY_DSN` environment variable in Vercel (copy the DSN from a new Sentry Next.js project) and redeploy.
