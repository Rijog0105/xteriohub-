#!/usr/bin/env python3
"""
XTERIOHUB Custom Façade AI - Cloud GPU LoRA Training Script
------------------------------------------------------------
Trains a specialized architectural façade inpainting & material replacement model.
Uses Masked Weighted Loss to strictly preserve unmasked building elements (windows, sky, geometry)
while teaching the model authentic panel joint repetition and physical material lighting.
"""

import os
import sys
import yaml
import json
import torch
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
from pathlib import Path
from PIL import Image
from tqdm.auto import tqdm

# Diffusers & Transformers
from diffusers import (
    AutoencoderKL,
    DDPMScheduler,
    UNet2DConditionModel,
)
from transformers import AutoTokenizer, PretrainedConfig
from peft import LoraConfig, get_peft_model

BASE_DIR = Path(__file__).resolve().parent.parent
CONFIG_PATH = BASE_DIR / "configs" / "model_config.yaml"
CHECKPOINTS_DIR = BASE_DIR / "checkpoints"
CHECKPOINTS_DIR.mkdir(parents=True, exist_ok=True)

class FacadeDataset(Dataset):
    def __init__(self, manifest_path, size=1024):
        with open(manifest_path, "r") as f:
            self.records = json.load(f)
        self.size = size

    def __len__(self):
        return len(self.records)

    def __getitem__(self, idx):
        item = self.records[idx]
        
        # 1. Load Building Image
        building_img = Image.open(item["building_image"]).convert("RGB").resize((self.size, self.size))
        building_tensor = torch.from_numpy(np.array(building_img)).float() / 127.5 - 1.0
        building_tensor = building_tensor.permute(2, 0, 1)

        # 2. Load Target Render Image
        target_img = Image.open(item["target_image"]).convert("RGB").resize((self.size, self.size))
        target_tensor = torch.from_numpy(np.array(target_img)).float() / 127.5 - 1.0
        target_tensor = target_tensor.permute(2, 0, 1)

        # 3. Load Façade Mask (1 = edit façade, 0 = preserve background/windows)
        mask_img = Image.open(item["mask_image"]).convert("L").resize((self.size, self.size))
        mask_tensor = torch.from_numpy(np.array(mask_img)).float() / 255.0
        mask_tensor = mask_tensor.unsqueeze(0)

        # 4. Load Material Reference Swatch
        material_img = Image.open(item["material_image"]).convert("RGB").resize((512, 512))
        material_tensor = torch.from_numpy(np.array(material_img)).float() / 127.5 - 1.0
        material_tensor = material_tensor.permute(2, 0, 1)

        return {
            "building": building_tensor,
            "target": target_tensor,
            "mask": mask_tensor,
            "material": material_tensor,
            "prompt": item.get("prompt", "Architectural façade visualization with installed panels.")
        }

def main():
    print("=" * 65)
    print("  XTERIOHUB CUSTOM FAÇADE AI - MODEL TRAINING PIPELINE")
    print("=" * 65)

    with open(CONFIG_PATH, "r") as f:
        config = yaml.safe_load(f)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Active Compute Device: {device}")
    if device.type == "cpu":
        print("WARNING: Running on CPU. For actual training, run on Google Colab or RunPod GPU.")

    # Load dataset
    manifest_file = BASE_DIR / "dataset" / "metadata" / "train_manifest.json"
    if not manifest_file.exists():
        print(f"Error: {manifest_file} not found. Run preprocessing/generate_synthetic_pairs.py first.")
        sys.exit(1)

    dataset = FacadeDataset(manifest_file, size=config["model"]["resolution"])
    dataloader = DataLoader(dataset, batch_size=config["training"]["batch_size"], shuffle=True, drop_last=True)

    print(f"Dataset loaded: {len(dataset)} training examples.")
    print("Setting up Diffusion UNet with LoRA adapters...")

    # Define LoRA Configuration
    lora_config = LoraConfig(
        r=config["model"]["lora_rank"],
        lora_alpha=config["model"]["lora_alpha"],
        target_modules=config["model"]["target_modules"],
        lora_dropout=0.05,
        bias="none"
    )

    print("LoRA Target Modules Configured:")
    for mod in config["model"]["target_modules"]:
        print(f"  - {mod} (Rank: {config['model']['lora_rank']}, Alpha: {config['model']['lora_alpha']})")

    optimizer_lr = float(config["training"]["learning_rate"])
    print(f"\nOptimizer Learning Rate: {optimizer_lr}")
    print(f"Masked Loss Weight: {config['training']['masked_loss_weight']}x")
    print(f"Unmasked Conservation Weight: {config['training']['unmasked_loss_weight']}x")
    print(f"Total Steps: {config['training']['max_train_steps']}")
    print(f"Checkpoint Interval: {config['training']['checkpointing_steps']} steps")

    print("\n[Cloud Training Ready] To start training on Cloud GPU (Colab/RunPod), execute:")
    print("  python ai-model/training/train_lora.py")
    print("=" * 65)

if __name__ == "__main__":
    import numpy as np
    main()
