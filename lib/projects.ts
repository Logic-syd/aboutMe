export type Project = {
  slug: string; number: string; title: string; shortTitle: string; category: string; organization: string;
  status: string; inDevelopment?: boolean; description: string; tags: string[]; role: string;
  problem: string; responsibilities: string[]; decisions: { title: string; text: string }[];
  delivery: string; flow: string[]; lesson?: string; graphTitle?: string; contributions?: string[][];
  featured?: boolean; heroTitle?: string; heroDetail?: string;
  links?: { label: 'Live Demo' | 'Source Code'; href: string }[];
  screenshots?: { src: string; width: number; height: number; alt: string; caption: string }[];
  screenshotCredit?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    graphTitle: "Energy API platform", contributions: [["React frontend leadership", "European release delivery"], ["Typed frontend implementation"], ["API integration", "Integration testing"], ["Multilingual interfaces", "Regional theme configuration"]],
    featured: true,
    heroTitle: "Energy APIs", heroDetail: "European release",
    slug: 'renewable-energy-api', number: '01', title: 'Renewable-Energy API Platform', shortTitle: 'Making energy APIs accessible.',
    category: 'Energy · Regional delivery', organization: 'NeuVerge-Tron / Sungrow', status: 'European version launched',
    description: 'Leading the React frontend and European rollout of an API platform, from integration and localization to testing and post-launch iteration.',
    tags: ['React', 'TypeScript', 'API integration', 'Localization'], role: 'Frontend lead · European rollout',
    problem: 'An energy API platform needed a European frontend release that brought API integration, multiple languages and regional presentation into a coherent product experience.',
    responsibilities: ['Led React frontend implementation and API integration.', 'Delivered multilingual interfaces and region-specific theme configuration.', 'Owned frontend testing for the European rollout and continued iterating after launch.'],
    decisions: [
      { title: 'Regional configuration as a frontend concern', text: 'Handled language and regional theme configuration as part of the product implementation, so the European release could express its own presentation requirements.' },
      { title: 'Delivery beyond implementation', text: 'Carried frontend ownership through integration, testing and the European launch, then into post-launch improvements.' }
    ],
    delivery: 'The European version launched. My work included testing, release delivery and post-launch iteration. This is a written case study; no internal screenshots, proprietary code or public product demo are included.',
    flow: ['API integration', 'Language + theme', 'European release']
  },
  {
    graphTitle: "Coffee & beer map", contributions: [["React map experience", "Server-side rendering"], ["Backend development", "Data import workflows"], ["500+ curated venues", "Data access policies"], ["Server-rendered web experience"]],
    featured: true,
    heroTitle: "Discovery map", heroDetail: "Independent product",
    slug: 'discovery-map', number: '02', title: 'Coffee & Craft Beer Discovery Map', shortTitle: 'Good places, thoughtfully mapped.',
    category: 'Independent product · Full stack', organization: 'Personal project', status: 'In development · Not released', inDevelopment: true,
    description: 'An independently built discovery product with 500+ curated places, connecting a React / Next.js map experience to a structured location dataset.',
    tags: ['Next.js', 'Node.js / Express', 'Supabase / PostgreSQL', 'SSR'], role: 'Independent developer · Frontend and backend',
    problem: 'Place discovery needs both a useful browsing experience and organized location data. I am building a coffee and craft beer map around a curated dataset of more than 500 venues.',
    responsibilities: ['Developing the React / Next.js map product independently.', 'Organizing and importing a dataset of 500+ places.', 'Building with Node.js / Express and Supabase / PostgreSQL, including data access policies and server-side rendering.'],
    decisions: [
      { title: 'A structured foundation for discovery', text: 'Using PostgreSQL through Supabase for the venue dataset, with data imports and access policies treated as part of the product work.' },
      { title: 'Server rendering alongside an interactive map', text: 'Using Next.js and SSR in the web experience, while React supports the interactive discovery interface.' }
    ],
    delivery: 'In active development and not publicly released. The 500+ figure describes the curated venue dataset, not users or adoption. No live demo or source-code link is offered until a public version is available.',
    flow: ['Curated places', 'PostgreSQL', 'Map discovery']
  },
  {
    graphTitle: "Data export center", contributions: [["Export interface implementation"], ["Typed export workflows"], ["Task states", "Retry and download"], ["Data scope", "Permission-aware actions"]],
    featured: true,
    heroTitle: "Data exports", heroDetail: "Async workflows",
    slug: 'data-export-center', number: '03', title: 'EU Data Act Data Export Center', shortTitle: 'Clarity through a complex export.',
    category: 'Data access · Async workflows', organization: 'Commercial project', status: 'In development · Not released', inDevelopment: true,
    description: 'A Vue 3 / TypeScript interface for data exports, making scope, permissions, asynchronous jobs, retries and downloads understandable.',
    tags: ['Vue 3', 'TypeScript', 'Async tasks', 'Permissions'], role: 'Frontend implementation',
    problem: 'A data export is a sequence of decisions and asynchronous states. Users need to understand which data they can request, what a task is doing and when a download is available.',
    responsibilities: ['Implementing the Vue 3 / TypeScript data-export interface.', 'Handling data scope, permission-dependent interactions and asynchronous task states.', 'Working on retry and download flows as part of the export experience.'],
    decisions: [
      { title: 'Make the task lifecycle visible', text: 'The interface work covers scope selection, asynchronous processing, retry and download, rather than treating export as a single immediate action.' },
      { title: 'Keep access part of the workflow', text: 'Accounting for permissions and data scope in the frontend so users can understand the available export actions.' }
    ],
    delivery: 'In development and not released. This case describes frontend work in progress; it does not claim a completed launch or independently verified regulatory compliance.',
    flow: ['Scope + access', 'Async export', 'Retry / download']
  },
  {
    graphTitle: "Sports & training", contributions: [["Web training interfaces"], ["Typed web implementation"], ["Mobile training screens", "Camera and feedback integration"], ["Running mini-program", "Vue mobile frontend"]],
    heroTitle: "Sports & training", heroDetail: "Web + mobile",
    slug: 'sports-education', number: '04', title: 'AI Sports-Education & Mobile Training Platform', shortTitle: 'Connecting movement and feedback.',
    category: 'Sports education · Web + mobile', organization: 'Danzhu (淡竹)', status: 'Commercial work · Selected screenshot',
    description: 'Web and mobile training interfaces connecting camera input, movement feedback and the training experience across React, React Native and Vue / uni-app.',
    tags: ['React', 'TypeScript', 'React Native', 'Vue / uni-app'], role: 'Web and mobile frontend development',
    problem: 'An AI sports-education product needed interfaces that connected camera input and movement feedback with usable web and mobile training experiences.',
    responsibilities: ['Built React / TypeScript web interfaces for the sports-education product.', 'Worked on React Native mobile training screens, camera integration and movement-feedback interfaces.', 'Contributed to the Vue mobile frontend and a Vue / uni-app running mini-program.'],
    decisions: [
      { title: 'Connect the training interaction', text: 'Focused on the frontend connection between camera access, movement feedback and training screens.' },
      { title: 'Work across delivery surfaces', text: 'Implemented interfaces across React web, React Native and Vue / uni-app mobile experiences as required by the product.' }
    ],
    delivery: 'Commercial frontend contributions are presented through a written case study and one privacy-redacted screenshot of the Vue / uni-app running mini-program. Many other commercial interfaces are not suitable for public display. My role was interface and integration work, not training the vision-recognition models. The company website is linked for product context; it is not a live demo of this mini-program.',
    flow: ['Camera input', 'Movement feedback', 'Training interface']
  },
  {
    graphTitle: "Low-code platform", contributions: [["Configurable pages", "Field-team applications"], ["Reusable components"], ["Theme switching"]],
    heroTitle: "Low-code tools", heroDetail: "Configurable interfaces",
    slug: 'low-code-platform', number: '05', title: 'Internal Low-Code Platform', shortTitle: 'Reusable tools for field teams.',
    category: 'Developer tools · Internal platform', organization: 'Longshine', status: 'Internal platform · Written case study',
    description: 'Leading an internal low-code platform for field-service work orders and marketing applications, with configurable pages and reusable components.',
    tags: ['Low-code', 'Component architecture', 'Theming'], role: 'Frontend lead · Technical selection contributor',
    problem: 'Field teams needed work-order and marketing applications. An internal low-code platform brought configurable pages, reusable components and theme switching to this work.',
    responsibilities: ['Participated in technical selection and led the internal low-code platform.', 'Built configurable pages and reusable components for field-team applications.', 'Implemented theme switching for different application needs.'],
    decisions: [
      { title: 'Configuration and reuse', text: 'Centered the platform on configurable pages and reusable components to support work-order and marketing use cases.' },
      { title: 'Theme switching within the platform', text: 'Included theme switching as a platform capability so application presentation could change alongside page configuration.' }
    ],
    delivery: 'An internal commercial platform, documented here through a written case study. No public demo, internal source code or unverified delivery metrics are presented.',
    flow: ['Page configuration', 'Reusable components', 'Field applications']
  },
  {
    graphTitle: "Component library & workflows", contributions: [["Component-library development"], ["Typed frontend implementation"], ["Reusable UI building blocks", "Shared enterprise interfaces"], ["Work-order system interfaces", "Business workflow understanding"]],
    heroTitle: "Operations", heroDetail: "Component library + workflows",
    slug: 'operations-monitoring', number: '06', title: 'State Grid Operations & Monitoring Platform', shortTitle: 'Reusable components. Workflow-aware interfaces.',
    category: 'Enterprise systems · Component library & workflows', organization: 'Longshine (朗新) · State Grid project', status: 'Commercial work · Written case study',
    description: 'Developed a shared frontend component library and work-order interfaces for a State Grid management system at Longshine. This combined hands-on experience building reusable UI with a deeper understanding of business workflows—skills I bring to SaaS frontend development.',
    tags: ['React', 'TypeScript', 'Component library', 'Business workflows'], role: 'Frontend development · Component library & work-order system',
    problem: 'Enterprise software needs reusable interface building blocks as well as screens that reflect how the business operates. Within a 1,000-person State Grid development programme, my work connected component-library development with the practical workflows of a work-order system.',
    responsibilities: [
      'Developed reusable frontend components as part of the management system’s shared component library.',
      'Implemented work-order system interfaces, applying shared components to business-facing screens.',
      'Built familiarity with business-system workflows through work-order development, connecting process requirements with frontend implementation.',
      'Collaborated within a 1,000-person development team at Longshine.'
    ],
    decisions: [
      { title: 'Build for reuse across business interfaces', text: 'Component-library development was a core part of my contribution. I worked on reusable UI building blocks that could support the management system’s interfaces, gaining practical experience with the shared frontend foundations used in enterprise products.' },
      { title: 'Understand the workflow behind the screen', text: 'Working on the work-order system deepened my understanding of how business processes translate into interfaces. This experience helps me approach a screen in the context of the wider workflow and the task it needs to support.' },
      { title: 'Bring both perspectives to SaaS development', text: 'This project combined component-library experience with business-system implementation. I bring both to SaaS frontend work: developing reusable UI and understanding the operational processes that the product needs to make usable.' }
    ],
    delivery: 'Commercial component-library and work-order frontend development at Longshine, within a 1,000-person project team. The experience strengthened both my ability to build reusable enterprise interfaces and my understanding of business workflows—foundations for SaaS frontend development.',
    flow: ['Shared component library', 'Work-order interfaces', 'Business workflows']
  },
  {
    graphTitle: "Ronghe Pay", contributions: [["Vue 2 frontend rebuild"], ["PHP-based product upgrade", "Zero-to-one frontend contribution"], ["Batch and single payments", "Insurance collections and payouts"], ["Reconciliation statements"]],
    slug: 'ronghe-pay', number: '07', title: 'Ronghe Pay — Insurance Payments Platform', shortTitle: 'Care in every payment.',
    category: 'Fintech · Collections & payouts', organization: 'Fingard (保融) · 融合付', status: 'Commercial project · Written case study',
    description: 'Contributed to Ronghe Pay from zero to one at Fingard, building the Vue 2 frontend for a 2018 upgrade of an existing PHP-based insurance payments product.',
    tags: ['Vue 2', 'Frontend modernization', 'Payment workflows', 'Reconciliation'], role: 'Frontend development · Zero-to-one Vue 2 rebuild',
    problem: 'Insurers needed to collect premiums and pay claims across banks without opening a separate account at every bank. Ronghe Pay connected insurers with banks through one platform: insurers could submit batch files for premium collections through authorized banks, make claim payouts to customers, and use single-payment flows, including real-time settlement where supported. Reconciliation statements and additional value-added services completed the payment workflow.',
    responsibilities: ['Contributed to Ronghe Pay from zero to one as a frontend developer at Fingard.', 'Built the Vue 2 frontend as the existing PHP-based product was upgraded in 2018.', 'Worked with the insurance payments domain, including batch and single transactions, premium collections, claim payouts and reconciliation.'],
    decisions: [
      { title: 'A new frontend for an existing product', text: 'The 2018 upgrade used Vue 2 for the new frontend. My zero-to-one contribution refers to this frontend rebuild; the product already had a PHP-based version.' },
      { title: 'Batch and single-payment workflows', text: 'The product supported both file-based batch operations and single transactions. Premium collections relied on authorized banks; claim payouts moved money back to customers. Some single-payment flows supported real-time settlement.' },
      { title: 'Reconciliation as part of the payment experience', text: 'The platform provided reconciliation statements alongside collections and payouts, giving insurers a record to check after money moved.' }
    ],
    lesson: 'This was where I began learning the payment domain. When an interface concerns money, accuracy and timeliness are essential: the experience has to make the movement of funds understandable and dependable.',
    delivery: 'A written case study of historical commercial frontend work, including the 2018 Vue 2 rebuild. No public launch date, transaction-volume claims, internal screenshots or source code are provided. The diagram illustrates the business workflow rather than the product interface.',
    flow: ['Insurer instructions', 'Authorized bank payments', 'Reconciliation statements']
  },
  {
    slug: 'mountain-chess', number: '08', title: 'Mountain Chess — Offline Chess for Hiking', shortTitle: 'A chessboard for a mountain break.',
    graphTitle: 'Mountain chess', category: 'Personal product · Offline game', organization: 'Independent project', status: 'Published · Play online',
    description: 'I love hiking and chess, so I built a game for solo breaks in the mountains: a local computer opponent, saved games and offline play after the first online setup.',
    tags: ['JavaScript', 'PWA / Service Worker', 'Local chess engine', 'LocalStorage / i18n'], role: 'Independent developer · Product, interface and game logic',
    contributions: [
      ['Responsive board and game controls', 'No framework or runtime dependencies'],
      ['Versioned asset caching', 'Offline-readiness checks'],
      ['Legal moves and game outcomes', 'Local search with three difficulty settings'],
      ['Save and resume on the same device', 'Chinese, English and German interfaces']
    ],
    problem: 'I enjoy hiking as much as chess. When I stopped for a rest alone in the mountains, I wanted to play a game without depending on a signal or finding an opponent. That personal need became Mountain Chess: a small, phone-friendly game that can travel with me, remember an unfinished position and work after its resources have been cached.',
    responsibilities: [
      'Designed and built the responsive chessboard, move feedback, game controls and win/draw screens.',
      'Implemented chess rules and a computer opponent that runs on the device, with three difficulty settings.',
      'Added Service Worker caching, PWA installation metadata and an explicit offline-readiness check.',
      'Persisted the game and preferences locally, and provided Chinese, English and German interfaces.',
      'Published the static application on GitHub Pages and built a default power-saving mode for use on a phone.'
    ],
    decisions: [
      { title: 'Make offline readiness something I can check', text: 'A Service Worker caches the application, chess pieces and language resources. The readiness check verifies the active worker, version and cached files. Before a hike, I can check those resources and reopen the game offline to confirm it is ready.' },
      { title: 'Keep the game and opponent on the device', text: 'Native HTML, CSS and JavaScript keep the application free of framework and runtime dependencies. The computer uses shallow minimax search with alpha-beta pruning and position evaluation. Three settings adjust search and move selection for casual play without a server.' },
      { title: 'Spend work only when it is needed', text: 'The computer calculates during its own turn. Pending computer turns pause when the page is hidden; power-saving mode is on by default and reduces animation while disabling sound and vibration. Move highlights and game-result feedback remain available.' },
      { title: 'Let a short break become a resumable game', text: 'LocalStorage preserves the position, move history and preferences in the same browser. Undo, board rotation and side selection support casual sessions. The three interface languages are cached too, and switching language keeps the current game intact.' }
    ],
    delivery: 'Published and playable on GitHub Pages, with a public source repository. The gallery shows the live English interface and a German checkmate screen from my phone. Offline use requires an initial online visit and completed caching; saved games remain in the same device and browser.',
    flow: ['Cache before the hike', 'Play on the device', 'Save & resume'],
    links: [
      { label: 'Live Demo', href: 'https://logic-syd.github.io/chessOffline/dist/' },
      { label: 'Source Code', href: 'https://github.com/Logic-syd/chessOffline' }
    ],
    screenshots: [
      { src: '/images/mountain-chess-board.png', width: 780, height: 1688, alt: 'The live Mountain Chess app in English, with its offline-ready indicator, chessboard, local computer opponent and game controls.', caption: 'English board · Captured from the live application.' },
      { src: '/images/mountain-chess-checkmate.png', width: 1206, height: 2622, alt: 'Mountain Chess in German, displaying a checkmate victory and an option to play another game.', caption: 'German checkmate screen · My original phone screenshot.' }
    ],
    screenshotCredit: { label: 'Chess-piece artwork credits', href: 'https://github.com/Logic-syd/chessOffline/blob/main/dist/pieces/NOTICE.txt' }
  },
  {
    slug: 'pfand-pause', number: '09', title: 'Pfand Pause — A Bottle-Sorting Puzzle', shortTitle: 'A little order in a new country.',
    graphTitle: 'Pfand Pause', category: 'Personal product · Puzzle game', organization: 'Independent project', status: 'Playable build · Not publicly released',
    description: 'When I first moved to Germany, I struggled to tell the different bottles apart. I turned that everyday confusion into a small sorting game: a playful way to get familiar with the bottles around me.',
    tags: ['React / TypeScript', 'Game state / Solver', 'SVG / CSS', 'LocalStorage / i18n'], role: 'Independent developer · Game design and frontend',
    contributions: [
      ['Responsive game and interactive tutorial', 'Input locking during animations'],
      ['Pure rules and complete undo', 'Ten levels checked with the same engine'],
      ['Six distinct bottle designs', 'Touch, keyboard and reduced motion'],
      ['Saved progress and preferences', 'English and German interfaces']
    ],
    problem: 'Moving to Germany came with small, unfamiliar routines, including figuring out all the different drinks bottles. I wanted a more enjoyable way to become familiar with them, so I built Pfand Pause around a neighbourhood bottle-return counter. Players sort six bottle types into matching crates while keeping a small waiting area clear. The setting comes from everyday life; the puzzle uses its own sorting rules.',
    responsibilities: [
      'Built the React / TypeScript game with Vite, including a phone-first board, level selection, settings and an interactive practice round.',
      'Implemented the rules, automatic bottle transfers, crate replacement, win/loss states and full-state undo.',
      'Created ten levels and a development solver that checks solutions using the same rules as the playable game.',
      'Created SVG / CSS bottle and shop visuals, English and German interfaces, keyboard controls and reduced-motion support.',
      'Saved completed levels and preferences locally, and integrated Web Audio feedback and an English completion voice clip with mute and cancellation handling.'
    ],
    decisions: [
      { title: 'One rules engine for play and verification', text: 'A pure TypeScript transition function takes a board state and a selected column, then returns the resulting state and animation frames. A memoized depth-first solver uses that same function to find winning paths for all ten levels. The solver stays out of the player bundle.' },
      { title: 'Treat a move as one complete action', text: 'Picking a bottle can trigger a full crate, a replacement order and transfers from the waiting area. The game settles that chain before checking whether the waiting area is full. A snapshot taken before the click makes Undo restore the entire action, while a synchronous input lock prevents repeated taps during animation.' },
      { title: 'Make the bottles recognizable in more than one way', text: 'Six bottle types have distinct shapes, colours and label patterns drawn in SVG. The interface supports tapping and keyboard activation, with an isolated interactive tutorial and optional reduced motion. There is no timer, leaving room to look at the bottles and plan a move.' },
      { title: 'Keep progress simple and resilient', text: 'Versioned LocalStorage saves completed levels, tutorial state, language and sound/motion preferences. The game remains playable if storage is blocked or damaged. English and German interfaces share the same game state; unfinished rounds are not persisted across a refresh.' },
      { title: 'Let audio follow the interaction', text: 'Web Audio provides short feedback sounds. An English completion clip is loaded locally and follows the victory sound; muting, changing language or leaving the screen cancels pending playback. Loading or decoding failures leave the game playable.' }
    ],
    delivery: 'A playable ten-level build with a public source repository. The screenshots show the real application running locally. A public game deployment is not yet available. This is a fictional sorting puzzle inspired by German bottle returns, rather than a guide to deposit eligibility or refund amounts.',
    flow: ['Recognize a bottle', 'Match a crate', 'Make room for the next'],
    links: [{ label: 'Source Code', href: 'https://github.com/Logic-syd/PfandPause' }],
    screenshots: [
      { src: '/images/pfand-pause-start.png', width: 780, height: 1902, alt: 'Pfand Pause in English, with its illustrated neighbourhood drinks shop and the invitation to start sorting bottles.', caption: 'The bottle-return shop · Captured from the local production build.' },
      { src: '/images/pfand-pause-game.png', width: 780, height: 2314, alt: 'Level three of Pfand Pause, showing bottle stacks, three waiting spaces, matching crates, the order queue and undo controls.', caption: 'Level 03 · Actual gameplay after completing the first two puzzles.' }
    ]
  },
  {
    slug: 'smart-city-dashboards', number: '10', title: 'Smart City Dashboards', shortTitle: 'A shared foundation, adapted to each place.',
    graphTitle: 'Smart city dashboards', category: 'Smart city · Geographic visualization', organization: 'Longshine (朗新)', status: 'Commercial work · Written case study',
    description: 'Built multiple large-screen dashboards as part of smart-city projects at Longshine, integrating map APIs and route tracking for Wuxi, Hainan and Taiyuan, with customizations for each location.',
    tags: ['Map APIs', 'Route tracking', 'Large-screen interfaces', 'Regional customization'], role: 'Sole frontend developer for the initial dashboard · Regional delivery',
    contributions: [
      ['Map API integration', 'Geographic views within the dashboards'],
      ['Route tracking on maps'],
      ['Sole frontend ownership of the initial dashboard', 'Multiple regional dashboards'],
      ['Wuxi, Hainan and Taiyuan', 'Location-specific customizations']
    ],
    problem: 'Smart-city projects in different locations needed large-screen dashboards with map views and route tracking. The dashboards shared the same foundation, but Wuxi, Hainan and Taiyuan each had specific requirements that called for a customized version.',
    responsibilities: [
      'Solely owned frontend development of the initial smart-city dashboard at Longshine.',
      'Built multiple large-screen dashboard interfaces for regional smart-city projects.',
      'Integrated map APIs into the dashboard experience.',
      'Implemented map-based route tracking.',
      'Worked from a shared foundation while adapting the dashboards to the specific requirements of Wuxi, Hainan and Taiyuan.'
    ],
    decisions: [
      { title: 'Own the initial frontend', text: 'Was the sole frontend developer for the initial smart-city dashboard, then worked on regional dashboard versions built around a shared foundation.' },
      { title: 'Keep a common foundation across versions', text: 'The dashboards were based on the same foundation. My work covered multiple versions, carrying that common base into the implementation for each location.' },
      { title: 'Connect maps with route tracking', text: 'Map API integration and route tracking formed part of the large-screen interfaces, bringing geographic context and routes into the dashboard experience.' },
      { title: 'Adapt to local requirements', text: 'Wuxi, Hainan and Taiyuan each required specific customizations. The work combined the shared dashboard foundation with those differences rather than delivering an identical interface for every location.' }
    ],
    delivery: 'A written case study of commercial frontend work at Longshine across multiple regional dashboards. The workflow illustration summarizes the shared foundation and local customization work.',
    flow: ['Shared dashboard foundation', 'Maps + route tracking', 'Regional customizations']
  },
  {
    slug: 'glp-sme-financing', number: '11', title: 'SME Financing Platform', shortTitle: 'React interfaces for cross-region finance.',
    graphTitle: 'SME financing', category: 'Fintech · React business interfaces', organization: 'GLP (普洛斯)', status: 'Commercial frontend work',
    description: 'React frontend development for an SME financing system spanning domestic and overseas markets, with a focus on business interfaces and requirements around time zones, currencies and exchange rates.',
    tags: ['React', 'Business interfaces', 'Time zones', 'Currencies & exchange rates'], role: 'React frontend development',
    contributions: [
      ['React business interfaces'],
      ['SME financing workflows'],
      ['Time-zone requirements'],
      ['Currency and exchange-rate context']
    ],
    problem: 'An SME financing system needed business interfaces for domestic and overseas markets, where dates, currencies and exchange rates required careful handling.',
    responsibilities: [
      'Developed React frontend interfaces for the financing system.',
      'Worked on business screens supporting SME financing workflows.',
      'Handled frontend requirements involving time zones, currencies and exchange rates.'
    ],
    decisions: [
      { title: 'React for business interfaces', text: 'Worked on React interfaces for the financing system, translating business requirements into frontend screens.' },
      { title: 'Time and currency context', text: 'Cross-region requirements made time zones, currencies and exchange rates part of the frontend work, building my experience with financial data presentation in international business systems.' }
    ],
    delivery: 'React frontend contributions to an SME financing system at GLP, with experience in business interfaces and cross-region financial requirements.',
    flow: ['React interfaces', 'Financing workflows', 'Time + currency context']
  }
];
