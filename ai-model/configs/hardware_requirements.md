# Cloud GPU Requirements & Environment Guide

Because model training requires a high-performance GPU with at least 16GB–24GB VRAM, **do not train on a local machine without a dedicated GPU**. Use one of the following cloud platforms:

---

## 1. Recommended Cloud GPU Providers

| Provider | Recommended GPU | VRAM | Approx Cost | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Google Colab Pro** | A100 (40GB) / L4 (24GB) | 24GB–40GB | ~$10/mo | 1-Click interactive training |
| **RunPod** | RTX 4090 / A5000 / A6000 | 24GB–48GB | ~$0.34–$0.79/hr | Production training & Serverless API |
| **Vast.ai** | RTX 3090 / RTX 4090 | 24GB | ~$0.20–$0.40/hr | Lowest cost training runs |
| **Lambda Labs** | A10 / A100 | 24GB–80GB | ~$0.60–$1.10/hr | Enterprise-grade stable instances |

---

## 2. Environment Setup on Cloud GPU

### Step 1: Clone or Upload the `ai-model/` Directory
```bash
git clone <your-repo-url>
cd plan\ web/ai-model
```

### Step 2: Install PyTorch with CUDA & Dependencies
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.txt
```

### Step 3: Verify GPU Availability
```bash
python -c "import torch; print(f'GPU Available: {torch.cuda.is_available()}, Device: {torch.cuda.get_device_name(0)}')"
```

---

## 3. Storage Requirements

- **Dataset**: ~2GB for 1,000–5,000 synthetic pairs (1024x1024)
- **Pretrained Base Weights**: ~6.5GB (SDXL Inpainting + IP-Adapter)
- **Checkpoints (LoRA SafeTensors)**: ~150MB per checkpoint
- **Total Recommended Cloud Disk Space**: At least 30GB–50GB SSD
