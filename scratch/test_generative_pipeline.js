import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';
const OPENAI_API_KEY = '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';

async function testAllGenerativeEngines() {
  console.log('--- Testing Generative Image Models ---');
  
  // 1. Test Gemini models (multimodal structure & color analysis)
  const geminiModels = [
    'gemini-2.5-flash',
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-2.5-flash-image',
    'gemini-3.1-flash-image',
    'gemini-3-pro-image'
  ];

  for (const m of geminiModels) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: "Analyze the building architectural geometry and generate a photorealistic visualization with dark textured facade panels." }]
          }]
        })
      });
      const data = await res.json();
      console.log(`[Gemini ${m}] Status: ${res.status}`);
      if (res.ok) {
        const parts = data.candidates?.[0]?.content?.parts || [];
        const hasImg = parts.some(p => p.inlineData);
        console.log(`  Output parts count: ${parts.length}, Has Image: ${hasImg}`);
        if (!hasImg && parts[0]?.text) {
          console.log(`  Text output sample: ${parts[0].text.slice(0, 100)}...`);
        }
      } else {
        console.log(`  Error: ${data.error?.message?.slice(0, 120)}`);
      }
    } catch (e) {
      console.log(`[Gemini ${m}] Exception: ${e.message}`);
    }
  }

  // 2. Test Imagen on Gemini API
  const imagenModels = ['imagen-4.0-generate-001', 'imagen-3.0-generate-002'];
  for (const m of imagenModels) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:predict?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt: "Photorealistic architectural visualization of a modern luxury building with dark porcelain facade cladding." }],
          parameters: { sampleCount: 1 }
        })
      });
      const data = await res.json();
      console.log(`[Imagen ${m}] Status: ${res.status}`);
      if (res.ok) {
        console.log(`  Output:`, Object.keys(data));
      } else {
        console.log(`  Error: ${data.error?.message?.slice(0, 120)}`);
      }
    } catch (e) {
      console.log(`[Imagen ${m}] Exception: ${e.message}`);
    }
  }
}

testAllGenerativeEngines();
