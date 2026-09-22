import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Advanced Architectural Façade Synthesis Engine
 */
async function synthesizeFacade(buildingPath, materialPath, outputPath) {
  console.log(`Loading building: ${buildingPath}`);
  console.log(`Loading material: ${materialPath}`);

  const bBuffer = fs.readFileSync(buildingPath);
  const mBuffer = fs.readFileSync(materialPath);

  const bMeta = await sharp(bBuffer).metadata();
  const width = Math.min(1920, bMeta.width || 1280);
  const height = Math.min(1920, bMeta.height || 800);

  const { data: bRaw } = await sharp(bBuffer)
    .resize(width, height, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: mRaw, info: mInfo } = await sharp(mBuffer)
    .resize(512, 512, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 1. Build authentic architectural panel tile
  const panelW = Math.max(96, Math.round(width / 14));
  const panelH = Math.max(54, Math.round(panelW * 0.56));

  const { data: tileRaw } = await sharp(mBuffer)
    .resize(panelW, panelH, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Add realistic micro-recessed joint
  for (let ty = 0; ty < panelH; ty++) {
    for (let tx = 0; tx < panelW; tx++) {
      const idx = (ty * panelW + tx) * 3;
      const isJoint = (ty === 0 || ty === panelH - 1 || tx === 0 || tx === panelW - 1);
      const isTopBevel = (ty === 1 && tx > 1 && tx < panelW - 1);

      if (isJoint) {
        tileRaw[idx] = Math.round(tileRaw[idx] * 0.35);
        tileRaw[idx + 1] = Math.round(tileRaw[idx + 1] * 0.35);
        tileRaw[idx + 2] = Math.round(tileRaw[idx + 2] * 0.35);
      } else if (isTopBevel) {
        tileRaw[idx] = Math.min(255, Math.round(tileRaw[idx] * 1.15));
        tileRaw[idx + 1] = Math.min(255, Math.round(tileRaw[idx + 1] * 1.15));
        tileRaw[idx + 2] = Math.min(255, Math.round(tileRaw[idx + 2] * 1.15));
      }
    }
  }

  const outBuf = Buffer.alloc(width * height * 3);

  // Extract sky sample color for glass reflections
  let skyR = 140, skyG = 180, skyB = 220;

  for (let y = 0; y < height; y++) {
    const yRatio = y / height;
    const rowIndex = Math.floor(y / panelH);
    const rowOffset = (rowIndex % 2 === 1) ? Math.floor(panelW / 2) : 0;

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const oR = bRaw[i];
      const oG = bRaw[i + 1];
      const oB = bRaw[i + 2];

      const lum = 0.299 * oR + 0.587 * oG + 0.114 * oB;
      const maxC = Math.max(oR, oG, oB);
      const minC = Math.min(oR, oG, oB);
      const sat = maxC === 0 ? 0 : (maxC - minC) / maxC;

      // 1. Sky & Clouds
      const isSky = ((oB > oR + 12) && (oB >= oG - 2) && (lum > 75)) || 
                    ((lum > 218) && (sat < 0.18) && (yRatio < 0.65)) ||
                    ((oB > oR + 8) && (oG > oR + 4) && (lum > 140) && (yRatio < 0.7));

      // 2. Greenery
      const isGreen = (oG > oR + 15) && (oG > oB + 15) && (sat > 0.12) && (lum > 25);

      // 3. Ground floor soil/road
      const isGround = (yRatio > 0.90) && (oR > 130 && oG > 115 && oB < 105) && (oR > oB + 35);

      // 4. Window openings / Interior voids
      const isWindowVoid = (lum < 35) && (yRatio > 0.15 && yRatio < 0.85);

      if (isSky) {
        skyR = oR; skyG = oG; skyB = oB;
        outBuf[i] = oR; outBuf[i + 1] = oG; outBuf[i + 2] = oB;
      } else if (isGreen || isGround) {
        outBuf[i] = oR; outBuf[i + 1] = oG; outBuf[i + 2] = oB;
      } else if (isWindowVoid) {
        // Render architectural glass glazing with subtle sky reflection
        const glassReflect = 0.25;
        outBuf[i] = Math.round(oR * (1 - glassReflect) + skyR * glassReflect * 0.7);
        outBuf[i + 1] = Math.round(oG * (1 - glassReflect) + skyG * glassReflect * 0.7);
        outBuf[i + 2] = Math.round(oB * (1 - glassReflect) + skyB * glassReflect * 0.7);
      } else {
        // Wall Surface: Clad with individual panels + physical lighting
        const tx = (x + rowOffset) % panelW;
        const ty = y % panelH;
        const tIdx = (ty * panelW + tx) * 3;

        const pR = tileRaw[tIdx];
        const pG = tileRaw[tIdx + 1];
        const pB = tileRaw[tIdx + 2];

        const normLum = lum / 135.0;
        const shadeFactor = Math.min(1.45, Math.max(0.35, Math.pow(normLum, 0.92)));

        outBuf[i] = Math.min(255, Math.max(0, Math.round(pR * shadeFactor)));
        outBuf[i + 1] = Math.min(255, Math.max(0, Math.round(pG * shadeFactor)));
        outBuf[i + 2] = Math.min(255, Math.max(0, Math.round(pB * shadeFactor)));
      }
    }
  }

  await sharp(outBuf, { raw: { width, height, channels: 3 } })
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(outputPath);

  console.log(`✓ Synthesized render saved to: ${outputPath}`);
}

async function run() {
  const bPath = 'public/assets/Brands/tempio/projects/yarilla-palace.webp';
  const mPath = 'public/assets/Brands/frontek/collections/textured/textured/pictures/canyon.webp';
  const outPath = 'scratch/test_rendered_output.jpg';

  await synthesizeFacade(bPath, mPath, outPath);
}

run();
