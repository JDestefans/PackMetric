# PackMetric

PackMetric is a style-aware dog training SaaS for trainers and clients.

## Included in this starter build

- Next.js + TypeScript app foundation
- Trainer dashboard and client portal shell
- Assessment workflow with two modes:
  - on-site trainer assessment
  - virtual owner-recorded assessment
- AI draft generation pipeline (Anthropic-first) with policy constraints
- Mandatory trainer review/approval API flow
- Shirt-ready logo concept embedded in UI
- Supabase starter schema for single-tenant v1

## Environment

Create `.env.local` from `.env.example` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`

## Run

1. Install Node.js LTS
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Open `http://localhost:3000`

## Important security note

If any API keys were pasted into chat or committed accidentally, rotate them immediately.
