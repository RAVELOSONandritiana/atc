# Run doc — Alasora Tech Center (React Router v8 + Tailwind v4)

## 1. Reproduire the artifacts

A fresh checkout needs Node.js (v20+) and npm, then:

```bash
# from the repo root (/home/hashterx/front_test)
npm install
```

No `.env` / `.env.local` file is needed: the app has no server-side secrets.
All site content (name, contacts, prices, formations) lives in
`app/data/site.ts` and `app/data/formations.ts`.
The only environment-sensitive value is the dev port (see below).

There is no codegen/build step required for `npm run dev` — React Router
typegen runs implicitly. Only `npm run typecheck` and `npm run build`
require the generated `.react-router` types (`react-router typegen` runs
as part of those scripts).

## 2. Run the server (dev)

```bash
# from the repo root — default port 5173 (Vite), must stay free
setsid nohup npm run dev > .freebuff/preview.log 2>&1 < /dev/null &
```

Notes:
- Start it detached (`setsid` on Linux) so it survives the shell session
  that launched it — a plain foreground/background `npm run dev` gets
  reaped when the command runner exits.
- Log to `.freebuff/preview.log` (or the thread-specific log file given
  by the app) and wait until `http://localhost:5173/` answers HTTP 200
  before using it.
- If 5173 is taken, pass an alternative: `npm run dev -- --port 5174`
  (or export `PORT=5174`); adapt any registered preview URL accordingly.
- Stop with: `kill <pid>` (find it via `ss -ltnp | grep :5173`).
