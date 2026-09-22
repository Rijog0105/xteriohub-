import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

async function testImageGen() {
  const models = [
    'gemini-2.5-flash-image',
    'gemini-3.1-flash-image',
    'gemini-3-pro-image',
    'gemini-3.1-flash-lite-image',
    'gemini-2.5-flash'
  ];

  for (const model of models) {
    console.log(`\nTesting ${model}...`);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: "Generate a realistic architectural render of a modern luxury building with dark granite facade panels." }]
            }],
            generationConfig: {
              responseModalities: ["IMAGE"]
            }
          })
        }
      );

      const status = res.status;
      console.log(`Status: ${status}`);
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (json.candidates) {
          const parts = json.candidates[0].content?.parts || [];
          console.log(`Success! Candidate parts:`, parts.map(p => Object.keys(p)));
          const img = parts.find(p => p.inlineData);
          if (img) {
            console.log(`Got image: ${img.inlineData.mimeType}, data length: ${img.inlineData.data?.length}`);
            return;
          }
        } else {
          console.log(`Error body:`, JSON.stringify(json).slice(0, 300));
        }
      } catch (e) {
        console.log(`Raw response:`, text.slice(0, 300));
      }
    } catch (err) {
      console.error(`Fetch failed for ${model}:`, err.message);
    }
  }
}

testImageGen();
