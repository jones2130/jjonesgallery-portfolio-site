/**
 * generate-sitemap.js
 *
 * Generates public/sitemap.xml from portfolioData.json at build time.
 * Run with:  node scripts/generate-sitemap.js
 * This script is automatically invoked before `vite build` via the
 * "prebuild" npm script in package.json.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = join(__dirname, '..');

const BASE_URL   = 'https://www.jamesjjonesgallery.com';
const PUBLIC_DIR = join(ROOT, 'src', 'public');
const DATA_PATH  = join(ROOT, 'src', 'data', 'portfolioData.json');
const OUT_PATH   = join(PUBLIC_DIR, 'sitemap.xml');

const portfolio = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
const today     = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { loc: `${BASE_URL}/`,        priority: '1.0', changefreq: 'weekly',  lastmod: today },
  { loc: `${BASE_URL}/gallery`, priority: '0.9', changefreq: 'weekly',  lastmod: today },
  { loc: `${BASE_URL}/about`,   priority: '0.6', changefreq: 'monthly', lastmod: today },
  { loc: `${BASE_URL}/contact`, priority: '0.5', changefreq: 'yearly',  lastmod: today },
];

const artRoutes = portfolio
  .filter((p) => p.slug)
  .map((p) => ({
    loc:        `${BASE_URL}/art/${p.slug}`,
    priority:   '0.8',
    changefreq: 'monthly',
    lastmod:    p.date ? p.date.slice(0, 10) : today,
  }));

const allRoutes = [...staticRoutes, ...artRoutes];

function urlBlock({ loc, priority, changefreq, lastmod }) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRoutes.map(urlBlock),
  '</urlset>',
  '',
].join('\n');

mkdirSync(PUBLIC_DIR, { recursive: true });
writeFileSync(OUT_PATH, xml, 'utf-8');

console.log(`[sitemap] Generated ${allRoutes.length} URLs → ${OUT_PATH}`);
