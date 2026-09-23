from pathlib import Path
import fitz

source = Path(".agents/outputs/candys-pet-organigrama-integraciones.pdf")
out = Path(".agents/outputs/rendered-integration-pdf")
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(source)
for index, page in enumerate(doc, start=1):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.45, 1.45), alpha=False)
    pix.save(out / f"page-{index:02d}.png")
print(f"rendered {len(doc)} pages to {out}")