async () => {
  // Shows the edited version of the current live page in a frame; re-run after navigating.
  const P = JSON.parse(localStorage.getItem('ante-preview-patch') || '{}');
  const apply = (text, reps) => { for (const [o, n] of reps || []) { if (!text.includes(o)) throw new Error('Preview patch no longer matches the live file: ' + o.slice(0, 60)); text = text.replace(o, () => n); } return text; };
  const render = async path => {
    const clean = path.replace(/^\//, '').replace(/[#?].*$/, '');
    const file = !clean ? 'index.html' : clean.endsWith('.html') ? clean : clean + '.html';
    let html = apply(await (await fetch('/' + file, {cache: 'no-store'})).text(), P[file]);
    // Responsive copies that are not published yet fall back to the image's original file.
    const unpublished = JSON.parse(localStorage.getItem('ante-preview-unpublished') || '[]');
    html = html.replace(/\ssrcset="([^"]*)"/g, (match, list) => {
      const kept = list.split(',').map(s => s.trim()).filter(c => c && !unpublished.includes(c.split(/\s+/)[0]));
      return kept.length ? ` srcset="${kept.join(', ')}"` : '';
    });
    const urls = {};
    for (const name of Object.keys(P).filter(n => /\.(css|js|json)$/.test(n))) {
      let text = apply(await (await fetch('/' + name, {cache: 'no-store'})).text(), P[name]);
      if (name.endsWith('.js')) text = text.replace('document.currentScript.src', JSON.stringify(location.origin + '/'));
      urls[name] = URL.createObjectURL(new Blob([text], {type: name.endsWith('.css') ? 'text/css' : name.endsWith('.json') ? 'application/json' : 'text/javascript'}));
    }
    for (const [name, url] of Object.entries(urls)) {
      const escaped = name.replace(/\./g, '\\.');
      html = html.replace(new RegExp(`((?:href|src)=")/?${escaped}(\\?v=[^"]*)?"`, 'g'), `$1${url}"`);
    }
    const guard = '<script>{const p=history.pushState.bind(history),r=history.replaceState.bind(history);history.pushState=(...a)=>{try{p(...a)}catch(e){}};history.replaceState=(...a)=>{try{r(...a)}catch(e){}}}</script>';
    html = html.replace('<head>', `<head><base href="${location.origin}/${file}">${guard}`);
    history.replaceState(null, '', '/' + (file === 'index.html' ? '' : file.replace(/\.html$/, '')));
    document.querySelectorAll('iframe.ante-preview, .ante-preview-badge').forEach(el => el.remove());
    const frame = document.createElement('iframe');
    frame.className = 'ante-preview';
    frame.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;border:0;z-index:2147483646;background:#fff';
    frame.srcdoc = html;
    document.body.append(frame);
    await new Promise(resolve => frame.onload = resolve);
    const badge = document.createElement('div');
    badge.className = 'ante-preview-badge';
    badge.textContent = 'Preview · unpublished';
    badge.style.cssText = 'position:fixed;left:50%;bottom:10px;transform:translateX(-50%);z-index:2147483647;padding:4px 10px;font:12px Georgia,serif;color:#faf5e9;background:#662d35e6;pointer-events:none';
    document.body.append(badge);
    // Same-site page links open the edited version of that page.
    frame.contentDocument.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const url = new URL(link.getAttribute('href'), `${location.origin}/${file}`);
      if (url.origin !== location.origin || /\.(jpe?g|png|webp|pdf|svg)$/i.test(url.pathname)) return;
      const target = url.pathname.replace(/^\//, '').replace(/\.html$/, '') || 'index';
      if (target === file.replace(/\.html$/, '')) return;
      event.preventDefault();
      render(url.pathname).then(() => { if (url.hash) frame.contentWindow.location.hash = url.hash; });
    }, true);
    return file;
  };
  return render(location.pathname);
}
