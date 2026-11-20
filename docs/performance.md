# Media and project-explorer performance

This work branches from the restored production design at `7fb2d1e`. It does not include the visual redesign. Production `main` remains unchanged until the owner approves a merge.

## Image delivery

`npm run images:optimize` produces WebP display copies for personal photos and PNG screenshots of at least 256 KiB. Sharp preserves the full composition, caps the longest edge at 2,000 pixels without enlargement, and uses quality 86. The generated `lib/optimized-images.json` maps original URLs to display URLs. Commit both the manifest and generated assets.

The eleven initial display assets total 2,144 KiB, compared with 7,546 KiB for their sources: a 71.6% reduction. The Kilimanjaro source remains 2,880×3,840 / 3,070 KiB; its display copy is 1,500×2,000 / 735 KiB. The running screenshot is 1,212 → 53 KiB, with the existing privacy redactions preserved.

Original files and original-image links are unchanged. Photo dialogs request the original through Next/Image only when opened. Other previews use the generated display copies, still passing through Next/Image for the requested viewport resolution. Asset totals are not page transfer totals.

Lazy image `sizes` declarations use `auto` so supporting browsers select against the actual rendered width, with layout-specific fallback sizes. This also accounts for the enlarged image inside the existing Berlin display crop. The three-photo strip, two-photo Kilimanjaro row, small city photos and team photo no longer share one 75vw estimate.

## Scene lifecycle and interaction

- The module may preload when a scrolling visitor approaches the scene. This does not start a renderer, does not run at the top of a fresh homepage, and respects `Save-Data`. Rendering begins on visibility.
- A scene outside the viewport or in a hidden browser tab uses no render loop. Re-entry resumes the existing scene; local animation phases avoid a clock reset moving the planets abruptly. Pausing gives immediate, stable positioning while keeping controls usable.
- Sphere, camera and drag calculations reuse vectors. Sphere vertices use unit geometry and mesh scaling, so selection and viewport resizing do not rebuild the sphere mesh. Satellite gradients and anchor lists are stable between relevant changes.
- Connections reuse dynamic vertex buffers and only upload changed endpoints. Geometry, material and context-event cleanup remains explicit; removed nodes leave the position cache.
- A dragged sphere follows the captured pointer directly. On release it can spring back with the release velocity. Cancel, lost capture, window blur and leaving the viewport release the drag state and re-enable camera control. Native cancellation listeners are attached once to the canvas, since R3F does not forward these events to mesh handlers. Another pointer cannot take over a drag.
- On high-density screens, dragging a sphere or rotating the scene temporarily uses DPR 1 instead of up to 1.5. Full resolution returns 150 ms after interaction ends. This reduces the drawing-buffer pixel budget by up to 56% during movement without reducing the resting image quality; it is not a claim of a 56% frame-rate increase.
- Context loss or initialization failure replaces the canvas with recovery controls. The catalog, selected technology and case-study links remain usable; retry retains that selection and the last camera view.

## History return

Browser Back restores the earlier homepage's selected category, project, technology, pause setting, zoom/orientation, list position and document scroll position. A document-local cache holds at most eight home visits; it does not retain WebGL contexts across document loads. The camera snapshot is taken on completion of camera movement and on scene cleanup. Returning nodes do not replay their initial expansion animation.

A new Home link still starts at the top. Reloading the homepage still clears its old section hash and starts at the top, including consecutive reloads. Deliberate incoming section links and project-detail chapter links continue to work.

## Validation

`tests/layout/media-and-scene.spec.ts` covers responsive image requests and original photo viewing, three Back/Forward cycles with a selected technology and zoomed camera, drag cancellation, stopped/restarted offscreen rendering, and context-loss recovery. Existing project, keyboard, layout and consecutive-reload checks remain in place.

Validation on 20 November 2026: lint, TypeScript and the production build passed; the full layout suite passed 158 tests with 10 existing skips. Drag tests include DPR 2, resolution restoration, native cancellation without a subsequent mouse-up, and two-finger touch cancellation. Homepage and API-case screenshots were reviewed at 1440, 768 and 390 pixels, with no horizontal overflow or browser errors.

Benchmarks use local production builds in Linux Chromium. They are not Vercel field measurements, and software-rendered frame rates must not be presented as real-phone GPU performance.

### Local comparison

Chromium 154, restored `main` at `7fb2d1e` versus this branch. Mobile network simulation used 390×844, DPR 2, 1.6 Mbps download, 150 ms latency and 4× CPU throttling. Desktop used 1440×900, DPR 1, 10 Mbps and 40 ms latency. Browser caches were disabled; server image caches may be warm. Startup results are three-run medians and include automatic Next.js route prefetches in the transfer totals.

| Measurement | Restored main | Performance branch |
| --- | ---: | ---: |
| Mobile summit-photo preview, including response overhead | 107.5 KiB / 640 px | 39.8 KiB / 384 px |
| Mobile school-photo preview, including response overhead | 61.9 KiB / 640 px | 26.1 KiB / 384 px |
| Desktop initial transfer | 323 KiB | 328 KiB |
| Mobile initial transfer | 252 KiB | 257 KiB |
| Desktop LCP | 0.31 s | 0.42 s |
| Mobile LCP | 0.88 s | 0.86 s |
| Overview: sampled JS allocation per animation frame | 38.9 KiB | 33.9 KiB |
| Expanded project and technology: sampled JS allocation per frame | 44.8 KiB | 42.2 KiB |

The initial screen has no demonstrated speed improvement: the small additional transfer pays for restoration and recovery behavior. Both versions had zero layout shift in these startup runs. A direct jump to the unprepared 3D section on the slow-mobile profile still took about 4–5 seconds (one candidate run: 4.61 s); early loading helps a gradual scroll, not an instantaneous jump. The project catalog remains available during that wait.

Animation allocations use two four-second runs per state at desktop resolution, without CPU/network throttling, sampled with CDP HeapProfiler at 4 KiB intervals. The reduction was approximately 13% in the overview and 6% with a technology expanded; measured software-rendered frame throughput was similar. After each of five expand/technology/reset cycles, the candidate retained 110 WebGL buffers and the baseline 114, with no growth within either sequence. These measurements support reduced allocation and stable repeated use, not a general memory-leak or real-device frame-rate claim.
