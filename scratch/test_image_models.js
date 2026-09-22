import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';
const OPENAI_API_KEY = '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';

async function testGeminiModels() {
  console.log('Testing Gemini models with image generation prompt...');
  const models = ['gemini-2.5-flash-image', 'gemini-3.1-flash-image', 'gemini-3-pro-image', 'gemini-3.1-flash-lite-image', 'gemini-2.5-flash'];
  
  for (const m of models) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Generate an architectural render of a modern luxury building with dark porcelain facade panels.' }]
          }]
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`[Gemini] ${m} OK:`, JSON.stringify(data).slice(0, 200));
      } else {
        console.log(`[Gemini] ${m} Status ${res.status}:`, data.error?.message?.slice(0, 150));
      }
    } catch (e) {
      console.log(`[Gemini] ${m} Fetch error:`, e.message);
    }
  }
}

testGeminiModels();
