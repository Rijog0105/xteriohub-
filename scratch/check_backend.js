async function testHealth() {
  try {
    const res = await fetch('http://127.0.0.1:8000/health');
    const data = await res.json();
    console.log('Backend /health response:', data);
  } catch (e) {
    console.error('Backend connection error:', e.message);
  }
}
testHealth();
