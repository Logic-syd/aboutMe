# Portfolio maintenance

## Complete desktop chapters (owner requirement)

Every project detail page must present complete, readable modules on a desktop screen. This applies to every new project and every edit, including bespoke case studies. Keep the same principle on the homepage; its short contact/footer area is intentionally compact.

- Use `CaseIntro` and `CaseChapter` from `components/case-chapter.tsx`. Shared layout is in `app/project-case.css`. Mark custom interactive tools with `data-case-demo`.
- At desktop widths above 800px, the opening module fits with the 64px site header; subsequent chapters fit within one viewport. This is a maximum size, not a mandatory full-screen height. Let prose follow its content; do not create empty space to stretch a short chapter. Keep adjacent chapters connected with compact spacing. A chapter's heading, description, media, captions and controls must fit together. Check 1440×900, 1280×720 and 1024×600.
- Arrange content to fit instead of hiding it. Split long material into coherent chapters or use `CaseNotes` with keyboard-accessible topic tabs. Do not make long prose scroll inside a chapter, crop product screenshots to fake a fit, hide overflow, or shrink all text until it is unreadable.
- Show one full product screenshot at a time with `object-fit: contain`, visible caption and a link to the original image. Preserve source attribution. Any intentional privacy/detail crop must be labeled and retain access to the source image.
- When desktop and mobile screenshots are available, put landscape desktop captures in `screenshots` and portrait phone captures in `mobileScreenshots`. Use the shared gallery's separate mobile chapter, with optional `mobileDescription` and `mobileHighlights`; do not stretch a phone screenshot across the desktop showcase. Capture the current confirmed release and record its source and viewport sizes in README.md.
- Dense interactive consoles may scroll within explicitly bounded configuration/results panes. The complete tool frame must stay within its chapter; keep the primary action visible. Expanded responses and error states must not stretch the chapter or overlap other content.
- Phones and narrow windows use natural page scrolling and stacked content. Do not force a one-screen height on mobile or add scroll snapping. No horizontal page overflow.
- Keep the fixed `Back to home` arrow from `Header detail` in the upper-left corner at every scroll position, including on mobile. Use the expressive curved CSS arrow without a visible button frame, background or shadow; retain its 44px click target and keyboard focus indicator. Reserve space so it does not overlap the header, chapter content or interactive controls. It must navigate to `/` without requiring a scroll back to the title; do not restore the mid-screen home icon.
- Keep related project navigation and contact endings concise; they do not need artificial full-screen spacing.

## Required checks

After changing project content, media, demos or layout:

```sh
npm run lint
npm run typecheck
npm run build
npm run test:layout
```

Install the test browser once with `npx playwright install chromium`. In an environment with system Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to that executable for `test:layout`.

The browser tests iterate `lib/projects.ts`, so newly added projects automatically join the checks. Review representative screenshots as well as test results; fitting bounding boxes alone does not guarantee readable composition. Exercise alternate image/topic selections and expanded demo results.

## Content integrity

Keep public portfolio prose, project titles and graph labels in English. Retain the specific public-health-school identity using the English naming recorded in README.md; do not introduce Chinese-only labels when updating this project.

Update project facts at their existing sources. Preserve distinctions between the standalone React API platform and the Vue/TypeScript iSolarCloud platform. Do not invent employment dates, release status, quantified outcomes, compliance guarantees, or historical bug causes. Label illustrative workflows and synthetic interactive data clearly. Retain personal photos and original screenshots unchanged unless the owner specifically requests an image edit.
