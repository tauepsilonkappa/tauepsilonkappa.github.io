#!/usr/bin/env python3
"""Assemble rush-page drafts: shared nav/footer/graphics injected into per-draft templates."""
import math, os, random, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'drafts')

# ---------- procedural graphics (all ours, no IP images) ----------
def web_path(size=400, spokes=9, rings=(48, 96, 150, 210, 278, 352), sag=0.10):
    """Corner web anchored at (0,0), quarter circle. Rings sag toward the hub like real silk."""
    d = []
    angs = [math.radians(90 * i / (spokes - 1)) for i in range(spokes)]
    for a in angs:
        d.append(f"M0 0L{size*math.cos(a):.1f} {size*math.sin(a):.1f}")
    for r in rings:
        pts = [(r*math.cos(a), r*math.sin(a)) for a in angs]
        d.append(f"M{pts[0][0]:.1f} {pts[0][1]:.1f}")
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            mx, my = (x0+x1)/2, (y0+y1)/2
            cx, cy = mx*(1-sag), my*(1-sag)
            d.append(f"Q{cx:.1f} {cy:.1f} {x1:.1f} {y1:.1f}")
    return ''.join(d)

def full_web_path(cx=200, cy=200, R=200, spokes=14, rings=(30, 62, 98, 138, 182), sag=0.12):
    d = []
    angs = [2*math.pi*i/spokes for i in range(spokes)]
    for a in angs:
        d.append(f"M{cx} {cy}L{cx+R*math.cos(a):.1f} {cy+R*math.sin(a):.1f}")
    for r in rings:
        pts = [(cx+r*math.cos(a), cy+r*math.sin(a)) for a in angs] 
        pts.append(pts[0])
        d.append(f"M{pts[0][0]:.1f} {pts[0][1]:.1f}")
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            mx, my = (x0+x1)/2, (y0+y1)/2
            qx, qy = cx+(mx-cx)*(1-sag), cy+(my-cy)*(1-sag)
            d.append(f"Q{qx:.1f} {qy:.1f} {x1:.1f} {y1:.1f}")
    return ''.join(d)

def skyline_path(width=1600, height=220, seed=7):
    rnd = random.Random(seed)
    x = 0; pts = [(0, height)]
    while x < width:
        w = rnd.randint(40, 120); h = rnd.randint(40, 190)
        pts.append((x, h))
        if rnd.random() < 0.25:  # antenna
            ax = x + w//2; ah = h - rnd.randint(20, 45)
            pts += [(ax-2, h), (ax-2, ah), (ax+2, ah), (ax+2, h)]
        pts.append((x+w, h))
        x += w
    pts.append((width, height))
    return 'M' + ' L'.join(f"{px} {py}" for px, py in pts) + ' Z'

SPIDER = (
  '<g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">'
  '<path d="M90 70L55 42 30 14M110 70L145 42 170 14M88 82L46 74 12 60M112 82L154 74 188 60'
  'M88 92L46 106 16 136M112 92L154 106 184 136M92 102L62 142 42 186M108 102L138 142 158 186"/>'
  '</g><ellipse cx="100" cy="126" rx="26" ry="40" fill="currentColor"/>'
  '<circle cx="100" cy="80" r="17" fill="currentColor"/>'
)
GRAIN = ("url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E"
         "%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E"
         "%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E"
         "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")")

NAV = '''<header class="site-header">
  <a class="logo" href="/"><img src="/static/media/tekPics/tekNavy.png" alt="tek logo" width="200"></a>
  <nav class="full" aria-label="large navigation"><ul>
    <li><a href="/">HOME</a></li><li><a href="/members">MEMBERS</a></li><li><a href="/alumni">ALUMNI</a></li><li><a href="/activities">ACTIVITIES</a></li><li><a href="/rush" class="active" aria-current="page">RUSH</a></li>
  </ul></nav>
  <nav class="mobile" aria-label="mobile navigation"><button class="burger" aria-label="Open menu"><span></span><span></span><span></span></button></nav>
</header>'''

NAV_CSS = '''.site-header{background:#fff;display:flex;justify-content:space-between;align-items:center;padding-right:50px;position:relative;z-index:20;box-shadow:0 0 30px rgb(127 137 161/30%)}
.site-header .logo img{width:200px;height:auto;margin:15px;display:block}
.site-header nav.full ul{display:flex;list-style:none;margin:0;padding:0}
.site-header a{padding:10px;font:600 18px/1 "Figtree",system-ui,sans-serif;color:#293786;text-decoration:none}
.site-header a.active{font-weight:800;font-size:21px}
.site-header nav.mobile{display:none}
.burger{background:none;border:0;padding:12px;cursor:pointer;display:flex;flex-direction:column;gap:5px}
.burger span{display:block;width:24px;height:3px;background:#293786;border-radius:2px}
@media (max-width:767px){.site-header{padding-right:6px}.site-header .logo img{width:130px;margin:10px}.site-header nav.full{display:none}.site-header nav.mobile{display:block}}'''

FOOTER = '''<footer class="site-footer">
  <a href="/"><img src="/static/media/tekPics/tekWhite.png" alt="tek logo" width="120"></a>
  <div class="footer-center">
    <p>© 2026 Tau Epsilon Kappa Alpha Chapter. All Rights Reserved.</p>
    <ul>
      <li><a href="mailto:tauepsilonkappa@umich.edu" aria-label="Email"><svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M12 12.713l11.985-6.713c-.331-.518-.978-.851-1.685-.851h-20.6c-.707 0-1.354.333-1.685.851l11.985 6.713zm12-4.471v11.758c0 .828-.673 1.5-1.5 1.5h-21c-.827 0-1.5-.672-1.5-1.5v-11.758l11.985 6.712 11.985-6.712z"/></svg></a></li>
      <li><a href="https://www.linkedin.com/company/tau-epsilon-kappa" aria-label="LinkedIn"><svg viewBox="0 0 48 48" width="26" height="26"><path fill="currentColor" d="M44.4 0H3.5C1.6 0 0 1.5 0 3.5v41.1C0 46.4 1.6 48 3.5 48h40.9c2 0 3.6-1.6 3.6-3.5V3.5C48 1.5 46.4 0 44.4 0zM14.2 40.9H7.1V18h7.1v22.9zM10.7 14.9c-2.3 0-4.1-1.9-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1zM40.9 40.9h-7.1V29.8c0-2.7 0-6.1-3.7-6.1s-4.3 2.9-4.3 5.9v11.3h-7.1V18h6.8v3.1h.1c1-1.8 3.3-3.7 6.7-3.7 7.2 0 8.6 4.7 8.6 10.9v12.6z"/></svg></a></li>
      <li><a href="https://www.instagram.com/tekumich/" aria-label="Instagram"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a></li>
    </ul>
  </div>
</footer>'''

FOOTER_CSS = '''.site-footer{display:flex;align-items:center;justify-content:space-between;padding:20px 30px;background:#2b3c67;color:#fff;position:relative;z-index:20}
.site-footer img{width:120px;height:auto;display:block}
.site-footer .footer-center{position:absolute;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px}
.site-footer p{margin:0;font:400 14px/1.4 "Figtree",system-ui,sans-serif}
.site-footer ul{display:flex;gap:20px;list-style:none;margin:0;padding:0}
.site-footer a{color:#fff;display:block}
.site-footer a:hover{color:#fbf7de}
@media (max-width:767px){.site-footer{flex-direction:column;gap:14px;padding:22px 16px 26px}.site-footer .footer-center{position:static;transform:none}.site-footer p{font-size:12px;text-align:center}}'''

EVENTS = [
  ("Tue", "9/8",  "Info Session",    "6–7 pm · Henderson Rm, Michigan League",  ""),
  ("Wed", "9/9",  "DEI Panel",       "6:30–7:30 pm · Henderson Rm, Michigan League", "Members on belonging in tech. Questions welcome."),
  ("Thu", "9/10", "Meet & Greet",    "6–8:30 pm · CCCB 3460",     "Talk classes, projects and recruiting."),
  ("Fri", "9/11", "Meet & Greet",    "6–8:30 pm · CCCB 2460",     "Second night. Missed Thursday? Come by."),
  ("Sat", "9/12", "Application due", "12:00 noon",                "Short form. Hit one event first, then tell us who you are."),
]
FAQ = [
  ("I'm not a tech major. Can I still apply?", "Yes. We take every major. Curiosity about technology is the bar, not a transcript."),
  ("I'm a sophomore. Is it too late?", "No. Freshmen and sophomores are exactly who we recruit."),
  ("What's the time commitment?", "Pledging scales with what you want out of it. Expect a few hours a week during the process; after that, it's yours to set."),
]
TESTIMONIALS = [
  ("Trisha Kant", "Founder", "Creating a new fraternity on campus has been extremely rewarding. Being able to cultivate a specific community of diverse yet like-minded students has been the best part of my time at UMich. The people I've met through TEK are ones I will have throughout my life."),
  ("Noah Ivers", "Founder", "Starting TEK has been the best part of my college experience. Watching the fraternity flourish and the members grow closer has been a privilege. TEK has a bright future. May the younger members carry on what we've started."),
]
APPLY = "https://forms.gle/LbX77aMKqMnf3Fx68"
INTEREST = "https://docs.google.com/forms/d/e/1FAIpQLScvKZmzYm5nd82Af1WnQIXEt5JmzKAY-YFZgpAYvmy_HK15LA/viewform"

def render(name):
    tpl = open(os.path.join(HERE, name + '.html')).read()
    ctx = {
      'NAV': NAV, 'NAV_CSS': NAV_CSS, 'FOOTER': FOOTER, 'FOOTER_CSS': FOOTER_CSS,
      'GRAIN': GRAIN, 'SPIDER': SPIDER,
      'WEB': web_path(), 'FULLWEB': full_web_path(), 'SKYLINE': skyline_path(),
      'APPLY': APPLY, 'INTEREST': INTEREST,
    }
    # loops: {{#EVENTS}}...{{/EVENTS}} with {0}..{4}; same for FAQ (0,1) and TESTIMONIALS (0,1,2)
    for key, rows in (('EVENTS', EVENTS), ('FAQ', FAQ), ('TESTIMONIALS', TESTIMONIALS)):
        def rep(m, rows=rows):
            body = m.group(1)
            out = []
            for i, row in enumerate(rows):
                s = re.sub(r'\{i:(\d+)\?([^}]*)\}', lambda m: m.group(2) if int(m.group(1)) == i else '', body)
                s = s.replace('{i}', str(i)).replace('{n}', str(i+1))
                for j, v in enumerate(row):
                    s = s.replace('{%d}' % j, v)
                out.append(s)
            return ''.join(out)
        tpl = re.sub(r'\{\{#%s\}\}(.*?)\{\{/%s\}\}' % (key, key), rep, tpl, flags=re.S)
    for k, v in ctx.items():
        tpl = tpl.replace('{{%s}}' % k, v)
    assert '{{' not in tpl, re.findall(r'\{\{[^}]+\}\}', tpl)[:3]
    os.makedirs(OUT, exist_ok=True)
    open(os.path.join(OUT, name + '.html'), 'w').write(tpl)
    print(name, len(tpl)//1024, 'KB')

if __name__ == '__main__':
    for n in (sys.argv[1:] or [f[:-5] for f in sorted(os.listdir(HERE)) if f.endswith('.html')]):
        render(n)
