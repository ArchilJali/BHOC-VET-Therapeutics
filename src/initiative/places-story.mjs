import {esc,initiativeImage,linkAttrs} from './lib.mjs';

const links=items=>items.map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('');
const credit=image=>'<figcaption>'+esc(image.caption)+'<small>'+esc(image.credit)+' · <a href="'+esc(image.licenseUrl)+'" target="_blank" rel="noopener">'+esc(image.license)+'</a> · <a '+linkAttrs(image)+'>Original photograph</a>. Resized and converted to WebP; no content edits.</small></figcaption>';

export default function renderPlacesStory(data){
  const places=data.places.map((place,index)=>
    '<section class="cat-place" id="'+esc(place.id)+'" aria-labelledby="'+esc(place.id)+'-title">'+
      '<header><p class="cat-place-region">'+String(index+1).padStart(2,'0')+' / '+esc(place.region)+'</p><h2 id="'+esc(place.id)+'-title">'+esc(place.heading)+'</h2><p class="cat-place-deck">'+esc(place.subtitle)+'</p></header>'+
      '<div class="cat-place-grid"><figure class="cat-place-photo">'+initiativeImage(place.image,{priority:index===0})+credit(place.image)+'</figure>'+
      '<div class="cat-place-copy"><div class="cat-place-count"><strong>'+esc(place.count)+'</strong><p>'+esc(place.countScope)+'</p></div>'+
        place.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+
        '<p class="cat-place-care"><strong>Who cares for the cats:</strong> '+esc(place.care)+'</p>'+
        '<details class="cat-place-sources"><summary>Sources and further reading</summary><div>'+links(place.sources)+'</div></details>'+
      '</div></div></section>'
  ).join('');
  return '<article class="story-page cat-cities-story">'+
    '<header class="story-page-hero"><div class="shell story-page-hero-inner"><p class="eyebrow">'+esc(data.section)+'</p><h1>'+esc(data.title)+'</h1><p class="story-page-byline"><span class="story-page-byline-name">'+esc(data.byline.name)+'</span><time datetime="'+esc(data.datePublished)+'">'+esc(data.byline.dateLabel)+'</time></p><p class="story-page-deck">'+esc(data.deck)+'</p></div></header>'+
    '<div class="shell cat-cities-content"><div class="cat-cities-intro">'+data.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('')+'</div>'+
    '<nav class="cat-cities-jump" aria-label="Places in this story">'+data.places.map(p=>'<a href="#'+esc(p.id)+'">'+esc(p.name)+'</a>').join('')+'</nav>'+
    '<p class="cat-cities-note">'+esc(data.countNote)+'</p>'+places+
    '<section class="cat-cities-closing"><h2>'+esc(data.closingHeading)+'</h2><p>'+esc(data.closing)+'</p><h2>How to Support Community Cats</h2><ul>'+data.supportAdvice.map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul><div class="cat-cities-related">'+links(data.relatedLinks)+'</div></section>'+
    '<section class="cat-cities-figures" aria-labelledby="cat-figures-title"><h2 id="cat-figures-title">Ten Places at a Glance</h2><div class="cat-cities-table-wrap"><table><thead><tr><th scope="col">Place</th><th scope="col">Reported figure</th><th scope="col">Date and scope</th></tr></thead><tbody>'+data.places.map(p=>'<tr><th scope="row"><a href="#'+esc(p.id)+'">'+esc(p.name)+'</a></th><td>'+esc(p.count)+'</td><td>'+esc(p.countScope)+'</td></tr>').join('')+'</tbody></table></div></section>'+
    '<p class="cat-cities-note">'+esc(data.photographyNote)+'</p><p class="cat-cities-back"><a href="stories.html">← Back to Stories That Matter</a></p></div></article>';
}
