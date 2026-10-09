export type Project = {
  slug: string; number: string; title: string; shortTitle: string; category: string; organization: string;
  status: string; inDevelopment?: boolean; description: string; tags: string[]; role: string;
  problem: string; responsibilities: string[]; decisions: { title: string; text: string }[];
  delivery: string; flow: string[]; lesson?: string; graphTitle?: string; contributions?: string[][];
  featured?: boolean; heroTitle?: string; heroDetail?: string;
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
    graphTitle: "Operations dashboard", contributions: [["Initial dashboard frontend ownership"], ["Typed monitoring interfaces"], ["Monitoring charts"], ["Geographic visualization"]],
    heroTitle: "Operations", heroDetail: "Charts + maps",
    slug: 'operations-monitoring', number: '06', title: 'State Grid Operations & Monitoring Platform', shortTitle: 'A national view of operations.',
    category: 'Operations · Data visualization', organization: 'State Grid project', status: 'Served 1,000+ operators',
    description: 'React / TypeScript operations interfaces with ECharts and map visualization. Sole frontend ownership of the initial nationwide monitoring dashboard.',
    tags: ['React', 'TypeScript', 'ECharts', 'Maps'], role: 'Sole frontend developer for the initial national dashboard',
    problem: 'Operations teams needed a nationwide view of monitoring information. The broader platform served more than 1,000 operators and combined operational data with geographical context.',
    responsibilities: ['Independently owned the frontend of the initial nationwide monitoring dashboard.', 'Developed React / TypeScript operations and monitoring interfaces.', 'Used ECharts and map visualization to present monitoring information.'],
    decisions: [
      { title: 'Charts and geographical context', text: 'Combined ECharts and maps in the frontend to support the monitoring experience across national operations.' },
      { title: 'Clear ownership of the first dashboard', text: 'Took sole responsibility for the frontend of the initial nationwide dashboard. This ownership refers to that initial dashboard, not the entire platform.' }
    ],
    delivery: 'The platform served 1,000+ operators. This is a written case study of my frontend contribution; internal dashboards, data and source code are not reproduced.',
    flow: ['Operational data', 'Charts + maps', 'Operator overview']
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
  }
];
