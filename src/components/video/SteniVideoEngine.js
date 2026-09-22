/**
 * SteniVideoEngine.js
 * 
 * Master 60 FPS Canvas2D / Procedural Architectural Renderer
 * Produces a continuous, dark-themed 8-second 9:16 vertical video reel for the STENI façade panel.
 * 
 * Stages:
 *  0.0s – 2.0s : WATER RESISTANT (Rain streaks, hydrophobic beading, contact angle HUD)
 *  2.0s – 4.0s : FIRE RESISTANT (Controlled atmospheric flames, heat shimmer, zero deformation)
 *  4.0s – 6.0s : THERMALLY STABLE (FLIR infrared thermal heatmap, isotherms, temperature flow vectors)
 *  6.0s – 8.0s : VENTILATED FAÇADE (Cinematic pull-back cutaway, rear air cavity, buoyant upward streamlines)
 */

export class SteniVideoEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.width = 1080;
    this.height = 1920;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.duration = 8.0; // 8 seconds total
    this.currentTime = 0;
    this.isPlaying = false;
    this.playbackRate = 1.0;
    this.isLooping = true;
    this.showHUD = true;

    // MediaRecorder for video download
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;

    // Simulation systems
    this.initSimulationData();

    // Stone Aggregate Texture Cache
    this.stonePatternCanvas = this.createStoneTextureCanvas();
  }

  initSimulationData() {
    // 1. Water Droplets & Rain Simulation
    this.raindrops = [];
    for (let i = 0; i < 160; i++) {
      this.raindrops.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        len: 30 + Math.random() * 45,
        speed: 18 + Math.random() * 22,
        opacity: 0.15 + Math.random() * 0.4,
        width: 1.2 + Math.random() * 1.5,
      });
    }

    this.surfaceBeads = [];
    for (let i = 0; i < 85; i++) {
      this.surfaceBeads.push({
        x: 180 + Math.random() * 720,
        y: 350 + Math.random() * 1250,
        radius: 2.5 + Math.random() * 8.5,
        wobble: Math.random() * Math.PI * 2,
        dripSpeed: 0.2 + Math.random() * 0.8,
        contactAngle: 110 + Math.random() * 15,
        trailLength: 15 + Math.random() * 40,
      });
    }

    // 2. Fire Embers & Heat Simulation
    this.embers = [];
    for (let i = 0; i < 110; i++) {
      this.embers.push({
        x: 200 + Math.random() * 680,
        y: 1100 + Math.random() * 700,
        size: 2.0 + Math.random() * 4.5,
        speedY: 2.5 + Math.random() * 5.0,
        driftX: (Math.random() - 0.5) * 1.8,
        life: Math.random(),
        maxLife: 0.8 + Math.random() * 1.2,
        hue: 25 + Math.random() * 20, // Amber/Orange
      });
    }

    // 3. Airflow Streamlines for Ventilated Cavity (Stage 4)
    this.cavityParticles = [];
    for (let i = 0; i < 140; i++) {
      this.cavityParticles.push({
        x: 460 + Math.random() * 160,
        y: Math.random() * this.height,
        speedY: 4.5 + Math.random() * 7.5,
        driftX: (Math.random() - 0.5) * 0.6,
        size: 2.0 + Math.random() * 3.5,
        opacity: 0.25 + Math.random() * 0.65,
        length: 25 + Math.random() * 55,
      });
    }
  }

  createStoneTextureCanvas() {
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 512;
    pCanvas.height = 512;
    const pCtx = pCanvas.getContext('2d');

    // Dark charcoal Norwegian basalt/granite composite
    pCtx.fillStyle = '#121417';
    pCtx.fillRect(0, 0, 512, 512);

    // Micro-aggregate specks (quarry stone flakes)
    const imgData = pCtx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 28;
      const speck = Math.random() > 0.985 ? (Math.random() > 0.5 ? 65 : -30) : 0;
      const base = 20 + noise + speck;
      data[i] = Math.max(10, Math.min(60, base + 2)); // R
      data[i + 1] = Math.max(12, Math.min(65, base + 4)); // G
      data[i + 2] = Math.max(14, Math.min(72, base + 6)); // B
    }
    pCtx.putImageData(imgData, 0, 0);

    // Subtle brushed stone sheen
    const grad = pCtx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 512, 512);

    return pCanvas;
  }

  setTime(seconds) {
    this.currentTime = Math.max(0, Math.min(this.duration, seconds));
    this.renderFrame(this.currentTime);
  }

  getCurrentStage(time) {
    if (time < 2.0) return { index: 0, name: 'WATER RESISTANT', start: 0.0, end: 2.0, color: '#38bdf8' };
    if (time < 4.0) return { index: 1, name: 'FIRE RESISTANT', start: 2.0, end: 4.0, color: '#fb923c' };
    if (time < 6.0) return { index: 2, name: 'THERMALLY STABLE', start: 4.0, end: 6.0, color: '#a855f7' };
    return { index: 3, name: 'VENTILATED FAÇADE', start: 6.0, end: 8.0, color: '#34d399' };
  }

  renderFrame(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Clear background
    ctx.fillStyle = '#07080a';
    ctx.fillRect(0, 0, w, h);

    // Dynamic Camera Tracking (Subtle cinematic push-in and cross-section pull-back)
    ctx.save();
    this.applyCameraTransform(ctx, t, w, h);

    // Render Base Architectural Façade & Continuous STENI Panel
    this.renderFaçadeGeometry(ctx, t, w, h);

    // Multi-stage Layer Compositing
    this.renderStage1Water(ctx, t, w, h);
    this.renderStage2Fire(ctx, t, w, h);
    this.renderStage3Thermal(ctx, t, w, h);
    this.renderStage4Ventilation(ctx, t, w, h);

    ctx.restore();

    // Render Minimal Architectural Typography & Transitions
    this.renderTypography(ctx, t, w, h);

    // Render Clean Technical HUD Overlay (if enabled)
    if (this.showHUD) {
      this.renderTechnicalHUD(ctx, t, w, h);
    }

    // High-end cinematic letterbox subtle vignette
    this.renderCinematicVignette(ctx, w, h);
  }

  applyCameraTransform(ctx, t, w, h) {
    // Stage 1 to 3: Slow cinematic push-in (scale 1.0 -> 1.06)
    // Stage 4 (6s - 8s): Smooth pull-away & slight angle tilt to reveal rear cavity
    let scale = 1.0 + (t / 6.0) * 0.06;
    let offsetX = 0;
    let offsetY = 0;
    let rot = 0;

    if (t >= 5.6) {
      const pullProg = Math.min(1.0, (t - 5.6) / 1.8);
      const ease = this.easeInOutCubic(pullProg);
      scale = (1.06 * (1 - ease)) + (0.92 * ease);
      offsetX = - ease * 40;
      offsetY = ease * 25;
      rot = - ease * 0.015;
    }

    ctx.translate(w / 2 + offsetX, h / 2 + offsetY);
    ctx.rotate(rot);
    ctx.scale(scale, scale);
    ctx.translate(-w / 2, -h / 2);
  }

  renderFaçadeGeometry(ctx, t, w, h) {
    const isStage4 = t >= 5.8;
    const stage4Blend = isStage4 ? Math.min(1.0, (t - 5.8) / 1.2) : 0;
    const ease4 = this.easeInOutCubic(stage4Blend);

    // Substructure mounting wall (Dark concrete structural backdrop)
    ctx.fillStyle = '#0c0e12';
    ctx.fillRect(80, 150, w - 160, h - 300);

    // Architectural grid reveal lines behind panel
    ctx.strokeStyle = '#181b22';
    ctx.lineWidth = 1.5;
    for (let y = 200; y < h - 200; y += 180) {
      ctx.beginPath();
      ctx.moveTo(90, y);
      ctx.lineTo(w - 90, y);
      ctx.stroke();
    }

    // Rear Sub-frame Aluminum Rails (revealed more distinctly in Stage 4)
    const railX1 = 320;
    const railX2 = w - 320;

    ctx.fillStyle = `rgba(38, 43, 54, ${0.4 + ease4 * 0.6})`;
    ctx.fillRect(railX1 - 18, 180, 36, h - 360);
    ctx.fillRect(railX2 - 18, 180, 36, h - 360);

    // Metallic rail highlights
    ctx.fillStyle = `rgba(120, 135, 160, ${0.2 + ease4 * 0.5})`;
    ctx.fillRect(railX1 - 2, 180, 4, h - 360);
    ctx.fillRect(railX2 - 2, 180, 4, h - 360);

    // Main STENI Façade Panel Dimensions
    // Panel shifts forward / reveals cavity in Stage 4
    const panelLeft = 160 - ease4 * 20;
    const panelTop = 260;
    const panelWidth = w - 320 - ease4 * 60;
    const panelHeight = h - 520;

    // Panel Cast Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 45 + ease4 * 35;
    ctx.shadowOffsetX = 15 + ease4 * 30;
    ctx.shadowOffsetY = 25 + ease4 * 20;

    // Panel Stone Composite Core Background
    ctx.fillStyle = '#14161b';
    ctx.fillRect(panelLeft, panelTop, panelWidth, panelHeight);
    ctx.restore();

    // Apply Stone-Composite Aggregate Texture
    ctx.save();
    ctx.beginPath();
    ctx.rect(panelLeft, panelTop, panelWidth, panelHeight);
    ctx.clip();

    const pattern = ctx.createPattern(this.stonePatternCanvas, 'repeat');
    ctx.fillStyle = pattern;
    ctx.globalAlpha = 0.95;
    ctx.fillRect(panelLeft, panelTop, panelWidth, panelHeight);

    // Monolithic Stone Sheen Gradient (Directional studio edge lighting)
    const sheenGrad = ctx.createLinearGradient(panelLeft, panelTop, panelLeft + panelWidth, panelTop + panelHeight);
    sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
    sheenGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
    sheenGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.25)');
    sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0.04)');
    ctx.fillStyle = sheenGrad;
    ctx.globalAlpha = 1.0;
    ctx.fillRect(panelLeft, panelTop, panelWidth, panelHeight);

    // Precision Architectural Joint Reveals (Horizontal panel division)
    const midJointY = panelTop + panelHeight * 0.48;
    ctx.fillStyle = '#060709';
    ctx.fillRect(panelLeft, midJointY - 4, panelWidth, 8);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(panelLeft, midJointY + 4, panelWidth, 1);

    ctx.restore();

    // Precision Anodized Panel Bevel Edge Border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(panelLeft, panelTop, panelWidth, panelHeight);

    // Corner Substructure Fastening Points (Minimal Scandinavian engineering)
    const boltPoints = [
      { x: panelLeft + 40, y: panelTop + 40 },
      { x: panelLeft + panelWidth - 40, y: panelTop + 40 },
      { x: panelLeft + 40, y: panelTop + panelHeight - 40 },
      { x: panelLeft + panelWidth - 40, y: panelTop + panelHeight - 40 },
      { x: panelLeft + 40, y: midJointY - 30 },
      { x: panelLeft + panelWidth - 40, y: midJointY - 30 },
    ];

    boltPoints.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#1e222a';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  /* -------------------------------------------------------------
   * STAGE 1: WATER RESISTANT (0.0s – 2.0s)
   * ------------------------------------------------------------- */
  renderStage1Water(ctx, t, w, h) {
    const weight = this.calcStageWeight(t, 0.0, 2.0);
    if (weight <= 0.001) return;

    ctx.save();
    ctx.globalAlpha = weight;

    // Atmospheric cool rain mist tint
    const rainMist = ctx.createLinearGradient(0, 0, 0, h);
    rainMist.addColorStop(0, 'rgba(56, 189, 248, 0.04)');
    rainMist.addColorStop(1, 'rgba(15, 23, 42, 0.08)');
    ctx.fillStyle = rainMist;
    ctx.fillRect(0, 0, w, h);

    // 1. Dynamic Falling Rain Streaks
    ctx.strokeStyle = 'rgba(200, 230, 255, 0.35)';
    this.raindrops.forEach(drop => {
      // Animate position based on timestamp
      const curY = (drop.y + t * drop.speed * 60) % (h + 100) - 50;
      const curX = drop.x - (curY * 0.12); // Wind angle

      ctx.lineWidth = drop.width;
      ctx.beginPath();
      ctx.moveTo(curX, curY);
      ctx.lineTo(curX - drop.len * 0.12, curY + drop.len);
      ctx.stroke();
    });

    // 2. Surface Water Droplets (Hydrophobic Beading Physics)
    this.surfaceBeads.forEach((bead, idx) => {
      // Slight downward drip trail
      const dripOffset = (t * bead.dripSpeed * 35 + idx * 10) % 180;
      const beadY = bead.y + dripOffset;
      const beadX = bead.x + Math.sin(t * 2 + bead.wobble) * 1.5;

      // Wet moisture trail behind droplet
      ctx.beginPath();
      ctx.moveTo(beadX, beadY - bead.trailLength);
      ctx.lineTo(beadX, beadY);
      ctx.strokeStyle = 'rgba(180, 220, 255, 0.15)';
      ctx.lineWidth = bead.radius * 0.6;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Hydrophobic Beaded Droplet (Glossy surface dome)
      const dropGrad = ctx.createRadialGradient(
        beadX - bead.radius * 0.3,
        beadY - bead.radius * 0.3,
        bead.radius * 0.1,
        beadX,
        beadY,
        bead.radius
      );
      dropGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      dropGrad.addColorStop(0.4, 'rgba(140, 200, 255, 0.7)');
      dropGrad.addColorStop(0.85, 'rgba(30, 80, 140, 0.6)');
      dropGrad.addColorStop(1, 'rgba(10, 25, 50, 0.8)');

      ctx.beginPath();
      ctx.arc(beadX, beadY, bead.radius, 0, Math.PI * 2);
      ctx.fillStyle = dropGrad;
      ctx.fill();

      // Specular Highlight Pinpoint
      ctx.beginPath();
      ctx.arc(beadX - bead.radius * 0.35, beadY - bead.radius * 0.35, bead.radius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    // 3. Technical Hydrophobic Contact Angle Overlay Diagram (Subtle HUD)
    if (t >= 0.4 && t <= 1.8) {
      const hudAlpha = Math.min(1.0, Math.sin((t - 0.4) / 1.4 * Math.PI));
      ctx.save();
      ctx.globalAlpha = weight * hudAlpha * 0.85;

      const macroX = 540;
      const macroY = 920;
      const macroR = 48;

      // Contact angle baseline
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(macroX - 80, macroY + macroR);
      ctx.lineTo(macroX + 80, macroY + macroR);
      ctx.stroke();

      // Hydrophobic droplet dome circle
      ctx.beginPath();
      ctx.arc(macroX, macroY + macroR - 20, macroR, 0.25 * Math.PI, 0.75 * Math.PI, true);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Contact angle tangent line
      ctx.beginPath();
      ctx.moveTo(macroX - 35, macroY + macroR);
      ctx.lineTo(macroX - 65, macroY + macroR - 55);
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Contact angle arc
      ctx.beginPath();
      ctx.arc(macroX - 35, macroY + macroR, 22, Math.PI, 1.35 * Math.PI);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '500 18px "Inter", "Outfit", sans-serif';
      ctx.fillText('θ = 114° HYDROPHOBIC', macroX - 110, macroY + macroR - 70);

      ctx.restore();
    }

    ctx.restore();
  }

  /* -------------------------------------------------------------
   * STAGE 2: FIRE RESISTANT (2.0s – 4.0s)
   * ------------------------------------------------------------- */
  renderStage2Fire(ctx, t, w, h) {
    const weight = this.calcStageWeight(t, 2.0, 4.0);
    if (weight <= 0.001) return;

    ctx.save();
    ctx.globalAlpha = weight;

    // Ambient Warm Fire Glow & Refraction
    const fireAmb = ctx.createRadialGradient(w * 0.5, h * 0.75, 50, w * 0.5, h * 0.75, 600);
    fireAmb.addColorStop(0, 'rgba(251, 146, 60, 0.25)');
    fireAmb.addColorStop(0.5, 'rgba(234, 88, 12, 0.12)');
    fireAmb.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = fireAmb;
    ctx.fillRect(0, 0, w, h);

    // 1. Procedural Controlled Flames (Licking smoothly near panel)
    const flameBaseY = 1380;
    for (let f = 0; f < 8; f++) {
      const fx = 280 + f * 70;
      const fTime = (t - 2.0) * 8 + f * 1.5;
      const flameHeight = 160 + Math.sin(fTime * 1.8) * 45 + Math.cos(fTime * 3.2) * 25;
      const sway = Math.sin(fTime * 2.2) * 22;

      const flameGrad = ctx.createLinearGradient(fx, flameBaseY, fx + sway, flameBaseY - flameHeight);
      flameGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      flameGrad.addColorStop(0.2, 'rgba(254, 215, 170, 0.75)');
      flameGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.55)');
      flameGrad.addColorStop(0.85, 'rgba(220, 38, 38, 0.25)');
      flameGrad.addColorStop(1, 'rgba(185, 28, 28, 0)');

      ctx.beginPath();
      ctx.moveTo(fx - 28, flameBaseY);
      ctx.quadraticCurveTo(fx - 15 + sway * 0.5, flameBaseY - flameHeight * 0.5, fx + sway, flameBaseY - flameHeight);
      ctx.quadraticCurveTo(fx + 15 + sway * 0.5, flameBaseY - flameHeight * 0.5, fx + 28, flameBaseY);
      ctx.closePath();
      ctx.fillStyle = flameGrad;
      ctx.fill();
    }

    // 2. Rising Luminous Embers
    this.embers.forEach((ember, i) => {
      const emberLife = ((t - 2.0) * 1.5 + ember.life) % ember.maxLife;
      const progress = emberLife / ember.maxLife;
      const curY = ember.y - progress * 480 * (ember.speedY / 3.0);
      const curX = ember.x + Math.sin((t * 4) + i) * 35 + progress * ember.driftX * 80;
      const alpha = Math.sin(progress * Math.PI) * 0.85;

      ctx.beginPath();
      ctx.arc(curX, curY, ember.size * (1 - progress * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${ember.hue}, 95%, 65%, ${alpha})`;
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 3. Technical Flame Resistance Metric & Non-Combustibility Shield Indicator
    if (t >= 2.4 && t <= 3.8) {
      const hudAlpha = Math.min(1.0, Math.sin((t - 2.4) / 1.4 * Math.PI));
      ctx.save();
      ctx.globalAlpha = weight * hudAlpha * 0.9;

      const badgeX = 540;
      const badgeY = 820;

      // Class A2-s1, d0 Technical Reticle
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(badgeX - 160, badgeY - 32, 320, 64);

      // Corner ticks
      const s = 8;
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(badgeX - 160, badgeY - 32 + s); ctx.lineTo(badgeX - 160, badgeY - 32); ctx.lineTo(badgeX - 160 + s, badgeY - 32);
      ctx.moveTo(badgeX + 160 - s, badgeY - 32); ctx.lineTo(badgeX + 160, badgeY - 32); ctx.lineTo(badgeX + 160, badgeY - 32 + s);
      ctx.moveTo(badgeX - 160, badgeY + 32 - s); ctx.lineTo(badgeX - 160, badgeY + 32); ctx.lineTo(badgeX - 160 + s, badgeY + 32);
      ctx.moveTo(badgeX + 160 - s, badgeY + 32); ctx.lineTo(badgeX + 160, badgeY + 32); ctx.lineTo(badgeX + 160, badgeY + 32 - s);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 20px "Outfit", "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('EN 13501-1 : CLASS A2-s1, d0', badgeX, badgeY + 2);

      ctx.fillStyle = '#fb923c';
      ctx.font = '500 14px "Inter", sans-serif';
      ctx.fillText('850°C THERMAL INTEGRITY : 100% UNYIELDING', badgeX, badgeY + 22);

      ctx.restore();
    }

    ctx.restore();
  }

  /* -------------------------------------------------------------
   * STAGE 3: THERMALLY STABLE (4.0s – 6.0s)
   * ------------------------------------------------------------- */
  renderStage3Thermal(ctx, t, w, h) {
    const weight = this.calcStageWeight(t, 4.0, 6.0);
    if (weight <= 0.001) return;

    ctx.save();
    ctx.globalAlpha = weight;

    const panelLeft = 160;
    const panelTop = 260;
    const panelWidth = w - 320;
    const panelHeight = h - 520;

    // 1. FLIR False-Color Thermal Gradient Heatmap Overlay across Panel
    const thermalGrad = ctx.createLinearGradient(panelLeft, panelTop, panelLeft + panelWidth, panelTop);
    thermalGrad.addColorStop(0, 'rgba(239, 68, 68, 0.45)');   // Hot exterior Red/Amber (+48°C)
    thermalGrad.addColorStop(0.25, 'rgba(245, 158, 11, 0.35)'); // Transition Orange
    thermalGrad.addColorStop(0.55, 'rgba(6, 182, 212, 0.25)');  // Cyan Dissipation
    thermalGrad.addColorStop(0.85, 'rgba(59, 130, 246, 0.35)'); // Cool Structural Substrate (+21°C)
    thermalGrad.addColorStop(1, 'rgba(99, 102, 241, 0.45)');   // Indigo Deep Core

    ctx.fillStyle = thermalGrad;
    ctx.fillRect(panelLeft, panelTop, panelWidth, panelHeight);

    // 2. Animated Isothermal Contour Loops (Iso-temperature lines)
    ctx.lineWidth = 1.5;
    for (let c = 0; c < 9; c++) {
      const contourX = panelLeft + (panelWidth * (c + 1)) / 10;
      const wavePhase = (t - 4.0) * 3 + c * 0.8;

      ctx.strokeStyle = c < 3 ? 'rgba(248, 113, 113, 0.6)' : c < 6 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(129, 140, 248, 0.6)';
      ctx.beginPath();
      for (let y = panelTop; y <= panelTop + panelHeight; y += 30) {
        const offset = Math.sin(y * 0.015 + wavePhase) * 18;
        if (y === panelTop) ctx.moveTo(contourX + offset, y);
        else ctx.lineTo(contourX + offset, y);
      }
      ctx.stroke();
    }

    // 3. Thermal Vector Arrows (Showing heat deflecting away from structural core)
    for (let vx = panelLeft + 60; vx < panelLeft + panelWidth - 60; vx += 120) {
      for (let vy = panelTop + 100; vy < panelTop + panelHeight - 100; vy += 160) {
        const arrowAnim = ((t - 4.0) * 2 + (vx + vy) * 0.002) % 1.0;
        const arrowY = vy - arrowAnim * 30;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(vx, arrowY + 18);
        ctx.lineTo(vx, arrowY);
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(vx - 4, arrowY + 6);
        ctx.lineTo(vx, arrowY);
        ctx.lineTo(vx + 4, arrowY + 6);
        ctx.stroke();
      }
    }

    // 4. Technical Thermal Scale HUD Bar
    if (t >= 4.3 && t <= 5.8) {
      const hudAlpha = Math.min(1.0, Math.sin((t - 4.3) / 1.5 * Math.PI));
      ctx.save();
      ctx.globalAlpha = weight * hudAlpha * 0.95;

      const barX = panelLeft + panelWidth - 55;
      const barY = panelTop + 80;
      const barH = 280;

      // Color spectrum bar
      const barGrad = ctx.createLinearGradient(0, barY, 0, barY + barH);
      barGrad.addColorStop(0, '#ef4444');
      barGrad.addColorStop(0.33, '#f59e0b');
      barGrad.addColorStop(0.66, '#06b6d4');
      barGrad.addColorStop(1, '#6366f1');

      ctx.fillStyle = barGrad;
      ctx.fillRect(barX, barY, 8, barH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.strokeRect(barX, barY, 8, barH);

      ctx.fillStyle = '#ffffff';
      ctx.font = '500 13px "Inter", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('+48°C EXT', barX - 12, barY + 12);
      ctx.fillText('+32°C SHLD', barX - 12, barY + barH * 0.5);
      ctx.fillText('+21°C CORE', barX - 12, barY + barH);

      // Expansion spec callout
      ctx.textAlign = 'center';
      ctx.fillStyle = '#a855f7';
      ctx.font = '600 16px "Outfit", "Inter", sans-serif';
      ctx.fillText('EXPANSION COEFFICIENT : 0.014 mm/m·K', 540, 880);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '400 13px "Inter", sans-serif';
      ctx.fillText('ZERO THERMAL WARPAGE (-50°C TO +80°C RANGE)', 540, 905);

      ctx.restore();
    }

    ctx.restore();
  }

  /* -------------------------------------------------------------
   * STAGE 4: VENTILATED FAÇADE (6.0s – 8.0s)
   * ------------------------------------------------------------- */
  renderStage4Ventilation(ctx, t, w, h) {
    const weight = this.calcStageWeight(t, 6.0, 8.0);
    if (weight <= 0.001) return;

    ctx.save();
    ctx.globalAlpha = weight;

    // Upward Convective Chimney Streamlines flowing behind panel
    this.cavityParticles.forEach((p, idx) => {
      const curY = (p.y - (t - 6.0) * p.speedY * 70) % (h + 120);
      const actualY = curY < -60 ? curY + h + 120 : curY;
      const curX = p.x + Math.sin(t * 3 + idx) * 12 + p.driftX * 20;

      // Gradient streamline
      const lineGrad = ctx.createLinearGradient(curX, actualY + p.length, curX, actualY);
      lineGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
      lineGrad.addColorStop(0.5, `rgba(52, 211, 153, ${p.opacity * 0.7})`);
      lineGrad.addColorStop(1, `rgba(56, 189, 248, ${p.opacity * 0.9})`);

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = p.size;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(curX, actualY + p.length);
      ctx.lineTo(curX, actualY);
      ctx.stroke();

      // Leading glow point
      ctx.beginPath();
      ctx.arc(curX, actualY, p.size * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = '#6ee7b7';
      ctx.fill();
    });

    // Technical Cutaway Dimension Annotation (38mm Cavity Clearance)
    if (t >= 6.3 && t <= 7.9) {
      const hudAlpha = Math.min(1.0, Math.sin((t - 6.3) / 1.6 * Math.PI));
      ctx.save();
      ctx.globalAlpha = weight * hudAlpha * 0.95;

      const dimX = 540;
      const dimY = 960;

      // Dimension callout line with arrowheads
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(dimX - 120, dimY);
      ctx.lineTo(dimX + 120, dimY);
      ctx.stroke();

      // Dimension end ticks
      ctx.beginPath();
      ctx.moveTo(dimX - 120, dimY - 12); ctx.lineTo(dimX - 120, dimY + 12);
      ctx.moveTo(dimX + 120, dimY - 12); ctx.lineTo(dimX + 120, dimY + 12);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '600 18px "Outfit", "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('38mm VENTILATED AIR CAVITY', dimX, dimY - 18);

      ctx.fillStyle = '#34d399';
      ctx.font = '500 14px "Inter", sans-serif';
      ctx.fillText('CHIMNEY CONVECTION : 0.42 m/s CONTINUOUS DISSIPATION', dimX, dimY + 28);

      ctx.restore();
    }

    ctx.restore();
  }

  /* -------------------------------------------------------------
   * MINIMAL ARCHITECTURAL TYPOGRAPHY
   * ------------------------------------------------------------- */
  renderTypography(ctx, t, w, h) {
    const stage = this.getCurrentStage(t);
    const stageDuration = 2.0;
    const stageProgress = (t - stage.start) / stageDuration; // 0.0 to 1.0

    // Smooth entry and exit opacity curve
    let textAlpha = 0;
    if (stageProgress < 0.2) {
      textAlpha = stageProgress / 0.2;
    } else if (stageProgress > 0.8) {
      textAlpha = (1.0 - stageProgress) / 0.2;
    } else {
      textAlpha = 1.0;
    }

    // Tracking expansion animation (letter-spacing feel via transform scale)
    const trackScale = 1.0 + stageProgress * 0.04;
    const titleY = h * 0.84;

    ctx.save();
    ctx.globalAlpha = textAlpha;

    // Subtitle Feature Details
    const subtitles = [
      'IMPERMEABLE CRUSHED STONE CORE · ZERO ABSORPTION',
      'CLASS A2-s1, d0 NON-COMBUSTIBLE FIRE BARRIER',
      'THERMAL EXPANSION 0.014 mm/m·K · EXTREME STABILITY',
      'CONTINUOUS CHIMNEY-EFFECT REAR CAVITY DISSIPATION',
    ];

    ctx.textAlign = 'center';

    // Top Category Header
    ctx.fillStyle = stage.color;
    ctx.font = '600 15px "Inter", sans-serif';
    ctx.letterSpacing = '0.35em';
    ctx.fillText(`FEATURE 0${stage.index + 1} / 04`, w / 2, titleY - 60);

    // Main Feature Title (Minimal White Architectural Typography)
    ctx.save();
    ctx.translate(w / 2, titleY);
    ctx.scale(trackScale, trackScale);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 48px "Outfit", "Inter", sans-serif';
    ctx.letterSpacing = '0.22em';
    ctx.fillText(stage.name, 0, 0);
    ctx.restore();

    // Architectural Subtitle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.font = '400 16px "Inter", sans-serif';
    ctx.letterSpacing = '0.15em';
    ctx.fillText(subtitles[stage.index], w / 2, titleY + 36);

    ctx.restore();
  }

  /* -------------------------------------------------------------
   * TECHNICAL HUD DATA OVERLAYS & TIMECODES
   * ------------------------------------------------------------- */
  renderTechnicalHUD(ctx, t, w, h) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '400 13px "JetBrains Mono", "Courier New", monospace';

    // Top Bar Left: Brand & Standard
    ctx.textAlign = 'left';
    ctx.fillText('STENI® ARCHITECTURAL ENVELOPE', 80, 85);
    ctx.fillText('SPEC: NORWEGIAN STONE COMPOSITE', 80, 105);

    // Top Bar Right: Real-time Precision Timecode (00:00:00:00)
    const mins = '00';
    const secs = String(Math.floor(t)).padStart(2, '0');
    const millis = String(Math.floor((t % 1) * 100)).padStart(2, '0');
    const frames = String(Math.floor((t % 1) * 60)).padStart(2, '0');
    const tcStr = `TC ${mins}:${secs}:${millis}:${frames}`;

    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(tcStr, w - 80, 85);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillText(`FPS: 60.0 │ DURATION: 08.00s`, w - 80, 105);

    // Corner Alignment Reticles
    const cross = 14;
    const corners = [
      { x: 70, y: 70 },
      { x: w - 70, y: 70 },
      { x: 70, y: h - 70 },
      { x: w - 70, y: h - 70 },
    ];

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    corners.forEach(c => {
      ctx.beginPath();
      ctx.moveTo(c.x - cross, c.y); ctx.lineTo(c.x + cross, c.y);
      ctx.moveTo(c.x, c.y - cross); ctx.lineTo(c.x, c.y + cross);
      ctx.stroke();
    });

    // 4-Stage Mini Timeline Progress Indicator (Bottom edge)
    const barY = h - 100;
    const barW = w - 160;
    const barX = 80;

    // Segment track
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(barX, barY, barW, 3);

    // Active progress fill
    const progressW = (t / this.duration) * barW;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(barX, barY, progressW, 3);

    // Segment divider ticks (at 2s, 4s, 6s)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let s = 1; s <= 3; s++) {
      const tickX = barX + (s / 4) * barW;
      ctx.fillRect(tickX - 1, barY - 4, 2, 11);
    }

    ctx.restore();
  }

  renderCinematicVignette(ctx, w, h) {
    const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, h * 0.72);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  /* -------------------------------------------------------------
   * UTILITIES & EASING
   * ------------------------------------------------------------- */
  calcStageWeight(t, start, end) {
    const fade = 0.28;
    if (t < start - fade || t > end + fade) return 0;
    if (t >= start && t <= end) return 1;
    if (t < start) return (t - (start - fade)) / fade;
    return (end + fade - t) / fade;
  }

  easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  /* -------------------------------------------------------------
   * VIDEO EXPORT RECORDING PIPELINE
   * ------------------------------------------------------------- */
  async recordAndExportVideo(onProgress, onComplete) {
    if (this.isRecording) return;
    this.isRecording = true;
    this.recordedChunks = [];

    const fps = 60;
    const totalFrames = Math.floor(this.duration * fps);
    const stream = this.canvas.captureStream(fps);

    // Pick best supported MIME type
    let mimeType = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm;codecs=vp8';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }
    }

    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 12000000, // 12 Mbps crystal clear HD
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.recordedChunks.push(e.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      this.isRecording = false;
      if (onComplete) onComplete(url, blob);
    };

    this.mediaRecorder.start();

    // Render each frame synchronously for zero frame-drop recording
    for (let frame = 0; frame <= totalFrames; frame++) {
      const frameTime = frame / fps;
      this.renderFrame(frameTime);
      if (onProgress) onProgress(frame / totalFrames);
      // Let event loop catch up for MediaRecorder chunk processing
      await new Promise(r => setTimeout(r, 16));
    }

    this.mediaRecorder.stop();
  }
}
