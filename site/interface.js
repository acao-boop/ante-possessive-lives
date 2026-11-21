/* Progressive enhancements for a static archival publication. */
(() => {
  const pages = [
    ['index.html', 'Home'], ['theory.html', 'Theory & Method'],
    ['adam.html', 'Adam Saffin'], ['juan-patricio.html', 'Juan Patricio'],
    ['bibliography.html', 'Sources'], ['credits.html', 'About']
  ];
  const base = new URL('.', document.currentScript.src);
  const slug = path => /\/$/.test(path) ? 'index' : decodeURIComponent(path).split('/').pop().replace(/\.html$/, '') || 'index';
  const file = pages.find(([name]) => name.replace('.html', '') === slug(location.pathname))?.[0] || 'index.html';
  const compact = matchMedia('(max-width: 900px)');
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const main = document.querySelector('main');
  const storage = {
    get(key) { try { return localStorage.getItem(`ante-lives.${key}`); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(`ante-lives.${key}`, value); return true; } catch { return false; } },
    remove(key) { try { localStorage.removeItem(`ante-lives.${key}`); } catch {} }
  };
  const roman = value => {
    let out = '';
    for (const [number, letters] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
      while (value >= number) { out += letters; value -= number; }
    }
    return out;
  };
  const notice = document.createElement('p');
  notice.className = 'interface-status';
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  document.body.append(notice);
  const announce = text => { notice.textContent = text; };

  // Both menus keep their original links, including when JavaScript is absent.
  const chapterMenu = document.querySelector('.chapter-menu');
  if (chapterMenu) {
    const setChapterMenu = () => { chapterMenu.open = !compact.matches; };
    setChapterMenu();
    compact.addEventListener('change', setChapterMenu);
    // Only the three chapters carry numerals (I–III), matching figures and search; Sources and About keep their names.
    chapterMenu.querySelectorAll('.global-nav a').forEach((link, index) => {
      if (index < 3) link.setAttribute('aria-label', `Chapter ${roman(index + 1)}: ${link.textContent.trim()}`);
    });
  }
  const rail = document.querySelector('.section-rail');
  if (rail) {
    const contents = document.createElement('details');
    contents.className = 'contents-disclosure';
    const summary = document.createElement('summary');
    summary.textContent = 'On this page';
    contents.append(summary);
    Array.from(rail.children).filter(el => !el.classList.contains('back-btn')).forEach(el => contents.append(el));
    // The key terms sit after the article in reading order; offer a direct route to them.
    const termsSection = document.querySelector('.side-vocab-stick[id], .theory-vocab-stick[id]');
    const railSource = contents.querySelector('.rail-source-link');
    if (termsSection && railSource) {
      const termsLink = document.createElement('a');
      termsLink.className = 'rail-source-link rail-terms-link';
      termsLink.href = `#${termsSection.id}`;
      termsLink.textContent = 'Key terms';
      railSource.before(termsLink);
    }
    rail.append(contents);
    const setContents = () => { contents.open = !compact.matches; };
    setContents();
    compact.addEventListener('change', setContents);
  }

  // One explicit state controls the definition and the accessible button state.
  const terms = Array.from(document.querySelectorAll('.vocab-term'));
  let pinnedTerm = null;
  const closeTerms = () => {
    pinnedTerm = null;
    terms.forEach(term => { term.classList.remove('definition-open'); term.setAttribute('aria-expanded', 'false'); });
  };
  const showTerm = term => {
    terms.forEach(other => {
      other.classList.toggle('definition-open', other === term);
      other.setAttribute('aria-expanded', String(other === term));
    });
  };
  terms.forEach(term => {
    term.setAttribute('aria-expanded', 'false');
    term.setAttribute('aria-controls', term.querySelector('.vocab-tooltip').id);
    term.addEventListener('focus', () => showTerm(term));
    term.addEventListener('blur', () => { if (pinnedTerm !== term) closeTerms(); });
    term.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) showTerm(term);
    });
    term.addEventListener('pointerleave', () => {
      if (pinnedTerm !== term && document.activeElement !== term) closeTerms();
    });
    term.addEventListener('click', () => {
      if (pinnedTerm === term) closeTerms();
      else { pinnedTerm = term; showTerm(term); }
    });
  });
  addEventListener('click', event => { if (!event.defaultPrevented && !event.target.closest('.vocab-term')) closeTerms(); });
  addEventListener('focusin', event => { if (!event.target.closest('.vocab-term')) closeTerms(); });
  addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeTerms();
    const details = document.activeElement?.closest('details');
    if (details?.open && details.matches('.reading-settings,.chapter-menu,.contents-disclosure')) {
      details.open = false;
      details.querySelector('summary').focus();
      event.preventDefault();
    }
  });

  const goToHash = (hash, updateHistory = true, smooth = true) => {
    let id;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    if (updateHistory && location.hash !== hash) history.pushState(null, '', hash);
    const term = target.closest('.vocab-term');
    // A visually hidden heading cannot take focus, so fall back to the first heading that renders.
    const focus = term || (target.matches('main,h1,h2,h3,h4,a,button,input') ? target : [...target.querySelectorAll('h1,h2,h3,h4')].find(heading => heading.getClientRects().length)) || target;
    if (term) { pinnedTerm = term; showTerm(term); }
    if (!focus.matches('a,button,input,summary,[tabindex]')) focus.setAttribute('tabindex', '-1');
    focus.focus({preventScroll: true});
    // A pinned (sticky) panel is already in view; scrolling to it would only jump the reader back up the page.
    const scrollTarget = term || target;
    if (getComputedStyle(scrollTarget.closest('.side-vocab-stick,.theory-vocab-stick') || scrollTarget).position !== 'sticky') scrollTarget.scrollIntoView({behavior: smooth && !reducedMotion() ? 'smooth' : 'instant', block: 'start'});
  };
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    if (compact.matches && link.closest('.contents-disclosure')) link.closest('details').open = false;
    goToHash(link.hash);
  }));
  addEventListener('popstate', () => { if (location.hash) goToHash(location.hash, false, false); });
  addEventListener('hashchange', () => { if (location.hash) goToHash(location.hash, false, false); });
  if (location.hash) requestAnimationFrame(() => goToHash(location.hash, false, false));

  // Section links use the existing archival anchors and the actual hosting URL.
  // A small copy icon (two overlapping sheets) that turns into a check once the link is copied.
  const linkIcon = copied => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 16 16'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    svg.innerHTML = copied ? '<path d="M3.5 8.5l3 3 6-7"/>' : '<rect x="5.5" y="5.5" width="8" height="8" rx="1.2"/><path d="M10.5 3.5v-.8c0-.66-.54-1.2-1.2-1.2H3.7c-.66 0-1.2.54-1.2 1.2v5.6c0 .66.54 1.2 1.2 1.2h.8"/>';
    return svg;
  };
  const addSectionLink = (container, id, label) => {
    const link = document.createElement('a');
    link.className = 'section-link';
    link.href = `#${id}`;
    link.append(linkIcon(false));
    link.title = 'Copy link';
    link.setAttribute('aria-label', `Copy link to ${label}`);
    link.addEventListener('click', async event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
      event.preventDefault();
      const url = new URL(location.href);
      url.search = '';
      url.hash = id;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(url.href);
        link.replaceChildren(linkIcon(true)); link.classList.add('is-copied'); link.title = 'Copied';
        announce(`Copied the link to ${label}.`);
        setTimeout(() => { link.replaceChildren(linkIcon(false)); link.classList.remove('is-copied'); link.title = 'Copy link'; }, 1800);
      } catch {
        goToHash(url.hash);
        announce('The section link is in the address bar, ready to copy.');
      }
    });
    container.append(link);
  };
  main?.querySelectorAll('h2').forEach(heading => {
    if (document.body.classList.contains('landing-page') || heading.closest('.side-vocab-stick')) return;
    const target = heading.closest('[id]');
    if (!target || target === main) return;
    const label = heading.textContent.trim();
    const text = document.createElement('span');
    text.className = 'heading-label';
    text.id = `${target.id}-heading-text`;
    while (heading.firstChild) text.append(heading.firstChild);
    heading.classList.add('linked-heading');
    heading.setAttribute('aria-labelledby', text.id);
    heading.append(text);
    addSectionLink(heading, target.id, label);
  });
  main?.querySelectorAll('figure[id]').forEach(figure => {
    const caption = figure.querySelector('figcaption');
    if (!caption) return;
    const tools = document.createElement('div');
    tools.className = 'figure-link-tools';
    addSectionLink(tools, figure.id, caption.textContent.trim().split('.')[0]);
    caption.append(tools);
  });

  // Reading theme: the reader's saved choice, otherwise the device setting. The page <head> applies it before first paint.
  const darkQuery = matchMedia('(prefers-color-scheme: dark)');
  const themeChoice = () => { const value = storage.get('theme'); return value === 'paper' || value === 'night' ? value : 'device'; };
  const applyTheme = () => {
    const choice = themeChoice();
    document.documentElement.dataset.theme = choice === 'device' ? (darkQuery.matches ? 'night' : 'paper') : choice;
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice)));
  };
  darkQuery.addEventListener?.('change', applyTheme);
  addEventListener('storage', event => { if (event.key === 'ante-lives.theme') applyTheme(); });
  applyTheme();

  // Reading preferences and saved places stay on the reader's own device.
  const setReadingSize = size => {
    document.documentElement.dataset.readingSize = ['standard','large','larger'].includes(size) ? size : 'standard';
    document.querySelectorAll('[data-text-size]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.textSize === document.documentElement.dataset.readingSize)));
  };
  setReadingSize(storage.get('text-size'));
  const savedPlace = () => {
    try {
      const saved = JSON.parse(storage.get('place'));
      return saved && pages.some(([name]) => name === saved.path) && /^[\w:-]+$/.test(saved.id) && typeof saved.label === 'string' ? saved : null;
    } catch { return null; }
  };
  const refreshResume = () => {
    document.querySelectorAll('.resume-notice').forEach(el => el.remove());
    const saved = savedPlace();
    document.querySelectorAll('.clear-place').forEach(button => { button.hidden = !saved; });
    document.querySelectorAll('.resume-link').forEach(link => {
      link.hidden = !saved;
      if (saved) { link.href = new URL(`${saved.path}#${saved.id}`, base); link.setAttribute('aria-label', `Continue reading ${saved.page}: ${saved.label}`); }
    });
    const topline = document.querySelector('.landing-topline');
    if (!saved || !topline) return;
    const bar = document.createElement('div');
    bar.className = 'resume-notice';
    const link = document.createElement('a');
    link.href = new URL(`${saved.path}#${saved.id}`, base);
    link.textContent = `Continue reading: ${saved.page} · ${saved.label}`;
    const clear = document.createElement('button');
    clear.type = 'button'; clear.textContent = 'Clear saved place';
    clear.addEventListener('click', () => { storage.remove('place'); bar.remove(); announce('Saved place cleared.'); });
    bar.append(link, clear);
    topline.after(bar);
  };
  const articleHeader = document.querySelector('.article-shell > .archive-section > header');
  if (articleHeader) {
    const tools = document.createElement('div');
    tools.className = 'reading-tools';
    tools.innerHTML = '<details class="reading-settings"><summary title="Reading settings: text size and appearance"><span class="reading-settings-glyph" aria-hidden="true">Aa</span><span class="reading-settings-name">Reading settings</span></summary><div class="reading-options"><fieldset><legend>Text size</legend><div class="text-size-options"><button type="button" data-text-size="standard">Standard</button><button type="button" data-text-size="large">Large</button><button type="button" data-text-size="larger">Larger</button></div></fieldset><fieldset><legend>Appearance</legend><div class="text-size-options theme-options"><button type="button" data-theme-choice="paper">Paper</button><button type="button" data-theme-choice="night">Night</button><button type="button" data-theme-choice="device">Device</button></div></fieldset><button type="button" class="clear-place">Clear saved place</button><p>Preferences and saved places stay on this device.</p></div></details><div class="place-tools"><a class="resume-link" hidden>Resume saved place</a><button type="button" class="cite-open" hidden>Cite</button><button type="button" class="save-place">Save my place</button></div><p class="reading-status" role="status"></p>';
    articleHeader.after(tools);
    const measureTools = () => document.documentElement.style.setProperty('--reading-tools-height', `${Math.ceil(tools.getBoundingClientRect().height)}px`);
    if ('ResizeObserver' in window) new ResizeObserver(measureTools).observe(tools);
    else addEventListener('resize', measureTools);
    measureTools();
    setReadingSize(document.documentElement.dataset.readingSize);
    tools.querySelectorAll('[data-text-size]').forEach(button => button.addEventListener('click', () => {
      setReadingSize(button.dataset.textSize);
      storage.set('text-size', button.dataset.textSize);
      tools.querySelector('.reading-status').textContent = `${button.textContent} text selected.`;
    }));
    tools.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
      if (button.dataset.themeChoice === 'device') storage.remove('theme'); else storage.set('theme', button.dataset.themeChoice);
      applyTheme();
      tools.querySelector('.reading-status').textContent = `${button.textContent} appearance selected.`;
    }));
    applyTheme();
    tools.querySelector('.save-place').addEventListener('click', () => {
      const current = [...document.querySelectorAll('.nav-group li a[href^="#"]')].filter(link => {
        const section = document.getElementById(link.hash.slice(1));
        const masthead = document.querySelector('.site-masthead')?.getBoundingClientRect().height || 0;
        return section && section.getBoundingClientRect().top <= masthead + tools.getBoundingClientRect().height + 40;
      }).pop() || document.querySelector('.nav-group li a[href^="#"]');
      if (!current) return;
      const saved = {path:file, id:current.hash.slice(1), page:pages.find(([name]) => name === file)[1], label:current.textContent.trim()};
      const didSave = storage.set('place', JSON.stringify(saved));
      tools.querySelector('.reading-status').textContent = didSave ? `Saved “${saved.label}” on this device.` : 'Your browser could not save a place. You can bookmark this section instead.';
      const saveButton = tools.querySelector('.save-place');
      saveButton.textContent = didSave ? 'Place saved' : 'Could not save';
      setTimeout(() => { saveButton.textContent = 'Save my place'; }, 1800);
      refreshResume();
    });
    tools.querySelector('.clear-place').addEventListener('click', () => {
      storage.remove('place'); refreshResume(); tools.querySelector('.reading-status').textContent = 'Saved place cleared.';
    });
  }
  refreshResume();

  if (document.querySelector('.article-shell')) {
    const progress = document.createElement('div');
    progress.className = 'reading-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.append(progress);
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
      const links = [...document.querySelectorAll('.nav-group li a[href^="#"]')];
      const masthead = document.querySelector('.site-masthead')?.getBoundingClientRect().height || 0;
      const toolHeight = document.querySelector('.reading-tools')?.getBoundingClientRect().height || 0;
      const current = links.filter(link => document.getElementById(link.hash.slice(1))?.getBoundingClientRect().top <= masthead + toolHeight + 40).pop() || links[0];
      links.forEach(link => {
        link.classList.toggle('active', link === current);
        if (link === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive:true});
    addEventListener('resize', update); document.addEventListener('DOMContentLoaded', update); update();
  }

  // A lazily fetched static index, with no service or framework dependency.
  let search, searchIndex, lastSearchTrigger, restoreSearchFocus = true, queryTimer;
  const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  // Keep source offsets when accents or ligatures change the normalized length.
  const matchRanges = (text, tokens) => {
    let folded = '', offset = 0;
    const positions = [], ranges = [];
    for (const character of text) {
      const value = normalize(character), end = offset + character.length;
      for (let i = 0; i < value.length; i++) positions.push([offset, end]);
      if (!value && positions.length) positions[positions.length-1][1] = end;
      folded += value; offset = end;
    }
    for (const token of tokens) {
      let from = 0, found;
      while ((found = folded.indexOf(token, from)) !== -1) {
        ranges.push([positions[found][0], positions[found+token.length-1][1]]);
        from = found + token.length;
      }
    }
    return ranges.sort((a,b) => a[0]-b[0]).reduce((merged, range) => {
      const last = merged[merged.length-1];
      if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
      else merged.push(range);
      return merged;
    }, []);
  };
  const highlight = (element, text, tokens) => {
    let offset = 0;
    for (const [start, end] of matchRanges(text, tokens)) {
      element.append(document.createTextNode(text.slice(offset, start)));
      const mark = document.createElement('mark'); mark.textContent = text.slice(start, end);
      element.append(mark); offset = end;
    }
    element.append(document.createTextNode(text.slice(offset)));
  };
  const loadIndex = () => searchIndex ||= fetch(new URL('search-index.json?v=20261121-esquivel', base)).then(response => {
    if (!response.ok) throw new Error('Index unavailable');
    return response.json();
  }).then(index => index.entries).catch(error => { searchIndex = null; throw error; });
  const renderResults = async () => {
    const input = search.querySelector('input');
    const count = search.querySelector('.search-count');
    const list = search.querySelector('.search-results');
    const query = normalize(input.value.trim());
    const tokens = query.split(/\s+/).filter(Boolean);
    count.textContent = 'Searching…';
    let entries, indexFailed = false;
    try { entries = await loadIndex(); }
    catch {
      count.textContent = 'Search could not load. You can open a chapter below.';
      indexFailed = true;
      entries = pages.map(([path, title]) => ({path, title, page:'', text:'', kind:'Page'}));
    }
    if (query !== normalize(input.value.trim())) return;
    const matches = tokens.length && !indexFailed ? entries.map(entry => {
      const title = normalize(entry.title), body = normalize(`${entry.page} ${entry.title} ${entry.text}`);
      return {...entry, score:tokens.every(token => body.includes(token)) ? tokens.reduce((score, token) => score + (title.includes(token) ? 6 : 1), 0) + (title === query ? 20 : 0) : 0};
    }).filter(entry => entry.score).sort((a,b) => b.score-a.score) : entries.filter(entry => entry.kind === 'Page');
    list.replaceChildren();
    matches.slice(0, 12).forEach(entry => {
      const item = document.createElement('li');
      const link = document.createElement('a'); link.href = new URL(entry.path, base);
      const context = document.createElement('span'); context.className = 'search-context'; context.textContent = entry.kind === 'Page' ? (['theory.html','adam.html','juan-patricio.html'].includes(entry.path) ? 'Chapter' : 'Page') : `${entry.page} · ${entry.kind}`;
      const title = document.createElement('strong'); highlight(title, entry.title, tokens);
      const snippet = document.createElement('p');
      const position = matchRanges(entry.text, tokens)[0]?.[0] || 0;
      let start = Math.max(0, position-55);
      if (start) { const boundary = entry.text.indexOf(' ', start); if (boundary >= 0 && boundary < start+25) start = boundary+1; }
      highlight(snippet, `${start ? '…' : ''}${entry.text.slice(start, start+190)}${entry.text.length > start+190 ? '…' : ''}`, tokens);
      link.append(context, title, snippet); item.append(link); list.append(item);
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
        restoreSearchFocus = false;
        const destination = new URL(link.href);
        search.close();
        if (slug(destination.pathname) === slug(location.pathname) && destination.hash) {
          event.preventDefault(); goToHash(destination.hash);
        }
      });
    });
    if (!indexFailed) count.textContent = tokens.length ? matches.length ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'}${matches.length > 12 ? '; showing the first 12' : ''}.` : 'No matches. Try a name, place, or shorter phrase.' : 'Browse a chapter, or search names, places, concepts, and sources.';
  };
  const openSearch = trigger => {
    if (document.querySelector('dialog[open]') && !search?.open) return;
    if (!search) {
      search = document.createElement('dialog'); search.id = 'project-find'; search.className = 'project-search';
      search.setAttribute('aria-labelledby', 'project-find-title');
      search.innerHTML = '<header class="search-bar"><h2 id="project-find-title">Find in the project</h2><button class="search-close" type="button" aria-label="Close project search">Close ×</button></header><div class="search-body"><label for="project-find-input">Search the project</label><input id="project-find-input" type="search" placeholder="Names, places, concepts…" autocomplete="off" autofocus aria-describedby="project-find-count"/><p class="search-count" id="project-find-count" role="status" aria-live="polite"></p><ol class="search-results"></ol></div>';
      document.body.append(search);
      document.querySelectorAll('.site-find').forEach(button => button.setAttribute('aria-controls', 'project-find'));
      search.querySelector('.search-close').addEventListener('click', () => search.close());
      search.addEventListener('click', event => { if (event.target === search) search.close(); });
      search.addEventListener('close', () => { if (restoreSearchFocus) lastSearchTrigger?.focus(); });
      search.querySelector('input').addEventListener('input', () => { clearTimeout(queryTimer); queryTimer = setTimeout(renderResults, 90); });
      search.querySelector('input').addEventListener('keydown', async event => {
        if (event.key === 'Escape') {
          event.preventDefault(); event.stopPropagation(); search.close(); return;
        }
        const first = search.querySelector('.search-results a');
        if (first && event.key === 'ArrowDown') { event.preventDefault(); first.focus(); }
        if (event.key === 'Enter') {
          event.preventDefault(); clearTimeout(queryTimer); await renderResults(); search.querySelector('.search-results a')?.click();
        }
      });
    }
    lastSearchTrigger = trigger; restoreSearchFocus = true; search.showModal(); search.querySelector('input').focus(); renderResults();
  };
  document.querySelectorAll('.site-find').forEach(button => {
    button.hidden = false; button.setAttribute('aria-haspopup', 'dialog');
    button.title = 'Search the project (/)'; button.setAttribute('aria-keyshortcuts', '/ Control+K Meta+K');
    button.addEventListener('click', () => openSearch(button));
  });
  addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); openSearch(document.querySelector('.site-find'));
    }
    // "/" also opens search, as on most reference sites, unless the reader is typing.
    if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !event.target.closest('input,textarea,select,[contenteditable]') && !document.querySelector('dialog[open]')) {
      event.preventDefault(); openSearch(document.querySelector('.site-find'));
    }
  });

  // Citations in Chicago and MLA, built from the page's canonical address and today's date.
  const projectTitle = 'Ante-Possessive Lives in the Americas';
  const escapeHTML = text => text.replace(/[&<>"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[character]);
  const citations = () => {
    const url = document.querySelector('link[rel="canonical"]')?.href || location.href.split('#')[0];
    const bare = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const now = new Date();
    const months = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
    const mlaDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const title = file === 'index.html' ? '' : pages.find(([name]) => name === file)[1];
    const work = `<i>${projectTitle}</i>`;
    // Standard forms: the director in the author position, the university as publisher; the full team is on the About page.
    // Chicago omits the access date because the work carries a publication date; MLA keeps it.
    return title ? [
      ['Chicago', `“${escapeHTML(title)}.” In ${work}, directed by David Kazanjian. University of Pennsylvania, 2026. ${url}.`],
      ['MLA', `“${escapeHTML(title)}.” ${work}, directed by David Kazanjian, U of Pennsylvania, 2026, ${bare}. Accessed ${mlaDate}.`]
    ] : [
      ['Chicago', `Kazanjian, David, dir. ${work}. University of Pennsylvania, 2026. ${url}.`],
      ['MLA', `Kazanjian, David, director. ${work}. U of Pennsylvania, 2026, ${bare}. Accessed ${mlaDate}.`]
    ];
  };
  let citeDialog, citeTrigger;
  const copyCitation = async (html, button) => {
    const holder = document.createElement('div'); holder.innerHTML = html;
    const text = holder.textContent;
    try {
      if (window.ClipboardItem && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({'text/html': new Blob([html], {type:'text/html'}), 'text/plain': new Blob([text], {type:'text/plain'})})]);
      } else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else throw new Error('Clipboard unavailable');
      button.textContent = 'Copied'; announce('Citation copied.');
    } catch {
      const range = document.createRange(); range.selectNodeContents(button.closest('.citation-style').querySelector('.citation-text'));
      getSelection().removeAllRanges(); getSelection().addRange(range);
      button.textContent = 'Selected'; announce('The citation is selected, ready to copy.');
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 1800);
  };
  const openCite = trigger => {
    if (!citeDialog) {
      citeDialog = document.createElement('dialog'); citeDialog.className = 'cite-dialog'; citeDialog.setAttribute('aria-labelledby', 'cite-dialog-title');
      citeDialog.innerHTML = '<header class="search-bar"><h2 id="cite-dialog-title"></h2><button class="search-close" type="button" aria-label="Close citation">Close ×</button></header><div class="search-body cite-body"></div>';
      document.body.append(citeDialog);
      citeDialog.querySelector('.search-close').addEventListener('click', () => citeDialog.close());
      citeDialog.addEventListener('click', event => { if (event.target === citeDialog) citeDialog.close(); });
      citeDialog.addEventListener('close', () => citeTrigger?.focus());
    }
    citeTrigger = trigger;
    citeDialog.querySelector('h2').textContent = file === 'index.html' ? 'Cite this project' : 'Cite this page';
    const body = citeDialog.querySelector('.cite-body'); body.replaceChildren();
    citations().forEach(([style, html]) => {
      const block = document.createElement('section'); block.className = 'citation-style';
      const label = document.createElement('h3'); label.textContent = style;
      const text = document.createElement('p'); text.className = 'citation-text'; text.innerHTML = html;
      const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'citation-copy'; copy.textContent = 'Copy';
      copy.setAttribute('aria-label', `Copy the ${style} citation`);
      copy.addEventListener('click', () => copyCitation(html, copy));
      block.append(label, text, copy); body.append(block);
    });
    const note = document.createElement('p'); note.className = 'citation-note';
    note.textContent = 'The accessed date is today’s. Check the form against the style guide you are following.';
    body.append(note);
    citeDialog.showModal(); citeDialog.querySelector('.citation-copy').focus();
  };
  document.querySelectorAll('.cite-open').forEach(button => {
    button.hidden = false; button.setAttribute('aria-haspopup', 'dialog');
    button.addEventListener('click', () => openCite(button));
  });

  const images = Array.from(document.querySelectorAll('.article-shell img')).filter(img => !img.closest('.comparison-slider,.chapter-source-plate'));
  let viewer, lastTrigger;
  const openImage = (img, trigger) => {
    if (!viewer) {
      viewer = document.createElement('dialog'); viewer.className = 'image-viewer'; viewer.setAttribute('aria-label', 'Archival image viewer');
      viewer.innerHTML = '<div class="viewer-bar"><p></p><button type="button" class="viewer-zoom" aria-pressed="false">Zoom in +</button><a target="_blank" rel="noopener" class="viewer-original">Original file</a><button type="button" class="viewer-close" autofocus aria-label="Close image viewer">Close ×</button></div><div class="viewer-stage"><img alt=""/></div>';
      document.body.append(viewer);
      viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
      viewer.querySelector('.viewer-zoom').addEventListener('click', event => {
        const enlarged = viewer.querySelector('.viewer-stage').classList.toggle('is-zoomed');
        event.target.textContent = enlarged ? 'Fit image −' : 'Zoom in +'; event.target.setAttribute('aria-pressed', String(enlarged));
      });
      viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
      viewer.addEventListener('close', () => lastTrigger?.focus());
    }
    lastTrigger = trigger;
    viewer.querySelector('.viewer-bar p').textContent = img.alt;
    const full = viewer.querySelector('.viewer-stage img'); full.src = img.src; full.alt = img.alt;
    viewer.querySelector('.viewer-original').href = img.src;
    viewer.querySelector('.viewer-stage').classList.remove('is-zoomed');
    viewer.querySelector('.viewer-stage').scrollTop = 0; viewer.querySelector('.viewer-stage').scrollLeft = 0;
    viewer.querySelector('.viewer-zoom').textContent = 'Zoom in +'; viewer.querySelector('.viewer-zoom').setAttribute('aria-pressed', 'false'); viewer.showModal();
  };
  images.forEach(img => {
    const tools = document.createElement('div'); tools.className = 'image-tools';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'enlarge-image'; button.textContent = 'Enlarge image';
    button.setAttribute('aria-label', `Enlarge image: ${img.alt}`); button.addEventListener('click', () => openImage(img, button));
    tools.append(button); img.insertAdjacentElement('afterend', tools);
  });
})();
