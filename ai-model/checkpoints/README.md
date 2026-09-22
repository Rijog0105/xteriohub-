# XTERIOHUB Model Checkpoints Directory

This directory stores fine-tuned LoRA and adapter weight checkpoints (`.safetensors` format) generated during cloud GPU training.

---

## Checkpoint Naming Convention

- `facade_lora_step_000500.safetensors`: Early checkpoint (500 steps)
- `facade_lora_step_001000.safetensors`: Mid checkpoint (1,000 steps)
- `facade_lora_step_002000.safetensors`: Final production checkpoint (2,000 steps)
- `facade_lora_best.safetensors`: Best validation score checkpoint

---

## How to Place Checkpoints

After running training on Google Colab or RunPod, copy the resulting `.safetensors` files here:
```bash
cp /path/to/downloaded/facade_lora_best.safetensors ai-model/checkpoints/
```

The inference server ([inference_api.py](../inference/inference_api.py)) will automatically detect and load the latest checkpoint on startup.
