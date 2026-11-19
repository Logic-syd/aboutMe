import { expect, test, type Page } from '@playwright/test';
import { projects } from '../../lib/projects';

const drawerFor = (page: Page) => page.getByRole('dialog', { name: `Projects ${projects.length}`, exact: true });

test('the header opens the complete project directory with modal keyboard navigation', async ({ page }) => {
  await page.goto('/projects/renewable-energy-api');
  const main = page.locator('main');
  const before = await main.boundingBox();
  const headerLink = page.locator('.site-header').getByRole('link', { name: 'Projects', exact: true });
  await headerLink.click();
  const drawer = drawerFor(page);
  await expect(drawer).toBeVisible();
  expect(await drawer.evaluate(element => element.matches(':modal'))).toBe(true);
  await expect(drawer.getByRole('link')).toHaveCount(projects.length);
  for (const group of ['commercial', 'independent'] as const) {
    await expect(drawer.getByRole('region', { name: `${group === 'commercial' ? 'Work' : 'Personal'} ${projects.filter(project => project.kind === group).length}` }).getByRole('link')).toHaveCount(projects.filter(project => project.kind === group).length);
  }
  await expect(drawer.locator('[aria-current="page"]')).toHaveAttribute('href', '/projects/renewable-energy-api');
  await expect(drawer.locator('[aria-current="page"]')).toBeInViewport();
  await expect(drawer.getByRole('button', { name: 'Close project list' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(drawer.getByRole('link').last()).toBeFocused();
  await expect(drawer.getByRole('link').last()).toBeInViewport();
  await page.keyboard.press('Tab');
  await expect(drawer.getByRole('button', { name: 'Close project list' })).toBeFocused();
  await page.mouse.move(page.viewportSize()!.width - 4, 100);
  await page.mouse.wheel(0, 450);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(headerLink).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  const after = await main.boundingBox();
  expect(Math.abs(before!.width - after!.width)).toBeLessThan(1);
  expect(Math.abs(before!.x - after!.x)).toBeLessThan(1);
});

test('the edge handle preserves reading position and switches cases without stale modal state', async ({ page }) => {
  await page.goto('/projects/renewable-energy-api');
  await page.locator('[data-case-screen="chapter"]').last().scrollIntoViewIfNeeded();
  const y = await page.evaluate(() => window.scrollY);
  const trigger = page.getByRole('button', { name: 'Open project list', exact: true });
  const bounds = await trigger.boundingBox();
  expect(bounds!.width).toBeGreaterThanOrEqual(44);
  expect(bounds!.height).toBeGreaterThanOrEqual(44);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(await page.locator('main').evaluate(element => element.getBoundingClientRect().left + parseFloat(getComputedStyle(element).paddingLeft)));
  await trigger.click();
  let drawer = drawerFor(page);
  await drawer.locator('[aria-current="page"]').click();
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(y);

  await trigger.click();
  await page.mouse.click(page.viewportSize()!.width - 4, 100);
  await expect(drawer).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(y);
  await trigger.click();
  await drawer.locator('a[href="/projects/love-story-theater"]').click();
  await expect(page).toHaveURL('/projects/love-story-theater');
  await expect(drawer).toBeHidden();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.getByRole('button', { name: 'Open project list', exact: true }).click();
  drawer = drawerFor(page);
  await expect(drawer.locator('[aria-current="page"]')).toHaveAttribute('href', '/projects/love-story-theater');
  await expect(drawer.locator('[aria-current="page"]')).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL('/projects/renewable-energy-api');
  await expect(drawer).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open project list', exact: true })).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('the case ending uses the same drawer and switching to home unlocks scrolling', async ({ page }) => {
  await page.goto('/projects/catch-that-train');
  await page.getByRole('link', { name: 'All projects', exact: true }).click();
  const drawer = drawerFor(page);
  await expect(drawer).toBeVisible();
  await expect(drawer.locator('[aria-current="page"]')).toHaveAttribute('href', '/projects/catch-that-train');
  await drawer.getByRole('button', { name: 'Close project list' }).click();
  await page.getByRole('link', { name: 'Back to home', exact: true }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('button', { name: 'Open project list', exact: true })).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('a short phone viewport keeps close visible and every project reachable', async ({ page }) => {
  test.skip(page.viewportSize()!.width > 800, 'Short phone drawer layout.');
  await page.setViewportSize({ width: 375, height: 360 });
  await page.goto('/projects/isolarcloud');
  await page.getByRole('button', { name: 'Open project list', exact: true }).click();
  const drawer = drawerFor(page);
  const bounds = await drawer.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThan(375);
  expect(bounds!.y + bounds!.height).toBeLessThan(360);
  for (const link of await drawer.getByRole('link').all()) {
    await link.focus();
    await expect(link).toBeInViewport();
    await expect(drawer.getByRole('button', { name: 'Close project list' })).toBeInViewport();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
});


test('the homepage directory opens inline without adding another fixed side control', async ({ page }) => {
  await page.goto('/#project-explorer');
  const trigger = page.getByRole('link', { name: 'Browse project list', exact: true });
  await expect(page.getByRole('button', { name: 'Open project list', exact: true })).toHaveCount(0);
  await trigger.click();
  const drawer = drawerFor(page);
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole('link')).toHaveCount(projects.length);
  await expect(drawer.locator('[aria-current="page"]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await drawer.locator('a[href="/projects/wordweave"]').click();
  await expect(page).toHaveURL('/projects/wordweave');
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});
