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
Target: Vercel (Hobby) for the public repository `darislamtech/darislamtech`, domain `darislamtech.com`. Not connected yet.
