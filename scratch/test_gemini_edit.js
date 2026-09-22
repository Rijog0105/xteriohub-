const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

// 1x1 dummy PNG
const dummyBuilding = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const dummyPanel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

async function testGeminiImageEditing(modelName) {
  console.log(`Testing model: ${modelName}`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
  
  const payload = {
    contents: [
      {
        parts: [
          { inlineData: { mimeType: 'image/png', data: dummyBuilding } },
          { inlineData: { mimeType: 'image/png', data: dummyPanel } },
          {
            text: 'Generate the building in the first image with its external surface and walls fully covered with the material panel shown in the second image. Keep the building structure, windows, and surrounding background identical.'
          }
        ]
      }
    ]
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`Model ${modelName} -> Status:`, res.status, res.statusText);
    const data = await res.json();
    if (!res.ok) {
      console.log(`Model ${modelName} error:`, JSON.stringify(data).slice(0, 250));
    } else {
      console.log(`Model ${modelName} response keys:`, Object.keys(data));
      const parts = data?.candidates?.[0]?.content?.parts || [];
      console.log(`Model ${modelName} parts count:`, parts.length);
      for (const p of parts) {
        if (p.inlineData) {
          console.log(`--> SUCCESS! Received image (${p.inlineData.mimeType}) len: ${p.inlineData.data?.length}`);
        }
        if (p.text) {
          console.log(`--> Text response: ${p.text.slice(0, 100)}`);
        }
      }
    }
  } catch (err) {
    console.log(`Model ${modelName} exception:`, err.message);
  }
}

async function run() {
  const modelsToTest = [
    'gemini-2.5-flash-image',
    'gemini-3.1-flash-image',
    'gemini-3-pro-image',
    'gemini-2.5-flash',
    'gemini-3.6-flash'
  ];
  for (const m of modelsToTest) {
    await testGeminiImageEditing(m);
    await new Promise(r => setTimeout(r, 1000));
  }
}

run();
