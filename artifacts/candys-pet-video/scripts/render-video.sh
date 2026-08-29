#!/usr/bin/env bash
set -euo pipefail

# Deterministic 9:16 Instagram render for the Candy's Pet promo.
# Every beat uses a verified real website capture as a readable framed site card.
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
  -framerate "$FPS" -loop 1 -t 7.28 -i "$ROOT/public/site-captures/size-guide-real.jpg" \
  -framerate "$FPS" -loop 1 -t 7.52 -i "$ROOT/public/site-captures/contact-real.jpg" \
  -framerate "$FPS" -loop 1 -t 8.16 -i "$ROOT/public/site-captures/unisex-real.jpg" \
  -i "$ROOT/public/audio/candys-pet-voiceover.mp3" \
  -filter_complex "
    color=c=0x11131d:s=1080x1920:r=${FPS}:d=7.20[bg0];
    [0:v]scale=900:506,zoompan=z='min(zoom+0.0007,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card0];
    [bg0][card0]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0xed176b@0.75:t=5,drawtext=fontfile=${FONT}:text='CANDYS PET':fontcolor=0xf5d06f:fontsize=34:x=60:y=94,drawtext=fontfile=${FONT}:text='TU MASCOTA':fontcolor=0xfaf8f4:fontsize=72:x=60:y=1390,drawtext=fontfile=${FONT}:text='SIEMPRE CERCA':fontcolor=0xed176b:fontsize=72:x=60:y=1480[v0];

    color=c=0xf6dce7:s=1080x1920:r=${FPS}:d=8.32[bg1];
    [1:v]scale=900:506,zoompan=z='min(zoom+0.0008,1.07)':x='(iw-iw/zoom)*0.55':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card1];
    [bg1][card1]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0x39c7bd@0.8:t=5,drawtext=fontfile=${FONT}:text='01 / EL CATALOGO':fontcolor=0x11131d:fontsize=32:x=60:y=94,drawtext=fontfile=${FONT}:text='TRES MODELOS':fontcolor=0x11131d:fontsize=68:x=60:y=1390,drawtext=fontfile=${FONT}:text='PARA ELEGIR':fontcolor=0xed176b:fontsize=68:x=60:y=1475[v1];

    color=c=0x11131d:s=1080x1920:r=${FPS}:d=7.12[bg2];
    [2:v]scale=900:506,zoompan=z='min(zoom+0.0009,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card2];
    [bg2][card2]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0xf5d06f@0.85:t=5,drawtext=fontfile=${FONT}:text='02 / EL FAVORITO':fontcolor=0x39c7bd:fontsize=32:x=60:y=94,drawtext=fontfile=${FONT}:text='CERCA DE TI':fontcolor=0xfaf8f4:fontsize=74:x=60:y=1390,drawtext=fontfile=${FONT}:text='CADA DIA':fontcolor=0xed176b:fontsize=74:x=60:y=1480[v2];

    color=c=0xeaf5f3:s=1080x1920:r=${FPS}:d=6.88[bg3];
    [3:v]scale=900:506,zoompan=z='min(zoom+0.0009,1.08)':x='(iw-iw/zoom)*0.32':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card3];
    [bg3][card3]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0xed176b@0.75:t=5,drawtext=fontfile=${FONT}:text='03 / DISTINTOS ESTILOS':fontcolor=0x11131d:fontsize=30:x=60:y=94,drawtext=fontfile=${FONT}:text='TU ESTILO':fontcolor=0x11131d:fontsize=74:x=60:y=1390,drawtext=fontfile=${FONT}:text='TU COLOR':fontcolor=0xed176b:fontsize=74:x=60:y=1480[v3];

    color=c=0xd8f0ee:s=1080x1920:r=${FPS}:d=7.28[bg4];
    [4:v]scale=900:506,zoompan=z='min(zoom+0.0007,1.06)':x='(iw-iw/zoom)*0.48':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card4];
    [bg4][card4]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0x39c7bd@0.8:t=5,drawtext=fontfile=${FONT}:text='04 / ELIGE TU TALLA':fontcolor=0x11131d:fontsize=32:x=60:y=94,drawtext=fontfile=${FONT}:text='MIDE':fontcolor=0x11131d:fontsize=78:x=60:y=1390,drawtext=fontfile=${FONT}:text='ELIGE':fontcolor=0xed176b:fontsize=78:x=60:y=1485[v4];

    color=c=0x25222e:s=1080x1920:r=${FPS}:d=7.52[bg5];
    [5:v]scale=900:506,zoompan=z='min(zoom+0.0007,1.06)':x='(iw-iw/zoom)*0.5':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card5];
    [bg5][card5]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0xf5d06f@0.85:t=5,drawtext=fontfile=${FONT}:text='05 / COMPRA FACIL':fontcolor=0xf5d06f:fontsize=32:x=60:y=94,drawtext=fontfile=${FONT}:text='ELIGE':fontcolor=0xfaf8f4:fontsize=78:x=60:y=1390,drawtext=fontfile=${FONT}:text='CONSULTA':fontcolor=0xed176b:fontsize=78:x=60:y=1485[v5];

    color=c=0x11131d:s=1080x1920:r=${FPS}:d=8.16[bg6];
    [6:v]scale=900:506,zoompan=z='min(zoom+0.0006,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS},pad=960:600:30:47:color=0xf8f7f4[card6];
    [bg6][card6]overlay=60:265,drawbox=x=60:y=265:w=960:h=600:color=0xed176b@0.8:t=5,drawtext=fontfile=${FONT}:text='CANDYS PET':fontcolor=0xf5d06f:fontsize=34:x=60:y=94,drawtext=fontfile=${FONT}:text='LLEVA A TU':fontcolor=0xfaf8f4:fontsize=70:x=60:y=1325,drawtext=fontfile=${FONT}:text='COMPANERO':fontcolor=0xed176b:fontsize=70:x=60:y=1415,drawtext=fontfile=${FONT}:text='SIEMPRE CERCA':fontcolor=0xfaf8f4:fontsize=70:x=60:y=1505[v6];

    [v0][v1][v2][v3][v4][v5][v6]concat=n=7:v=1:a=0,format=yuv420p[v]
  " \
  -map "[v]" -map 7:a:0 \
  -t "$DURATION" -r "$FPS" -c:v libx264 -preset medium -crf 18 \
  -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 \
  -movflags +faststart "$OUT"

echo "Rendered $OUT"
ffprobe -v error -show_entries format=duration:stream=codec_name,codec_type,width,height,pix_fmt \
  -of default=noprint_wrappers=1 "$OUT"