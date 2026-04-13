import re

with open('/Users/matsushimamasato/Desktop/提案資料/AI講義/CC講座/claude-code-lecture.md', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the Marp frontmatter
content = re.sub(r'^---\nmarp: true.*?\n---\n', '', content, flags=re.DOTALL)

# Split into slides
slides_raw = content.split('\n---\n')

html_slides = ""
for slide in slides_raw:
    slide = slide.strip()
    if not slide:
        continue
    
    section_attrs = "data-markdown"
    
    # Check for classes
    if "<!-- _class: title -->" in slide:
        section_attrs += ' class="title-slide center"'
        slide = slide.replace("<!-- _class: title -->", "")
    elif "<!-- _class: section-divider -->" in slide:
        section_attrs += ' data-background-color="#005bac" class="section-divider center"'
        slide = slide.replace("<!-- _class: section-divider -->", "")
        
    html_slides += f"<section {section_attrs}>\n<textarea data-template>\n{slide.strip()}\n</textarea>\n</section>\n"

html_template = f"""<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Claude Code 講座</title>
    
    <!-- Reveal.js CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reset.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.css">
    
    <!-- Theme -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/theme/simple.min.css">
    
    <!-- Highlight.js theme -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    
    <style>
        :root {{
            --r-main-font: 'Noto Sans JP', sans-serif;
            --r-heading-font: 'Noto Sans JP', sans-serif;
            --r-heading-color: #1a233a;
            --r-main-color: #333333;
            --r-background-color: #F8F9FA; /* light gray for airy feel */
            --primary-color: #005bac; /* typical solid blue */
            --secondary-color: #E6F0FA;
            --accent-color: #FF5A5F;
            --border-color: #E2E8F0;
        }}

        /* Set overall font scale */
        .reveal {{
            font-family: var(--r-main-font);
            color: var(--r-main-color);
            background-color: var(--r-background-color);
            font-size: 36px; /* Default font size */
            letter-spacing: 0.04em;
        }}

        .reveal h1, .reveal h2, .reveal h3 {{
            font-family: var(--r-heading-font);
            color: var(--r-heading-color);
            font-weight: 700;
        }}

        .reveal h1 {{ font-size: 3.2em; margin-bottom: 0.6em; line-height: 1.3; }}
        
        .reveal h2 {{
            font-size: 2.0em;
            margin-bottom: 1.2em;
            color: var(--primary-color);
            border-bottom: 4px solid var(--primary-color);
            display: inline-block;
            padding-bottom: 0.2em;
        }}

        .reveal h3 {{ font-size: 1.5em; color: var(--r-heading-color); margin-bottom: 1em; }}

        .reveal p, .reveal li {{
            line-height: 1.8;
            margin-bottom: 1.0em;
            color: #444;
        }}

        .reveal ul, .reveal ol {{
            margin-left: 2em;
            margin-bottom: 1.2em;
        }}

        /* Blockquote Styling (Airy and Clean) */
        .reveal blockquote {{
            border-left: 8px solid var(--primary-color);
            background: #ffffff;
            padding: 40px 60px;
            font-style: normal;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            width: 100%;
            margin: 50px auto;
            text-align: left;
            box-sizing: border-box;
        }}
        .reveal blockquote p {{
            margin: 0;
            font-size: 1.1em;
            color: var(--r-heading-color);
            font-weight: 700;
        }}

        /* Text Emphasis */
        .reveal strong {{
            color: var(--primary-color);
            font-weight: 900;
            background: linear-gradient(transparent 70%, rgba(0, 91, 172, 0.15) 70%);
        }}
        .reveal em {{
            color: white;
            background: var(--primary-color);
            padding: 6px 16px;
            border-radius: 30px;
            font-style: normal;
            font-size: 0.85em;
            vertical-align: middle;
            font-weight: 700;
        }}

        /* Table Design */
        .reveal table {{
            margin: 50px auto;
            border-collapse: collapse;
            font-size: 0.9em;
            width: 95%;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 25px rgba(0,0,0,0.04);
        }}
        .reveal th {{
            background-color: var(--primary-color);
            color: white;
            padding: 30px 40px;
            font-weight: 700;
            text-align: center;
        }}
        .reveal td {{
            padding: 30px 40px;
            border-bottom: 1px solid var(--border-color);
            color: var(--r-main-color);
            text-align: center;
        }}
        .reveal tr:last-child td {{ border-bottom: none; }}
        .reveal tr:nth-child(even) td {{ background-color: #F8FAFC; }}
        .reveal td:first-child {{ font-weight: bold; text-align: left; }}

        /* Card Layout for Slide 4 */
        .flex-row {{
            display: flex;
            gap: 60px;
            justify-content: center;
            align-items: stretch;
            margin: 50px 0;
            width: 100%;
        }}
        .card {{
            flex: 1;
            background: #ffffff;
            border-radius: 24px;
            padding: 50px;
            box-shadow: 0 15px 45px rgba(0,0,0,0.08);
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            align-items: center;
        }}
        .card img {{
            height: 380px;
            width: 100%;
            object-fit: cover;
            border-radius: 16px;
            margin: 0 0 40px 0;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }}
        .card h3 {{
            margin-top: 0;
            margin-bottom: 40px;
            font-size: 1.6em;
            color: var(--r-heading-color);
            text-align: center;
            line-height: 1.5;
        }}
        .card ul {{
            margin: 0;
            padding: 0;
            list-style: none;
            width: 100%;
        }}
        .card li {{
            padding: 20px 24px;
            background: #F8FAFC;
            border-radius: 12px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
            font-size: 1.15em;
        }}
        .card li.disabled {{
            color: #94A3B8;
            text-decoration: line-through;
            background: transparent;
            border: 2px dashed #CBD5E1;
        }}
        .card li.highlight-item {{
            background: var(--secondary-color);
            color: var(--primary-color);
            border: 1px solid #BFDBFE;
            font-weight: 700;
        }}

        /* Code snippets */
        .reveal pre {{
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            border-radius: 16px;
            width: 95%;
            margin: 40px auto;
            font-size: 0.85em;
        }}
        .reveal code {{
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            background-color: #F1F5F9;
            color: var(--accent-color);
            padding: 6px 14px;
            border-radius: 8px;
            font-weight: bold;
        }}

        /* Slide Layouts and Margins */
        .reveal .slides section {{
            padding: 80px 150px; /* Massive padding for airy corporate feel */
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }}
        
        .reveal .slides section > * {{
            text-align: left; /* Keep everything clearly aligned left for business slides */
            max-width: 100%;
        }}
        
        .reveal .slides section.center > * {{
            text-align: center;
        }}

        /* Title Slide */
        .title-slide {{
            align-items: center !important;
            text-align: center !important;
            background: #ffffff !important;
        }}
        .title-slide h1 {{
            color: var(--primary-color);
            font-size: 5.5em;
            margin-bottom: 40px;
            border: none;
        }}
        .title-slide p {{
            font-size: 1.8em;
            color: #64748B;
            text-align: center;
        }}

        /* Section Divider Slide */
        .section-divider {{
            background-color: var(--primary-color) !important;
            align-items: center !important;
            text-align: center !important;
        }}
        .section-divider h1 {{
            color: #ffffff;
            font-size: 4.5em;
            border: none;
            margin: 0;
        }}
        .section-divider em {{
            display: block;
            margin-top: 50px;
            color: #BAE6FD;
            background: none;
            font-size: 1.8em;
            font-weight: 500;
        }}
        
        /* Adjusting Progress Bar and Controls */
        .reveal .progress span {{ background-color: var(--primary-color); }}
        .reveal .controls {{ color: var(--primary-color); }}
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            {html_slides}
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/reveal.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/plugin/markdown/markdown.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.3.1/plugin/highlight/highlight.js"></script>
    <script>
        Reveal.initialize({{
            hash: true,
            slideNumber: 'c/t',
            transition: 'fade', // Corporate slides usually use fade over slide
            backgroundTransition: 'fade',
            center: true, // Keep it centered vertically
            margin: 0.1,
            width: 1920, // Move to Full HD for more white space
            height: 1080, // Move to Full HD for more white space
            minScale: 0.2,
            maxScale: 2.0,
            plugins: [ RevealMarkdown, RevealHighlight ]
        }});
    </script>
</body>
</html>
"""

with open('/Users/matsushimamasato/Desktop/提案資料/AI講義/CC講座/claude-code-lecture.html', 'w', encoding='utf-8') as f:
    f.write(html_template)
