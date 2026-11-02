import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: `${site.name} 的写作`,
    description: site.description,
    site: context.site ?? 'https://example.com',
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/writing/${p.id}/`,
    })),
    customData: '<language>zh-CN</language>',
  });
}
