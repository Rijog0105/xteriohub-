import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MaskEditorOverlay — Professional mask correction toolbar
 * Matches XTERIOHUB design: dark, uppercase, monospace labels, minimal accents
 */
export default function MaskEditorOverlay({ editor, onConfirm, onCancel, onUpdate }) {
  const [mode, setMode] = useState('add');
  const [brushSize, setBrushSize] = useState(15);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    editor?.setMode(newMode);
  };

  const handleBrushChange = (size) => {
    const s = Number(size);
    setBrushSize(s);
    editor?.setBrushSize(s);
  };

  const handleUndo = () => {
    editor?.undo();
    onUpdate?.();
  };

  const handleRedo = () => {
    editor?.redo();
    onUpdate?.();
  };

  const handleClear = () => {
    editor?.clear();
    onUpdate?.();
  };

  const handleReset = () => {
    editor?.reset();
    onUpdate?.();
  };

  const btnBase = 'font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer select-none';
  const btnActive = 'bg-white/15 border-white/30 text-white';
  const btnInactive = 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20';
  const btnDisabled = 'bg-white/3 border-white/5 text-zinc-600 cursor-not-allowed';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-3 left-3 right-3 z-40 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#0a0a0c]/95 border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
    >
      {/* Left: Mode toggles */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[8px] tracking-[0.3em] text-zinc-500 uppercase mr-2 hidden sm:block">
          MASK EDIT
        </span>

        <button
          type="button"
          onClick={() => handleModeChange('add')}
          className={`${btnBase} ${mode === 'add' ? btnActive : btnInactive}`}
        >
          + ADD FAÇADE
        </button>

        <button
          type="button"
          onClick={() => handleModeChange('remove')}
          className={`${btnBase} ${mode === 'remove' ? btnActive : btnInactive}`}
        >
          − REMOVE FAÇADE
        </button>
      </div>

      {/* Center: Brush size */}
      <div className="flex items-center gap-3 hidden md:flex">
        <span className="font-mono text-[8px] tracking-[0.2em] text-zinc-500 uppercase">BRUSH</span>
        <input
          type="range"
          min="3"
          max="60"
          value={brushSize}
          onChange={(e) => handleBrushChange(e.target.value)}
          className="w-20 h-1 accent-zinc-400 bg-zinc-800 rounded-full appearance-none cursor-pointer"
        />
        <span className="font-mono text-[9px] text-zinc-400 w-6 text-center">{brushSize}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleUndo}
          disabled={!editor?.canUndo}
          className={`${btnBase} ${editor?.canUndo ? btnInactive : btnDisabled}`}
          title="Undo"
        >
          ↩ UNDO
        </button>

        <button
          type="button"
          onClick={handleRedo}
          disabled={!editor?.canRedo}
          className={`${btnBase} ${editor?.canRedo ? btnInactive : btnDisabled}`}
          title="Redo"
        >
          ↪ REDO
        </button>

        <button
          type="button"
          onClick={handleReset}
          className={`${btnBase} ${btnInactive}`}
          title="Reset to auto-detected mask"
        >
          RESET
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={onCancel}
          className={`${btnBase} ${btnInactive}`}
        >
          CANCEL
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className={`${btnBase} bg-white/20 border-white/40 text-white hover:bg-white/30`}
        >
          CONFIRM MASK →
        </button>
      </div>
    </motion.div>
  );
}
