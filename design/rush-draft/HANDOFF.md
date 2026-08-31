# TEK rush page redesign — handoff (2026-08-30)

Fall 2026 rush page, Spider-Man "Brand New Day" scrapbook/risograph theme. Approved direction: `drafts/d8-casefile.html` (v4). Nothing is committed; this whole folder is untracked.

## Run
    cd design/rush-draft && python3 -m http.server 8100 --bind 127.0.0.1
    open http://localhost:8100/drafts/d8-casefile.html      (use localhost, not 127.0.0.1: Playwright's profile has a stuck 67% zoom on 127.0.0.1)
Edit `src/d8-casefile.html`, then `python3 src/build.py d8-casefile` (injects nav/footer/content/SVG from build.py into drafts/).

## Files
- src/build.py — template assembler; EVENTS/FAQ/TESTIMONIALS copy, nav+footer markup, procedural SVG (spider, webs, skyline)
- src/d8-casefile.html — the page (CSS + markup + GSAP script). d5–d7 = earlier versions, d1–d4 = rejected first round
- js/webs.js — verlet corner webs (interactive) + rope threads (currently NOT called; Aaron removed the strings)
- assets/ — newsprint.jpg (ground), city-1932.webp (Commons PD), spidey-*.webp cutouts (rembg + ImageMagick halftones), panel-*.webp (crops of the official collage poster), svg/ sticker pack
- tools/holocloth/ (repo) — vanilla three.js cloth port used for the draped WANTED newsprint; opts flat/settle/grabStrength

## Rules Aaron set
- No people / TEK photos; Spider-Man imagery OK. No invented facts in copy.
- Stickers never over running copy, desktop or phone (phone overrides need !important — positions are inline styles).
- Apply button + date circle keep bright red/cobalt; everything else uses the muted --red/--cobalt.
- Verify with Playwright at 1280 and 390 (and 1333x850, 1920) before claiming done.

## Open
- Port into rush/index.html + static/css/rush.css on a branch (Quasimoda via Typekit replaces Figtree stand-in).
- Merge cleanup-base → main is still pending (26+ commits undeployed).

## Port (2026-08-30, branch `rush-bnd`)
- `rush/FA27/index.html` + `static/css/rush-fa27.css` + `static/js/webs.js` + `static/media/rush/` (16 assets). Old page archived at `rush/WN26/`; `rush/index.html` is a meta-refresh redirect to `/rush/FA27/`. Holocloth stays at `/tools/holocloth/`.
- Uses the site's shared `<header>`/footer (real mobile menu via main.js/navigation.js) with html5reset + base.css; `rush-new.css` opens with a small block neutralising base.css globals (p padding, h1 centring, a sizing) inside `main`. Figtree → `quasimoda` (Typekit kit already on the site).
- Regenerate from the draft: `python3 design/rush-draft/src/port.py` (rebuild the draft first) — rerun after any draft change.
- Preview the real tree: `python3 design/rush-draft/serve.py 8101` from the repo root → http://localhost:8101/rush/FA27/ (no-cache server). Port 8100 must be started from `design/rush-draft`, not an old scratchpad copy.
- Silk web: hero-level SVG redrawn each frame from `.a-wrist`/`.a-tip` anchors to the hero's top-right corner; 5 twisted fibers + one damped spring on the arc's control point. Crosses the synopsis — Aaron accepted the position.
