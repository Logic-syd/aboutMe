# Pixel-town concept

This experimental design lives on `design/pixel-town` and has not been merged into `main`.

## Local preview

Use Node.js 22 (the version declared by `.nvmrc`). From the repository root:

```sh
git fetch origin
git switch design/pixel-town
npm ci
npm run dev
```

Open the local address printed by Next.js. If port 3000 is busy, use `npm run dev -- --port 3001`.

## Explore

Click a building or one of the six location buttons. The character moves to that location and a compact preview appears beside the selected building or navigation button, with only the place name, a short title and a direct project, city-map or contact link. The 240px-wide bubble keeps the map visible; the studio offers an API-platform link and a more-projects link. The preview stays within the viewport, supports Escape/close and returns keyboard focus to its trigger. It dismisses on outside interaction or when the trigger scrolls offscreen. Below the town, the original interactive Three.js sphere explorer connects all thirteen projects to their technologies and contributions. Case-study notebooks are available through the disclosure beneath it, or appear directly if 3D is unavailable. The existing Leaflet growth map and place stories remain below the work experience. Keyboard users can Tab to a building and press Enter; phone users can use the larger location buttons. Motion can be paused and respects reduced-motion settings.

The town uses original SVG pixel artwork and CSS, with no WebGL, external art downloads or new dependencies. The sphere explorer uses WebGL when available and retains its graphics guidance and retry behavior. The town remains usable without WebGL. Existing product screenshots also appear as previews in the corresponding notebook cards.

## Validation

Lint, typecheck and production build passed. Chromium desktop (1440px) and mobile (390px), with WebGL disabled: all six location selections, story updates, keyboard interaction, motion controls, ten project cards and retained case-study routes passed, with no horizontal overflow or page errors.

## Adding images one project at a time

The detail pages already support real product galleries. Store images under `public/images/`, then add a `screenshots` entry to the project in `lib/projects.ts`: `src`, intrinsic `width` and `height`, descriptive `alt`, and a factual `caption`. The first image is also used in its notebook preview. A `screenshotCredit` can link to the image source when needed.

Start with an overview screen, a workflow you implemented, and one detail that explains a design decision. Use images you can publish; redact personal/customer data before committing. Keep concept artwork and personal/place photos labeled separately from product screenshots. We can attach and caption a single image at a time rather than waiting for a complete set.
