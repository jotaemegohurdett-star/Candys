#!/usr/bin/env bash
set -euo pipefail

# Deterministic 16:9 website render for the Candy's Pet promo.
# The source images are verified real website captures; this is a finished
# landscape export, not a browser or screen recording.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/downloads/candys-pet-web.mp4"
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
    color=c=0x11131d:s=1920x1080:r=${FPS}:d=7.20[bg0];
    [0:v]scale=820:461,zoompan=z='min(zoom+0.00055,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot0];
    [bg0][shot0]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0xed176b@0.8:t=5,drawtext=fontfile=${FONT}:text='CANDYS PET':fontcolor=0xf5d06f:fontsize=28:x=106:y=98,drawtext=fontfile=${FONT}:text='TU MASCOTA':fontcolor=0xfaf8f4:fontsize=78:x=110:y=570,drawtext=fontfile=${FONT}:text='SIEMPRE CERCA.':fontcolor=0xed176b:fontsize=78:x=110:y=660,drawtext=fontfile=${FONT}:text='COMODA · SEGURA · CON ESTILO':fontcolor=0xfaf8f4@0.72:fontsize=24:x=114:y=800,drawtext=fontfile=${FONT}:text='01 / 07':fontcolor=0xed176b:fontsize=22:x=1740:y=990[v0];

    color=c=0xf6dce7:s=1920x1080:r=${FPS}:d=8.32[bg1];
    [1:v]scale=820:461,zoompan=z='min(zoom+0.0006,1.055)':x='(iw-iw/zoom)*0.55':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot1];
    [bg1][shot1]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0x39c7bd@0.8:t=5,drawtext=fontfile=${FONT}:text='01 / EL CATALOGO':fontcolor=0x11131d:fontsize=28:x=106:y=98,drawtext=fontfile=${FONT}:text='TRES MODELOS.':fontcolor=0x11131d:fontsize=76:x=110:y=570,drawtext=fontfile=${FONT}:text='PARA ELEGIR.':fontcolor=0xed176b:fontsize=76:x=110:y=660,drawtext=fontfile=${FONT}:text='CLASICO · BOMBER · UNISEX':fontcolor=0x11131d@0.66:fontsize=24:x=114:y=800,drawtext=fontfile=${FONT}:text='02 / 07':fontcolor=0xed176b:fontsize=22:x=1740:y=990[v1];

    color=c=0x11131d:s=1920x1080:r=${FPS}:d=7.12[bg2];
    [2:v]scale=820:461,zoompan=z='min(zoom+0.0007,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot2];
    [bg2][shot2]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0xf5d06f@0.85:t=5,drawtext=fontfile=${FONT}:text='02 / EL FAVORITO':fontcolor=0x39c7bd:fontsize=28:x=106:y=98,drawtext=fontfile=${FONT}:text='CERCA DE TI.':fontcolor=0xfaf8f4:fontsize=76:x=110:y=570,drawtext=fontfile=${FONT}:text='CADA DIA.':fontcolor=0xed176b:fontsize=76:x=110:y=660,drawtext=fontfile=${FONT}:text='UN ABRAZO PARA SALIR':fontcolor=0xfaf8f4@0.72:fontsize=24:x=114:y=800,drawtext=fontfile=${FONT}:text='03 / 07':fontcolor=0xf5d06f:fontsize=22:x=1740:y=990[v2];

    color=c=0xeaf5f3:s=1920x1080:r=${FPS}:d=6.88[bg3];
    [3:v]scale=820:461,zoompan=z='min(zoom+0.0007,1.06)':x='(iw-iw/zoom)*0.32':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot3];
    [bg3][shot3]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0xed176b@0.75:t=5,drawtext=fontfile=${FONT}:text='03 / DISTINTOS ESTILOS':fontcolor=0x11131d:fontsize=26:x=106:y=98,drawtext=fontfile=${FONT}:text='TU ESTILO.':fontcolor=0x11131d:fontsize=76:x=110:y=570,drawtext=fontfile=${FONT}:text='TU COLOR.':fontcolor=0xed176b:fontsize=76:x=110:y=660,drawtext=fontfile=${FONT}:text='DISENO QUE TE ACOMPANA':fontcolor=0x11131d@0.66:fontsize=24:x=114:y=800,drawtext=fontfile=${FONT}:text='04 / 07':fontcolor=0xed176b:fontsize=22:x=1740:y=990[v3];

    color=c=0xd8f0ee:s=1920x1080:r=${FPS}:d=7.28[bg4];
    [4:v]scale=820:461,zoompan=z='min(zoom+0.00055,1.05)':x='(iw-iw/zoom)*0.48':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot4];
    [bg4][shot4]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0x39c7bd@0.8:t=5,drawtext=fontfile=${FONT}:text='04 / ELIGE TU TALLA':fontcolor=0x11131d:fontsize=28:x=106:y=98,drawtext=fontfile=${FONT}:text='MIDE.':fontcolor=0x11131d:fontsize=84:x=110:y=570,drawtext=fontfile=${FONT}:text='ELIGE.':fontcolor=0xed176b:fontsize=84:x=110:y=670,drawtext=fontfile=${FONT}:text='LA GUIA TE ACOMPANA':fontcolor=0x11131d@0.66:fontsize=24:x=114:y=810,drawtext=fontfile=${FONT}:text='05 / 07':fontcolor=0xed176b:fontsize=22:x=1740:y=990[v4];

    color=c=0x25222e:s=1920x1080:r=${FPS}:d=7.52[bg5];
    [5:v]scale=820:461,zoompan=z='min(zoom+0.00055,1.05)':x='(iw-iw/zoom)*0.5':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot5];
    [bg5][shot5]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0xf5d06f@0.85:t=5,drawtext=fontfile=${FONT}:text='05 / COMPRA FACIL':fontcolor=0xf5d06f:fontsize=28:x=106:y=98,drawtext=fontfile=${FONT}:text='ELIGE.':fontcolor=0xfaf8f4:fontsize=84:x=110:y=570,drawtext=fontfile=${FONT}:text='CONSULTA.':fontcolor=0xed176b:fontsize=84:x=110:y=670,drawtext=fontfile=${FONT}:text='TE ACOMPANAMOS ANTES DE COMPRAR':fontcolor=0xfaf8f4@0.7:fontsize=23:x=114:y=810,drawtext=fontfile=${FONT}:text='06 / 07':fontcolor=0xf5d06f:fontsize=22:x=1740:y=990[v5];

    color=c=0x11131d:s=1920x1080:r=${FPS}:d=8.16[bg6];
    [6:v]scale=820:461,zoompan=z='min(zoom+0.0005,1.045)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=820x461:fps=${FPS}[shot6];
    [bg6][shot6]overlay=1000:270,drawbox=x=988:y=258:w=844:h=485:color=0xf8f7f4@0.98:t=12,drawbox=x=995:y=265:w=830:h=471:color=0xed176b@0.8:t=5,drawtext=fontfile=${FONT}:text='CANDYS PET':fontcolor=0xf5d06f:fontsize=28:x=106:y=98,drawtext=fontfile=${FONT}:text='LLEVA A TU':fontcolor=0xfaf8f4:fontsize=74:x=110:y=545,drawtext=fontfile=${FONT}:text='COMPANERO.':fontcolor=0xed176b:fontsize=74:x=110:y=635,drawtext=fontfile=${FONT}:text='SIEMPRE CERCA.':fontcolor=0xfaf8f4:fontsize=74:x=110:y=725,drawtext=fontfile=${FONT}:text='HECHO A MANO EN CHILE':fontcolor=0xfaf8f4@0.72:fontsize=24:x=114:y=850,drawtext=fontfile=${FONT}:text='07 / 07':fontcolor=0xed176b:fontsize=22:x=1740:y=990[v6];

    [v0][v1][v2][v3][v4][v5][v6]concat=n=7:v=1:a=0,format=yuv420p[v]
  " \
  -map "[v]" -map 7:a:0 \
  -t "$DURATION" -r "$FPS" -c:v libx264 -preset medium -crf 18 \
  -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 \
  -movflags +faststart "$OUT"

echo "Rendered $OUT"
ffprobe -v error -show_entries format=duration:stream=codec_name,codec_type,width,height,pix_fmt \
  -of default=noprint_wrappers=1 "$OUT"