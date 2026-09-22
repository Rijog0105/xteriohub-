import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  Download, Eye, EyeOff, Maximize2, Sparkles,
  Droplets, Flame, Thermometer, Wind, CheckCircle2,
  ChevronRight, ArrowDownToLine, Layers, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SteniVideoEngine } from './SteniVideoEngine';
import { steniAudio } from './SteniAudioEngine';

const STAGES = [
  {
    id: 'water',
    title: 'WATER RESISTANT',
    sub: 'Impermeable Stone Composite',
    time: 0.0,
    end: 2.0,
    icon: Droplets,
    color: '#38bdf8',
    desc: 'Norwegian stone-composite core prevents moisture absorption, ensuring freeze-thaw immunity with θ = 114° hydrophobic contact angle.'
  },
  {
    id: 'fire',
    title: 'FIRE RESISTANT',
    sub: 'Class A2-s1, d0 Fire Protection',
    time: 2.0,
    end: 4.0,
    icon: Flame,
    color: '#fb923c',
    desc: 'Non-combustible composite stone barrier tested under direct 850°C heat with zero toxic smoke emissions or structural deformation.'
  },
  {
    id: 'thermal',
    title: 'THERMALLY STABLE',
    sub: 'Low Expansion 0.014 mm/m·K',
    time: 4.0,
    end: 6.0,
    icon: Thermometer,
    color: '#a855f7',
    desc: 'Extreme dimensional stability across -50°C to +80°C Arctic to desert climates, maintaining tight 4mm architectural joints.'
  },
  {
    id: 'ventilated',
    title: 'VENTILATED FAÇADE',
    sub: 'Continuous Rear Cavity Airflow',
    time: 6.0,
    end: 8.0,
    icon: Wind,
    color: '#34d399',
    desc: '38mm rear air cavity creates natural buoyant convection chimney effect, continuously purging condensation and solar heat gain.'
  }
];

export default function SteniProductVideo({ className = '', autoPlay = true }) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [showHUD, setShowHUD] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedUrl, setExportedUrl] = useState(null);

  // Initialize Canvas & Engine
  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new SteniVideoEngine(canvasRef.current);
    engineRef.current = engine;
    engine.setTime(0);

    let animId;
    let lastTimestamp = performance.now();

    const loop = (now) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (engineRef.current && !engineRef.current.isRecording) {
        if (engineRef.current.isPlaying) {
          let nextTime = engineRef.current.currentTime + delta * engineRef.current.playbackRate;
          if (nextTime >= engineRef.current.duration) {
            if (engineRef.current.isLooping) {
              nextTime = 0;
            } else {
              nextTime = engineRef.current.duration;
              engineRef.current.isPlaying = false;
              setIsPlaying(false);
            }
          }
          engineRef.current.setTime(nextTime);
          setCurrentTime(nextTime);

          // Update audio state
          steniAudio.update(nextTime, true);
        } else {
          steniAudio.update(engineRef.current.currentTime, false);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      steniAudio.destroy();
    };
  }, []);

  // Sync isPlaying state
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.isPlaying = isPlaying;
    }
  }, [isPlaying]);

  // Sync HUD state
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.showHUD = showHUD;
      engineRef.current.renderFrame(currentTime);
    }
  }, [showHUD, currentTime]);

  // Sync Playback Rate
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!isPlaying && isMuted) {
      // Audio can be initialized on user click
      steniAudio.init();
    }
    setIsPlaying(!isPlaying);
  };

  // Replay
  const handleReplay = () => {
    if (engineRef.current) {
      engineRef.current.setTime(0);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Jump to specific stage
  const jumpToStage = (time) => {
    if (engineRef.current) {
      engineRef.current.setTime(time);
      setCurrentTime(time);
      setIsPlaying(true);
      if (isMuted) {
        steniAudio.init();
      }
    }
  };

  // Audio Toggle
  const toggleAudio = () => {
    steniAudio.init();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    steniAudio.setMuted(nextMuted);
  };

  // Fullscreen
  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(err => console.error(err));
      } else {
        document.exitFullscreen().catch(err => console.error(err));
      }
    }
  };

  // Video Export Handler
  const handleExport = async () => {
    if (!engineRef.current || isExporting) return;
    setIsPlaying(false);
    setIsExporting(true);
    setExportProgress(0);
    setExportedUrl(null);

    engineRef.current.recordAndExportVideo(
      (prog) => setExportProgress(Math.floor(prog * 100)),
      (url, blob) => {
        setIsExporting(false);
        setExportedUrl(url);

        // Automatic download trigger
        const a = document.createElement('a');
        a.href = url;
        a.download = 'STENI_Performance_Façade_9x16.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    );
  };

  // Current stage helper
  const currentStage = STAGES.find((s, idx) => {
    const next = STAGES[idx + 1];
    return currentTime >= s.time && (!next || currentTime < next.time);
  }) || STAGES[0];

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center justify-center ${className}`}>
      
      {/* 9:16 Vertical Video Screen Frame */}
      <div 
        ref={containerRef}
        className="relative group w-full max-w-[420px] aspect-[9/16] rounded-[32px] overflow-hidden bg-[#07080a] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between"
      >
        {/* Real-time Render Canvas */}
        <canvas
          ref={canvasRef}
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />

        {/* Top Header Overlay Bar */}
        <div className="relative z-20 flex items-center justify-between p-5 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-white/90 uppercase font-semibold">
              9:16 Architectural Reel
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={isMuted ? 'Enable Architectural Audio' : 'Mute Audio'}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 transition-all border border-white/10"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* HUD Toggle */}
            <button
              onClick={() => setShowHUD(!showHUD)}
              title={showHUD ? 'Hide Technical HUD' : 'Show Technical HUD'}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 transition-all border border-white/10"
            >
              {showHUD ? <Eye className="w-4 h-4 text-sky-400" /> : <EyeOff className="w-4 h-4" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              title="Fullscreen"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 transition-all border border-white/10"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Big Play Trigger when Paused */}
        <AnimatePresence>
          {!isPlaying && !isExporting && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center shadow-2xl z-30 hover:scale-110 transition-transform"
            >
              <Play className="w-8 h-8 ml-1 fill-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom Interactive Control Center */}
        <div className="relative z-20 p-5 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-3">
          
          {/* Stage Progress Pills */}
          <div className="grid grid-cols-4 gap-1.5">
            {STAGES.map((stg, i) => {
              const isActive = currentTime >= stg.time && currentTime < stg.end;
              const isPast = currentTime >= stg.end;
              return (
                <button
                  key={stg.id}
                  onClick={() => jumpToStage(stg.time)}
                  className="group/pill flex flex-col gap-1 text-left"
                >
                  <div className="h-1 rounded-full overflow-hidden bg-white/15 relative">
                    <div 
                      className="h-full transition-all duration-100"
                      style={{
                        backgroundColor: stg.color,
                        width: isActive 
                          ? `${((currentTime - stg.time) / 2.0) * 100}%` 
                          : isPast ? '100%' : '0%'
                      }}
                    />
                  </div>
                  <span className={`text-[9px] font-mono tracking-wider truncate uppercase transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-white/40 group-hover/pill:text-white/70'
                  }`}>
                    0{i + 1} {stg.id}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Timeline Scrubber Bar */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="8.0"
              step="0.02"
              value={currentTime}
              onChange={(e) => {
                const t = parseFloat(e.target.value);
                if (engineRef.current) {
                  engineRef.current.setTime(t);
                  setCurrentTime(t);
                }
              }}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-sky-400 transition-colors"
            />
            <span className="text-[11px] font-mono text-white/80 shrink-0">
              {currentTime.toFixed(1)}s / 8.0s
            </span>
          </div>

          {/* Playback Button Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-white text-black hover:bg-white/90 transition-all font-semibold"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
              </button>

              <button
                onClick={handleReplay}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                title="Replay from 0.0s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Playback Rate Selector */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
              {[0.5, 1.0, 1.5, 2.0].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                    playbackRate === rate
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Direct MP4 Download Button */}
            <a
              href="/assets/Videos/steni_facade_performance_9x16.mp4"
              download="STENI_Facade_Performance_9x16.mp4"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-[11px] font-semibold tracking-wider uppercase transition-all shadow-lg hover:shadow-sky-500/25"
              title="Download 9:16 MP4 Video File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download MP4</span>
            </a>
          </div>
        </div>

        {/* Video Export Progress Modal */}
        <AnimatePresence>
          {isExporting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin mb-4" />
              <h3 className="text-lg font-bold text-white mb-1">Rendering 9:16 HD Master</h3>
              <p className="text-xs text-white/60 mb-6 font-mono">
                Frame-by-frame 60 FPS video generation ({exportProgress}%)
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-75"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-sky-400">
                Encoding WebM / MP4 video stream...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side: Interactive Feature Inspector & Architectural Specs */}
      <div className="flex-1 max-w-xl flex flex-col gap-4">
        
        {/* Brand Banner */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 flex items-center justify-center">
              <Layers className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
                STENI® Architectural Systems
              </h4>
              <p className="text-xs text-white/50">
                Norwegian Stone-Composite Cladding · 60-Year Guarantee
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-white/80">
            EN 13501-1
          </span>
        </div>

        {/* 4 Interactive Feature Cards */}
        <div className="flex flex-col gap-3">
          {STAGES.map((stg, index) => {
            const Icon = stg.icon;
            const isActive = currentTime >= stg.time && currentTime < stg.end;

            return (
              <motion.div
                key={stg.id}
                onClick={() => jumpToStage(stg.time)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? 'bg-white/[0.08] border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] translate-x-1.5'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15'
                }`}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: isActive ? `${stg.color}25` : 'rgba(255,255,255,0.05)',
                        color: stg.color
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                        Phase 0{index + 1} ({stg.time.toFixed(0)}.0s - {stg.end.toFixed(0)}.0s)
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {stg.title}
                      </h4>
                    </div>
                  </div>

                  {isActive && (
                    <span 
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: `${stg.color}20`,
                        color: stg.color
                      }}
                    >
                      LIVE STAGE
                    </span>
                  )}
                </div>

                <p className="text-xs text-white/65 leading-relaxed pl-10">
                  {stg.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Technical Guarantee Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs text-white/80">
              <span className="font-semibold text-white">60-Year Written Functional Warranty:</span> Certified Arctic to desert climatic resistance.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
