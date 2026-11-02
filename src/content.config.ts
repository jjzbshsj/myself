import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    /** 列表页与 SEO 用的一句话摘要 */
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** 是否在列表中隐藏 */
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
