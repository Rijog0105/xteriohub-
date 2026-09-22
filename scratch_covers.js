import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

const brandConfigs = {
  frontek: {
    name: 'FRONTEK',
    subtitle: 'DOUBLE-SKIN EXTRUDED TERRACOTTA',
    edition: '2026 TECHNICAL CATALOGUE',
    origin: 'SPAIN',
    primaryColor: '#0099E8',
    accentColor: '#38bdf8',
    bgFrom: '#0a0f19',
    bgTo: '#04060b',
    logoPath: path.join(projectRoot, 'public/assets/logo/frontek.webp'),
    outPath: path.join(projectRoot, 'public/assets/Brands/frontek/documents/catalogue-cover.png')
  },
  tempio: {
    name: 'TEMPIO',
    subtitle: 'CERAMIC SKINS &amp; BAGUETTES',
    edition: '2026 ARCHITECTURAL CATALOGUE',
    origin: 'VALENCIA, SPAIN',
    primaryColor: '#f97316',
    accentColor: '#fdba74',
    bgFrom: '#1c0c08',
    bgTo: '#070302',
    logoPath: path.join(projectRoot, 'public/assets/logo/tempio.webp'),
    outPath: path.join(projectRoot, 'public/assets/Brands/tempio/documents/catalogue-cover.png')
  },
  steni: {
    name: 'STENI',
    subtitle: 'NORWEGIAN STONE COMPOSITE',
    edition: '2026 SPECIFICATION GUIDE',
    origin: 'NORWAY',
    primaryColor: '#38bdf8',
    accentColor: '#7dd3fc',
    bgFrom: '#0b1624',
    bgTo: '#03070d',
    logoPath: path.join(projectRoot, 'public/assets/logo/steni.webp'),
    outPath: path.join(projectRoot, 'public/assets/Brands/steni/documents/catalogue-cover.png')
  },
  techlam: {
    name: 'TECHLAM',
    subtitle: 'SINTERED PORCELAIN SLABS',
    edition: '2026 FACADE COLLECTION',
    origin: 'SPAIN',
    primaryColor: '#e2e8f0',
    accentColor: '#94a3b8',
    bgFrom: '#141620',
    bgTo: '#050609',
    logoPath: path.join(projectRoot, 'public/assets/logo/techlam.webp'),
    outPath: path.join(projectRoot, 'public/assets/Brands/techlam/documents/catalogue-cover.png')
  }
};

async function generateCovers() {
  for (const [key, cfg] of Object.entries(brandConfigs)) {
    console.log(`Generating cover for ${cfg.name}...`);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${cfg.bgFrom}" />
            <stop offset="100%" stop-color="${cfg.bgTo}" />
          </linearGradient>

          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="50%" stop-color="${cfg.accentColor}" />
            <stop offset="100%" stop-color="#ffffff" />
          </linearGradient>

          <radialGradient id="spotlight" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stop-color="${cfg.primaryColor}" stop-opacity="0.4" />
            <stop offset="100%" stop-color="black" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Base Background -->
        <rect width="800" height="1000" fill="url(#bgGrad)" />
        <rect width="800" height="1000" fill="url(#spotlight)" />

        <!-- 3D Book Spine Effect -->
        <rect x="0" y="0" width="35" height="1000" fill="rgba(0,0,0,0.55)" />
        <line x1="35" y1="0" x2="35" y2="1000" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

        <!-- Architectural Grid Overlay -->
        <g stroke="rgba(255,255,255,0.08)" stroke-width="1.5">
          <line x1="90" y1="0" x2="90" y2="1000" />
          <line x1="710" y1="0" x2="710" y2="1000" />
          <line x1="0" y1="120" x2="800" y2="120" />
          <line x1="0" y1="880" x2="800" y2="880" />
          <circle cx="400" cy="500" r="260" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="6,6" />
        </g>

        <!-- Top Accent Foil Border -->
        <rect x="0" y="0" width="800" height="8" fill="${cfg.primaryColor}" />

        <!-- Logo Container Box -->
        <rect x="250" y="145" width="300" height="100" rx="20" fill="rgba(8,9,14,0.92)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />

        <!-- Book Header Badge -->
        <rect x="290" y="300" width="220" height="38" rx="19" fill="rgba(0,0,0,0.85)" stroke="${cfg.primaryColor}" stroke-width="1.5" />
        <text x="400" y="324" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="3" fill="${cfg.accentColor}" text-anchor="middle">OFFICIAL CATALOGUE</text>

        <!-- Main Title -->
        <text x="400" y="450" font-family="Arial, sans-serif" font-size="72" font-weight="bold" letter-spacing="10" fill="#ffffff" text-anchor="middle">${cfg.name}</text>
        <text x="400" y="500" font-family="Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="5" fill="${cfg.accentColor}" text-anchor="middle">${cfg.subtitle}</text>

        <!-- Golden Divider -->
        <line x1="260" y1="550" x2="540" y2="550" stroke="url(#accentGrad)" stroke-width="2" />

        <!-- Book Subtitle & Specification -->
        <text x="400" y="620" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#e2e8f0" text-anchor="middle">Technical Specification Book</text>
        <text x="400" y="660" font-family="monospace" font-size="14" letter-spacing="4" fill="rgba(255,255,255,0.8)" text-anchor="middle">${cfg.edition}</text>

        <!-- Origin Badge -->
        <g transform="translate(400, 780)">
          <rect x="-160" y="-20" width="320" height="42" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <text x="0" y="6" font-family="monospace" font-size="12" font-weight="bold" letter-spacing="3" fill="#ffffff" text-anchor="middle">ORIGIN: ${cfg.origin}</text>
        </g>

        <!-- Spine Book Footer -->
        <text x="400" y="940" font-family="monospace" font-size="11" letter-spacing="4" fill="rgba(255,255,255,0.5)" text-anchor="middle">XTERIOHUB // ARCHITECTURAL PARTNER PORTFOLIO</text>
      </svg>`;

    const outDir = path.dirname(cfg.outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    let pipeline = sharp(Buffer.from(svg));

    if (fs.existsSync(cfg.logoPath)) {
      const resizedLogo = await sharp(cfg.logoPath)
        .resize({ width: 240, height: 70, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer();

      pipeline = pipeline.composite([{
        input: resizedLogo,
        top: 160,
        left: 280
      }]);
    }

    await pipeline.png().toFile(cfg.outPath);
    console.log(`Successfully generated: ${cfg.outPath}`);
  }
}

generateCovers().catch(console.error);
