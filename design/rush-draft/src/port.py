#!/usr/bin/env python3
"""Port drafts/d8-casefile.html into rush/new/index.html + static/css/rush-new.css on the shared site chrome."""
import os, re, shutil

ROOT = '/home/aaron/Dev/Clubs/TEK/TEKWebsite'
DRAFT = os.path.join(ROOT, 'design/rush-draft')
src = open(os.path.join(DRAFT, 'drafts/d8-casefile.html'), encoding='utf-8').read()
live = open(os.path.join(ROOT, 'rush/WN26/index.html'), encoding='utf-8').read()

def between(s, a, b, inclusive=False):
    i = s.index(a); j = s.index(b, i) + (len(b) if inclusive else 0)
    return s[i + (0 if inclusive else len(a)):j]

# ---------- CSS ----------
css = between(src, '<style>', '</style>')
lines = css.split('\n')
drop = ('.site-header', '.site-footer', '.burger', '@media (max-width:767px){.site-header', '@media (max-width:767px){.site-footer')
lines = [l for l in lines if not l.startswith(drop)]
css = '\n'.join(lines)
assert 'site-header' not in css and 'site-footer' not in css, 'nav css left behind'
css = css.replace('"Figtree","Quasimoda",system-ui,sans-serif', 'quasimoda,system-ui,sans-serif')
assert 'Figtree' not in css, 'Figtree left in css'
css = css.replace('/assets/', '/static/media/rush/')
unbase = '''/* rush/new — ported from design/rush-draft (d8-casefile). Loads after html5reset.css + base.css.
   base.css styles p/h1/h2/h3/a/.active globally; neutralise those inside the page so the rules below start clean. */
:where(body){font-weight:400}
:where(main) h1,:where(main) h2,:where(main) h3{font:inherit;color:inherit;text-align:inherit;text-transform:none;margin:0}
:where(main) p{font-size:inherit;font-weight:inherit;padding:0}
:where(main) a{font-size:inherit;font-weight:inherit;color:inherit}
:where(main) .active{font-size:inherit;font-weight:inherit;color:inherit}
'''
css = unbase + css.lstrip('\n')
os.makedirs(os.path.join(ROOT, 'static/css'), exist_ok=True)
open(os.path.join(ROOT, 'static/css/rush-fa27.css'), 'w', encoding='utf-8').write(css.rstrip('\n') + '\n')

# ---------- HTML ----------
preconnect = [l for l in src.split('\n') if 'rel="preconnect"' in l][0]
importmap = [l for l in src.split('\n') if 'type="importmap"' in l][0]
svgdefs = between(src, '<body>', '<header class="site-header">').strip('\n')
main_inner = between(src, '<main>', '</main>')
scripts = between(src, '</footer>', '</body>').strip('\n')
scripts = scripts.replace("'/js/webs.js'", "'/static/js/webs.js'").replace('/assets/', '/static/media/rush/')
assert '/js/webs.js' not in scripts.replace('/static/js/webs.js', ''), 'webs path'

header = between(live, '<header class="index-transparent">', '</header>')
header = '<header>' + header + '</header>'
footer = between(live, '<footer class="rush-footer">', '</footer>', inclusive=True)
footer = footer.replace('© 2024', '© 2026')

html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TEK Rush · Brand New Day</title>
<link rel="shortcut icon" type="image/png" href="/static/media/tekPics/Icon.png">
{preconnect}
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Special+Elite&display=swap">
<link rel="stylesheet" href="https://use.typekit.net/zje6zde.css">
<link rel="stylesheet" href="/static/css/html5reset.css">
<link rel="stylesheet" href="/static/css/base.css">
<link rel="stylesheet" href="/static/css/rush-fa27.css">
{importmap}
<script src="/static/js/main.js"></script>
<script src="/static/js/navigation.js"></script>
</head>
<body>
{svgdefs}
<div class="skip"><a href="#main">Skip to Main Content</a></div>
{header}
<main id="main">{main_inner}</main>
{footer}

{scripts}
</body>
</html>
'''
html = html.replace('/assets/', '/static/media/rush/')
os.makedirs(os.path.join(ROOT, 'rush/FA27'), exist_ok=True)
open(os.path.join(ROOT, 'rush/FA27/index.html'), 'w', encoding='utf-8').write(html)

# ---------- assets ----------
refs = sorted(set(re.findall(r'/static/media/rush/([A-Za-z0-9_./-]+)', html + css)))
for r in refs:
    s = os.path.join(DRAFT, 'assets', r); d = os.path.join(ROOT, 'static/media/rush', r)
    os.makedirs(os.path.dirname(d), exist_ok=True); shutil.copy2(s, d)
shutil.copy2(os.path.join(DRAFT, 'js/webs.js'), os.path.join(ROOT, 'static/js/webs.js'))
print('css lines', css.count('\n'), '| html lines', html.count('\n'), '| assets', len(refs))
print('\n'.join(refs))
