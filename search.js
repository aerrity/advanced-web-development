(() => {
  'use strict';
  const entries = window.AWD_SEARCH_INDEX || [];
  const base = new URL(document.currentScript.getAttribute('data-search-root') || './', location.href);
  const trigger = document.querySelector('.awd-search-trigger');
  if (!trigger || !entries.length) return;
  const dialog=document.createElement('dialog'); dialog.className='awd-search-dialog';dialog.setAttribute('aria-label','Search course materials');
  dialog.innerHTML='<div class="awd-search-panel"><div class="awd-search-header"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search lessons and code" placeholder="Search lessons, concepts, code…" autocomplete="off" spellcheck="false"><button type="button" class="awd-search-close" aria-label="Close search">Esc</button></div><div class="awd-search-meta" role="status" aria-live="polite">Type a topic or code term to search</div><div class="awd-search-results" role="listbox" aria-label="Search results"></div><div class="awd-search-help">↑ ↓ to select · Enter to open · Esc to close</div></div>';
  document.body.appendChild(dialog);
  const input=dialog.querySelector('input'),results=dialog.querySelector('.awd-search-results'),meta=dialog.querySelector('.awd-search-meta');
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let matches=[],active=0;
  const norm=s=>String(s||'').toLocaleLowerCase();
  const tokens=s=>norm(s).trim().split(/\s+/).filter(Boolean).slice(0,8);
  const visibleExcerpt=(item,terms)=>{
    const body=item.body||'';const low=norm(body);
    const positions=terms.map(t=>low.indexOf(t)).filter(n=>n>=0);
    if(!positions.length)return item.excerpt||'';
    const start=Math.max(0,Math.min(...positions)-60);
    const chunk=body.slice(start,start+185).replace(/\s+/g,' ');
    return (start?'…':'')+chunk+(body.length>start+185?'…':'');
  };
  function refresh(){
    const terms=tokens(input.value);
    if(!terms.length){matches=[];results.innerHTML='<div class="awd-search-empty">Find Laravel concepts, tutorial steps, functions such as <code>belongsToMany</code>, and assessment requirements.</div>';meta.textContent='Search all course resources';return;}
    matches=entries.map(item=>{
      const title=norm(item.title),label=norm(item.label),ex=norm(item.excerpt),body=norm(item.body);
      if(!terms.every(t=>title.includes(t)||label.includes(t)||ex.includes(t)||body.includes(t)))return null;
      const score=terms.reduce((sum,t)=>sum+(title.includes(t)?15:0)+(label.includes(t)?12:0)+(ex.includes(t)?5:0)+(body.includes(t)?1:0),0);
      return {...item,score};
    }).filter(Boolean).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,20);
    active=0;
    meta.textContent=matches.length?`Showing ${matches.length}${matches.length===20?' top':''} matching results`:'No matching lessons found';
    results.innerHTML=matches.length?matches.map((item,i)=>`<a class="awd-search-result" role="option" aria-selected="${i===active}" href="${esc(new URL(item.url,base).href)}" data-i="${i}"><small>${esc(item.type)}${item.label?' · '+esc(item.label):''}</small><strong>${esc(item.title)}</strong><span>${esc(visibleExcerpt(item,terms))}</span></a>`).join(''):'<div class="awd-search-empty">No matches. Try a simpler term such as <strong>route</strong>, <strong>review</strong> or <strong>Blade</strong>.</div>';
  }
  function open(){if(!dialog.open)dialog.showModal();input.value='';refresh();input.focus();}
  trigger.addEventListener('click',open);
  dialog.querySelector('.awd-search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>trigger.focus());
  input.addEventListener('input',refresh);
  input.addEventListener('keydown',e=>{
    if(['ArrowDown','ArrowUp'].includes(e.key)&&matches.length){e.preventDefault();active=(active+(e.key==='ArrowDown'?1:-1)+matches.length)%matches.length;results.querySelectorAll('.awd-search-result').forEach((a,i)=>a.setAttribute('aria-selected',String(i===active)));results.querySelectorAll('.awd-search-result')[active]?.scrollIntoView({block:'nearest'});}
    if(e.key==='Enter'&&matches.length){e.preventDefault();location.href=new URL(matches[active].url,base).href;dialog.close();}
  });
  results.addEventListener('mousemove',e=>{const a=e.target.closest('.awd-search-result');if(a){active=Number(a.dataset.i);results.querySelectorAll('.awd-search-result').forEach((a,i)=>a.setAttribute('aria-selected',String(i===active)));}});
  document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.open)dialog.close();else open();}});
})();
