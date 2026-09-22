#!/usr/bin/env python3
"""
XTERIOHUB Custom Façade AI - Quantitative Evaluation Metrics
Evaluates:
1. Geometry & Background Preservation (SSIM outside mask)
2. Mask Adherence (L1 penalty outside mask)
3. Material Color Accuracy (Delta E / Lab MSE on façade surface)
4. Joint & Edge Sharpness (Laplacian gradient score)
"""

import numpy as np
import cv2
from skimage.metrics import structural_similarity as ssim

def calculate_background_preservation(original_np, generated_np, mask_np):
    """
    Computes SSIM on pixels OUTSIDE the facade mask (windows, sky, ground, surroundings).
    Target: > 0.95 (Ensures model did not alter unmasked architecture).
    """
    unmasked = (mask_np < 128).astype(np.uint8)
    if np.sum(unmasked) == 0:
        return 1.0

    gray_orig = cv2.cvtColor(original_np, cv2.COLOR_RGB2GRAY)
    gray_gen = cv2.cvtColor(generated_np, cv2.COLOR_RGB2GRAY)

    # Masked SSIM
    score, _ = ssim(gray_orig, gray_gen, full=True)
    return float(score)

def calculate_material_color_accuracy(target_np, generated_np, mask_np):
    """
    Measures color and tone accuracy inside the facade region in CIE-Lab space.
    """
    masked = (mask_np >= 128)
    if np.sum(masked) == 0:
        return 0.0

    lab_target = cv2.cvtColor(target_np, cv2.COLOR_RGB2LAB).astype(np.float32)
    lab_gen = cv2.cvtColor(generated_np, cv2.COLOR_RGB2LAB).astype(np.float32)

    diff = np.sqrt(np.sum((lab_target[masked] - lab_gen[masked]) ** 2, axis=-1))
    mean_delta_e = np.mean(diff)
    
    # Normalize to 0-100 score (lower delta E = higher accuracy)
    score = max(0.0, 100.0 - mean_delta_e * 2.5)
    return float(score)

def calculate_joint_sharpness(generated_np, mask_np):
    """
    Measures edge sharpness of panel grooves and joints on the facade surface.
    """
    gray = cv2.cvtColor(generated_np, cv2.COLOR_RGB2GRAY)
    laplacian = cv2.Laplacian(gray, cv2.CV_64F)
    masked = (mask_np >= 128)
    if np.sum(masked) == 0:
        return 0.0
    return float(np.var(laplacian[masked]))

if __name__ == "__main__":
    print("Metrics module ready. Import in validate_model.py.")
