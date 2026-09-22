const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

const models = [
  'imagen-3.0-generate-002',
  'imagen-3.0-fast-generate-001',
  'imagen-4.0-generate-001',
  'imagen-4.0-fast-generate-001'
];

async function testImagen(m) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:predict?key=${key}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [
          {
            prompt: 'Photorealistic architectural photograph of a modern building with exterior walls fully clad in terracotta facade panels'
          }
        ],
        parameters: {
          sampleCount: 1,
          aspectRatio: '1:1'
        }
      })
    });
    console.log(m, 'Status:', res.status, res.statusText);
    const data = await res.json();
    if (!res.ok) {
      console.log(m, 'Error:', JSON.stringify(data).slice(0, 300));
    } else {
      console.log(m, 'SUCCESS! Keys:', Object.keys(data));
      if (data.predictions && data.predictions[0]) {
        const p = data.predictions[0];
        console.log(m, 'Prediction keys:', Object.keys(p));
        const bytes = p.bytesBase64Encoded || p.image?.imageBytes;
        if (bytes) {
          console.log(m, 'SUCCESS! Received Image Base64 len:', bytes.length);
        }
      }
    }
  } catch (e) {
    console.log(m, 'Err:', e.message);
  }
}

async function run() {
  for (const m of models) {
    await testImagen(m);
  }
}

run();
