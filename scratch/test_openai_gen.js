import OpenAI from 'openai';
import fs from 'fs';

const openai = new OpenAI({
  apiKey: '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'
});

async function testImageGeneration() {
  try {
    console.log('Testing dall-e-3 image generation...');
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Photorealistic architectural visualization of a modern commercial building with premium dark porcelain ventilated facade panels.",
      n: 1,
      size: "1024x1024",
      quality: "standard"
    });
    console.log('Success! Generated image URL:', response.data[0].url);
  } catch (err) {
    console.error('dall-e-3 error:', err.message);
  }
}

testImageGeneration();
