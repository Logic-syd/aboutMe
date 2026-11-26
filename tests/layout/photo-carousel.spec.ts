import { expect, test } from '@playwright/test';

test('the photo carousel stays compact and every original is reachable', async ({ page }) => {
  await page.goto('/#gallery');
  const gallery = page.getByRole('region', { name: 'Personal photographs' });
  await expect(gallery).toBeVisible();
  const track = gallery.getByLabel('Photo slides');
  const slides = gallery.getByRole('group', { name: /^\d+ of \d+:/ });
  const next = gallery.getByRole('button', { name: 'Next photo', exact: true });
  const previous = gallery.getByRole('button', { name: 'Previous photo', exact: true });
  const status = gallery.getByRole('status');
  const total = await slides.count();
  expect(total).toBe(12);
  await expect(previous).toBeDisabled();
  const height = (await page.locator('#gallery').boundingBox())!.height;
  expect(height).toBeLessThanOrEqual(page.viewportSize()!.width > 800 ? page.viewportSize()!.height - 80 : 850);
  await track.scrollIntoViewIfNeeded();
  const scrollY = await page.evaluate(() => window.scrollY);

  for (let index = 0; index < total; index++) {
    await expect(status).toContainText(`Photo ${index + 1} of ${total}`);
    const image = slides.nth(index).locator('.personal-photo-trigger img');
    await expect(image).toBeInViewport({ ratio: 0.99 });
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const proportions = await image.evaluate(el => {
      const bounds = el.getBoundingClientRect();
      return { displayed: bounds.width / bounds.height, original: Number(el.getAttribute('width')) / Number(el.getAttribute('height')) };
    });
    expect(proportions.displayed).toBeCloseTo(proportions.original, 2);
    if (index < total - 1) await next.click();
  }
  await expect(next).toBeDisabled();
  expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(scrollY, 0);
  await previous.click();
  await expect(status).toContainText(`Photo ${total - 1} of ${total}`);

  await track.focus();
  await page.keyboard.press('Home');
  await expect(status).toContainText(`Photo 1 of ${total}`);
  await page.keyboard.press('ArrowRight');
  await expect(status).toContainText(`Photo 2 of ${total}`);
  const trigger = slides.nth(1).getByRole('button', { name: /^Open photo:/ });
  await trigger.click();
  const dialog = slides.nth(1).getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('src', /url=%2Fimages%2Fpersonal%2Fgraduation-classmates.jpg/);
  await page.keyboard.press('ArrowRight');
  await expect(status).toContainText(`Photo 2 of ${total}`);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.keyboard.press('ArrowRight');
  await expect(slides.nth(2).getByRole('button', { name: /^Open photo:/ })).toBeFocused();
  await page.keyboard.press('End');
  await expect(status).toContainText(`Photo ${total} of ${total}`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test('a touch swipe changes the photo without moving the page sideways', async ({ page }) => {
  test.skip(page.viewportSize()!.width > 800, 'Touch gallery on a narrow screen');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#gallery');
  const gallery = page.getByRole('region', { name: 'Personal photographs' });
  const track = gallery.getByLabel('Photo slides');
  await track.scrollIntoViewIfNeeded();
  const bounds = (await track.boundingBox())!;
  const before = await track.evaluate(el => el.scrollLeft);
  const x = bounds.x + bounds.width * 0.8;
  const y = bounds.y + bounds.height / 2;
  const touch = await page.context().newCDPSession(page);
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 0 }] });
  for (let step = 1; step <= 12; step++) {
    await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - step * 18, y, id: 0 }] });
  }
  await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(before + 50);
  await expect(gallery.getByRole('status')).not.toContainText('Photo 1 of 12');
  await expect(gallery.getByRole('dialog')).toHaveCount(0);
  expect(await page.evaluate(() => window.scrollX)).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
});
