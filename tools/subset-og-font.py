#!/usr/bin/env python3
"""Regenerate public/fonts/NotoSansKR-OG.ttf (the font the OG card draws with).

Why this exists: satori (behind next/og) can't parse a *variable* font, and
shipping the full 10MB Noto Sans KR is wasteful when the card only ever draws
~40 distinct characters. This pins weight 700 and subsets to those glyphs —
10MB → ~30KB.

Run after changing any text in app/opengraph-image.tsx:

    pip install fonttools brotli
    python3 tools/subset-og-font.py path/to/NotoSansKR[wght].ttf

Source font: https://github.com/google/fonts/raw/main/ofl/notosanskr/NotoSansKR%5Bwght%5D.ttf
"""

import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

# every character the OG card can render — keep in sync with opengraph-image.tsx
TEXT = (
    "강지은데이터의가치를구현하는AI엔지니어경력년차Production프로젝트"
    "국제학술지게재편Currently shipping at KB증권LLM·RAG·MLOps0123456789+ "
)
OUT = Path("public/fonts/NotoSansKR-OG.ttf")


def main() -> None:
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "NotoSansKR[wght].ttf")
    font = TTFont(src)

    if "fvar" in font:  # variable → pin to Bold, satori needs a static instance
        font = instantiateVariableFont(font, {"wght": 700}, updateFontNames=True)
        src = Path("/tmp/noto-static.ttf")
        font.save(src)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    subset.main([str(src), f"--text={TEXT}", "--layout-features=*", f"--output-file={OUT}"])
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
