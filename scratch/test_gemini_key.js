const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

const models = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'imagen-3.0-generate-002',
  'gemini-2.5-flash-image'
];

async function testModel(m) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Respond with OK' }] }]
      })
    });
    console.log(m, 'Status:', res.status, res.statusText);
    const data = await res.json();
    if (!res.ok) {
      console.log(m, 'Error details:', JSON.stringify(data).slice(0, 300));
    } else {
      console.log(m, 'Success! Candidate text:', data?.candidates?.[0]?.content?.parts?.[0]?.text?.slice(0, 50));
    }
  } catch (e) {
    console.log(m, 'Catch error:', e.message);
  }
}

async function run() {
  for (const m of models) {
    await testModel(m);
  }
}

run();
