export type PlaceStory = {
  slug: string;
  name: string;
  region: string;
  headline: string;
  description: string;
  reflection: string;
  memory?: string;
  bounds: [[number, number], [number, number]];
  reference: [number, number];
  source: { title: string; url: string };
};

export const placeStories: Record<string, PlaceStory> = {
  sungrow: {
    slug: 'munich', name: 'Munich', region: 'Bavaria, Germany',
    headline: 'City life, close to nature.',
    description: 'Munich is my current base in Germany, where city life stays close to nature. Beyond beer, football and hiking, I love its cinemas, theatre and museums.',
    memory: 'My most relaxed Munich weekends: watching surfers in the English Garden, then heading to the Münchner Freiheit area for a coffee.',
    reflection: 'I admire the purpose of NeuVerge-Tron / Sungrow’s energy business. In the context of the energy crisis, working on renewable-energy products feels especially meaningful to me.',
    bounds: [[48.11, 11.53], [48.18, 11.64]], reference: [48.142, 11.582],
    source: { title: 'The English Garden in Munich', url: 'https://www.muenchen.de/en/sights/attractions/english-garden' },
  },
  danzhu: {
    slug: 'caohejing', name: 'Caohejing Hi-Tech Park', region: 'Shanghai, China',
    headline: 'Ideas in the middle of a city.',
    description: 'Caohejing Hi-Tech Park is one of Shanghai’s established technology districts, with a lively mix of software, research and game development. ByteDance and miHoYo are among the names associated with its tech and gaming community.',
    memory: 'I associate this neighbourhood with ByteDance, miHoYo and the energy of a busy tech community. I often came across miHoYo events here.',
    reflection: 'At Danzhu, I connected camera input and backend AI scoring with real-time sports assessment interfaces, and separately worked on a sports mini-program for running and free training. The work brought together student education, live video and visual and spoken feedback.',
    bounds: [[31.14, 121.37], [31.19, 121.44]], reference: [31.166, 121.407],
    source: { title: 'Caohejing Hi-Tech Park', url: 'https://english.shanghai.gov.cn/en-NationalDevelopmentZone/20231222/a77cb9e77147498e9740f0c394feb8bb.html' },
  },
  glp: {
    slug: 'zhangjiang', name: 'Zhangjiang Science City', region: 'Shanghai, China',
    headline: 'A place built around possibility.',
    description: 'Zhangjiang Science City, in Shanghai’s Pudong district, brings together software, research and technology businesses. It is one of the city’s best-known centres for innovation.',
    memory: 'For me, Zhangjiang was a gathering place for programmers. My lasting image of the streets is a sea of plaid shirts—a familiar kind of developer uniform.',
    reflection: 'Working on an SME financing system at GLP introduced me to the demands of international business software. Time zones, currencies and exchange rates were part of the product requirements, deepening my understanding of how regional context affects financial interfaces.',
    bounds: [[31.175, 121.565], [31.225, 121.635]], reference: [31.20, 121.60],
    source: { title: 'Zhangjiang High-tech Zone', url: 'https://english.shanghai.gov.cn/en-NationalDevelopmentZone/20231209/e6616881e28647d1a1472156cf8d9d1b.html' },
  },
  longshine: {
    slug: 'west-lake', name: 'West Lake', region: 'Hangzhou, China',
    headline: 'Water, gardens and a wider view.',
    description: 'West Lake is one of Hangzhou’s best-known attractions and a UNESCO World Heritage cultural landscape. Its lake, causeways, gardens and surrounding hills have inspired artists and poets for centuries.',
    memory: 'Beautiful, busy, and unmistakably Hangzhou. There were always plenty of visitors, and Friday traffic became part of my memory of working nearby.',
    reflection: 'At Longshine, energy dashboards and low-code tools were both enjoyable to build and useful in practice. Developing a component library and work-order interfaces for the State Grid management system deepened my understanding of business workflows. Working within a 1,000-person team also gave me a new understanding of teamwork.',
    bounds: [[30.21, 120.105], [30.27, 120.175]], reference: [30.24, 120.14],
    source: { title: 'West Lake Cultural Landscape', url: 'https://whc.unesco.org/en/list/1334/' },
  },
  fingard: {
    slug: 'xixi', name: 'Xixi Wetland', region: 'Hangzhou, China',
    headline: 'A green setting. A first beginning.',
    description: 'Xixi National Wetland Park is a green retreat in western Hangzhou, with interconnected waterways, wetland habitats and a long local cultural history. Its scenery offers a gentler side of city life.',
    memory: 'Xixi felt especially comfortable. We often went running in the park after work, then returned to the office to continue our evening work.',
    reflection: 'Fingard was my first frontend role. Contributing to a product from zero to one let me discover the pleasure of turning an idea into a working interface—and made me want to keep building.',
    bounds: [[30.245, 120.025], [30.295, 120.095]], reference: [30.268, 120.065],
    source: { title: 'Hangzhou Xixi Wetlands', url: 'https://www.ehangzhou.gov.cn/2018-07/12/c_254914.htm' },
  },
};
