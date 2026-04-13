from PIL import Image, ImageDraw, ImageFont
import os

img = Image.open(os.path.expanduser("~/Desktop/スクリーンショット 2026-04-13 22.01.39.png"))

# Crop to just the app area (remove macOS menu bar etc) and add small padding
# Original: 3024x1964
crop_top = 60
img = img.crop((0, crop_top, img.width, img.height))

# Add minimal bottom padding for labels
pad = 200
padded = Image.new("RGB", (img.width, img.height + pad), (30, 30, 30))
padded.paste(img, (0, 0))
img = padded
draw = ImageDraw.Draw(img)
S = 6.0

# Adjust all Y coords for the crop offset
OFF = crop_top / S  # ~10

try:
    font_label = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 42)
    font_num = ImageFont.truetype("/System/Library/Fonts/AppleSDGothicNeo.ttc", 46)
except:
    font_label = ImageFont.load_default()
    font_num = ImageFont.load_default()

RED = (230, 60, 60)
WHITE = (255, 255, 255)

def sx(v): return int(v * S)
def sy(v): return int((v - OFF) * S)

def draw_box(x1, y1, x2, y2):
    bx1, by1, bx2, by2 = sx(x1), sy(y1), sx(x2), sy(y2)
    for i in range(5):
        draw.rectangle([bx1-i, by1-i, bx2+i, by2+i], outline=RED)

def draw_label(num, text, lx, ly, use_sy=True):
    px = sx(lx)
    py = sy(ly) if use_sy else int(ly * S)
    r = 22
    draw.ellipse([px-r, py-r, px+r, py+r], fill=RED)
    nw = 12 if num < 10 else 18
    draw.text((px-nw, py-18), str(num), fill=WHITE, font=font_num)
    tw = len(text) * 42 + 20
    draw.rectangle([px+28, py-16, px+28+tw, py+20], fill=RED)
    draw.text((px+36, py-16), text, fill=WHITE, font=font_label)

def draw_vline(x, y1, y2):
    px, py1, py2 = sx(x), sy(y1), sy(y2)
    draw.line([px, py1, px, py2], fill=RED, width=3)

# 1. 新規セッション
draw_box(5, 33, 100, 48)
draw_label(1, "新しい作業を始める", 105, 40)

# 5. セッション一覧
draw_box(3, 108, 150, 300)
draw_label(5, "過去のセッション一覧", 158, 195)

# 3. テキスト入力
draw_box(148, 322, 485, 342)
draw_label(3, "ここに日本語で指示を入力", 158, 312)

# 4. モデル選択
draw_box(432, 347, 486, 358)
draw_label(4, "モデル切替", 380, 312)

# 2. フォルダーを選択 - label below image
draw_box(138, 370, 275, 387)
# Use raw pixel Y for below-image labels
bottom_label_y = (img.height - pad + 80) / S
draw_label(2, "作業フォルダを選ぶ（最初に必要）", 90, bottom_label_y, use_sy=False)
# line from box to label
draw.line([sx(207), sy(388), sx(207), int(bottom_label_y*S)-26], fill=RED, width=3)

# 6. 許可モード
draw_box(220, 347, 308, 358)
draw_label(6, "許可モード（安全装置）", 295, bottom_label_y, use_sy=False)
draw.line([sx(265), sy(360), sx(265), int(bottom_label_y*S)-26], fill=RED, width=3)

output = os.path.expanduser("~/Desktop/提案資料/AI講義/CC講座/images/claude-code-ui-guide.png")
img.save(output, quality=95)
print(f"Done: {img.size}")
