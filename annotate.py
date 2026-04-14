from PIL import Image, ImageDraw, ImageFont
import os

SOURCE = os.path.expanduser("~/Desktop/スクリーンショット 2026-04-13 22.01.39.png")
OUTPUT = os.path.expanduser("~/Desktop/提案資料/AI講義/CC講座/images/claude-code-ui-guide.png")


def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


font_regular = load_font("/System/Library/Fonts/ヒラギノ角ゴシック W4.ttc", 28)
font_bold = load_font("/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc", 34)
font_small = load_font("/System/Library/Fonts/ヒラギノ角ゴシック W4.ttc", 22)
font_num = load_font("/System/Library/Fonts/AppleSDGothicNeo.ttc", 28)

BG = (246, 247, 250)
PANEL = (255, 255, 255)
INK = (36, 52, 92)
SUB = (95, 108, 132)
ACCENT = (230, 76, 60)
BORDER = (228, 232, 240)

raw = Image.open(SOURCE).convert("RGB")

# Trim the empty right area a bit so the UI fills more of the frame.
crop = raw.crop((0, 0, 2640, 1964))

canvas = Image.new("RGB", (1800, 1080), BG)
draw = ImageDraw.Draw(canvas)

# Left screenshot card
card_x, card_y = 70, 110
card_w, card_h = 1170, 820
draw.rounded_rectangle(
    [card_x, card_y, card_x + card_w, card_y + card_h],
    radius=28,
    fill=PANEL,
    outline=BORDER,
    width=2,
)

screen_margin = 26
shot_w = card_w - screen_margin * 2
shot_h = card_h - screen_margin * 2
shot = crop.resize((shot_w, shot_h), Image.Resampling.LANCZOS)
canvas.paste(shot, (card_x + screen_margin, card_y + screen_margin))

sx = shot_w / crop.width
sy = shot_h / crop.height
ox = card_x + screen_margin
oy = card_y + screen_margin


def box(x1, y1, x2, y2):
    return [
        ox + int(x1 * sx),
        oy + int(y1 * sy),
        ox + int(x2 * sx),
        oy + int(y2 * sy),
    ]


def draw_focus(rect, label_no, anchor="tl"):
    x1, y1, x2, y2 = rect
    draw.rounded_rectangle(rect, radius=14, outline=ACCENT, width=5)

    if anchor == "tl":
        cx, cy = x1 + 20, y1 + 20
    elif anchor == "tr":
        cx, cy = x2 - 20, y1 + 20
    elif anchor == "bl":
        cx, cy = x1 + 20, y2 - 20
    else:
        cx, cy = x2 - 20, y2 - 20

    r = 18
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ACCENT)
    text = str(label_no)
    bbox = draw.textbbox((0, 0), text, font=font_num)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw / 2, cy - th / 2 - 2), text, fill="white", font=font_num)


focuses = [
    (box(0, 135, 310, 240), 1, "tr"),
    (box(1038, 1806, 1368, 1892), 2, "tl"),
    (box(1000, 1495, 2390, 1686), 3, "bl"),
    (box(2210, 1498, 2448, 1678), 4, "br"),
    (box(0, 700, 270, 1605), 5, "tr"),
    (box(1035, 1688, 1458, 1760), 6, "tl"),
]

for rect, no, anchor in focuses:
    draw_focus(rect, no, anchor)

# Right legend card
legend_x, legend_y = 1290, 110
legend_w, legend_h = 440, 820
draw.rounded_rectangle(
    [legend_x, legend_y, legend_x + legend_w, legend_y + legend_h],
    radius=28,
    fill=PANEL,
    outline=BORDER,
    width=2,
)

draw.text((legend_x + 34, legend_y + 34), "見るべき6か所", fill=INK, font=font_bold)
draw.text(
    (legend_x + 34, legend_y + 88),
    "最初は下の6点だけ押さえれば十分です。",
    fill=SUB,
    font=font_small,
)

items = [
    ("1", "新規セッション", "新しい作業を始める入口"),
    ("2", "作業フォルダ", "最初に対象フォルダを選ぶ"),
    ("3", "入力欄", "ここに日本語で依頼を書く"),
    ("4", "モデル切替", "必要に応じてモデルを選ぶ"),
    ("5", "セッション一覧", "過去の作業履歴を見返す"),
    ("6", "許可モード", "安全装置。権限の確認に使う"),
]

row_y = legend_y + 150
for num, title, desc in items:
    draw.rounded_rectangle(
        [legend_x + 34, row_y, legend_x + legend_w - 34, row_y + 92],
        radius=18,
        fill=(249, 250, 252),
        outline=BORDER,
        width=2,
    )
    cx = legend_x + 64
    cy = row_y + 32
    r = 18
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=ACCENT)
    bbox = draw.textbbox((0, 0), num, font=font_num)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text((cx - tw / 2, cy - th / 2 - 2), num, fill="white", font=font_num)
    draw.text((legend_x + 96, row_y + 12), title, fill=INK, font=font_regular)
    draw.text((legend_x + 96, row_y + 48), desc, fill=SUB, font=font_small)
    row_y += 108

draw.text(
    (70, 40),
    "Claude Code Desktop 画面ガイド",
    fill=INK,
    font=font_bold,
)
draw.text(
    (70, 77),
    "番号と右側の説明を見ながら、まずは画面の役割だけ押さえる",
    fill=SUB,
    font=font_small,
)

canvas.save(OUTPUT, quality=95)
print(f"Done: {canvas.size}")
