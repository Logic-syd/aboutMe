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

Click a building or one of the six location buttons. The character moves to that location and a story panel links to the relevant projects, work experience or contact address. All ten project case studies remain available in the studio notebook list. Keyboard users can Tab to a building and press Enter; phone users can use the larger location buttons. Motion can be paused and respects reduced-motion settings.

The town uses original SVG pixel artwork and CSS, with no WebGL, external art downloads or new dependencies. The existing sphere components remain in the checkout, but are not mounted on this concept homepage.

## Validation

Lint, typecheck and production build passed. Chromium desktop (1440px) and mobile (390px), with WebGL disabled: all six location selections, story updates, keyboard interaction, motion controls, ten project cards and retained case-study routes passed, with no horizontal overflow or page errors.
