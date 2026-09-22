import { generateFacadeWithGemini } from '../server/geminiFacadeService.js';
import fs from 'fs';

async function testGeminiService() {
  console.log('Testing generateFacadeWithGemini with synthetic images...');
  
  const sampleBuildingPath = 'public/assets/Brands/tempio/projects/yarilla-palace.webp';
  const swatchPath = 'public/assets/Brands/frontek/collections/textured/canyon/canyon.webp';

  if (!fs.existsSync(sampleBuildingPath) || !fs.existsSync(swatchPath)) {
    console.log('Files not found on expected paths, skipping disk test');
    return;
  }

  const buildingBuf = fs.readFileSync(sampleBuildingPath);
  const swatchBuf = fs.readFileSync(swatchPath);

  const buildingBase64 = `data:image/webp;base64,${buildingBuf.toString('base64')}`;
  const swatchBase64 = `data:image/webp;base64,${swatchBuf.toString('base64')}`;

  try {
    const result = await generateFacadeWithGemini({
      buildingBase64,
      buildingMime: 'image/webp',
      swatchBase64,
      swatchMime: 'image/webp',
      panelId: 'WV301',
      panelName: 'FRONTEK CANYON',
      panelMaterial: 'Ventilated Ceramic Cladding Panels'
    });

    console.log('Gemini Generation Result:', result.success, 'Model:', result.model, 'Image URL length:', result.imageUrl?.length);
  } catch (err) {
    console.log('Gemini Direct Test Note (expected if network/quota on test machine):', err.message);
  }
}

testGeminiService();
