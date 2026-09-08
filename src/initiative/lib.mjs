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
