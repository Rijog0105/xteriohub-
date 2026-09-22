const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

const testModels = [
  'gemini-2.5-flash',
  'gemini-3.6-flash',
  'gemini-3.7-flash',
  'gemini-3-flash-preview',
  'gemini-3.5-flash',
  'gemini-3.1-flash-lite'
];

// Sample 1x1 transparent PNG base64 to test multimodal input
const dummyBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

async function testMultimodal(m) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inlineData: { mimeType: 'image/png', data: dummyBase64 } },
              { text: 'Describe this building photo and detail how to apply cladding panels.' }
            ]
          }
        ]
      })
    });
    console.log(m, 'Status:', res.status);
    const data = await res.json();
    if (!res.ok) {
      console.log(m, 'Error:', JSON.stringify(data).slice(0, 200));
    } else {
      console.log(m, 'Success! Text len:', data?.candidates?.[0]?.content?.parts?.[0]?.text?.length);
    }
  } catch (e) {
    console.log(m, 'Exception:', e.message);
  }
}

async function run() {
  for (const m of testModels) {
    await testMultimodal(m);
  }
}

run();
