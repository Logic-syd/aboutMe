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

Source is published from `Logic-syd/aboutMe`, branch `main`, through Vercel. Verified public production URL: https://about-me-henna-alpha.vercel.app/. The user’s deployment dashboard showed build `1654cc8` as Ready, and fresh signed-out browser contexts independently confirmed public access.

Vercel is connected to the repository with `main` as the production source. Future pushes to `main` update the production site. No environment variables are required. The earlier login-related notes below describe the historical state before the user completed the first deployment.

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

## Left-expanding branch layout correction

- Corrected the expanded composition: the root remains near the center-right, the five unselected projects move to the right, and the selected project emits technology spheres to the left. Contribution nodes extend farther left.
- Replaced immediate position reassignment with spring motion. New child nodes start at their parent's actual position, with short staggered delays; reduced motion still updates positions immediately.
- Adapted tablet label widths and line boxes; phones keep five compact project satellites on the right and expose their names through the existing project picker.
- Production build and ESLint passed. Four viewport sizes (1440, 768, 390, 320) covered 24 branch layouts, verifying root position, sibling direction, left expansion and labels within the scene. Actual animated launch traveled left from its parent. The 24 project selections, 92 technology selections, dragging, rotation, keyboard, reduced motion and WebGL fallback checks passed without unexpected browser errors.


## Gradient materials and consistent click springs

- Added diagonal three-stop vertex-color gradients while retaining the glossy physical material. Projects have distinct pastel palettes; technology spheres inherit the selected project palette, and contribution spheres use mint/blue tones. No image assets or external texture requests were added.
- Added a shared interaction revision so physical sphere clicks, project/technology labels, HTML pickers and keyboard activation trigger the same gentle position/scale spring. Contribution-sphere clicks also recoil. Pressed spheres compress slightly; node repositioning uses a lightly underdamped spring.
- Reduced motion suppresses recoil. Hover and recoil continue to settle correctly when ambient motion is paused and rendering uses demand frames.
- Build and ESLint passed. Actual browser samples measured roughly six pixels of recoil for root-label clicks, technology-label clicks, direct contribution-sphere clicks and keyboard activation, then verified settling. No page errors occurred.
- Four viewport sizes passed 24 approved branch layouts, 24 project selections and 92 technology selections, plus real dragging, rotation, keyboard, reduced-motion and forced WebGL-failure checks. Desktop/phone gradient screenshots were reviewed; no horizontal overflow or unexpected browser errors occurred.


## Public production verification — 8 October 2026

- Public URL: https://about-me-henna-alpha.vercel.app/. The latest visual implementation was deployed from commit `1654cc8`; verification used fresh browser contexts without Vercel sign-in or existing cookies.
- Homepage and all six detail routes passed 28 page/viewport checks at 1440, 768, 390 and 320 pixels: HTTP 200, correct titles/landmarks, nonempty link destinations, valid anchors, correct unreleased project statuses and no horizontal overflow.
- No unexpected console errors, JavaScript page errors or failed resources. Public 404 behavior and the keyboard skip link passed.
- Desktop and phone checks confirmed actual WebGL rendering, twelve project/technology branch selections and ten experience selections. The local SVG map and redacted screenshot loaded publicly. Graph screenshots were reviewed.
- The first-version delivery goal is complete: the portfolio has a verified public production URL that opens without recruiter authentication.

## Navigation, opportunity copy and case-study entrances — modification branch

- Branch: `codex/navigation-opportunities`. Header links now read About Me, My Projects, My Work and Growth Map directly after the wordmark; the existing contact CTA stays on the right. Phones use two rows. Detail-page navigation returns to the matching homepage section.
- Added a work summary using the same five confirmed experience records as the map. Contact welcomes frontend and full-stack engineering opportunities, relocation and new challenges without changing the professional title or inventing experience.
- Every visible project node has a separate direct case-study link. Sphere/label activation still expands the graph; the selected project also exposes a prominent case-study button below the scene. Mobile spacing accommodates the extra links.
- Final build (including TypeScript) and ESLint passed. Browser checks covered 35 page/viewport combinations at 1440, 1024, 768, 390 and 320 pixels, all navigation destinations, correct unreleased statuses, six case-card entrances and twelve actual graph-to-detail clicks. No horizontal overflow or unexpected console/page errors.
- After the mobile spacing adjustment, both phone sizes were rechecked across all seven routes (14 combinations) and twelve actual case-study clicks, with no errors. Desktop and phone screenshots were visually reviewed.
- Changes are isolated on the modification branch; production deployment still follows `main`.


## Automatic project-card fallback

- Added a shared presentation component around the graph and existing server-rendered case content. Unsupported WebGL 2 skips the scene import; render errors, context loss and a 12-second initialization timeout also switch to cards.
- Failure removes the entire 3D explorer, including its fixed-height stage and controls, and renders all six case cards directly. Cards reuse the original content, status labels and detail links. Supported browsers retain the graph and optional card disclosure.
- Final production build, TypeScript, ESLint and whitespace checks passed. Forced unsupported WebGL at 1440, 768, 390 and 320 pixels verified six visible cards, no dead stage or disclosure, correct unreleased statuses and 24 actual detail-page clicks. Desktop and phone fallback screenshots were reviewed.
- Blocked context access, a lost live context, blocked dynamic imports and stalled imports all showed the same visible cards. Healthy WebGL in four viewport sizes passed 24 project/technology branch selections; no unexpected browser errors or horizontal overflow occurred.


## Place stories and geographic area maps

- Modification branch: `codex/place-stories-map`. Retained the enlarged Munich schematic and added five real geographic area views, loaded from local simplified OpenStreetMap GeoJSON. Maps use the portfolio palette; visible OSM attribution and ODbL extract documentation are included. No runtime external map requests or API keys are needed.
- Place-led descriptions use verified common English names and link to official sources. Company reflections and personal memories come from the user, including Munich culture and English Garden/Freiheit coffee weekends, Caohejing game-company events, Zhangjiang plaid shirts, Friday West Lake traffic and after-work Xixi runs. Public geographic context is separate from first-person memories.
- Corrected the most-recent-first work order to place GLP before Longshine. Schematic pins retain their correct physical locations through ID-based coordinates. The existing six project cases and release statuses are preserved.
- Production build (including TypeScript) and ESLint passed. Browser checks at 1440, 768, 390 and 320 pixels covered 20 place selections, 20 actual schematic-pin selections, keyboard activation, area reset and return to overview. All five maps rendered vector geometry with attribution, correct place/company content and no horizontal overflow.
- Failed map-data loading showed a compact notice with the place story still readable; return to overview remained usable. Healthy checks recorded no console/page errors and no third-party requests. Desktop Munich/West Lake and phone Xixi screenshots were visually reviewed.
