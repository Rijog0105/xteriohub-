import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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'
});

async function testOpenAI() {
  try {
    console.log('Testing OpenAI models...');
    const models = await openai.models.list();
    console.log('OpenAI models count:', models.data.length);
    const imageModels = models.data.filter(m => m.id.includes('dall') || m.id.includes('image') || m.id.includes('gpt-4o'));
    console.log('Relevant models:', imageModels.map(m => m.id));
  } catch (err) {
    console.error('OpenAI test error:', err.message);
  }
}

testOpenAI();
