#!/bin/bash
# =============================================================
# Demo / Deliverable Test
# =============================================================
# This script extracts the audio from 23:00 to 27:00 of:
#   https://www.youtube.com/watch?v=108O_wuMvFw
#
# Prerequisites:
#   pip install yt-dlp
#   ffmpeg installed (apt install ffmpeg / brew install ffmpeg)
#
# Usage:
#   chmod +x run_demo.sh
#   ./run_demo.sh
# =============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== YouTube Audio Converter - Demo ==="
echo ""
echo "Extracting audio from 23:00 to 27:00..."
echo "Source: https://www.youtube.com/watch?v=108O_wuMvFw"
echo ""

python3 "$SCRIPT_DIR/yt_audio.py" \
    "https://www.youtube.com/watch?v=108O_wuMvFw" \
    --start 23:00 \
    --end 27:00 \
    --format mp3 \
    --quality 320

echo ""
echo "=== Files in output/ ==="
ls -lh "$SCRIPT_DIR/output/"
