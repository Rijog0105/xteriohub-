import fs from 'fs';
import path from 'path';

function findFiles(dir, match) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(full, match));
    } else {
      if (!match || file.toLowerCase().includes(match.toLowerCase())) {
        results.push(full);
      }
    }
  });
  return results;
}

const found = findFiles('./public/assets/Brands/frontek', 'canyon');
console.log('Found canyon:', found);

const someFrontek = findFiles('./public/assets/Brands/frontek', '').slice(0, 10);
console.log('Sample Frontek files:', someFrontek);
