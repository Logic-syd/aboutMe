# Yidan Shao — Portfolio

Public portfolio: https://yidan-builds.vercel.app/

English portfolio built with Next.js App Router, TypeScript and Tailwind CSS. The homepage includes an interactive Three.js project explorer, sixteen project case studies, a Leaflet growth map and contact links. Each project has a statically generated detail route.

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

## Project layout contract

Every project detail page uses complete desktop chapters: the introduction fits beside the site header, and each following module fits within one viewport. This sets a maximum size rather than a compulsory height; short chapters follow their content with continuous, compact spacing. Long technical notes use topic tabs; product images are shown in full with captions and original-image links. Interactive consoles retain a complete frame with bounded tool panes. Mobile pages stack and scroll naturally.

This is an ongoing owner requirement for new and edited projects. Read [AGENTS.md](./AGENTS.md) before changing project content or layout. Shared components are `CaseIntro`, `CaseChapter` and `CaseNotes`; layout rules are in `app/project-case.css`.

The browser layout checks automatically include every entry in `lib/projects.ts`, at 1440×900, 1280×720, 1024×600 and 390×844. They also exercise topic/image selections and expanded interactive results.

```sh
npx playwright install chromium # once
npm run build
npm run test:layout
```

A system Chromium can be used by setting `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/path/to/chromium`. The tests start the production server on port 3090 and save traces for failures.

## Deploy to Vercel

The production site is published at https://about-me-henna-alpha.vercel.app/ and was verified in signed-out browser contexts on 8 October 2026. The Vercel project is connected to this GitHub repository, with `main` as the production branch. Future pushes to `main` update the same production domain.

Import `Logic-syd/aboutMe` at https://vercel.com/new, keep the detected Next.js preset and repository root, then select Deploy. No environment variables or database are required. Alternatively run `npx vercel login` followed by `npx vercel --prod` from this directory. Keep deployment protection disabled for the production portfolio so recruiters can access it without signing in.

## Content

Project content is in `lib/projects.ts`; graph labels and contribution details are in `lib/graph.ts`; homepage biography is in `app/page.tsx`, confirmed work areas are in `lib/experience.ts`, and place descriptions and personal reflections are in `lib/place-stories.ts`. Contact links are in `components/site.tsx`. Update verified facts at their source before publication. API and Data Act cases omit release-status labels at the owner's request and make no launch or verified-compliance claims. Other projects retain their existing status information.

All sixteen projects include written case studies. Catch That Train presents three English phone captures together in a portrait gallery, with a dedicated case and a pixel-town station entry. Mountain Chess also includes two genuine product screenshots and verified Live Demo and Source Code links. Pfand Pause includes three desktop and two mobile screenshots of its verified 2.0 HTML5 release, a public source link and the owner's confirmed Game Jolt release link. The separate Danzhu sports mini-program case includes one user-provided screenshot of a Vue / uni-app running mini-program, with privacy redactions, and a verified link to the company website. Other commercial interfaces are not publicly shown. Original workflow illustrations are explicitly labeled and do not represent product screenshots. There are no proprietary code samples, fabricated employment dates, unverified outcome metrics, phone numbers, empty actions, or unverified demo/source links. The sports-education case distinguishes frontend camera and feedback integration from model training.

Mountain Chess is an independently published game, documented as the eighth case with its own live and source links. The site uses system fonts, CSS diagrams, an original local SVG career map and a local SVG favicon, with no third-party tracking or external asset dependencies.


## Homepage navigation

The header links to Projects, About, Experience and Places, alongside LinkedIn and GitHub. Experience summarizes confirmed responsibilities from `lib/experience.ts`; Places shares location context and personal memories. Compact side dots use the same names and indicate the current section, with 44px targets inside the desktop gutter. The professional title remains grounded in the supplied Senior Frontend Engineer experience.

Commercial work receives visual emphasis in the town through The Studio, its WORK sign and Commercial work label. The homepage's four selected cases introduce energy APIs, insurance payments, AI sports assessment and a full-stack personal AI project, Love Story Theater. The latter is explicitly marked Archived; its case study records that it is offline and no longer maintained. All sixteen cases remain available in the complete catalog.

The WORK building opens a preview with four direct case links: the energy API platform, iSolarCloud, Ronghe Pay insurance payments and AI sports assessment. More projects follows the four links and opens the full project explorer. Desktop previews stay within the visible town frame; phones use a modal bottom sheet with an explicit close action, Escape support and focus restoration.

## Graph and career map

`components/project-graph.tsx` connects the real projects to technologies/approaches supported by the case content. Every project stays visible in a stable, open constellation around My work. Selecting a project brings only that planet toward a nearby reading position; its technologies and contributions unfold beside it, with one branch open at a time. The center and unrelated planets keep their bearings. Nearby planets can make a small amount of room for the selected branch, without rotating or contracting the whole constellation. Narrow layouts keep project names available in the adjacent HTML catalog, with a compact satellite orbit for unselected projects when a branch expands.

The HTML catalog has always-visible Work and Personal category tabs, including keyboard navigation and the existing `#professional-work` / `#personal-projects` anchors. Choosing a sphere opens its corresponding category. Desktop lists scroll beneath the category selector; phones scroll naturally with the page. Both categories keep their case links in server-rendered HTML, and WebGL failure still exposes the full case cards. Project names use 14–15px text, with functional links and controls at least 12px. Preserve these readability and discoverability rules when adding projects.

Gradient spheres are fully visible above light labels. Each label combines a small project number, name and an independent arrow link to the case study. Clicking the name or sphere expands the graph. Hover/focus and selection emphasize the label without a separate button strip. The selected project's title, role and case-study link remain below the scene.

Spheres drift gently on three axes. Bounded coupled springs let a drag tug connected nodes, then bring the sphere back with a soft overshoot when released. Drag direction follows the camera after rotation. Clicks create a short light ripple and an elastic squash-and-release, shared with keyboard/project-picker activation; nearby planets respond subtly. New branch nodes emerge from their parent in a short stagger. Releasing a drag preserves a bounded amount of its direction and speed before the sphere springs home; selection never triggers an orbit-wide spin. Motion pause and reduced-motion preferences are supported, and rendering settles when the scene is offscreen. The original case cards remain accessible through a native disclosure or appear immediately when WebGL is unavailable.

`components/career-map.tsx` uses Leaflet with `CRS.Simple` and `public/images/career-map.svg`. The original schematic intentionally enlarges Munich on the left, with Shanghai above Hangzhou on the right. No GPS precision, office address, chronological sequence or travel route is implied. All five approximate work areas were supplied by the user. Selecting a place or pin opens a locally rendered geographic area map from `public/maps/*.geojson`, styled with Leaflet in the portfolio palette. Real OpenStreetMap roads, water and green spaces replace the schematic in this view; a dashed circle marks the city/nearby landmark rather than an office address. No external map tiles, geocoding service, API keys or third-party runtime requests are needed. A compact fallback keeps the place story readable if its map cannot load.

The growth map focuses on places and personal memories, followed by a short reflection on each company. Public geographic descriptions link to official city or UNESCO sources; personal observations are supplied by Yidan. The work summary retains professional responsibilities separately. Both lists run most recent first: NeuVerge-Tron / Sungrow, Danzhu, GLP, Longshine, Fingard. Munich includes cinema, theatre, museums and a remembered weekend routine of English Garden surfers followed by coffee near Münchner Freiheit. Map extract attribution, licensing and generation details are documented in `public/maps/README.md`.

React Three Fiber / Drei and Leaflet describe the implementation of this portfolio; they are not added as unverified technologies in past employment.

The current edition retains the initial six projects and adds Ronghe Pay, a user-confirmed Fingard insurance-payments case; Mountain Chess, a published game inspired by hiking breaks; and Pfand Pause, a bottle-sorting puzzle inspired by moving to Germany. Future projects can be added incrementally. 3D loads near the viewport, pauses when offscreen, respects reduced motion and keeps project and technology controls keyboard-accessible. Graphics initialization failures, scene errors and context loss show all project case cards with a reason-specific message and a Retry 3D view button (or Reload page after a failed file download). Loading beyond 12 seconds exposes the cards while keeping the scene loading; a slow connection does not remove it. The renderer uses the browser’s default GPU preference and retries without antialiasing if its first context initialization fails, using the actual scene canvas rather than a separate test canvas.


## Ronghe Pay (融合付)

The seventh case is at `/projects/ronghe-pay`. It covers the user's zero-to-one frontend contribution during a 2018 Vue 2 upgrade of an existing PHP-based product. The platform connected insurers with authorized banks for premium collections, batch and single payments, claim payouts, reconciliation statements and additional unspecified value-added services. Real-time settlement applies only where supported. The case separates platform capabilities from the user's frontend contribution, and records the payment-domain lesson of accuracy and timeliness.

The owner also confirmed ongoing onboarding of insurance companies and banks, institution-specific configuration, differing bank API/response fields (some normalized by the backend, others handled by the frontend), large-data rendering optimization, and real-time payment safety including duplicate-payment prevention. The detail page explains Ronghe as integration in Chinese; Ronghe Pay is the portfolio’s English rendering, not a newly asserted official English brand. The confirmed framework is Vue 2. Do not infer specific normalization architectures, virtualization or pagination techniques, idempotency keys, encryption, compliance certification, bank-side implementation, measured improvements or an end-to-end guarantee against duplicate payment. Frontend repeat-submission safeguards are part of the payment system’s overall protection. This is a written case with a clearly labeled workflow illustration, without public screenshots, demo or source links. The Fingard work summary and growth map link to this case.

Project counts and fallback cards derive from the project data. All projects stay in the same 3D scene. A stable, uneven spiral, varied planet sizes and real depth leave space between projects as the catalog grows. Overview connections stay hidden; selecting a project reveals only its branch. The scene has no floor, uses restrained orbital traces and slow floating motion, and leaves a narrow adjacent catalog for all project names and keyboard controls. Connection buffers update in place instead of rebuilding tube geometry on every animation frame. Camera framing and scene height preserve the complete overview; there is no pagination or search filter. Cards use three columns on desktop, two on tablet and one on phones. The hero retains six selected entrances; the complete constellation, disclosure/cards and detail routes include every case. Initial positions, expanded siblings, palettes and numeric labels no longer depend on a six-entry array.

### Adding future cases

Add a `Project` object in `lib/projects.ts`, with a unique stable `slug`, its `number`, `kind: 'commercial' | 'independent'`, confirmed content, tags and delivery status. Optional `links` exposes verified public demo/source URLs; `screenshots` provides real images for the shared product gallery, with an optional `screenshotCredit`. When both device formats are available, use desktop captures in `screenshots` and portrait phone captures in `mobileScreenshots`, with optional `mobileDescription` and `mobileHighlights` for the separate mobile chapter. Each image needs its actual dimensions, alt text and caption; optional `label` names its selector. Landscape screenshots use the full gallery width with captions underneath, while mobile captures retain their proportions and original-image links. Optional `graphTitle` gives its short graph label; `contributions` contains the contribution leaves for each corresponding tag. Without contribution leaves, the graph falls back to the documented role. Only mark a project `featured: true` when it should be one of the three featured cards. Only set `heroTitle` and `heroDetail` when it should occupy a selected hero entrance (maximum six). Append new cases without renumbering existing URLs.

The data feeds static detail routes, counts, project selectors, the complete graph, cards and next-case navigation; it does not require another graph-title/leaf array or per-project coordinates. Set `project` on the matching experience in `lib/experience.ts` when its work-summary and growth-map links should point to the new case. Keep public release status, frameworks and responsibilities source-grounded.

Scalability was checked with seventeen temporary test fixtures in an isolated copy outside this repository. No fixture cases are included in the actual portfolio.


## Mountain Chess (高山棋局)

The eighth case is at `/projects/mountain-chess`. Yidan's motivation—wanting to play chess during solo hiking breaks—leads into the product and engineering decisions. The public repository and deployed v1.4.3 application were inspected: native HTML/CSS/JavaScript, a local chess opponent with shallow search and alpha-beta pruning, Service Worker caching and readiness checks, LocalStorage saves, power-saving behavior and Chinese/English/German interfaces. No React, TypeScript, calibrated playing strength or measured battery savings are claimed for this project.

Live game: https://logic-syd.github.io/chessOffline/dist/ · Public source: https://github.com/Logic-syd/chessOffline. The shared public-links component appears in its selected graph detail, case card and case header. The application source is publicly viewable; the portfolio does not imply an open-source license for the entire application.

`public/images/mountain-chess-board.png` is an unmodified browser screenshot captured from the real English application. `public/images/mountain-chess-checkmate.png` is the user's original German victory screenshot. Captions identify each source and the gallery links to the project's chess-piece artwork credits. The existing Danzhu screenshot and all previous cases remain intact.

The displayed status is **Published · Play online**, following the user's explicit release confirmation. Offline setup requirements remain in the description and delivery notes.

## Pfand Pause

The ninth case is at `/projects/pfand-pause`. The user wanted to recognize unfamiliar drinks bottles after moving to Germany. Informal research with newly arrived students found that they rarely proactively learn about bottle types and find the information difficult to remember. The updated case connects that motivation to version 2.0: twenty untimed rounds, layered bottle cards, a shared seven-slot counter, ten deposit-bottle types, non-deposit glass sorting from round eleven, and a separate eight-question packaging guide. Three matching bottles and the seven-slot limit are fictional puzzle rules; refunds are simulated, while the separate guide explains real packaging clues. Independent ownership spans research, game design, development, verification and publishing. No measured learning outcomes or formal research sample size are claimed.

Source: https://github.com/Logic-syd/PfandPause. Repository commit `c438932dc7547bc16c3614a04c535a54384e92d8` and the repository's release documentation confirm React, TypeScript, Vite, pure game transitions and verified legal paths, queued/deduplicated bottle input with cancellation on restart, responsive SVG/CSS visuals, English/German/Chinese interfaces, browser-local completed rounds/preferences and optional sound/reduced motion. The active 2.0 UI has no undo, shuffle or extra-storage rescue; the old ten-round and recorded-victory-voice descriptions no longer apply. In-progress rounds are not restored after refresh, progress does not synchronize across devices or origins, and no PWA/offline installation is claimed. The owner confirmed publication at https://gamejolt.com/games/pfand-pause/1106213; Play on Game Jolt and Source Code remain available. The displayed status is **Published · Version 2.0**.

The five unmodified `public/images/pfand-pause-v2-*.png` screenshots were captured from `downloads/PfandPause-html5-2.0.zip`, the repository-shipped HTML5 release built at commit `cf7a7e8400013e374f4bfaf2f7af4f2db371c13b`. Its SHA-256 was verified against `downloads/README.md`: `f06c81b20ae36b06ca853f3172142bdb55f78c7e0b24f0d7d04c5b26e367a67b`. Three captures show the desktop start screen, layered puzzle and recycling guide at 1440×810; two show the mobile start screen and puzzle at 390×844, with English selected, sound off and reduced motion enabled. Both gameplay images show round one after two actual bottle selections. The main shared gallery displays desktop captures at full width with captions below. A separate mobile chapter shows one complete portrait capture at a time, with touch-layout context and full-image links. Previous screenshots remain preserved as historical files and are no longer displayed in the case.


## Longshine smart-city dashboards

The tenth case is at `/projects/smart-city-dashboards`. It covers large-screen dashboard work at Longshine, with map API integration and route tracking across Wuxi, Hainan and Taiyuan. These regional versions shared a foundation and included location-specific customizations. Frameworks, map providers and delivery metrics are not specified. The work summary and growth map link to both this case and the existing internal low-code platform case.

The Danzhu cases are separate: `/projects/sports-education` covers the TV-based AI examination and training system (jQuery-to-React migration, Canvas, camera video, WebSocket scores, audio-visual synchronization and multi-person assessment); `/projects/running-mini-program` covers the Vue / uni-app student sports mini-program and teacher dashboard: running and camera-based free training, weak-network saving and deferred uploads, teacher result review and score-report exports, plus university and primary-school versions. The user confirmed use by multiple universities and Shanghai primary schools; no school counts or concurrency metrics are specified. The existing redacted running screenshot belongs to the latter. Backend AI analysis and face recognition are described as integrated capabilities, not frontend model development.

## Interactive sports assessment case

`/projects/sports-education` has a dedicated page in `components/sports-case-study.tsx`, with a client-side Canvas training demo in `components/sports-assessment-demo.tsx`. The commercial system's use in high-school entrance PE examinations in parts of China, as well as sports-school training and middle-school PE, is user-confirmed. Public copy describes regional use without naming locations or implying nationwide adoption. The portfolio demo is an original recreation with sample participants and scoring data, not a recording of the commercial product or live AI analysis. It requires no camera access or external scoring service. API and Data Act routes also have dedicated interactive cases; other project routes use the shared template.

The page connects the interactive demonstration to the actual camera → backend AI → WebSocket → frontend feedback workflow and the user's jQuery-to-React migration. Changes to participant count, playback, result latency and speech should be checked on both desktop and mobile, including reset during pending results and reduced-motion mode.

The sports case also records the user-confirmed expansion from two to eight camera inputs, intermittent stream stalls in certain states, and the team’s eventual resolution. The expandable “How I would investigate this today” section is a prospective diagnostic approach, not a claim about the historical root cause or fix.

## API and Data Act interactive cases

The API case combines the owner's European delivery, online debugging and application-management work with a local API console. The associated Data Act case offers a complete export simulation, including scope limits, two confirmation points, asynchronous tasks, partial data, recovery and real sample CSV/JSON downloads. The three lifecycles—task, identity and download link—remain distinct. See `API_CASE_STUDY.md` for content boundaries and reconstruction details.

## Medical curriculum contract project

`/projects/medical-curriculum` is a work project delivered as an independent frontend collaboration via a partner company, during August–September 2024. The educational context was the education-system redesign at School of Public Health, Peking University; the case describes a subcontracted engagement, not university employment or a direct university contract.

The owner confirmed React, a Three.js sphere-based curriculum explorer, multiple majors with overlapping/shared courses, course-specific knowledge points and basic course-selection operations. The owner further confirmed that this was a redesign of an existing system, with Yidan as the sole frontend developer alongside one backend developer, completed and launched in around one and a half months (approximately six weeks). Further confirmed requirements include freely clickable and draggable nodes, customized labels, high-fidelity UI reproduction and performance requirements for a dedicated demonstration screen. The case explains the relationship and interaction challenges from that scope. Specific graph-layout algorithms, rendering optimization methods or measured gains, prerequisites, seat limits, timetable conflict checks, exact launch date and adoption figures remain unconfirmed; do not present them as completed contributions without further information. There are no supplied screenshots, live-product links or source links. The project uses the shared desktop chapters and fixed home navigation; catalog counts, graph nodes, cards, detail routes and layout checks derive from the source data.

Institution naming follows the official names in the owner-supplied school logos: `School of Public Health, Peking University` is the project school, and `Peking University Health Science Center` is the medical affiliation. Public copy and labels stay in English; use `PKU Public Health curriculum` for the compact graph label. Do not invent an English institution name or blur the specific school into a generic university project.

The owner specifically confirmed work on stability under repeated operation. Emphasize this as a frontend contribution and the first technical topic, including continued dragging, selection and exploration. Concrete cleanup APIs, memory-leak diagnoses, optimization techniques, stress-test duration and measured gains remain unconfirmed.

The owner confirmed separate operations for left-click, right-click and double-click, alongside dragging, and that event-binding volume affected performance. Present complex mouse-event coordination as an actual frontend contribution, next to repeated-interaction stability. The action assigned to each gesture, listener organization, double-click timing and specific event-binding optimizations remain unspecified.


Desktop case chapters use the viewport as a maximum reading budget, not a compulsory height. Introductions and prose chapters follow their content with compact spacing; media and tools have bounded frames so their headings, captions and controls fit together. Topic panels share their intrinsic maximum height to avoid jumping when selected. Keep flow between chapters continuous, without empty full-screen spacers.


## Search visibility

The production URL is `https://yidan-builds.vercel.app`, configured in `lib/profile.ts`. The shared profile keeps visible technology keywords and the homepage's structured data aligned with the owner's experience. Describe backend tools as personal-project work; keep insurance collections, payouts and reconciliation connected to the Ronghe Pay case. Use natural, accurate copy rather than unrelated trending keywords.

The homepage and every project route have their own canonical URL. `app/sitemap.ts` derives the sitemap from the project catalog so additions are included automatically; `robots.txt` permits crawling and points to it. The homepage includes a Schema.org ProfilePage with its Person entity, public profile links and known skills. No invented ratings, achievements, modification dates or search-ranking guarantees are included.

These are crawl and discovery signals, not proof of indexing. To check Google's actual indexing status, verify the URL-prefix property in Google Search Console, inspect the homepage URL and submit `https://yidan-builds.vercel.app/sitemap.xml`. Verification requires the owner's account and a provider-issued verification token; do not fabricate one. If the public domain changes, update `siteUrl` and re-submit the sitemap. Search results and `site:` queries may be incomplete; use the owner's webmaster-console reports for confirmation.

## Homepage presentation

The approved visual direction is the light blue-green glass design inspired by the owner's photograph of Van Gogh's *Plain near Auvers*: pale sky blue, cloud-white, meadow green, a little wheat yellow and restrained dusty-pink details. The palette is a visual interpretation of the photograph, not verified sampling from a museum original. Use the shared tokens in `app/globals.css` and the atmosphere, controls and homepage surfaces in `app/auvers-theme.css`. Keep the canvas interactive; never substitute a generated mockup for the real town, maps or project graph. Pink belongs to the cafe, character, flowers and small personal-project accents, rather than full-page washes or primary controls.

Typography uses the native system sans stack (SF on Apple platforms, platform fallbacks elsewhere), with restrained semibold headings and regular body copy. Main actions use soft jade capsules; interactive workspaces use translucent, lightly green-tinted glass with backdrop blur, gentle gradients and diffuse shadows. Avoid bright white outlines and strong inset highlights; use the shared glass tokens and keep the underlying page colors visible. The introductory bio connects frontend work on large-scale, high-traffic systems with independent full-stack projects and a current focus on AI applications. Keep the commercial frontend scope clear, without an inline project link or unverified AI project counts, traffic metrics or backend concurrency claims. List finance, insurance, energy and education once below the core technologies so the industry keywords stay visible without repeating the bio. Ordinary prose stays open rather than receiving a decorative frame. The homepage has four concise commercial project links under the town, followed by the complete interactive project catalog. Preserve semantic success/error colors and the low-code demo's distinct skins. Original personal photos and product screenshots retain their original colors. Check keyboard focus, opaque-surface fallbacks and reduced transparency as well as the full responsive layout checks.

The interactive project constellation is a local ocean-blue night-sky surface within the light page. Its sparse procedural stars, seven small diffraction glints, cool pearl highlights and fine orbit trails should retain open space around the project nodes. Keep scene labels and controls readable against the darker surface. Star twinkle and parallax must honor Pause motion, reduced motion and scene visibility; keep them out of pointer hit-testing and avoid postprocessing or large image backgrounds.

Keep generous outer space across the entire homepage: the header, town, project catalog, Skills, About me, Experience, Places and footer share an 8vw gutter (capped at 120px) inside the centered 1440px shell, with 24px gutters on mobile. The hero introduction uses at most 440px of actual grid width; keep its gap to the town compact instead of allocating unused space between the two. Short-height adjustments must retain the horizontal gutters and fit the complete town without cropping or shrinking all text.

About me includes the owner's confirmed Kilimanjaro summit and subsequent donation of notebooks, ballpoint pens and sanitary pads to a school, followed by her wish to do useful work and contribute to a better world. The two supplied photographs appear together in a separate Outside work row: `public/images/personal/kilimanjaro-summit.jpg` (2880 × 3840) and `public/images/personal/tanzania-school-visit.jpg` (960 × 1280). Both files are unchanged copies of the owner’s originals, displayed in their full portrait proportions with captions and an accessible enlarged view. The school, trip date and donation quantities have not been specified; the existing graduation and Munich photos retain their original context.

Places shows city-life descriptions, personal memories and local maps. The former Work & projects tab and its duplicate project links have been removed; professional context remains in Experience and the project cases.

The homepage keeps React, TypeScript, Vue, Next.js and Three.js in a short introduction, with the complete technology groups in a visible Skills section. Keep that section and the server-rendered profile/structured data aligned so simplifying the presentation does not remove relevant HR or search keywords. Backend technologies remain identified as personal-project experience. Use plain English, confirmed work and personal details; remove repeated slogans and decorative frames while retaining the town, photos, places and boundaries needed to operate interactive tools.

The earlier structural proposals are recorded in [the portfolio refresh plan](docs/portfolio-refresh-plan.md). The current editorial revision covers all sixteen cases: concise product introductions, explicit personal scope and technical details with project-specific headings. Outcome chapters are optional (`delivery`) and only appear when they add an actual result, current status or product limitation. Do not recreate a generic responsibility summary as a closing chapter. The bespoke API, iSolarCloud and sports cases follow the same separation of product, role and implementation; media and interactive demonstrations retain their source/sample labels. Existing demos, screenshots, core technical details and visible search keywords remain part of the cases.

## Owner-supplied CV additions

The owner supplied an updated CV and requested its additional engineering experience be incorporated into the portfolio. The project catalog records API gateway, permission and raw-response handling; iSolarCloud authorization, privacy consent and feature-availability recovery; State Grid intranet request, Cookie and permission debugging; smart-city iframe integration, local cross-origin debugging within same-origin policy constraints and Chrome 54 compatibility in 2021; GLP accessibility improvements; student-training frontend performance optimization during peak running periods and deferred uploads; and an initial Coffee Map web SDK for third-party embedding. Bespoke iSolarCloud chapters also describe consent and unavailable-feature behavior, while the API case already explains network versus business errors.

The owner confirmed that session-error handling, state cleanup, login redirects and notification/sign-out on login elsewhere belonged to the State Grid Operations & Monitoring Platform at Longshine. These are documented in that project’s responsibilities and technical topics, and identified explicitly in the company experience. Reviewed cross-repository merges, conflict resolution, testing and release ownership belong to the NVT / Sungrow experience. Treasury SaaS and bank-enterprise connectivity remain separate from Ronghe Pay in the Fingard experience. The Coffee Map SDK is an initial implementation in an unreleased project, not a public SDK launch. Do not infer specific optimization techniques, Cookie settings, compatibility libraries, accessibility certification or measured performance gains from these statements. The CV itself and its private contact details are not published with this update.

## Low-code platform and interactive builder

The owner clarified that Longshine built the platform as low-code development gained popularity, to let its internal marketing and construction departments assemble simple apps. The internal platform began in Vue 3, then moved to Vue 2 for integration into the company’s broader micro-frontend system. Her primary contributions were composite components, their data-flow design, drag-and-drop parent/child relationships, and theme switching. Technical-selection participation was previously confirmed. Do not infer a specific micro-frontend framework, migration strategy, component library or performance result.

`/projects/low-code-platform#app-builder` contains a new React portfolio reconstruction, not original Vue product code or an original UI capture. Its sample builder lets visitors add headings, text/select fields and nested field groups, change labels and required settings, reorder/reparent components, switch three themes and try a local form. Browser drag-and-drop and click/property controls share the same tree operations. The reconstruction limits pages to ten components and two group levels, rejects cyclic/deeper nesting, and keeps entered values keyed by component ID across moves and theme changes. These are demonstration choices, not claims about the historical implementation. Reset restores the sample; nothing is published or sent to a server.


## Catch That Train!

The fifteenth case, `/projects/catch-that-train`, is an independent browser strategy game. The personal-project list, project graph, counts and sitemap derive from the shared catalog. The pixel-town station now links to this case; the growth map remains in the main navigation.

Facts were checked against https://github.com/Logic-syd/catchThatTrain- at commit `6b9a1b1af44c8be5361fa10f915e0e9d3e6cee6b`. The active game uses React 19, TypeScript, Vite, SVG/CSS scenes and Vitest; Canvas is used for result-image export. Phaser is an unused dependency and is not represented as an implemented feature. Four travelers and six stations are playable in Normal and Extreme modes. Wins unlock subsequent travelers. English and Chinese presentation is separate from game state. Achievements, unlocks and the most recent 30 runs are browser-local; shared challenge links do not upload records. The student at Shanghai Hongqiao has six walkable, collision-aware entrance scenes; this spatial prototype does not apply to every character and station. Family mode is planned. Station layouts and routes are gameplay abstractions, not travel guidance. No user counts or measured human win rates are claimed.

The owner confirmed that this is a portrait phone game. The gallery uses the three English phone screenshots in journey order (traveler selection, metro direction, station run), shown together in desktop columns and stacked on mobile. There are no screenshot-switching controls or separate desktop/mobile showcase chapters. Use `screenshotLayout: 'portrait-grid'` with the original phone images in `screenshots`; retain full images, captions and links to the originals.

The six original `public/images/catch-that-train-*.png` screenshots were captured in English from a local production build of that commit using `npm ci`, `npm run build` and `npm run preview`. Its 568 tests passed. Three complete desktop browser viewport captures use 1024×960. The mobile start and direction captures use 390×844; the station capture uses a taller 390×1000 mobile viewport so the sprint control is visible in full. The existing game intentionally keeps a 500px maximum playfield on desktop; its layout was not widened or edited for these images. The captures show actual UI actions: choosing the student and Hongqiao, preparing tea/ID/breakfast, selecting the direct Line 10 route, choosing the Hongqiao direction, alighting at the correct stop, and starting to walk in the left lane. No run state or outcomes were fabricated, and no screenshot crops or translations were applied. Each displayed capture links to its original file. Some unselected route descriptions still contain untranslated text in the source; the selected views use its English interface.

Live Demo points to the GitHub Pages URL recorded in the game repository, https://logic-syd.github.io/catchThatTrain-/. The game repository was only run and reviewed; its source was not changed as part of this portfolio update.

## Love Story Theater

`/projects/love-story-theater` is an independent, discontinued project made for a friend going through a breakup. The owner confirmed that the service has stopped running and the project is no longer maintained; this takes precedence over the old live-demo link in the source repository README. List only the source link, keep the status neutral, and do not add it to the pixel town’s buildings or previews.

The written case was reviewed against `Logic-syd/Love-Story-Theater` at `597b4109b5da2cfd96497c4016a7b65641fa25f4`: a Next.js / React / TypeScript / Material UI frontend and a separate Kotlin / Ktor backend using DeepSeek. The frontend stores conversational state and uses Axios to call two JSON endpoints: contextual follow-up questions and final story generation. English, Chinese and German content is separated into question pools and UI copy. Describe it as fictional storytelling inspired by a personal situation, without claiming therapeutic outcomes, robust data-isolation guarantees or current availability. The repo was inspected as source; this portfolio update does not restart the service or call the model API. The chapter diagram is a labeled architecture illustration, not a product screenshot.
