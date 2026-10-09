# Yidan Shao — Portfolio

Public portfolio: https://about-me-henna-alpha.vercel.app/

English portfolio built with Next.js App Router, TypeScript and Tailwind CSS. The homepage includes an interactive Three.js project knowledge graph, eight expandable case cards, a Leaflet career map and contact links. Each project has a statically generated detail route.

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

The production site is published at https://about-me-henna-alpha.vercel.app/ and was verified in signed-out browser contexts on 8 October 2026. The Vercel project is connected to this GitHub repository, with `main` as the production branch. Future pushes to `main` update the same production domain.

Import `Logic-syd/aboutMe` at https://vercel.com/new, keep the detected Next.js preset and repository root, then select Deploy. No environment variables or database are required. Alternatively run `npx vercel login` followed by `npx vercel --prod` from this directory. Keep deployment protection disabled for the production portfolio so recruiters can access it without signing in.

## Content

Project content is in `lib/projects.ts`; graph labels and contribution details are in `lib/graph.ts`; homepage biography is in `app/page.tsx`, confirmed work areas are in `lib/experience.ts`, and place descriptions and personal reflections are in `lib/place-stories.ts`. Contact links are in `components/site.tsx`. Update verified facts at their source before publication. Do not imply that the discovery map or export center has launched. Their current status is **In development · Not released**.

All eight projects include written case studies. Mountain Chess also includes two genuine product screenshots and verified Live Demo and Source Code links. The Danzhu case also includes one user-provided screenshot of a Vue / uni-app running mini-program, with privacy redactions, and a verified link to the company website. Other commercial interfaces are not publicly shown. Original workflow illustrations are explicitly labeled and do not represent product screenshots. There are no proprietary code samples, fabricated employment dates, unverified outcome metrics, phone numbers, empty actions, or unverified demo/source links. The sports-education case distinguishes frontend camera and feedback integration from model training.

Mountain Chess is an independently published game, documented as the eighth case with its own live and source links. The site uses system fonts, CSS diagrams, an original local SVG career map and a local SVG favicon, with no third-party tracking or external asset dependencies.


## Homepage navigation

The header links to About Me, My Projects, My Work, Growth Map and Let’s Talk. My Work summarizes confirmed responsibilities from `lib/experience.ts`; Growth Map explores the same experience by place. Contact copy welcomes frontend and full-stack engineering opportunities and new challenges. The professional title remains grounded in the supplied Senior Frontend Engineer experience.

## Graph and career map

`components/project-graph.tsx` connects the real projects to technologies/approaches supported by the case content. The first level shows every project in one constellation around a floating root sphere, without paging or filtering. Selecting one project keeps the root sphere near the center-right, moves the unselected projects to the right and emits technology spheres to the left from the selected project; selecting one technology reveals contribution nodes, with only one branch expanded at a time. Spheres use diagonal three-color vertex gradients with a palette shared by each project and its technologies. New child spheres launch from their parent’s current position with spring motion. Sphere, selector-label and picker activation share subtle click recoil, including keyboard input. Sphere dragging, view rotation, motion pause and reset are supported. On phones, the graph focuses on the current selection to keep node text readable. Every visible project card has a pink detail arrow in its lower-right corner, with an accessible case-study name and an Open case study tooltip; selecting its sphere or title continues to expand the graph. The selected project also has a prominent case-study button below the scene. The original case cards remain accessible through a native disclosure.

`components/career-map.tsx` uses Leaflet with `CRS.Simple` and `public/images/career-map.svg`. The original schematic intentionally enlarges Munich on the left, with Shanghai above Hangzhou on the right. No GPS precision, office address, chronological sequence or travel route is implied. All five approximate work areas were supplied by the user. Selecting a place or pin opens a locally rendered geographic area map from `public/maps/*.geojson`, styled with Leaflet in the portfolio palette. Real OpenStreetMap roads, water and green spaces replace the schematic in this view; a dashed circle marks the city/nearby landmark rather than an office address. No external map tiles, geocoding service, API keys or third-party runtime requests are needed. A compact fallback keeps the place story readable if its map cannot load.

The growth map focuses on places and personal memories, followed by a short reflection on each company. Public geographic descriptions link to official city or UNESCO sources; personal observations are supplied by Yidan. The work summary retains professional responsibilities separately. Both lists run most recent first: NeuVerge-Tron / Sungrow, Danzhu, GLP, Longshine, Fingard. Munich includes cinema, theatre, museums and a remembered weekend routine of English Garden surfers followed by coffee near Münchner Freiheit. Map extract attribution, licensing and generation details are documented in `public/maps/README.md`.

React Three Fiber / Drei and Leaflet describe the implementation of this portfolio; they are not added as unverified technologies in past employment.

The current edition retains the initial six projects and adds Ronghe Pay, a user-confirmed Fingard insurance-payments case, and Mountain Chess, a live personal game inspired by hiking breaks. Zhihuishu’s Three.js knowledge-graph work is mentioned in the biography using user-confirmed details, without inventing dates, a location or an additional case study. Future projects can be added incrementally. 3D loads near the viewport, pauses when offscreen, respects reduced motion and keeps project and technology controls keyboard-accessible. Unsupported WebGL 2, scene errors, context loss, or scene initialization exceeding 12 seconds automatically remove the entire 3D explorer and show all project case cards immediately, without a disclosure click.


## Ronghe Pay (融合付)

The seventh case is at `/projects/ronghe-pay`. It covers the user's zero-to-one frontend contribution during a 2018 Vue 2 upgrade of an existing PHP-based product. The platform connected insurers with authorized banks for premium collections, batch and single payments, claim payouts, reconciliation statements and additional unspecified value-added services. Real-time settlement applies only where supported. The case separates platform capabilities from the user's frontend contribution, and records the payment-domain lesson of accuracy and timeliness.

The confirmed framework is Vue 2. Other tags describe documented engineering/product concerns (frontend modernization, payment workflows and reconciliation); they do not claim unconfirmed libraries, bank-side implementation, security mechanisms or deployment metrics. This is a written case with a clearly labeled workflow illustration, without public screenshots, demo or source links. The Fingard work summary and growth map link to this case.

Project counts and fallback cards derive from the project data. All projects stay in the same 3D scene. Adaptive node spacing, camera framing and scene height preserve the complete overview as the catalog grows; there is no pagination or search filter. Cards use three columns on desktop, two on tablet and one on phones. The hero retains six selected entrances; the complete constellation, disclosure/cards and detail routes include every case. Initial positions, expanded siblings, palettes and numeric labels no longer depend on a six-entry array.

### Adding future cases

Add a `Project` object in `lib/projects.ts`, with a unique stable `slug`, its `number`, confirmed content, tags and delivery status. Optional `links` exposes verified public demo/source URLs; `screenshots` provides real images for the shared product gallery, with an optional `screenshotCredit`. Optional `graphTitle` gives its short graph label; `contributions` contains the contribution leaves for each corresponding tag. Without contribution leaves, the graph falls back to the documented role. Only mark a project `featured: true` when it should be one of the three featured cards. Only set `heroTitle` and `heroDetail` when it should occupy a selected hero entrance (maximum six). Append new cases without renumbering existing URLs.

The data feeds static detail routes, counts, project selectors, the complete graph, cards and next-case navigation; it does not require another graph-title/leaf array or per-project coordinates. Set `project` on the matching experience in `lib/experience.ts` when its work-summary and growth-map links should point to the new case. Keep public release status, frameworks and responsibilities source-grounded.

Scalability was checked with seventeen temporary test fixtures in an isolated copy outside this repository. No fixture cases are included in the actual portfolio.


## Mountain Chess (高山棋局)

The eighth case is at `/projects/mountain-chess`. Yidan's motivation—wanting to play chess during solo hiking breaks—leads into the product and engineering decisions. The public repository and deployed v1.4.3 application were inspected: native HTML/CSS/JavaScript, a local chess opponent with shallow search and alpha-beta pruning, Service Worker caching and readiness checks, LocalStorage saves, power-saving behavior and Chinese/English/German interfaces. No React, TypeScript, calibrated playing strength or measured battery savings are claimed for this project.

Live game: https://logic-syd.github.io/chessOffline/dist/ · Public source: https://github.com/Logic-syd/chessOffline. The shared public-links component appears in its selected graph detail, case card and case header. The application source is publicly viewable; the portfolio does not imply an open-source license for the entire application.

`public/images/mountain-chess-board.png` is an unmodified browser screenshot captured from the real English application. `public/images/mountain-chess-checkmate.png` is the user's original German victory screenshot. Captions identify each source and the gallery links to the project's chess-piece artwork credits. The existing Danzhu screenshot and all previous cases remain intact.
