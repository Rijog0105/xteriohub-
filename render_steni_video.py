import os
import math
import shutil
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont

def ease_in_out_cubic(x):
    return 4 * x * x * x if x < 0.5 else 1 - math.pow(-2 * x + 2, 3) / 2

def calc_stage_weight(t, start, end, fade=0.28):
    if t < start - fade or t > end + fade:
        return 0.0
    if start <= t <= end:
        return 1.0
    if t < start:
        return (t - (start - fade)) / fade
    return (end + fade - t) / fade

def render_steni_video():
    width = 720
    height = 1280
    fps = 30
    duration = 8.0
    total_frames = int(duration * fps) # 240 frames
    
    output_dir = r"d:\Profile bkup\Desktop\plan web\public\assets\Videos"
    os.makedirs(output_dir, exist_ok=True)
    out_mp4_path = os.path.join(output_dir, "steni_facade_performance_9x16.mp4")
    out_root_path = r"d:\Profile bkup\Desktop\plan web\STENI_Façade_Performance_9x16.mp4"
    out_brain_path = r"C:\Users\Administrator\.gemini\antigravity-ide\brain\139774ad-2125-4e3b-a09c-4264c7327fb5\steni_facade_performance_9x16.mp4"

    # Pre-generate base stone composite texture
    stone_tex = np.zeros((height, width, 3), dtype=np.uint8)
    stone_tex[:] = [24, 22, 20] # BGR
    noise = np.random.normal(0, 12, (height, width, 3)).astype(np.int16)
    stone_tex = np.clip(stone_tex.astype(np.int16) + noise, 12, 60).astype(np.uint8)
    specks = np.random.rand(height, width) > 0.99
    stone_tex[specks] = np.clip(stone_tex[specks] + 50, 0, 110)

    # Pre-calculate base background frame
    base_frame = np.zeros((height, width, 3), dtype=np.uint8)
    base_frame[:] = [12, 10, 8]
    # Structural wall
    cv2.rectangle(base_frame, (60, 100), (width - 60, height - 120), (18, 15, 13), -1)
    for y_line in range(140, height - 140, 110):
        cv2.line(base_frame, (60, y_line), (width - 60, y_line), (26, 22, 20), 1)

    # Pre-generate font
    font_paths = [r"C:\Windows\Fonts\arialbd.ttf", r"C:\Windows\Fonts\arial.ttf", r"C:\Windows\Fonts\segoeui.ttf"]
    font_file = next((p for p in font_paths if os.path.exists(p)), None)
    if font_file:
        font_large = ImageFont.truetype(font_file, 30)
        font_medium = ImageFont.truetype(font_file, 16)
        font_small = ImageFont.truetype(font_file, 13)
        font_mono = ImageFont.truetype(font_file, 11)
    else:
        font_large = font_medium = font_small = font_mono = ImageFont.load_default()

    # FourCC and VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(out_mp4_path, fourcc, fps, (width, height))

    # Simulation particles
    np.random.seed(42)
    num_drops = 120
    drops_x = np.random.uniform(0, width, num_drops)
    drops_y = np.random.uniform(0, height, num_drops)
    drops_speed = np.random.uniform(18, 26, num_drops)
    drops_len = np.random.uniform(25, 45, num_drops)
    
    num_beads = 50
    beads_x = np.random.uniform(130, width - 130, num_beads)
    beads_y = np.random.uniform(220, height - 260, num_beads)
    beads_r = np.random.uniform(3.0, 7.0, num_beads)
    beads_speed = np.random.uniform(0.3, 0.8, num_beads)

    num_embers = 60
    embers_x = np.random.uniform(150, width - 150, num_embers)
    embers_y = np.random.uniform(750, 1100, num_embers)
    embers_speed = np.random.uniform(3.0, 5.5, num_embers)
    embers_drift = np.random.uniform(-1.0, 1.0, num_embers)
    embers_size = np.random.uniform(2.0, 4.0, num_embers)

    num_air = 75
    air_x = np.random.uniform(300, 420, num_air)
    air_y = np.random.uniform(0, height, num_air)
    air_speed = np.random.uniform(5.0, 8.5, num_air)
    air_len = np.random.uniform(30, 60, num_air)

    stage_names = ["WATER RESISTANT", "FIRE RESISTANT", "THERMALLY STABLE", "VENTILATED FACADE"]
    stage_subtitles = [
        "IMPERMEABLE CRUSHED STONE CORE - ZERO ABSORPTION",
        "CLASS A2-s1, d0 NON-COMBUSTIBLE FIRE BARRIER",
        "THERMAL EXPANSION 0.014 mm/m.K - EXTREME STABILITY",
        "CONTINUOUS CHIMNEY-EFFECT REAR CAVITY DISSIPATION"
    ]
    stage_colors = [
        (56, 189, 248),  # Sky Blue
        (251, 146, 60),  # Warm Amber
        (168, 85, 247),  # FLIR Purple
        (52, 211, 153),  # Emerald
    ]

    print("Rendering 240 frames...")
    for frame_idx in range(total_frames):
        t = frame_idx / fps
        frame = base_frame.copy()
        
        ease4 = ease_in_out_cubic(min(1.0, max(0.0, (t - 5.8) / 1.5)))
        
        # Subframe rails
        r1_x = int(210 - ease4 * 25)
        r2_x = int(width - 210 + ease4 * 15)
        cv2.rectangle(frame, (r1_x - 10, 120), (r1_x + 10, height - 140), (45, 38, 32), -1)
        cv2.rectangle(frame, (r2_x - 10, 120), (r2_x + 10, height - 140), (45, 38, 32), -1)
        cv2.line(frame, (r1_x, 120), (r1_x, height - 140), (85, 75, 65), 1)
        cv2.line(frame, (r2_x, 120), (r2_x, height - 140), (85, 75, 65), 1)

        # STENI Main Façade Panel Coordinates
        p_left = int(110 - ease4 * 20)
        p_top = int(180)
        p_width = int(width - 220 - ease4 * 40)
        p_height = int(height - 360)
        p_right = p_left + p_width
        p_bottom = p_top + p_height
        
        # Draw Panel with Stone Composite Texture
        frame[p_top:p_bottom, p_left:p_right] = stone_tex[p_top:p_bottom, p_left:p_right]

        # Horizontal Reveal Joint
        mid_joint_y = int(p_top + p_height * 0.48)
        cv2.rectangle(frame, (p_left, mid_joint_y - 2), (p_right, mid_joint_y + 2), (6, 5, 4), -1)
        cv2.line(frame, (p_left, mid_joint_y + 3), (p_right, mid_joint_y + 3), (45, 40, 35), 1)

        # Anodized Bevel Border
        cv2.rectangle(frame, (p_left, p_top), (p_right, p_bottom), (60, 52, 45), 2)

        # Stage 1: Water
        w1 = calc_stage_weight(t, 0.0, 2.0)
        if w1 > 0.001:
            for i in range(num_drops):
                cur_y = int((drops_y[i] + t * drops_speed[i] * 50) % (height + 100) - 50)
                cur_x = int(drops_x[i] - cur_y * 0.12)
                l = int(drops_len[i])
                if 0 <= cur_x < width and 0 <= cur_y < height:
                    cv2.line(frame, (cur_x, cur_y), (int(cur_x - l * 0.12), cur_y + l), (int(240 * w1), int(200 * w1), int(150 * w1)), 1)
            for i in range(num_beads):
                drip = (t * beads_speed[i] * 30 + i * 8) % 140
                by = int(beads_y[i] + drip)
                bx = int(beads_x[i] + math.sin(t * 3 + i) * 1.5)
                r = int(beads_r[i])
                if p_top < by < p_bottom and p_left < bx < p_right:
                    cv2.circle(frame, (bx, by), r, (int(220 * w1), int(160 * w1), int(80 * w1)), -1)
                    cv2.circle(frame, (bx - int(r * 0.3), by - int(r * 0.3)), max(1, int(r * 0.3)), (int(255 * w1), int(255 * w1), int(255 * w1)), -1)
            if 0.3 <= t <= 1.8:
                diag_alpha = math.sin((t - 0.3) / 1.5 * math.pi) * w1
                cx, cy, cr = 360, 620, 36
                cv2.line(frame, (cx - 50, cy + cr), (cx + 50, cy + cr), (int(248 * diag_alpha), int(189 * diag_alpha), int(56 * diag_alpha)), 1)
                cv2.ellipse(frame, (cx, cy + cr - 12), (cr, cr), 0, 40, 140, (int(248 * diag_alpha), int(189 * diag_alpha), int(56 * diag_alpha)), 2)

        # Stage 2: Fire
        w2 = calc_stage_weight(t, 2.0, 4.0)
        if w2 > 0.001:
            flame_base_y = int(p_bottom - 35)
            for f in range(6):
                fx = int(220 + f * 55)
                f_time = (t - 2.0) * 8 + f * 1.8
                flame_h = int(100 + math.sin(f_time * 1.8) * 35)
                sway = int(math.sin(f_time * 2.5) * 15)
                pts = np.array([[fx - 20, flame_base_y], [fx + sway, flame_base_y - flame_h], [fx + 20, flame_base_y]], np.int32)
                cv2.fillPoly(frame, [pts], (int(30 * w2), int(140 * w2), int(255 * w2)))
            for i in range(num_embers):
                ember_prog = ((t - 2.0) * 1.4 + i * 0.08) % 1.0
                ey = int(embers_y[i] - ember_prog * 360)
                ex = int(embers_x[i] + math.sin(t * 4 + i) * 20)
                es = int(embers_size[i] * (1.0 - ember_prog * 0.4))
                if 0 <= ex < width and 0 <= ey < height:
                    e_alpha = math.sin(ember_prog * math.pi) * w2
                    cv2.circle(frame, (ex, ey), max(1, es), (int(40 * e_alpha), int(150 * e_alpha), int(255 * e_alpha)), -1)

        # Stage 3: Thermal
        w3 = calc_stage_weight(t, 4.0, 6.0)
        if w3 > 0.001:
            # Fast vectorized thermal tint
            xs = np.linspace(0, 1, p_width, dtype=np.float32)
            r = ((1.0 - xs) * 200 * w3).astype(np.uint8)
            g = (np.sin(xs * np.pi) * 130 * w3).astype(np.uint8)
            b = (xs * 220 * w3).astype(np.uint8)
            thermal_strip = np.stack([b, g, r], axis=1)[np.newaxis, :, :]
            frame[p_top:p_bottom, p_left:p_right] = cv2.addWeighted(
                frame[p_top:p_bottom, p_left:p_right], 1.0 - 0.4 * w3,
                np.repeat(thermal_strip, p_height, axis=0), 0.4 * w3, 0
            )

        # Stage 4: Ventilated Façade
        w4 = calc_stage_weight(t, 6.0, 8.0)
        if w4 > 0.001:
            for i in range(num_air):
                cur_y = int((air_y[i] - (t - 6.0) * air_speed[i] * 60) % (height + 100) - 50)
                cur_x = int(air_x[i] + math.sin(t * 3 + i) * 8)
                l = int(air_len[i])
                if 0 <= cur_x < width and 0 <= cur_y < height:
                    cv2.line(frame, (cur_x, cur_y + l), (cur_x, cur_y), (int(210 * w4), int(210 * w4), int(60 * w4)), 2)
                    cv2.circle(frame, (cur_x, cur_y), 2, (int(255 * w4), int(255 * w4), int(180 * w4)), -1)

        # PIL Typography & HUD Overlays
        pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(pil_img)

        # Header HUD
        draw.text((45, 45), "STENI(R) ARCHITECTURAL ENVELOPE", fill=(160, 160, 160), font=font_mono)
        draw.text((45, 60), "SPEC: NORWEGIAN STONE COMPOSITE", fill=(110, 110, 110), font=font_mono)
        
        mins = "00"
        secs = f"{int(t):02d}"
        millis = f"{int((t % 1) * 100):02d}"
        draw.text((width - 150, 45), f"TC {mins}:{secs}:{millis}", fill=(240, 240, 240), font=font_mono)
        draw.text((width - 150, 60), "FPS 30.0 / 08.00s", fill=(110, 110, 110), font=font_mono)

        stage_idx = min(3, int(t / 2.0))
        stage_t = (t % 2.0) / 2.0
        text_alpha = 1.0
        if stage_t < 0.18:
            text_alpha = stage_t / 0.18
        elif stage_t > 0.82:
            text_alpha = (1.0 - stage_t) / 0.18
            
        color_rgb = stage_colors[stage_idx]
        title_color = tuple(int(c * text_alpha) for c in (255, 255, 255))
        badge_color = tuple(int(c * text_alpha) for c in color_rgb)
        sub_color = tuple(int(170 * text_alpha) for _ in range(3))

        title_y = int(height * 0.85)

        phase_txt = f"FEATURE 0{stage_idx + 1} / 04"
        phase_bbox = draw.textbbox((0, 0), phase_txt, font=font_small)
        phase_w = phase_bbox[2] - phase_bbox[0]
        draw.text(((width - phase_w) // 2, title_y - 36), phase_txt, fill=badge_color, font=font_small)

        title_txt = stage_names[stage_idx]
        title_bbox = draw.textbbox((0, 0), title_txt, font=font_large)
        title_w = title_bbox[2] - title_bbox[0]
        draw.text(((width - title_w) // 2, title_y), title_txt, fill=title_color, font=font_large)

        sub_txt = stage_subtitles[stage_idx]
        sub_bbox = draw.textbbox((0, 0), sub_txt, font=font_mono)
        sub_w = sub_bbox[2] - sub_bbox[0]
        draw.text(((width - sub_w) // 2, title_y + 36), sub_txt, fill=sub_color, font=font_mono)

        # Progress bar
        bar_x, bar_y, bar_w = 50, height - 55, width - 100
        draw.rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 2], fill=(45, 45, 45))
        draw.rectangle([bar_x, bar_y, bar_x + int((t / duration) * bar_w), bar_y + 2], fill=(255, 255, 255))
        for s in range(1, 4):
            tx = bar_x + int((s / 4.0) * bar_w)
            draw.rectangle([tx - 1, bar_y - 3, tx + 1, bar_y + 5], fill=(90, 90, 90))

        final_frame = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        writer.write(final_frame)
        
    writer.release()
    print("SUCCESS: Video rendered successfully to:", out_mp4_path)
    
    shutil.copyfile(out_mp4_path, out_root_path)
    print("SUCCESS: Copied to workspace root:", out_root_path)
    try:
        shutil.copyfile(out_mp4_path, out_brain_path)
        print("SUCCESS: Copied to brain artifact directory:", out_brain_path)
    except Exception as e:
        print("Note on brain path:", e)

if __name__ == "__main__":
    render_steni_video()
