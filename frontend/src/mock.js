// ======================= MOCK DATA — 2xA STUDIO CLONE =======================
// All content below is frontend mock data. Long-form prose is original writing
// in the spirit of the reference site; facts (names, awards) mirror the source.

export const site = {
  name: '2xA STUDIO',
  logo: '2xA STUDIO',
  email: 'HELLO@2XA.STUDIO',
  emailHref: 'mailto:hello@2xa.studio',
  clocks: [
    { label: 'ATH(GR)', tz: 'Europe/Athens' },
    { label: 'AMS(NL)', tz: 'Europe/Amsterdam' },
  ],
  nav: [
    { label: 'ABOUT', path: '/about' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'CONTACT', path: '/contact' },
  ],
  footerLinks: [
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/', external: true },
    { label: 'BEHANCE', href: 'https://www.behance.net/', external: true },
    { label: 'HELLO@2XA.STUDIO', href: 'mailto:hello@2xa.studio', external: true },
    { label: 'PRIVACY', href: '/privacy', external: false },
  ],
};

export const statusWords = {
  thinking: ['ON', 'COMPUTATION', 'AS', 'A', 'WAY', 'OF', 'THINKING'],
  made: ['MADE', 'WITH', 'CARE', 'AND', 'A', 'LOT', 'OF', 'CODE'],
  practice: ['PRACTICE', 'SHAPED', 'BY', 'CODE', 'DATA', 'AND', 'FORM'],
  team: ['TEAM', 'MEMBERS', '(', 'IN', 'NO', 'PARTICULAR', 'ORDER', ')'],
  noticed: ['GOOD', 'WORK', 'TENDS', 'TO', 'GET', 'NOTICED'],
  studio: ['CODE', 'DRIVEN', 'DESIGN', 'STUDIO', 'BETWEEN', 'AMSTERDAM', '&', 'ATHENS'],
  contact: ['SAY', 'HELLO', '—', 'WE', 'READ', 'EVERYTHING'],
};

// Giant parallax words over the manifesto section
export const overlayWords = [
  'Code-', 'Driven', 'Design', 'Studio', 'Between', 'Amsterdam', '&', 'Athens',
];

// Original writing — manifesto in 4 columns (visual structure mirrors source)
export const manifesto = {
  columns: [
    [
      'Software now sits underneath almost everything: how we see, how we work, how we speak to each other. Computation stopped being a finishing tool a long time ago. It is the ground the work stands on, and we treat it that way from the first sketch.',
      'We are not interested in dressing technology up, or in replaying old ideas about form. We want to work with the present tense: algorithmic, shifting, unfinished. Complexity is not something to hide. We take it apart, write it down, and let it show.',
      'Systems interest us more than objects. A finished artifact is just one frame of a longer process, so we design the process, its behaviors, tendencies and changes over time, and let the artifacts fall out of it.',
    ],
    [
      'The method is the medium. We spend our time setting up systems that run, not polishing a single frozen output. What gets authored is a chain of operations and relationships. The final state is whatever the system happens to be doing when you look.',
      'Every state grows out of the one before it and feeds the one after. Change is not decoration added at the end; it is a property the system was born with.',
      'Outputs are provisional by design. Each one is a temporary arrangement of inputs, parameters and time. We compare them, we keep some, and we never call any of them definitive.',
    ],
    [
      'Logic is the skeleton. It decides how parts relate, how decisions get made, and how complexity stays organized instead of just piling up.',
      'Rules make a system inspectable. When conditions are written clearly, the frictions and contradictions inside a system stop being invisible. That is where the interesting material lives.',
      'Rules on their own express nothing. Their job is to hold a frame steady so behavior can emerge inside it. Ambiguity should come from running the thing, never from writing it vaguely. Constraint is what makes exploration precise instead of endless.',
    ],
    [
      'Input is raw material. It is what wakes a system up and decides how it answers to a changing world.',
      'Data is never neutral. It gets measured, observed and selected by someone, inside a technical and cultural situation. We treat that history as part of the material.',
      'We pull input from real conditions: physical space, social systems, human activity, machine processes. How that input is sampled, its resolution, its framing, decides what the system can say and what stays out of reach.',
    ],
  ],
};

// Home intro block (original writing)
export const studioIntro = [
  '2xA is a code-driven design studio working between Amsterdam and Athens, focused on digital products, brand identities, UX/UI and custom web development.',
  'We sit at the crossing point of design and computation: websites, platforms and interactive systems where the code itself is part of the creative act. Strategy, design systems and generative methods combine into work that is clear, scalable and alive.',
  'Form follows process. Every project is a set of conditions released into motion — code tracing the edge between structure and surprise, between what was specified and what emerged.',
];

export const projectsIntro = [
  'The projects here come from different fields and different briefs. What they share is a method.',
  'Computation is used not to automate decisions but to build the conditions under which form, behavior and meaning can appear. Identity systems, digital platforms, motion work — each built from its own logic, shaped by its own constraints.',
  'Nothing is fixed in advance. A project defines its parameters, sets its processes running, and what follows is observed, adjusted, refined. The work is done not when a form is chosen, but when the system holds.',
];

export const projects = [
  {
    id: 'abr-festival',
    num: '01',
    name: 'ABR Festival',
    year: '2026',
    client: 'ABR Festival, Lefkosia',
    fields: ['Identity', 'Motion', 'Type Design'],
    theme: '#481010',
    themeText: '#e8d9c8',
    image: 'https://images.unsplash.com/photo-1619229725920-ac8b63b0631a?q=80&w=1600&auto=format&fit=crop',
    description:
      'A modular, motion-first identity built on the tension between Low Tech and High Life. A custom pixel typeface meets the cold clarity of Helvetica, and the whole visual language is generated in code — flexible enough to stretch from print to screen while holding a multicultural festival together as one coherent system.',
    detail: [
      'The brief asked for an identity that could carry many sounds, rhythms and audiences at once without falling apart. Instead of a fixed logo, we wrote a system: a pixel display face colliding with a neutral grotesque, recombined by scripts into posters, tickets, socials and stage visuals.',
      'Every application is an output of the same code base. Parameters shift per venue, per act, per day — the identity is never twice the same, and never anything other than itself.',
    ],
  },
  {
    id: 'buna-tetu',
    num: '02',
    name: 'Buna Tetu',
    year: '2025',
    client: 'Jazz Cafe Buna Tetu',
    fields: ['Generative Print', 'Poster Series', 'Sound Analysis'],
    theme: '#101014',
    themeText: '#dededa',
    image: 'https://images.unsplash.com/photo-1563050860-87d45eaaeabb?q=80&w=1600&auto=format&fit=crop',
    description:
      'A poster series for a jazz cafe, grown from the music itself. Each piece is generated in Processing from the sound analysis of one specific track — frequency bands mapped to form, color and density. Mid-century jazz print re-processed through algorithmic means: no two posters alike, each one a fixed frame of something that was always moving.',
    detail: [
      'We fed each track through a spectral analysis pipeline, splitting it into frequency bands that drive the composition: lows push mass and weight, mids carve structure, highs scatter detail across the surface.',
      'The typographic register borrows from the history of jazz sleeves — structured grids against fluid gesture — but every curve on the page is a data point from the recording. The poster is the song, sampled once.',
    ],
  },
  {
    id: 'miao-world',
    num: '03',
    name: 'Miao World',
    year: '2024',
    client: 'MiAO — Gaming Studio',
    fields: ['Digital Platform', 'Web Design', 'Development'],
    theme: '#0b0b0b',
    themeText: '#dededa',
    image: 'https://images.pexels.com/photos/13129483/pexels-photo-13129483.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description:
      'A digital platform for a Chinese gaming studio working between voxel worlds and artificial intelligence. The visual language speaks 80s computing — pixel type, monochrome palette, glitch as texture rather than error. Less a designed surface, more a system with its own history: something that existed before you arrived.',
    detail: [
      'The site behaves like an old machine that learned new tricks: terminal pacing, coarse bitmaps, interactions that feel excavated rather than invented.',
      'Under the retro grammar runs a modern stack — the glitches are deliberate, deterministic and art-directed down to the scanline.',
    ],
  },
  {
    id: 'climate-journalism',
    num: '04',
    name: 'Climate Journalism',
    year: '2023',
    client: 'N-Ost Network',
    fields: ['Platform', 'Archive', 'Data'],
    theme: '#12140f',
    themeText: '#dededa',
    image: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=1600&auto=format&fit=crop',
    description:
      'An archive platform for climate reporting across Central Asia. Studies, articles and conference material that once lived on scattered servers and private machines, organized into one searchable, durable public resource — so the data stops getting lost and starts getting used.',
    detail: [
      'The structure is the design: a taxonomy tuned with the editorial team, fast full-text search, and an interface that stays out of the way of the material.',
      'Built to be maintained by journalists, not developers — everything editable, everything exportable, nothing locked in.',
    ],
  },
  {
    id: 'who-owns-the-media',
    num: '05',
    name: 'Who Owns The Media',
    year: '2025',
    client: 'Investigative Consortium',
    fields: ['Interactive Platform', 'Data Visualization'],
    theme: '#0d0d12',
    themeText: '#dededa',
    image: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1600&auto=format&fit=crop',
    description:
      'An interactive platform mapping the entanglement of media ownership in Greece. A dense web of relationships, interests and influence turned into a navigable system — built as a research tool for journalists and a map for everyone else.',
    detail: [
      'Ownership graphs render as living networks: drag a node and its dependencies follow, filter by sector and watch the clusters re-form.',
      'Every edge in the graph is sourced. The visualization is an index into documents, not a substitute for them.',
    ],
  },
];

export const expertise = [
  {
    title: 'Branding',
    text: "We dig out what a brand actually is — its pulse, its character — and turn that into a clear platform every piece of creative work can stand on.",
  },
  {
    title: 'Brand Strategy',
    text: "We work out what your brand stands for, who it is talking to, and how it earns its place in the room.",
  },
  {
    title: 'Creative Direction',
    text: 'We hold the vision across every touchpoint, keeping the work sharp and consistent from first sketch to final pixel.',
  },
  {
    title: 'Motion',
    text: 'We bring movement, transformation and character to your stories — for social, for the web, or for a physical space.',
  },
  {
    title: 'Generative Systems',
    text: 'We build living visual systems driven by code, where every output is unique but the language stays consistent.',
  },
  {
    title: 'Web Design',
    text: 'We design code-first digital spaces, turning a website into a medium for creativity, interaction and expression.',
  },
  {
    title: 'Web Development',
    text: 'We turn our designs into functional, lightweight and forward-thinking code.',
  },
];

export const team = [
  { name: 'Eveleen', role: 'Co-Founder', craft: 'Web Developer / Project Manager', city: 'Amsterdam' },
  { name: 'Yannick', role: 'Co-Founder', craft: 'Web Developer / Creative Coder', city: 'Amsterdam' },
  { name: 'Maria', role: 'Co-Founder', craft: 'Graphic Designer / Type Designer', city: 'Athens' },
  { name: 'Dimitris', role: 'Co-Founder', craft: 'Graphic Designer / Art Director', city: 'Athens' },
];

export const teamImage =
  'https://images.unsplash.com/photo-1722970651121-6a3ea5666ff7?q=80&w=1600&auto=format&fit=crop';

export const awards = [
  { project: 'ABR Festival', org: 'CSS Design Awards', award: 'Special Kudos Award', year: '2026' },
  { project: 'Who Owns The Media', org: 'CSS Design Awards', award: 'Special Kudos Award', year: '2025' },
  { project: 'We Are Solomon', org: 'EBGE Awards', award: 'Award / Blogs & Portals', year: '2024' },
  { project: 'MiAO', org: 'Awwwards', award: 'Honorable Mention', year: '2024' },
  { project: '', org: 'CSS Design Awards', award: 'Special Kudos Award', year: '2024' },
  { project: 'Climate Journalism', org: 'Awwwards', award: 'Honorable Mention', year: '2023' },
  { project: 'Yannick Gregoire', org: 'Awwwards', award: 'Site Of The Day', year: '2022' },
  { project: '', org: 'CSS Design Awards', award: 'Site Of The Day', year: '2022' },
  { project: '', org: 'CSS Winner', award: 'Site Of The Day', year: '2022' },
  { project: '', org: 'EBGE Awards', award: 'Merit / Portfolios & Promotional Websites', year: '2022' },
];

export const genGridImages = [
  'https://images.unsplash.com/photo-1634368998864-8984df61cdda?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1635438004811-54b5864e57eb?q=80&w=1200&auto=format&fit=crop',
];

export const pageTitles = {
  '/': ['The', 'Studio'],
  '/about': ['The', 'Method'],
  '/projects': ['The', 'Projects'],
  '/contact': ['The', 'Contact'],
  '/privacy': ['The', 'Fine', 'Print'],
};
