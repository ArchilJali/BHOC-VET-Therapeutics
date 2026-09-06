import {esc,attrs,icon} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main news-page">
  <section class="page-hero" aria-labelledby="news-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="news-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="page-section" aria-labelledby="news-channels-heading"><div class="section-heading"><span class="page-eyebrow">Verified channels</span><h2 id="news-channels-heading">Choose the source.</h2></div><div class="news-grid">${page.channels.map(channel=>`<article class="news-card"><span class="news-icon">${icon(channel.icon)}</span><h3>${esc(channel.title)}</h3><p>${esc(channel.text)}</p><a class="text-link" ${attrs(channel.link)}>${esc(channel.link.label)} ${icon('arrow')}</a></article>`).join('')}</div></section>
</main>`;
