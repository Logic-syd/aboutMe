import { expect, test, type Page } from '@playwright/test';

async function expectHomepageTop(page: Page, url: string) {
  // Wait for hydration and lazy content as well as the browser's own scroll
  // restoration; an assertion at the first paint can miss a later jump.
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(url);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole('heading', { name: 'Yidan Shao.', exact: true })).toBeInViewport();
}

test('project selection stays local and consecutive homepage refreshes start at the top', async ({ page }) => {
  await page.goto('/?source=refresh-check');
  await page.getByRole('tab', { name: /^Personal / }).click();
  const project = page.locator('#personal-projects .graph-project-entry > button').first();
  await project.click();
  await expect(project).toHaveAttribute('aria-expanded', 'true');
  await expect(page).toHaveURL('/?source=refresh-check');
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

  for (let refresh = 0; refresh < 2; refresh++) {
    await page.reload();
    await expectHomepageTop(page, '/?source=refresh-check');
  }
});

test('homepage refresh clears a previous catalog anchor but explicit section links still work', async ({ page }) => {
  await page.goto('/?source=shared#personal-projects');
  await expect(page.getByRole('tab', { name: /^Personal / })).toHaveAttribute('aria-selected', 'true');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

  for (let refresh = 0; refresh < 2; refresh++) {
    await page.reload();
    await expectHomepageTop(page, '/?source=shared');
  }

  await page.getByRole('link', { name: 'All skills' }).click();
  await expect(page).toHaveURL('/?source=shared#skills');
  await expect(page.locator('#skills h2')).toBeInViewport();
});

test('refresh preserves a project detail chapter link', async ({ page }) => {
  await page.goto('/projects/isolarcloud#data-access');
  await expect(page.locator('#data-access')).toBeInViewport();
  await page.reload();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('/projects/isolarcloud#data-access');
  await expect(page.locator('#data-access')).toBeInViewport();
});
