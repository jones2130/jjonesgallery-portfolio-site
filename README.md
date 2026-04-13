# James J Jones Gallery — Developer README

## Running the site

```bash
npm install       # first time only
npm run dev       # start dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## Where to fiddle

### 🎨 Colors, fonts, spacing — `src/index.css`

Everything visual flows from the `:root` token block at the top of this file.
Change a value here and it cascades across the whole site instantly.

```css
:root {
  /* Page & card backgrounds */
  --color-bg:         #0f0e0c;   /* main background */
  --color-bg-raised:  #1a1916;   /* navbar on scroll, form sidebar */
  --color-bg-card:    #222018;   /* gallery cards */
  --color-border:     #2e2b24;   /* dividers, card borders */

  /* Text */
  --color-text:       #e8e0d0;   /* primary text */
  --color-text-muted: #8a8070;   /* secondary / captions */

  /* Accent — this one colour sets the whole mood */
  --color-accent:     #c8a96e;   /* gold: buttons, active links, highlights */
  --color-accent-dim: #7a6640;   /* hover borders, muted accent */
  --color-link:       #d4b87a;   /* inline link colour */

  /* Fonts */
  --font-display: 'Cormorant Garamond', Georgia, serif;  /* all headings */
  --font-body:    'Inter', system-ui, sans-serif;          /* all body text */

  /* Spacing — used for padding/gap everywhere */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2.5rem;
  --space-2xl: 4rem;

  /* Layout */
  --max-width:  1200px;   /* max content width */
  --nav-height: 64px;     /* fixed navbar height */
}
```

**To change fonts:** go to [fonts.google.com](https://fonts.google.com), grab an embed link,
paste it into `index.html` (replacing the existing `<link>`), then update
`--font-display` or `--font-body` above to match.

---

### 🖼️ Art pieces & content — `src/data/portfolioData.js`

Add, edit, or remove your artworks here. Each entry looks like:

```js
{
  id: 'oil-001',            // unique ID (internal, never shown)
  slug: 'my-painting',     // becomes the URL: /art/my-painting
  title: 'My Painting',
  medium: 'Oil',           // 'Oil' | 'Acrylic' | 'Mixed Media'
  date: '2024',            // year string — used in the date filter
  tags: ['landscape'],     // keywords for Fuse.js search
  description: '...',      // shown on the detail page
  imageUrl: '/images/art/oil_paintings/filename.jpg',
  purchaseLinks: {
    redbubble: 'https://...',   // omit key if no link
    kofi:      'https://...',   // omit key if no link
  },
}
```

Images live in `src/public/images/art/<medium_folder>/`.
Drop a file in there, add an entry here, and it's live.

---

### 📄 Per-component tweaks

| File | What it controls |
|---|---|
| `src/components/Navbar.css` | Nav height, logo size, link style, mobile breakpoint |
| `src/components/ArtCard.css` | Card hover lift, image aspect ratio, overlay |
| `src/components/PurchaseLinks.css` | Buy-button layout and label |
| `src/pages/Home.css` | Hero gradient, title size, featured section |
| `src/pages/ArtDetail.css` | Detail layout (image ↔ info), tag pills |
| `src/pages/Gallery.css` | Toolbar layout, empty-state message |
| `src/pages/About.css` | Portrait sidebar, bio text spacing |
| `src/pages/Contact.css` | Form layout, aside sidebar |

---

### 🔍 Search & filtering

- **Search** — powered by [Fuse.js](https://fusejs.io/) in `src/hooks/useSearch.js`.
  Searches across `title`, `tags`, `description`, and `medium`.
  Tweak the fuzziness with the `threshold` option (0 = exact, 1 = anything matches).

- **Filters** — `src/hooks/useFilter.js` filters by `medium` and `date`.
  To add a new filter dimension (e.g. `size`, `available`):
  1. Add the field to your data entries in `portfolioData.js`
  2. Add a `''` default for it in `DEFAULT_FILTERS` in `useFilter.js`
  3. Add the predicate line inside `useMemo`
  4. Add a `<select>` for it in `FilterBar.jsx`

---

### 🗺️ Routing

| URL | Page file |
|---|---|
| `/` | `src/pages/Home.jsx` |
| `/gallery` | `src/pages/Gallery.jsx` |
| `/art/:slug` | `src/pages/ArtDetail.jsx` |
| `/about` | `src/pages/About.jsx` |
| `/contact` | `src/pages/Contact.jsx` |
| anything else | `src/pages/NotFound.jsx` |

Routes are defined in `src/App.jsx`.

---

### 📁 Project structure at a glance

```
src/
├── index.css              ← global tokens & reset
├── main.jsx               ← app entry point
├── App.jsx                ← route definitions
├── components/            ← reusable UI pieces
│   ├── Navbar.jsx / .css
│   ├── Footer.jsx / .css
│   ├── ArtCard.jsx / .css
│   ├── SearchBar.jsx / .css
│   ├── FilterBar.jsx / .css
│   └── PurchaseLinks.jsx / .css
├── pages/
│   ├── Home.jsx / .css
│   ├── Gallery.jsx / .css
│   ├── ArtDetail.jsx / .css
│   ├── About.jsx / .css
│   ├── Contact.jsx / .css
│   └── NotFound.jsx
├── hooks/
│   ├── useSearch.js       ← Fuse.js search hook
│   └── useFilter.js       ← medium + date filter hook
└── data/
    └── portfolioData.js   ← your art content lives here

src/public/images/art/     ← drop art images in here
├── oil_paintings/
├── acrylic_paintings/
└── mixed_media_drawings/
```
