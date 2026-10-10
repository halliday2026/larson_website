# -*- coding: utf-8 -*-
"""
Generates public/og-image.jpg — a simple branded card for link-share
previews (LinkedIn, Facebook, Slack, SMS, etc.), since none of the site's
existing photos are both high-enough resolution and uncluttered enough to
work well at OG-card thumbnail size.

Not part of the site build; re-run only if the brand/copy changes.
Usage: python scripts/generate-og-image.py
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
NAVY = (11, 23, 53)  # --color-navy-900
ORANGE = (240, 95, 6)  # --color-orange-600
ORANGE_LIGHT = (242, 131, 33)  # --color-orange-500
WHITE = (255, 255, 255)
BODY = (199, 208, 210)  # matches the site's light body-on-navy tone

FONT_DIR = "C:/Windows/Fonts/"


def font(name, size):
    return ImageFont.truetype(FONT_DIR + name, size)


img = Image.new("RGB", (W, H), NAVY)
draw = ImageDraw.Draw(img)

# Thin orange accent bar along the top, matching the site's header border.
draw.rectangle([0, 0, W, 6], fill=ORANGE)

# Logo, composited with its own alpha.
logo = Image.open("src/assets/logo-header.png").convert("RGBA")
logo_h = 150
logo_w = int(logo.width * (logo_h / logo.height))
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
logo_x, logo_y = 90, 110
img.paste(logo, (logo_x, logo_y), logo)

text_x = logo_x + logo_w + 36
text_top = logo_y + 8

draw.text((text_x, text_top), "LARSON SAFETY", font=font("arialbd.ttf", 54), fill=WHITE)
draw.text(
    (text_x, text_top + 66),
    "LLC",
    font=font("arialbd.ttf", 54),
    fill=ORANGE_LIGHT,
)

# Eyebrow-style label, matching the site's orange uppercase eyebrow pattern.
draw.text(
    (90, 330),
    "OCCUPATIONAL SAFETY, ENVIRONMENTAL & REGULATORY COMPLIANCE",
    font=font("arialbd.ttf", 26),
    fill=ORANGE_LIGHT,
)

# Headline.
draw.text(
    (90, 380),
    "OSHA & EPA Compliance Consulting",
    font=font("arialbd.ttf", 48),
    fill=WHITE,
)
draw.text((90, 440), "for Northeast Florida Employers", font=font("arialbd.ttf", 48), fill=WHITE)

# Footer line.
draw.line([(90, 540), (W - 90, 540)], fill=(42, 59, 82), width=1)
draw.text(
    (90, 565),
    "30+ years EHS leadership  \u00b7  Board Certified Safety Professional (CSP)",
    font=font("arial.ttf", 24),
    fill=BODY,
)

img.save("public/og-image.jpg", quality=90)
print("Saved public/og-image.jpg", img.size)
