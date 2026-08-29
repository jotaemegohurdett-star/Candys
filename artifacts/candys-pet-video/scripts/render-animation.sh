#!/usr/bin/env bash
set -euo pipefail

# Dedicated export for the interactive Animation delivery.
# It keeps the 9:16 composition and voiceover, but is encoded as its own file
# so Animation, Instagram, and web are separate downloadable deliverables.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="$ROOT/public/downloads/candys-pet-instagram.mp4"
OUT="$ROOT/public/downloads/candys-pet-animation.mp4"

if [[ ! -f "$SOURCE" ]]; then
  echo "Missing source video: $SOURCE" >&2
  exit 1
fi

ffmpeg -hide_banner -loglevel error -y \
  -i "$SOURCE" \
  -vf "scale=1080:1920:flags=lanczos,eq=contrast=1.02:saturation=1.03" \
  -c:v libx264 -preset medium -crf 17 \
  -pix_fmt yuv420p \
  -c:a aac -b:a 224k -ar 48000 \
  -metadata title="Candy's Pet — Video Animation" \
  -movflags +faststart "$OUT"

echo "Rendered $OUT"
ffprobe -v error \
  -show_entries format=duration:stream=codec_name,codec_type,width,height,pix_fmt \
  -of default=noprint_wrappers=1 "$OUT"