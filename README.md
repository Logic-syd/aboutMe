# Yidan Shao — Portfolio

English portfolio built with Next.js App Router, TypeScript and Tailwind CSS. The homepage includes an interactive React Flow project/technology graph, six expandable case cards, a Leaflet career map and contact links. Each project has a statically generated detail route.

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

Project content is in `lib/projects.ts`; homepage biography is in `app/page.tsx`, and confirmed work areas are in `lib/experience.ts`. Contact links are in `components/site.tsx`. Update verified facts at their source before publication. Do not imply that the discovery map or export center has launched. Their current status is **In development · Not released**.

All six projects include written case studies. The Danzhu case also includes one user-provided screenshot of a Vue / uni-app running mini-program, with privacy redactions, and a verified link to the company website. Other commercial interfaces are not publicly shown. Original workflow illustrations are explicitly labeled and do not represent product screenshots. There are no proprietary code samples, fabricated employment dates, unverified outcome metrics, phone numbers, empty actions, or unverified demo/source links. The sports-education case distinguishes frontend camera and feedback integration from model training.

The empty starting repository contained no runnable game, so none is included. The site uses system fonts, CSS diagrams, an original local SVG career map and a local SVG favicon, with no third-party tracking or external asset dependencies.


## Graph and career map

`components/project-graph.tsx` connects the six real projects to technologies/approaches supported by the case content. Selecting either a project or a technology updates the highlighted connections and case-study panel. On phones, the graph focuses on the current selection to keep node text readable. The original case cards remain accessible through a native disclosure.

`components/career-map.tsx` uses Leaflet with `CRS.Simple` and `public/images/career-map.svg`. The original schematic intentionally enlarges Munich on the left, with Shanghai above Hangzhou on the right. No GPS precision, office address, chronological sequence or travel route is implied. All five approximate work areas were supplied by the user. No map tiles, geocoding service, API keys or third-party asset requests are needed. Company controls, map pins and keyboard navigation update the experience details.

React Flow and Leaflet describe the implementation of this portfolio; they are not added as unverified technologies in past employment.
