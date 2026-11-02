import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署前把 site 换成你的真实域名，sitemap 与 OG 绝对地址依赖它
export default defineConfig({
  site: 'https://linchen.dev',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
