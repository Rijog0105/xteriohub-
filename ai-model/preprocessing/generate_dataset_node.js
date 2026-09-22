import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.resolve(__dirname, '..');
const DATASET_DIR = path.join(BASE_DIR, 'dataset');
const BUILDINGS_DIR = path.join(DATASET_DIR, 'buildings');
const MASKS_DIR = path.join(DATASET_DIR, 'masks');
const MATERIALS_DIR = path.join(DATASET_DIR, 'materials');
const TARGETS_DIR = path.join(DATASET_DIR, 'target_renders');
const METADATA_DIR = path.join(DATASET_DIR, 'metadata');

const WEB_ROOT = path.resolve(__dirname, '../..');
const PUBLIC_DIR = path.join(WEB_ROOT, 'public');

// Create directories
[BUILDINGS_DIR, MASKS_DIR, MATERIALS_DIR, TARGETS_DIR, METADATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Import assets from assets.ts
async function loadAssets() {
  const assetsPath = path.join(WEB_ROOT, 'src', 'data', 'assets.ts');
  const content = fs.readFileSync(assetsPath, 'utf-8');
  
  // Extract collections array and projects array
  const collectionsMatch = content.match(/collections:\s*\[([\s\S]*?)\]\s*,/);
  const projectsMatch = content.match(/projects:\s*\[([\s\S]*?)\]\s*,/);
  
  const parseArray = (str) => {
    if (!str) return [];
    return str
      .split('\n')
      .map(line => line.trim().replace(/[",]/g, ''))
      .filter(line => line.startsWith('/assets/'));
  };

  const collections = parseArray(collectionsMatch ? collectionsMatch[1] : '');
  const projects = parseArray(projectsMatch ? projectsMatch[1] : '');

  return { collections, projects };
}

async function processImage(imagePath, targetSize = 1024) {
  return await sharp(imagePath)
    .resize(targetSize, targetSize, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

function generateMaskBuffer(rawBuffer, width, height) {
  const mask = Buffer.alloc(width * height);
  
  for (let y = 0; y < height; y++) {
    const yRatio = y / height;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const R = rawBuffer[idx];
      const G = rawBuffer[idx + 1];
      const B = rawBuffer[idx + 2];

      const lum = 0.299 * R + 0.587 * G + 0.114 * B;
      const maxC = Math.max(R, G, B);
      const minC = Math.min(R, G, B);
      const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;

      // 1. Sky
      const isSky = ((B > R + 14) && (B >= G - 2) && (lum > 75)) || 
                    ((lum > 215) && (sat < 0.18) && (yRatio < 0.65)) ||
                    ((B > R + 8) && (G > R + 4) && (lum > 140) && (yRatio < 0.7));

      // 2. Greenery
      const isGreen = (G > R + 16) && (G > B + 16) && (sat > 0.12) && (lum > 25);

      // 3. Ground
      const isGround = (yRatio > 0.90) && (R > 130 && G > 115 && B < 105) && (R > B + 35);

      const mIdx = y * width + x;
      mask[mIdx] = (isSky || isGreen || isGround) ? 0 : 255;
    }
  }
  return mask;
}

function renderTargetBuffer(buildingRaw, materialRaw, mask, width, height, matWidth, matHeight) {
  const target = Buffer.alloc(width * height * 3);
  const tileW = Math.max(120, Math.round(width / 8));
  const tileH = Math.max(80, Math.round(tileW * (matHeight / matWidth)));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const mIdx = y * width + x;
      const isWall = mask[mIdx] > 128;

      if (isWall) {
        const oR = buildingRaw[i];
        const oG = buildingRaw[i + 1];
        const oB = buildingRaw[i + 2];
        const lum = 0.299 * oR + 0.587 * oG + 0.114 * oB;
        const shadeFactor = Math.min(1.5, Math.max(0.35, Math.pow(lum / 135.0, 0.95)));

        // Modulo coordinate in tiled material
        const mx = x % matWidth;
        const my = y % matHeight;
        const matIdx = (my * matWidth + mx) * 3;

        const mR = materialRaw[matIdx];
        const mG = materialRaw[matIdx + 1];
        const mB = materialRaw[matIdx + 2];

        target[i] = Math.min(255, Math.max(0, Math.round(mR * shadeFactor)));
        target[i + 1] = Math.min(255, Math.max(0, Math.round(mG * shadeFactor)));
        target[i + 2] = Math.min(255, Math.max(0, Math.round(mB * shadeFactor)));
      } else {
        target[i] = buildingRaw[i];
        target[i + 1] = buildingRaw[i + 1];
        target[i + 2] = buildingRaw[i + 2];
      }
    }
  }
  return target;
}

async function main() {
  console.log('=' .repeat(65));
  console.log('  XTERIOHUB HIGH-PRECISION DATASET GENERATION (FROM COLLECTIONS)');
  console.log('=' .repeat(65));

  const { collections, projects } = await loadAssets();
  console.log(`Found ${collections.length} material panel items in collections.`);
  console.log(`Found ${projects.length} architectural project buildings.`);

  const validMaterials = collections.filter(c => 
    !c.toLowerCase().includes('dimension') && 
    !c.toLowerCase().includes('main') &&
    fs.existsSync(path.join(PUBLIC_DIR, c.replace(/^\//, '')))
  );

  const validBuildings = projects.filter(p => 
    fs.existsSync(path.join(PUBLIC_DIR, p.replace(/^\//, '')))
  );

  console.log(`Valid material assets: ${validMaterials.length}`);
  console.log(`Valid building assets: ${validBuildings.length}`);

  const metadataRecords = [];
  let pairId = 1;
  const targetSamples = Math.min(200, validMaterials.length * 2);

  for (let i = 0; i < targetSamples; i++) {
    const matRel = validMaterials[i % validMaterials.length];
    const bldRel = validBuildings[i % validBuildings.length];

    const matPath = path.join(PUBLIC_DIR, matRel.replace(/^\//, ''));
    const bldPath = path.join(PUBLIC_DIR, bldRel.replace(/^\//, ''));

    try {
      // 1. Process Building (1024x1024)
      const { data: bRaw, info: bInfo } = await processImage(bldPath, 1024);

      // 2. Process Material (512x512)
      const { data: mRaw, info: mInfo } = await processImage(matPath, 512);

      // 3. Generate Façade Mask
      const maskBuf = generateMaskBuffer(bRaw, bInfo.width, bInfo.height);

      // 4. Render Target Ground Truth
      const targetBuf = renderTargetBuffer(bRaw, mRaw, maskBuf, bInfo.width, bInfo.height, mInfo.width, mInfo.height);

      // Save files
      const bFilename = `building_${String(pairId).padStart(5, '0')}.jpg`;
      const mFilename = `material_${String(pairId).padStart(5, '0')}.jpg`;
      const maskFilename = `mask_${String(pairId).padStart(5, '0')}.png`;
      const tFilename = `target_${String(pairId).padStart(5, '0')}.jpg`;

      await sharp(bRaw, { raw: { width: bInfo.width, height: bInfo.height, channels: 3 } })
        .jpeg({ quality: 95 })
        .toFile(path.join(BUILDINGS_DIR, bFilename));

      await sharp(mRaw, { raw: { width: mInfo.width, height: mInfo.height, channels: 3 } })
        .jpeg({ quality: 95 })
        .toFile(path.join(MATERIALS_DIR, mFilename));

      await sharp(maskBuf, { raw: { width: bInfo.width, height: bInfo.height, channels: 1 } })
        .png()
        .toFile(path.join(MASKS_DIR, maskFilename));

      await sharp(targetBuf, { raw: { width: bInfo.width, height: bInfo.height, channels: 3 } })
        .jpeg({ quality: 95 })
        .toFile(path.join(TARGETS_DIR, tFilename));

      // Derive brand and collection name
      const brandMatch = matRel.match(/\/Brands\/([^/]+)\//i);
      const brand = brandMatch ? brandMatch[1].toLowerCase() : 'xteriohub';
      const matName = path.basename(matRel, path.extname(matRel)).replace(/[-_]/g, ' ').toUpperCase();

      const prompt = `Professional architectural visualization of the same building with installed ${brand.toUpperCase()} ${matName} façade cladding panels, individual panels with authentic subtle joints, preserved windows, structural geometry, and natural architectural lighting.`;

      metadataRecords.push({
        id: pairId,
        building_image: path.join(BUILDINGS_DIR, bFilename),
        mask_image: path.join(MASKS_DIR, maskFilename),
        material_image: path.join(MATERIALS_DIR, mFilename),
        target_image: path.join(TARGETS_DIR, tFilename),
        brand,
        material_name: matName,
        prompt
      });

      if (pairId % 25 === 0) {
        console.log(`Generated ${pairId}/${targetSamples} training pairs...`);
      }
      pairId++;
    } catch (err) {
      console.warn(`Pair ${pairId} error:`, err.message);
    }
  }

  // Save complete metadata JSON
  fs.writeFileSync(
    path.join(METADATA_DIR, 'training_dataset.json'),
    JSON.stringify(metadataRecords, null, 2)
  );

  // 85% Train / 15% Validation Split
  const splitIdx = Math.floor(metadataRecords.length * 0.85);
  const trainData = metadataRecords.slice(0, splitIdx);
  const valData = metadataRecords.slice(splitIdx);

  fs.writeFileSync(path.join(METADATA_DIR, 'train_manifest.json'), JSON.stringify(trainData, null, 2));
  fs.writeFileSync(path.join(METADATA_DIR, 'val_manifest.json'), JSON.stringify(valData, null, 2));

  console.log('\n✓ Dataset Generation Complete!');
  console.log(`  - Total Training Pairs: ${metadataRecords.length}`);
  console.log(`  - Train Split (85%):    ${trainData.length}`);
  console.log(`  - Val Split (15%):      ${valData.length}`);
  console.log('=' .repeat(65));
}

main();
