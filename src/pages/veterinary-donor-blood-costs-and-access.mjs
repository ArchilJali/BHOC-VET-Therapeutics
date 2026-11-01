import {esc,attrs,img} from '../lib/html.mjs';

export default page=>[
  '<main id="main" class="subpage-main access-news">',
  '<style>',
  '.access-news{max-width:1160px;margin:auto;padding:24px var(--gutter) 36px}.access-news h1{max-width:960px;font-size:clamp(29px,4vw,47px);line-height:1.1;margin:10px 0 14px}.access-news .lead{max-width:980px;font-size:17px;line-height:1.6}.access-news .article-meta{font-size:12px;color:var(--muted);margin:12px 0 16px}.access-news .access-opening{display:grid;grid-template-columns:1.12fr 1fr;align-items:start;gap:24px;margin:20px 0 28px}.access-news figure{margin:0}.access-news figure img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:12px}.access-news figcaption,.access-news .price-note{font-size:12px;color:var(--muted);line-height:1.55;margin-top:8px}.access-news h2{font-size:23px;line-height:1.2;margin:0 0 12px}.access-news table{border-collapse:collapse;width:100%;font-size:13px;line-height:1.45;table-layout:fixed}.access-news th,.access-news td{text-align:left;vertical-align:top;padding:9px 7px;border-bottom:1px solid var(--line);overflow-wrap:anywhere}.access-news th{font-size:11px;text-transform:uppercase;letter-spacing:.035em}.access-news th:first-child{width:28%}.access-news th:last-child{width:16%}.access-news td:last-child{font-weight:800;white-space:nowrap}.access-news .article-copy{max-width:900px}.access-news .article-copy p{font-size:16px;line-height:1.7;margin:0 0 16px}.access-news .access-original{display:inline-flex;margin:5px 0 22px;font-weight:750;font-size:14px;overflow-wrap:anywhere}.access-news .access-sources{padding-top:20px;border-top:1px solid var(--line);display:grid;grid-template-columns:1fr 1fr;gap:24px}.access-news .access-sources h2{font-size:18px}.access-news .access-sources ul{padding-left:18px;margin:0}.access-news .access-sources li{font-size:13px;line-height:1.6;margin:6px 0;overflow-wrap:anywhere}.access-news .article-links{display:flex;flex-wrap:wrap;gap:12px 22px;margin-top:24px;padding-top:18px;border-top:1px solid var(--line);font-size:14px}.access-news .contact-link{display:inline-block;font-weight:750;margin-bottom:22px}@media(max-width:800px){.access-news .access-opening{grid-template-columns:1fr;gap:22px}.access-news figure{max-width:680px}.access-news .access-sources{grid-template-columns:1fr}}@media(max-width:600px){.access-news{padding-top:18px}.access-news .lead,.access-news .article-copy p{font-size:15px}.access-news table{font-size:12px}.access-news th,.access-news td{padding:8px 5px}.access-news .article-links{display:grid;gap:10px}}',
  '</style><article aria-labelledby="donor-blood-access-heading"><header>',
  '<span class="page-eyebrow">'+esc(page.eyebrow)+'</span>',
  '<h1 id="donor-blood-access-heading">'+esc(page.heading)+'</h1>',
  '<p class="lead">'+esc(page.lead)+'</p>',
  '<p class="article-meta"><time datetime="'+esc(page.datePublished)+'">'+esc(page.dateLabel)+'</time> · By '+esc(page.authorName)+'</p>',
  '<a class="access-original" '+attrs(page.sourceLink)+'>'+esc(page.sourceLink.label)+' ↗</a></header>',
  '<div class="access-opening"><figure><a href="./'+esc(page.socialImage.src)+'" target="_blank" rel="noopener noreferrer" aria-label="View the complete BHOC veterinary campaign artwork">',
  img(page.image,'fetchpriority="high"'),
  '</a><figcaption>'+esc(page.imageCaption)+'</figcaption></figure>',
  '<section aria-labelledby="published-blood-prices"><h2 id="published-blood-prices">'+esc(page.pricesHeading)+'</h2>',
  '<table><thead><tr><th scope="col">Supplier</th><th scope="col">Product</th><th scope="col">Unit</th><th scope="col">USD</th></tr></thead><tbody>',
  ...page.priceRows.map(row=>'<tr><td>'+esc(row.supplier)+'</td><td>'+esc(row.product)+'</td><td>'+esc(row.unit)+'</td><td>'+(row.usd.startsWith('≈')?'≈$'+esc(row.usd.slice(1)):'$'+esc(row.usd))+'</td></tr>'),
  '</tbody></table><p class="price-note">'+esc(page.priceNote)+'</p></section></div>',
  '<div class="article-copy">',
  ...page.paragraphs.map(p=>'<p>'+(p.emphasis?'<strong>':'')+esc(p.text)+(p.emphasis?'</strong>':'')+'</p>'),
  '<a class="contact-link" href="mailto:info@bhoctherapeutics.com">info@bhoctherapeutics.com</a></div>',
  '<aside class="access-sources" aria-label="Price and availability sources">',
  ...page.referenceGroups.map(group=>'<section><h2>'+esc(group.heading)+'</h2><ul>'+group.links.map(item=>'<li><a '+attrs(item)+'>'+esc(item.label)+'</a></li>').join('')+'</ul></section>'),
  '</aside><nav class="article-links" aria-label="Related BHOC resources">',
  ...page.relatedLinks.map(item=>'<a '+attrs(item)+'>'+esc(item.label)+'</a>'),
  '</nav></article></main>'
].join('');
