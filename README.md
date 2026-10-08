# Yidan Shao — Portfolio

Public portfolio: https://about-me-henna-alpha.vercel.app/

English portfolio built with Next.js App Router, TypeScript and Tailwind CSS. The homepage includes an interactive Three.js project knowledge graph, six expandable case cards, a Leaflet career map and contact links. Each project has a statically generated detail route.

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

All six projects include written case studies. The Danzhu case also includes one user-provided screenshot of a Vue / uni-app running mini-program, with privacy redactions, and a verified link to the company website. Other commercial interfaces are not publicly shown. Original workflow illustrations are explicitly labeled and do not represent product screenshots. There are no proprietary code samples, fabricated employment dates, unverified outcome metrics, phone numbers, empty actions, or unverified demo/source links. The sports-education case distinguishes frontend camera and feedback integration from model training.

The empty starting repository contained no runnable game, so none is included. The site uses system fonts, CSS diagrams, an original local SVG career map and a local SVG favicon, with no third-party tracking or external asset dependencies.


## Homepage navigation

The header links to About Me, My Projects, My Work, Growth Map and Let’s Talk. My Work summarizes confirmed responsibilities from `lib/experience.ts`; Growth Map explores the same experience by place. Contact copy welcomes frontend and full-stack engineering opportunities and new challenges. The professional title remains grounded in the supplied Senior Frontend Engineer experience.

## Graph and career map

`components/project-graph.tsx` connects the six real projects to technologies/approaches supported by the case content. The first level shows all six projects around a floating root sphere. Selecting one project keeps the root sphere near the center-right, moves the other five projects to the right and emits technology spheres to the left from the selected project; selecting one technology reveals contribution nodes, with only one branch expanded at a time. Spheres use diagonal three-color vertex gradients with a palette shared by each project and its technologies. New child spheres launch from their parent’s current position with spring motion. Sphere, selector-label and picker activation share subtle click recoil, including keyboard input. Sphere dragging, view rotation, motion pause and reset are supported. On phones, the graph focuses on the current selection to keep node text readable. Every visible project node has a separate Read case study link; selecting its sphere or label continues to expand the graph. The selected project also has a prominent case-study button below the scene. The original case cards remain accessible through a native disclosure.

`components/career-map.tsx` uses Leaflet with `CRS.Simple` and `public/images/career-map.svg`. The original schematic intentionally enlarges Munich on the left, with Shanghai above Hangzhou on the right. No GPS precision, office address, chronological sequence or travel route is implied. All five approximate work areas were supplied by the user. Selecting a place or pin opens a locally rendered geographic area map from `public/maps/*.geojson`, styled with Leaflet in the portfolio palette. Real OpenStreetMap roads, water and green spaces replace the schematic in this view; a dashed circle marks the city/nearby landmark rather than an office address. No external map tiles, geocoding service, API keys or third-party runtime requests are needed. A compact fallback keeps the place story readable if its map cannot load.

The growth map focuses on places and personal memories, followed by a short reflection on each company. Public geographic descriptions link to official city or UNESCO sources; personal observations are supplied by Yidan. The work summary retains professional responsibilities separately. Both lists run most recent first: NeuVerge-Tron / Sungrow, Danzhu, GLP, Longshine, Fingard. Munich includes cinema, theatre, museums and a remembered weekend routine of English Garden surfers followed by coffee near Münchner Freiheit. Map extract attribution, licensing and generation details are documented in `public/maps/README.md`.

React Three Fiber / Drei and Leaflet describe the implementation of this portfolio; they are not added as unverified technologies in past employment.

The current edition deliberately focuses on six projects. Zhihuishu’s Three.js knowledge-graph work is mentioned in the biography using user-confirmed details, without inventing dates, a location or an additional case study. Future projects can be added incrementally. 3D loads near the viewport, pauses when offscreen, respects reduced motion and keeps project and technology controls keyboard-accessible. Unsupported WebGL 2, scene errors, context loss, or scene initialization exceeding 12 seconds automatically remove the entire 3D explorer and show all six case cards immediately, without a disclosure click.
