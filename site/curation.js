/* Static reading tools. No accounts, requests, telemetry, or server state. */
(() => {
  'use strict';
  const pages = [
    ['index.html','Project Index'], ['theory.html','Theory & Method'],
    ['adam.html','Adam Saffin'], ['juan-patricio.html','Juan Patricio'],
    ['bibliography.html','Sources & Bibliography'], ['credits.html','About & Credits']
  ];
  const base = new URL('.',document.currentScript.src);
  const slug = /\/$/.test(location.pathname) ? 'index' : decodeURIComponent(location.pathname).split('/').pop().replace(/\.html$/,'') || 'index';
  const currentFile = pages.find(([path]) => path === `${slug}.html`)?.[0];
  const key = 'ante-lives.bookmarks';
  const roman = n => {
    let result = '';
    for (const [value,letters] of [[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]) {
      while (n >= value) { result += letters; n -= value; }
    }
    return result;
  };
  const valid = value => value && pages.some(([path]) => path === value.path)
    && typeof value.id === 'string' && (!value.id || /^[A-Za-z][\w:-]{0,160}$/.test(value.id))
    && typeof value.label === 'string' && value.label.length > 0 && value.label.length <= 250;
  const load = () => {
    try {
      const values = JSON.parse(localStorage.getItem(key));
      return Array.isArray(values) ? values.filter(valid).slice(0,80).filter((item,index,array) => array.findIndex(other => other.path === item.path && other.id === item.id) === index) : [];
    } catch { return []; }
  };
  let saved = load();
  const same = (a,b) => a.path === b.path && a.id === b.id;
  const isSaved = entry => saved.some(item => same(item,entry));
  const announce = text => { const status = document.querySelector('.interface-status'); if (status) status.textContent = text; };
  const icon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 18 22'); svg.setAttribute('aria-hidden','true');
    const path = document.createElementNS(svg.namespaceURI,'path');
    path.setAttribute('d','M3 2h12v18l-6-4-6 4Z'); svg.append(path); return svg;
  };
  const span = (className,text) => { const node=document.createElement('span'); node.className=className; node.textContent=text; return node; };
  const bookmarkButtons = [];
  let dialog, list, count, empty, close, returnFocus;
  const write = next => {
    try { localStorage.setItem(key,JSON.stringify(next)); saved=next; return true; }
    catch { announce('This browser could not store a bookmark. You can use the section’s Link control to keep its address.'); return false; }
  };
  const refresh = () => {
    bookmarkButtons.forEach(({button,entry}) => {
      const selected=isSaved(entry);
      button.setAttribute('aria-pressed',String(selected));
      button.setAttribute('aria-label',`${selected?'Remove bookmark for':'Bookmark'} ${entry.label}`);
      button.querySelector('.bookmark-label').textContent=button.dataset.bookmarkContext==='chapter' ? (selected?'Chapter saved':'Save chapter') : (selected?'Saved':'Save');
    });
    document.querySelectorAll('.bookmark-count').forEach(node => { node.textContent=saved.length?roman(saved.length):''; });
    if (dialog?.open) render();
  };
  const toggle = entry => {
    const selected=isSaved(entry);
    if (!selected && saved.length >= 80) { announce('Your saved list is full. Remove a bookmark before saving another.'); return; }
    if (!write(selected ? saved.filter(item => !same(item,entry)) : [...saved,entry])) return;
    refresh(); announce(selected?`Removed the bookmark for ${entry.label}.`:`Saved ${entry.label} on this device.`);
  };
  const makeBookmark = (entry,button=document.createElement('button')) => {
    button.type='button'; button.classList.add('bookmark-action'); button.hidden=false;
    button.append(icon(),span('bookmark-label','Save'));
    button.addEventListener('click',() => toggle(entry));
    bookmarkButtons.push({button,entry}); return button;
  };
  const render = () => {
    list.replaceChildren(); count.textContent=saved.length?`${roman(saved.length)} saved ${saved.length===1?'item':'items'}`:'No saved items yet';
    empty.hidden=!!saved.length;
    saved.forEach(entry => {
      const row=document.createElement('li'),link=document.createElement('a'),remove=document.createElement('button');
      const chapter=pages.find(([path]) => path===entry.path);
      link.href=new URL(entry.path+(entry.id?`#${entry.id}`:''),base).href;
      const context=entry.id ? chapter[1] : (['theory.html','adam.html','juan-patricio.html'].includes(entry.path) ? 'Chapter' : 'Page');
      link.append(span('saved-context',context),document.createTextNode(entry.label));
      remove.type='button'; remove.className='bookmark-remove'; remove.textContent='Remove';
      remove.setAttribute('aria-label',`Remove bookmark for ${entry.label}`);
      remove.addEventListener('click',() => { toggle(entry); (list.querySelector('.bookmark-remove') || close).focus(); });
      link.addEventListener('click',() => dialog.close());
      row.append(link,remove); list.append(row);
    });
  };
  const buildDialog = () => {
    dialog=document.createElement('dialog'); dialog.className='saved-sections'; dialog.id='saved-sections';
    dialog.setAttribute('aria-labelledby','saved-sections-title');
    const header=document.createElement('div'),title=document.createElement('h2'),body=document.createElement('div'),note=document.createElement('p');
    header.className='saved-header'; title.id='saved-sections-title'; title.textContent='Saved reading';
    close=document.createElement('button'); close.type='button'; close.className='saved-close'; close.textContent='Close';
    close.addEventListener('click',() => dialog.close());
    body.className='saved-body'; note.className='saved-note'; note.textContent='Chapters and sections saved in this browser. Your reading place is kept separately.';
    count=document.createElement('p'); count.className='saved-count'; count.setAttribute('role','status');
    list=document.createElement('ul'); list.className='saved-list';
    empty=document.createElement('p'); empty.className='saved-empty'; empty.textContent='Use the bookmark beside a section heading, or beside a chapter in the Project Index, to add it here.';
    header.append(title,close); body.append(count,list,empty,note); dialog.append(header,body); document.body.append(dialog);
    dialog.addEventListener('close',() => returnFocus?.focus());
    dialog.addEventListener('click',event => { if(event.target===dialog) { const box=dialog.getBoundingClientRect(); if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) dialog.close(); } });
    document.querySelectorAll('.bookmark-open').forEach(button => button.setAttribute('aria-controls',dialog.id));
  };
  const header=document.querySelector('.site-masthead,.landing-topline nav,.missing-header');
  if (header) {
    const open=document.createElement('button'); open.type='button'; open.className='bookmark-open';
    open.setAttribute('aria-label','Open saved reading'); open.setAttribute('aria-haspopup','dialog'); open.title='Saved reading';
    open.append(icon(),span('bookmark-label','Saved'),span('bookmark-count',''));
    // Saved reading sits before Search in both reading order and tab order.
    const find=header.querySelector(':scope > .site-find'); if(find) find.before(open); else header.append(open);
    open.addEventListener('click',() => { if(!dialog) buildDialog(); returnFocus=open; saved=load(); render(); dialog.showModal(); });
  }
  document.querySelectorAll('[data-bookmark-path]').forEach(button => {
    const entry={path:button.dataset.bookmarkPath,id:'',label:button.dataset.bookmarkLabel};
    if(valid(entry)) makeBookmark(entry,button);
  });
  if (currentFile && currentFile!=='index.html') {
    // Chapters are saved from the Project Index; a reader's place is kept with "Save my place".
    // Per-heading bookmark buttons were removed on 17 November 2026; sections saved before then still list and open.
  }
  refresh();
  addEventListener('storage',event => { if(event.key===key) { saved=load(); refresh(); } });
  // The color band and mobile disclosure can change the actual sticky height.
  const masthead=document.querySelector('.site-masthead');
  if(masthead) {
    const measure=() => document.documentElement.style.setProperty('--masthead',`${Math.ceil(masthead.getBoundingClientRect().height)}px`);
    if('ResizeObserver' in window) new ResizeObserver(measure).observe(masthead);
    else addEventListener('resize',measure);
    measure();
  }
})();
