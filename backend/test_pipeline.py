import io
import os
import sys
import numpy as np
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from backend.main import app, engine

client = TestClient(app)


def create_synthetic_building_mask_and_swatch(w: int = 512, h: int = 512):
    """Generates synthetic test building image, facade mask, and material swatch"""
    # 1. Building Image
    img = Image.new("RGB", (w, h), color=(135, 206, 235))  # Sky
    draw = ImageDraw.Draw(img)
    draw.rectangle([64, 128, w - 64, h - 32], fill=(160, 160, 160))  # Concrete wall
    draw.rectangle([100, 180, 200, 280], fill=(20, 25, 30))  # Windows
    draw.rectangle([w - 200, 180, w - 100, 280], fill=(20, 25, 30))
    draw.rectangle([100, 320, 200, 420], fill=(20, 25, 30))
    draw.rectangle([w - 200, 320, w - 100, 420], fill=(20, 25, 30))

    # 2. Façade Mask
    mask = Image.new("L", (w, h), color=0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rectangle([64, 128, w - 64, h - 32], fill=255)
    mask_draw.rectangle([100, 180, 200, 280], fill=0)
    mask_draw.rectangle([w - 200, 180, w - 100, 280], fill=0)
    mask_draw.rectangle([100, 320, 200, 420], fill=0)
    mask_draw.rectangle([w - 200, 320, w - 100, 420], fill=0)

    # 3. Collection Panel Swatch (e.g. Canyon Terracotta with texture grain)
    swatch = Image.new("RGB", (256, 256), color=(175, 80, 50))
    s_draw = ImageDraw.Draw(swatch)
    for y in range(0, 256, 16):
        s_draw.line([(0, y), (256, y)], fill=(150, 65, 40), width=1)

    return img, mask, swatch


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    print("[OK] Health check passed:", data, flush=True)


def test_texture_conditioned_inpainting_json():
    img, mask, swatch = create_synthetic_building_mask_and_swatch(512, 512)

    img_buf = io.BytesIO()
    img.save(img_buf, format="JPEG")
    img_buf.seek(0)

    mask_buf = io.BytesIO()
    mask.save(mask_buf, format="PNG")
    mask_buf.seek(0)

    swatch_buf = io.BytesIO()
    swatch.save(swatch_buf, format="JPEG")
    swatch_buf.seek(0)

    response = client.post(
        "/api/inpaint-facade?format=json",
        files={
            "building_image": ("building.jpg", img_buf, "image/jpeg"),
            "wall_mask": ("mask.png", mask_buf, "image/png"),
            "texture_image": ("swatch.jpg", swatch_buf, "image/jpeg"),
        },
        data={
            "panel_id": "WV301",
            "panel_name": "FRONTEK CANYON textured terracotta ventilated panels",
            "num_inference_steps": "5",
            "strength": "0.98",
        }
    )

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "imageUrl" in data
    assert data["panel_id"] == "WV301"
    print(f"[OK] Texture-conditioned inpainting test passed! Image length: {len(data['imageUrl'])}", flush=True)


def test_texture_conditioned_inpainting_binary():
    img, mask, swatch = create_synthetic_building_mask_and_swatch(512, 512)

    img_buf = io.BytesIO()
    img.save(img_buf, format="JPEG")
    img_buf.seek(0)

    mask_buf = io.BytesIO()
    mask.save(mask_buf, format="PNG")
    mask_buf.seek(0)

    swatch_buf = io.BytesIO()
    swatch.save(swatch_buf, format="JPEG")
    swatch_buf.seek(0)

    response = client.post(
        "/api/inpaint-facade?format=binary",
        files={
            "building_image": ("building.jpg", img_buf, "image/jpeg"),
            "wall_mask": ("mask.png", mask_buf, "image/png"),
            "texture_image": ("swatch.jpg", swatch_buf, "image/jpeg"),
        },
        data={
            "panel_id": "W313",
            "panel_name": "TEMPIO RUSTIKOTTA natural fired clay panels",
        }
    )

    assert response.status_code == 200
    assert response.headers["content-type"] == "image/jpeg"
    assert len(response.content) > 1000
    print(f"[OK] Binary texture inpainting test passed! Content length: {len(response.content)} bytes", flush=True)


if __name__ == "__main__":
    print("Running Texture-Conditioned Inpainting Test Suite...", flush=True)
    test_health()
    test_texture_conditioned_inpainting_json()
    test_texture_conditioned_inpainting_binary()
    print("\nALL REAL TEXTURE CONDITIONING TESTS PASSED SUCCESSFULLY!", flush=True)
