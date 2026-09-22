import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN || '');
console.log('Testing HfInference import...');
if (typeof hf.imageToImage === 'function') {
  console.log('hf.imageToImage is ready!');
} else {
  console.log('hf instance properties:', Object.keys(hf));
}
