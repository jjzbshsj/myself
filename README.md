# 个人博客 · Portfolio

面向**前端 / 全栈求职**的个人站点。Astro 静态构建，零客户端 JS，可直接部署到 Cloudflare Pages。

设计方向：项目前置、常驻 CTA、卡片承载证据——访客打开首页 5 秒内就能知道"这人是谁、什么水平、在找什么岗"。

## 开发

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 产物在 dist/
npm run preview    # 预览构建结果
```

## 目录结构

```
src/
├── data/
│   ├── site.ts        ← 站点配置：姓名、职位、求职状态、联系方式、首屏文案
│   └── projects.ts    ← 项目数据：3 个项目 + 指标 + 详情
├── content/writing/   ← 文章（Markdown）
├── components/        ← Header / Footer / Cta / ProjectCard / PostCard / ProjectShot
├── layouts/
│   └── BaseLayout.astro   ← <head>、SEO、OG、JSON-LD
├── pages/
│   ├── index.astro            /
│   ├── projects/index.astro   /projects
│   ├── projects/[slug].astro  /projects/:slug
│   ├── writing/index.astro    /writing
│   ├── writing/[slug].astro   /writing/:slug
│   ├── about.astro            /about
│   ├── 404.astro
│   └── rss.xml.ts             /rss.xml
├── styles/global.css  ← 设计系统（颜色、排版、组件样式）
└── content.config.ts  ← 文章 schema
```

## 上线前必须替换的 5 处

1. **`src/data/site.ts`** — 姓名、职位、邮箱、社交链接、求职状态、首屏文案、数据条、关于页。改这一个文件就能全站换人。
2. **`src/data/projects.ts`** — 换成你自己的 3 个项目。**每个项目必须有结果数据**（Lighthouse 分数、包体积、真实用户数、star 数、接口耗时都行），没有数据的项目在求职场景里没有说服力。
3. **`src/content/writing/*.md`** — 换成你自己的文章。示例的 3 篇可以直接删。少于 3 篇建议先把 `/writing` 从导航里去掉。
4. **`public/resume.pdf`** — 你的简历，一页。当前不存在，Résumé 按钮会 404。
5. **`astro.config.mjs` 里的 `site`** — 换成你的真实域名，sitemap 和 OG 绝对地址依赖它。

社交分享图 `public/og.png`（1200×630）已经生成好了。改完名字和信息后，可以编辑根目录的 `og-template.html` 重新截图生成：

```bash
chrome --headless=new --force-device-scale-factor=1 --window-size=1200,630 \
  --screenshot=public/og.png og-template.html
```

`public/favicon.svg` 目前是占位（一个蓝色方块 + 姓），建议换成自己的。

## 设计约束（改样式时请守住）

| 项 | 数值 |
|---|---|
| 正文 | 17px / 行高 1.7 / 容器 680px（约 40 汉字每行） |
| 字号阶梯 | 12 / 14 / 17 / 20 / 24 / 30 / 40 / 56 |
| 对比度 | 正文 ≥ 4.5:1，大字与 UI 边框 ≥ 3:1（WCAG 2.2 AA） |
| 性能 | LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1 |
| 动效 | 只动 `transform` / `opacity`，120-320ms，`cubic-bezier(0.2,0,0,1)` |
| 可访问性 | 键盘全可达、焦点环 ≥2px、`prefers-reduced-motion` 必须降级 |

中英混排：中文正文不加 `letter-spacing`；不用 `word-break: break-all`；数字用 `tabular-nums`。

## 部署（Cloudflare Pages）

免费额度无限带宽，且明确允许商业用途——个人博客的流量是"平时没人看、偶尔被顶上首页"，这一点比构建速度重要得多。

```
Build command:      npm run build
Build output dir:   dist
Node version:       22
```

绑定自定义域名后，Cloudflare 会自动签发 SSL。**不要用 `xxx.pages.dev` 子域**——自定义域名是成本最低的职业信号。

## 当前体积

- 客户端 JS：**0 个文件**（页面全静态，唯一的 `<script>` 是 JSON-LD）
- CSS：15.5 KB → gzip 3.9 KB
- 首页 HTML：16 KB → **gzip 4.4 KB**
- 全站产物：394 KB / 11 个页面（其中 resume.pdf 200 KB、og.png 52 KB 是静态资源，不计入首屏）

首屏不加载任何 JS，也不请求 webfont——字体全部走系统栈。这是"打开就快"这条设计约束的直接结果。
