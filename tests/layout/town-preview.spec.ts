import { expect, test } from '@playwright/test';

test('desktop town previews stay inside the visible town for buildings and tabs', async ({ page }) => {
  test.skip(page.viewportSize()!.width <= 800, 'Narrow viewports use the modal sheet.');
  await page.goto('/');

  const frame = page.locator('[data-town-frame]');
  const triggers = frame.locator('[data-town-trigger]');
  for (const trigger of await triggers.all()) {
    await trigger.click();
    const preview = page.getByRole('region').filter({ has: page.getByRole('button', { name: 'Close preview', exact: true }) });
    await expect(preview).toBeVisible();
    const bounds = await preview.boundingBox();
    const town = await frame.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(Math.max(0, town!.x));
    expect(bounds!.y).toBeGreaterThanOrEqual(Math.max(0, town!.y));
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(Math.min(page.viewportSize()!.width, town!.x + town!.width));
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(Math.min(page.viewportSize()!.height, town!.y + town!.height));
    await page.keyboard.press('Escape');
    await expect(preview).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test('mobile town sheet is modal, keeps every work link reachable and restores focus', async ({ page }) => {
  test.skip(page.viewportSize()!.width > 800, 'Desktop uses an anchored preview.');
  await page.goto('/');
  const trigger = page.locator('[data-town-trigger]:not([data-map-building])').filter({ hasText: /^Work$/ });
  await trigger.click();
  const sheet = page.getByRole('dialog', { name: 'Commercial projects.', exact: true });
  await expect(sheet).toBeVisible();
  expect(await sheet.evaluate(element => element.matches(':modal'))).toBe(true);
  await expect(sheet.locator('a[href^="/projects/"]')).toHaveCount(4);
  await expect(sheet.getByRole('link').last()).toHaveText('More projects');

  const bounds = await sheet.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  for (const link of await sheet.getByRole('link').all()) {
    await link.focus();
    await expect(link).toBeInViewport();
  }
  await page.keyboard.press('Tab');
  await expect(sheet.getByRole('button', { name: 'Close preview' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(sheet.getByRole('link').last()).toBeFocused();

  const scrollY = await page.evaluate(() => window.scrollY);
  await page.mouse.move(10, 10);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollY);
  await page.keyboard.press('Escape');
  await expect(sheet).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');

  await trigger.click();
  await expect(sheet).toBeVisible();
  await page.mouse.click(10, 10);
  await expect(sheet).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('a short mobile viewport lets the work sheet scroll without losing its action', async ({ page }) => {
  test.skip(page.viewportSize()!.width > 800, 'Mobile sheet overflow behavior.');
  await page.setViewportSize({ width: 375, height: 360 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore Commercial work', exact: true }).click();
  const sheet = page.getByRole('dialog', { name: 'Commercial projects.', exact: true });
  await expect(sheet).toBeVisible();
  const more = sheet.getByRole('link', { name: 'More projects', exact: true });
  await more.focus();
  await expect(more).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await more.click();
  await expect(sheet).toHaveCount(0);
  await expect(page).toHaveURL(/#work-projects$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});
