#!/usr/bin/env python3
"""
XTERIOHUB Dataset Preparation & Validation Script
Splits the dataset into training (85%) and validation (15%) splits.
"""

import json
import random
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
METADATA_DIR = BASE_DIR / "dataset" / "metadata"

def split_and_validate():
    src_file = METADATA_DIR / "training_dataset.json"
    if not src_file.exists():
        print(f"Error: {src_file} does not exist. Run generate_synthetic_pairs.py first.")
        return

    with open(src_file, "r") as f:
        data = json.load(f)

    print(f"Loaded {len(data)} records for validation.")

    # Shuffle with fixed seed for reproducibility
    random.seed(42)
    random.shuffle(data)

    split_idx = int(len(data) * 0.85)
    train_data = data[:split_idx]
    val_data = data[split_idx:]

    with open(METADATA_DIR / "train_manifest.json", "w") as f:
        json.dump(train_data, f, indent=2)

    with open(METADATA_DIR / "val_manifest.json", "w") as f:
        json.dump(val_data, f, indent=2)

    print(f"Train samples: {len(train_data)} ({len(train_data)/len(data)*100:.1f}%)")
    print(f"Validation samples: {len(val_data)} ({len(val_data)/len(data)*100:.1f}%)")
    print(f"Manifests saved to {METADATA_DIR}")

if __name__ == "__main__":
    split_and_validate()
