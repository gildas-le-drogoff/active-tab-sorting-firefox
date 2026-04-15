#!/usr/bin/env bash
set -euo pipefail

SVG="images/circle-sort.svg"
OUT="images"

mkdir -p "$OUT"

for size in 16 32 48 128 256 512; do
  rsvg-convert -w "$size" -h "$size" "$SVG" -o "${OUT}/icon-${size}.png"
done

echo "Done: $(ls -1 "$OUT"/icon-*.png)"

curl -o images/firefox-add-ons-install.svg "https://img.shields.io/badge/Firefox_Add--ons-Install-FF7139?logo=firefoxbrowser&logoColor=white"
