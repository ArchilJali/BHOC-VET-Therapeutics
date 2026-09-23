import {esc} from '../lib.mjs';

export default function renderStories(data){
  const values=data.values.map(value=>'<span>'+esc(value)+'</span>').join('');
  const paragraphs=data.paragraphs.map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('');
  return '<section class="stories-matter" id="'+esc(data.id)+'" data-block="stories" aria-labelledby="stories-title">'+
    '<div class="shell stories-matter-grid">'+
      '<div class="stories-heading">'+
        '<p class="eyebrow">'+esc(data.eyebrow)+'</p>'+
        '<h2 id="stories-title">'+esc(data.title)+'</h2>'+
        '<p class="stories-intro">'+esc(data.intro)+'</p>'+
        '<div class="stories-values" aria-label="Values reflected in this story">'+values+'</div>'+
      '</div>'+
      '<div class="stories-copy">'+
        paragraphs+
        '<blockquote class="stories-principle"><p>'+esc(data.principle)+'</p></blockquote>'+
        '<p class="stories-closing">'+esc(data.closing)+'</p>'+
        '<p class="stories-note">'+esc(data.historicalNote)+'</p>'+
      '</div>'+
    '</div>'+
  '</section>';
}
