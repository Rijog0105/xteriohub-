import { GoogleGenAI } from '@google/genai';

const apiKey = 'AQ.Ab8RN6LZ8_M8TPXR1SBXNENIhVwR0s4OYJf77D_apQUTRLYCvQ';
console.log('Testing GoogleGenAI initialization with key prefix:', apiKey.slice(0, 8));

try {
  const ai = new GoogleGenAI({ apiKey });
  console.log('GoogleGenAI instance successfully initialized!');
} catch (err) {
  console.error('Initialization error:', err);
}
