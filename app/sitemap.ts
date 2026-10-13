import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/profile';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/` }, ...projects.map(project => ({ url: `${siteUrl}/projects/${project.slug}` }))];
}
