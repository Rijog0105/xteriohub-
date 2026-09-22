/**
 * facadeVisualizationService.js — Real-Time 1:1 Exact Material Facade Live Colab GPU Service
 * Endpoint: https://portsmouth-councils-freebsd-identifier.trycloudflare.com/generate
 */

const DEFAULT_GPU_URL = 'https://portsmouth-councils-freebsd-identifier.trycloudflare.com';

export function getGpuBackendUrl() {
  return localStorage.getItem('xteriohub_gpu_url') || DEFAULT_GPU_URL;
}

export function setGpuBackendUrl(url) {
  if (!url) return;
  const cleanUrl = url.trim().replace(/\/+$/, '');
  localStorage.setItem('xteriohub_gpu_url', cleanUrl);
  return cleanUrl;
}

export async function testGpuConnection(customUrl = null) {
  const targetUrl = (customUrl || getGpuBackendUrl()).trim().replace(/\/+$/, '');
  
  try {
    const probeUrl = targetUrl + '/openapi.json';
    const res = await fetch(probeUrl, { method: 'GET' });
    if (res.ok) {
      return { ok: true, status: res.status, message: 'Connected to Colab FastAPI!' };
    }
  } catch (err) {
    // Probe failed
  }

  return { 
    ok: false, 
    error: `Could not reach "${targetUrl}". Please confirm your Colab notebook / Cloudflare cell is active.` 
  };
}

async function imageInputToBlob(input) {
  if (!input) return null;

  if (input instanceof Blob || input instanceof File) {
    return input;
  }

  if (typeof input === 'string' && input.startsWith('data:')) {
    const res = await fetch(input);
    return await res.blob();
  }

  if (typeof input === 'string') {
    const res = await fetch(input);
    return await res.blob();
  }

  return null;
}

/**
 * Sends building photo, rich panel traits & swatch texture directly to live Colab GPU
 */
export async function generateFacadeVisualization({
  buildingImage,
  material,
  customBackendUrl = null
}) {
  if (!buildingImage) {
    throw new Error('Please upload or select a building photograph first.');
  }

  if (!material) {
    throw new Error('Please select a panel from the collection.');
  }

  const swatchSrc = material.imageUrl || material.image || material.thumbnail || material.src;
  if (!swatchSrc) {
    throw new Error('Selected panel is missing a valid texture swatch image.');
  }

  const [buildingBlob, swatchBlob] = await Promise.all([
    imageInputToBlob(buildingImage),
    imageInputToBlob(swatchSrc)
  ]);

  if (!buildingBlob) {
    throw new Error('Failed to process the building photograph.');
  }

  if (!swatchBlob) {
    throw new Error('Failed to process the panel swatch texture image.');
  }

  const brand = (material.brand || material.manufacturer || 'Frontek');
  const panelName = material.name || material.title || 'Architectural Facade Panel';
  const panelId = material.id || material.code || material.key || '';
  const panelMaterial = material.material || material.category || `${brand} Exterior Wall Cladding`;
  const panelColor = material.color || material.colorName || material.shade || material.name || 'Textured';
  const panelFinish = material.finish || material.surface || 'Matte';

  const formData = new FormData();
  // 1. Pass base building photo (Locks 3D architecture, perspective, and lighting)
  formData.append('building_image', buildingBlob, 'building.jpg');
  formData.append('image', buildingBlob, 'building.jpg');
  
  // 2. Extract and attach actual panel swatch texture image file
  formData.append('swatch_image', swatchBlob, 'swatch.jpg');
  formData.append('texture_image', swatchBlob, 'swatch.jpg');
  formData.append('panel_texture', swatchBlob, 'swatch.jpg');

  // 3. Pass panel identifiers & metadata
  formData.append('brand_name', brand);
  formData.append('panel_id', panelId);
  formData.append('panel_name', panelName);
  formData.append('panel_material', panelMaterial);
  formData.append('panel_color', panelColor);
  formData.append('panel_finish', panelFinish);
  formData.append('facade_type', panelName);

  const activeColabUrl = (customBackendUrl || getGpuBackendUrl()).trim().replace(/\/+$/, '');

  let response;
  try {
    response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'x-colab-url': activeColabUrl
      },
      body: formData
    });
  } catch (err) {
    throw new Error(
      `Network error connecting to local dev proxy. Please check if Vite is running.`
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (jsonErr) {
    throw new Error(`Server returned unexpected non-JSON response (${response.status})`);
  }

  if (!response.ok) {
    const errorMsg = data.error || data.detail || (typeof data === 'string' ? data : null) || `GPU Server Error (${response.status})`;
    throw new Error(errorMsg);
  }

  const generatedUrl = data.imageUrl || data.image_url || data.result || data.url || data.image;

  if (!generatedUrl) {
    throw new Error(data.error || 'GPU server returned no image output.');
  }

  return {
    success: true,
    visualizationUrl: generatedUrl,
    materialApplied: material,
    model: 'Real-Time 1:1 Exact Material Facade Synthesis',
    timestamp: new Date().toISOString()
  };
}

/**
 * Download visualization image
 */
export function downloadVisualization(dataUrl, filename = 'xteriohub-facade-3d-render.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
