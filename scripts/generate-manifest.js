import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const ASSETS_DIR = path.resolve('public/assets');
const MANIFEST_PATH = path.resolve('src/data/assets.ts');

function generateManifest() {
  console.log('Generating manifest...');
  
  const files = globSync('**/*.webp', { cwd: ASSETS_DIR, nocase: true });
  
  const manifest = {
    heroImages: [],
    logos: [],
    brands: [],
    projects: [],
    collections: [],
    documents: [],
    systems: [],
    features: [],
    other: []
  };

  files.forEach(file => {
    // Normalize path for web (URL) usage
    const webPath = `/assets/${file.replace(/\\/g, '/')}`;
    const lowerPath = webPath.toLowerCase();

    if (lowerPath.includes('/hero/')) {
      manifest.heroImages.push(webPath);
    } else if (lowerPath.includes('/logo/')) {
      manifest.logos.push(webPath);
    } else if (lowerPath.includes('/brands/')) {
      // It might be a brand image but also fall under projects/collections inside brands
      if (lowerPath.includes('/projects/')) {
        manifest.projects.push(webPath);
      } else if (lowerPath.includes('/collections/')) {
        manifest.collections.push(webPath);
      } else if (lowerPath.includes('/documents/')) {
        manifest.documents.push(webPath);
      } else if (lowerPath.includes('/systems/')) {
        manifest.systems.push(webPath);
      } else {
        manifest.brands.push(webPath);
      }
    } else if (lowerPath.includes('/projects/')) {
      manifest.projects.push(webPath);
    } else if (lowerPath.includes('/collections/')) {
      manifest.collections.push(webPath);
    } else if (lowerPath.includes('/documents/')) {
      manifest.documents.push(webPath);
    } else if (lowerPath.includes('/features/')) {
      manifest.features.push(webPath);
    } else {
      manifest.other.push(webPath);
    }
  });

  const tsContent = `// Automatically generated file. Do not edit directly.

export const assets = {
  heroImages: ${JSON.stringify(manifest.heroImages, null, 4)},
  logos: ${JSON.stringify(manifest.logos, null, 4)},
  brands: ${JSON.stringify(manifest.brands, null, 4)},
  projects: ${JSON.stringify(manifest.projects, null, 4)},
  collections: ${JSON.stringify(manifest.collections, null, 4)},
  documents: ${JSON.stringify(manifest.documents, null, 4)},
  systems: ${JSON.stringify(manifest.systems, null, 4)},
  features: ${JSON.stringify(manifest.features, null, 4)},
  other: ${JSON.stringify(manifest.other, null, 4)},
};
`;

  // Create data directory if it doesn't exist
  if (!fs.existsSync(path.resolve('src/data'))) {
    fs.mkdirSync(path.resolve('src/data'), { recursive: true });
  }

  fs.writeFileSync(MANIFEST_PATH, tsContent);
  console.log(`Manifest created at ${MANIFEST_PATH}`);
}

generateManifest();
