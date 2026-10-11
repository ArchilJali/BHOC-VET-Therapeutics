import {esc,attrs} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main vatican-editorial">
  <section class="page-hero" style="display:block;width:100%;padding:30px clamp(20px,4vw,64px) 24px"><div style="display:block;max-width:none;width:100%"><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 style="display:block;max-width:none;width:100%;white-space:normal;line-height:1.12">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="page-section" style="display:block;max-width:980px;margin:0 auto;padding:26px 24px 60px">
    <figure style="margin:0 auto 28px;max-width:640px">
      <img src="${esc(page.image.src)}" width="${page.image.width}" height="${page.image.height}" alt="${esc(page.image.alt)}" style="display:block;width:100%;height:auto;border-radius:12px" loading="eager">
      <figcaption style="font-size:12px;line-height:1.6;color:#555;margin-top:8px">Pope Leo XIV, photographed on 12 May 2025. Editorial illustration; not an image of the Commission’s document.</figcaption>
    </figure>
    <div style="max-width:760px;margin:auto;line-height:1.75">
    ${page.sections.map((section,i)=>`<section style="margin:0 0 30px"><h2 style="line-height:1.2;margin-bottom:14px">${esc(section.heading)}</h2>${section.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</section>`).join('')}
    <section><h2>Official sources</h2><p><a ${attrs(page.sourceLink)}>${esc(page.sourceLink.label)}</a></p>${page.referenceGroups.flatMap(g=>g.links).map(l=>`<p><a ${attrs(l)}>${esc(l.label)}</a></p>`).join('')}</section>
    <section class="story-photo-rights" style="border-top:1px solid #ddd;margin-top:30px;padding-top:18px;font-size:13px;line-height:1.7"><h2 style="font-size:17px">Photo credit and reuse information</h2><p>Photo: ${esc(page.photoRights.author)}. <a href="${esc(page.photoRights.source)}" target="_blank" rel="noopener noreferrer">Original image at Wikimedia Commons</a>. License: <a href="${esc(page.photoRights.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(page.photoRights.license)}</a>. ${esc(page.photoRights.changes)} ${esc(page.photoRights.note)}</p></section>
    <p><a href="news.html">← Back to BHOC Veterinary News</a></p>
    </div>
  </section>
</main>`;
