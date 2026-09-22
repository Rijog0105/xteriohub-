const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

async function testImagen4() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${key}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: 'Modern building exterior with terracotta facade panels' }],
        parameters: { sampleCount: 1 }
      })
    });
    console.log('Status:', res.status, res.statusText);
    const data = await res.json();
    if (!res.ok) {
      console.log('Error:', JSON.stringify(data).slice(0, 300));
    } else {
      console.log('SUCCESS!', Object.keys(data));
    }
  } catch (e) {
    console.log('Exception:', e.message);
  }
}

testImagen4();
