const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

const imagenEndpoints = [
  { model: 'imagen-3.0-generate-002', method: 'predict' },
  { model: 'imagen-3.0-fast-generate-001', method: 'predict' },
  { model: 'imagen-4.0-fast-generate-001', method: 'predict' },
  { model: 'imagen-3.0-generate-002', method: 'generateImages' },
  { model: 'imagen-3.0-fast-generate-001', method: 'generateImages' }
];

async function testImagen(item) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${item.model}:${item.method}?key=${key}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: 'A modern architectural facade with terracotta panels' }],
        parameters: { sampleCount: 1 }
      })
    });
    console.log(item.model, item.method, 'Status:', res.status, res.statusText);
    const data = await res.json();
    if (!res.ok) {
      console.log('Error:', JSON.stringify(data).slice(0, 250));
    } else {
      console.log('SUCCESS!', Object.keys(data));
      if (data.predictions) {
        console.log('Predictions count:', data.predictions.length);
      }
    }
  } catch (e) {
    console.log('Exception:', e.message);
  }
}

async function run() {
  for (const item of imagenEndpoints) {
    await testImagen(item);
  }
}

run();
