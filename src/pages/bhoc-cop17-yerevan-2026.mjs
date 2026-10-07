import {esc,attrs,img} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main cop17-article-page">
  <article aria-labelledby="cop17-heading">
    <header class="page-hero cop17-hero"><div>
      <span class="page-eyebrow">${esc(page.eyebrow)}</span>
      <h1 id="cop17-heading">${esc(page.heading)}</h1>
      <p>${esc(page.lead)}</p>
      <div class="cop17-meta">BHOC Veterinary · <time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time></div>
    </div></header>
    <div class="cop17-body">
      <figure class="cop17-pass">
        <a href="./${esc(page.image.src)}" target="_blank" rel="noopener noreferrer" aria-label="View Archil Jaliashvili's COP17 accreditation at full size">${img(page.image,'fetchpriority="high"')}</a>
        <figcaption>Archil Jaliashvili’s COP17 Priority Pass. Public copy.</figcaption>
      </figure>
      <div class="cop17-copy">
        <p class="cop17-role">${esc(page.role)}</p>
        ${page.sections.map(section=>`<section id="${esc(section.id)}" aria-labelledby="${esc(section.id)}-heading">
          <h2 id="${esc(section.id)}-heading">${esc(section.heading)}</h2>
          ${section.paragraphs.map(text=>`<p>${esc(text)}</p>`).join('')}
          <p class="cop17-source-links">${section.sourceLinks.map(item=>`<a ${attrs(item)}>${esc(item.label)}</a>`).join('')}</p>
        </section>`).join('')}
        <p class="cop17-thanks">${esc(page.thanks)}</p>
        <section class="cop17-meeting" aria-labelledby="cop17-meeting-heading">
          <h2 id="cop17-meeting-heading">${esc(page.meetingHeading)}</h2>
          <p>${esc(page.meetingText)}</p>
          <a class="cop17-meeting-link" ${attrs(page.meetingLink)}>${esc(page.meetingLink.label)}</a>
        </section>
      </div>
    </div>
    <footer class="cop17-bottom">
      <details class="cop17-sources"><summary>Official sources</summary><ul>${page.referenceGroups.flatMap(group=>group.links).map(item=>`<li><a ${attrs(item)}>${esc(item.label)}</a></li>`).join('')}</ul></details>
      <nav aria-label="Article navigation"><a href="news.html#${esc(page.slug)}">Back to News</a><a href="./initiative/">BHOC Species &amp; Biodiversity Protection Initiative</a></nav>
    </footer>
  </article>
</main>`;
