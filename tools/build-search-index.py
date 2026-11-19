#!/usr/bin/env python3
"""Rebuild site/search-index.json from the pages themselves.

Run before publishing whenever a page's headings, figures or key terms change:
    python3 tools/build-search-index.py
Standard library only; no build step for the site itself. After running, bump the
?v= string on search-index.json in site/interface.js so browsers fetch the new copy.
"""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent / 'site'
PAGES = [('index.html', 'Home'), ('theory.html', 'Theory & Method'), ('adam.html', 'Adam Saffin'),
         ('juan-patricio.html', 'Juan Patricio'), ('bibliography.html', 'Sources'), ('credits.html', 'About')]
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
SKIP = {'script', 'style', 'svg', 'nav', 'template'}


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    def classes(self):
        return (self.attrs.get('class') or '').split()

    def text(self):
        parts = []
        for child in self.children:
            if isinstance(child, str):
                parts.append(child)
            elif child.tag not in SKIP and 'section-return' not in child.classes():
                parts.append(child.text())
        return ' '.join(parts)

    def walk(self):
        for child in self.children:
            if isinstance(child, Node):
                yield child
                yield from child.walk()

    def find(self, pred):
        return next((n for n in self.walk() if pred(n)), None)


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node('root', {}, None)
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.cur)
        self.cur.children.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        node = self.cur
        while node is not self.root and node.tag != tag:
            node = node.parent
        if node is not self.root:
            self.cur = node.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def clean(text):
    return re.sub(r'\s+', ' ', text).strip()


def build():
    entries = []
    for path, page in PAGES:
        tree = Tree()
        tree.feed((SITE / path).read_text(encoding='utf-8'))
        root = tree.root
        meta = root.find(lambda n: n.tag == 'meta' and n.attrs.get('name') == 'description')
        h1 = root.find(lambda n: n.tag == 'h1')
        title = 'Ante-Possessive Lives in the Americas' if path == 'index.html' else clean(h1.text()) if h1 else page
        entries.append({'page': page, 'title': title, 'path': path,
                        'text': clean(meta.attrs.get('content', '')) if meta else '', 'kind': 'Page'})
        main = root.find(lambda n: n.tag == 'main') or root
        # Sections: each h2 (outside the key-terms panel) belongs to its nearest ancestor with an id.
        for h2 in [n for n in main.walk() if n.tag == 'h2']:
            node = h2.parent
            while node is not None and not (node.attrs.get('id') and not node.attrs['id'].endswith('-title')):
                node = node.parent
            if node is None or node is main or 'side-vocab-stick' in node.classes() or node.attrs['id'].startswith('section-'):
                continue
            ident = node.attrs['id']
            entries.append({'page': page, 'title': clean(h2.text()), 'path': f'{path}#{ident}',
                            'text': clean(node.text()) if path != 'index.html' else '', 'kind': 'Section'})
        # Figures: numbered captions; link to the figure's id, else the section just before it.
        last_id = ''
        for node in main.walk():
            if node.attrs.get('id') and ('card' in node.classes() or node.tag == 'section'):
                last_id = node.attrs['id']
            if node.tag != 'figure' and not (node.tag == 'section' and node.find(lambda n: n.tag == 'iframe')):
                continue
            caption = node.find(lambda n: 'figure-caption' in n.classes() or n.tag == 'figcaption')
            label = caption.find(lambda n: n.tag == 'strong') if caption else None
            number = re.match(r'Figure [IVX.]+[IVX]', clean(label.text())) if label else None
            if not number:
                continue
            anchor = node.attrs.get('id') or last_id
            named = node.find(lambda n: 'theory-figure-title' in n.classes())
            title = clean(label.text()).rstrip('.')
            if named and title == number.group(0):
                title = f'{title}. {clean(named.text())}'
            entries.append({'page': page, 'title': title,
                            'path': f'{path}#{anchor}' if anchor else path,
                            'text': clean(caption.text()), 'kind': 'Figure'})
        # Key terms from the side panel.
        for node in main.walk():
            if node.tag == 'button' and 'vocab-term' in node.classes():
                label = node.find(lambda n: 'vocab-term-label' in n.classes())
                tip = node.find(lambda n: 'vocab-tooltip' in n.classes())
                if label and tip and tip.attrs.get('id'):
                    entries.append({'page': page, 'title': clean(label.text()), 'path': f"{path}#{tip.attrs['id']}",
                                    'text': clean(node.text()), 'kind': 'Key term'})
    # Home's chooser is a destination of its own.
    entries.insert(1, {'page': 'Home', 'title': 'Contents', 'path': 'index.html#project-index', 'text': '', 'kind': 'Section'})
    seen, unique = set(), []
    for entry in entries:
        if (entry['path'], entry['title']) not in seen:
            seen.add((entry['path'], entry['title']))
            unique.append(entry)
    (SITE / 'search-index.json').write_text(json.dumps({'entries': unique}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    return unique


if __name__ == '__main__':
    for e in build():
        print(f"{e['kind']:9} {e['page'][:16]:16} {e['title'][:60]:60} {e['path']}")
