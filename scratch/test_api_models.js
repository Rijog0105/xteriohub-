const API_KEY = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await res.json();
    console.log('Available models:');
    if (data.models) {
      data.models.forEach(m => {
        if (m.name.includes('image') || m.name.includes('flash') || m.name.includes('imagen') || m.supportedGenerationMethods?.includes('generateImages')) {
          console.log(m.name, m.supportedGenerationMethods);
        }
      });
      console.log('Total models:', data.models.length);
    } else {
      console.log('Response:', data);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

listModels();
