import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'colab-gpu-proxy-middleware',
      configureServer(server) {
        server.middlewares.use('/api/generate', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          const targetUrl = req.headers['x-colab-url'] || 'https://portsmouth-councils-freebsd-identifier.trycloudflare.com';
          const endpoint = targetUrl.replace(/\/+$/, '') + '/generate';

          try {
            // Forward the stream directly to the Colab GPU server
            const proxyReq = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'content-type': req.headers['content-type'] || 'multipart/form-data'
              },
              body: req,
              duplex: 'half'
            });

            const data = await proxyReq.text();
            res.statusCode = proxyReq.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err) {
            console.error('[Vite Proxy] Colab GPU connection error:', err.message);
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              error: `Colab GPU server unreachable at "${targetUrl}". Please verify your Colab notebook is running and update the URL in "⚙️ GPU SERVER".`,
              details: err.message
            }));
          }
        });
      }
    }
  ]
});
