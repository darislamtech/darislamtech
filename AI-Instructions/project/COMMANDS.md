# Commands

Package manager: npm. Node 24.

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` (http://localhost:3000 → redirects to /ar) |
| Lint | `npm run lint` |
| Type check | `npx tsc --noEmit` |
| Build | `npm run build` |
| Run production build | `npm run start` |

## Verification
- No automated test suite exists yet. Verify with lint, type check and build, then check the affected pages in both `/ar` and `/en`, at desktop and mobile width.
- Unknown slugs under `/[lang]/content/` and `/[lang]/products/` render the 404 UI with `noindex` and a 200 status (streamed `notFound()`); that is expected.

## Deploy
Vercel (Hobby), project `darislamtech`, connected to the public repository `darislamtech/darislamtech`: every merge into `main` deploys production at https://darislamtech.com; every pull request gets a preview URL. `darislamtech.vercel.app` and `www` redirect to the domain. DNS is on Hostinger (A `@` and CNAME `www` point to Vercel). Roll back from Vercel → Deployments → Instant Rollback.
