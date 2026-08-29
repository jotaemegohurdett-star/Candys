#!/usr/bin/env bash
set -euo pipefail

# Dedicated 9:16 export for the interactive Animation delivery.
# This is rendered from the seven animated scene captures, not from either
# of the other finished MP4 exports.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/downloads/candys-pet-animation.mp4"
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
    [0:v]scale=900:506,zoompan=z='min(zoom+0.001,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot0];
    [bg0][shot0]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0xed176b@.8:t=5,drawtext=fontfile=${FONT}:text='ANIMACION CANDYS PET':fontcolor=0xf5d06f:fontsize=30:x=82:y=100,drawtext=fontfile=${FONT}:text='TU MASCOTA':fontcolor=0xfaf8f4:fontsize=86:x=82:y=1120,drawtext=fontfile=${FONT}:text='SIEMPRE CERCA':fontcolor=0xed176b:fontsize=86:x=82:y=1230,drawtext=fontfile=${FONT}:text='Una nueva forma de salir':fontcolor=0xfaf8f4@.72:fontsize=31:x=84:y=1435,drawtext=fontfile=${FONT}:text='01 / 07':fontcolor=0xf5d06f:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=6.6:d=.6[v0];

    color=c=0xf6dce7:s=1080x1920:r=${FPS}:d=8.32[bg1];
    [1:v]scale=900:506,zoompan=z='min(zoom+0.001,1.09)':x='(iw-iw/zoom)*.55':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot1];
    [bg1][shot1]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0x39c7bd@.8:t=5,drawtext=fontfile=${FONT}:text='01 / EL CATALOGO':fontcolor=0x11131d:fontsize=30:x=82:y=100,drawtext=fontfile=${FONT}:text='TRES MODELOS':fontcolor=0x11131d:fontsize=82:x=82:y=1120,drawtext=fontfile=${FONT}:text='PARA ELEGIR':fontcolor=0xed176b:fontsize=82:x=82:y=1230,drawtext=fontfile=${FONT}:text='Clasico  ·  Bomber  ·  Unisex':fontcolor=0x11131d@.72:fontsize=31:x=84:y=1435,drawtext=fontfile=${FONT}:text='02 / 07':fontcolor=0xed176b:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=7.72:d=.6[v1];

    color=c=0x11131d:s=1080x1920:r=${FPS}:d=7.12[bg2];
    [2:v]scale=900:506,zoompan=z='min(zoom+0.001,1.1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot2];
    [bg2][shot2]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0xf5d06f@.85:t=5,drawtext=fontfile=${FONT}:text='02 / EL FAVORITO':fontcolor=0x39c7bd:fontsize=30:x=82:y=100,drawtext=fontfile=${FONT}:text='CERCA DE TI':fontcolor=0xfaf8f4:fontsize=86:x=82:y=1120,drawtext=fontfile=${FONT}:text='CADA DIA':fontcolor=0xed176b:fontsize=86:x=82:y=1230,drawtext=fontfile=${FONT}:text='Manos libres y seguro':fontcolor=0xfaf8f4@.72:fontsize=31:x=84:y=1435,drawtext=fontfile=${FONT}:text='03 / 07':fontcolor=0xf5d06f:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=6.52:d=.6[v2];

    color=c=0xeaf5f3:s=1080x1920:r=${FPS}:d=6.88[bg3];
    [3:v]scale=900:506,zoompan=z='min(zoom+0.001,1.1)':x='(iw-iw/zoom)*.32':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot3];
    [bg3][shot3]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0xed176b@.8:t=5,drawtext=fontfile=${FONT}:text='03 / DISTINTOS ESTILOS':fontcolor=0x11131d:fontsize=28:x=82:y=100,drawtext=fontfile=${FONT}:text='TU ESTILO':fontcolor=0x11131d:fontsize=86:x=82:y=1120,drawtext=fontfile=${FONT}:text='TU COLOR':fontcolor=0xed176b:fontsize=86:x=82:y=1230,drawtext=fontfile=${FONT}:text='Disenos que te acompañan':fontcolor=0x11131d@.72:fontsize=31:x=84:y=1435,drawtext=fontfile=${FONT}:text='04 / 07':fontcolor=0xed176b:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=6.28:d=.6[v3];

    color=c=0xd8f0ee:s=1080x1920:r=${FPS}:d=7.28[bg4];
    [4:v]scale=900:506,zoompan=z='min(zoom+0.001,1.08)':x='(iw-iw/zoom)*.48':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot4];
    [bg4][shot4]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0x39c7bd@.8:t=5,drawtext=fontfile=${FONT}:text='04 / ELIGE TU TALLA':fontcolor=0x11131d:fontsize=30:x=82:y=100,drawtext=fontfile=${FONT}:text='MIDE':fontcolor=0x11131d:fontsize=92:x=82:y=1120,drawtext=fontfile=${FONT}:text='ELIGE':fontcolor=0xed176b:fontsize=92:x=82:y=1230,drawtext=fontfile=${FONT}:text='La guia te acompana':fontcolor=0x11131d@.72:fontsize=31:x=84:y=1435,drawtext=fontfile=${FONT}:text='05 / 07':fontcolor=0xed176b:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=6.68:d=.6[v4];

    color=c=0x25222e:s=1080x1920:r=${FPS}:d=7.52[bg5];
    [5:v]scale=900:506,zoompan=z='min(zoom+0.001,1.08)':x='(iw-iw/zoom)*.5':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot5];
    [bg5][shot5]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0xf5d06f@.85:t=5,drawtext=fontfile=${FONT}:text='05 / COMPRA FACIL':fontcolor=0xf5d06f:fontsize=30:x=82:y=100,drawtext=fontfile=${FONT}:text='ELIGE':fontcolor=0xfaf8f4:fontsize=92:x=82:y=1120,drawtext=fontfile=${FONT}:text='CONSULTA':fontcolor=0xed176b:fontsize=92:x=82:y=1230,drawtext=fontfile=${FONT}:text='Te acompañamos por WhatsApp':fontcolor=0xfaf8f4@.72:fontsize=30:x=84:y=1435,drawtext=fontfile=${FONT}:text='06 / 07':fontcolor=0xf5d06f:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=6.92:d=.6[v5];

    color=c=0x11131d:s=1080x1920:r=${FPS}:d=8.16[bg6];
    [6:v]scale=900:506,zoompan=z='min(zoom+0.001,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=900x506:fps=${FPS}[shot6];
    [bg6][shot6]overlay=90:255,drawbox=x=78:y=243:w=924:h=530:color=0xed176b@.8:t=5,drawtext=fontfile=${FONT}:text='CANDYS PET':fontcolor=0xf5d06f:fontsize=30:x=82:y=100,drawtext=fontfile=${FONT}:text='LLEVA A TU':fontcolor=0xfaf8f4:fontsize=84:x=82:y=1090,drawtext=fontfile=${FONT}:text='COMPANERO':fontcolor=0xed176b:fontsize=84:x=82:y=1200,drawtext=fontfile=${FONT}:text='SIEMPRE CERCA':fontcolor=0xfaf8f4:fontsize=84:x=82:y=1310,drawtext=fontfile=${FONT}:text='Hecho a mano en Chile':fontcolor=0xfaf8f4@.72:fontsize=31:x=84:y=1515,drawtext=fontfile=${FONT}:text='07 / 07':fontcolor=0xed176b:fontsize=26:x=900:y=1790,fade=t=in:st=0:d=.6,fade=t=out:st=7.56:d=.6[v6];

    [v0][v1][v2][v3][v4][v5][v6]concat=n=7:v=1:a=0,format=yuv420p[v]
  " \
  -map "[v]" -map 7:a:0 \
  -t "$DURATION" -r "$FPS" -c:v libx264 -preset medium -crf 18 \
  -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 \
  -metadata title="Candy's Pet — Video Animation 9:16" \
  -movflags +faststart "$OUT"

echo "Rendered $OUT"
ffprobe -v error \
  -show_entries format=duration:stream=codec_name,codec_type,width,height,pix_fmt \
  -of default=noprint_wrappers=1 "$OUT"