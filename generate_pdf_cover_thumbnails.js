import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

const brandDocs = {
  frontek: [
    {
      fileName: 'Frontek-Architectural-Catalogue-2026.pdf',
      filePath: '/assets/Brands/frontek/catalogue.pdf',
      title: 'FRONTEK ARCHITECTURAL CATALOGUE',
      subtitle: 'Double-Skin Cellular Terracotta Systems'
    }
  ],
  tempio: [
    {
      fileName: 'TEMPIO BASIC SKIN CATALOGUE.pdf',
      filePath: '/assets/Brands/tempio/documents/TEMPIO BASIC SKIN CATALOGUE.pdf',
      title: 'TEMPIO BASIC SKIN CATALOGUE',
      subtitle: 'Standard Ceramic Facade Cladding'
    },
    {
      fileName: 'TEMPIO BAGUETTES.pdf',
      filePath: '/assets/Brands/tempio/documents/TEMPIO BAGUETTES.pdf',
      title: 'TEMPIO BAGUETTES CATALOGUE',
      subtitle: 'Extruded Terracotta Solar Sunscreens'
    },
    {
      fileName: 'Catalogo-Rustikotta-skin-2023-LQ-3.pdf',
      filePath: '/assets/Brands/tempio/documents/Catalogo-Rustikotta-skin-2023-LQ-3.pdf',
      title: 'CATÁLOGO RUSTIKOTTA SKIN',
      subtitle: 'Spanish Terracotta Shingle Systems'
    }
  ],
  steni: [
    {
      fileName: 'STENI PRODUCT PRESENTATION.pdf',
      filePath: '/assets/Brands/steni/documents/STENI PRODUCT PRESENTATION.pdf',
      title: 'STENI PRODUCT PRESENTATION',
      subtitle: 'Norwegian Stone Composite Panels'
    }
  ],
  techlam: [
    {
      fileName: 'catalogo-techlam-fachadas-ventiladas-2025.pdf',
      filePath: '/assets/Brands/techlam/documents/catalogo-techlam-fachadas-ventiladas-2025.pdf',
      title: 'TECHLAM FACHADAS VENTILADAS 2025',
      subtitle: 'Ventilated Sintered Stone Facades'
    },
    {
      fileName: 'facades-techlam-2025-es--fr.pdf',
      filePath: '/assets/Brands/techlam/documents/facades-techlam-2025-es--fr.pdf',
      title: 'FACADES TECHLAM 2025 (ES / FR)',
      subtitle: 'International Facade Edition'
    },
    {
      fileName: 'techlam catolgue1.pdf',
      filePath: '/assets/Brands/techlam/documents/techlam catolgue1.pdf',
      title: 'TECHLAM MASTER CATALOGUE',
      subtitle: 'Complete Sintered Stone Porcelain Slabs'
    },
    {
      fileName: 'techlam collection brochure.pdf',
      filePath: '/assets/Brands/techlam/documents/techlam collection brochure.pdf',
      title: 'TECHLAM COLLECTION BROCHURE',
      subtitle: 'Swatches, Finishes &amp; Textures'
    }
  ]
};

const brandThemeColors = {
  frontek: { primary: '#0099E8', accent: '#38bdf8', bgFrom: '#0c121d', bgTo: '#04070d' },
  tempio: { primary: '#f97316', accent: '#fdba74', bgFrom: '#1c0c08', bgTo: '#070302' },
  steni: { primary: '#38bdf8', accent: '#7dd3fc', bgFrom: '#0b1624', bgTo: '#03070d' },
  techlam: { primary: '#e2e8f0', accent: '#94a3b8', bgFrom: '#141620', bgTo: '#050609' }
};

async function generatePdfThumbnails() {
  for (const [bId, docs] of Object.entries(brandDocs)) {
    const theme = brandThemeColors[bId];
    const logoPath = path.join(projectRoot, `public/assets/logo/${bId}.webp`);

    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      const outName = `${doc.fileName.replace(/\.pdf$/i, '')}-preview.png`;
      const outPath = path.join(projectRoot, `public/assets/Brands/${bId}/documents/${outName}`);
      doc.previewImage = `/assets/Brands/${bId}/documents/${outName}`;

      console.log(`Generating 1st page preview for: ${doc.title}`);

      const titleEsc = doc.title.replace(/&/g, '&amp;');
      const subEsc = doc.subtitle.replace(/&/g, '&amp;');

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${theme.bgFrom}" />
            <stop offset="100%" stop-color="${theme.bgTo}" />
          </linearGradient>

          <radialGradient id="spotlight" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="${theme.primary}" stop-opacity="0.35" />
            <stop offset="100%" stop-color="black" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Base Background -->
        <rect width="600" height="800" fill="url(#bgGrad)" />
        <rect width="600" height="800" fill="url(#spotlight)" />

        <!-- 3D Book Spine Shadow -->
        <rect x="0" y="0" width="28" height="800" fill="rgba(0,0,0,0.6)" />
        <line x1="28" y1="0" x2="28" y2="800" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

        <!-- Grid Lines -->
        <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
          <line x1="60" y1="0" x2="60" y2="800" />
          <line x1="540" y1="0" x2="540" y2="800" />
          <line x1="0" y1="90" x2="600" y2="90" />
          <line x1="0" y1="710" x2="600" y2="710" />
        </g>

        <!-- Top Accent Foil -->
        <rect x="0" y="0" width="600" height="6" fill="${theme.primary}" />

        <!-- Logo Container -->
        <rect x="190" y="110" width="220" height="75" rx="14" fill="rgba(8,9,14,0.92)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />

        <!-- PDF Badge -->
        <rect x="210" y="225" width="180" height="30" rx="15" fill="rgba(0,0,0,0.85)" stroke="${theme.primary}" stroke-width="1.5" />
        <text x="300" y="244" font-family="monospace" font-size="10" font-weight="bold" letter-spacing="3" fill="${theme.accent}" text-anchor="middle">PAGE 01 // PDF PREVIEW</text>

        <!-- Document Main Title -->
        <text x="300" y="340" font-family="Arial, sans-serif" font-size="32" font-weight="bold" letter-spacing="3" fill="#ffffff" text-anchor="middle">${bId.toUpperCase()}</text>
        
        <foreignObject x="60" y="375" width="480" height="120">
          <div xmlns="http://www.w3.org/1999/xhtml" style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; text-align: center; line-height: 1.3; text-transform: uppercase;">
            ${titleEsc}
          </div>
        </foreignObject>

        <text x="300" y="520" font-family="Arial, sans-serif" font-size="13" font-weight="500" letter-spacing="2" fill="${theme.accent}" text-anchor="middle">${subEsc}</text>

        <line x1="200" y1="565" x2="400" y2="565" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

        <!-- Edition Info -->
        <text x="300" y="620" font-family="monospace" font-size="12" letter-spacing="3" fill="rgba(255,255,255,0.7)" text-anchor="middle">OFFICIAL ARCHITECTURAL RESOURCE</text>
        <text x="300" y="750" font-family="monospace" font-size="10" letter-spacing="3" fill="rgba(255,255,255,0.4)" text-anchor="middle">XTERIOHUB PARTNER CATALOGUE</text>
      </svg>`;

      const outDir = path.dirname(outPath);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      let pipeline = sharp(Buffer.from(svg));

      if (fs.existsSync(logoPath)) {
        const resizedLogo = await sharp(logoPath)
          .resize({ width: 180, height: 50, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer();

        pipeline = pipeline.composite([{
          input: resizedLogo,
          top: 122,
          left: 210
        }]);
      }

      await pipeline.png().toFile(outPath);
      console.log(`Generated preview: ${outPath}`);
    }
  }

  // Save the manifest JSON so frontend can easily load all documents for each brand!
  const manifestPath = path.join(projectRoot, 'src/data/brandCataloguesData.js');
  const fileContent = `// Automatically generated PDF Catalogues manifest for each brand\n\nexport const BRAND_CATALOGUES = ${JSON.stringify(brandDocs, null, 2)};\n`;
  fs.writeFileSync(manifestPath, fileContent, 'utf8');
  console.log(`Saved manifest to: ${manifestPath}`);
}

generatePdfThumbnails().catch(console.error);
