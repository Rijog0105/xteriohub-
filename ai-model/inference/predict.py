#!/usr/bin/env python3
"""
XTERIOHUB Custom Façade AI - CLI Inference Tool
Usage:
  python predict.py --building <path> --material <path> --mask <path> --output <path>
"""

import argparse
import numpy as np
from PIL import Image

def run_inference(building_path, material_path, mask_path, output_path):
    print(f"Loading building image from {building_path}...")
    b_img = Image.open(building_path).convert("RGB")
    m_img = Image.open(material_path).convert("RGB")

    if mask_path:
        mask_img = Image.open(mask_path).convert("L")
    else:
        mask_img = Image.new("L", b_img.size, 255)

    b_np = np.array(b_img)
    m_np = np.array(m_img.resize((240, 140)))
    mask_np = np.array(mask_img.resize(b_img.size))

    h, w, _ = b_np.shape
    tw, th = 240, 140
    num_x = int(np.ceil(w / tw)) + 1
    num_y = int(np.ceil(h / th)) + 1
    tiled = np.tile(m_np, (num_y, num_x, 1))[:h, :w]

    gray = (0.299 * b_np[:, :, 0] + 0.587 * b_np[:, :, 1] + 0.114 * b_np[:, :, 2]) / 135.0
    shade = np.clip(np.power(gray, 0.95), 0.35, 1.45)[:, :, np.newaxis]
    shaded_mat = np.clip(tiled.astype(np.float32) * shade, 0, 255).astype(np.uint8)

    mask_f = (mask_np.astype(np.float32) / 255.0)[:, :, np.newaxis]
    result_np = (b_np.astype(np.float32) * (1.0 - mask_f) + shaded_mat.astype(np.float32) * mask_f).astype(np.uint8)

    result_pil = Image.fromarray(result_np)
    result_pil.save(output_path, quality=95)
    print(f"✓ Output visualization saved successfully to {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="XTERIOHUB Façade AI Predict CLI")
    parser.add_argument("--building", required=True, help="Path to input building photo")
    parser.add_argument("--material", required=True, help="Path to XTERIOHUB material swatch")
    parser.add_argument("--mask", default=None, help="Path to façade mask (optional)")
    parser.add_argument("--output", default="output_render.jpg", help="Path to save output render")
    args = parser.parse_args()

    run_inference(args.building, args.material, args.mask, args.output)
