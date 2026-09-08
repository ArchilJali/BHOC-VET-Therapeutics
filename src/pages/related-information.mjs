import render from './publications.mjs';

export default page=>render(page).replace(
  '<h2 id="conservation-databases-heading">',
  '<span hidden>Conservation databases</span><h2 id="conservation-databases-heading">'
);
