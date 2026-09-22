import os
import glob
import json
import pypdfium2 as pdfium
from PIL import Image

project_root = os.getcwd()
brands = ['frontek', 'tempio', 'steni', 'techlam']

brand_docs = {}

for b_id in brands:
    docs_dir = os.path.join(project_root, 'public', 'assets', 'Brands', b_id, 'documents')
    pdf_files = []
    
    if os.path.exists(docs_dir):
        for f in os.listdir(docs_dir):
            if f.lower().endswith('.pdf'):
                pdf_files.append(os.path.join(docs_dir, f))
    
    # Also check single catalogue.pdf
    single_cat = os.path.join(project_root, 'public', 'assets', 'Brands', b_id, 'catalogue.pdf')
    if os.path.exists(single_cat):
        pdf_files.append(single_cat)
        
    doc_list = []
    
    for pdf_path in pdf_files:
        filename = os.path.basename(pdf_path)
        base_name = os.path.splitext(filename)[0]
        out_img_name = f"{base_name}-page1.png"
        
        out_dir = os.path.dirname(pdf_path) if pdf_path.endswith('.pdf') else docs_dir
        out_img_path = os.path.join(docs_dir if 'documents' not in out_dir else out_dir, out_img_name)
        
        print(f"Extracting 1st page of PDF: {filename}...")
        try:
            pdf = pdfium.PdfDocument(pdf_path)
            page = pdf[0]
            # Render at 2x scale for high crisp clarity
            bitmap = page.render(scale=2)
            pil_image = bitmap.to_pil()
            pil_image.save(out_img_path)
            print(f"-> Saved 1st page image: {out_img_path}")
            
            web_img_path = f"/assets/Brands/{b_id}/documents/{out_img_name}"
            web_pdf_path = f"/assets/Brands/{b_id}/documents/{filename}" if 'documents' in pdf_path else f"/assets/Brands/{b_id}/catalogue.pdf"
            
            title_clean = base_name.replace('-', ' ').replace('_', ' ').upper()
            
            doc_list.append({
                "fileName": filename,
                "filePath": web_pdf_path,
                "title": title_clean,
                "subtitle": f"{b_id.upper()} Technical Specification",
                "previewImage": web_img_path
            })
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            
    brand_docs[b_id] = doc_list

manifest_path = os.path.join(project_root, 'src', 'data', 'brandCataloguesData.js')
with open(manifest_path, 'w', encoding='utf-8') as f:
    f.write(f"// Automatically generated PDF 1st Page Catalogues manifest for each brand\n\nexport const BRAND_CATALOGUES = {json.dumps(brand_docs, indent=2)};\n")

print(f"\nSuccessfully generated PDF 1st page previews and manifest at: {manifest_path}")
