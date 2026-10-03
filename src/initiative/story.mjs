import {esc,initiativePairedImage,linkAttrs} from './lib.mjs';

export default function renderStory(data){
  const values=data.values.map(value=>'<li>'+esc(value)+'</li>').join('');
  const gallery=data.images.map((image,index)=>
    '<figure class="story-page-photo">'+
      initiativePairedImage(image,index===0?data.coverMark:null,{priority:index===0})+
      '<figcaption><span>'+esc(image.caption)+'</span><small>'+esc(image.credit)+' · '+esc(image.license)+' · <a '+linkAttrs(image)+'>Source ↗</a></small></figcaption>'+
    '</figure>'
  ).join('');
  const paragraphs=data.paragraphs.map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('');
  const sections=(data.sections||[]).map(section=>
    '<section class="story-page-section"><h2>'+esc(section.heading)+'</h2>'+
    (section.quote?'<figure class="story-page-authored-quote"><blockquote><p>&ldquo;'+esc(section.quote.text)+'&rdquo;</p></blockquote><figcaption>'+esc(section.quote.attribution)+'</figcaption></figure>':'')+
    (section.paragraphs||[]).map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('')+
    (section.links?'<div class="story-page-related">'+section.links.map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('')+'</div>':'')+
    '</section>'
  ).join('');
  const sources=data.sources.map(source=>'<a '+linkAttrs(source)+'>'+esc(source.label)+' ↗</a>').join('');
  const byline=data.byline?'<p class="story-page-byline"><a '+linkAttrs(data.byline)+'>'+esc(data.byline.name)+'</a><span>'+esc(data.byline.role)+'</span><time datetime="'+esc(data.datePublished)+'">'+esc(data.byline.dateLabel)+'</time></p>':'';
  return '<article class="story-page'+(data.sections?' story-page-reflection':'')+'">'+
    '<header class="story-page-hero">'+
      '<div class="shell story-page-hero-inner">'+
        '<p class="eyebrow">'+esc(data.section)+'</p>'+
        '<h1>'+esc(data.title)+'</h1>'+
        byline+
        '<p class="story-page-deck">'+esc(data.deck)+'</p>'+
        '<ul class="story-page-values" aria-label="Values reflected in this story">'+values+'</ul>'+
      '</div>'+
    '</header>'+
    '<section class="shell story-page-gallery" aria-label="'+esc(data.galleryLabel||'Historical photographs')+'">'+gallery+'</section>'+
    '<section class="shell story-page-body">'+
      '<div class="story-page-copy">'+
        paragraphs+sections+
        '<blockquote class="story-page-principle"><p>'+esc(data.principle)+'</p></blockquote>'+
        (data.principleAttribution?'<p class="story-page-principle-attribution">'+esc(data.principleAttribution)+'</p>':'')+
        '<p class="story-page-closing">'+esc(data.closing)+'</p>'+
        '<div class="story-page-sources"><strong>'+esc(data.sourcesLabel||'Historical sources')+'</strong>'+sources+'</div>'+
        '<a class="story-page-back" href="./#stories"><span aria-hidden="true">←</span> Back to Stories That Matter</a>'+
      '</div>'+
    '</section>'+
  '</article>';
}
