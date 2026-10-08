# Delivery and verification — 8 October 2026

## Implemented

- Next.js, TypeScript and Tailwind CSS; responsive English homepage and six static case-study routes.
- Three featured projects, three additional case cards, biography, selected employment summary and contact links.
- Original, explicitly labeled workflow diagrams. All six projects include written case studies, with no public demos. The Danzhu case now includes a user-supplied running mini-program screenshot with privacy redactions.
- Coffee & Craft Beer Discovery Map and EU Data Act Data Export Center are explicitly **In development · Not released** on both the homepage and detail pages.
- Sports-education contribution explicitly excludes training the vision-recognition models.
- No phone number, invented employment dates, unverified impact figures, internal code or empty buttons.
- Metadata, favicon, robots rules, a custom 404, semantic landmarks, visible keyboard focus, skip link and reduced-motion support.

## Verification actually run

- `npm run build`, `npm run lint`, `npm run typecheck`: passed on the final implementation.
- Headless Google Chrome: homepage plus all six case pages at 1440, 768, 390 and 320 pixels wide (28 page/viewport combinations), with screenshot review.
- All 28 combinations returned HTTP 200, with no horizontal overflow, browser console errors, JavaScript page errors or failed resources.
- Six case-study links, two unreleased status labels, internal anchor targets, nonempty link destinations, keyboard skip navigation and HTTP 404 behavior checked.
- After the final navigation fix, actual case-link navigation was rechecked: case page starts at the title; return link scrolls to the homepage work section.
- GitHub profile returned HTTP 200. LinkedIn returned a browser-verification page, so its actual profile content could not be independently verified; the user-supplied URL is retained. The email link uses the supplied address; no email was sent.
- `npm audit --omit=dev`: zero production vulnerabilities. Full audit reports five development-only findings from one transitive `braces` advisory in Next.js's ESLint toolchain. The registry's latest `braces` remains 3.0.3; no forced Next.js downgrade was applied.

## Deployment state

Source has been pushed to `Logic-syd/aboutMe`, branch `main`. Vercel CLI reports **Logged out**. There is no verified public production URL yet.

To publish: sign in at https://vercel.com/new using GitHub, import `Logic-syd/aboutMe`, retain the detected Next.js preset and root directory, and select **Deploy**. No environment variables are required. Ensure the resulting production URL can be opened in a signed-out browser.

## Reference-inspired visual update

- Reworked the homepage around an oversized personal wordmark, original SVG orbital lines, six linked project index cards, thin borders and a three-column featured-work grid.
- Visual direction references https://getartcraft.com; implementation, project content and diagrams are original. No ArtCraft images, videos, logos, copy or source code were reused.
- Retained the light background, restrained pink accents, all six case studies and their release statuses. On mobile, project index cards use a two-column grid.
- Reran all 28 page/viewport checks successfully after the redesign. Additionally clicked all six orbital project links at 1440, 1024, 768, 650, 390 and 320 pixels (36 navigations), verifying the destination, top-of-page position and return link.
- Final production build, ESLint and TypeScript checks passed. Vercel still requires account login before a public production URL can be confirmed.


## Danzhu running mini-program evidence

- User confirmed Vue / uni-app and requested privacy redaction and a Danzhu company link. Specific implementation ownership beyond contribution to this mini-program is not inferred from the screenshot.
- Added a selected running-screen preview, a full redacted image link and a note that many other commercial interfaces are not suitable for public display.
- The original attachment is not included in the repository. The published image covers the top personal/group title, the entire map geography and route, and the portrait. Tencent Maps attribution remains visible.
- Asset: `public/images/danzhu-running-redacted.png` (853 × 1844). Created with built-in imagegen; the visible caption states AI-assisted privacy redaction. This is an edited rendition, not claimed to be pixel-identical outside the masks.
- Editing prompt: Apply opaque gray privacy masks to the personal/group title, full map geography/route and portrait; retain Tencent Maps attribution where possible; preserve original timer, metrics, Chinese instructions and controls; do not invent or redesign the interface.
- Verified `http://www.danzle.com/web/index.html` returned HTTP 200 and the company title 上海淡竹体育科技有限公司. HTTPS failed certificate validation, so the supplied working HTTP link is used and labeled as the company website, not a mini-program demo.
- Validation for this addition: production build, ESLint and TypeScript passed; browser checks at 1440, 768, 390 and 320 pixels confirmed no horizontal overflow or console errors, successful image loading, a working full-image popup and the exact company-link destination.


## Initial interactive project graph and schematic career map (superseded graph renderer)

- React Flow renders all six projects and ten technology/approach categories. Project selections display responsibilities, technologies, accurate release status and a case-study link; technology selections expose related projects.
- Phone layouts show a focused, readable subgraph rather than a shrunken full network. The complete six-project picker and optional case-card view remain available.
- Leaflet uses an original local SVG with a non-geographic coordinate system. Munich is enlarged on the left and labeled as the current base; Shanghai and Hangzhou appear on the right. Explicitly labeled not to scale.
- User-confirmed work areas: NeuVerge-Tron / Sungrow — Munich; Danzhu — Caohejing, Shanghai; GLP — Zhangjiang, Pudong, Shanghai; Longshine — near West Lake, Hangzhou; Fingard — near Xixi Wetland, Hangzhou.
- The published schematic makes no requests to external map or geocoding services. The provisional geographic basemap was removed.
- Browser checks at 1440, 768, 390 and 320 pixels: 24 case-study link checks, 58 technology selections, 20 company selections and 20 actual map-pin clicks passed, plus graph zoom/reset, map reset and the six-card disclosure. No horizontal overflow or browser errors.
- Graph and map screenshots reviewed at desktop and phone sizes.
- Keyboard activation of project selectors, technology nodes, company selectors and map pins passed. With the map illustration deliberately blocked, the fallback message and experience navigation remained usable. Zero third-party network requests were observed. Production dependency audit reports zero vulnerabilities.


## Three.js knowledge graph iteration

- Replaced React Flow with Three.js, React Three Fiber and Drei. Initial state displays a large floating root sphere and all six first-level project spheres. A selected project unfolds its technologies; a selected technology reveals contribution nodes. Only one project/technology branch is open at a time.
- Added sphere dragging with elastic scale feedback, orbit rotation, explicit zoom/reset controls and a motion pause button. Light ceramic materials, pink connection accents and a floor with orbital rings retain the portfolio’s visual direction.
- Phone layouts focus on the selected branch and keep all six projects and all technologies accessible through HTML controls. Labels use a dedicated overlay; small screens show fewer simultaneous labels as the branch expands.
- Lazy-loads the scene near the viewport, stops continuous rendering offscreen, respects reduced-motion preferences and retains project/technology navigation without WebGL.
- Added the user-confirmed Zhihuishu knowledge-graph experience to the biography: Three.js, floating/draggable sphere nodes, elastic feedback, three-level expansion and a single open branch. No dates, location or seventh case study were invented.
- Production build and ESLint passed. Chrome checks at 1440, 768, 390 and 320 pixels covered 24 project selections, 92 technology selections and 24 case-study destinations. Real sphere dragging, click-to-expand, root reset, orbit rotation, zoom controls, keyboard selection, reduced motion and forced WebGL failure all passed, with no unexpected browser errors.
- Homepage plus all six detail routes passed 28 page/viewport checks: HTTP 200, no horizontal overflow, no console or page errors, no failed resources, valid link/anchor targets and correct unreleased statuses. The 404 and keyboard skip link also passed.
- Desktop and phone graph screenshots reviewed. Production dependency audit: zero vulnerabilities. Public Vercel deployment still requires account login.
