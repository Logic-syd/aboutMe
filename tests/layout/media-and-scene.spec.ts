import { expect, test, type Page } from '@playwright/test';

async function nextPaint(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

test('photo previews request display-sized assets and the dialog keeps the original', async ({ page }) => {
  await page.goto('/#about');
  const photos = page.locator('.about-photo-timeline img, .outside-work-photos img');
  for (const image of await photos.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const size = await image.evaluate((el: HTMLImageElement) => ({
      requested: Number(new URL(el.currentSrc).searchParams.get('w')),
      needed: el.getBoundingClientRect().width * devicePixelRatio,
      source: new URL(el.currentSrc).searchParams.get('url'),
    }));
    expect(size.requested).toBeLessThanOrEqual(size.needed * 1.9 + 32);
    expect(size.source).toContain('/images/optimized/');
  }
  const photo = page.locator('.outside-work-photo').first();
  const trigger = photo.getByRole('button', { name: /^Open photo:/ });
  await trigger.click();
  const dialog = photo.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src', /url=%2Fimages%2Fpersonal%2Fkilimanjaro-summit.jpg/);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('browser back restores the project, camera and reading position without changing reload behavior', async ({ page }) => {
  await page.goto('/#project-explorer');
  const stage = page.locator('.three-stage');
  await expect(stage.locator('[data-node-id="root"]')).toBeVisible();
  await page.getByRole('tab', { name: /^Personal / }).click();
  const row = page.locator('.graph-project-entry').filter({ has: page.locator('a[href="/projects/wordweave"]') });
  await row.locator(':scope > button').click();
  await row.locator('.project-technology-panel button').first().click();
  await stage.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await stage.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await nextPaint(page);
  const label = stage.locator('[data-node-id="wordweave-tech-0"]');
  const labelPosition = () => label.evaluate(el => {
    const box = el.getBoundingClientRect(), parent = el.closest('.three-stage')!.getBoundingClientRect();
    return { x: box.x - parent.x, y: box.y - parent.y };
  });
  const position = await labelPosition();
  const link = row.locator('a.graph-project-case-link');
  await link.scrollIntoViewIfNeeded();
  await nextPaint(page);
  const scroll = await page.evaluate(() => window.scrollY);
  await link.click();
  await expect(page).toHaveURL('/projects/wordweave');

  for (let visit = 0; visit < 3; visit++) {
    await page.goBack();
    await expect(page).toHaveURL('/#project-explorer');
    await expect(page.getByRole('tab', { name: /^Personal / })).toHaveAttribute('aria-selected', 'true');
    await expect(row.locator(':scope > button')).toHaveAttribute('aria-expanded', 'true');
    await expect(row.locator('.project-technology-panel button').first()).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(scroll, 0);
    await stage.scrollIntoViewIfNeeded();
    await expect(label).toBeVisible();
    await expect.poll(async () => {
      const current = await labelPosition();
      return Math.hypot(current.x - position.x, current.y - position.y);
    }).toBeLessThan(4);
    if (visit < 2) {
      await link.scrollIntoViewIfNeeded();
      await nextPaint(page);
      await page.goForward();
      await expect(page).toHaveURL('/projects/wordweave');
    }
  }
  await page.reload();
  await expect(page).toHaveURL('/');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator('.graph-project-entry[data-selected="true"]')).toHaveCount(0);
});

test('drag cancellation releases the sphere and an offscreen scene stops drawing', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const device = await page.context().newCDPSession(page);
  await device.send('Emulation.setDeviceMetricsOverride', { ...page.viewportSize()!, deviceScaleFactor: 2, mobile: false });
  await page.addInitScript(() => {
    const counter = { calls: 0 };
    Object.assign(window, { sceneDraws: counter });
    const proto = WebGL2RenderingContext.prototype;
    const original = proto.drawElements;
    proto.drawElements = function (...args) { counter.calls++; return original.apply(this, args); };
  });
  await page.goto('/#project-explorer');
  const stage = page.locator('.three-stage');
  const root = stage.locator('[data-node-id="root"]');
  await stage.scrollIntoViewIfNeeded();
  await expect(root).toBeVisible();
  await stage.getByRole('button', { name: 'Pause motion', exact: true }).click();
  await nextPaint(page);
  const bounds = await root.boundingBox();
  const stageBounds = await stage.boundingBox();
  const x = bounds!.x + bounds!.width / 2;
  const y = bounds!.y + bounds!.height / 2 - (stageBounds!.width < 650 ? 45 : 52);
  await page.mouse.move(x, y);
  await page.mouse.down();
  const resolution = () => stage.locator('canvas').evaluate((el: HTMLCanvasElement) => el.width / el.clientWidth);
  await expect.poll(resolution).toBeLessThanOrEqual(1.01);
  await page.mouse.move(x + 48, y - 22, { steps: 6 });
  await expect.poll(async () => (await root.boundingBox())!.x - bounds!.x).toBeGreaterThan(20);
  await stage.locator('canvas').dispatchEvent('pointercancel', { pointerId: 1, pointerType: 'mouse', clientX: x + 48, clientY: y - 22 });
  await expect.poll(async () => Math.abs((await root.boundingBox())!.x - bounds!.x)).toBeLessThan(3);
  await page.mouse.up();
  await expect.poll(resolution).toBeGreaterThan(1.45);
  await page.mouse.move(1, 1);
  await expect.poll(async () => Math.abs((await root.boundingBox())!.x - bounds!.x)).toBeLessThan(3);
  if (page.viewportSize()!.width <= 800) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 0 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 35, y, id: 0 }] });
    await expect.poll(async () => (await root.boundingBox())!.x - bounds!.x).toBeGreaterThan(20);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x + 35, y, id: 0 }, { x: x - 50, y: y - 65, id: 1 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
    await expect.poll(async () => Math.abs((await root.boundingBox())!.x - bounds!.x)).toBeLessThan(3);
    await cdp.detach();
  }
  await stage.getByRole('button', { name: 'Motion paused', exact: true }).click();
  const draws = () => page.evaluate(() => (window as Window & { sceneDraws?: { calls: number } }).sceneDraws!.calls);
  const first = await draws();
  await expect.poll(draws).toBeGreaterThan(first);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(stage).not.toBeInViewport();
  await nextPaint(page);
  await expect.poll(async () => {
    const before = await draws();
    await page.waitForTimeout(250);
    return await draws() - before;
  }).toBe(0);
  await stage.scrollIntoViewIfNeeded();
  const stopped = await draws();
  await expect.poll(draws).toBeGreaterThan(stopped);
  await device.detach();
});

test('losing the graphics context keeps the selected project available for retry', async ({ page }) => {
  await page.goto('/#project-explorer');
  const stage = page.locator('.three-stage');
  await expect(stage.locator('[data-node-id="root"]')).toBeVisible();
  const row = page.locator('.graph-project-entry').first();
  await row.locator(':scope > button').click();
  await row.locator('.project-technology-panel button').first().click();
  await stage.locator('canvas').dispatchEvent('webglcontextlost');
  await expect(stage.getByRole('status')).toContainText('interrupted');
  await expect(row.locator(':scope > button')).toHaveAttribute('aria-expanded', 'true');
  await expect(row.getByRole('list', { name: 'Selected technology contributions' })).toBeVisible();
  await stage.getByRole('button', { name: 'Retry 3D view', exact: true }).click();
  await expect(stage.locator('[data-node-id="renewable-energy-api-tech-0"]')).toBeVisible();
  await expect(row.locator('.project-technology-panel button').first()).toHaveAttribute('aria-pressed', 'true');
});
