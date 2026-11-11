import { expect, test, type Locator, type Page } from '@playwright/test';
import { graphLeaves } from '../../lib/graph';
import { projects } from '../../lib/projects';

async function expectReadableLabels(page: Page, stage: Locator, context: string) {
  // The mobile catalog scrolls naturally; inspect its corresponding scene after
  // returning to it, without accidentally hovering another planet.
  await page.mouse.move(1, 1);
  await stage.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await expect.poll(async () => stage.evaluate(element => {
    const issues: string[] = [];
    const scene = element.getBoundingClientRect();
    const controls = element.querySelector('.three-controls')!.getBoundingClientRect();
    const labels = [...element.querySelectorAll<HTMLElement>('[data-node-id]')]
      .filter(label => label.getClientRects().length && getComputedStyle(label).visibility !== 'hidden')
      .map(label => ({ id: label.dataset.nodeId!, bounds: label.getBoundingClientRect() }));
    const overlap = (a: DOMRect, b: DOMRect) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
      * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    for (let index = 0; index < labels.length; index++) {
      const label = labels[index], bounds = label.bounds;
      if (bounds.left < scene.left - 2 || bounds.right > scene.right + 2 || bounds.top < scene.top - 2 || bounds.bottom > scene.bottom + 2) {
        issues.push(`${label.id} crosses the scene boundary`);
      }
      if (overlap(bounds, controls) > 12) issues.push(`${label.id} overlaps the view controls`);
      for (const other of labels.slice(index + 1)) {
        if (overlap(bounds, other.bounds) > 12) issues.push(`${label.id} overlaps ${other.id}`);
      }
    }
    if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Page overflows horizontally');
    return issues;
  }), { message: context, timeout: 5_000 }).toEqual([]);
}

test('constellation selection keeps contributions accessible and labels clear', async ({ page }) => {
  await page.goto('/#project-explorer');
  const stage = page.locator('.three-stage');
  await stage.scrollIntoViewIfNeeded();
  await expect(stage.locator('canvas')).toBeVisible();
  await expect(stage.locator('[data-node-id="root"]')).toBeVisible();
  await expectReadableLabels(page, stage, 'Overview');

  // Cover short and long titles, different tag counts, and a personal project
  // at the end of the catalog. Do not require every node to carry a label:
  // the narrow layout deliberately puts full text in the adjacent catalog.
  for (const slug of ['renewable-energy-api', 'medical-curriculum', 'low-code-platform', 'love-story-theater']) {
    const projectIndex = projects.findIndex(project => project.slug === slug);
    const project = projects[projectIndex];
    await page.getByRole('tab', { name: project.kind === 'commercial' ? /^Work / : /^Personal / }).click();
    const row = page.locator('.graph-project-entry').filter({ has: page.locator(`a[href="/projects/${slug}"]`) });
    await row.locator(':scope > button').click();
    await expect(row.locator(':scope > button')).toHaveAttribute('aria-expanded', 'true');
    await expect(stage.locator(`[data-node-id="${slug}"]`)).toBeVisible();
    await expectReadableLabels(page, stage, `${slug}: project selection`);

    const tags = row.locator('.project-technology-panel > div > button');
    for (const technology of new Set([0, project.tags.length - 1])) {
      await tags.nth(technology).click();
      await expect(tags.nth(technology)).toHaveAttribute('aria-pressed', 'true');
      const contributions = row.getByRole('list', { name: 'Selected technology contributions' });
      await expect(contributions).toBeVisible();
      await expect(contributions.locator('li')).toHaveText(graphLeaves(projectIndex, technology));
      await expect(stage.locator(`[data-node-id="${slug}-tech-${technology}"]`)).toBeVisible();
      await expectReadableLabels(page, stage, `${slug}: ${project.tags[technology]}`);
    }

    await stage.getByRole('button', { name: 'Reset view', exact: true }).click();
    await expect(page.locator('.graph-project-entry[data-selected="true"]')).toHaveCount(0);
    await expect(page.locator('.project-technology-panel')).toHaveCount(0);
    await expect(stage.locator('[data-node-id="root"]')).toBeVisible();
    await expectReadableLabels(page, stage, `${slug}: reset`);
  }
});
