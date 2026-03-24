# PackMetric GitHub Dropoff File

Use this file as your upload checklist for `JDestefans/PackMetric`.

## 1) Upload these files/folders to GitHub repo root

- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `next-env.d.ts`
- `.env.example`
- `.eslintrc.json`
- `.gitignore`
- `README.md`
- `supabase/schema.sql`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/trainer/page.tsx`
- `src/app/client/page.tsx`
- `src/app/api/assessment/route.ts`
- `src/app/api/assessment/review/route.ts`
- `src/app/api/assessment/list/route.ts`
- `src/components/logo.tsx`
- `src/components/assessment-form.tsx`
- `src/components/review-queue.tsx`
- `src/lib/types.ts`
- `src/lib/env.ts`
- `src/lib/supabase.ts`
- `src/lib/ai.ts`
- `src/lib/store.ts`

## 2) If uploading from GitHub web UI

1. Open [https://github.com/JDestefans/PackMetric](https://github.com/JDestefans/PackMetric)
2. Click `Add file` -> `Upload files`
3. Drag/drop all files and folders above
4. Commit message:
   - `Initial PackMetric starter build (Phase 1+2 foundation)`
5. Commit directly to `main`

## 3) Open in Codespaces

1. Repo page -> `Code` -> `Codespaces` -> `Create codespace on main`
2. In terminal:
   - `npm install`
   - `cp .env.example .env.local`
   - `npm run dev`

## 4) Required environment variables

Set in `.env.local` or Codespaces Secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`

## 5) Security (important)

Rotate secrets that were previously pasted in chat before production use:

- Anthropic API key
- Supabase service role key

## 6) Smoke test routes

- `/`
- `/trainer`
- `/client`

Expected:

- Assessment mode switch works (`on_site` / `virtual_owner_recorded`)
- AI draft endpoint returns a draft
- Review queue can approve a draft

