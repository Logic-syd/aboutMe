# Yidan Shao — Portfolio

Public portfolio: https://about-me-henna-alpha.vercel.app/

English portfolio built with Next.js App Router, TypeScript and Tailwind CSS. The homepage includes an interactive Three.js project knowledge graph, ten expandable case cards, a Leaflet career map and contact links. Each project has a statically generated detail route.

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

All ten projects include written case studies. Mountain Chess also includes two genuine product screenshots and verified Live Demo and Source Code links. Pfand Pause includes two screenshots of its local production build and a public source link; it is not publicly deployed. The Danzhu case also includes one user-provided screenshot of a Vue / uni-app running mini-program, with privacy redactions, and a verified link to the company website. Other commercial interfaces are not publicly shown. Original workflow illustrations are explicitly labeled and do not represent product screenshots. There are no proprietary code samples, fabricated employment dates, unverified outcome metrics, phone numbers, empty actions, or unverified demo/source links. The sports-education case distinguishes frontend camera and feedback integration from model training.

Mountain Chess is an independently published game, documented as the eighth case with its own live and source links. The site uses system fonts, CSS diagrams, an original local SVG career map and a local SVG favicon, with no third-party tracking or external asset dependencies.


## Homepage navigation

The header links to About Me, My Projects, My Work, Growth Map and Let’s Talk. My Work summarizes confirmed responsibilities from `lib/experience.ts`; Growth Map explores the same experience by place. Contact copy welcomes frontend and full-stack engineering opportunities and new challenges. The professional title remains grounded in the supplied Senior Frontend Engineer experience.

## Graph and career map

`components/project-graph.tsx` connects the real projects to technologies/approaches supported by the case content. Every project is visible in one elliptical orbit around My work, without paging or filtering. Orbit spacing accounts for label width and height, and the stage grows with the catalog. Selecting a project places it on the left edge of a smaller orbit around the center-right root; its technologies and contribution nodes extend left, with one branch open at a time. Phones keep every overview label and use a compact satellite orbit for unselected projects when a branch expands, with all names still available in the HTML picker.

Gradient spheres are fully visible above light labels. Each label combines a small project number, name and an independent arrow link to the case study. Clicking the name or sphere expands the graph. Hover/focus and selection emphasize the label without a separate button strip. The selected project's complete description, release state and case-study button remain below the scene.

Spheres drift gently on three axes. Bounded coupled springs let a drag tug connected nodes, then bring the sphere back with a soft overshoot when released. Drag direction follows the camera after rotation. Clicks create a small recoil shared with keyboard/project-picker activation; newly expanded branches launch from their parent. Motion pause and reduced-motion preferences are supported, and rendering settles when the scene is offscreen. The original case cards remain accessible through a native disclosure or appear immediately when WebGL is unavailable.

`components/career-map.tsx` uses Leaflet with `CRS.Simple` and `public/images/career-map.svg`. The original schematic intentionally enlarges Munich on the left, with Shanghai above Hangzhou on the right. No GPS precision, office address, chronological sequence or travel route is implied. All five approximate work areas were supplied by the user. Selecting a place or pin opens a locally rendered geographic area map from `public/maps/*.geojson`, styled with Leaflet in the portfolio palette. Real OpenStreetMap roads, water and green spaces replace the schematic in this view; a dashed circle marks the city/nearby landmark rather than an office address. No external map tiles, geocoding service, API keys or third-party runtime requests are needed. A compact fallback keeps the place story readable if its map cannot load.

The growth map focuses on places and personal memories, followed by a short reflection on each company. Public geographic descriptions link to official city or UNESCO sources; personal observations are supplied by Yidan. The work summary retains professional responsibilities separately. Both lists run most recent first: NeuVerge-Tron / Sungrow, Danzhu, GLP, Longshine, Fingard. Munich includes cinema, theatre, museums and a remembered weekend routine of English Garden surfers followed by coffee near Münchner Freiheit. Map extract attribution, licensing and generation details are documented in `public/maps/README.md`.

React Three Fiber / Drei and Leaflet describe the implementation of this portfolio; they are not added as unverified technologies in past employment.

The current edition retains the initial six projects and adds Ronghe Pay, a user-confirmed Fingard insurance-payments case; Mountain Chess, a published game inspired by hiking breaks; and Pfand Pause, a bottle-sorting puzzle inspired by moving to Germany. Future projects can be added incrementally. 3D loads near the viewport, pauses when offscreen, respects reduced motion and keeps project and technology controls keyboard-accessible. Unsupported WebGL 2, scene errors, context loss, or scene initialization exceeding 12 seconds show all project case cards immediately, without a disclosure click, with a Retry 3D view button to attempt loading the scene again.


## Ronghe Pay (融合付)

The seventh case is at `/projects/ronghe-pay`. It covers the user's zero-to-one frontend contribution during a 2018 Vue 2 upgrade of an existing PHP-based product. The platform connected insurers with authorized banks for premium collections, batch and single payments, claim payouts, reconciliation statements and additional unspecified value-added services. Real-time settlement applies only where supported. The case separates platform capabilities from the user's frontend contribution, and records the payment-domain lesson of accuracy and timeliness.

The confirmed framework is Vue 2. Other tags describe documented engineering/product concerns (frontend modernization, payment workflows and reconciliation); they do not claim unconfirmed libraries, bank-side implementation, security mechanisms or deployment metrics. This is a written case with a clearly labeled workflow illustration, without public screenshots, demo or source links. The Fingard work summary and growth map link to this case.

Project counts and fallback cards derive from the project data. All projects stay in the same 3D scene. Label-aware orbital spacing, camera framing and scene height preserve the complete overview as the catalog grows; there is no pagination or search filter. Cards use three columns on desktop, two on tablet and one on phones. The hero retains six selected entrances; the complete constellation, disclosure/cards and detail routes include every case. Initial positions, expanded siblings, palettes and numeric labels no longer depend on a six-entry array.

### Adding future cases

Add a `Project` object in `lib/projects.ts`, with a unique stable `slug`, its `number`, confirmed content, tags and delivery status. Optional `links` exposes verified public demo/source URLs; `screenshots` provides real images for the shared product gallery, with an optional `screenshotCredit`. Optional `graphTitle` gives its short graph label; `contributions` contains the contribution leaves for each corresponding tag. Without contribution leaves, the graph falls back to the documented role. Only mark a project `featured: true` when it should be one of the three featured cards. Only set `heroTitle` and `heroDetail` when it should occupy a selected hero entrance (maximum six). Append new cases without renumbering existing URLs.

The data feeds static detail routes, counts, project selectors, the complete graph, cards and next-case navigation; it does not require another graph-title/leaf array or per-project coordinates. Set `project` on the matching experience in `lib/experience.ts` when its work-summary and growth-map links should point to the new case. Keep public release status, frameworks and responsibilities source-grounded.

Scalability was checked with seventeen temporary test fixtures in an isolated copy outside this repository. No fixture cases are included in the actual portfolio.


## Mountain Chess (高山棋局)

The eighth case is at `/projects/mountain-chess`. Yidan's motivation—wanting to play chess during solo hiking breaks—leads into the product and engineering decisions. The public repository and deployed v1.4.3 application were inspected: native HTML/CSS/JavaScript, a local chess opponent with shallow search and alpha-beta pruning, Service Worker caching and readiness checks, LocalStorage saves, power-saving behavior and Chinese/English/German interfaces. No React, TypeScript, calibrated playing strength or measured battery savings are claimed for this project.

Live game: https://logic-syd.github.io/chessOffline/dist/ · Public source: https://github.com/Logic-syd/chessOffline. The shared public-links component appears in its selected graph detail, case card and case header. The application source is publicly viewable; the portfolio does not imply an open-source license for the entire application.

`public/images/mountain-chess-board.png` is an unmodified browser screenshot captured from the real English application. `public/images/mountain-chess-checkmate.png` is the user's original German victory screenshot. Captions identify each source and the gallery links to the project's chess-piece artwork credits. The existing Danzhu screenshot and all previous cases remain intact.

The displayed status is **Published · Play online**, following the user's explicit release confirmation. Offline setup requirements remain in the description and delivery notes.

## Pfand Pause

The ninth case is at `/projects/pfand-pause`. The user wanted to recognize unfamiliar drinks bottles after moving to Germany. The case connects that motivation to a fictional bottle-sorting puzzle with six bottle designs and ten levels. It does not present the game as a guide to real deposit eligibility or refund values.

Source: https://github.com/Logic-syd/PfandPause. Repository commit `df4e945` confirms React, TypeScript, Vite, pure state transitions, complete undo, a solver using the same rules, SVG/CSS visuals, English/German interfaces, LocalStorage preferences and completion progress, and Web Audio. In-progress rounds are not restored after refresh, and no PWA/offline installation is claimed. The repository documents a playable production build without public deployment; its GitHub metadata also has no Pages deployment or homepage URL. Only Source Code is offered.

`public/images/pfand-pause-start.png` and `public/images/pfand-pause-game.png` are unmodified browser screenshots of that repository's local production build. The gameplay image shows level three after actually completing levels one and two. Both reuse the shared gallery without adding layout exceptions.


## Longshine smart-city dashboards

The tenth case is at `/projects/smart-city-dashboards`. It covers large-screen dashboard work at Longshine, with map API integration and route tracking across Wuxi, Hainan and Taiyuan. These regional versions shared a foundation and included location-specific customizations. Frameworks, map providers and delivery metrics are not specified. The work summary and growth map link to both this case and the existing internal low-code platform case.
