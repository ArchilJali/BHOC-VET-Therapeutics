import renderNewsFeed from './news-feed-renderer.mjs';
import saxonStory from '../../content/news/saxon.json' with {type:'json'};

const saxonCaseURL='k9-saxon-oxyglobin-real-world-evidence.html';
const saxonHistoricalSource='https://archiljali.github.io/BHOC-platform/historical-sources/biopure-annual-report-2002/';

export default page=>{
  const augmented={...page,updated:'13 Sep 2026',stories:[saxonStory,...page.stories]};
  let html=renderNewsFeed(augmented);

  // This editorial story points to the complete BHOC Veterinary case file.
  // Primary evidence remains inside the case page and in structured-data citation.
  html=html.replace(
    `href="${saxonCaseURL}" target="_blank" rel="noopener noreferrer">Original source · BHOC Veterinary case file`,
    `href="${saxonCaseURL}">Read documented case`
  );
  html=html.replace(
    `"citation":"${saxonCaseURL}"`,
    `"citation":"${saxonHistoricalSource}"`
  );

  return html;
};
