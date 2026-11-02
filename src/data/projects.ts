/**
 * 项目数据 —— 只放 3 个。调研结论：三个扎实的项目胜过十个没做完的。
 *
 * 每个项目必须有「结果数据」，否则它在求职场景里没有说服力。
 * 指标优先用可验证的：Lighthouse 分数、包体积、真实用户数、star 数、接口耗时。
 */

export type Metric = {
  /** 是否为关键指标（会用强调色高亮） */
  key?: boolean;
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  /** 序号，显示为 01 / 03 */
  index: string;
  name: string;
  /** 一句话定位，如「本地优先的 Markdown 笔记应用」 */
  kind: string;
  /** 左上角角标，如 IN PRODUCTION / OPEN SOURCE */
  badge: string;
  /** 首页卡片里的描述，2-3 行 */
  summary: string;
  metrics: Metric[];
  stack: string[];
  links: { demo?: string; repo?: string };
  /** 卡片配图变体 */
  shot: 'note' | 'chart' | 'ui';
  /** 详情页 */
  detail: {
    /** 详情页导语 */
    lead: string;
    /** 背景：问题是什么 */
    problem: string;
    /** 我做了什么，分点 */
    actions: { title: string; body: string }[];
    /** 结果 */
    result: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'inkwell',
    index: '01',
    name: 'Inkwell',
    kind: '本地优先的 Markdown 笔记应用',
    badge: 'IN PRODUCTION',
    summary:
      '断网也能写，联网后靠 CRDT 自动合并冲突，没有「保存」按钮。首屏 48KB，靠动态 import 把 PDF 导出和同步模块全部挪出关键路径。',
    metrics: [
      { key: true, value: 'LCP 1.1s', label: '' },
      { key: true, value: '48KB', label: '首屏 JS' },
      { value: '99', label: 'Lighthouse' },
      { value: '1.2k', label: 'GitHub ★' },
    ],
    stack: ['TypeScript', 'CodeMirror 6', 'Yjs', 'IndexedDB'],
    links: { demo: 'https://example.com', repo: 'https://github.com/yourname/inkwell' },
    shot: 'note',
    detail: {
      lead: '一个不需要「保存」按钮的 Markdown 编辑器。断网能写，联网自动合并，首屏 48KB。',
      problem:
        '市面上的笔记应用大多假设你在线。一旦断网，要么报错，要么把内容留在本地等你手动同步——而手动同步意味着冲突，冲突意味着丢内容。我想做一个默认就不会丢的应用。',
      actions: [
        {
          title: '用 CRDT 代替「最后写入者胜」',
          body: '接入 Yjs 做文档状态，两台设备同时改同一个段落也能正确合并。代价是文档模型不能直接用纯字符串，编辑器的绑定层要重写一遍。',
        },
        {
          title: '把首屏预算定在 48KB',
          body: 'PDF 导出、同步、图床三个模块全部动态 import，只在真正触发时才加载。首屏从 214KB 压到 48KB，LCP 从 2.8s 降到 1.1s。',
        },
        {
          title: '离线优先的存储策略',
          body: '所有写入先落 IndexedDB，再异步推送。刷新页面不会丢内容，关掉浏览器再打开也一样。',
        },
      ],
      result:
        '上线 8 个月，1.2k star，约 300 人每周使用。最常被提到的反馈是「忘记它在联网」——这是我最想要的结果。',
    },
  },
  {
    slug: 'metric-deck',
    index: '02',
    name: 'Metric Deck',
    kind: '运营团队用的实时数据看板',
    badge: '2,000 MAU',
    summary:
      '放弃了图表库，用 Canvas 手写坐标系、聚合与命中测试。十万个数据点缩放和拖拽都稳在 60fps，计算全部挪进 Web Worker。',
    metrics: [
      { key: true, value: '60fps', label: '@ 100k 点' },
      { key: true, value: 'LCP 0.9s', label: '' },
      { value: '2,000', label: '周活' },
      { value: '0', label: '运行时依赖' },
    ],
    stack: ['React', 'Canvas 2D', 'Web Worker', 'Vite'],
    links: { demo: 'https://example.com', repo: 'https://github.com/yourname/metric-deck' },
    shot: 'chart',
    detail: {
      lead: '给运营团队做的实时看板。十万个数据点，缩放拖拽稳在 60fps，运行时零依赖。',
      problem:
        '最初的版本用现成图表库，超过两万个点就开始掉帧，缩放时输入延迟到 300ms 以上。运营同学的真实需求是「一眼看出异常」，而不是「看到每一个点」——但图表库只能给你后者。',
      actions: [
        {
          title: '按缩放级别做数据聚合',
          body: '缩放越远，聚合粒度越粗。屏幕上实际绘制的点始终控制在 2000 个以内，原始数据在 Worker 里预处理成多级金字塔。',
        },
        {
          title: '手写 Canvas 坐标系与命中测试',
          body: '放弃 SVG 和图表库，直接用 Canvas 2D 画。命中测试用四叉树，鼠标悬停到 tooltip 出现控制在 16ms 内。',
        },
        {
          title: '把计算全部挪出主线程',
          body: '聚合、差分、异常检测三个环节跑在 Web Worker，主线程只负责绘制。滚动和缩放期间主线程零阻塞。',
        },
      ],
      result:
        '上线后支撑 2,000 周活，运营团队用它替代了三张人工维护的 Excel。首屏 LCP 0.9s，打包后运行时依赖为 0。',
    },
  },
  {
    slug: 'prism-ui',
    index: '03',
    name: 'Prism UI',
    kind: 'headless 无障碍组件库',
    badge: 'OPEN SOURCE',
    summary:
      '32 个组件，样式完全交给使用者。每个组件都带键盘交互测试与 axe 断言，CI 里跑不通就不许合并——包括我自己提的 PR。',
    metrics: [
      { key: true, value: '0', label: 'a11y 违规' },
      { key: true, value: '32', label: '组件' },
      { value: '100%', label: '键盘覆盖' },
      { value: '48KB', label: 'gzip' },
    ],
    stack: ['React', 'Radix Primitives', 'Vitest', 'axe-core'],
    links: { demo: 'https://example.com', repo: 'https://github.com/yourname/prism-ui' },
    shot: 'ui',
    detail: {
      lead: '32 个 headless 组件，每个都带键盘交互测试和 axe 断言。CI 跑不通就不许合并。',
      problem:
        '团队里每个人都在重写同一批组件，而重写时最容易被牺牲的是键盘支持和焦点管理——因为评审时没人会真的用 Tab 键走一遍。',
      actions: [
        {
          title: '把无障碍做成 CI 门禁',
          body: '每个组件的测试文件里包含 axe-core 断言和一组键盘交互用例。任何一条不过，PR 无法合并，规则对所有人一致。',
        },
        {
          title: 'headless 优先，样式零耦合',
          body: '只提供行为、状态和 ARIA 属性，样式完全交给使用者。这让它既能配 Tailwind 也能配 CSS Modules，接入成本接近零。',
        },
        {
          title: '48KB 的体积预算',
          body: '按组件做 tree-shaking，单组件平均 1.5KB gzip。CI 里跑 size-limit，超预算直接失败。',
        },
      ],
      result: '被三个团队接入，累计 200+ 次提交，0 个已知 a11y 违规。',
    },
  },
];
