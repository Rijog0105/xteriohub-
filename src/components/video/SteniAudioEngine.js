/**
 * SteniAudioEngine.js
 * Procedural Web Audio API sound designer for high-end European architectural video reel
 */

class SteniAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.masterGain = null;
    this.droneGain = null;
    this.rainGain = null;
    this.fireGain = null;
    this.thermalGain = null;
    this.windGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Deep Sub-Bass Architectural Drone (43.6Hz / F1 + 87.3Hz)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(43.65, this.ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(87.3, this.ctx.currentTime);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

      osc1.connect(this.droneGain);
      osc2.connect(this.droneGain);
      this.droneGain.connect(droneFilter);
      droneFilter.connect(this.masterGain);

      osc1.start();
      osc2.start();

      // 2. Procedural Rain Noise (Filtered Pink/Brown Noise)
      const rainBuffer = this.createNoiseBuffer(5);
      const rainSource = this.ctx.createBufferSource();
      rainSource.buffer = rainBuffer;
      rainSource.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0, this.ctx.currentTime);

      rainSource.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      rainSource.start();

      // 3. Procedural Fire Rumble & Crackle
      const fireBuffer = this.createNoiseBuffer(5);
      const fireSource = this.ctx.createBufferSource();
      fireSource.buffer = fireBuffer;
      fireSource.loop = true;

      const fireFilter = this.ctx.createBiquadFilter();
      fireFilter.type = 'lowpass';
      fireFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
      fireFilter.Q.setValueAtTime(1.4, this.ctx.currentTime);

      this.fireGain = this.ctx.createGain();
      this.fireGain.gain.setValueAtTime(0, this.ctx.currentTime);

      fireSource.connect(fireFilter);
      fireFilter.connect(this.fireGain);
      this.fireGain.connect(this.masterGain);
      fireSource.start();

      // 4. Procedural FLIR Thermal Scanner Hum (Dual Sine Harmonics + subtle modulation)
      const thOsc1 = this.ctx.createOscillator();
      const thOsc2 = this.ctx.createOscillator();
      thOsc1.type = 'sine';
      thOsc1.frequency.setValueAtTime(520, this.ctx.currentTime);
      thOsc2.type = 'sine';
      thOsc2.frequency.setValueAtTime(780, this.ctx.currentTime);

      this.thermalGain = this.ctx.createGain();
      this.thermalGain.gain.setValueAtTime(0, this.ctx.currentTime);

      thOsc1.connect(this.thermalGain);
      thOsc2.connect(this.thermalGain);
      this.thermalGain.connect(this.masterGain);
      thOsc1.start();
      thOsc2.start();

      // 5. Procedural Laminar Airflow Cavity Wind
      const windBuffer = this.createNoiseBuffer(5);
      const windSource = this.ctx.createBufferSource();
      windSource.buffer = windBuffer;
      windSource.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0, this.ctx.currentTime);

      windSource.connect(windFilter);
      windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);
      windSource.start();

      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext init prevented or failed', e);
    }
  }

  createNoiseBuffer(duration = 5) {
    if (!this.ctx) return null;
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Brown/Pink filter
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    return buffer;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }
    if (this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.7, now + 0.05);
    }
  }

  /**
   * Sync audio gains with the 8-second video timestamp
   * @param {number} currentTime - Seconds (0.0 to 8.0)
   * @param {boolean} isPlaying
   */
  update(currentTime, isPlaying) {
    if (!this.initialized || !this.ctx || this.isMuted || !isPlaying) {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.isMuted || !isPlaying ? 0 : 0.7, this.ctx.currentTime);
      }
      return;
    }

    const t = Math.max(0, Math.min(8.0, currentTime));
    const now = this.ctx.currentTime;

    // Stage 1: 0.0 - 2.0s (Rain / Water)
    const rainIntensity = this.calcStageWeight(t, 0.0, 2.0);
    this.rainGain.gain.setTargetAtTime(rainIntensity * 0.35, now, 0.05);

    // Stage 2: 2.0 - 4.0s (Fire / Heat)
    const fireIntensity = this.calcStageWeight(t, 2.0, 4.0);
    this.fireGain.gain.setTargetAtTime(fireIntensity * 0.4, now, 0.05);

    // Stage 3: 4.0 - 6.0s (Thermal FLIR Scan)
    const thermalIntensity = this.calcStageWeight(t, 4.0, 6.0);
    this.thermalGain.gain.setTargetAtTime(thermalIntensity * 0.06, now, 0.05);

    // Stage 4: 6.0 - 8.0s (Ventilated Façade / Airflow)
    const windIntensity = this.calcStageWeight(t, 6.0, 8.0);
    this.windGain.gain.setTargetAtTime(windIntensity * 0.38, now, 0.05);
  }

  calcStageWeight(t, start, end) {
    const fade = 0.35;
    if (t < start - fade || t > end + fade) return 0;
    if (t >= start && t <= end) return 1;
    if (t < start) return (t - (start - fade)) / fade;
    return (end + fade - t) / fade;
  }

  destroy() {
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
    }
  }
}

export const steniAudio = new SteniAudioEngine();
