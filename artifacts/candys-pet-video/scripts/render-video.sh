#!/usr/bin/env bash
set -euo pipefail

# Deterministic 16:9 render for the Candy's Pet promo.
# The source frames are the verified captures from the running store app.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/downloads/candys-pet-instagram.mp4"
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FPS=25
DURATION=52.48

mkdir -p "$(dirname "$OUT")"

ffmpeg -hide_banner -loglevel error -y \
  -framerate "$FPS" -loop 1 -t 7.20 -i "$ROOT/public/site-captures/home-real.jpg" \
  -framerate "$FPS" -loop 1 -t 8.32 -i "$ROOT/public/site-captures/catalog-real.jpg" \
  -framerate "$FPS" -loop 1 -t 7.12 -i "$ROOT/public/site-captures/classic-real.jpg" \
  -framerate "$FPS" -loop 1 -t 6.88 -i "$ROOT/public/site-captures/bomber-real.jpg" \
  -framerate "$FPS" -loop 1 -t 8.16 -i "$ROOT/public/site-captures/unisex-real.jpg" \
  -framerate "$FPS" -loop 1 -t 7.52 -i "$ROOT/public/site-captures/size-guide-real.jpg" \
  -framerate "$FPS" -loop 1 -t 8.16 -i "$ROOT/public/site-captures/contact-real.jpg" \
  -i "$ROOT/public/audio/candys-pet-voiceover.mp3" \
  -filter_complex "
    [0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0007,1.07)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='CÓMODA · SEGURA · CON ESTILO':fontcolor=0xFAF8F4:fontsize=44:x=92:y=902:box=1:boxcolor=0x11131DCC:boxborderw=22,
      trim=duration=7.20,setpts=PTS-STARTPTS[v0];
    [1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0008,1.08)':x='(iw-iw/zoom)*(0.62-0.10*on/208)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='UNA TIENDA CHILENA · HECHA A MANO':fontcolor=0x11131D:fontsize=42:x=92:y=902:box=1:boxcolor=0xFAF8F4DD:boxborderw=22,
      trim=duration=8.32,setpts=PTS-STARTPTS[v1];
    [2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0009,1.09)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='PORTA MASCOTA TIPO BANANO CLÁSICO':fontcolor=0xFAF8F4:fontsize=40:x=92:y=902:box=1:boxcolor=0x11131DCC:boxborderw=22,
      trim=duration=7.12,setpts=PTS-STARTPTS[v2];
    [3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0009,1.09)':x='(iw-iw/zoom)*(0.28+0.18*on/172)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='PASEOS · VIAJES · TRANSPORTE PÚBLICO':fontcolor=0xFAF8F4:fontsize=40:x=92:y=902:box=1:boxcolor=0x11131DCC:boxborderw=22,
      trim=duration=6.88,setpts=PTS-STARTPTS[v3base];
    [4:v]scale=420:236,zoompan=z='min(zoom+0.0008,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=420x236:fps=${FPS},
      trim=duration=6.88,setpts=PTS-STARTPTS[u4];
    [v3base][u4]overlay=x=1410:y=88:shortest=1:format=auto[v3];
    [5:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0007,1.07)':x='(iw-iw/zoom)*(0.52+0.10*on/188)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='ELIGE MODELO · TALLA · COLOR':fontcolor=0x11131D:fontsize=42:x=92:y=902:box=1:boxcolor=0xFAF8F4DD:boxborderw=22,
      trim=duration=7.28,setpts=PTS-STARTPTS[v4];
    [6:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0006,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='VISITA CANDYSPET.CL · SIEMPRE CERCA':fontcolor=0xFAF8F4:fontsize=42:x=92:y=902:box=1:boxcolor=0x11131DCC:boxborderw=22,
      trim=duration=7.52,setpts=PTS-STARTPTS[v5];
    [4:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,
      zoompan=z='min(zoom+0.0006,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=${FPS},
      drawtext=fontfile=${FONT}:text='VISITA CANDYSPET.CL · SIEMPRE CERCA':fontcolor=0xFAF8F4:fontsize=42:x=92:y=902:box=1:boxcolor=0x11131DCC:boxborderw=22,
      trim=duration=8.16,setpts=PTS-STARTPTS[v6];
    [v0][v1][v2][v3][v4][v5][v6]concat=n=7:v=1:a=0,format=yuv420p[v]
  " \
  -map "[v]" -map 7:a:0 \
  -t "$DURATION" -r "$FPS" -c:v libx264 -preset medium -crf 18 \
  -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 \
  -movflags +faststart "$OUT"

echo "Rendered $OUT"
ffprobe -v error -show_entries format=duration:stream=codec_name,codec_type,width,height,pix_fmt \
  -of default=noprint_wrappers=1 "$OUT"