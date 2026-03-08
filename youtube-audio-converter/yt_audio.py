#!/usr/bin/env python3
"""
YouTube Audio Converter
-----------------------
Extract high-quality audio from YouTube videos with optional timecode trimming.

Usage:
    python yt_audio.py <youtube_url> [options]

Examples:
    # Full video audio extraction
    python yt_audio.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

    # Extract from 1:30 to 4:00
    python yt_audio.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --start 1:30 --end 4:00

    # Choose format and quality
    python yt_audio.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -f mp3 -q 320
"""

import argparse
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path


DEFAULT_OUTPUT_DIR = Path(__file__).parent / "output"
SUPPORTED_FORMATS = ["mp3", "flac", "wav", "aac", "ogg", "m4a"]


def parse_timecode(tc: str) -> float:
    """Convert a timecode string (HH:MM:SS, MM:SS, or seconds) to seconds."""
    if tc is None:
        return None

    tc = tc.strip()

    # Pure number (seconds)
    if re.match(r"^\d+(\.\d+)?$", tc):
        return float(tc)

    parts = tc.split(":")
    if len(parts) == 2:
        m, s = parts
        return int(m) * 60 + float(s)
    elif len(parts) == 3:
        h, m, s = parts
        return int(h) * 3600 + int(m) * 60 + float(s)
    else:
        raise ValueError(f"Invalid timecode format: '{tc}'. Use HH:MM:SS, MM:SS, or seconds.")


def format_timecode(seconds: float) -> str:
    """Convert seconds to HH:MM:SS.ms string for ffmpeg."""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h:02d}:{m:02d}:{s:06.3f}"


def sanitize_filename(name: str) -> str:
    """Remove or replace characters that are problematic in filenames."""
    name = re.sub(r'[<>:"/\\|?*]', '_', name)
    name = re.sub(r'\s+', ' ', name).strip()
    return name[:200]  # limit length


def download_and_convert(
    url: str,
    start: str = None,
    end: str = None,
    output_format: str = "mp3",
    quality: int = 320,
    output_dir: str = None,
    output_name: str = None,
) -> str:
    """
    Download audio from a YouTube URL, optionally trim, and export.

    Args:
        url: YouTube video URL.
        start: Start timecode (HH:MM:SS, MM:SS, or seconds). None = beginning.
        end: End timecode (HH:MM:SS, MM:SS, or seconds). None = end of video.
        output_format: Audio format (mp3, flac, wav, aac, ogg, m4a).
        quality: Bitrate in kbps for lossy formats (128, 192, 256, 320).
        output_dir: Directory for the output file. Defaults to ./output.
        output_name: Custom output filename (without extension).

    Returns:
        Path to the output audio file.
    """
    if output_format not in SUPPORTED_FORMATS:
        raise ValueError(f"Unsupported format '{output_format}'. Choose from: {SUPPORTED_FORMATS}")

    output_dir = Path(output_dir) if output_dir else DEFAULT_OUTPUT_DIR
    output_dir.mkdir(parents=True, exist_ok=True)

    start_sec = parse_timecode(start)
    end_sec = parse_timecode(end)

    if start_sec is not None and end_sec is not None and start_sec >= end_sec:
        raise ValueError(f"Start time ({start}) must be before end time ({end}).")

    # Step 1: Get video info for the title
    print(f"[1/3] Fetching video info...")
    info_cmd = ["yt-dlp", "--print", "title", "--no-download", url]
    result = subprocess.run(info_cmd, capture_output=True, text=True, check=True)
    video_title = result.stdout.strip().split("\n")[0]
    print(f"       Title: {video_title}")

    if output_name:
        base_name = sanitize_filename(output_name)
    else:
        base_name = sanitize_filename(video_title)
        if start_sec is not None or end_sec is not None:
            s = start if start else "0:00"
            e = end if end else "end"
            base_name += f" [{s}-{e}]"

    output_path = output_dir / f"{base_name}.{output_format}"

    # Step 2: Download best audio
    print(f"[2/3] Downloading audio...")
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_audio = os.path.join(tmpdir, "audio.%(ext)s")

        dl_cmd = [
            "yt-dlp",
            "-f", "bestaudio/best",
            "-x",
            "--audio-format", "wav",  # intermediate lossless
            "--audio-quality", "0",
            "-o", tmp_audio,
            "--no-playlist",
        ]

        # Use yt-dlp's built-in download sections for efficiency when possible
        if start_sec is not None or end_sec is not None:
            section = "*"
            s = start_sec if start_sec is not None else 0
            e = end_sec if end_sec is not None else "inf"
            section = f"*{s}-{e}"
            dl_cmd += ["--download-sections", section]
            # Force keyframes for precise cuts
            dl_cmd += ["--force-keyframes-at-cuts"]

        dl_cmd.append(url)

        subprocess.run(dl_cmd, check=True)

        # Find the downloaded file
        tmp_files = list(Path(tmpdir).glob("audio.*"))
        if not tmp_files:
            raise RuntimeError("Download failed: no audio file produced.")
        downloaded = tmp_files[0]

        # Step 3: Convert to target format with quality settings
        print(f"[3/3] Converting to {output_format} ({quality}kbps)...")

        ffmpeg_cmd = ["ffmpeg", "-y", "-i", str(downloaded)]

        if output_format == "mp3":
            ffmpeg_cmd += ["-codec:a", "libmp3lame", "-b:a", f"{quality}k"]
        elif output_format == "flac":
            ffmpeg_cmd += ["-codec:a", "flac"]
        elif output_format == "wav":
            ffmpeg_cmd += ["-codec:a", "pcm_s16le"]
        elif output_format == "aac":
            ffmpeg_cmd += ["-codec:a", "aac", "-b:a", f"{quality}k"]
        elif output_format == "ogg":
            ffmpeg_cmd += ["-codec:a", "libvorbis", "-b:a", f"{quality}k"]
        elif output_format == "m4a":
            ffmpeg_cmd += ["-codec:a", "aac", "-b:a", f"{quality}k"]

        # Add metadata
        ffmpeg_cmd += [
            "-metadata", f"title={video_title}",
            "-metadata", "artist=YouTube Audio Extract",
        ]

        ffmpeg_cmd.append(str(output_path))

        subprocess.run(ffmpeg_cmd, check=True, capture_output=True)

    print(f"\nDone! Output: {output_path}")
    print(f"Size: {output_path.stat().st_size / (1024*1024):.1f} MB")
    return str(output_path)


def main():
    parser = argparse.ArgumentParser(
        description="Extract high-quality audio from YouTube videos with optional trimming.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s "https://youtube.com/watch?v=xxx"
  %(prog)s "https://youtube.com/watch?v=xxx" --start 1:30 --end 4:00
  %(prog)s "https://youtube.com/watch?v=xxx" -s 23:00 -e 27:00 -f flac
  %(prog)s "https://youtube.com/watch?v=xxx" -f mp3 -q 320 -o my_song
        """,
    )
    parser.add_argument("url", help="YouTube video URL")
    parser.add_argument("-s", "--start", default=None, help="Start timecode (HH:MM:SS, MM:SS, or seconds)")
    parser.add_argument("-e", "--end", default=None, help="End timecode (HH:MM:SS, MM:SS, or seconds)")
    parser.add_argument("-f", "--format", default="mp3", choices=SUPPORTED_FORMATS, help="Output audio format (default: mp3)")
    parser.add_argument("-q", "--quality", type=int, default=320, help="Bitrate in kbps for lossy formats (default: 320)")
    parser.add_argument("-d", "--output-dir", default=None, help="Output directory (default: ./output)")
    parser.add_argument("-o", "--output-name", default=None, help="Output filename (without extension)")

    args = parser.parse_args()

    try:
        output = download_and_convert(
            url=args.url,
            start=args.start,
            end=args.end,
            output_format=args.format,
            quality=args.quality,
            output_dir=args.output_dir,
            output_name=args.output_name,
        )
        return 0
    except Exception as e:
        print(f"\nError: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
