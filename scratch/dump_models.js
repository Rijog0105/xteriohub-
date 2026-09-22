const key = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';

async function listAllModels() {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}&pageSize=1000`);
  const data = await res.json();
  console.log('Total models:', data.models ? data.models.length : 0);
  for (const m of data.models || []) {
    console.log(m.name, '-> Methods:', (m.supportedGenerationMethods || []).join(', '));
  }
}

listAllModels();
