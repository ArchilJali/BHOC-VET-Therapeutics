import {esc} from './lib.mjs';
import {renderStoryCards} from './blocks/stories.mjs';

export default function renderStoriesIndex(page,stories){
  return '<div class="stories-index">'+
    '<header class="shell stories-index-heading"><h1>'+esc(page.title)+'</h1><p>'+esc(page.intro)+'</p></header>'+
    '<section class="shell stories-index-body" aria-label="Stories"><div class="stories-index-list" role="list">'+renderStoryCards(stories.cards,'h2')+'</div></section>'+
  '</div>';
}
