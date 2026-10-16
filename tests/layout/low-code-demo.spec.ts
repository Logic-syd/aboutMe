import { expect, test, type Page, type Locator } from '@playwright/test';

async function fits(page: Page) {
  const result = await page.locator('#app-builder').evaluate(chapter => {
    const demo = chapter.querySelector<HTMLElement>('[data-case-demo]')!;
    return {
      horizontal: document.documentElement.scrollWidth <= innerWidth + 1 && demo.scrollWidth <= demo.clientWidth + 1,
      chapter: innerWidth <= 800 || chapter.getBoundingClientRect().height <= innerHeight + 2,
      frame: demo.getBoundingClientRect().bottom <= chapter.getBoundingClientRect().bottom,
    };
  });
  expect(result).toEqual({ horizontal: true, chapter: true, frame: true });
}

// Start the native drag before scrolling its destination into view; palette and
// nested canvas targets need not share a viewport on a phone or a short laptop.
async function drag(page: Page, source: Locator, target: Locator) {
  await source.scrollIntoViewIfNeeded();
  const from = (await source.boundingBox())!;
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
  await page.mouse.down();
  await page.mouse.move(from.x + from.width / 2 + 8, from.y + from.height / 2, { steps: 4 });
  await target.scrollIntoViewIfNeeded();
  const to = (await target.boundingBox())!;
  await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 8 });
  await page.mouse.move(to.x + to.width / 2 + 1, to.y + to.height / 2);
  await page.mouse.up();
}

test('low-code builder connects drag, properties, themes and working form values', async ({ page }) => {
  await page.goto('/projects/low-code-platform');
  const demo = page.locator('[data-case-demo="low-code"]');
  await drag(page, demo.getByRole('button', { name: 'Add Text field', exact: true }), demo.getByTestId('drop-visit'));
  await expect(demo.locator('[data-block-id="visit"] [data-block-id="block-1"]')).toHaveCount(1);
  await demo.getByLabel('Label', { exact: true }).fill('Location');
  await demo.getByLabel('Required field').check();
  await demo.getByLabel('Place inside').selectOption('');
  await expect(demo.locator('[data-block-id="visit"] [data-block-id="block-1"]')).toHaveCount(0);
  await demo.getByRole('button', { name: 'Move up', exact: false }).click();
  const order = await demo.locator('[data-block-id]').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-block-id')));
  expect(order.indexOf('block-1')).toBeLessThan(order.indexOf('visit'));
  await demo.getByRole('button', { name: 'Try your app', exact: false }).click();
  await demo.getByRole('button', { name: 'Submit sample', exact: false }).click();
  expect(await demo.getByLabel('Location', { exact: false }).evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  await expect(demo.getByLabel('Submitted sample')).toHaveCount(0);
  await demo.getByLabel('Site name', { exact: false }).fill('West depot');
  await demo.getByLabel('Location', { exact: false }).fill('Munich');
  await demo.getByLabel('Priority', { exact: true }).selectOption('Urgent');
  await demo.getByRole('button', { name: 'Plum theme', exact: true }).click();
  await expect(demo.locator('[data-theme]')).toHaveAttribute('data-theme', 'Plum');
  await expect(demo.getByLabel('Location', { exact: false })).toHaveValue('Munich');
  await demo.getByRole('button', { name: 'Submit sample', exact: false }).click();
  await expect(demo.getByLabel('Submitted sample')).toContainText('Munich');
  await expect(demo.getByLabel('Submitted sample')).toContainText('Urgent');
  await fits(page);
  await demo.getByRole('button', { name: 'Build', exact: true }).click();
  await demo.getByLabel('Place inside').selectOption('visit');
  await demo.getByRole('button', { name: 'Try your app', exact: false }).click();
  await expect(demo.getByLabel('Location', { exact: false })).toHaveValue('Munich');
  await demo.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(demo.locator('[data-block-id]')).toHaveCount(4);
  await expect(demo.locator('[data-theme]')).toHaveAttribute('data-theme', 'Forest');
  await expect(demo.locator('#sample-site')).toHaveValue('');
});

test('low-code builder rejects cycles and depth overflow and supports click-only editing', async ({ page }) => {
  await page.goto('/projects/low-code-platform');
  const demo = page.locator('[data-case-demo="low-code"]');
  await demo.getByRole('button', { name: 'Site visit 2 items', exact: true }).click();
  await demo.getByRole('button', { name: 'Add Field group', exact: true }).click();
  await expect(demo.locator('[data-block-id="visit"] [data-block-id="block-1"]')).toHaveCount(1);
  await demo.getByLabel('Label', { exact: true }).fill('Details');
  await drag(page, demo.getByRole('button', { name: 'Move Site visit', exact: true }), demo.getByTestId('drop-block-1'));
  await expect(demo.getByRole('status')).toContainText('cannot be placed inside itself');
  await expect(demo.locator('[data-block-id]')).toHaveCount(5);
  await demo.getByRole('button', { name: 'Details 0 items', exact: true }).click();
  await demo.getByRole('button', { name: 'Add Field group', exact: true }).click();
  await expect(demo.getByRole('status')).toContainText('two nested field groups');
  await expect(demo.locator('[data-block-id]')).toHaveCount(5);
  await demo.getByRole('button', { name: 'Add Text field', exact: true }).click();
  await expect(demo.locator('[data-block-id="block-1"] [data-block-id]')).toHaveCount(1);
  await demo.getByRole('button', { name: 'Details 1 items', exact: true }).click();
  await demo.getByRole('button', { name: 'Remove component', exact: true }).click();
  await expect(demo.locator('[data-block-id]')).toHaveCount(4);
  for (let i = 0; i < 6; i++) await demo.getByRole('button', { name: 'Add Heading', exact: true }).click();
  await expect(demo.locator('[data-block-id]')).toHaveCount(10);
  await demo.getByRole('button', { name: 'Add Heading', exact: true }).click();
  await expect(demo.getByRole('status')).toContainText('10 components');
  await expect(demo.locator('[data-block-id]')).toHaveCount(10);
  await fits(page);
});
