#!/usr/bin/env python3
"""Build a browser preview of unpublished site/ changes.

Writes preview.js: paste it into the browser console (or Claude's javascript tool) on any page of
the live site. It shows the edited version of that page in a full-window frame over the live page,
so images and other unchanged files load from the live site. Links inside the frame open the edited
version of the next page.

Usage, from the repository root:
    python3 tools/preview/make_preview.py [BASE]
BASE is the commit that matches the live site (default: the `published` tag).
"""
import json, os, subprocess, sys, difflib

ROOT = subprocess.run(['git', 'rev-parse', '--show-toplevel'], capture_output=True, text=True, check=True).stdout.strip()
BASE = sys.argv[1] if len(sys.argv) > 1 else 'published'
TEXT = ('.html', '.css', '.js', '.json')

def show(path):
    r = subprocess.run(['git', '-C', ROOT, 'show', f'{BASE}:site/{path}'], capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None

def replacements(old, new):
    a, b = old.splitlines(keepends=True), new.splitlines(keepends=True)
    out = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag == 'equal':
            continue
        lo, hi = i1, i2
        while True:
            chunk = ''.join(a[lo:hi])
            if chunk and old.count(chunk) == 1:
                break
            if lo == 0 and hi == len(a):
                raise SystemExit('Could not anchor a change uniquely.')
            lo, hi = max(0, lo - 1), min(len(a), hi + 1)
        out.append([chunk, ''.join(a[lo:i1]) + ''.join(b[j1:j2]) + ''.join(a[i2:hi])])
    text = old
    for o, n in out:
        assert text.count(o) == 1
        text = text.replace(o, n)
    assert text == new
    return out

site = os.path.join(ROOT, 'site')
patches, missing = {}, []
for name in sorted(os.listdir(site)):
    if not name.endswith(TEXT):
        continue
    new = open(os.path.join(site, name), encoding='utf-8').read()
    old = show(name)
    if old is None:
        missing.append(name)
    elif old != new:
        patches[name] = replacements(old, new)
changed_files = subprocess.run(['git', '-C', ROOT, 'diff', '--name-only', BASE, '--', 'site'], capture_output=True, text=True).stdout.split()
new_binary = [p[5:] for p in changed_files if not p.endswith(TEXT)]

runner = open(os.path.join(os.path.dirname(__file__), 'preview-runner.js'), encoding='utf-8').read()
js = f"localStorage.setItem('ante-preview-patch', {json.dumps(json.dumps(patches))});\n" \
     f"localStorage.setItem('ante-preview-unpublished', {json.dumps(json.dumps(new_binary))});\n" \
     f"localStorage.setItem('ante-preview-runner', {json.dumps(runner)});\n" \
     "(0, eval)('(' + localStorage.getItem('ante-preview-runner') + ')')();\n"
open(os.path.join(os.path.dirname(__file__), 'preview.js'), 'w', encoding='utf-8').write(js)
print(f'Changed text files: {", ".join(patches) or "none"}')
if new_binary:
    print('Not shown until published (new or changed binary files): ' + ', '.join(new_binary))
if missing:
    print('New text files not in the live site (pages linking to them will 404 in preview): ' + ', '.join(missing))
print(f'Wrote tools/preview/preview.js ({len(js)} bytes).')
