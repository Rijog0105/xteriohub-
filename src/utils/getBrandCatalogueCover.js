// Custom High-Res Architectural Catalogue Book Cover Graphic Generator

export function getBrandCatalogueCoverSvg(brandId) {
  const bId = (brandId || '').toLowerCase();

  const brandConfigs = {
    frontek: {
      title: "FRONTEK",
      subtitle: "DOUBLE-SKIN EXTRUDED TERRACOTTA",
      edition: "2026 TECHNICAL SPECIFICATION",
      origin: "SPAIN",
      primaryColor: "#0099E8",
      accentColor: "#38bdf8",
      bgGradientFrom: "#0d131f",
      bgGradientTo: "#04070d",
      patternType: "honeycomb"
    },
    tempio: {
      title: "TEMPIO",
      subtitle: "CERAMIC SKINS & BAGUETTES",
      edition: "2026 ARCHITECTURAL CATALOGUE",
      origin: "VALENCIA, SPAIN",
      primaryColor: "#f97316",
      accentColor: "#fdba74",
      bgGradientFrom: "#22110c",
      bgGradientTo: "#0a0403",
      patternType: "louvers"
    },
    steni: {
      title: "STENI",
      subtitle: "NORWEGIAN STONE COMPOSITE",
      edition: "2026 SPECIFICATION GUIDE",
      origin: "NORWAY",
      primaryColor: "#38bdf8",
      accentColor: "#7dd3fc",
      bgGradientFrom: "#0e1a29",
      bgGradientTo: "#040a12",
      patternType: "stone"
    },
    techlam: {
      title: "TECHLAM",
      subtitle: "SINTERED PORCELAIN SLABS",
      edition: "2026 FACADE COLLECTION",
      origin: "SPAIN",
      primaryColor: "#e2e8f0",
      accentColor: "#94a3b8",
      bgGradientFrom: "#181922",
      bgGradientTo: "#07080c",
      patternType: "marble"
    }
  };

  const config = brandConfigs[bId] || brandConfigs.frontek;

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
      <defs>
        <linearGradient id="bgGrad_${bId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${config.bgGradientFrom}" />
          <stop offset="100%" stop-color="${config.bgGradientTo}" />
        </linearGradient>

        <linearGradient id="goldGrad_${bId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="50%" stop-color="${config.accentColor}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>

        <linearGradient id="glowLine_${bId}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="transparent" />
          <stop offset="50%" stop-color="${config.primaryColor}" />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>

        <radialGradient id="spotlight_${bId}" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="${config.primaryColor}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="transparent" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Main Background -->
      <rect width="800" height="1000" fill="url(#bgGrad_${bId})" />
      <rect width="800" height="1000" fill="url(#spotlight_${bId})" />

      <!-- Architectural Grid Lines Overlay -->
      <g stroke="rgba(255,255,255,0.08)" stroke-width="1.5">
        <line x1="80" y1="0" x2="80" y2="1000" />
        <line x1="720" y1="0" x2="720" y2="1000" />
        <line x1="0" y1="120" x2="800" y2="120" />
        <line x1="0" y1="880" x2="800" y2="880" />
        <circle cx="400" cy="500" r="280" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="8,8" />
      </g>

      <!-- Decorative Holographic Top Highlight -->
      <rect x="0" y="0" width="800" height="6" fill="url(#glowLine_${bId})" />

      <!-- Catalogue Header Monogram / Logo Badge -->
      <rect x="320" y="170" width="160" height="46" rx="23" fill="rgba(0,0,0,0.85)" stroke="${config.primaryColor}" stroke-width="1.5" />
      <text x="400" y="199" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="3" fill="${config.accentColor}" text-anchor="middle">OFFICIAL</text>

      <!-- Main Title -->
      <text x="400" y="370" font-family="'Inter', system-ui, sans-serif" font-size="76" font-weight="300" letter-spacing="12" fill="#ffffff" text-anchor="middle">${config.title}</text>
      <text x="400" y="430" font-family="'Inter', system-ui, sans-serif" font-size="16" font-weight="600" letter-spacing="6" fill="${config.accentColor}" text-anchor="middle">${config.subtitle}</text>

      <!-- Center Divider Line -->
      <line x1="280" y1="490" x2="520" y2="490" stroke="url(#goldGrad_${bId})" stroke-width="2" />

      <!-- Architectural Book Details -->
      <text x="400" y="570" font-family="Georgia, serif" font-style="italic" font-size="30" font-weight="300" letter-spacing="2" fill="#e2e8f0" text-anchor="middle">Technical Specification Catalogue</text>
      <text x="400" y="610" font-family="monospace" font-size="14" font-weight="400" letter-spacing="4" fill="rgba(255,255,255,0.8)" text-anchor="middle">${config.edition}</text>

      <!-- Origin Stamp -->
      <g transform="translate(400, 770)">
        <rect x="-150" y="-20" width="300" height="42" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        <text x="0" y="6" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="3" fill="#ffffff" text-anchor="middle">MANUFACTURING: ${config.origin}</text>
      </g>

      <!-- Bottom Book Spine & Footer -->
      <text x="400" y="930" font-family="monospace" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.5)" text-anchor="middle">XTERIOHUB // ARCHITECTURAL PARTNER EDITIONS</text>
    </svg>`;

  try {
    const base64 = typeof window !== 'undefined' 
      ? window.btoa(unescape(encodeURIComponent(svgString)))
      : Buffer.from(svgString).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  } catch (e) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  }
}
