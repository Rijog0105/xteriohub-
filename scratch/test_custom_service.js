import { generateCustomFacadeVisualization } from '../server/customFacadeModelService.js';

async function testService() {
  const sampleBuilding = '/assets/Brands/tempio/projects/yarilla-palace.webp';
  const sampleMaterial = '/assets/Brands/frontek/collections/textured/textured/pictures/canyon.webp';

  console.log('Testing custom facade model service with real assets...');
  const result = await generateCustomFacadeVisualization({
    buildingImage: sampleBuilding,
    materialImage: sampleMaterial,
    materialName: 'Canyon',
    brand: 'frontek',
    category: 'textured'
  });

  if (result.success && result.imageUrl) {
    console.log('SUCCESS! Generated image base64 length:', result.imageUrl.length);
    console.log('Model version:', result.model);
  } else {
    console.error('FAILED:', result.error);
  }
}

testService();
