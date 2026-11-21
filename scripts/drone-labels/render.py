"""Render a drone video with district labels from the marks made in marker.html.

    scripts/drone-labels/.venv/bin/python scripts/drone-labels/render.py scripts/drone-labels/marks/DJI_0194.MP4.json

Between two keyframes, each label is tracked along the ground with optical flow, forward from
the first keyframe and backward from the second. The two tracks are blended so the label lands
exactly where it was placed on both keyframes. A label missing from the next keyframe fades out;
a label that first appears on a keyframe fades in. Output: drone-videos/labeled/<name>-labeled.mp4.
"""
import argparse
import json
import os
import subprocess
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
VIDEOS = os.path.join(ROOT, "drone-videos")
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"
DISCLAIMER = "Illustrative interpretation of the July 2026 masterplan. Not a survey or final design."
TRACK_W = 800          # tracking resolution (width)
FADE_S = 0.5           # seconds for fade in / out
EDGE = 0.03            # fade labels within this fraction of the frame edge

LK = dict(winSize=(21, 21), maxLevel=4, criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 0.01))


def progress(enabled, frac, msg):
    if enabled:
        print(f"PROGRESS {frac:.3f} {msg}", flush=True)


def ffmpeg_reader(path, w, h, fmt):
    vf = f"scale={w}:{h}:flags=area,format={fmt}"
    return subprocess.Popen(["ffmpeg", "-v", "error", "-i", path, "-vf", vf, "-f", "rawvideo", "-"],
                            stdout=subprocess.PIPE, bufsize=10 ** 8)


def read_frame(proc, nbytes):
    buf = proc.stdout.read(nbytes)
    return buf if len(buf) == nbytes else None


# ---------------------------------------------------------------- tracking
def features_around(gray, pt, radius):
    mask = np.zeros_like(gray)
    cv2.circle(mask, (int(pt[0]), int(pt[1])), int(radius), 255, -1)
    f = cv2.goodFeaturesToTrack(gray, maxCorners=40, qualityLevel=0.01, minDistance=5, mask=mask, blockSize=7)
    if f is None or len(f) < 6:
        g = np.mgrid[-radius:radius + 1:radius / 3, -radius:radius + 1:radius / 3].reshape(2, -1).T
        f = (np.asarray(pt) + g).astype(np.float32).reshape(-1, 1, 2)
    return f.astype(np.float32)


def track(frames, start_pt, radius):
    """Track one point through `frames` (list of gray images), starting at frames[0].
    Returns an array (len(frames), 2) with NaN once the point is lost."""
    h, w = frames[0].shape
    out = np.full((len(frames), 2), np.nan)
    pin = np.array(start_pt, np.float64)
    out[0] = pin
    pts = features_around(frames[0], pin, radius)
    for i in range(1, len(frames)):
        a, b = frames[i - 1], frames[i]
        nxt, st, _ = cv2.calcOpticalFlowPyrLK(a, b, pts, None, **LK)
        back, st2, _ = cv2.calcOpticalFlowPyrLK(b, a, nxt, None, **LK)
        fb = np.linalg.norm((back - pts).reshape(-1, 2), axis=1)
        good = (st.ravel() == 1) & (st2.ravel() == 1) & (fb < 1.0)
        if good.sum() < 4:
            break
        p0, p1 = pts[good].reshape(-1, 2), nxt[good].reshape(-1, 2)
        M, inl = cv2.estimateAffinePartial2D(p0, p1, method=cv2.RANSAC, ransacReprojThreshold=2.0)
        if M is None:
            pin = pin + np.median(p1 - p0, axis=0)
        else:
            pin = M[:, :2] @ pin + M[:, 2]
        if not (-0.05 * w < pin[0] < 1.05 * w and -0.05 * h < pin[1] < 1.05 * h):
            break
        out[i] = pin
        keep = p1 if inl is None else p1[inl.ravel() == 1]
        # top up features when they thin out or drift away from the pin
        if len(keep) < 15 or np.median(np.linalg.norm(keep - pin, axis=1)) > radius * 1.6:
            pts = features_around(b, pin, radius)
        else:
            pts = keep.reshape(-1, 1, 2).astype(np.float32)
    return out


def smoothstep(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def solve_segment(frames, f0, ka, kb, scale, fps, pos, alpha, total):
    """Fill pos/alpha for frames f0..f0+len(frames)-1 between keyframes ka (start) and kb (end).
    Either may be None (before the first / after the last keyframe)."""
    n = len(frames)
    radius = max(12, TRACK_W * 0.03)
    rev = None
    pa = ka["pins"] if ka else {}
    pb = kb["pins"] if kb else {}
    fade = max(1, int(round(FADE_S * fps)))
    t = np.arange(n) / max(1, n - 1)
    w = smoothstep(t)
    for pid in set(pa) | set(pb):
        fwd = bwd = None
        if pid in pa:
            fwd = track(frames, (pa[pid]["x"] * scale[0], pa[pid]["y"] * scale[1]), radius)
        if pid in pb:
            if rev is None:
                rev = frames[::-1]
            bwd = track(rev, (pb[pid]["x"] * scale[0], pb[pid]["y"] * scale[1]), radius)[::-1]
        if fwd is not None and bwd is not None:
            p = np.where(np.isnan(fwd), bwd, fwd)
            q = np.where(np.isnan(bwd), fwd, bwd)
            seg = (1 - w[:, None]) * p + w[:, None] * q
            a = np.ones(n)
        elif fwd is not None:
            seg = fwd
            a = np.ones(n)
            if kb is not None:  # leaving: fade out before the next keyframe
                a = np.clip((n - 1 - np.arange(n)) / fade, 0, 1)
        else:
            seg = bwd
            a = np.ones(n)
            if ka is not None:  # arriving: fade in after the previous keyframe
                a = np.clip(np.arange(n) / fade, 0, 1)
        a = np.where(np.isnan(seg[:, 0]), 0, a)
        sl = slice(f0, f0 + n)
        pos.setdefault(pid, np.full((total, 2), np.nan))
        alpha.setdefault(pid, np.zeros(total))
        old = alpha[pid][sl]
        take = a >= old
        pos[pid][sl][take] = seg[take] / scale
        alpha[pid][sl] = np.maximum(old, a)


# ---------------------------------------------------------------- drawing
def hex_rgb(c):
    c = c.lstrip("#")
    return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))


def smooth_series(x, k=5):
    """Centered moving average over valid (non-NaN) runs."""
    y = x.copy()
    valid = ~np.isnan(x[:, 0])
    idx = np.flatnonzero(valid)
    if len(idx) == 0:
        return y
    runs = np.split(idx, np.flatnonzero(np.diff(idx) > 1) + 1)
    ker = np.ones(k) / k
    for r in runs:
        if len(r) < k:
            continue
        for d in range(2):
            v = x[r, d]
            pad = np.pad(v, k // 2, mode="edge")
            y[r, d] = np.convolve(pad, ker, mode="valid")
    return y


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("marks")
    ap.add_argument("--out")
    ap.add_argument("--height", type=int, default=1080, help="output height (default 1080)")
    ap.add_argument("--crf", type=int, default=18)
    ap.add_argument("--progress", action="store_true")
    args = ap.parse_args()

    M = json.load(open(args.marks))
    src = os.path.join(VIDEOS, M["video"])
    meta = M["meta"]
    fps = meta["fps"]
    vw, vh = meta["width"], meta["height"]
    labels = {}
    for d in json.load(open(os.path.join(ROOT, "data", "districts.json")))["districts"]:
        labels[d["key"]] = (d["name"], d["color"])
    for c in M.get("custom", []):
        labels[c["id"]] = (c["label"], c.get("color", "#FFFFFF"))
    kfs = sorted(M["keyframes"], key=lambda k: k["f"])
    if not kfs:
        sys.exit("No keyframes in the marks file.")
    nominal = int(round(meta["duration"] * fps))

    # ---- pass 1: tracking at low resolution, one segment at a time
    tw = TRACK_W
    th = int(round(tw * vh / vw / 2)) * 2
    scale = np.array([tw, th], float)
    pos, alpha = {}, {}
    cap = nominal + 30  # room for a few more frames than the metadata says
    reader = ffmpeg_reader(src, tw, th, "gray")
    nb = tw * th
    bounds = [0] + [min(k["f"], nominal - 1) for k in kfs] + [None]
    segs = [(bounds[i], bounds[i + 1], kfs[i - 1] if i > 0 else None, kfs[i] if i < len(kfs) else None)
            for i in range(len(bounds) - 1)]
    buf, buf_start, fidx = [], 0, 0
    total = 0
    for s0, s1, ka, kb in segs:
        while s1 is None or fidx <= s1:
            raw = read_frame(reader, nb)
            if raw is None:
                break
            buf.append(np.frombuffer(raw, np.uint8).reshape(th, tw))
            fidx += 1
            progress(args.progress, 0.4 * fidx / nominal, "Tracking labels")
        frames = buf[s0 - buf_start:]
        if len(frames) > 1 or (frames and ka is None and kb is not None):
            solve_segment(frames, s0, ka, kb, scale, fps, pos, alpha, cap)
        total = fidx
        last = buf[-1] if buf else None
        buf, buf_start = ([last], fidx - 1) if last is not None else ([], fidx)
    reader.stdout.close()
    reader.wait()
    n_frames = total
    for pid in pos:
        pos[pid] = smooth_series(pos[pid][:n_frames])
        alpha[pid] = alpha[pid][:n_frames]
        x, y = pos[pid][:, 0], pos[pid][:, 1]
        edge = np.clip(np.minimum.reduce([x, 1 - x, y, 1 - y]) / EDGE, 0, 1)
        alpha[pid] = np.where(np.isnan(edge), 0, alpha[pid] * edge)

    # caption side (above/below), eased so it never jumps
    side = {}
    for pid in pos:
        target = np.where(np.nan_to_num(pos[pid][:, 1], nan=0.5) < 0.18, 1.0, 0.0)
        s = np.zeros(n_frames)
        for i in range(n_frames):
            s[i] = target[i] if i == 0 else s[i - 1] + (target[i] - s[i - 1]) * 0.15
        side[pid] = s

    # ---- pass 2: draw and encode
    H = args.height
    W = int(round(H * vw / vh / 2)) * 2
    k = H / 1080
    fb = ImageFont.truetype(FONT_BOLD, int(30 * k))
    fr = ImageFont.truetype(FONT_REG, int(20 * k))
    out = args.out or os.path.join(VIDEOS, "labeled", os.path.splitext(M["video"])[0] + "-labeled.mp4")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    reader = ffmpeg_reader(src, W, H, "rgb24")
    writer = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
         "-r", f"{fps}", "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", str(args.crf),
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], stdin=subprocess.PIPE)
    measure = ImageDraw.Draw(Image.new("RGB", (1, 1)))
    widths = {pid: measure.textlength(labels.get(pid, (pid, ""))[0], font=fb) for pid in pos}
    for i in range(n_frames):
        raw = read_frame(reader, W * H * 3)
        if raw is None:
            break
        img = Image.frombuffer("RGB", (W, H), raw).convert("RGBA")
        ov = Image.new("RGBA", (W, H))
        dr = ImageDraw.Draw(ov)
        order = sorted(pos, key=lambda p: -np.nan_to_num(pos[p][i, 1]))  # nearer (lower) labels drawn last
        for pid in reversed(order):
            a = alpha[pid][i]
            if a <= 0.01 or np.isnan(pos[pid][i, 0]):
                continue
            name, color = labels.get(pid, (pid, "#FFFFFF"))
            rgb = hex_rgb(color)
            x, y = pos[pid][i, 0] * W, pos[pid][i, 1] * H
            tw_ = widths[pid]
            cw, ch = tw_ + 44 * k, 48 * k
            gap = 46 * k
            sd = side[pid][i]
            cy_top = (y - gap - ch) * (1 - sd) + (y + gap) * sd
            cx = min(max(x - cw / 2, 16 * k), W - cw - 16 * k)
            A = int(255 * a)
            stem_end = cy_top + ch if sd < 0.5 else cy_top
            dr.line([(x, y), (min(max(x, cx + 8 * k), cx + cw - 8 * k), stem_end)], fill=(255, 255, 255, int(230 * a)), width=max(2, int(2 * k)))
            dr.rounded_rectangle([cx, cy_top, cx + cw, cy_top + ch], radius=int(6 * k), fill=(20, 24, 22, int(200 * a)))
            dr.rounded_rectangle([cx, cy_top, cx + 8 * k, cy_top + ch], radius=int(3 * k), fill=rgb + (A,))
            dr.text((cx + 24 * k, cy_top + 8 * k), name, font=fb, fill=(255, 255, 255, A))
            r = 9 * k
            dr.ellipse([x - r - 2 * k, y - r - 2 * k, x + r + 2 * k, y + r + 2 * k], fill=(255, 255, 255, A))
            dr.ellipse([x - r, y - r, x + r, y + r], fill=rgb + (A,))
        if M.get("options", {}).get("disclaimer", True):
            dr.rectangle([0, H - 44 * k, W, H], fill=(20, 24, 22, 165))
            dr.text((24 * k, H - 33 * k), DISCLAIMER, font=fr, fill=(240, 240, 235, 255))
        writer.stdin.write(Image.alpha_composite(img, ov).convert("RGB").tobytes())
        progress(args.progress, 0.4 + 0.6 * (i + 1) / n_frames, "Drawing and encoding")
    writer.stdin.close()
    writer.wait()
    reader.stdout.close()
    reader.wait()
    if writer.returncode != 0:
        sys.exit("ffmpeg failed while encoding")
    print(f"OUTPUT {out}", flush=True)


if __name__ == "__main__":
    main()
