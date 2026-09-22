import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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'
});

async function testAllModels() {
  const models = [
    'gpt-image-1',
    'gpt-image-1.5',
    'gpt-image-2',
    'gpt-image-1-mini',
    'chatgpt-image-latest',
    'dall-e-2'
  ];

  for (const model of models) {
    console.log(`\nTesting ${model}...`);
    try {
      const response = await openai.images.generate({
        model,
        prompt: "Photorealistic architectural visualization of a modern building with dark facade panels.",
        n: 1,
        size: model === 'dall-e-2' ? "1024x1024" : "1024x1024"
      });
      console.log(`SUCCESS for ${model}! Result:`, response.data?.[0]?.url || 'data returned');
      return model;
    } catch (err) {
      console.log(`Failed for ${model}:`, err.message);
    }
  }
}

testAllModels();
