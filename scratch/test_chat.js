import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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'
});

async function testChat() {
  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hi" }]
    });
    console.log('Chat response:', res.choices[0].message.content);
  } catch (err) {
    console.log('Chat error:', err.message);
  }
}

testChat();
