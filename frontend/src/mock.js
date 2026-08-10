// ======================= PORTFOLIO DATA — PANCA MAULANA =======================
// Real portfolio content for Panca Maulana (Web Developer, Surabaya, Indonesia).
// Export names are kept stable so all existing sections keep working; a few
// sections were repurposed (Team -> Languages, Achievements -> Capabilities).
// NOTE: items marked TODO(link)/PLACEHOLDER need the real URL/handle from Panca.

// ---- Imagery (curated, project-representative) ----
const IMG = {
  hydro: 'https://images.unsplash.com/photo-1682629088818-1ec55d0cf45b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  greenhouse: 'https://images.unsplash.com/photo-1759509295194-e85b92b24e15?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  laptopDash: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  dataViz: 'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  webBuilder: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  uiSystem: 'https://images.unsplash.com/photo-1558655146-d09347e92766?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  designUi: 'https://images.unsplash.com/photo-1602576666092-bf6447a729fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
};

// ---- Personal profile ----
export const profile = {
  name: 'Panca Maulana',
  role: 'Web Developer',
  location: 'Surabaya, Jawa Timur, Indonesia',
  experience: '4+ years',
  workType: 'Freelance / Professional Web Developer',
  bio: [
    'Panca Maulana is a Web Developer with more than 4 years of experience designing, developing and deploying modern digital products and websites.',
    'His work covers the complete development process — concept, UI/UX design, development, testing, optimization and deployment — with a focus on experiences that are responsive, user-friendly, performance-oriented, scalable and consistent with the client\u2019s brand.',
    'He is continuously growing across web development, UI/UX, enterprise applications, IoT, 3D and foreign languages.',
  ],
};

export const site = {
  name: 'PANCA MAULANA',
  logo: 'PANCA MAULANA',
  email: 'PANCAMAULANA2003@GMAIL.COM',
  emailHref: 'mailto:pancamaulana2003@gmail.com',
  clocks: [
    { label: 'SBY(ID)', tz: 'Asia/Jakarta' },
    { label: 'BER(DE)', tz: 'Europe/Berlin' },
  ],
  nav: [
    { label: 'ABOUT', path: '/about' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'BLOG', path: '/blog' },
    { label: 'CONTACT', path: '/contact' },
  ],
  footerLinks: [
    { label: 'GITHUB', href: 'https://github.com/pancamaulana09', external: true },
    { label: 'PANCAMAULANA2003@GMAIL.COM', href: 'mailto:pancamaulana2003@gmail.com', external: true },
    { label: 'PRIVACY', href: '/privacy', external: false },
  ],
};

export const statusWords = {
  thinking: ['BUILDING', 'THE', 'WEB', 'ONE', 'SYSTEM', 'AT', 'A', 'TIME'],
  made: ['DESIGNED', 'BUILT', 'TESTED', 'OPTIMIZED', 'AND', 'DEPLOYED'],
  practice: ['FROM', 'CONCEPT', 'TO', 'DEPLOYMENT', '—', 'END', 'TO', 'END'],
  team: ['THREE', 'LANGUAGES', 'AND', 'STILL', 'COUNTING'],
  noticed: ['WORK', 'THAT', 'PERFORMS', 'AND', 'SCALES'],
  studio: ['WEB', 'DEVELOPER', '·', 'SURABAYA', '·', 'INDONESIA', '·', '4+', 'YEARS'],
  contact: ['SAY', 'HELLO', '—', 'LET\u2019S', 'BUILD', 'SOMETHING'],
  showcase: ['SELECTED', 'WORK', '(', 'IN', 'MOTION', ')'],
  archive: ['FULL', 'ARCHIVE', '—', 'SEVEN', 'SHIPPED', 'PROJECTS'],
  output: ['GENERATIVE', 'OUTPUT', 'FROM', 'THE', 'MACHINE'],
  signal: ['RESPONSIVE', '·', 'USER', 'FIRST', '·', 'PERFORMANCE'],
};

// Giant statement (studio-style intro, first person, Panca\u2019s voice)
export const statement = {
  label: 'Profile',
  text: 'I build modern digital products end-to-end — from concept and UI/UX to development, optimization and deployment. The goal never changes: fast, responsive, user-friendly experiences shaped around real business needs.',
};

// Full Archive index (all 7 projects)
export const archive = [
  { name: 'IoT Hydroponic System', path: '/projects/iot-hydroponic', image: IMG.hydro },
  { name: 'PT Cipta Karya Pertiwi Trans', path: '/projects/cipta-karya-pertiwi-trans', image: IMG.webBuilder },
  { name: 'Stryke', path: '/projects/stryke', image: IMG.designUi },
  { name: 'UNUSA Smart TRA', path: '/projects/unusa-smart-tra', image: IMG.analytics },
  { name: 'Gowes / Fenomena Bike', path: '/projects/gowes-cyclequest', image: IMG.dataViz },
  { name: 'Lexicult', path: '/projects/lexicult', image: IMG.uiSystem },
  { name: 'Worvia / Suricon ERP', path: '/projects/worvia-erp', image: IMG.laptopDash },
];

// Giant parallax words over the manifesto/about section
export const overlayWords = [
  'Web', 'Developer', '·', 'Surabaya', '·', 'Indonesia', '4+', 'Years',
];

// About — 4-column write-up (approach & focus, original writing)
export const manifesto = {
  columns: [
    [
      'I work across the whole build: understanding the problem, shaping the interface, writing the code, testing it, tuning performance and shipping it live.',
      'Design and engineering are not separate steps for me. A product is decided by how it feels in the hand and how fast it responds — so I hold both from the first sketch to the final deploy.',
      'Four-plus years of freelance and professional work have made one thing clear: the best interface is the one that gets out of the user\u2019s way.',
    ],
    [
      'Every project starts from a real business requirement, not a template. What is this for, who uses it, and what does success look like?',
      'From there the work stays responsive, user-friendly and consistent with the brand — and scalable enough to grow after launch.',
      'Performance is a feature. Optimization, clean structure and sensible architecture are part of the brief, never an afterthought.',
    ],
    [
      'The stack is modern and pragmatic: React, Next.js and TypeScript on the front, Node.js with PostgreSQL, Supabase or Firebase behind it, wired together with REST APIs.',
      'I build enterprise systems too — ERP, HRM, payroll, attendance and reporting — where reliability and clarity matter more than novelty.',
      'And I like the edges of the web: IoT with ESP32 and Home Assistant, and 3D experiences with Three.js, React Three Fiber and Blender.',
    ],
    [
      'I learn constantly — new tools, new patterns, and new languages. Bahasa Indonesia natively, English at an advanced level, and German on the way (reading around B2, speaking around A2).',
      'That curiosity feeds the work: I enjoy talking to people from different backgrounds and turning what they need into something that runs.',
      'Ideas become products here — from concept through implementation, owned end to end.',
    ],
  ],
};

// Home / About intro block
export const studioIntro = [
  'Panca Maulana is a Web Developer based in Surabaya, Indonesia, with 4+ years building modern websites, web applications and digital products.',
  'The work spans the full process — UI/UX design, frontend and backend development, API integration, optimization and deployment — with a focus on responsive, user-friendly, performance-oriented experiences.',
  'Beyond the browser: enterprise systems (ERP, HRM, payroll), IoT automation, and interactive 3D on the web.',
];

export const projectsIntro = [
  'Seven projects across very different fields — IoT, corporate web, e-commerce, safety, community, education and enterprise.',
  'What they share is a method: understand the requirement, design a clear interface, build it well, then optimize and ship.',
  'Each one was carried from concept to a working product — several of them live in the real world.',
];

export const projects = [
  {
    id: 'iot-hydroponic',
    num: '01',
    name: 'IoT Hydroponic System',
    year: '2024',
    client: 'IoT · Automation · Smart Agriculture',
    fields: ['IoT', 'Automation', 'Smart Agriculture'],
    theme: '#0e1410',
    themeText: '#d7e9d9',
    image: IMG.hydro,
    link: null,
    role: 'End-to-end developer — system concept, hardware integration, programming, automation, monitoring and implementation.',
    technologies: ['Arduino Mega', 'ESP32', 'ESPHome', 'Home Assistant', 'BME280', 'DS18B20', 'HX711', 'Peristaltic Pump', 'Solenoid'],
    features: ['Environmental monitoring', 'Sensor monitoring', 'Water system automation', 'Pump control', 'Hydroponic automation', 'Home Assistant integration', 'Real-time monitoring'],
    description:
      'An automated hydroponic system combining microcontrollers, sensors, pumps and home-automation technology into one self-running grow setup.',
    detail: [
      'Sensors track the growing environment — temperature, humidity, water and load — and feed a control layer that runs pumps and solenoids automatically, with everything surfaced in real time through Home Assistant.',
      'Built end-to-end: I owned the concept, the hardware integration, the firmware and automation logic, and the monitoring — turning a manual routine into a hands-off IoT system.',
    ],
  },
  {
    id: 'cipta-karya-pertiwi-trans',
    num: '02',
    name: 'PT Cipta Karya Pertiwi Trans',
    year: '2021',
    client: 'Corporate Website · Company Profile · Waste Transport',
    fields: ['Corporate Website', 'Company Profile', 'Waste Transport'],
    theme: '#10131a',
    themeText: '#dde3ea',
    image: IMG.webBuilder,
    link: 'https://ciptakaryapertiwitrans.vercel.app',
    role: 'Web Developer / UI/UX — website experience, responsive implementation, corporate presentation and customer communication features.',
    technologies: ['Next.js', 'React', 'Responsive Web Design', 'Chatbot', 'WhatsApp Integration'],
    features: ['Company profile & overview', 'Service information', 'Professional corporate presentation', 'Responsive interface', 'Customer chatbot', 'WhatsApp integration', 'Contact information'],
    description:
      'A professional company-profile website for PT Cipta Karya Pertiwi Trans, a licensed transporter of B3 and Non-B3 waste (established 2021).',
    detail: [
      'The site presents the company clearly — who they are, the services they offer and how to reach them — with a clean, responsive corporate layout that works across devices.',
      'A built-in customer chatbot and WhatsApp integration make first contact effortless, turning a static profile into a working lead channel.',
    ],
  },
  {
    id: 'stryke',
    num: '03',
    name: 'Stryke',
    year: '2024',
    client: 'E-commerce · Fashion · Streetwear',
    fields: ['E-commerce', 'Fashion', 'Streetwear'],
    theme: '#140f12',
    themeText: '#ecdfe0',
    image: IMG.designUi,
    link: null,
    role: 'Web Developer / UI/UX — premium fashion UI, product discovery and a conversion-oriented shopping experience.',
    technologies: ['React', 'Responsive Web Design', 'UI/UX', 'E-commerce UX'],
    features: ['Product catalogue & details', 'Shopping cart', 'Wishlist', 'User authentication', 'Product search', 'Shipping & tax information', 'Responsive interface'],
    description:
      'A premium streetwear e-commerce concept focused on a modern, engaging online shopping experience.',
    detail: [
      'The interface is built around product discovery — a clean catalogue, rich product detail, search, wishlist and cart — all tuned for a premium fashion feel.',
      'The flow is conversion-oriented and fully responsive, from browsing to checkout information, so the experience holds up on any screen.',
    ],
  },
  {
    id: 'unusa-smart-tra',
    num: '04',
    name: 'UNUSA Smart TRA',
    year: '2024',
    client: 'K3 / Safety · Risk Assessment · Enterprise App',
    fields: ['K3 / Safety', 'Risk Assessment', 'Enterprise App'],
    theme: '#0d1116',
    themeText: '#dfe6ec',
    image: IMG.analytics,
    link: null,
    role: 'Web Developer / UI/UX — turning a manual occupational-safety workflow into a structured digital process.',
    technologies: ['React', 'Dashboard Design', 'Data Visualization', 'REST API'],
    features: ['Task risk assessment', '5×5 risk matrix', 'Risk evaluation', 'Risk heatmap', 'Hierarchy of controls', 'Risk management', 'Digital reporting & export'],
    description:
      'A digital occupational health & safety (K3) risk-assessment application that helps users evaluate and manage workplace risks.',
    detail: [
      'The core is a 5×5 risk matrix with evaluation, a visual heatmap and the hierarchy of controls — the whole assessment expressed as a clear, guided digital flow.',
      'It replaces a traditionally manual, paper-based routine with a structured system, complete with digital reporting and report export.',
    ],
  },
  {
    id: 'gowes-cyclequest',
    num: '05',
    name: 'Gowes / Fenomena Bike',
    year: '2025',
    client: 'Community · Social Platform · Fitness',
    fields: ['Community', 'Social Platform', 'Fitness'],
    theme: '#0f1410',
    themeText: '#dbe9dd',
    image: IMG.dataViz,
    link: null,
    role: 'Web Developer / Product Developer / UI/UX — community engagement, map-based experiences and gamified activity tracking.',
    technologies: ['React', 'MapLibre', 'REST API', 'Real-time Tracking'],
    features: ['Cycling community', 'Interactive maps (MapLibre)', 'Route exploration', 'Cycling clubs', 'Challenges', 'Activity & real-time tracking', 'Gamification'],
    description:
      'A digital cycling community platform — social interaction, route discovery, mapping, clubs, challenges and activity tracking. Live as CycleQuest: Explore. Ride. Level Up.',
    detail: [
      'Riders discover routes on interactive MapLibre maps, join clubs, take on challenges and track activities in real time — all in one place.',
      'Gamification (challenges and progress) turns individual rides into a shared community experience, built as a product from the ground up.',
    ],
    media: {
      video: '/assets/fenomena-ad.mp4',
      videoPoster: '/assets/fenomena-ad-poster.jpg',
      poster: '/assets/fenomena-poster.jpg',
      posterAlt: 'Fenomena Bike — campaign poster',
      accent: '#ff3b30',
    },
  },
  {
    id: 'lexicult',
    num: '06',
    name: 'Lexicult',
    year: '2025',
    client: 'EdTech · Language Learning · German',
    fields: ['EdTech', 'Language Learning', 'German'],
    theme: '#12101a',
    themeText: '#e2ddef',
    image: IMG.uiSystem,
    link: null,
    role: 'Product Developer / UI/UX / Full-Stack Developer — a structured, engaging environment for German learners.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    features: ['German learning (CEFR A1–C2)', 'Vocabulary & grammar', 'Reading, quizzes & flashcards', 'Learning progress', 'XP, streaks & leaderboards', 'Certificates', 'Gamification'],
    description:
      'A German language-learning platform built around the CEFR A1–C2 structure. Live as Lexicult — Master German.',
    detail: [
      'Lessons move through vocabulary, grammar, reading, quizzes and flashcards, mapped to the CEFR A1–C2 ladder so learners always know where they stand.',
      'XP, streaks, leaderboards and certificates keep motivation high — a full-stack product designed to make daily language practice stick.',
    ],
  },
  {
    id: 'worvia-erp',
    num: '07',
    name: 'Worvia / Suricon ERP',
    year: '2025',
    client: 'ERP · HRM · Payroll · Enterprise App',
    fields: ['ERP', 'HRM', 'Payroll'],
    theme: '#101314',
    themeText: '#dee6e8',
    image: IMG.laptopDash,
    link: null,
    role: 'Full-Stack Developer / UI/UX — digitizing internal employee and HR processes in one centralized enterprise application.',
    technologies: ['Flutter', 'Node.js', 'PostgreSQL', 'Firebase'],
    features: ['Human Resource Management', 'Employee management', 'Attendance & GPS attendance', 'Leave management', 'Payroll & salary slips', 'Career history & records', 'PDF export & reporting'],
    description:
      'An enterprise HR & ERP platform managing employee operations, attendance, payroll and career information. Live as Worvia — HR Attendance & Payroll.',
    detail: [
      'The platform centralizes HR: employee records, GPS-based attendance, leave, payroll and salary slips, and career history — with PDF export and reporting on top.',
      'It replaces scattered manual processes with a single, reliable system, built full-stack from data model to interface.',
    ],
    media: {
      video: '/assets/suricon-ad.mp4',
      videoPoster: '/assets/suricon-ad-poster.jpg',
      poster: '/assets/suricon-poster.jpg',
      posterAlt: 'Suricon ERP — campaign poster',
      accent: '#f5b52e',
    },
  },
];

// About — "Primary Areas" cards
export const expertise = [
  {
    title: 'Web Development',
    text: 'Modern websites, responsive interfaces, web applications, REST APIs and deployment — React, Next.js and TypeScript.',
  },
  {
    title: 'UI / UX Design',
    text: 'User-centered interfaces, responsive design, landing pages, dashboards, e-commerce and enterprise screens. Design systems and brand consistency.',
  },
  {
    title: 'Enterprise Systems',
    text: 'ERP, HRM, payroll, attendance, risk management and reporting — business applications built to be reliable and scalable.',
  },
  {
    title: 'IoT',
    text: 'ESP32, Arduino, ESPHome and Home Assistant — sensors, automation, monitoring and smart systems that run on their own.',
  },
  {
    title: 'Creative Technology',
    text: '3D web experiences with Three.js and React Three Fiber, motion design and interactive experiences, modeled in Blender.',
  },
  {
    title: 'Product Development',
    text: 'Turning ideas and business requirements into functional digital products — from concept through implementation, owned end to end.',
  },
];

// Repurposed: Capabilities / tech-stack index (rendered in the old Achievements table)
export const capabilities = [
  { discipline: 'Web Development', stack: 'React · Next.js · TypeScript · TanStack', focus: 'Frontend & backend, REST APIs, deployment' },
  { discipline: 'UI / UX Design', stack: 'Figma · Canva · Design Systems', focus: 'Responsive UI, dashboards, landing pages' },
  { discipline: 'Backend & Database', stack: 'Node.js · PostgreSQL · Supabase · Firebase', focus: 'Auth, DB architecture, API integration' },
  { discipline: 'Enterprise Apps', stack: 'ERP · HRM · Payroll · Attendance', focus: 'Business management & reporting systems' },
  { discipline: 'IoT', stack: 'ESP32 · Arduino · ESPHome · Home Assistant', focus: 'Sensors, automation, monitoring' },
  { discipline: '3D & Creative', stack: 'Blender · Three.js · React Three Fiber', focus: '3D web, motion & interaction' },
  { discipline: 'Soft Skills', stack: 'Communication · Ownership · Problem solving', focus: 'Teamwork, attention to detail, adaptability' },
];

// Repurposed: Languages (rendered in the old Team/blue section)
export const languages = [
  { name: 'Bahasa Indonesia', level: 'Native', notes: 'Native fluency', cefr: '—' },
  { name: 'English', level: 'Advanced', notes: 'Advanced reading & listening; speaking daily', cefr: 'C1' },
  { name: 'German', level: 'Learning', notes: 'Reading ~B2 · Speaking ~A2, improving', cefr: 'B2 / A2' },
];

export const teamImage = IMG.greenhouse;

export const genGridImages = [IMG.dataViz, IMG.greenhouse];

export const pageTitles = {
  '/': ['Web', 'Developer'],
  '/about': ['The', 'Profile'],
  '/projects': ['The', 'Work'],
  '/contact': ['Say', 'Hello'],
  '/privacy': ['The', 'Fine', 'Print'],
};
