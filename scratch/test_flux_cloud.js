import fs from 'fs';

async function testFluxCloud() {
  console.log('Testing FLUX 3D Architectural Pipeline from Cloud GPU...');
  const prompt = encodeURIComponent(
    'Ultra-photorealistic 8k architectural photograph of a modern luxury building with exterior walls completely cladded in FRONTEK CANYON terracotta ventilated panels. The cladding panels wrap accurately around 3D corners with crisp recessed joints and true perspective alignment. Preserve original window positions, balconies, sky, and natural daylight illumination. Architectural digest style, sharp focus.'
  );
  const negative = encodeURIComponent('flat 2D grid, wallpaper overlay, cartoon, blurry, low quality');
  const seed = Math.floor(Math.random() * 999999);
  const url = `https://image.pollinations.ai/prompt/${prompt}?negative=${negative}&width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

  console.log('Fetching from URL:', url);
  const res = await fetch(url);
  console.log('Response status:', res.status, 'Content-Type:', res.headers.get('content-type'));

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }

  const buf = await res.arrayBuffer();
  console.log('Received image buffer size:', buf.byteLength, 'bytes. SUCCESS!');
}

testFluxCloud().catch(err => console.error('Test error:', err.message));
