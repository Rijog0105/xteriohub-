const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

// Dummy 1x1 base64
const dummyBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function testGeminiImg(model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inlineData: { mimeType: 'image/png', data: dummyBase64 } },
              { inlineData: { mimeType: 'image/png', data: dummyBase64 } },
              { text: 'Generate a new architectural photograph of this building with its exterior walls fully clad in the provided material panel.' }
            ]
          }
        ]
      })
    });
    console.log(model, 'Status:', res.status, res.statusText);
    const data = await res.json();
    if (!res.ok) {
      console.log(model, 'Error:', JSON.stringify(data).slice(0, 300));
    } else {
      console.log(model, 'SUCCESS!', Object.keys(data));
      const parts = data?.candidates?.[0]?.content?.parts || [];
      console.log(model, 'Parts count:', parts.length);
      for (const p of parts) {
        if (p.inlineData) {
          console.log(model, 'SUCCESS! Received Image Base64 len:', p.inlineData.data?.length);
        }
        if (p.text) {
          console.log(model, 'Text output:', p.text.slice(0, 100));
        }
      }
    }
  } catch (e) {
    console.log(model, 'Err:', e.message);
  }
}

testGeminiImg('gemini-2.5-flash-image');
