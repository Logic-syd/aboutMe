# Yidan Shao — Portfolio

English portfolio built with Next.js App Router, TypeScript and Tailwind CSS. The homepage includes six project summaries, an experience overview and contact links. Each project has a statically generated detail route.

## Local development

Requires Node.js 20.9 or newer (Node 22 LTS recommended).

```sh
npm ci
npm run dev
```

## Checks and production build

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Deploy to Vercel

Import `Logic-syd/aboutMe` at https://vercel.com/new, keep the detected Next.js preset and repository root, then select Deploy. No environment variables or database are required. Alternatively run `npx vercel login` followed by `npx vercel --prod` from this directory. Keep deployment protection disabled for the production portfolio so recruiters can access it without signing in.

## Content

Project content is in `lib/projects.ts`; homepage biography and experience are in `app/page.tsx`. Contact links are in `components/site.tsx`. Update verified facts at their source before publication. Do not imply that the discovery map or export center has launched. Their current status is **In development · Not released**.

All six projects are written case studies. Original workflow illustrations are explicitly labeled and do not represent product screenshots. There are no internal screenshots, proprietary code, fabricated employment dates, unverified outcome metrics, phone numbers, empty actions, or unverified demo/source links. The sports-education case distinguishes frontend camera and feedback integration from model training.

The empty starting repository contained no runnable game, so none is included. The site uses system fonts, CSS diagrams and a local SVG favicon, with no third-party tracking or external asset dependencies.
