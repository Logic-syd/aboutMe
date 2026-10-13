import { expect, test, type Locator, type Page } from '@playwright/test';
import { projects } from '../../lib/projects';

async function expectCompleteScreens(page: Page) {
  const issues = await page.evaluate(() => {
    const issues: string[] = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Page overflows horizontally');
    if (innerWidth <= 800) return issues;
    const screens = [...document.querySelectorAll<HTMLElement>('[data-case-screen]')];
    for (const screen of screens) {
      const bounds = screen.getBoundingClientRect();
      const expected = screen.dataset.caseScreen === 'intro' ? innerHeight - 64 : innerHeight;
      if (bounds.height > expected + 2) issues.push(`${screen.id || 'intro'}: exceeds the desktop reading budget (${Math.round(bounds.height)} > ${expected})`);
      const heading = screen.querySelector('.case-screen-heading');
      const body = screen.querySelector('.case-screen-body');
      const first = body?.firstElementChild;
      if (heading && first && first.getBoundingClientRect().top - heading.getBoundingClientRect().bottom > 32) issues.push(`${screen.id}: empty gap between heading and content`);
      if (screen.dataset.caseScreen === 'intro') {
        const style = getComputedStyle(screen);
        const children = [...screen.children];
        const used = children.reduce((sum, child) => sum + child.getBoundingClientRect().height, 0) + Math.max(0, children.length - 1) * parseFloat(style.rowGap || '0') + parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        if (bounds.height - used > 8) issues.push('Intro contains artificial empty space');
      }
      // Headings, full media frames and tool panels must fit together, including after a selection.
      for (const child of [...screen.children, ...screen.querySelectorAll('.case-screen-body > *')]) {
        const rect = child.getBoundingClientRect();
        if (rect.bottom > bounds.bottom + 2 || rect.top < bounds.top - 2) issues.push(`${screen.id || 'intro'}: ${child.className} crosses chapter boundary`);
      }
      for (const panel of screen.querySelectorAll<HTMLElement>('.case-note-panel')) {
        if (panel.scrollHeight > panel.clientHeight + 2) issues.push(`${screen.id}: prose needs scrolling`);
      }
    }
    return issues;
  });
  expect(issues).toEqual([]);
}

async function expectDemoFits(demo: Locator) {
  const issues = await demo.evaluate(element => {
    const issues: string[] = [];
    if (element.scrollWidth > element.clientWidth + 1) issues.push('Tool overflows horizontally');
    if (innerWidth <= 800) return issues;
    const chapter = element.closest('[data-case-screen]')!.getBoundingClientRect();
    const bounds = element.getBoundingClientRect();
    if (bounds.bottom > chapter.bottom + 2) issues.push('Tool crosses chapter boundary');
    for (const child of element.children) {
      if (child.getBoundingClientRect().bottom > bounds.bottom + 2) issues.push('Tool panel crosses frame boundary');
    }
    for (const card of element.querySelectorAll('[class*="empty"], [class*="verify"], [class*="failure"], [class*="preparing"]')) {
      const cardBounds = card.getBoundingClientRect();
      for (const child of card.children) {
        if (child.getBoundingClientRect().bottom > cardBounds.bottom + 2) issues.push('Card contents overlap the following block');
      }
    }
    return issues;
  });
  expect(issues).toEqual([]);
}

// Iterate the source catalog so additions automatically inherit this layout contract.
for (const project of projects) {
  test(`${project.slug}: complete chapters and readable alternatives`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/projects/${project.slug}`);
    await expect(page.locator('[data-case-screen="intro"]')).toHaveCount(1);
    expect(await page.locator('[data-case-screen="chapter"]').count()).toBeGreaterThan(0);
    await expectCompleteScreens(page);
    const home = page.getByRole('link', { name: 'Back to home', exact: true });
    await expect(home).toHaveAttribute('href', '/');
    expect(await home.evaluate(element => getComputedStyle(element).position)).toBe('fixed');
    for (const screen of await page.locator('[data-case-screen]').all()) {
      await screen.evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
      const accessible = await home.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const hit = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        const main = document.querySelector('main')!;
        const contentLeft = main.getBoundingClientRect().left + parseFloat(getComputedStyle(main).paddingLeft);
        return bounds.top >= 0 && bounds.bottom <= innerHeight && bounds.right <= contentLeft && element.contains(hit);
      });
      expect(accessible, 'Home remains clickable in the clear side gutter at each chapter').toBe(true);
    }

    for (const notes of await page.locator('.case-notes').all()) {
      const tabs = notes.getByRole('tab');
      const initialHeight = await notes.evaluate(element => element.getBoundingClientRect().height);
      for (const tab of await tabs.all()) {
        await tab.click();
        await expect(tab).toHaveAttribute('aria-selected', 'true');
        await expect(notes.getByRole('tabpanel')).toBeVisible();
        expect(Math.abs(await notes.evaluate(element => element.getBoundingClientRect().height) - initialHeight), 'Topic selections keep the chapter stable').toBeLessThan(2);
        if (await tabs.count() > 1) await expect(notes.locator('.case-note-panel[aria-hidden=true]').first()).toHaveAttribute('inert', '');
        await expectCompleteScreens(page);
      }
      await tabs.first().focus();
      await page.keyboard.press('End');
      await expect(tabs.last()).toBeFocused();
    }

    for (const group of await page.locator('.case-media-tabs, [aria-label="Explore iSolarCloud product screens"]').all()) {
      for (const button of await group.getByRole('button').all()) {
        await button.click();
        await expect(button).toHaveAttribute('aria-pressed', 'true');
        await expectCompleteScreens(page);
        for (const image of await group.locator('..').locator('img').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
        }
      }
    }
    for (const image of await page.locator('.case-gallery-view img, figure[class*="productFigure"] img').all()) {
      await expect(image).toBeVisible();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await image.evaluate(element => getComputedStyle(element).objectFit)).toBe('contain');
      await expect(image.locator('..')).toHaveAttribute('target', '_blank');
    }
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await home.focus();
    await expect(home).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/');
    await expect(page.locator('.case-home-link')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expect(errors).toEqual([]);
  });
}

test('interactive consoles keep a complete frame when results expand', async ({ page }) => {
  await page.goto('/projects/renewable-energy-api');
  const api = page.locator('[data-case-demo="api"]');
  await api.getByRole('button', { name: 'Run sample request', exact: true }).click();
  await expect(api.getByRole('status')).toHaveText('Sample response received');
  await api.locator('summary').click();
  await expect(api.locator('pre')).toContainText('result_code');
  await expectDemoFits(api);
  await api.getByLabel('Sample application', { exact: true }).selectOption('restricted');
  await api.getByRole('button', { name: 'Run sample request', exact: true }).click();
  await expect(api.getByRole('status')).toHaveText('Request stopped before the gateway');
  await expectDemoFits(api);
  await expectCompleteScreens(page);

  await page.goto('/projects/sports-education');
  const sports = page.locator('[data-case-demo="sports"]');
  await page.clock.install();
  await sports.getByRole('button', { name: 'Start session', exact: true }).click();
  await page.clock.runFor(13_500);
  await expect(sports.getByRole('button', { name: 'Play again', exact: true })).toBeVisible();
  await expect(sports.getByTestId('reps-2')).toHaveText('6');
  await expectDemoFits(sports);
  await expectCompleteScreens(page);

  await page.goto('/projects/isolarcloud');
  await page.getByRole('button', { name: 'Try sample export', exact: true }).click();
  const exporter = page.locator('[data-case-demo="export"]');
  await exporter.getByRole('button', { name: 'Request sample export', exact: true }).click();
  await expect(exporter.getByRole('status')).toHaveText('Confirm before creating a task');
  await expectDemoFits(exporter);
  await exporter.getByRole('button', { name: 'Simulate confirmation & create task', exact: true }).click();
  await page.clock.runFor(2_000);
  await expect(exporter.getByRole('status')).toHaveText('Your sample is ready');
  await exporter.locator('summary').click();
  await expect(exporter.getByLabel('Sample records')).toContainText('sample-inverter');
  await expectDemoFits(exporter);
  await exporter.getByRole('button', { name: 'Verify & download sample', exact: true }).click();
  const downloaded = page.waitForEvent('download');
  await exporter.getByRole('button', { name: 'Confirm & download sample CSV', exact: true }).click();
  expect((await downloaded).suggestedFilename()).toBe('sample-energy-export.csv');
  await expectDemoFits(exporter);
  await exporter.getByRole('button', { name: 'Expire export task', exact: true }).click();
  await expect(exporter.getByRole('status')).toHaveText('Export no longer available');
  await expectDemoFits(exporter);
  await expectCompleteScreens(page);
});

test('homepage keeps text navigation, compact side dots and top contact links', async ({ page }) => {
  await page.goto('/');
  const top = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  const sidebar = page.locator('.floating-sections');
  const expected = ['My Projects', 'About Me', 'My Work', 'Growth Map'];
  expect(await top.getByRole('link').evaluateAll(links => links.map(link => link.getAttribute('aria-label')))).toEqual(expected);
  for (const label of await top.locator('.nav-full-label').all()) await expect(label).toBeVisible();
  for (const name of expected) await expect(top.getByRole('link', { name, exact: true })).toBeVisible();
  await expect(page.locator('.header-connect').getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://linkedin.com/in/yidanshao/');
  await expect(page.locator('.header-connect').getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/Logic-syd');
  if (page.viewportSize()!.width > 800) {
    await expect(sidebar).toBeVisible();
    expect(await sidebar.evaluate(element => element.getBoundingClientRect().width)).toBeLessThanOrEqual(28);
    await sidebar.getByRole('link', { name: 'About Me', exact: true }).click();
    await expect(page).toHaveURL(/#about$/);
    await expect(sidebar.getByRole('link', { name: 'About Me', exact: true })).toHaveAttribute('aria-current', 'location');
    await expect(top.getByRole('link', { name: 'About Me', exact: true })).toHaveAttribute('aria-current', 'location');
  } else {
    await expect(sidebar).toBeHidden();
    await top.getByRole('link', { name: 'My Projects', exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
