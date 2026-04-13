const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_16x9";
pres.author = "Claude Code";
pres.title = "Claude Code 講座";

// Colors
const C = {
  navy: "2B3A67", yellow: "FFD139", blue: "4A8FE7",
  blueLight: "EBF3FE", grayBg: "F7F8FA", grayText: "64748B",
  body: "475569", border: "E8ECF1", white: "FFFFFF"
};
const FONT = "Yu Gothic";

// Helpers
function addTitle(slide, text, y = 0.4) {
  slide.addText(text, { x: 0.6, y, w: 8.8, h: 0.6, fontSize: 28, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: y + 0.6, w: 8.8, h: 0.05, fill: { color: C.yellow } });
}

function addBody(slide, items, startY = 1.2) {
  const textArr = items.map((item, i) => ({
    text: item.text,
    options: {
      bullet: item.bullet !== false,
      fontSize: item.fontSize || 16,
      fontFace: FONT,
      color: item.color || C.body,
      bold: item.bold || false,
      breakLine: i < items.length - 1,
      indentLevel: item.indent || 0
    }
  }));
  slide.addText(textArr, { x: 0.6, y: startY, w: 8.8, h: 4, valign: "top" });
}

function addQuote(slide, text, y = 4.2) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h: 0.7, fill: { color: C.grayBg } });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 0.06, h: 0.7, fill: { color: C.yellow } });
  slide.addText(text, { x: 0.8, y, w: 8.4, h: 0.7, fontSize: 14, fontFace: FONT, color: C.navy, bold: true, valign: "middle" });
}

function addTable(slide, headers, rows, opts = {}) {
  const y = opts.y || 1.2;
  const tableRows = [];
  tableRows.push(headers.map(h => ({ text: h, options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 13, fontFace: FONT, align: "center" } })));
  rows.forEach((row, i) => {
    tableRows.push(row.map((cell, ci) => ({
      text: cell,
      options: {
        fill: { color: i % 2 === 0 ? C.grayBg : C.white },
        color: ci === 0 ? C.navy : C.body,
        bold: ci === 0,
        fontSize: 12,
        fontFace: FONT,
        align: ci === 0 ? "left" : "center"
      }
    })));
  });
  slide.addTable(tableRows, { x: 0.6, y, w: 8.8, border: { pt: 0.5, color: C.border }, colW: opts.colW });
}

function addCodeBlock(slide, text, y = 1.2, h = 2.5) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.6, y, w: 8.8, h, fill: { color: C.navy } });
  slide.addText(text, { x: 0.8, y: y + 0.1, w: 8.4, h: h - 0.2, fontSize: 12, fontFace: "Consolas", color: "E2E8F0", valign: "top" });
}

function sectionSlide(title, subtitle, bg) {
  const s = pres.addSlide();
  s.background = { color: bg };
  const txtColor = bg === C.yellow ? C.navy : C.white;
  s.addText(title, { x: 0.5, y: 1.5, w: 9, h: 1.5, fontSize: 40, fontFace: FONT, color: txtColor, bold: true, align: "center", valign: "middle" });
  if (subtitle) {
    const subBg = bg === C.yellow ? "44444430" : "FFFFFF25";
    s.addText(subtitle, { x: 2.5, y: 3.2, w: 5, h: 0.5, fontSize: 16, fontFace: FONT, color: txtColor, align: "center", valign: "middle" });
  }
  return s;
}

// ===== SLIDE 1: TITLE =====
let s = pres.addSlide();
s.background = { color: C.white };
s.addText("Claude Code 講座", { x: 0.5, y: 1.5, w: 9, h: 1.5, fontSize: 48, fontFace: FONT, color: C.navy, bold: true, align: "center" });
s.addText("マーケターのためのAI活用ツール入門", { x: 0.5, y: 3.2, w: 9, h: 0.8, fontSize: 20, fontFace: FONT, color: C.grayText, align: "center" });

// ===== SLIDE 2: 目次 =====
s = pres.addSlide();
addTitle(s, "今日の内容");
const tocItems = [
  { text: "1. Claude Codeとは何か", bold: true, fontSize: 18 },
  { text: "モデルの種類・使い方の基本", bullet: false, fontSize: 14, color: C.grayText },
  { text: "2. 自社での活用方法", bold: true, fontSize: 18 },
  { text: "分析の効率化・自分専用ツール・やっていいこと/ダメなこと", bullet: false, fontSize: 14, color: C.grayText },
  { text: "3. コンテキストエンジニアリング", bold: true, fontSize: 18 },
  { text: "AIを使いこなすために一番大事な概念・コマンド", bullet: false, fontSize: 14, color: C.grayText },
  { text: "4. スキルの作り方（本日のメイン）", bold: true, fontSize: 18 },
  { text: "辞書型・ワークフロー型・実践ステップ", bullet: false, fontSize: 14, color: C.grayText },
  { text: "5. セキュリティ", bold: true, fontSize: 18 },
  { text: "リスクと安全装置・守るべきルール", bullet: false, fontSize: 14, color: C.grayText },
];
addBody(s, tocItems, 1.2);

// ===== SLIDE 3: Section 1 =====
sectionSlide("1. Claude Codeとは何か", null, C.yellow);

// ===== SLIDE 4: Claudeという頭脳 =====
s = pres.addSlide();
addTitle(s, "Claudeという「頭脳」");
addBody(s, [
  { text: "Claude = Anthropic社が作った世界トップクラスのAI" },
  { text: "ChatGPTやGeminiと並ぶ、3大AIの1つ" },
  { text: "データの分析・要約・レポート作成が驚くほど得意" },
  { text: "「日本語で指示するだけ」で、分析からグラフ作成まで全部やってくれる" },
]);
addQuote(s, "ただし、Claude単体は「頭脳だけの状態」。手も足もない。ファイルを触ったり、調べ物をしたりはできない。");

// ===== SLIDE 5: 頭脳+装備 =====
s = pres.addSlide();
addTitle(s, "Claude Code = 頭脳 + 装備");
// Left panel
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.2, w: 4, h: 3.2, fill: { color: C.white }, line: { color: C.border, width: 1.5 } });
s.addText("頭脳だけ（素のClaude）", { x: 0.7, y: 1.3, w: 3.6, h: 0.5, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
s.addText([
  { text: "会話はできる", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "ファイルは触れない", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: "B0B8C8" } },
  { text: "データ分析はできない", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: "B0B8C8" } },
  { text: "調べ物はできない", options: { bullet: true, fontSize: 14, fontFace: FONT, color: "B0B8C8" } },
], { x: 0.7, y: 1.9, w: 3.6, h: 2.2 });
// Arrow
s.addText("→", { x: 4.5, y: 2.2, w: 1, h: 1, fontSize: 36, fontFace: FONT, color: C.blue, bold: true, align: "center", valign: "middle" });
// Right panel
s.addShape(pres.shapes.RECTANGLE, { x: 5.5, y: 1.2, w: 4, h: 3.2, fill: { color: C.white }, line: { color: C.blue, width: 2 } });
s.addText("装備あり（Claude Code）", { x: 5.7, y: 1.3, w: 3.6, h: 0.5, fontSize: 16, fontFace: FONT, color: C.blue, bold: true });
s.addText([
  { text: "会話もできる", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "ファイルの読み書きができる", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
  { text: "データ分析・グラフ作成ができる", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
  { text: "ネット検索もできる", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
], { x: 5.7, y: 1.9, w: 3.6, h: 2.2 });
addQuote(s, "RPGでいうと、素手の勇者に剣と盾を持たせたようなもの");

// ===== SLIDE 6: デスクトップ版 =====
s = pres.addSlide();
addTitle(s, "結論：デスクトップ版を使おう");
addBody(s, [
  { text: "デスクトップ版・Web版・CLI（黒い画面）の3種類あるが、デスクトップ版が一番おすすめ" },
  { text: "技術的な知識は一切不要" },
  { text: "アプリを開いて、やりたいことを日本語で伝えるだけ" },
]);
addQuote(s, "「エンジニアじゃないと使えない」は完全な誤解。日本語で「○○を分析して」と伝えるだけでOK");

// ===== SLIDE 8: Section 2 =====
sectionSlide("2. 自社での活用方法", "分析の効率化と自分専用ツールの開発", C.blue);

// ===== SLIDE 9: 何に使うか =====
s = pres.addSlide();
addTitle(s, "Claude Codeを何に使うのか");
s.addText("自社では主に2つの用途で活用していきます", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.body });
s.addText("用途1：分析業務の効率化", { x: 0.6, y: 1.8, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
addBody(s, [
  { text: "CSVやレポートデータの集計・可視化を自動化" },
  { text: "日本語で「○○を分析して」と伝えるだけで結果が出る" },
  { text: "手作業で数時間かかっていた集計が数分で完了" },
], 2.2);
s.addText("用途2：自分専用ツールの開発", { x: 0.6, y: 3.5, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "自分の業務に合った分析ツールやダッシュボードをAIに作ってもらう", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "エンジニアへの依頼不要。自分で・すぐに・追加費用なしで作れる", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 3.9, w: 8.8, h: 0.8 });
addQuote(s, "ChatGPTとの違い：会話するだけでなく、実際に動くツールを作ってくれる", 4.8);

// ===== SLIDE 10: ダッシュボード =====
s = pres.addSlide();
addTitle(s, "自分専用の分析ダッシュボード");
s.addText("Claude Codeに「こういうダッシュボードを作って」と伝えるだけ", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
addBody(s, [
  { text: "広告費・CPA・CVRなどの主要KPIを一画面で可視化" },
  { text: "CSVを入れるだけで自動更新されるグラフ" },
  { text: "前月比・前年比の異常値をハイライト表示" },
  { text: "自分のPCの中で動くからセキュリティも安心" },
], 1.8);
addQuote(s, "外部ツールに月額を払う必要なし。自分の業務にぴったり合った、世界にひとつだけのツールが作れる。");

// ===== SLIDE 11: 活用の進め方 =====
s = pres.addSlide();
addTitle(s, "活用の進め方");
s.addText("ステップ1：「面倒な繰り返し作業」を洗い出す", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("毎週やっている集計、毎月のレポート、定期的なチェック作業", { x: 0.8, y: 1.7, w: 8.6, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
s.addText("ステップ2：Claude Codeに日本語でやり方を伝える", { x: 0.6, y: 2.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("「このCSVを読んで、こういう形式でまとめて」", { x: 0.8, y: 2.7, w: 8.6, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
s.addText("ステップ3：うまくいったらスキル化して再利用", { x: 0.6, y: 3.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("次回から一言で同じ作業を実行できる", { x: 0.8, y: 3.7, w: 8.6, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
addQuote(s, "ただし、AIに渡す情報の量には限りがある。これを理解しないとうまく使えない → 次のセクションで解説");

// ===== SLIDE 12: トレードオフ =====
s = pres.addSlide();
addTitle(s, "便利さとリスクはトレードオフ");
s.addText("AIは便利だが、情報セキュリティとのバランスが必要", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.body });
s.addText("自分でやってOKなこと", { x: 0.6, y: 1.8, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "個人情報を含まない配信結果の分析", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "自分のPCだけで使う専用ツールの作成", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "定例作業の効率化（レポート整形・集計など）", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 2.2, w: 8.8, h: 1 });
s.addText("依頼が必要なこと", { x: 0.6, y: 3.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "広告媒体のデータを使った分析・ツール開発", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "社内システムと連携する仕組みの構築", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 3.6, w: 8.8, h: 0.7 });
addQuote(s, "媒体情報を使って何かしたい場合は、自分またはエンジニアチームに作成を依頼してください。");

// ===== SLIDE 13: やってはいけないこと =====
s = pres.addSlide();
addTitle(s, "絶対にやってはいけないこと");
s.addText("1. 個人情報を読み込ませない", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("顧客名・メールアドレスなどが入ったデータは絶対にAIに渡さない", { x: 0.8, y: 1.7, w: 8.6, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
s.addText("2. APIキー・パスワードを渡さない", { x: 0.6, y: 2.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "APIキー = 外部サービスに接続するための合鍵", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "「このAPIを使って○○して」は厳禁", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "無料のAI用APIも学習がONの場合が多く、情報が学習データに使われる", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 2.7, w: 8.8, h: 1 });
s.addText("3. 広告媒体のAPIには絶対に接続しない", { x: 0.6, y: 3.7, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("Google広告、Meta広告などのAPI。「APIで広告データを取ってきて分析して」もダメ", { x: 0.8, y: 4.2, w: 8.6, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
addQuote(s, "詳しくはセキュリティのセクションで解説します", 4.7);

// ===== SLIDE 14: Section 3 =====
sectionSlide("3. コンテキストエンジニアリング", "AIを使いこなすために一番大事な概念", C.yellow);

// ===== SLIDE 15: コンテキスト =====
s = pres.addSlide();
addTitle(s, "コンテキスト = AIの「作業机の広さ」");
s.addText("コンテキスト = 1回のやりとりでAIが見渡せる情報の量", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
addBody(s, [
  { text: "最新モデルでハリーポッター約1.5冊分（20万トークン）" },
  { text: "多く感じるかもしれないが、実はすぐに埋まる" },
  { text: "だから何を机に置くかが大事になる" },
], 1.8);
addQuote(s, "机の上に置ける資料には限りがある。分析データを広げすぎると、作業スペースがなくなる。");

// ===== SLIDE 16: 作業机 =====
s = pres.addSlide();
addTitle(s, "作業机には全部が載っている");
s.addText("コンテキスト（作業机）の中には、こんなものが全部載っている：", { x: 0.6, y: 1.2, w: 8.8, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
addTable(s,
  ["載っているもの", "たとえると"],
  [
    ["あなたが送った指示", "依頼書"],
    ["AIが考えた内容", "メモ帳"],
    ["読み込んだCSVやレポート", "分析資料"],
    ["分析結果やグラフ", "報告書"],
    ["記憶（メモリ）", "付箋"],
    ["ツールのやりとり", "やりとりの履歴"],
  ],
  { y: 1.6, colW: [4.4, 4.4] }
);
addQuote(s, "これが全部、同じ机の上に載っている。意外とすぐ机がいっぱいになる。", 4.5);

// ===== SLIDE 17: よくある誤解 =====
s = pres.addSlide();
addTitle(s, "よくある誤解");
addQuote(s, "「AIにたくさん情報を食わせて賢くさせよう」← AI開発者の話。使う側は逆。", 1.2);
s.addText("問題1：思考スペースの圧迫", { x: 0.6, y: 2.1, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "情報を入れすぎると、AIが考えるためのスペースがなくなる", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "結果 → AIの性能が落ちる", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
], { x: 0.6, y: 2.5, w: 8.8, h: 0.8 });
s.addText("問題2：自動圧縮の発動", { x: 0.6, y: 3.4, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "机がいっぱいになると、AIが自動的に情報を圧縮する", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "大事な指示まで一緒に潰されることがある", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
  { text: "結果 → 言うことを聞かなくなる", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
], { x: 0.6, y: 3.8, w: 8.8, h: 1 });

// ===== SLIDE 18: 自動圧縮 =====
s = pres.addSlide();
addTitle(s, "自動圧縮のイメージ");
addCodeBlock(s,
  "【圧縮前の机】\n┌─────────────────────────────┐\n│ 指示書  メモ  資料  参考書  │\n│ 報告書  計算用紙  付箋     │\n│ ────── もう置けない！ ──── │\n└─────────────────────────────┘\n        ↓ 自動圧縮が発動 ↓\n【圧縮後の机】\n┌─────────────────────────────┐\n│ ぎゅっと圧縮された何か     │\n│ ※大事な指示も一緒に潰れた │\n└─────────────────────────────┘",
  1.2, 3.2
);
addQuote(s, "圧縮が起きないように、余裕を持たせるのが大事", 4.6);

// ===== SLIDE 19: 量より質 =====
s = pres.addSlide();
addTitle(s, "正しいアプローチ：量より質");
s.addText("✕ 大量の情報を入れて「覚えさせる」", { x: 0.6, y: 1.3, w: 8.8, h: 0.5, fontSize: 20, fontFace: FONT, color: "CC3333", bold: true });
s.addText("○ 本当に必要なものだけ厳選して渡す", { x: 0.6, y: 2.0, w: 8.8, h: 0.5, fontSize: 20, fontFace: FONT, color: C.blue, bold: true });
addQuote(s, "部下に分析を頼むとき、社内の全データを渡す → ✕  必要なデータだけまとめて渡す → ○", 2.8);
s.addText("では、どうやって「必要な情報だけ」を渡すのか？", { x: 0.6, y: 3.8, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.body });
s.addText("→ その仕組みがClaude.mdとスキル", { x: 0.6, y: 4.3, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true });

// ===== SLIDE 20: Claude.md =====
s = pres.addSlide();
addTitle(s, "Claude.md ― AIの「常駐メモ」");
s.addText("Claude.md = Claudeがずっと頭の中に持っている情報", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
addCodeBlock(s,
  "┌─────────────────────────────┐\n│       Claude.md (常駐)       │\n│   ・基本ルール  ・参照先    │\n│         200行以内            │\n└──────────┬──────────────────┘\n           │ 必要なときに読みに行く\n     ┌─────┼─────┐\n     ▼     ▼     ▼\n  docs/  docs/  docs/\n  分析A  手順B  テンプレC",
  1.7, 2.5
);
addQuote(s, "ポイント：全部書くのではなく、「読みに行く先」を育てる", 4.4);

// ===== SLIDE 21: 段階的開示 =====
s = pres.addSlide();
addTitle(s, "段階的開示 ― Claude.mdの設計思想");
s.addText("Claude.mdの核心は「情報を一度に全部渡さない」こと", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
addCodeBlock(s,
  "Claude.mdに「目次」だけ書く\n  ・レポート作成 → docs/report.md を読め\n  ・競合分析   → docs/competitor.md を読め\n        ↓ 必要なときだけ読みに行く\n  「今回はレポートだな」→ report.md だけ開く\n        ↓ さらに必要なら追加資料を取り出す\n  テンプレート / 用語集 ← 本当に必要な分だけ",
  1.7, 2.2
);
addQuote(s, "全部を机に置かない。必要な棚だけ開く。これがコンテキストを最大限活かすコツ。", 4.1);

// ===== SLIDE 22: まずは1体 =====
s = pres.addSlide();
addTitle(s, "まずは1体のAIを育てよう");
addQuote(s, "「マルチエージェントでチームを組んで効率化！」", 1.2);
s.addText("現実は…", { x: 0.6, y: 2.1, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "コンテキスト管理を無視したマルチエージェントが大半", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "最初は動く。でも情報が増えるとすぐ破綻する", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "結果 → 使い物にならないものがほとんど", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
], { x: 0.6, y: 2.5, w: 8.8, h: 1 });
s.addText("正しい順番", { x: 0.6, y: 3.5, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "まずシングルエージェント（1体のAI）を極める", options: { bullet: { type: "number" }, breakLine: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
  { text: "コンテキスト管理を身につける", options: { bullet: { type: "number" }, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "その上で各エージェントの情報設計を学ぶ", options: { bullet: { type: "number" }, fontSize: 14, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 3.9, w: 8.8, h: 0.8 });
addQuote(s, "1体をちゃんと使えない人が、チームを組んでもうまくいかない。今日の講座は、この「1体を極める」ための内容です。", 4.8);

// ===== SLIDE 23: コマンド =====
s = pres.addSlide();
addTitle(s, "覚えておきたいコマンド");
s.addText("Claude Codeでは「/」で始まるコマンドが使える", { x: 0.6, y: 1.2, w: 8.8, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
addTable(s,
  ["コマンド", "何をするか"],
  [
    ["/compact", "会話を圧縮して机のスペースを空ける（最重要）"],
    ["/clear", "会話をリセットしてまっさらにする"],
    ["/context", "今コンテキストに何が載っているか一覧表示"],
    ["/help", "使えるコマンドの一覧を表示"],
  ],
  { y: 1.6, colW: [2.2, 6.6] }
);
addQuote(s, "特に /compact は超重要。作業が長くなったら「机がいっぱいになる前に整理する」イメージ。", 3.8);

// ===== SLIDE 24: Section 4 =====
sectionSlide("4. スキルの作り方", "この講座で一番大事なパート", C.blue);

// ===== SLIDE 25: なぜスキルが重要 =====
s = pres.addSlide();
addTitle(s, "なぜスキルが重要なのか");
s.addText("AIに毎回同じ説明をしていませんか？", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true });
addBody(s, [
  { text: "「うちのブランドのトーンは○○で…」" },
  { text: "「レポートはこの形式で…」" },
  { text: "「分析の観点はこの3つで…」" },
], 1.8);
s.addText("→ 毎回伝えると机がすぐ埋まるし、伝え漏れも起きる", { x: 0.6, y: 3.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.navy, bold: true });
addQuote(s, "スキルにまとめておけば、一言で呼び出せる。しかもコンテキストを必要なときだけ使うので効率的。さらにスキルはただのファイルなので、チームメンバーへの共有もコピーするだけ。", 3.8);

// ===== SLIDE 26: 2つのタイプ =====
s = pres.addSlide();
addTitle(s, "スキルの2つのタイプ");
addTable(s,
  ["", "辞書型", "ワークフロー型"],
  [
    ["役割", "知識を整理して渡す", "手順を教える"],
    ["たとえ", "用語辞典・ガイドライン", "作業マニュアル"],
    ["いつ使う", "AIが判断に迷うとき", "AIに一連の作業を任せるとき"],
    ["例", "ブランド用語集、分析ルール", "月次レポート作成、競合調査"],
  ],
  { y: 1.2, colW: [2, 3.4, 3.4] }
);
addQuote(s, "まずはこの2つを理解すれば、スキルの設計で迷わなくなる", 3.8);

// ===== SLIDE 27: 辞書型 =====
s = pres.addSlide();
addTitle(s, "辞書型スキル ― 知識を整理して渡す");
s.addText("AIが判断に迷わないよう、正しい知識をまとめたもの", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.body });
s.addText("例：ブランドガイドライン・スキル", { x: 0.6, y: 1.7, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "自社名の正式表記（「株式会社○○」ではなく「○○」と書く）", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT, color: C.body } },
  { text: "NGワード一覧（競合名を直接出さない、など）", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT, color: C.body } },
  { text: "トーン＆マナー（カジュアル／フォーマルの基準）", options: { bullet: true, fontSize: 13, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 2.1, w: 8.8, h: 0.9 });
s.addText("例：分析ルール・スキル", { x: 0.6, y: 3.1, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "KPIの定義（「CVR」は何を指すか、計算式は何か）", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT, color: C.body } },
  { text: "比較期間のルール（前月比？前年同月比？）", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT, color: C.body } },
  { text: "異常値の判断基準（○%以上の変動は要報告）", options: { bullet: true, fontSize: 13, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 3.5, w: 8.8, h: 0.9 });
addQuote(s, "「こう書いて」「こう判断して」を事前にまとめておく", 4.6);

// ===== SLIDE 28: ワークフロー型 =====
s = pres.addSlide();
addTitle(s, "ワークフロー型スキル ― 手順を教える");
s.addText("AIに一連の作業を順番通りにやらせるためのもの", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.body });
s.addText("例：月次レポート作成スキル", { x: 0.6, y: 1.7, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
addCodeBlock(s,
  "ステップ1：CSVファイルを読み込む\nステップ2：前月比で主要KPIを集計する\nステップ3：変動が大きい項目をピックアップ\nステップ4：考察コメントを3行で書く\nステップ5：所定のテンプレートに整形して出力",
  2.1, 1.5
);
s.addText("例：競合サイト調査スキル", { x: 0.6, y: 3.7, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
addCodeBlock(s,
  "ステップ1：指定URLのページ内容を取得\nステップ2：価格・機能・訴求ポイントを抽出\nステップ3：自社との比較表を作成\nステップ4：差別化ポイントを3つ提案",
  4.1, 1.1
);

// ===== SLIDE 29: 4つのコツ =====
s = pres.addSlide();
addTitle(s, "良いスキルを作る4つのコツ");
const tips = [
  { num: "1", title: "まず失敗を観察する", desc: "いきなり完璧を目指さず、AIがどこでつまずくかを見てから作る" },
  { num: "2", title: "辞書型とワークフロー型を分ける", desc: "知識と手順を別ファイルにする。同時に使わない情報は分割" },
  { num: "3", title: "名前と説明をAI向けに書く", desc: "AIが「いつこのスキルを使うべきか」判断できる名前にする" },
  { num: "4", title: "AIと対話しながら改善する", desc: "Claude自身に「なぜ失敗したか分析して」と改善させる" },
];
tips.forEach((tip, i) => {
  const yPos = 1.2 + i * 1.0;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yPos, w: 0.5, h: 0.5, fill: { color: C.blue } });
  s.addText(tip.num, { x: 0.6, y: yPos, w: 0.5, h: 0.5, fontSize: 18, fontFace: FONT, color: C.white, bold: true, align: "center", valign: "middle" });
  s.addText(tip.title, { x: 1.3, y: yPos, w: 8.1, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
  s.addText(tip.desc, { x: 1.3, y: yPos + 0.4, w: 8.1, h: 0.4, fontSize: 13, fontFace: FONT, color: C.body, margin: 0 });
});

// ===== SLIDE 30: 実践 =====
s = pres.addSlide();
addTitle(s, "実践：スキルの作り方ステップ");
s.addText("特別なことは不要。この流れでOK：", { x: 0.6, y: 1.2, w: 8.8, h: 0.3, fontSize: 14, fontFace: FONT, color: C.body });
const steps = [
  { title: "ステップ1：まず普通にClaude Codeで作業する", desc: "例：「このCSVを月次レポートにまとめて」" },
  { title: "ステップ2：うまくいったらこう伝える", desc: "「この作業をスキルとして登録して」" },
  { title: "ステップ3：Claudeが自動でスキルファイルを作ってくれる", desc: "" },
  { title: "ステップ4：次回から一言で呼び出せる", desc: "「月次レポートスキルでこのデータを分析して」" },
];
steps.forEach((step, i) => {
  const yPos = 1.6 + i * 0.8;
  s.addText(step.title, { x: 0.6, y: yPos, w: 8.8, h: 0.35, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
  if (step.desc) s.addText(step.desc, { x: 0.8, y: yPos + 0.35, w: 8.6, h: 0.3, fontSize: 13, fontFace: FONT, color: C.grayText });
});
addQuote(s, "うまくいかなかったら「○○の部分を修正して」で改善できる", 4.8);

// ===== SLIDE 31: 活用例 =====
s = pres.addSlide();
addTitle(s, "マーケ業務でのスキル活用例");
addTable(s,
  ["スキル名", "タイプ", "内容"],
  [
    ["ブランドガイドライン", "辞書型", "表記ルール・NGワード・トーン"],
    ["KPI定義集", "辞書型", "指標の定義・計算式・判断基準"],
    ["月次レポート作成", "ワークフロー型", "CSV読込→集計→考察→整形"],
    ["競合サイト調査", "ワークフロー型", "URL取得→抽出→比較表→提案"],
    ["広告コピー作成", "辞書型+ワークフロー型", "ガイドに沿って訴求文を生成"],
  ],
  { y: 1.2, colW: [2.8, 2.5, 3.5] }
);
addQuote(s, "繰り返す作業は全部スキル化の候補。まずは一番よくやる作業から始めてみましょう。", 4.0);

// ===== SLIDE 32: Section 5 =====
sectionSlide("5. セキュリティ", "便利だからこそ知っておくべきリスク", C.yellow);

// ===== SLIDE 33: リスク =====
s = pres.addSlide();
addTitle(s, "Claude Codeに潜むリスクを知ろう");
s.addText("Claude Codeは便利な反面、あなたのPCで直接動くツール", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.body });
s.addText("Claude Codeができること（＝リスクにもなること）", { x: 0.6, y: 1.7, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "ファイルの読み書き・削除", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "ネット検索・外部サイトへのアクセス", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "コマンドの実行 → PCに対して何でもできてしまう", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
], { x: 0.6, y: 2.1, w: 8.8, h: 0.9 });
s.addText("あなたのPC上にあるもの", { x: 0.6, y: 3.1, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "大事なファイル（業務資料・社内文書）", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "認証情報（パスワード・APIキー・ログイン状態）", options: { bullet: true, fontSize: 14, fontFace: FONT, color: C.body } },
], { x: 0.6, y: 3.5, w: 8.8, h: 0.7 });
addQuote(s, "指示の仕方を間違えると、大事なデータを消したり外部に送ったりできてしまう", 4.4);

// ===== SLIDE 34: 安全装置 =====
s = pres.addSlide();
addTitle(s, "Claude Codeの安全装置");
s.addText("実はClaude Codeには安全装置が備わっている", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 15, fontFace: FONT, color: C.body });
const guards = [
  { num: "1", title: "パーミッションモード（確認モード）", items: ["危険な操作の前に「実行していいですか？」と確認してくれる", "絶対にbypass（確認スキップ）しないこと"] },
  { num: "2", title: "Sandbox（砂場モード）", items: ["Claude Codeが触れる範囲を指定フォルダだけに制限できる", "フォルダ外のファイルやネットワークへのアクセスを遮断"] },
  { num: "3", title: "組織設定（管理者が一括設定）", items: ["会社のセキュリティルールを全員のClaude Codeに自動適用できる", "個人が設定を忘れても安全な状態を保てる"] },
];
guards.forEach((g, i) => {
  const yPos = 1.7 + i * 1.2;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yPos, w: 0.4, h: 0.4, fill: { color: C.blue } });
  s.addText(g.num, { x: 0.6, y: yPos, w: 0.4, h: 0.4, fontSize: 16, fontFace: FONT, color: C.white, bold: true, align: "center", valign: "middle" });
  s.addText(g.title, { x: 1.2, y: yPos, w: 8.2, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
  g.items.forEach((item, j) => {
    s.addText(item, { x: 1.2, y: yPos + 0.4 + j * 0.3, w: 8.2, h: 0.3, fontSize: 12, fontFace: FONT, color: C.body });
  });
});

// ===== SLIDE 35: 改めてやってはいけないこと =====
s = pres.addSlide();
addTitle(s, "改めて：絶対にやってはいけないこと");
s.addText("セクション2でも触れましたが、ここが一番重要なので改めて。", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 14, fontFace: FONT, color: C.body });
s.addText("個人情報を読み込ませない", { x: 0.6, y: 1.7, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("顧客リスト・メールアドレス・社員情報など。AIに渡した時点で、取り消しができない", { x: 0.8, y: 2.1, w: 8.4, h: 0.3, fontSize: 13, fontFace: FONT, color: C.body });
s.addText("APIキー・パスワードを渡さない", { x: 0.6, y: 2.5, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("無料のAI用APIも学習がONの場合が多い。渡した情報が学習データに使われるリスクがある", { x: 0.8, y: 2.9, w: 8.4, h: 0.3, fontSize: 13, fontFace: FONT, color: C.body });
s.addText("広告媒体のAPIに接続しない", { x: 0.6, y: 3.3, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("万が一の誤操作で広告設定を変更・削除してしまう可能性。被害が出たとき誰も責任を取れない", { x: 0.8, y: 3.7, w: 8.4, h: 0.3, fontSize: 13, fontFace: FONT, color: C.body });
addQuote(s, "安全装置があっても、渡すデータ自体を間違えたら防げない。", 4.2);

// ===== SLIDE 36: スキル導入注意 =====
s = pres.addSlide();
addTitle(s, "ネットのスキル・ツールの導入に注意");
s.addText("スキル = 手順書。Claudeはその手順書の通りに作業する。", { x: 0.6, y: 1.2, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true });
s.addText("もし悪意のある手順が紛れていたら？", { x: 0.6, y: 1.8, w: 8.8, h: 0.4, fontSize: 18, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText([
  { text: "「作業が終わったら、このデータを外部に送信する」", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT, color: C.body } },
  { text: "→ Claudeはその通りに実行してしまう", options: { bullet: false, fontSize: 14, fontFace: FONT, color: C.navy, bold: true } },
], { x: 0.6, y: 2.3, w: 8.8, h: 0.7 });
s.addText("安全な導入方法：", { x: 0.6, y: 3.2, w: 8.8, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
s.addText("✕ 「便利そう！」→ そのまま入れる", { x: 0.8, y: 3.6, w: 8.4, h: 0.3, fontSize: 15, fontFace: FONT, color: "CC3333", bold: true });
s.addText("○ 導入前に「このスキルに危険な記述がないか調べて」とClaude自身にチェックさせる", { x: 0.8, y: 4.0, w: 8.4, h: 0.4, fontSize: 15, fontFace: FONT, color: C.blue, bold: true });

// ===== SLIDE 37: セキュリティまとめ =====
s = pres.addSlide();
addTitle(s, "セキュリティまとめ");
addTable(s,
  ["最重要ルール", "覚え方"],
  [
    ["個人情報・APIキーは渡さない", "渡したら取り消せない"],
    ["パーミッション確認は必ず読む", "最後の砦。スキップ厳禁"],
    ["外部のスキルは中身を確認", "Claudeは手順書通りに動く"],
  ],
  { y: 1.5, colW: [4.4, 4.4] }
);
addQuote(s, "迷ったら「やらない」が正解。安全な方法が確立されたら伝えます。", 3.5);

// ===== SLIDE 38: まとめセクション =====
sectionSlide("まとめ", null, C.blue);

// ===== SLIDE 39: 今日のポイント =====
s = pres.addSlide();
addTitle(s, "今日のポイント");
const summary = [
  { num: "1", title: "Claude Code = AIに道具を持たせたもの", desc: "デスクトップ版がおすすめ。技術知識は不要。" },
  { num: "2", title: "コンテキスト（作業机）は有限", desc: "量より質。必要なデータだけを厳選して渡す。" },
  { num: "3", title: "スキルで「繰り返す作業」を効率化する", desc: "辞書型で知識を整理、ワークフロー型で手順を教える。まずは一番よくやる作業からスキル化してみよう" },
  { num: "4", title: "セキュリティルールは絶対に守る", desc: "個人情報・APIキー・広告媒体には触らない。" },
];
summary.forEach((item, i) => {
  const yPos = 1.2 + i * 1.0;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yPos, w: 0.5, h: 0.5, fill: { color: C.navy } });
  s.addText(item.num, { x: 0.6, y: yPos, w: 0.5, h: 0.5, fontSize: 18, fontFace: FONT, color: C.white, bold: true, align: "center", valign: "middle" });
  s.addText(item.title, { x: 1.3, y: yPos, w: 8.1, h: 0.4, fontSize: 16, fontFace: FONT, color: C.navy, bold: true, margin: 0 });
  s.addText(item.desc, { x: 1.3, y: yPos + 0.4, w: 8.1, h: 0.5, fontSize: 13, fontFace: FONT, color: C.body, margin: 0 });
});

// ===== SLIDE 40: END =====
s = pres.addSlide();
s.background = { color: C.navy };
s.addText("ありがとうございました", { x: 0.5, y: 2, w: 9, h: 1.5, fontSize: 44, fontFace: FONT, color: C.white, bold: true, align: "center", valign: "middle" });
s.addText("質問があればいつでもどうぞ", { x: 0.5, y: 3.5, w: 9, h: 0.6, fontSize: 18, fontFace: FONT, color: "94A3B8", align: "center" });

// Generate
pres.writeFile({ fileName: "/Users/matsushimamasato/Desktop/提案資料/AI講義/CC講座/claude-code-lecture.pptx" })
  .then(() => console.log("PPTX generated successfully!"))
  .catch(err => console.error("Error:", err));
