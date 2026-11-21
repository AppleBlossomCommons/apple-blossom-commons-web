# Drone label marker

A small local tool for putting district labels on drone videos. You pause the video at a
few moments (keyframes) and click where each district is. The renderer follows each label
along the ground between keyframes with motion tracking and writes a new labeled video.

It is a working tool, not part of the website: nothing here is deployed.

## One-time setup

From the repo root (needs Python 3 and ffmpeg, both installed with Homebrew):

```bash
python3 -m venv scripts/drone-labels/.venv
```

```bash
scripts/drone-labels/.venv/bin/pip install --only-binary :all: -r scripts/drone-labels/requirements.txt
```

## Marking a video

1. Put the original video in `drone-videos/` (git-ignored, see `drone-videos/README.md`).
2. Start the marker. In Claude Code use the `drone-labels` launch config, or run:

   ```bash
   scripts/drone-labels/.venv/bin/python scripts/drone-labels/server.py
   ```

   Then open http://127.0.0.1:4410 and choose the video.
3. Pause where districts are clearly in view. Pick a label (or press 1–9, 0) and click
   where it sits. Drag pins to adjust. Select one and press Delete to remove it.
4. Move ahead a few seconds and press **Make keyframe here** (K). The labels carry over
   from the rough preview; drag each one onto the right spot.
5. Leave a label out of a keyframe and it fades out before that keyframe. Add a label on a
   keyframe and it fades in after the previous one.
6. Press **Render labeled video**. The result goes to `drone-videos/labeled/<name>-labeled.mp4`.

Tips:

- Keyframes every 3–6 seconds work well. Add more where the drone turns quickly.
- Put each pin on something with texture (a building, a tree, a field edge) rather than
  plain sky or a smooth road. Tracking holds better there.
- The faint pins between keyframes are only a straight-line preview. The render tracks
  the ground, so it is more accurate than the preview.
- Add your own labels (a road, a landmark) with the box under the label list. They are
  saved with that video's marks.

## Files

| Path | What it is |
|---|---|
| `marker.html` | The marking page |
| `server.py` | Local server: serves the page and videos, saves marks, starts renders. Listens on 127.0.0.1 only |
| `render.py` | Tracks the labels and writes the labeled video |
| `marks/<video>.json` | Your keyframes for each video (committed, so the work is kept) |
| `.venv/` | Python packages (git-ignored) |

The district names and colors come from `data/districts.json`. Every render carries the
line "Illustrative interpretation of the July 2026 masterplan. Not a survey or final
design." unless you untick it.

Render from the command line (options: `--height 2160` for 4K, `--out <file>`):

```bash
scripts/drone-labels/.venv/bin/python scripts/drone-labels/render.py scripts/drone-labels/marks/DJI_0194.MP4.json
```
