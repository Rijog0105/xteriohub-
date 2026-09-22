import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const brands = ['frontek', 'tempio', 'steni', 'techlam'];

const results = {};

for (const bId of brands) {
  const docsDir = path.join(projectRoot, `public/assets/Brands/${bId}/documents`);
  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir).filter(f => f.toLowerCase().endsWith('.pdf'));
    results[bId] = files.map(f => ({
      fileName: f,
      filePath: `/assets/Brands/${bId}/documents/${f}`,
      title: f.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ').toUpperCase()
    }));
  } else {
    results[bId] = [];
  }
}

console.log(JSON.stringify(results, null, 2));
