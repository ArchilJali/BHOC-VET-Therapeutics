import fs from 'node:fs';
import renderNews from './news-core.mjs';

// Keep this case's news card, generated feed schema and search summary aligned
// with the corrected clinical page rather than duplicating its chronology.
const casePage=JSON.parse(fs.readFileSync(new URL('../../content/pages/canine-babesiosis-oxygen-delivery-support.json',import.meta.url),'utf8'));

export default function render(page){
  const story=page.stories?.find(item=>item.id===casePage.slug);
  if(story&&casePage.infographic){
    const figure=casePage.infographic;
    story.title=casePage.heading;
    story.text=casePage.newsSummary;
    story.dateLabel='10 Nov 2026 · Updated 11 Nov 2026 · CBC: 5 Nov before / 7 Nov after two administrations';
    story.image={url:figure.src,displayUrl:figure.src,alt:figure.alt,width:figure.width,height:figure.height,variant:'document'};
    story.credit={label:'Approved case timeline infographic',href:casePage.slug+'.html'};
    story.contextLink=casePage.relatedLinks.find(item=>item.href.includes('facebook.com/permalink.php'));
  }
  return renderNews(page);
}
