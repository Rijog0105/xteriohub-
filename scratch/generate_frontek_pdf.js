import { PDFDocument, rgb } from 'pdf-lib';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createFrontekPDF() {
  console.log('Generating official Frontek Architectural Catalogue PDF...');

  const pdfDoc = await PDFDocument.create();

  // Page 1: Exact Cover Page matching catalogue-cover.png
  const coverPngBuffer = fs.readFileSync('public/assets/Brands/frontek/documents/catalogue-cover.png');
  const coverPng = await pdfDoc.embedPng(coverPngBuffer);
  
  const coverPage = pdfDoc.addPage([595.28, 841.89]); // A4 format
  coverPage.drawImage(coverPng, {
    x: 0,
    y: 0,
    width: 595.28,
    height: 841.89,
  });

  // Page 2: Architectural Systems & Super Plus System
  const systemImgJpeg = await sharp('public/assets/Brands/frontek/Systems/super-plus-system.webp')
    .jpeg({ quality: 95 })
    .toBuffer();
  const embeddedSystemImg = await pdfDoc.embedJpg(systemImgJpeg);

  const page2 = pdfDoc.addPage([595.28, 841.89]);
  page2.drawRectangle({
    x: 0, y: 0, width: 595.28, height: 841.89,
    color: rgb(0.04, 0.05, 0.07)
  });
  page2.drawText('FRONTEK ARCHITECTURAL SYSTEMS // SUPER PLUS SYSTEM', {
    x: 40, y: 790, size: 14, color: rgb(0, 0.6, 0.9)
  });
  page2.drawText('Self-anchoring hidden mechanical clip system for double-skin cellular terracotta panels.', {
    x: 40, y: 765, size: 10, color: rgb(0.8, 0.8, 0.8)
  });
  page2.drawImage(embeddedSystemImg, {
    x: 40, y: 250, width: 515.28, height: 480
  });
  page2.drawText('Specification: Spanish Extruded Terracotta / Vitrified at >1,200C / A1 Non-Combustible', {
    x: 40, y: 190, size: 10, color: rgb(0.7, 0.7, 0.7)
  });

  // Page 3: Project Showcase (Marriott & Nirlon Knowledge Park)
  const proj1Jpeg = await sharp('public/assets/Brands/frontek/projects/marriot-hotel-downtown.webp')
    .jpeg({ quality: 90 })
    .toBuffer();
  const proj2Jpeg = await sharp('public/assets/Brands/frontek/projects/nirlon-knowledge-park.webp')
    .jpeg({ quality: 90 })
    .toBuffer();

  const embeddedProj1 = await pdfDoc.embedJpg(proj1Jpeg);
  const embeddedProj2 = await pdfDoc.embedJpg(proj2Jpeg);

  const page3 = pdfDoc.addPage([595.28, 841.89]);
  page3.drawRectangle({
    x: 0, y: 0, width: 595.28, height: 841.89,
    color: rgb(0.04, 0.05, 0.07)
  });
  page3.drawText('GLOBAL LANDMARK PROJECTS', {
    x: 40, y: 790, size: 14, color: rgb(0, 0.6, 0.9)
  });
  page3.drawImage(embeddedProj1, {
    x: 40, y: 440, width: 515.28, height: 320
  });
  page3.drawText('Marriott Hotel Downtown - Double-Skin Terracotta Facade Envelope', {
    x: 40, y: 415, size: 9, color: rgb(0.8, 0.8, 0.8)
  });

  page3.drawImage(embeddedProj2, {
    x: 40, y: 70, width: 515.28, height: 320
  });
  page3.drawText('Nirlon Knowledge Park - Architectural Terracotta Cladding', {
    x: 40, y: 45, size: 9, color: rgb(0.8, 0.8, 0.8)
  });

  // Save PDF to destinations
  const pdfBytes = await pdfDoc.save();

  const dest1 = 'public/assets/Brands/frontek/documents/FRONTEK-Architectural-Catalogue-2026.pdf';
  const dest2 = 'public/assets/Brands/frontek/catalogue.pdf';

  fs.mkdirSync(path.dirname(dest1), { recursive: true });
  fs.writeFileSync(dest1, pdfBytes);
  fs.writeFileSync(dest2, pdfBytes);

  console.log(`Saved PDF to ${dest1} (${pdfBytes.length} bytes)`);
  console.log(`Saved PDF to ${dest2} (${pdfBytes.length} bytes)`);

  // Ensure preview image matches 1st page cover image exactly
  fs.copyFileSync('public/assets/Brands/frontek/documents/catalogue-cover.png', 'public/assets/Brands/frontek/documents/Frontek-Architectural-Catalogue-2026-preview.png');
  console.log('Updated preview image to match Page 1 cover image.');
}

createFrontekPDF().catch(console.error);
