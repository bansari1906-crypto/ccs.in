
const fs = require('fs');
const path = require('path');
const productCatalog = require('./src/data/product-catalog.json');

const baseUrl = 'https://chitracropscience.in';

// Generate sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Static pages
  const staticPages = [
    '',
    '/products',
    '/about',
    '/contact',
    '/blog',
    '/knowledge-center',
    '/gallery',
    '/testimonials'
  ];

  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
  });

  // Product pages
  productCatalog.forEach(product => {
    sitemap += `  <url>
    <loc>${baseUrl}/product/${product.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
};

// Write sitemap to public directory
const sitemap = generateSitemap();
fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully at public/sitemap.xml');

