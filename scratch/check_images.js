import sharp from 'sharp';
import fs from 'fs';

async function check() {
  const meta1 = await sharp('public/assets/Brands/frontek/documents/catalogue-cover.png').metadata();
  const meta2 = await sharp('public/assets/Brands/frontek/documents/Frontek-Architectural-Catalogue-2026-preview.png').metadata();
  console.log('catalogue-cover.png:', meta1);
  console.log('Frontek-Architectural-Catalogue-2026-preview.png:', meta2);
}

check();
