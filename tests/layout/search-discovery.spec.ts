import { expect, test } from '@playwright/test';
import { projects } from '../../lib/projects';
import { siteUrl, technologyGroups } from '../../lib/profile';

test('initial HTML exposes the public profile without running page scripts', async ({ request, page }) => {
  const response = await request.get('/');
  expect(response.ok()).toBe(true);
  const profile = await page.evaluate(html => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    return {
      title: document.title,
      canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
      robots: document.querySelector('meta[name=robots]')?.getAttribute('content'),
      description: document.querySelector('meta[name=description]')?.getAttribute('content'),
      skills: [...document.querySelectorAll('section[aria-labelledby="town-title"] ul li')].map(item => item.textContent),
      profile: JSON.parse(document.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}'),
    };
  }, await response.text());
  expect(profile.title).toContain('Senior Frontend Engineer in Munich');
  expect(new URL(profile.canonical ?? '').href).toBe(`${siteUrl}/`);
  expect(profile.robots).toMatch(/\bindex\b/);
  expect(profile.robots).not.toMatch(/noindex/);
  expect(profile.description).toContain('insurance payments');
  expect(profile.skills).toEqual(technologyGroups.flatMap(group => group.skills));
  expect(profile.profile['@type']).toBe('ProfilePage');
  expect(profile.profile.mainEntity['@type']).toBe('Person');
  expect(profile.profile.mainEntity.knowsAbout).toContain('Payment reconciliation');
  expect(profile.profile.mainEntity.sameAs).toContain('https://github.com/Logic-syd');
});

test('robots and sitemap expose every canonical project URL', async ({ request, page }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
  expect(await robots.text()).toMatch(/^Allow: \/$/m);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  const urls = await page.evaluate(xml => [...new DOMParser().parseFromString(xml, 'application/xml').querySelectorAll('loc')].map(element => element.textContent), await sitemap.text());
  expect(urls).toEqual([`${siteUrl}/`, ...projects.map(project => `${siteUrl}/projects/${project.slug}`)]);
  expect(new Set(urls).size).toBe(urls.length);
});
