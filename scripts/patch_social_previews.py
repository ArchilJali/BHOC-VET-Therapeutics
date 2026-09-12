from pathlib import Path
import re
from PIL import Image

# BHOC Veterinary homepage: text-only social preview.
p=Path('index.html')
s=p.read_text(encoding='utf-8')
for pat in [r'<meta property="og:image"[^>]*>',r'<meta property="og:image:secure_url"[^>]*>',r'<meta property="og:image:type"[^>]*>',r'<meta property="og:image:width"[^>]*>',r'<meta property="og:image:height"[^>]*>',r'<meta property="og:image:alt"[^>]*>',r'<meta name="twitter:image"[^>]*>',r'<meta name="twitter:image:alt"[^>]*>']:
    s=re.sub(pat,'',s)
s=s.replace('<meta name="twitter:card" content="summary_large_image">','<meta name="twitter:card" content="summary">')
s=re.sub(r'<meta property="og:title" content="[^"]*">','<meta property="og:title" content="BHOC Veterinary">',s,count=1)
s=re.sub(r'<meta property="og:description" content="[^"]*">','<meta property="og:description" content="Precision Oxygen Therapeutics for veterinary medicine, animal health and species-focused evidence.">',s,count=1)
s=re.sub(r'<meta name="twitter:title" content="[^"]*">','<meta name="twitter:title" content="BHOC Veterinary">',s,count=1)
s=re.sub(r'<meta name="twitter:description" content="[^"]*">','<meta name="twitter:description" content="Precision Oxygen Therapeutics for veterinary medicine, animal health and species-focused evidence.">',s,count=1)
p.write_text(s,encoding='utf-8')

# Initiative: preserve only the canonical Initiative logo as a small 240x240 thumbnail.
src=Image.open('assets/reference-initiative-mark.webp').convert('RGBA')
src.thumbnail((220,220),Image.Resampling.LANCZOS)
out=Image.new('RGBA',(240,240),(255,255,255,255))
out.alpha_composite(src,((240-src.width)//2,(240-src.height)//2))
out.convert('RGB').save('assets/initiative-social-logo.png','PNG',optimize=True)

p=Path('initiative/index.html')
s=p.read_text(encoding='utf-8')
for pat in [r'<meta property="og:image"[^>]*>',r'<meta property="og:image:secure_url"[^>]*>',r'<meta property="og:image:type"[^>]*>',r'<meta property="og:image:width"[^>]*>',r'<meta property="og:image:height"[^>]*>',r'<meta property="og:image:alt"[^>]*>',r'<meta name="twitter:image"[^>]*>',r'<meta name="twitter:image:alt"[^>]*>']:
    s=re.sub(pat,'',s)
s=s.replace('<meta name="twitter:card" content="summary_large_image">','<meta name="twitter:card" content="summary">')
anchor='<meta property="og:url" content="https://bhocvet.com/initiative/">'
img='\n  <meta property="og:image" content="https://bhocvet.com/assets/initiative-social-logo.png">\n  <meta property="og:image:secure_url" content="https://bhocvet.com/assets/initiative-social-logo.png">\n  <meta property="og:image:type" content="image/png">\n  <meta property="og:image:width" content="240">\n  <meta property="og:image:height" content="240">\n  <meta property="og:image:alt" content="BHOC Species & Biodiversity Protection Initiative logo">'
s=s.replace(anchor,anchor+img)
tw='<meta name="twitter:description" content="Connecting species protection, wildlife health, veterinary evidence and oxygen-delivery science.">'
s=s.replace(tw,tw+'\n  <meta name="twitter:image" content="https://bhocvet.com/assets/initiative-social-logo.png">\n  <meta name="twitter:image:alt" content="BHOC Species & Biodiversity Protection Initiative logo">')
p.write_text(s,encoding='utf-8')
