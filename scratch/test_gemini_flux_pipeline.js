import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

async function analyzeBuildingAndGenerate(buildingPath, materialName, brand) {
  console.log(`Analyzing building with Gemini Vision: ${buildingPath}`);
  
  // 1. Read building image as base64
  const bBuffer = fs.readFileSync(buildingPath);
  const bBase64 = bBuffer.toString('base64');

  // 2. Ask Gemini Vision to describe the architectural structure & environment
  let structurePrompt = "A modern multi-story architectural building with contemporary structure";
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: bBase64 } },
            { text: "Describe this building's precise architectural structure, geometry, floors, balconies, columns, perspective angle, and surrounding environment in 2-3 concise sentences suitable for architectural image generation." }
          ]
        }]
      })
    });
    const data = await res.json();
    if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      structurePrompt = data.candidates[0].content.parts[0].text.trim().replace(/\n/g, ' ');
      console.log('Gemini Architectural Vision Analysis:', structurePrompt);
    }
  } catch (e) {
    console.warn('Gemini vision fallback:', e.message);
  }

  // 3. Construct master architectural generation prompt
  const masterPrompt = `Photorealistic architectural photograph of the completed building: ${structurePrompt}. The exterior walls and facade surfaces are completely clad with high-end ${brand.toUpperCase()} ${materialName} architectural panels with clean subtle installation joints, finished modern windows with glass reflections, crisp sunlight and realistic architectural shadows, 8k resolution, professional architectural photography, award-winning building facade`;

  console.log('\nMaster Generation Prompt:', masterPrompt);

  // 4. Generate new image with Flux AI
  const encodedPrompt = encodeURIComponent(masterPrompt);
  const seed = Math.floor(Math.random() * 1000000);
  const fluxUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=768&model=flux&nologo=true&seed=${seed}`;

  console.log('\nCalling Flux AI Generation Engine...');
  const fluxRes = await fetch(fluxUrl);
  if (fluxRes.ok) {
    const arrayBuf = await fluxRes.arrayBuffer();
    fs.writeFileSync('scratch/test_ai_generated_render.jpg', Buffer.from(arrayBuf));
    console.log('SUCCESS! Completely new AI-generated architectural photograph saved to scratch/test_ai_generated_render.jpg');
    console.log('File size:', arrayBuf.byteLength, 'bytes');
  } else {
    console.error('Flux generation failed with status:', fluxRes.status);
  }
}

const sampleBuilding = 'public/assets/Brands/tempio/projects/yarilla-palace.webp';
analyzeBuildingAndGenerate(sampleBuilding, 'Canyon Terracotta Cladding', 'frontek');
