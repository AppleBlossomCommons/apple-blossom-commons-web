"""Local server for the drone label marker (scripts/drone-labels).

Serves the marking page, the district list and the videos in drone-videos/, saves marks
to scripts/drone-labels/marks/, and starts renders. Listens on 127.0.0.1 only.

    scripts/drone-labels/.venv/bin/python scripts/drone-labels/server.py   (then open http://127.0.0.1:4410)
"""
import json
import mimetypes
import os
import re
import subprocess
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse, parse_qs

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
VIDEOS = os.path.join(ROOT, "drone-videos")
MARKS = os.path.join(HERE, "marks")
OUT = os.path.join(VIDEOS, "labeled")
PORT = int(os.environ.get("PORT", "4410"))
VIDEO_EXT = (".mp4", ".mov", ".m4v")

render_state = {"running": False, "progress": 0.0, "message": "", "output": None, "error": None}


def safe_name(name):
    """A plain file name (no folders), or None."""
    name = os.path.basename(unquote(name or ""))
    return name if re.fullmatch(r"[A-Za-z0-9._ -]+", name) and not name.startswith(".") else None


def probe(path):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height,r_frame_rate,codec_name:format=duration", "-of", "json", path],
        capture_output=True, text=True, check=True).stdout
    j = json.loads(out)
    s = j["streams"][0]
    num, den = s["r_frame_rate"].split("/")
    return {"width": s["width"], "height": s["height"], "fps": float(num) / float(den),
            "duration": float(j["format"]["duration"]), "codec": s.get("codec_name")}


def run_render(marks_path):
    render_state.update(running=True, progress=0.0, message="Starting", output=None, error=None)
    cmd = [sys.executable, os.path.join(HERE, "render.py"), marks_path, "--progress"]
    try:
        p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        tail = []
        for line in p.stdout:
            line = line.strip()
            if line.startswith("PROGRESS "):
                _, frac, *msg = line.split(" ")
                render_state.update(progress=float(frac), message=" ".join(msg))
            elif line.startswith("OUTPUT "):
                render_state["output"] = line[7:]
            else:
                tail = (tail + [line])[-15:]
        if p.wait() != 0:
            render_state["error"] = "\n".join(tail) or "Render failed"
    except Exception as e:  # report anything to the page
        render_state["error"] = str(e)
    render_state["running"] = False


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def send_json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_file(self, path):
        if not os.path.isfile(path):
            return self.send_error(404)
        size = os.path.getsize(path)
        ctype = mimetypes.guess_type(path)[0] or "application/octet-stream"
        start, end = 0, size - 1
        rng = self.headers.get("Range")
        m = re.match(r"bytes=(\d*)-(\d*)", rng or "")
        if m:
            if m.group(1):
                start = int(m.group(1))
                end = int(m.group(2)) if m.group(2) else size - 1
            else:
                start = size - int(m.group(2))
            end = min(end, size - 1)
            self.send_response(206)
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        else:
            self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        with open(path, "rb") as f:
            f.seek(start)
            left = end - start + 1
            try:
                while left > 0:
                    chunk = f.read(min(1 << 20, left))
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    left -= len(chunk)
            except (BrokenPipeError, ConnectionResetError):
                pass  # the browser cancels range requests while seeking

    def do_GET(self):
        url = urlparse(self.path)
        p = url.path
        q = parse_qs(url.query)
        if p in ("/", "/index.html"):
            return self.send_file(os.path.join(HERE, "marker.html"))
        if p == "/districts.json":
            return self.send_file(os.path.join(ROOT, "data", "districts.json"))
        if p == "/api/videos":
            vids = sorted(f for f in os.listdir(VIDEOS) if f.lower().endswith(VIDEO_EXT))
            return self.send_json(vids)
        if p == "/api/probe":
            name = safe_name(q.get("video", [""])[0])
            if not name or not os.path.isfile(os.path.join(VIDEOS, name)):
                return self.send_json({"error": "Video not found"}, 404)
            return self.send_json(probe(os.path.join(VIDEOS, name)))
        if p == "/api/marks":
            name = safe_name(q.get("video", [""])[0])
            path = os.path.join(MARKS, f"{name}.json") if name else None
            if not path or not os.path.isfile(path):
                return self.send_json(None)
            return self.send_file(path)
        if p == "/api/render-status":
            return self.send_json(render_state)
        if p.startswith("/video/"):
            name = safe_name(p[7:])
            return self.send_file(os.path.join(VIDEOS, name)) if name else self.send_error(404)
        if p.startswith("/output/"):
            name = safe_name(p[8:])
            return self.send_file(os.path.join(OUT, name)) if name else self.send_error(404)
        self.send_error(404)

    def do_POST(self):
        url = urlparse(self.path)
        q = parse_qs(url.query)
        name = safe_name(q.get("video", [""])[0])
        if not name:
            return self.send_json({"error": "Missing video name"}, 400)
        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length) if length else b""
        marks_path = os.path.join(MARKS, f"{name}.json")
        if url.path == "/api/marks":
            data = json.loads(body)
            os.makedirs(MARKS, exist_ok=True)
            with open(marks_path, "w") as f:
                json.dump(data, f, indent=1)
                f.write("\n")
            return self.send_json({"saved": os.path.relpath(marks_path, ROOT)})
        if url.path == "/api/render":
            if render_state["running"]:
                return self.send_json({"error": "A render is already running"}, 409)
            if not os.path.isfile(marks_path):
                return self.send_json({"error": "Save marks first"}, 400)
            threading.Thread(target=run_render, args=(marks_path,), daemon=True).start()
            return self.send_json({"started": True})
        self.send_error(404)


if __name__ == "__main__":
    os.makedirs(VIDEOS, exist_ok=True)
    print(f"Drone label marker: http://127.0.0.1:{PORT}", flush=True)
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
