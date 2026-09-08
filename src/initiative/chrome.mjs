import {esc,initiativeImage,linkAttrs,lines} from './lib.mjs';

const safeJSON=value=>JSON.stringify(value).replace(/</g,'\\u003c');

export function renderHead(site,stylesVersion){
  const image=site.openGraph.image;
  const absoluteImage=new URL(image.src,'https://bhocvet.com/').href;
  return [
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>'+esc(site.title)+'</title>',
    '  <meta name="description" content="'+esc(site.description)+'">',
    '  <meta name="author" content="'+esc(site.author)+'">',
    '  <meta name="creator" content="'+esc(site.creator)+'">',
    '  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">',
    '  <meta name="theme-color" content="'+esc(site.themeColor)+'">',
    '  <meta property="og:locale" content="en_US">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="'+esc(site.openGraph.siteName)+'">',
    '  <meta property="og:title" content="'+esc(site.openGraph.title)+'">',
    '  <meta property="og:description" content="'+esc(site.openGraph.description)+'">',
    '  <meta property="og:url" content="'+esc(site.canonical)+'">',
    '  <meta property="og:image" content="'+esc(absoluteImage)+'">',
    '  <meta property="og:image:width" content="'+Number(image.width)+'">',
    '  <meta property="og:image:height" content="'+Number(image.height)+'">',
    '  <meta property="og:image:alt" content="'+esc(image.alt)+'">',
    '  <meta name="twitter:card" content="summary_large_image">',
    '  <meta name="twitter:title" content="'+esc(site.twitter.title)+'">',
    '  <meta name="twitter:description" content="'+esc(site.twitter.description)+'">',
    '  <meta name="twitter:image" content="'+esc(absoluteImage)+'">',
    '  <meta name="twitter:image:alt" content="'+esc(image.alt)+'">',
    '  <link rel="canonical" href="'+esc(site.canonical)+'">',
    '  <link rel="sitemap" type="application/xml" href="../sitemap.xml">',
    '  <link rel="icon" href="../assets/reference-initiative-mark.webp" type="image/webp">',
    '  <link rel="preload" as="image" href="../'+esc(image.src)+'" type="image/webp" fetchpriority="high">',
    '  <link rel="stylesheet" href="styles.css?v='+esc(stylesVersion)+'">',
    '  <script type="application/ld+json">'+safeJSON(site.structuredData)+'</script>',
    '</head>'
  ].join('\n');
}

export function renderHeader(header){
  const nav=header.navigation.map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('');
  return [
    '<header class="site-header" id="top">',
    '  <div class="shell header-inner">',
    '    <a class="initiative-brand" '+linkAttrs(header.brand)+' aria-label="'+esc(header.brand.ariaLabel)+'">',
    '      '+initiativeImage(header.brand.image,{priority:true,lazy:false}),
    '      <span class="initiative-brand-copy">',
    '        <strong>'+lines(header.brand.titleLines)+'</strong>',
    '        <span>'+esc(header.brand.tagline)+'</span>',
    '        <small>'+esc(header.brand.promise)+'</small>',
    '      </span>',
    '    </a>',
    '',
    '    <a class="ecosystem-brand" '+linkAttrs(header.ecosystem)+' aria-label="'+esc(header.ecosystem.ariaLabel)+'">',
    '      <span class="ecosystem-brand-dot" aria-hidden="true"></span>',
    '      <span>',
    '        <strong>'+esc(header.ecosystem.title)+'</strong>',
    '        <small>'+esc(header.ecosystem.subtitle)+'</small>',
    '      </span>',
    '    </a>',
    '',
    '    <button class="menu-button" type="button" aria-label="Open navigation" aria-controls="primary-nav" aria-expanded="false">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '',
    '    <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">',
    '      '+nav,
    '      <a class="search-link" '+linkAttrs(header.search)+' aria-label="'+esc(header.search.ariaLabel)+'">',
    '        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 4.2 4.2"></path></svg>',
    '      </a>',
    '    </nav>',
    '  </div>',
    '</header>'
  ].join('\n');
}

export function renderFooter(footer){
  const nav=footer.navigation.map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('');
  const ecosystem=footer.ecosystemLinks.map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('');
  return [
    '<footer class="site-footer">',
    '  <div class="shell footer-main">',
    '    <div class="footer-brand">',
    '      '+initiativeImage(footer.brand.image),
    '      <div>',
    '        <strong>'+lines(footer.brand.titleLines)+'</strong>',
    '        <span>'+esc(footer.brand.tagline)+'</span>',
    '        <small>'+esc(footer.brand.promise)+'</small>',
    '      </div>',
    '    </div>',
    '',
    '    <nav class="footer-nav" aria-label="Footer navigation">'+nav+'</nav>',
    '    <div class="ecosystem-links" aria-label="BHOC ecosystem links">'+ecosystem+'</div>',
    '    <a class="button button-primary footer-button" '+linkAttrs(footer.action)+'>'+esc(footer.action.label)+'</a>',
    '  </div>',
    '  <div class="shell footer-bottom">',
    '    <span>© 2026 BHOC Species &amp; Biodiversity Protection Initiative. All rights reserved.</span>',
    '    <span>Project lead: BHOC Team</span>',
    '    <a href="https://www.linkedin.com/company/bhoc-therapeutics/" target="_blank" rel="noopener" aria-label="BHOC Therapeutics on LinkedIn">LinkedIn</a>',
    '  </div>',
    '</footer>'
  ].join('\n');
}
