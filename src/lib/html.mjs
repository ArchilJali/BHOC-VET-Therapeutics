export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const lines=value=>(Array.isArray(value)?value:[value]).map(esc).join('<br> ');
export function url(value){ if(!/^(https:\/\/|mailto:|#|\.?\/?[a-zA-Z0-9_-])/.test(value)||/^\w+:/i.test(value)&&!/^https:|^mailto:/i.test(value)) throw new Error('Unsupported link: '+value); return esc(value); }
export const icon=name=>`<svg aria-hidden="true" focusable="false"><use href="#${esc(name)}"/></svg>`;
export function attrs(link){return `href="${url(link.href)}"${link.dialog?` data-open="${esc(link.dialog)}"`:''}${link.href.startsWith('https://')?' target="_blank" rel="noopener noreferrer"':''}`;}
export const link=(data,classes='text-link',label=data.label)=>`<a class="${esc(classes)}" ${attrs(data)}>${esc(label)}</a>`;
export const button=data=>`<a class="button${data.style==='outline'?' button-outline':''}" ${attrs(data)}><span>${esc(data.label)}</span>${icon('arrow')}</a>`;
export function img(image,extra=''){return `<img src="./${url(image.src)}" alt="${esc(image.alt)}" width="${Number(image.width)}" height="${Number(image.height)}" decoding="async" ${extra}>`;}
export const section=(data,type,body)=>`<section id="${esc(data.id)}" class="block-${type}" data-block="${type}" aria-labelledby="${esc(data.id)}-heading">${body}</section>`;
