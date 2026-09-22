import io
import base64
from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from PIL import Image
from backend.engine import FacadeInpaintingEngine

app = FastAPI(
    title="XTERIOHUB Façade Inpainting API",
    description="Photorealistic Architectural Façade Cladding Inpainting Service with Real Collection Texture Conditioning",
    version="1.1.0"
)

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engine singleton
engine = FacadeInpaintingEngine()


@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "XTERIOHUB Façade Inpainting Backend",
        "device": engine.device,
        "dtype": str(engine.torch_dtype),
    }


@app.post("/api/inpaint-facade")
async def inpaint_facade(
    building_image: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    wall_mask: Optional[UploadFile] = File(None),
    mask: Optional[UploadFile] = File(None),
    texture_image: Optional[UploadFile] = File(None),
    panel_id: Optional[str] = Form(None),
    panel_name: Optional[str] = Form(None),
    facade_type: Optional[str] = Form(None),
    num_inference_steps: Optional[int] = Form(30),
    guidance_scale: Optional[float] = Form(7.5),
    strength: Optional[float] = Form(0.98),
    seed: Optional[int] = Form(-1),
    format: Optional[str] = Query("json")
):
    try:
        # Resolve building image file
        target_img_file = building_image or image
        if not target_img_file:
            raise HTTPException(status_code=400, detail="Missing required building image file (building_image or image).")

        img_bytes = await target_img_file.read()
        pil_image = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        # Resolve mask image file
        target_mask_file = wall_mask or mask
        if not target_mask_file:
            raise HTTPException(status_code=400, detail="Missing required mask image file (wall_mask or mask).")

        mask_bytes = await target_mask_file.read()
        pil_mask = Image.open(io.BytesIO(mask_bytes)).convert("L")

        # Resolve texture swatch image file
        pil_swatch = None
        if texture_image:
            tex_bytes = await texture_image.read()
            if len(tex_bytes) > 0:
                pil_swatch = Image.open(io.BytesIO(tex_bytes)).convert("RGB")

        # Resolve panel name / type
        resolved_name = panel_name or facade_type or "architectural cladding panel"

        # Run Real Texture-Conditioned Inpainting Engine
        output_image = engine.inpaint(
            image=pil_image,
            mask=pil_mask,
            swatch_image=pil_swatch,
            facade_type=resolved_name,
            panel_id=panel_id,
            num_inference_steps=num_inference_steps or 30,
            guidance_scale=guidance_scale or 7.5,
            strength=strength or 0.98,
            seed=seed if seed is not None else -1
        )

        # Save to buffer
        out_buffer = io.BytesIO()
        output_image.save(out_buffer, format="JPEG", quality=95)
        out_bytes = out_buffer.getvalue()

        if format == "binary":
            return Response(content=out_bytes, media_type="image/jpeg")

        # Return JSON with base64 Data URL
        base64_str = base64.b64encode(out_bytes).decode("utf-8")
        data_url = f"data:image/jpeg;base64,{base64_str}"

        return JSONResponse({
            "success": True,
            "imageUrl": data_url,
            "panel_id": panel_id,
            "panel_name": resolved_name,
            "device": engine.device,
            "model": "IP-Adapter / SDXL Façade Inpainting"
        })

    except Exception as err:
        print(f"[API Error /api/inpaint-facade]: {err}", flush=True)
        raise HTTPException(status_code=500, detail=str(err))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
