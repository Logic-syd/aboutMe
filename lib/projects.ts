export type ProjectScreenshot = { src: string; width: number; height: number; alt: string; caption: string; label?: string };

export type Project = {
  kind: 'commercial' | 'independent'; slug: string; number: string; title: string; shortTitle: string; category: string; organization: string;
  affiliation?: string; status?: string; inDevelopment?: boolean; description: string; tags: string[]; role: string;
  problem: string; responsibilities: string[]; decisions: { title: string; text: string }[];
  delivery: string; flow: string[]; lesson?: string; graphTitle?: string; contributions?: string[][];
  featured?: boolean; heroTitle?: string; heroDetail?: string;
  links?: { label: 'Live Demo' | 'Play on Game Jolt' | 'Source Code'; href: string }[];
  screenshots?: ProjectScreenshot[]; mobileScreenshots?: ProjectScreenshot[];
  mobileDescription?: string; mobileHighlights?: string[];
  screenshotCredit?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    graphTitle: "Energy API platform", contributions: [["API platform ownership", "React frontend delivery"], ["Typed frontend implementation"], ["Online API debugging", "Request and response integration"], ["Application management", "Developer workflows"]],
    featured: true,
    heroTitle: "Energy APIs", heroDetail: "Developer platform",
    kind: 'commercial', slug: 'renewable-energy-api', number: '01', title: 'Renewable-Energy API Platform', shortTitle: 'Making energy APIs accessible.',
    category: 'Energy · Developer experience', organization: 'NeuVerge-Tron / Sungrow',
    description: 'Led a standalone renewable-energy API platform, with responsibility for the React frontend, European delivery, online API debugging and application-management workflows.',
    tags: ['React', 'TypeScript', 'API integration', 'Developer experience'], role: 'API platform lead · React frontend',
    problem: 'Developers need to move from API documentation to application authorization and working calls across regional sites. The platform brings these workflows together with application management and operational tooling.',
    responsibilities: ['Lead the API platform and its React frontend delivery, including the European site.', 'Develop online API debugging workflows.', 'Implement application-management interfaces for developers.'],
    decisions: [
      { title: 'Regional context reaches the request layer', text: 'The platform separates build environments from business sites. Site selection determines the default gateway, while individual requests can override it for flows such as registration.' },
      { title: 'A debugger needs a different response contract', text: 'Online debugging checks application permissions and uses application-level credentials. It preserves the raw API response instead of applying the ordinary portal result wrapper.' }
    ],
    delivery: 'My scope covers API platform leadership, European frontend delivery, online debugging and application management. The interactive case uses illustrative data and makes no live API requests.',
    flow: ['Application access', 'Regional gateway', 'API response']
  },
  {
    graphTitle: "iSolarCloud", contributions: [["Plant and device interfaces", "European product adaptation"], ["Typed business interfaces", "Data-access workflows"], ["China-to-Europe frontend migration", "Regional routing and country rules", "Numbers, time zones and service dependencies"], ["Plant feature configuration", "Device parameter settings", "Country, firmware and protocol capabilities"]],
    featured: true,
    heroTitle: "iSolarCloud", heroDetail: "China → Europe",
    kind: 'commercial', slug: 'isolarcloud', number: '02', title: 'iSolarCloud — Solar & Energy Storage Platform', shortTitle: 'From China to Europe. From plants to devices.',
    category: 'Energy · Regional migration · Device operations', organization: 'NeuVerge-Tron (NVT) / Sungrow',
    description: 'Frontend work on iSolarCloud (阳光云), Sungrow’s solar and energy-storage management platform: migrating the China-based experience to Europe, developing plant and device feature settings, and adding EU Data Act data-access workflows.',
    tags: ['Vue 3', 'TypeScript', 'Multi-region delivery', 'Plant & device workflows'], role: 'Frontend development · China-to-Europe migration · Plant & device features',
    problem: 'Bringing an established energy platform from China to Europe involves more than translation. Cloud routing, product behavior, country eligibility, number and time interpretation, asynchronous services and device capabilities all need to agree while existing regional workflows continue to work.',
    responsibilities: ['Worked on the frontend migration of iSolarCloud from China to Europe.', 'Developed feature settings and business interfaces for individual plants and devices.', 'Worked with regional product behavior, service routing and country-specific rules.', 'Contributed to EU Data Act data-access workflows as part of the wider platform.'],
    decisions: [
      { title: 'Keep product, cloud and language distinct', text: 'European product behavior, the target cloud environment and the display language are separate contexts. Shared routing must resolve the intended environment, including requests that explicitly override the default service.' },
      { title: 'Country rules are business rules', text: 'The localized European product uses a configured set of allowed countries, while the original platform’s European-country path excludes countries assigned to that rollout. Reusing one filter would change eligibility.' },
      { title: 'Device settings depend on capabilities', text: 'Parameter-setting interfaces account for device country, grid type, firmware and protocol capabilities. A common device type alone does not determine whether a batch can use the same settings.' },
      { title: 'Trace a workflow through every service', text: 'Report exports involve an HTTP task, an MQTT connection and a download destination. Regional delivery has to consider the complete chain, including email entry points with their own cloud context.' }
    ],
    delivery: 'Frontend contributions spanning China-to-Europe migration, plant and device feature settings, and EU Data Act data access. Public visitor-demo screenshots illustrate the platform; workflow examples use local sample data.',
    flow: ['Regional context', 'Plant & device workflows', 'Data access'],
    screenshots: [
      { src: '/images/isolarcloud-plant-overview.png', width: 1800, height: 776, alt: 'The iSolarCloud public European visitor demo showing a residential solar and energy-storage plant overview and energy flow.', caption: 'Plant overview · Public European visitor demo.' },
      { src: '/images/isolarcloud-plant-devices.png', width: 1800, height: 776, alt: 'Battery, hybrid inverter, communication module and EV charger cards in the iSolarCloud public visitor demo.', caption: 'Plant devices · Public European visitor demo.' },
      { src: '/images/isolarcloud-energy-analysis.png', width: 1800, height: 776, alt: 'Energy statistics and power and battery state-of-charge curves in the iSolarCloud public visitor demo.', caption: 'Energy analysis · Public European visitor demo.' }
    ],
    screenshotCredit: { label: 'iSolarCloud public European visitor demo', href: 'https://web3.isolarcloud.eu/' }
  },
  {
    graphTitle: "Coffee & beer map", contributions: [["React map experience", "Server-side rendering"], ["Backend development", "Data import workflows"], ["500+ curated venues", "Data access policies"], ["Server-rendered web experience"]],
    featured: true,
    heroTitle: "Discovery map", heroDetail: "Independent product",
    kind: 'independent', slug: 'discovery-map', number: '03', title: 'Coffee & Craft Beer Discovery Map', shortTitle: 'Good places, thoughtfully mapped.',
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
    graphTitle: "AI sports assessment", contributions: [
      ["jQuery-to-React code migration", "React training and exam interfaces", "TV-based presentation"],
      ["Canvas drawing and manipulation", "Visual feedback presentation"],
      ["Camera capture", "Video-stream transmission to backend AI", "Scaling from 2 to 8 camera inputs"],
      ["Real-time scoring data", "Frontend result updates"],
      ["Audio-visual synchronization", "Post-training spoken results"],
      ["Multiple simultaneous participants", "Face-recognition integration", "Individual score presentation"]
    ],
    heroTitle: "AI sports assessment", heroDetail: "Canvas + real-time video",
    kind: 'commercial', slug: 'sports-education', number: '04', title: 'AI Sports Examination & Training System', shortTitle: 'From live movement to individual feedback.',
    category: 'Sports education · Real-time assessment', organization: 'Danzhu (淡竹)', status: 'Regional use · High-school entrance PE exams',
    description: 'Migrated a TV-based sports system from jQuery to React, used for high-school entrance PE examinations in parts of China, as well as sports-school training and middle-school PE classes. The frontend connects camera video with backend AI analysis using Canvas, video-stream transmission and WebSocket scoring updates, with synchronized audio-visual feedback and spoken results.',
    tags: ['jQuery → React', 'Canvas', 'Video streams', 'WebSocket', 'Audio-visual synchronization', 'Multi-person assessment'], role: 'Frontend development · React migration & real-time assessment',
    problem: 'The system is used for high-school entrance physical-education examinations in parts of China, as well as everyday training at sports schools and middle-school PE classes, with fitness assessment and analysis reports. Multiple people could train or take an exam together. The system needed face recognition to distinguish participants and had to turn camera input and backend AI scores into timely, understandable feedback on a TV display.',
    responsibilities: [
      'Migrated existing jQuery frontend code to React.',
      'Developed React interfaces for TV-based sports examinations, everyday training, fitness assessment and analysis reports.',
      'Worked with camera capture and video-stream transmission to the backend AI analysis system.',
      'Used Canvas drawing and manipulation to implement visual presentation.',
      'Integrated WebSocket-based real-time scoring data from the backend into the frontend.',
      'Handled audio-visual synchronization and spoken score announcements after training.',
      'Worked on multi-person assessment interfaces and integration with face recognition to distinguish participants and present individual results.'
    ],
    decisions: [
      { title: 'Scaling from two cameras to eight', text: 'Increasing camera inputs from two to eight provided more data, but the stream could stall in certain operating states. This became a prolonged debugging challenge that the team eventually resolved.' },
      { title: 'Modernize the existing frontend with React', text: 'Migrated the system’s existing jQuery code to React, bringing its training and examination interfaces into a component-based frontend while working with camera, scoring and feedback integrations.' },
      { title: 'Connect capture, AI analysis and presentation', text: 'The camera provided input to the backend AI analysis system, which returned scoring data to the frontend. My work focused on video transmission, data integration and presenting the results in the training and examination interfaces.' },
      { title: 'Use Canvas alongside real-time data', text: 'Canvas drawing and manipulation supported the visual interface, while WebSocket carried real-time scoring data from the backend. The frontend brought those updates into the ongoing assessment experience.' },
      { title: 'Keep visual and spoken feedback coordinated', text: 'The system required audio-visual synchronization during training and spoken results after each session. My frontend work included coordinating these forms of feedback with the assessment experience.' },
      { title: 'Support several participants in one session', text: 'Multiple people could train or take an exam together. The system used face recognition to distinguish participants; the frontend needed to present assessment data for the corresponding people.' },
      { title: 'Cover practice as well as examinations', text: 'The same system supported high-school entrance sports examinations and daily training, with scoring, fitness assessment and analysis reports. The frontend presented both the live session and its results.' }
    ],
    delivery: 'The system has been used for high-school entrance PE examinations in parts of China, as well as sports-school daily training and middle-school PE classes. My frontend work included jQuery-to-React migration, Canvas, video transmission, real-time scoring, audio-visual synchronization and multi-person assessment. AI analysis and face recognition were backend capabilities integrated into the frontend experience.',
    flow: ['Camera video', 'Backend AI analysis', 'Live scores + reports']
  },
  {
    graphTitle: "Low-code platform", contributions: [["Configurable pages", "Field-team applications"], ["Reusable components"], ["Theme switching"]],
    heroTitle: "Low-code tools", heroDetail: "Configurable interfaces",
    kind: 'commercial', slug: 'low-code-platform', number: '05', title: 'Internal Low-Code Platform', shortTitle: 'Reusable tools for field teams.',
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
    kind: 'commercial', slug: 'operations-monitoring', number: '06', title: 'State Grid Operations & Monitoring Platform', shortTitle: 'Reusable components. Workflow-aware interfaces.',
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
    kind: 'commercial', slug: 'ronghe-pay', number: '07', title: 'Ronghe Pay — Insurance Payments Platform', shortTitle: 'Care in every payment.',
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
    kind: 'independent', slug: 'mountain-chess', number: '08', title: 'Mountain Chess — Offline Chess for Hiking', shortTitle: 'A chessboard for a mountain break.',
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
    kind: 'independent', slug: 'pfand-pause', number: '09', title: 'Pfand Pause 2.0 — A Bottle-Return Puzzle', shortTitle: 'A new country. A familiar everyday puzzle.',
    graphTitle: 'Pfand Pause', category: 'Independent product · Puzzle game · Version 2.0', organization: 'Independent project', status: 'Published · Version 2.0',
    description: 'Inspired by my move to Germany and informal research with newly arrived students, I designed, built and published Pfand Pause. Version 2.0 turns a supermarket bottle-return machine into a layered matching puzzle: twenty untimed rounds, a seven-slot counter, glass sorting and a packaging quiz, with English, German and Chinese interfaces.',
    tags: ['React / TypeScript', 'Game rules / Verification', 'Responsive SVG / CSS', 'LocalStorage / i18n'], role: 'Independent developer · Research, game design, development and publishing',
    contributions: [
      ['Independent product ownership', 'Responsive desktop and mobile interfaces', 'Version 2.0 release'],
      ['Seven-slot matching rules', 'Twenty rounds with verified solution paths', 'Separate glass-sorting rules'],
      ['Original bottle and shop artwork', 'Touch and keyboard interaction', 'Animation-safe input queues'],
      ['English, German and Chinese', 'Saved completed rounds and preferences', 'Reduced motion and sound controls']
    ],
    problem: 'When I moved to Germany, unfamiliar drinks bottles were difficult to recognize. Informal research with newly arrived students suggested that people rarely seek out bottle information and find it hard to remember. I wanted to turn that everyday friction into an approachable product. Version 2.0 combines a fictional bottle-return puzzle with a separate packaging quiz that explains real return and recycling clues.',
    responsibilities: [
      'Owned the product from informal research and game design through React / TypeScript development, verification and publishing.',
      'Redesigned the 2.0 game around layered bottle cards, three-of-a-kind returns, a shared seven-slot counter and twenty untimed rounds.',
      'Added non-deposit glass sorting from round eleven and a separate eight-question packaging guide.',
      'Handled overlapping cards, queued taps, duplicate-click prevention and cancellation when restarting or leaving a round.',
      'Built original SVG / CSS visuals and layouts that fit desktop, mobile and embedded browser containers.',
      'Implemented English, German and Chinese interfaces, keyboard and touch controls, reduced motion, sound effects and local progress storage.',
      'Verified legal solution paths and boundary rules, including a seventh bottle that completes a triple before a full-counter loss is evaluated.'
    ],
    decisions: [
      { title: 'Separate the puzzle from real recycling guidance', text: 'Three matching bottles and seven slots are fictional puzzle rules. The packaging quiz separately explains return and recycling clues, using feedback after each answer. Refunds are simulated, and real return eligibility depends on packaging and shop rules.' },
      { title: 'Verify the same rules that players use', text: 'Pure TypeScript transitions handle exposed cards, matching, glass sorting and end states. Layered boards are constructed with legal verification paths, then checked through those transitions for availability, capacity and bottle conservation across all twenty rounds.' },
      { title: 'Keep repeated taps consistent during animation', text: 'Input is queued in order, with pending bottles marked immediately and duplicate picks rejected. Restarting or leaving a round clears pending work. This lets animation follow the game state without losing rapid taps on other exposed bottles.' },
      { title: 'Fit the entire interaction, not just the board', text: 'The layout responds to the actual container, including embedded frames. The board, counter and primary controls fit together; desktop and touch layouts are checked separately. Original SVG artwork keeps bottle shapes and packaging cues readable at different sizes.' },
      { title: 'Save completed progress with clear boundaries', text: 'Completed rounds and preferences are stored locally, with a migration for the revised campaign. Settings include English, German and Chinese, sound and reduced motion. Progress belongs to the current browser and does not synchronize across devices or hosting sites.' },
      { title: 'Create atmosphere without a countdown', text: 'The supermarket queue grows more impatient during inactivity, with optional visual and sound effects. Activity resets the pressure, and pausing or leaving the page stops it. There is no time penalty or timeout; the player can keep planning their next move.' }
    ],
    delivery: 'Published Pfand Pause and released version 2.0 with twenty rounds, a packaging quiz and later-round glass sorting. I owned research, product and game design, implementation, verification and publishing. The release brings the same game to desktop and mobile browsers, with language, sound and motion preferences and locally saved completed rounds.',
    flow: ['Read packaging clues', 'Match or sort bottles', 'Return the whole bag'],
    links: [
      { label: 'Play on Game Jolt', href: 'https://gamejolt.com/games/pfand-pause/1106213' },
      { label: 'Source Code', href: 'https://github.com/Logic-syd/PfandPause' }
    ],
    screenshots: [
      { src: '/images/pfand-pause-v2-desktop-start.png', width: 1440, height: 810, label: 'Start screen', alt: 'Pfand Pause 2.0 in English on a desktop browser, with its supermarket bottle-return illustration and game and recycling-guide entries.', caption: 'Version 2.0 · Desktop start screen · 1440 × 810.' },
      { src: '/images/pfand-pause-v2-desktop-game.png', width: 1440, height: 810, label: 'Layered puzzle', alt: 'The desktop Pfand Pause 2.0 puzzle showing layered bottle cards, the seven-slot counter and round controls after two real bottle selections.', caption: 'Version 2.0 · First round after two bottle selections · Desktop browser.' },
      { src: '/images/pfand-pause-v2-desktop-recycling.png', width: 1440, height: 810, label: 'Packaging guide', alt: 'The Pfand Pause 2.0 packaging quiz in English, presenting a bottle and return or recycling destinations on desktop.', caption: 'Version 2.0 · The separate packaging and recycling guide · Desktop browser.' }
    ],
    mobileDescription: 'On desktop, the bottle bag and counter sit side by side. On a phone, they stack vertically so the layered cards, all seven slots and round controls stay together. These are captures of the same 2.0 web release, in a mobile browser viewport.',
    mobileHighlights: ['Touch controls with queued bottle selections.', 'English, German and Chinese interfaces.', 'Completed rounds and preferences saved in the current browser.'],
    mobileScreenshots: [
      { src: '/images/pfand-pause-v2-mobile-start.png', width: 390, height: 844, label: 'Start screen', alt: 'Pfand Pause 2.0 start screen in a 390 by 844 mobile browser viewport, with its bottle-return illustration and touch controls.', caption: 'Version 2.0 · Mobile start screen · 390 × 844.' },
      { src: '/images/pfand-pause-v2-mobile-game.png', width: 390, height: 844, label: 'Touch puzzle', alt: 'The Pfand Pause 2.0 first round in a mobile browser viewport, showing the layered cards and seven-slot counter after two real selections.', caption: 'Version 2.0 · Mobile puzzle · 390 × 844.' }
    ]
  },
  {
    kind: 'commercial', slug: 'smart-city-dashboards', number: '10', title: 'Smart City Dashboards', shortTitle: 'A shared foundation, adapted to each place.',
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
    kind: 'commercial', slug: 'glp-sme-financing', number: '11', title: 'SME Financing Platform', shortTitle: 'React interfaces for cross-region finance.',
    graphTitle: 'SME financing', category: 'Fintech · React business interfaces', organization: 'GLP (普洛斯)', status: 'Commercial frontend work',
    description: 'React frontend development for an SME financing system spanning domestic and overseas markets, with a focus on business interfaces and requirements around time zones, currencies and exchange rates.',
    tags: ['React', 'Business interfaces', 'Time zones', 'Currencies & exchange rates'], role: 'React frontend development',
    contributions: [
      ['React business interfaces', 'Business requirements to UI'],
      ['SME financing workflows'],
      ['Cross-region date and time context'],
      ['Currency-aware financial presentation', 'Exchange-rate context']
    ],
    problem: 'An SME financing system needed business interfaces for domestic and overseas markets, where dates, currencies and exchange rates required careful handling.',
    responsibilities: [
      'Developed React frontend interfaces for the financing system.',
      'Worked on business screens supporting SME financing workflows.',
      'Handled frontend requirements involving time zones, currencies and exchange rates.'
    ],
    decisions: [
      { title: 'React for business interfaces', text: 'Worked on React interfaces for the financing system, translating business requirements into frontend screens.' },
      { title: 'Date and time interpretation across regions', text: 'Time-zone requirements make the distinction between a timestamp and its local display important. Dates and times need an unambiguous regional context when a financing workflow spans domestic and overseas markets.' },
      { title: 'Currency-aware amounts and exchange rates', text: 'Financial interfaces need to keep an amount’s currency clear and distinguish monetary values from the exchange rates used to interpret them. Relevant frontend concerns include decimal precision, rounding and number formatting across markets.' },
      { title: 'Separate business values from display formatting', text: 'Cross-region financial requirements call for a clear distinction between underlying business data and how a screen presents it. Date, amount and currency formatting need to preserve the meaning of the data throughout the interface.' }
    ],
    delivery: 'React frontend contributions to an SME financing system at GLP, with experience in business interfaces and cross-region financial requirements.',
    flow: ['React interfaces', 'Financing workflows', 'Time + currency context']
  },
  {
    kind: 'commercial', slug: 'running-mini-program', number: '12', title: 'Student Sports Mini-Program & Teacher Dashboard', shortTitle: 'From student training to teacher insights.',
    graphTitle: 'Student sports platform', category: 'Education · Mobile training & administration', organization: 'Danzhu (淡竹)', status: 'Commercial work · Used by schools',
    description: 'Vue / uni-app student training interfaces and a teacher management dashboard, serving multiple universities and Shanghai primary schools. The product combines running, camera-based exercise counting, weak-network data saving and deferred uploads with student results and report exports.',
    tags: ['Vue / uni-app', 'Camera-based exercise tracking', 'Weak-network resilience', 'Peak running traffic', 'Teacher dashboard & exports', 'Age-specific experiences'], role: 'Frontend development · Student mini-program & teacher dashboard',
    contributions: [
      ['Student running and free-training interfaces'],
      ['Phone-camera capture', 'Sit-ups, jumping jacks and squats', 'Exercise statistics presentation'],
      ['Save training data under weak connectivity', 'Deferred data uploads'],
      ['High-concurrency running periods', 'Student training frontend'],
      ['Student result management', 'Teacher score-report exports'],
      ['University and primary-school versions', 'Different AI movement criteria', 'Adapted visual and spoken feedback']
    ],
    problem: 'Students needed running and free-training tools, while teachers needed a management system to review results and export score reports. Running periods brought high concurrent usage, and weak connectivity required training data to be saved for later upload. University and primary-school versions also needed different movement-assessment criteria and age-appropriate visual and spoken feedback.',
    responsibilities: [
      'Developed Vue / uni-app student interfaces for running and free training, including running metrics, route maps and checkpoints.',
      'Integrated phone-camera capture for exercise statistics across sit-ups, jumping jacks, squats and other activities.',
      'Worked on weak-network data saving and deferred uploads for student training sessions.',
      'Developed frontend interfaces for a product with high concurrent usage during peak running periods.',
      'Worked on teacher management interfaces for reviewing student results and exporting score reports.',
      'Adapted interface presentation and voice feedback for university and primary-school versions with different AI movement-assessment criteria.'
    ],
    decisions: [
      { title: 'Keep training data through weak connectivity', text: 'The mini-program saved training data under weak-network conditions and deferred uploads. This allowed recording and transmission to happen at different times, addressing the connectivity constraints of student training.' },
      { title: 'Combine running with camera-based exercise tracking', text: 'Running and free training belonged to one mini-program. Free-training activities included sit-ups, jumping jacks and squats, with phone-camera input supporting exercise statistics.' },
      { title: 'Work within peak running usage', text: 'Running periods created high-concurrency demand across the product. My contribution was on the frontend for this student training environment, including its weak-network data handling.' },
      { title: 'Connect student activity to teacher reporting', text: 'The teacher management system let teachers view student results and export score reports, connecting student training with school assessment and administration.' },
      { title: 'Adapt the experience for different age groups', text: 'University and primary-school versions used different AI movement-assessment standards. Visual presentation and voice feedback were also adjusted for the respective student groups.' }
    ],
    delivery: 'The mini-program served multiple universities and multiple primary schools in Shanghai. My frontend work covered student training, weak-network data handling, teacher result management and report exports, with separate university and primary-school experiences. The gallery shows an original, privacy-redacted running-session screenshot.',
    flow: ['Student training', 'Save + upload results', 'Teacher review + export']
  },
  {
    kind: 'independent', slug: 'weibo-deleter', number: '13', title: 'Weibo Deleter — A Small Browser Extension', shortTitle: 'A small tool for a friend’s repetitive task.',
    graphTitle: 'Weibo deleter', category: 'Personal tool · Browser extension', organization: 'Independent project', status: 'Personal tool · Public source',
    description: 'A small React browser extension built for a friend who wanted to delete Weibo posts in batches. It turns a deeply nested, roughly four-click deletion flow into a selectable batch operation.',
    tags: ['React / Vite', 'Chrome Extension / MV3', 'DOM automation'], role: 'Independent developer',
    contributions: [
      ['Post selection popup', 'Progress and result messages'],
      ['Popup-to-content-script messaging'],
      ['Nested menu and confirmation handling', 'Sequential batch operations', 'Adapting to Weibo UI changes']
    ],
    problem: 'A friend wanted to delete old Weibo posts in batches, but Weibo did not offer a quick way to do it. The delete action was buried behind several interactions—roughly four clicks—and frequent interface changes made the relevant elements difficult to locate.',
    responsibilities: [
      'Built a React / Vite extension popup for selecting posts and showing operation progress.',
      'Implemented content-script DOM interaction and messaging to process selected posts sequentially.',
      'Worked on locating nested menu actions and confirmation controls as Weibo’s page structure changed.'
    ],
    decisions: [
      { title: 'Follow the page interaction step by step', text: 'The content script opens each post’s menu, locates the deletion action and handles confirmation, with pauses between steps for the page to respond.' },
      { title: 'Expect the interface to change', text: 'The difficult part was locating controls that only appear after earlier clicks. Weibo’s redesigns also meant revisiting DOM selectors and menu structure rather than treating the automation as a one-time implementation.' }
    ],
    delivery: 'A small personal browser-extension project with public source code, built around a friend’s practical need.',
    flow: ['Select posts', 'Menu + confirmation', 'Batch progress'],
    links: [{ label: 'Source Code', href: 'https://github.com/Logic-syd/weibo-deleter' }]
  },
  {
    kind: 'commercial', slug: 'medical-curriculum', number: '14', title: 'Public Health Curriculum & Knowledge Explorer', shortTitle: 'Majors, shared courses and the knowledge between them.',
    graphTitle: 'PKU Public Health curriculum', category: 'Public health education · Existing-system redesign', organization: 'School of Public Health, Peking University', affiliation: 'Peking University Health Science Center', status: 'Launched · Around 6 weeks of development',
    description: 'Redesigned an existing curriculum system for the School of Public Health, Peking University, as an independent collaborator through a partner company. As the sole frontend developer, I worked with one backend developer to launch the React and Three.js experience in around six weeks, during August–September 2024.',
    tags: ['React', 'Three.js', 'Curriculum relationships', 'Demonstration UI & performance', 'Course-selection workflows'], role: 'Sole frontend developer · One backend collaborator',
    contributions: [
      ['Sole frontend ownership', 'Existing-system redesign', 'Basic course-selection operations'],
      ['Sphere-based 3D curriculum explorer', 'Left-click, right-click and double-click', 'Free node dragging'],
      ['Majors and overlapping courses', 'Shared courses', 'Course-specific knowledge points'],
      ['High-fidelity UI reproduction', 'Customized node labels', 'Repeated-interaction stability', 'Event-binding overhead'],
      ['Course browsing and selection interfaces']
    ],
    problem: 'An existing medical education system needed a more polished visual experience. Its majors, overlapping and shared courses, and course-specific knowledge points also called for a 3D presentation. The redesign paired that demonstration experience with practical course-selection interfaces, under high UI-reproduction, label-customization and performance requirements. One frontend developer and one backend developer completed the work through to launch in around six weeks.',
    responsibilities: [
      'Owned frontend development as the sole frontend developer, collaborating independently through a partner company during August–September 2024.',
      'Built React interfaces to redesign the existing medical education system.',
      'Developed a Three.js sphere-based view of majors, courses and course-specific knowledge points, with distinct left-click, right-click, double-click and free-drag interactions.',
      'Presented course overlap and shared courses across different majors.',
      'Worked on high-fidelity UI reproduction and customized node labels for the demonstration screen.',
      'Worked on stability under repeated 3D interactions, alongside the demonstration’s rendering performance requirements.',
      'Implemented basic course-selection operations alongside the curriculum explorer.',
      'Worked with one backend developer to complete the redesign and launch in around six weeks.'
    ],
    decisions: [
      { title: 'Stability through repeated interaction', text: 'I worked on the stability of the 3D experience under repeated operation. Continuous node dragging, repeated selection and successive exploration of the curriculum needed consistent interaction state and responsive behavior throughout a demonstration. This stability work formed part of my frontend delivery, alongside the highly customized visual presentation and rendering performance requirements.' },
      { title: 'Coordinate complex mouse events', text: 'Left-click, right-click and double-click each had their own operation, alongside free node dragging. I worked on distinguishing and coordinating these interaction paths so one gesture would not unintentionally trigger another operation. The number of event bindings also affected performance, making event handling part of the repeated-interaction stability work for the demonstration.' },
      { title: 'A curriculum is more than a tree', text: 'Different majors can share the same course, including common courses taken across programmes. The relationship model needs to distinguish a course from its membership in several majors, while retaining the knowledge points belonging to that course.' },
      { title: 'Shared courses create visual complexity', text: 'A shared course can connect to many majors. Showing every relationship with the same emphasis can make a 3D view difficult to read. The design challenge is to preserve the overall structure while making an individual major, course and its knowledge points understandable.' },
      { title: 'Exploration and course operations need a common context', text: 'The 3D presentation and the React course interfaces describe the same educational content. A course’s identity and its major relationships need to remain consistent across these views; the curriculum structure and a student’s course selection represent different kinds of state.' },
      { title: 'Precise UI reproduction includes the labels', text: 'The demonstration screen had high UI-reproduction requirements, including customized labels. The appearance of the sphere nodes, connections and labels needed to follow the requested design consistently throughout the interactive view.' }
    ],
    delivery: 'Completed and launched in around six weeks during August–September 2024. I was the sole frontend developer, working with one backend developer through a partner company on the redesign of an existing education system at the School of Public Health, Peking University. My scope covered React course interfaces, interactive Three.js curriculum visualization, distinct mouse events and free node dragging, customized labels, high-fidelity UI reproduction and stability under repeated 3D interaction. The workflow illustration summarizes the project context.',
    flow: ['Majors + shared courses', '3D knowledge exploration', 'Course selection']
  }
];
