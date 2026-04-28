/**
 * portfolioData.js
 *
 * Hard-coded art piece data for v1.
 * Shape mirrors what a REST API would return — v2 migration is a fetch swap.
 *
 * Images live in src/public/images/art/<medium_folder>/<filename>
 * and are served from /images/art/... at runtime via Vite's publicDir.
 *
 * Fields:
 *   id           — unique string identifier
 *   slug         — URL-safe string used in /art/:slug routing
 *   title        — display title
 *   medium       — 'Oil' | 'Acrylic' | 'Mixed Media'
 *   nsfw         — optional: boolean, whether content is not safe for work
 *   date         — 4-digit year string (used for filtering/sorting)
 *   tags         — array of search/filter keywords
 *   description  — full piece description shown on ArtDetail page
 *   imageUrl     — path served from publicDir root (Vite strips src/public)
 *   purchaseLinks:
 *     redbubble  — Redbubble URL for prints/merch (optional)
 *     kofi       — Ko-Fi shop URL for originals (optional)
 */

const portfolioData = [

  // ── Oil Paintings ─────────────────────────────────────────────────────────
  // Files use date-prefix naming: YYYYMMDD_subject_sequence.jpg
  {
    id: 'oil-001',
    slug: 'seascape-2018',
    title: 'Seascape',
    medium: 'Oil',
    date: '2018',
    tags: ['seascape', 'oil', 'ocean', 'landscape'],
    description:
      'An early oil study of the sea — loose, gestural marks capturing the movement of water against a grey sky. One of a series of seascape sketches from late summer 2018.',
    imageUrl: '/images/art/oil_paintings/20180825_seascape_01.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
    },
  },
  {
    id: 'oil-002',
    slug: 'still-life-2018',
    title: 'Still Life',
    medium: 'Oil',
    date: '2018',
    tags: ['still life', 'oil', 'interior', 'objects'],
    description:
      'A quiet still life arrangement in oil. Painted from observation, focusing on the way light falls across simple objects and the depth you can find in an ordinary scene.',
    imageUrl: '/images/art/oil_paintings/20180903_still_life_01.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'oil-003',
    slug: 'portrait-2018',
    title: 'Portrait Study',
    medium: 'Oil',
    date: '2018',
    tags: ['portrait', 'oil', 'figure', 'study'],
    description:
      'A portrait study in oil — working from life, exploring the planes of the face and how colour temperature shifts from warm light to cool shadow.',
    imageUrl: '/images/art/oil_paintings/20180908_portrait_01.jpg',
    purchaseLinks: {
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'oil-004',
    slug: 'monster-forest',
    title: 'Monster Forest',
    medium: 'Oil',
    date: '2018',
    tags: ['forest', 'oil', 'dark', 'fantasy', 'landscape'],
    description:
      'Dark, gnarled trees crowd the frame in this atmospheric forest study. The palette leans heavily into shadow, letting the shapes of the branches carry the mood.',
    imageUrl: '/images/art/oil_paintings/20181130_monster_forrest.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'oil-005',
    slug: 'red-forest',
    title: 'Red Forest',
    medium: 'Oil',
    date: '2018',
    tags: ['forest', 'oil', 'red', 'autumn', 'landscape'],
    description:
      'A forest interior bathed in deep reds — autumn light filtered through dense canopy. The contrast between the warm foreground haze and cooler depths gives the scene a vivid, almost surreal quality.',
    imageUrl: '/images/art/oil_paintings/20181203_red_forrest.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
    },
  },
  {
    id: 'oil-006',
    slug: 'aurora-mountains',
    title: 'Aurora Mountains',
    medium: 'Oil',
    date: '2019',
    tags: ['oil', 'aurora', 'mountains', 'night', 'landscape'],
    description:
      'Northern lights cascade over a mountain range in this night landscape. Greens and violets in the sky anchor a palette of cool blues and warm snow shadows below.',
    imageUrl: '/images/art/oil_paintings/20190119_aurora_mountains_02.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'oil-007',
    slug: 'waterfall',
    title: 'Waterfall',
    medium: 'Oil',
    date: '2019',
    tags: ['oil', 'waterfall', 'water', 'nature', 'landscape'],
    description:
      'Rushing water over rocks — the challenge here was holding the energy of the falling water while keeping the surrounding foliage settled and grounded.',
    imageUrl: '/images/art/oil_paintings/20190616_waterfall.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
    },
  },
  {
    id: 'oil-008',
    slug: 'forrest-lake',
    title: 'Forest Lake',
    medium: 'Oil',
    date: '2019',
    tags: ['oil', 'forest', 'lake', 'reflection', 'landscape'],
    description:
      'A still forest lake reflects the treeline above. The mirror-like surface offered an opportunity to explore subtle value shifts in the reflection versus the sky above.',
    imageUrl: '/images/art/oil_paintings/20190510_forrest_lake.jpg',
    purchaseLinks: {
      kofi: 'https://ko-fi.com/',
    },
  },

  // ── Acrylic Paintings ─────────────────────────────────────────────────────
  {
    id: 'acrylic-001',
    slug: 'bell-pepper-splash',
    title: 'Bell Pepper Splash',
    medium: 'Acrylic',
    date: '2023',
    tags: ['acrylic', 'still life', 'food', 'vibrant', 'colour study'],
    description:
      'Bold, saturated acrylics push the bell pepper into something almost graphic. A study in chromatic intensity — how far can you push a colour before it stops reading as the object?',
    imageUrl: '/images/art/acrylic_paintings/bell_pepper_splash_acrylic.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'acrylic-002',
    slug: 'cut-bell-peppers',
    title: 'Cut Bell Peppers',
    medium: 'Acrylic',
    date: '2023',
    tags: ['acrylic', 'still life', 'food', 'colour study'],
    description:
      'The interior geometry of sliced bell peppers — seeds arranged in radial patterns, the sheen of cut flesh. Painted from direct observation on a white ground.',
    imageUrl: '/images/art/acrylic_paintings/cut_bell_peppers_acrylic.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
    },
  },
  {
    id: 'acrylic-003',
    slug: 'flower-girl',
    title: 'Flower Girl',
    medium: 'Acrylic',
    date: '2023',
    tags: ['acrylic', 'figure', 'portrait', 'flowers', 'colour'],
    description:
      'A figure study in acrylics — the softness of the flowers contrasted against the directness of the face. Worked wet-into-wet to blend the background into the subject.',
    imageUrl: '/images/art/acrylic_paintings/flower_girl_acrylic.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'acrylic-004',
    slug: 'pepper-bowl',
    title: 'Pepper Bowl',
    medium: 'Acrylic',
    date: '2023',
    tags: ['acrylic', 'still life', 'food', 'bowl', 'warm tones'],
    description:
      'Peppers piled in a bowl — warm oranges and reds against a neutral ground. A companion piece to the pepper series, focusing on grouping and the eye\'s movement through a composition.',
    imageUrl: '/images/art/acrylic_paintings/pepper_bowl_acrylic.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
    },
  },
  {
    id: 'acrylic-005',
    slug: 'bottled-rose',
    title: 'Bottled Rose',
    medium: 'Acrylic',
    date: '2023',
    tags: ['acrylic', 'still life', 'flower', 'rose', 'glass'],
    description:
      'A single rose in a glass bottle — an exercise in transparency and reflection. The glass refracts and distorts the stem below the waterline while the bloom opens above.',
    imageUrl: '/images/art/acrylic_paintings/bottled_rose.png',
    purchaseLinks: {
      kofi: 'https://ko-fi.com/',
    },
  },

  // ── Mixed Media Drawings ──────────────────────────────────────────────────
  {
    id: 'mixed-001',
    slug: 'broken-environment',
    title: 'Broken Environment',
    medium: 'Mixed Media',
    date: '2022',
    tags: ['mixed media', 'abstract', 'environment', 'drawing', 'conceptual'],
    description:
      'A conceptual mixed media piece exploring fragmentation and environmental disruption — layered mark-making with ink and dry media over a worked paper ground.',
    imageUrl: '/images/art/mixed_media_drawings/broken_environment.png',
    purchaseLinks: {
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'mixed-002',
    slug: 'glorios-cereal',
    title: 'Glorious Cereal',
    medium: 'Mixed Media',
    date: '2022',
    tags: ['mixed media', 'pop', 'food', 'drawing', 'humour'],
    description:
      'An irreverent look at the humble cereal bowl — part pop art homage, part colour study. Mixed media layering gives the piece a texture that contrasts with the mundane subject matter.',
    imageUrl: '/images/art/mixed_media_drawings/gorios_cereal.png',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
  {
    id: 'mixed-003',
    slug: 'sunglasses-down',
    title: 'Sunglasses Down',
    medium: 'Mixed Media',
    date: '2022',
    tags: ['mixed media', 'portrait', 'sunglasses', 'drawing', 'figure'],
    description:
      'A mixed media portrait — charcoal and ink beneath washes of colour. The sunglasses pulled low create a moment of direct, conspiratorial eye contact with the viewer.',
    imageUrl: '/images/art/mixed_media_drawings/sunglasses_down.jpg',
    purchaseLinks: {
      redbubble: 'https://www.redbubble.com/',
      kofi: 'https://ko-fi.com/',
    },
  },
];

export default portfolioData;

// ── Derived filter helpers ────────────────────────────────────────────────────

/** All unique medium values, alphabetically */
export const ALL_MEDIUMS = [...new Set(portfolioData.map((p) => p.medium))].sort();

/** All unique year values, newest first */
export const ALL_DATES = [...new Set(portfolioData.map((p) => p.date))].sort((a, b) => b - a);
