import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('public/assets');

function sanitizeName(name) {
  // Remove extension
  const parsed = path.parse(name);
  let base = parsed.name;
  
  // lowercase
  base = base.toLowerCase();
  
  // Replace spaces, underscores, dots, and special characters with hyphens
  base = base.replace(/[\s_.,()[\]{}!@#$%^&*=+|;:'"<>?/\\]+/g, '-');
  
  // Remove trailing or leading hyphens
  base = base.replace(/^-+|-+$/g, '');
  
  return base + '.webp';
}

async function run() {
  console.log('Scanning for images...');
  const files = globSync('**/*.{png,jpg,jpeg,webp}', { cwd: ASSETS_DIR, absolute: true, nocase: true });
  
  console.log(`Found ${files.length} images.`);
  
  const mapping = {};
  let converted = 0;
  let renamed = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const dir = path.dirname(file);
      const originalName = path.basename(file);
      const originalExt = path.extname(file).toLowerCase();
      
      const newName = sanitizeName(originalName);
      const newPath = path.join(dir, newName);
      const relativeOriginal = path.relative(ASSETS_DIR, file);
      const relativeNew = path.relative(ASSETS_DIR, newPath);
      
      mapping[relativeOriginal] = relativeNew;
      
      const isSameFile = file === newPath;
      const tempPath = path.join(dir, `_temp_${newName}`);
      
      // Convert to webp
      const imageBuffer = await fs.promises.readFile(file);
      await sharp(imageBuffer)
        .webp({ quality: 95 })
        .toFile(tempPath);
      
      // Delete original
      fs.unlinkSync(file);
      
      // Rename temp to final
      fs.renameSync(tempPath, newPath);
      
      converted++;
      if (!isSameFile) renamed++;
      
    } catch (e) {
      console.error(`Failed to process ${file}:`, e);
      errors++;
    }
  }

  console.log(`\n--- Conversion Complete ---`);
  console.log(`Images Converted: ${converted}`);
  console.log(`Images Renamed: ${renamed}`);
  console.log(`Errors: ${errors}`);
  
  fs.writeFileSync('scripts/mapping.json', JSON.stringify(mapping, null, 2));
}

run();
