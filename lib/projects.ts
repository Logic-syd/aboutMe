export type ProjectScreenshot = { src: string; width: number; height: number; alt: string; caption: string; label?: string };

export type Project = {
  kind: 'commercial' | 'independent'; slug: string; number: string; title: string; shortTitle: string; category: string; organization: string;
  affiliation?: string; status?: string; inDevelopment?: boolean; archived?: boolean; description: string; tags: string[]; role: string;
  problem: string; responsibilities: string[]; decisions: { title: string; text: string }[];
  delivery?: string; flow: string[]; lesson?: string; graphTitle?: string; contributions?: string[][];
  caseHeadings?: { problem: string; approach: string; delivery?: string };
  featured?: boolean; heroTitle?: string; heroDetail?: string;
  links?: { label: 'Live Demo' | 'Play on Game Jolt' | 'Source Code'; href: string }[];
  screenshots?: ProjectScreenshot[]; mobileScreenshots?: ProjectScreenshot[];
  screenshotLayout?: 'portrait-grid';
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
    description: "React frontend leadership for a renewable-energy API platform, including European delivery, an online API debugger and application-management workflows.",
    tags: ['React', 'TypeScript', 'API integration', 'Developer experience'], role: 'API platform lead · React frontend',
    problem: 'Developers need to move from API documentation to application authorization and working calls across regional sites. The platform brings these workflows together with application management and operational tooling.',
    responsibilities: ['Lead the API platform and its React frontend delivery, including the European site.', 'Develop online API debugging with regional gateways, application credentials and permission checks.', 'Preserve raw debugger responses and distinguish network failures from business errors.', 'Implement application-management interfaces for developers.'],
    decisions: [
      { title: 'Regional context reaches the request layer', text: 'The platform separates build environments from business sites. Site selection determines the default gateway, while individual requests can override it for flows such as registration.' },
      { title: 'A debugger needs a different response contract', text: 'Online debugging checks application permissions and uses application-level credentials. It preserves the raw API response instead of applying the ordinary portal result wrapper.' },
      { title: 'Separate network failures from business errors', text: 'A completed HTTP request can still report a business failure. The debugger preserves the response for inspection, while the interface distinguishes transport failures from application-level errors so developers can understand where a call failed.' }
    ],
    flow: ['Application access', 'Regional gateway', 'API response']
  },
  {
    graphTitle: "iSolarCloud", contributions: [["Plant and device interfaces", "European product adaptation"], ["Typed business interfaces", "Data-access workflows"], ["China-to-Europe frontend migration", "Regional routing and country rules", "Numbers, time zones and service dependencies"], ["Plant feature configuration", "Device parameter settings", "Country, firmware and protocol capabilities"], ["CSS-in-JS business interfaces"]],
    featured: true,
    heroTitle: "iSolarCloud", heroDetail: "China → Europe",
    kind: 'commercial', slug: 'isolarcloud', number: '02', title: 'iSolarCloud — Solar & Energy Storage Platform', shortTitle: 'From China to Europe. From plants to devices.',
    category: 'Energy · Regional migration · Device operations', organization: 'NeuVerge-Tron (NVT) / Sungrow',
    description: "Vue and TypeScript frontend development for Sungrow’s solar and energy-storage platform: China-to-Europe migration, plant and device settings, and EU Data Act data access.",
    tags: ['Vue 3', 'TypeScript', 'Multi-region delivery', 'Plant & device workflows', 'CSS-in-JS'], role: 'Frontend development · China-to-Europe migration · Plant & device features',
    problem: 'Bringing an established energy platform from China to Europe involves more than translation. Cloud routing, product behavior, country eligibility, number and time interpretation, asynchronous services and device capabilities all need to agree while existing regional workflows continue to work.',
    responsibilities: ['Worked on the frontend migration of iSolarCloud from China to Europe.', 'Developed feature settings and business interfaces for individual plants and devices.', 'Worked with regional product behavior, service routing and country-specific rules.', 'Implemented EU Data Act data-access and privacy-consent interfaces, including authorization, scope selection, asynchronous export states and downloads.', 'Coordinated country rules with plant and device states: explained disabled features, hid unavailable functions and provided fallback actions for abnormal states.'],
    decisions: [
      { title: 'Keep product, cloud and language distinct', text: 'European product behavior, the target cloud environment and the display language are separate contexts. Shared routing must resolve the intended environment, including requests that explicitly override the default service.' },
      { title: 'Country rules are business rules', text: 'The localized European product uses a configured set of allowed countries, while the original platform’s European-country path excludes countries assigned to that rollout. Reusing one filter would change eligibility.' },
      { title: 'Device settings depend on capabilities', text: 'Parameter-setting interfaces account for device country, grid type, firmware and protocol capabilities. A common device type alone does not determine whether a batch can use the same settings.' },
      { title: 'Trace a workflow through every service', text: 'Report exports involve an HTTP task, an MQTT connection and a download destination. Regional delivery has to consider the complete chain, including email entry points with their own cloud context.' },
      { title: 'Make consent and data scope explicit', text: 'EU Data Act data-access work included authorization and privacy-consent workflows. Scope selection, asynchronous preparation and download handling need to remain connected so the interface makes the requested data and current task state clear.' },
      { title: 'Make unavailable features understandable', text: 'I coordinated plant and device states with country-specific rules, explaining disabled features, hiding unavailable functions and providing fallback actions for abnormal states. Feature availability is part of the workflow, not just a visual toggle.' }
    ],
    flow: ['Regional context', 'Plant & device workflows', 'Data access'],
    screenshots: [
      { src: '/images/isolarcloud-plant-overview.png', width: 1800, height: 776, alt: 'The iSolarCloud public European visitor demo showing a residential solar and energy-storage plant overview and energy flow.', caption: 'Plant overview · Public European visitor demo.' },
      { src: '/images/isolarcloud-plant-devices.png', width: 1800, height: 776, alt: 'Battery, hybrid inverter, communication module and EV charger cards in the iSolarCloud public visitor demo.', caption: 'Plant devices · Public European visitor demo.' },
      { src: '/images/isolarcloud-energy-analysis.png', width: 1800, height: 776, alt: 'Energy statistics and power and battery state-of-charge curves in the iSolarCloud public visitor demo.', caption: 'Energy analysis · Public European visitor demo.' }
    ],
    screenshotCredit: { label: 'iSolarCloud public European visitor demo', href: 'https://web3.isolarcloud.eu/' }
  },
  {
    graphTitle: "Coffee & beer map", contributions: [["React map experience", "Server-side rendering"], ["Backend development", "Data import workflows"], ["500+ curated venues", "Data access policies"], ["Server-rendered web experience"], ["Initial web SDK", "Third-party website embedding"]],
    featured: true,
    heroTitle: "Discovery map", heroDetail: "Independent product",
    kind: 'independent', slug: 'discovery-map', number: '03', title: 'Coffee & Craft Beer Discovery Map', shortTitle: 'Good places, thoughtfully mapped.',
    category: 'Independent product · Full stack', organization: 'Personal project', status: 'In development · Not released', inDevelopment: true,
    description: 'An independently built discovery product with 500+ curated places, connecting a React / Next.js map experience to a structured location dataset.',
    caseHeadings: {"problem": "From a collection of places to a useful map.", "approach": "The data behind discovery."},
    tags: ['Next.js', 'Node.js / Express', 'Supabase / PostgreSQL', 'SSR', 'Web SDK'], role: 'Independent developer · Frontend and backend',
    problem: "A collection of favourite places becomes harder to browse as it grows. The product needs a consistent venue dataset, a map people can explore and a way to bring that discovery experience into another website.",
    responsibilities: [
      "Building the full-stack product, from the React / Next.js interface to the Node.js / Express backend.",
      "Curating and importing venue records into Supabase / PostgreSQL, with data-access policies.",
      "Developing the standalone map and an initial embeddable web SDK.",
    ],
    decisions: [
      {"title": "Give venue data a shared structure", "text": "Imports feed the PostgreSQL dataset through Supabase. Data organization and access policies are part of the backend work, so the map has a structured source to query as the collection grows."},
      {"title": "Combine server rendering and map interaction", "text": "Next.js provides server-side rendering for the web experience; React handles the interactive map. These are two parts of the same product, with different rendering responsibilities."},
      {"title": "Support a host website", "text": "The initial web SDK makes Coffee Map functionality embeddable in third-party websites. It adds an integration surface beyond the standalone app and is still part of the project’s ongoing development."},
    ],
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
    category: 'Sports education · Real-time assessment', organization: 'Danzhu', status: 'Regional use · High-school entrance PE exams',
    description: "Migrated a TV-based sports examination and training frontend from jQuery to React, integrating camera streams, backend AI scoring, Canvas and WebSocket updates. The system is used in regional high-school entrance PE exams and school training in China.",
    tags: ['jQuery → React', 'Canvas', 'Video streams', 'WebSocket', 'Audio-visual synchronization', 'Multi-person assessment'], role: 'Frontend development · React migration & real-time assessment',
    problem: "Several people could train or take an exam together. Camera input, recognition data and backend scores had to stay associated with the right participant while visual and spoken feedback remained coordinated on a TV display.",
    responsibilities: [
      "Migrated the examination and training interfaces from jQuery to React.",
      "Integrated camera capture, video transmission and WebSocket scoring updates with Canvas presentation.",
      "Developed multi-person result displays, analysis reports and synchronized spoken feedback.",
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
    flow: ['Camera video', 'Backend AI analysis', 'Live scores + reports']
  },
  {
    graphTitle: "Low-code platform", contributions: [["Vue 3 internal platform", "Vue 2 integration into the company system"], ["Composite components", "Component data flow"], ["Drag-and-drop hierarchy", "Nested page configuration"], ["One-click theme switching"]],
    heroTitle: "Low-code tools", heroDetail: "Configurable interfaces",
    kind: 'commercial', slug: 'low-code-platform', number: '05', title: 'Internal Low-Code Platform', shortTitle: 'Compose the interface. Keep the data connected.',
    category: 'Developer tools · Internal platform', organization: 'Longshine', status: 'Commercial work · Interactive reconstruction',
    description: "An internal low-code platform for marketing and construction teams to assemble simple apps. I developed composite components and one-click theme switching.",
    caseHeadings: {"problem": "Simple apps for internal teams.", "approach": "Components, hierarchy and shared appearance."},
    tags: ['Vue 3 → Vue 2', 'Composite components', 'Drag-and-drop', 'Theming'], role: 'Frontend development · Composite components & theming',
    problem: "As low-code development gained momentum, our team built a platform for colleagues outside engineering. They needed to assemble pages from reusable parts while keeping nested fields, component placement and the application’s appearance consistent.",
    responsibilities: [
      "Participated in technical selection and built composite components, including their data flow.",
      "Worked on nested drag-and-drop relationships in the page builder.",
      "Implemented application-wide theme switching.",
    ],
    decisions: [
      {"title": "Values and configuration across nested fields", "text": "A composite component contains smaller interface elements. I worked on how values and configuration flowed between the parent and its children, so editing the assembled page kept those parts in agreement."},
      {"title": "A drop changes the component hierarchy", "text": "Moving a component can change which container owns it. The drag-and-drop work had to preserve parent-child relationships as well as the visible placement of the component."},
      {"title": "One theme across the composed app", "text": "A theme change needed to reach the reusable components and the assembled interface together. I implemented this switching behavior so a page kept a consistent appearance after customization."},
      {"title": "Vue 3 to Vue 2 for company integration", "text": "The platform began as an internal Vue 3 application. It later moved to Vue 2 to join the company’s wider micro-frontend system; compatibility with that existing system drove the framework change."},
    ],
    flow: ['Reusable components', 'Page hierarchy + data flow', 'Marketing + construction apps']
  },
  {
    graphTitle: "Component library & workflows", contributions: [["Component-library development"], ["Typed frontend implementation"], ["Reusable UI building blocks", "Shared enterprise interfaces"], ["Work-order system interfaces", "Business workflow understanding"], ["Restricted intranet debugging", "API requests, Cookies and permissions"]],
    heroTitle: "Operations", heroDetail: "Component library + workflows",
    kind: 'commercial', slug: 'operations-monitoring', number: '06', title: 'State Grid Operations & Monitoring Platform', shortTitle: 'Reusable components. Workflow-aware interfaces.',
    category: 'Enterprise systems · Component library & workflows', organization: 'Longshine · State Grid project', status: 'Commercial work · Written case study',
    description: "Shared React and TypeScript components and work-order interfaces for a State Grid management system at Longshine, within a development programme of approximately 1,000 people.",
    caseHeadings: {"problem": "Shared UI inside a large enterprise system.", "approach": "Requests, permissions and interrupted sessions."},
    tags: ['React', 'TypeScript', 'Component library', 'Business workflows', 'Browser networking'], role: 'Frontend development · Component library & work-order system',
    problem: "Work-order screens needed to fit a shared management system and its business processes. Deployment inside State Grid’s restricted intranet added integration constraints around browser requests, Cookies, permissions and authentication.",
    responsibilities: [
      "Developed reusable components for the shared frontend library and applied them to work-order interfaces.",
      "Investigated API and browser-networking issues in the restricted intranet.",
      "Implemented session recovery and the frontend behavior for single-session access.",
    ],
    decisions: [
      {"title": "Trace the deployed request", "text": "Intranet integration issues required inspecting browser requests, Cookies and permissions together. A component working locally did not settle whether its request had the necessary access context in the deployed system."},
      {"title": "Recover from an expired session", "text": "Session-error handling cleared stale frontend state and redirected the user to login. The transition needed to leave the invalid session consistently instead of keeping business screens active with outdated authentication."},
      {"title": "Explain a sign-out caused by another login", "text": "When the system moved to single-session access, a login elsewhere could end the current session. I implemented the notification and sign-out behavior so users understood the interruption and returned through authentication."},
    ],
    flow: ['Shared component library', 'Work-order interfaces', 'Business workflows']
  },
  {
    graphTitle: "Ronghe Pay", contributions: [["Vue 2 frontend rebuild", "PHP-based product upgrade"], ["Insurer and bank configuration", "Bank-specific response fields"], ["Real-time payment safeguards", "Duplicate-payment prevention"], ["Large-data rendering optimization"], ["Collections, payouts and reconciliation"]],
    kind: 'commercial', slug: 'ronghe-pay', number: '07', title: 'Ronghe Pay — Insurance Payments Platform', shortTitle: 'Care in every payment.',
    category: 'Fintech · Collections & payouts', organization: 'Fingard · Ronghe Pay',
    affiliation: 'The name combines “Ronghe” (integration in Chinese) with “Pay”: integrated payments.',
    status: 'Commercial project · Written case study',
    description: "Rebuilt the frontend of a PHP-based insurance payments product in Vue 2 in 2018, then supported new insurance-company and bank integrations as the platform grew.",
    caseHeadings: {"problem": "Many institutions, one payment workflow.", "approach": "Bank responses and payment safeguards."},
    tags: ['Vue 2', 'Multi-bank integration', 'Payment safety', 'Rendering performance', 'Reconciliation'], role: 'Frontend development · Rebuild & ongoing integrations',
    problem: "Insurers used the platform for premium collections, claim payouts and reconciliation. Each new institution brought its own configuration and bank API contract. Larger datasets and real-time payments added requirements for responsive rendering and protection against repeated submissions.",
    responsibilities: [
      "Built the Vue 2 frontend from the ground up during the product upgrade.",
      "Integrated institution-specific configuration and adapted bank response fields for the payment interfaces.",
      "Optimized rendering for larger payment datasets and implemented frontend submission safeguards.",
    ],
    decisions: [
      {"title": "Normalize only where responsibility is clear", "text": "Bank APIs returned different structures and fields. The backend normalized some differences; others reached the frontend unchanged. I adapted those remaining fields and institution-specific configuration so the payment screens could interpret each integration correctly."},
      {"title": "Guard repeated payment actions", "text": "Real-time payment workflows needed protection against duplicate payments. My work handled repeated submissions in the frontend, alongside backend processing. These interaction safeguards were one part of the payment-safety requirements, not a replacement for server-side protection."},
      {"title": "Carry payment context through reconciliation", "text": "The product supported file-based batches and single transactions, authorized-bank collections and customer claim payouts. Real-time settlement depended on the bank’s capabilities. Reconciliation statements gave insurers the records needed to check completed money movements."},
    ],
    flow: ['Insurer + bank configuration', 'Payment workflows + safeguards', 'Reconciliation statements']
  },
  {
    kind: 'independent', slug: 'mountain-chess', number: '08', title: 'Mountain Chess — Offline Chess for Hiking', shortTitle: 'A chessboard for a mountain break.',
    graphTitle: 'Mountain chess', category: 'Personal product · Offline game', organization: 'Independent project', status: 'Published · Play online',
    description: 'I love hiking and chess, so I built a game for solo breaks in the mountains: a local computer opponent, saved games and offline play after the first online setup.',
    caseHeadings: {"problem": "A game without a signal or an opponent.", "approach": "Offline readiness and on-device play.", "delivery": "Ready before the hike."},
    tags: ['JavaScript', 'PWA / Service Worker', 'Local chess engine', 'LocalStorage / i18n'], role: 'Independent developer · Product, interface and game logic',
    contributions: [
      ['Responsive board and game controls', 'No framework or runtime dependencies'],
      ['Versioned asset caching', 'Offline-readiness checks'],
      ['Legal moves and game outcomes', 'Local search with three difficulty settings'],
      ['Save and resume on the same device', 'Chinese, English and German interfaces']
    ],
    problem: "A mountain break can be short, with no reliable signal. The game needed to open offline, provide a local opponent, remember an unfinished position and avoid unnecessary phone activity between moves.",
    responsibilities: [
      "Designed the board, controls and game-result screens, and implemented the chess rules and local opponent.",
      "Built offline caching and readiness checks, saved games and power-saving behavior.",
      "Published the static PWA on GitHub Pages with Chinese, English and German interfaces.",
    ],
    decisions: [
      { title: 'Make offline readiness something I can check', text: 'A Service Worker caches the application, chess pieces and language resources. The readiness check verifies the active worker, version and cached files. Before a hike, I can check those resources and reopen the game offline to confirm it is ready.' },
      { title: 'Keep the game and opponent on the device', text: 'Native HTML, CSS and JavaScript keep the application free of framework and runtime dependencies. The computer uses shallow minimax search with alpha-beta pruning and position evaluation. Three settings adjust search and move selection for casual play without a server.' },
      { title: 'Spend work only when it is needed', text: 'The computer calculates during its own turn. Pending computer turns pause when the page is hidden; power-saving mode is on by default and reduces animation while disabling sound and vibration. Move highlights and game-result feedback remain available.' },
      { title: 'Let a short break become a resumable game', text: 'LocalStorage preserves the position, move history and preferences in the same browser. Undo, board rotation and side selection support casual sessions. The three interface languages are cached too, and switching language keeps the current game intact.' }
    ],
    delivery: "The game and source are public. Offline play requires an initial online visit and completed caching; a saved game stays in the same device and browser.",
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
    description: "A bottle-return puzzle inspired by moving to Germany. I researched, designed and built Pfand Pause; version 2.0 has twenty untimed rounds, glass sorting and a separate packaging quiz.",
    caseHeadings: {"problem": "An unfamiliar everyday routine.", "approach": "Game rules that survive rapid input.", "delivery": "Version 2.0 is published."},
    tags: ['React / TypeScript', 'Game rules / Verification', 'Responsive SVG / CSS', 'LocalStorage / i18n'], role: 'Independent developer · Research, game design, development and publishing',
    contributions: [
      ['Independent product ownership', 'Responsive desktop and mobile interfaces', 'Version 2.0 release'],
      ['Seven-slot matching rules', 'Twenty rounds with verified solution paths', 'Separate glass-sorting rules'],
      ['Original bottle and shop artwork', 'Touch and keyboard interaction', 'Animation-safe input queues'],
      ['English, German and Chinese', 'Saved completed rounds and preferences', 'Reduced motion and sound controls']
    ],
    problem: "Informal research with newly arrived students suggested that people rarely look up bottle information and find it difficult to remember. I wanted to make packaging clues approachable through play, while keeping fictional puzzle rules separate from real recycling guidance.",
    responsibilities: [
      "Owned informal research, product and game design, React / TypeScript development and publishing.",
      "Built the layered three-of-a-kind puzzle with a seven-slot counter, plus non-deposit glass sorting from round eleven and an eight-question packaging guide.",
      "Created the SVG / CSS artwork and responsive layouts, with touch, keyboard, language, sound and reduced-motion controls.",
      "Verified solution paths and boundary rules across all twenty rounds.",
    ],
    decisions: [
      { title: 'Separate the puzzle from real recycling guidance', text: 'Three matching bottles and seven slots are fictional puzzle rules. The packaging quiz separately explains return and recycling clues, using feedback after each answer. Refunds are simulated, and real return eligibility depends on packaging and shop rules.' },
      { title: 'Verify the same rules that players use', text: 'Pure TypeScript transitions handle exposed cards, matching, glass sorting and end states. Layered boards are constructed with legal verification paths, then checked through those transitions for availability, capacity and bottle conservation across all twenty rounds.' },
      { title: 'Keep repeated taps consistent during animation', text: 'Input is queued in order, with pending bottles marked immediately and duplicate picks rejected. Restarting or leaving a round clears pending work. This lets animation follow the game state without losing rapid taps on other exposed bottles.' },
      { title: 'Fit the entire interaction, not just the board', text: 'The layout responds to the actual container, including embedded frames. The board, counter and primary controls fit together; desktop and touch layouts are checked separately. Original SVG artwork keeps bottle shapes and packaging cues readable at different sizes.' },
      { title: 'Save completed progress with clear boundaries', text: 'Completed rounds and preferences are stored locally, with a migration for the revised campaign. Settings include English, German and Chinese, sound and reduced motion. Progress belongs to the current browser and does not synchronize across devices or hosting sites.' },
      { title: 'Create atmosphere without a countdown', text: 'The supermarket queue grows more impatient during inactivity, with optional visual and sound effects. Activity resets the pressure, and pausing or leaving the page stops it. There is no time penalty or timeout; the player can keep planning their next move.' }
    ],
    delivery: "Version 2.0 is playable on Game Jolt, with public source code. The English, German and Chinese interfaces share the same campaign. Completed rounds and preferences are saved in the current browser.",
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
    mobileDescription: "The desktop bottle bag and counter sit side by side. On a phone they stack, keeping the cards, seven slots and round controls together. These captures show the same 2.0 release at 390 × 844.",
    mobileHighlights: ["Tap exposed bottles to queue a selection.", "Keep the counter and next move in view."],
    mobileScreenshots: [
      { src: '/images/pfand-pause-v2-mobile-start.png', width: 390, height: 844, label: 'Start screen', alt: 'Pfand Pause 2.0 start screen in a 390 by 844 mobile browser viewport, with its bottle-return illustration and touch controls.', caption: 'Version 2.0 · Mobile start screen · 390 × 844.' },
      { src: '/images/pfand-pause-v2-mobile-game.png', width: 390, height: 844, label: 'Touch puzzle', alt: 'The Pfand Pause 2.0 first round in a mobile browser viewport, showing the layered cards and seven-slot counter after two real selections.', caption: 'Version 2.0 · Mobile puzzle · 390 × 844.' }
    ]
  },
  {
    kind: 'commercial', slug: 'smart-city-dashboards', number: '10', title: 'Smart City Dashboards', shortTitle: 'A shared foundation, adapted to each place.',
    graphTitle: 'Smart city dashboards', category: 'Smart city · Geographic visualization', organization: 'Longshine', status: 'Commercial work · Written case study',
    description: "Large-screen smart-city dashboards with map views and route tracking for Wuxi, Hainan and Taiyuan. I was the sole frontend developer for the initial dashboard, then adapted it for regional requirements.",
    caseHeadings: {"problem": "Regional dashboards with a shared foundation.", "approach": "Host systems and older browsers."},
    tags: ['Map APIs', 'Route tracking', 'Large-screen interfaces', 'Regional customization', 'Browser compatibility'], role: 'Sole frontend developer for the initial dashboard · Regional delivery',
    contributions: [
      ['Map API integration', 'Geographic views within the dashboards'],
      ['Route tracking on maps'],
      ['Sole frontend ownership of the initial dashboard', 'Multiple regional dashboards'],
      ['Wuxi, Hainan and Taiyuan', 'Location-specific customizations'],
      ['Chrome 54 compatibility', 'iframe integration', 'Local cross-origin debugging']
    ],
    problem: "The locations shared a dashboard foundation but needed different customizations. The frontend also had to fit existing host systems and the browser versions actually used on site.",
    responsibilities: [
      "Built the initial frontend and subsequent regional dashboard versions at Longshine.",
      "Integrated map APIs and map-based route tracking into the large-screen interfaces.",
      "Handled host-system embedding and browser compatibility requirements.",
    ],
    decisions: [
      {"title": "Retain the shared base across regional versions", "text": "The implementations for Wuxi, Hainan and Taiyuan drew on the same foundation. Regional customization had to fit that common structure while accommodating each location’s requirements."},
      {"title": "Work within the iframe boundary", "text": "One dashboard was embedded in an existing system through an iframe. I resolved local cross-origin issues within browser same-origin policy constraints so development and integration could work with the host system."},
      {"title": "Support Chrome 54 in 2021", "text": "The required environment included Chrome 54. I adapted frontend behavior and added compatibility fallbacks for that deployment target, rather than assuming current-browser support."},
    ],
    flow: ['Shared dashboard foundation', 'Maps + route tracking', 'Regional customizations']
  },
  {
    kind: 'commercial', slug: 'glp-sme-financing', number: '11', title: 'SME Financing Platform', shortTitle: 'React interfaces for cross-region finance.',
    graphTitle: 'SME financing', category: 'Fintech · React business interfaces', organization: 'GLP', status: 'Commercial frontend work',
    description: "React frontend development for GLP’s SME financing platform, supporting business workflows across domestic and overseas markets.",
    caseHeadings: {"problem": "Financial data across markets.", "approach": "Preserve the meaning of dates and amounts."},
    tags: ['React', 'Business interfaces', 'Time zones', 'Currencies & exchange rates', 'Accessibility'], role: 'React frontend development',
    contributions: [
      ['React business interfaces', 'Business requirements to UI'],
      ['SME financing workflows'],
      ['Cross-region date and time context'],
      ['Currency-aware financial presentation', 'Exchange-rate context'],
      ['Accessibility improvements', 'Product, backend and QA collaboration']
    ],
    problem: "A date or an amount could mean something different in another market. Financing screens needed clear time-zone, currency and exchange-rate context without changing the underlying business values.",
    responsibilities: [
      "Developed React business interfaces for SME financing workflows.",
      "Handled cross-region date, currency and exchange-rate requirements.",
      "Implemented accessibility improvements and worked with product, backend and QA on business rules, API integration and testing.",
    ],
    decisions: [
      {"title": "Distinguish a timestamp from its local display", "text": "Time-zone requirements made the regional context of dates and times important. A timestamp and the local time shown to a user need to remain distinguishable when a financing workflow spans markets."},
      {"title": "Keep currency and exchange-rate context visible", "text": "A monetary amount needs its currency, while an exchange rate describes how values relate. Decimal precision, rounding and number formatting are frontend concerns that must preserve that meaning rather than silently reinterpret business data."},
    ],
    flow: ['React interfaces', 'Financing workflows', 'Time + currency context']
  },
  {
    kind: 'commercial', slug: 'running-mini-program', number: '12', title: 'Student Sports Mini-Program & Teacher Dashboard', shortTitle: 'From student training to teacher insights.',
    graphTitle: 'Student sports platform', category: 'Education · Mobile training & administration', organization: 'Danzhu', status: 'Commercial work · Used by schools',
    description: "A Vue / uni-app student sports mini-program with a companion teacher dashboard: running and camera-based exercises on the phone, results and report exports for teachers.",
    caseHeadings: {"problem": "Training outside a reliable connection.", "approach": "Recording, transmission and school context.", "delivery": "Used across different school settings."},
    tags: ['Vue / uni-app', 'Camera-based exercise tracking', 'Weak-network resilience', 'Peak running traffic', 'Teacher dashboard & exports', 'Age-specific experiences'], role: 'Frontend development · Student mini-program & teacher dashboard',
    contributions: [
      ['Student running and free-training interfaces'],
      ['Phone-camera capture', 'Sit-ups, jumping jacks and squats', 'Exercise statistics presentation'],
      ['Save training data under weak connectivity', 'Deferred data uploads'],
      ['Peak running-period performance', 'Frontend optimization'],
      ['Student result management', 'Teacher score-report exports'],
      ['University and primary-school versions', 'Different AI movement criteria', 'Adapted visual and spoken feedback']
    ],
    problem: "Student running periods created high concurrent usage, often under weak connectivity. Training records needed to survive until upload was possible. University and primary-school versions also used different movement-assessment criteria and required age-appropriate feedback.",
    responsibilities: [
      "Developed running metrics, route maps and checkpoints, plus phone-camera integration for sit-ups, jumping jacks, squats and other exercises.",
      "Worked on local training-data saving, deferred uploads and frontend performance during peak running periods.",
      "Built teacher result-management and score-report export interfaces.",
      "Adapted visual and spoken feedback for university and primary-school versions.",
    ],
    decisions: [
      {"title": "Separate recording from transmission", "text": "Under weak connectivity, the mini-program saved training data and deferred its upload. A training record therefore did not depend on a successful network request at the moment the activity happened."},
      {"title": "Keep camera exercises understandable on a phone", "text": "Free training combined phone-camera capture with exercise statistics for activities such as sit-ups, jumping jacks and squats. The student interface had to connect that input to the feedback shown during the activity."},
      {"title": "Adapt assessment and feedback by age group", "text": "University and primary-school versions used different AI movement-assessment standards. The frontend presentation and voice feedback were adjusted for those student groups alongside the assessment differences."},
    ],
    delivery: "The mini-program served multiple universities and primary schools in Shanghai. The teacher dashboard connected student activity to results review and score-report exports.",
    flow: ['Student training', 'Save + upload results', 'Teacher review + export']
  },
  {
    kind: 'independent', slug: 'weibo-deleter', number: '13', title: 'Weibo Deleter — A Small Browser Extension', shortTitle: 'A small tool for a friend’s repetitive task.',
    graphTitle: 'Weibo deleter', category: 'Personal tool · Browser extension', organization: 'Independent project', status: 'Personal tool · Public source',
    description: "A small React browser extension I built for a friend who wanted to delete old Weibo posts in batches.",
    caseHeadings: {"problem": "A repetitive action hidden inside menus.", "approach": "Automating a changing page."},
    tags: ['React / Vite', 'Chrome Extension / MV3', 'DOM automation'], role: 'Independent developer',
    contributions: [
      ['Post selection popup', 'Progress and result messages'],
      ['Popup-to-content-script messaging'],
      ['Nested menu and confirmation handling', 'Sequential batch operations', 'Adapting to Weibo UI changes']
    ],
    problem: "Deleting one post took roughly four clicks through nested menus and confirmation controls. Elements appeared only after earlier interactions, and Weibo’s interface changes made them difficult to locate reliably.",
    responsibilities: [
      'Built a React / Vite extension popup for selecting posts and showing operation progress.',
      'Implemented content-script DOM interaction and messaging to process selected posts sequentially.',
      'Worked on locating nested menu actions and confirmation controls as Weibo’s page structure changed.'
    ],
    decisions: [
      { title: 'Follow the page interaction step by step', text: 'The content script opens each post’s menu, locates the deletion action and handles confirmation, with pauses between steps for the page to respond.' },
      { title: 'Expect the interface to change', text: 'The difficult part was locating controls that only appear after earlier clicks. Weibo’s redesigns also meant revisiting DOM selectors and menu structure rather than treating the automation as a one-time implementation.' }
    ],
    flow: ['Select posts', 'Menu + confirmation', 'Batch progress'],
    links: [{ label: 'Source Code', href: 'https://github.com/Logic-syd/weibo-deleter' }]
  },
  {
    kind: 'commercial', slug: 'medical-curriculum', number: '14', title: 'Public Health Curriculum & Knowledge Explorer', shortTitle: 'Majors, shared courses and the knowledge between them.',
    graphTitle: 'PKU Public Health curriculum', category: 'Public health education · Existing-system redesign', organization: 'School of Public Health, Peking University', affiliation: 'Peking University Health Science Center', status: 'Launched',
    description: "A React and Three.js redesign of an existing public-health curriculum system, combining an interactive 3D knowledge explorer with course-selection interfaces.",
    caseHeadings: {"problem": "A curriculum that crosses programme boundaries.", "approach": "Free movement without conflicting gestures.", "delivery": "Redesigned and launched."},
    tags: ['React', 'Three.js', 'Curriculum relationships', 'Demonstration UI & performance', 'Course-selection workflows'], role: 'Sole frontend developer · One backend collaborator',
    contributions: [
      ['Sole frontend ownership', 'Existing-system redesign', 'Basic course-selection operations'],
      ['Sphere-based 3D curriculum explorer', 'Left-click, right-click and double-click', 'Free node dragging'],
      ['Majors and overlapping courses', 'Shared courses', 'Course-specific knowledge points'],
      ['High-fidelity UI reproduction', 'Customized node labels', 'Repeated-interaction stability', 'Event-binding overhead'],
      ['Course browsing and selection interfaces']
    ],
    problem: "The school wanted a polished demonstration screen for an existing education system. Majors shared courses, and each course had its own knowledge points. That connected structure needed to remain legible while users freely selected and dragged nodes, with highly customized labels and strict UI and performance requirements.",
    responsibilities: [
      "Owned the frontend as an independent collaborator through a partner company, working with one backend developer during August–September 2024.",
      "Built the 3D curriculum explorer and React course-selection interfaces.",
      "Implemented customized node labels, precise UI reproduction and the complex mouse interactions.",
      "Worked on rendering performance, event-binding overhead and stability through repeated use.",
    ],
    decisions: [
      {"title": "Separate left-click, right-click, double-click and drag", "text": "Each mouse action had its own operation, alongside free node dragging. I worked on distinguishing these paths so one gesture would not also trigger another action. Event-binding overhead made this a performance concern as well as an interaction problem."},
      {"title": "Stay stable through repeated manipulation", "text": "The demonstration needed to remain responsive through continuous dragging, repeated selections and successive exploration. I worked on maintaining consistent interaction state across those operations, alongside the rendering performance requirements."},
      {"title": "Represent shared courses without losing their identity", "text": "A course could belong to several majors, including common courses taken across programmes, while retaining its own knowledge points. The relationship structure and visual emphasis needed to make both the overall curriculum and an individual course understandable."},
      {"title": "Keep exploration and selection in the same context", "text": "The 3D explorer and course-selection interfaces described the same educational content. Course identity and major relationships needed to agree across both views, while a student’s selection remained distinct from the curriculum structure."},
      {"title": "Treat labels as part of the visual specification", "text": "The screen was intended for demonstration, with demanding UI-reproduction requirements. Node labels needed custom treatment alongside the spheres and connections, and that visual consistency had to hold while the scene was being manipulated."},
    ],
    delivery: "The two-person frontend/backend team completed the redesign and launched it in around six weeks.",
    flow: ['Majors + shared courses', '3D knowledge exploration', 'Course selection']
  },
  {
    kind: 'independent', slug: 'catch-that-train', number: '15', title: 'Catch That Train! — A Journey Under Pressure', shortTitle: 'Small decisions. One departing train.',
    graphTitle: 'Catch That Train!', category: 'Independent product · Browser strategy game', organization: 'Personal project', status: 'Playable browser game · English & Chinese',
    description: "A portrait mobile browser game about rushing for a train in China. Four travelers navigate six stations, balancing time, energy, directions and everyday interruptions.",
    caseHeadings: {"problem": "Make pressure understandable.", "approach": "A consistent clock through interrupted input.", "delivery": "Playable, with room to grow."},
    tags: ['React / TypeScript', 'Game state / Shared clock', 'Touch / Spatial interaction', 'i18n / Verification'], role: 'Independent developer',
    contributions: [
      ['React game interfaces', 'SVG and CSS scenes', 'Local achievements and result sharing'],
      ['Journey state transitions', 'Time and resource accounting', 'Route forecasts'],
      ['Touch and keyboard controls', 'Hongqiao student entrance scenes', 'Interrupted-input cleanup'],
      ['English and Chinese presentation', 'State-preserving language switching', 'Reproducible engine tests and simulations']
    ],
    problem: 'Make rushing for a train feel tense but understandable. A route, a queue, a distraction or a burst of sprinting can change the outcome. Players need clear choices and feedback, while the game needs consistent time, movement and resource rules across different travelers and stations.',
    responsibilities: [
      "Built the React / TypeScript preparation, metro and station interfaces, with Normal and Extreme modes.",
      "Implemented the game-state engine, time and resource rules, route forecasts and collision-aware Hongqiao entrance scenes.",
      "Added touch and keyboard input, English and Chinese presentation, local achievements and result sharing.",
      "Verified transitions and journey strategies with automated tests and seeded simulations.",
    ],
    decisions: [
      { title: 'One clock, several kinds of time', text: 'Movement, handling, waiting and metro travel have different time rules. The engine separates actual input time from fixed task costs, then derives recovery from time already charged. Route forecasts and journey budgets reuse these rules to keep the interface and outcomes consistent.' },
      { title: 'Make visible space affect the choice', text: 'Six entrance scenes in the Hongqiao student chapter require the player to reach a destination while avoiding crowds and railings. Small motion steps prevent crossing obstacles. Forecasts and simulations use the same collision geometry; other travelers and stations retain their existing event interactions.' },
      { title: 'Stop input when the interaction stops', text: 'Held movement ends on pointer cancellation, lost capture, keyboard release, blur or a hidden page. Completed entrance actions are guarded against repetition, and event revisions reject stale choices. These boundaries keep interrupted gestures from continuing into the next task.' },
      { title: 'Translate the display, preserve the run', text: 'English and Chinese presentation share canonical event data and action payloads. Language state is separate from game state, so switching preserves the active task and progress. Dynamic costs, results, challenge text and exported images follow the selected language.' },
      { title: 'Keep earned progress consistent', text: 'Run IDs prevent duplicate achievement awards. Stored profiles are parsed, migrated and merged so an older browser tab cannot remove earned unlocks. Records stay in the current browser; shared links contain the station, title and outcome without uploading the player’s saved history.' },
      { title: 'Make verification reproducible', text: 'An injectable random source supports seeded tests and journey simulations. Reports record the character, station, mode, input model and decisions, making rule changes easier to compare. Simulation results describe the tested strategies and assumptions, rather than measured human win rates.' }
    ],
    delivery: "The game is playable online with public source code. Station layouts are gameplay abstractions, progress stays in the current browser, and family mode remains planned.",
    flow: ['Prepare + choose a route', 'Navigate + manage resources', 'Board + review the journey'],
    links: [
      { label: 'Live Demo', href: 'https://logic-syd.github.io/catchThatTrain-/' },
      { label: 'Source Code', href: 'https://github.com/Logic-syd/catchThatTrain-' }
    ],
    screenshotLayout: 'portrait-grid',
    screenshots: [
      { src: '/images/catch-that-train-mobile-start.png', width: 390, height: 844, label: 'Choose a journey', alt: 'The English Catch That Train mobile start screen with swipeable traveler cards, station choices and a fixed start action.', caption: 'Choose your traveler and station.' },
      { src: '/images/catch-that-train-mobile-direction.png', width: 390, height: 844, label: 'Find your direction', alt: 'Two English metro direction choices in the phone layout of Catch That Train, beneath a live boarding countdown.', caption: 'Read the signs and catch the right metro.' },
      { src: '/images/catch-that-train-mobile-station.png', width: 390, height: 1000, label: 'Make the train', alt: 'The English Catch That Train station interface on a phone, with the student walking through Hongqiao, stamina, lane controls and a sprint button.', caption: 'Change lanes, manage stamina and keep moving.' }
    ]
  },
  {
    kind: 'independent', slug: 'love-story-theater', number: '16', title: 'Love Story Theater', shortTitle: 'A little comfort, written as a story.',
    graphTitle: 'Love Story Theater', category: 'Personal project · Full-stack AI storytelling', organization: 'Personal project',
    status: 'Offline · No longer maintained', archived: true,
    description: "I made this for a friend going through a breakup: a conversational app that turned shared memories and relationship details into hopeful fictional stories.",
    caseHeadings: {"problem": "Gather the story before generating it.", "approach": "Conversation state across a separate AI backend.", "delivery": "An archived full-stack experiment."},
    tags: ['Next.js / React', 'TypeScript / MUI', 'Kotlin / Ktor', 'DeepSeek API', 'i18n'], role: 'Independent full-stack developer',
    contributions: [
      ['Conversational React interface', 'Separate frontend application'],
      ['Typed UI state', 'Material UI components'],
      ['JSON API routes', 'Backend model integration'],
      ['Contextual follow-up questions', 'Story-generation prompts'],
      ['English, Chinese and German', 'Localized question pools']
    ],
    problem: "The app needed to gather details gradually before generating a longer narrative. A guided conversation had to keep track of answers, move through question stages and carry the selected language into the AI request.",
    responsibilities: [
      "Built the Next.js / React / TypeScript interface with Material UI, message history, typing feedback and story-generation loading states.",
      "Developed the separate Kotlin / Ktor JSON API and its DeepSeek integration.",
      "Wrote conversational and story prompts, with English, Chinese and German content.",
    ],
    decisions: [
      { title: 'Separate the interface from model calls', text: 'The Next.js client handled the conversation and called a configurable backend URL through Axios. The Kotlin / Ktor service accepted JSON requests, built prompts and called DeepSeek. This kept the browser interface and model integration in separate applications.' },
      { title: 'Guide a conversation in stages', text: 'The frontend tracked the conversation phase, accumulated answers and remaining questions. It combined randomized question pools with a contextual AI follow-up before asking about the current relationship problem and requesting a final story.' },
      { title: 'Two API paths, two different tasks', text: 'A dynamic-interaction endpoint generated a follow-up question from the previous answer and a chosen topic. A separate story endpoint used the collected relationship details to generate a longer narrative. Backend request models and a shared response shape connected these tasks to the chat interface.' },
      { title: 'Carry language through the full flow', text: 'English, Chinese and German copy lived in a separate content module, including question pools and interface messages. Requests included the selected language so backend prompts could ask for a question or story in that language too.' }
    ],
    delivery: "The service has stopped running and is no longer maintained. The public repository preserves the separate frontend and backend implementations.",
    flow: ['Guided Next.js conversation', 'Kotlin / Ktor JSON API', 'DeepSeek-generated story'],
    links: [{ label: 'Source Code', href: 'https://github.com/Logic-syd/Love-Story-Theater' }]
  }
];
