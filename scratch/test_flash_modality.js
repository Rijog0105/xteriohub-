const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

async function testFlashImageModality() {
  console.log('Testing gemini-2.5-flash with image modality...');
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: 'Generate an architectural photograph of a modern building with terracotta facade panels.' }]
          }
        ],
        generationConfig: {
          responseModalities: ['IMAGE', 'TEXT']
        }
      })
    });
    console.log('Status:', res.status, res.statusText);
    const data = await res.json();
    console.log('Response keys:', Object.keys(data));
    if (data.error) {
      console.log('Error:', JSON.stringify(data.error));
    } else {
      const parts = data?.candidates?.[0]?.content?.parts || [];
      console.log('Parts count:', parts.length);
      for (const p of parts) {
        if (p.inlineData) {
          console.log('FOUND INLINE IMAGE!', p.inlineData.mimeType, p.inlineData.data.slice(0, 50));
        }
        if (p.text) {
          console.log('Text part:', p.text.slice(0, 100));
        }
      }
    }
  } catch (e) {
    console.log('Exception:', e.message);
  }
}

testFlashImageModality();
