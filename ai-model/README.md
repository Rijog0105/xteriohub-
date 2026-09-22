# XTERIOHUB Custom Façade AI
### Specialized Image-to-Image Architectural Façade Replacement System

---

## 1. System Overview

The **XTERIOHUB Custom Façade AI** is a specialized computer vision and image-to-image diffusion architecture designed specifically for architectural cladding and ventilated façade material replacement.

Rather than relying on generic text prompts, this model is conditioned on **3 authoritative inputs**:
1. **Input A (Building Image)**: Original photograph preserving architecture, perspective, windows, doors, and surroundings.
2. **Input B (XTERIOHUB Material Swatch)**: Exact physical material reference image across **Frontek, Techlam, Tempio, and Steni**.
3. **Input C (Façade Mask)**: Authoritative binary mask isolating only the structural wall areas to be clad.

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ Original Building Photo │  +  │ Material Texture Swatch │  +  │   Façade Binary Mask    │
└────────────┬────────────┘     └────────────┬────────────┘     └────────────┬────────────┘
             │                               │                               │
             └───────────────────────┬───────┴───────────────────────────────┘
                                     ▼
                      ┌─────────────────────────────┐
                      │  XTERIOHUB Custom Façade AI │
                      │  (SDXL Inpainting + LoRA)   │
                      └──────────────┬──────────────┘
                                     ▼
                      ┌─────────────────────────────┐
                      │ 4K Architectural Render with│
                      │ Real Panels, Joints, Depth  │
                      └─────────────────────────────┘
```

---

## 2. Directory Structure

```
ai-model/
├── configs/
│   ├── model_config.yaml          # Hyperparameters, resolutions, LoRA ranks, loss weights
│   └── hardware_requirements.md   # Cloud GPU pricing, VRAM, and instance setup
├── dataset/
│   ├── buildings/                 # Base architectural photographs
│   ├── materials/                 # XTERIOHUB panel textures (Frontek/Techlam/Tempio/Steni)
│   ├── masks/                     # Binary masks isolating facade walls
│   ├── target_renders/            # Ground-truth panelized renderings
│   └── metadata/                  # training_dataset.json, train/val manifests
├── preprocessing/
│   ├── generate_synthetic_pairs.py# Synthetic dataset generation engine
│   └── prepare_dataset.py         # Validation and 85/15 train/val split utility
├── training/
│   ├── train_lora.py              # Cloud GPU training script with Masked Weighted Loss
│   └── train_colab.ipynb          # 1-Click Google Colab interactive notebook
├── validation/
│   ├── metrics.py                 # SSIM, Mask Adherence, Color Delta E, Edge Sharpness
│   ├── validate_model.py          # Benchmark test suite on unseen validation pairs
│   └── evaluation_app.html        # Interactive human review & 1-5 scoring dashboard
├── inference/
│   ├── inference_api.py           # Production FastAPI server for RunPod / Cloud hosting
│   ├── predict.py                 # CLI batch prediction tool
│   └── export_model.py            # Model exporter & SafeTensors compiler
├── checkpoints/
│   └── README.md                  # Storage guide for fine-tuned weights
├── requirements.txt               # PyTorch, Diffusers, Transformers, OpenCV dependencies
└── README.md                      # Complete system documentation (this file)
```

---

## 3. Quickstart Guide (Step-by-Step)

### Step 1: Generate the Proof-of-Concept Dataset
Run the synthetic dataset generator to discover materials and build training pairs:
```bash
cd ai-model/preprocessing
python generate_synthetic_pairs.py
python prepare_dataset.py
```

### Step 2: Cloud GPU Training (Google Colab / RunPod)
1. Open [`ai-model/training/train_colab.ipynb`](training/train_colab.ipynb) in **Google Colab** (Select GPU runtime: T4, A100, or L4).
2. Or on a cloud terminal (RunPod / Vast.ai):
```bash
pip install -r requirements.txt
python ai-model/training/train_lora.py
```

### Step 3: Run Quantitative Validation & Human Review
```bash
cd ai-model/validation
python validate_model.py
```
Open [`ai-model/validation/evaluation_app.html`](validation/evaluation_app.html) in your browser to evaluate renders with the interactive before/after slider and 1–5 scoring panel.

### Step 4: Start the Production Inference API Server
On your GPU host or serverless instance:
```bash
cd ai-model/inference
python inference_api.py
```
The API is available at `http://localhost:8000/predict`.

---

## 4. Website Integration Architecture

The XTERIOHUB AI Studio in React integrates with the custom model API via the backend proxy:

```
[React AI Studio UI] ──(POST /api/generate-facade)──> [Vite Backend Proxy] ──> [Custom Model API:8000/predict]
```

- When changing materials, the same uploaded building and mask are reused instantly.
- The user's browser never needs to run heavy machine learning weights locally.
