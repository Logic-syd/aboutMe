import { expect, test, type Locator, type Page } from '@playwright/test';
import { projects } from '../../lib/projects';
import { siteUrl } from '../../lib/profile';

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
    await expect(page.locator('head link[rel=canonical]')).toHaveAttribute('href', `${siteUrl}/projects/${project.slug}`);
    await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', `${siteUrl}/projects/${project.slug}`);
    await expect(page.locator('[data-case-screen="intro"]')).toHaveCount(1);
    expect(await page.locator('[data-case-screen="chapter"]').count()).toBeGreaterThan(0);
    await expectCompleteScreens(page);
    const home = page.getByRole('link', { name: 'Back to home', exact: true });
    await expect(home).toBeHidden();
    await expect(page.locator('[data-case-screen="intro"]').getByRole('link', { name: 'All projects' })).toHaveCount(0);
    for (const screen of await page.locator('[data-case-screen]').all()) {
      await screen.evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY + 1, behavior: 'instant' }));
      await expect(home).toBeVisible();
      await expect(home).toHaveAttribute('href', '/');
      expect(await home.evaluate(element => getComputedStyle(element).position)).toBe('fixed');
      const accessible = await home.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const hit = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        const main = document.querySelector('main')!;
        const contentLeft = main.getBoundingClientRect().left + parseFloat(getComputedStyle(main).paddingLeft);
        return bounds.top >= 0 && bounds.top <= 16 && bounds.left >= 0 && bounds.left <= 16
          && bounds.width >= 44 && bounds.height >= 44 && bounds.right <= contentLeft && element.contains(hit);
      });
      expect(accessible, 'Back arrow stays clickable in the upper-left corner, clear of each chapter').toBe(true);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect(home).toBeHidden();

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
    for (const image of await page.locator('.case-gallery-view img, .case-mobile-screen img, .case-portrait-grid img, figure[class*="productFigure"] img').all()) {
      await expect(image).toBeVisible();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      expect(await image.evaluate(element => getComputedStyle(element).objectFit)).toBe('contain');
      await expect(image.locator('..')).toHaveAttribute('target', '_blank');
    }
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await expect(home).toBeVisible();
    await home.focus();
    await expect(home).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/');
    await expect(page.locator('.case-home-link')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expect(errors).toEqual([]);
  });
}

test('Catch That Train shows all portrait screenshots without switching', async ({ page }) => {
  await page.goto('/projects/catch-that-train');
  const gallery = page.locator('#product-screens');
  await expect(gallery.locator('img')).toHaveCount(3);
  await expect(gallery.getByRole('button')).toHaveCount(0);
  await expect(page.locator('#mobile-screens')).toHaveCount(0);
  const frames = await gallery.locator('figure').evaluateAll(figures => figures.map(figure => {
    const bounds = figure.getBoundingClientRect();
    const image = figure.querySelector('img')!;
    const caption = figure.querySelector('figcaption')!.getBoundingClientRect();
    return { x: bounds.x, y: bounds.y, right: bounds.right, bottom: bounds.bottom,
      portrait: image.width < image.height, captionBelow: caption.top >= image.getBoundingClientRect().bottom,
      captionFits: caption.bottom <= bounds.bottom + 1 };
  }));
  for (const frame of frames) {
    expect(frame.portrait && frame.captionBelow && frame.captionFits).toBe(true);
  }
  for (let i = 1; i < frames.length; i++) {
    if (page.viewportSize()!.width > 800) {
      expect(Math.abs(frames[i].y - frames[0].y)).toBeLessThan(1);
      expect(frames[i].x).toBeGreaterThan(frames[i - 1].right);
    } else {
      expect(frames[i].y).toBeGreaterThan(frames[i - 1].bottom);
    }
  }
  await expectCompleteScreens(page);
});

test('Pfand Pause presents the 2.0 release with separate desktop and mobile captures', async ({ page }) => {
  await page.goto('/projects/pfand-pause');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Pfand Pause 2.0');
  const desktop = page.locator('#product-screens');
  const mobile = page.locator('#mobile-screens');
  await expect(desktop.locator('img')).toHaveCount(1);
  await expect(mobile.locator('img')).toHaveCount(1);
  await desktop.getByRole('button', { name: 'Packaging guide', exact: true }).click();
  await mobile.getByRole('button', { name: 'Touch puzzle', exact: true }).click();
  for (const [chapter, orientation] of [[desktop, 'landscape'], [mobile, 'portrait']] as const) {
    const image = chapter.locator('img');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth > element.naturalHeight ? 'landscape' : 'portrait')).toBe(orientation);
    const bounds = await chapter.locator('figure').evaluate(figure => {
      const image = figure.querySelector('img')!.getBoundingClientRect();
      const caption = figure.querySelector('figcaption')!.getBoundingClientRect();
      const frame = figure.getBoundingClientRect();
      return { captionBelow: caption.top >= image.bottom - 1, captionFits: caption.bottom <= frame.bottom + 1 };
    });
    expect(bounds).toEqual({ captionBelow: true, captionFits: true });
  }
  await expect(desktop.locator('img')).toHaveAttribute('src', /pfand-pause-v2-desktop-recycling/);
  await expect(mobile.locator('img')).toHaveAttribute('src', /pfand-pause-v2-mobile-game/);
  await expect(mobile).toContainText('English, German and Chinese');
  await expectCompleteScreens(page);
});

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
  const hero = page.locator('section[aria-labelledby="town-title"]');
  await expect(hero.getByLabel('Technologies I work with')).toBeVisible();
  await expect(hero.getByText('Three.js', { exact: true })).toBeVisible();
  await expect(hero.getByRole('link', { name: 'insurance payments', exact: true })).toHaveAttribute('href', '/projects/ronghe-pay');
  const workBuilding = hero.getByRole('button', { name: 'Explore Commercial work', exact: true });
  await workBuilding.click();
  const preview = page.getByRole('region', { name: 'Commercial projects.', exact: true });
  await expect(preview).toBeVisible();
  await expect(preview.locator('a[href^="/projects/"]')).toHaveCount(4);
  await expect(preview.getByRole('link').last()).toHaveText('More projects↗');
  await expect(preview.getByRole('link').last()).toHaveAttribute('href', '#work-projects');
  for (const link of await preview.getByRole('link').all()) {
    expect(await link.evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth && bounds.top >= 0 && bounds.bottom <= innerHeight;
    }), 'All four cases and the More projects action remain inside the viewport').toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(preview).toHaveCount(0);
  await expect(workBuilding).toBeFocused();
  if (page.viewportSize()!.width > 800) {
    expect(await hero.evaluate(element => element.getBoundingClientRect().bottom), 'Complete skills overview and town fit the first screen').toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  }
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
