const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

const endpointsToTest = [
  { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, name: 'gemini-2.5-flash v1beta' },
  { url: `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${key}`, name: 'gemini-2.5-flash v1' },
  { url: `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${key}`, name: 'imagen-3.0 predict' },
  { url: `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${key}`, name: 'imagen-3.0 generateImages' },
  { url: `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${key}`, name: 'imagen-4.0 predict' },
  { url: `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${key}`, name: 'imagen-4.0-fast predict' }
];

async function testEndpoint(ep) {
  try {
    const res = await fetch(ep.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Architectural photograph of a modern building facade covered in ceramic panels' }] }],
        instances: [{ prompt: 'Architectural photograph of a modern building facade covered in ceramic panels' }],
        parameters: { sampleCount: 1 }
      })
    });
    console.log(ep.name, 'Status:', res.status, res.statusText);
    const text = await res.text();
    console.log(ep.name, 'Body:', text.slice(0, 300));
  } catch (e) {
    console.log(ep.name, 'Err:', e.message);
  }
}

async function run() {
  for (const ep of endpointsToTest) {
    await testEndpoint(ep);
  }
}

run();
