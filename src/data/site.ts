/**
 * 站点配置 —— 换成你自己的信息，改这一个文件即可完成全站替换。
 * 所有页面（首页 / 文章 / 项目 / 关于 / 页脚 / SEO）都从这里读取。
 *
 * 定位：个人技术分享 + 项目分享博客。
 */

export const site = {
  // ---------- 身份 ----------
  name: 'xiaozhi',
  nameEn: 'Xiao Zhi',
  role: '前端 / 全栈工程师',
  jobTitle: '前端工程师',

  // 浏览器标签页标题
  title: 'xiaozhi的技术博客',
  // SEO 描述，控制在 120 字以内
  description:
    'xiaozhi的技术博客：前端技术分享与项目复盘。关注渲染性能、可访问性与工程实践，每篇文章附可复现的代码与数据。',
  // 社交分享卡片（1200×630，放在 public/ 下）
  ogImage: '/og.png',

  // ---------- 博客标语 ----------
  tagline: '记录技术思考，复盘项目取舍。',

  // ---------- 联系方式 ----------
  email: '@outlook.com',
  location: '杭州',
  // 简历 PDF 放到 public/resume.pdf（如需保留求职用途）
  resume: '/resume.pdf',

  socials: [
    { label: 'GitHub', href: 'https://github.com/yourname' },
    { label: 'X', href: 'https://x.com/yourname' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yourname' },
  ],

  // ---------- 左栏分类（映射到文章标签） ----------
  categories: [
    { label: '性能优化', tags: ['性能'] },
    { label: '可访问性', tags: ['无障碍'] },
    { label: '工程实践', tags: ['工程复盘', '工程文化'] },
    { label: 'Canvas 渲染', tags: ['Canvas'] },
  ],

  // ---------- 从业年限（右栏个人卡统计用） ----------
  years: 5,

  // ---------- 关于页 ----------
  about: {
    lead: '我是xiaozhi，一个前端工程师。这个博客用来记录技术思考、复盘项目取舍。',
    paragraphs: [
      '我关注两件事：把界面做得更快，以及让键盘用户也能完整用下来。从 jQuery 时代写到现在的 Astro，做过工具类 SaaS、数据看板、组件库，也做过只有两个人维护的内部系统。',
      '我不太相信「先上线再优化」。性能预算是写第一行代码前就该定下的数字——比如首屏 48KB，这个数字来自用户的实际网络条件，而不是某个 benchmark 的排名。',
      '无障碍对我来说不是交付前补的清单。键盘可达、焦点可见、语义正确，这些做对了，代码通常也更简单。这里写的每篇文章都尽量附可复现的代码和可量化的数据。',
    ],
    // 时间线
    timeline: [
      { period: '2024 — 至今', title: '独立开发 / 开源', desc: 'Inkwell、Prism UI，以及若干长期维护的小工具。' },
      { period: '2022 — 2024', title: '某 SaaS 公司 · 前端工程师', desc: '负责数据看板与编辑器内核，把首屏从 3.2s 压到 1.1s。' },
      { period: '2021 — 2022', title: '某外包团队 · 前端', desc: '十来个中小型项目，学会了怎么在预算内交付。' },
    ],
  },

  // ---------- 页脚 ----------
  footer: {
    note: '本站用 Astro 构建，零客户端 JS，托管在 Cloudflare Pages。',
  },
} as const;
