import { expect, test } from '@playwright/test';
import { projects } from '../../lib/projects';

test('project categories are discoverable, keyboard accessible and keep all case-study links', async ({ page }) => {
  const response = await page.goto('/#project-explorer');
  // Both catalogs must exist in the server HTML, including the inactive tab.
  const html = await response!.text();
  for (const project of projects) expect(html).toContain(`href="/projects/${project.slug}"`);

  const tabs = page.getByRole('tablist', { name: 'Project categories' });
  const work = tabs.getByRole('tab', { name: /^Work / });
  const personal = tabs.getByRole('tab', { name: /^Personal / });
  const catalog = page.locator('.graph-project-navigation');
  await expect(work).toHaveAttribute('aria-selected', 'true');
  await expect(personal).toBeVisible();
  await expect(catalog.locator('a.graph-project-case-link')).toHaveCount(projects.length);

  const first = page.locator('#professional-work .graph-project-entry').first();
  await first.locator(':scope > button').click();
  await first.locator('.project-technology-panel > div > button').first().click();
  await expect(first.getByRole('list', { name: 'Selected technology contributions' })).toBeVisible();

  await work.focus();
  await page.keyboard.press('ArrowRight');
  await expect(personal).toBeFocused();
  await expect(personal).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#personal-projects')).toBeVisible();
  await expect(page.locator('#professional-work')).toBeHidden();
  await expect(page.locator('.graph-project-entry[data-selected="true"]')).toHaveCount(0);
  await expect(page.locator('.project-technology-panel')).toHaveCount(0);
  await expect(catalog.locator('a.graph-project-case-link')).toHaveCount(projects.length);

  await page.keyboard.press('Home');
  await expect(work).toBeFocused();
  await expect(work).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowLeft');
  await expect(personal).toBeFocused();
  await expect(personal).toHaveAttribute('aria-selected', 'true');
});

test('catalog anchors select the matching category and its controls stay usable', async ({ page, isMobile }) => {
  // The browser profile uses a desktop Chromium instance for every viewport.
  // Exercise the smallest supported phone width as well as the desktop matrix.
  const narrow = isMobile || page.viewportSize()!.width < 801;
  if (narrow) await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#personal-projects');
  const tabs = page.getByRole('tablist', { name: 'Project categories' });
  await expect(tabs.getByRole('tab', { name: /^Personal / })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#personal-projects')).toBeVisible();
  await page.evaluate(() => { window.location.hash = 'professional-work'; });
  await expect(tabs.getByRole('tab', { name: /^Work / })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#professional-work')).toBeVisible();

  const scrollArea = page.locator('.graph-project-groups');
  if (narrow) {
    expect(await scrollArea.evaluate(element => getComputedStyle(element).overflowY)).toBe('visible');
    expect(await scrollArea.evaluate(element => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
  } else {
    await tabs.scrollIntoViewIfNeeded();
    const before = await tabs.boundingBox();
    await scrollArea.evaluate(element => { element.scrollTop = element.scrollHeight; });
    await expect.poll(() => scrollArea.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
    const after = await tabs.boundingBox();
    expect(Math.abs(before!.y - after!.y)).toBeLessThan(1);
    await expect(tabs.getByRole('tab', { name: /^Personal / })).toBeVisible();
  }

  const sizes = await page.evaluate(() => {
    const minimum = (selector: string, property: 'fontSize' | 'minHeight') => Math.min(...Array.from(document.querySelectorAll<HTMLElement>(selector)).map(element => parseFloat(getComputedStyle(element)[property])));
    return {
      title: minimum('.graph-project-entry > button', 'fontSize'),
      details: minimum('.graph-project-case-link', 'fontSize'),
      hint: minimum('.three-stage-hint', 'fontSize'),
      controls: minimum('.three-controls button', 'fontSize'),
      controlTarget: minimum('.three-controls button', 'minHeight'),
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    };
  });
  expect(sizes.title).toBeGreaterThanOrEqual(14);
  expect(sizes.details).toBeGreaterThanOrEqual(12);
  expect(sizes.hint).toBeGreaterThanOrEqual(12);
  expect(sizes.controls).toBeGreaterThanOrEqual(12);
  expect(sizes.controlTarget).toBeGreaterThanOrEqual(44);
  expect(sizes.horizontalOverflow).toBe(false);
});
