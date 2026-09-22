import fs from 'fs';

async function testPollinations() {
  console.log('Testing Pollinations AI Image Generation...');
  const prompt = encodeURIComponent(
    'Photorealistic architectural photograph of a modern luxury building with dark textured porcelain ventilated facade panels, large windows, blue sky, architectural lighting, highly detailed 8k render'
  );
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1024&height=768&model=flux&nologo=true&seed=42`;

  console.log('Fetching:', url);
  try {
    const res = await fetch(url);
    console.log('Status:', res.status, 'Content-Type:', res.headers.get('content-type'));
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      fs.writeFileSync('scratch/test_flux_render.jpg', Buffer.from(buffer));
      console.log('SUCCESS! Saved real generated image to scratch/test_flux_render.jpg, size:', buffer.byteLength);
    } else {
      console.log('Error status:', res.status);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testPollinations();
