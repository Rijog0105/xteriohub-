import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();

const pdfPath = path.join(projectRoot, 'public/assets/Brands/tempio/documents/TEMPIO BASIC SKIN CATALOGUE.pdf');
const outPath = path.join(projectRoot, 'public/assets/Brands/tempio/documents/basic-skin-preview.png');

async function testPdf() {
  if (fs.existsSync(pdfPath)) {
    console.log("Reading PDF:", pdfPath);
    try {
      await sharp(pdfPath, { page: 0 })
        .resize({ width: 800 })
        .png()
        .toFile(outPath);
      console.log("PDF 1st page preview created successfully:", outPath);
    } catch (e) {
      console.error("Sharp PDF render error:", e.message);
    }
  } else {
    console.log("PDF path does not exist:", pdfPath);
  }
}

testPdf();
