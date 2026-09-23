import {esc,initiativeImage,linkAttrs} from './lib.mjs';

export default function renderStory(data){
  const values=data.values.map(value=>'<li>'+esc(value)+'</li>').join('');
  const gallery=data.images.map(image=>
    '<figure class="story-page-photo">'+
      initiativeImage(image)+
      '<figcaption><span>'+esc(image.caption)+'</span><small>'+esc(image.credit)+' · '+esc(image.license)+' · <a '+linkAttrs(image)+'>Source ↗</a></small></figcaption>'+
    '</figure>'
  ).join('');
  const paragraphs=data.paragraphs.map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('');
  const sources=data.sources.map(source=>'<a '+linkAttrs(source)+'>'+esc(source.label)+' ↗</a>').join('');
  return '<article class="story-page">'+
    '<header class="story-page-hero">'+
      '<div class="shell story-page-hero-inner">'+
        '<p class="eyebrow">'+esc(data.section)+'</p>'+
        '<h1>'+esc(data.title)+'</h1>'+
        '<p class="story-page-deck">'+esc(data.deck)+'</p>'+
        '<ul class="story-page-values" aria-label="Values reflected in this story">'+values+'</ul>'+
      '</div>'+
    '</header>'+
    '<section class="shell story-page-gallery" aria-label="Historical photographs">'+gallery+'</section>'+
    '<section class="shell story-page-body">'+
      '<div class="story-page-copy">'+
        paragraphs+
        '<blockquote class="story-page-principle"><p>'+esc(data.principle)+'</p></blockquote>'+
        '<p class="story-page-closing">'+esc(data.closing)+'</p>'+
        '<div class="story-page-sources"><strong>Historical sources</strong>'+sources+'</div>'+
        '<a class="story-page-back" href="./#stories"><span aria-hidden="true">←</span> Back to Stories That Matter</a>'+
      '</div>'+
    '</section>'+
  '</article>';
}
