import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function testViteToFastApiIntegration() {
  console.log('Testing full end-to-end integration via FastAPI backend...');

  const sampleBuildingPath = 'public/assets/Brands/tempio/projects/yarilla-palace.webp';
  const imgBuffer = fs.readFileSync(sampleBuildingPath);

  // Create a real PNG binary mask with sharp
  const maskBuffer = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  }).png().toBuffer();

  const formData = new FormData();
  formData.append('image', new Blob([imgBuffer], { type: 'image/webp' }), 'building.webp');
  formData.append('mask', new Blob([maskBuffer], { type: 'image/png' }), 'mask.png');
  formData.append('facade_type', 'FRONTEK CANYON textured porcelain ventilated facade panels');

  try {
    const res = await fetch('http://127.0.0.1:8000/api/inpaint-facade?format=json', {
      method: 'POST',
      body: formData
    });

    console.log('Response status:', res.status);
    const data = await res.json();
    if (data.success && data.imageUrl) {
      console.log('SUCCESS! AI Studio backend returned inpainted image.');
      console.log('Base64 image length:', data.imageUrl.length);
      console.log('Facade type:', data.facade_type);
      console.log('Model:', data.model);
    } else {
      console.error('Failed:', data);
    }
  } catch (err) {
    console.error('Integration test error:', err.message);
  }
}

testViteToFastApiIntegration();
