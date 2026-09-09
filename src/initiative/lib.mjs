export const esc=value=>String(value??'').replace(/[&<>"']/g,character=>({
  '&':'&amp;',
  '<':'&lt;',
  '>':'&gt;',
  '"':'&quot;',
  "'":'&#39;'
}[character]));

export const lines=value=>(Array.isArray(value)?value:[value]).map(esc).join('<br>');

export function safeHref(value){
  const href=String(value??'');
  if(!/^(?:https:\/\/|mailto:|#|\.\.\/|\.\/|[a-zA-Z0-9][a-zA-Z0-9_./-]*)/.test(href))throw new Error('Unsupported Initiative link: '+href);
  if(/[\u0000-\u001f"'<>]/.test(href))throw new Error('Unsafe Initiative link: '+href);
  return esc(href);
}

export function linkAttrs(item){
  const external=String(item.href).startsWith('https://');
  return 'href="'+safeHref(item.href)+'"'+(external?' target="_blank" rel="noopener"':'');
}

export function initiativeImage(image,{priority=false,lazy=true}={}){
  const remote=String(image.src).startsWith('https://');
  const src=remote?safeHref(image.src):'../'+safeHref(image.src);
  return '<img src="'+src+'" width="'+Number(image.width)+'" height="'+Number(image.height)+'" alt="'+esc(image.alt)+'" decoding="async"'+(remote?' referrerpolicy="no-referrer"':'')+(priority?' fetchpriority="high"':lazy?' loading="lazy"':'')+'>';
}

export function action(item){
  const style=item.style==='secondary'?' button-secondary':' button-primary';
  return '<a class="button'+style+'" '+linkAttrs(item)+'>'+esc(item.label)+(item.arrow?' <span aria-hidden="true">→</span>':'')+'</a>';
}

const iconPaths={
  leaf:'<path d="M19.5 4.5C11 5.2 5.8 9.8 4.8 18.8c4.5.4 8.2-.7 10.7-3.2 2.7-2.7 3.8-6.6 4-11.1Z"></path><path d="M5 19c2.8-4.2 6.1-7.3 10.4-9.3"></path>',
  paw:'<circle cx="8" cy="7" r="2"></circle><circle cx="16" cy="7" r="2"></circle><circle cx="5.5" cy="12" r="1.8"></circle><circle cx="18.5" cy="12" r="1.8"></circle><path d="M8 18.2c0-2.3 1.8-4.2 4-4.2s4 1.9 4 4.2c0 1.5-1.1 2.3-2.4 1.7a3.9 3.9 0 0 0-3.2 0C9.1 20.5 8 19.7 8 18.2Z"></path>',
  science:'<path d="M9 3h6M10 3v5l-5 9.2A2.5 2.5 0 0 0 7.2 21h9.6a2.5 2.5 0 0 0 2.2-3.8L14 8V3"></path><path d="M7.5 16h9M10 12h4"></path>',
  globe:'<circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path>',
  care:'<circle cx="12" cy="12" r="9"></circle><path d="M12 7v10M7 12h10"></path>',
  institution:'<path d="m3 9 9-5 9 5M5 10h14M6 10v8M10 10v8M14 10v8M18 10v8M4 20h16"></path>',
  recovery:'<path d="M12 20v-8M12 15c-4.7 0-7-2.5-7-7 4.7 0 7 2.5 7 7ZM12 12c0-4.7 2.3-7 7-7 0 4.7-2.3 7-7 7Z"></path>',
  field:'<path d="m3 19 6.2-9 3.1 4 2.7-4 6 9H3Z"></path><path d="M14.6 5.2 17 3l2.4 2.2L17 7.5l-2.4-2.3Z"></path>'
};

export function initiativeIcon(name){
  const path=iconPaths[name];
  if(!path)throw new Error('Unknown Initiative icon '+name);
  return '<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">'+path+'</svg>';
}
