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
    '  <meta property="og:image:secure_url" content="'+esc(absoluteImage)+'">',
    '  <meta property="og:image:type" content="image/webp">',
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
    '  <div class="initiative-return-bar">',
    '    <div class="shell initiative-return-inner">',
    '      <a class="initiative-return-link" '+linkAttrs(header.returnLink)+' aria-label="'+esc(header.returnLink.ariaLabel)+'"><span aria-hidden="true">←</span>'+esc(header.returnLink.label)+'</a>',
    '    </div>',
    '  </div>',
    '  <div class="shell header-inner">',
    '    <a class="initiative-brand" '+linkAttrs(header.brand)+' aria-label="'+esc(header.brand.ariaLabel)+'">',
    '      '+initiativeImage(header.brand.image,{priority:true,lazy:false}),
    '      <span class="initiative-brand-copy">',
    '        <strong>'+lines(header.brand.titleLines)+'</strong>',
    '      </span>',
    '    </a>',
    '',
    '    <button class="menu-button" type="button" aria-label="Open navigation" aria-controls="primary-nav" aria-expanded="false">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '',
    '    <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">',
    '      '+nav,
    '    </nav>',
    '    <a class="header-action" '+linkAttrs(header.action)+'>'+esc(header.action.label)+(header.action.arrow?' <span aria-hidden="true">→</span>':'')+'</a>',
    '  </div>',
    '</header>'
  ].join('\n');
}

export function renderFooter(footer){
  const groups=footer.groups.map(group=>'<div class="footer-group"><h2>'+esc(group.title)+'</h2>'+group.links.map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('')+'</div>').join('');
  const formatDate=iso=>{const [year,month,day]=iso.split('-');return day+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(month)-1]+' '+year};
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
    '    <nav class="footer-directory" aria-label="Initiative footer navigation">'+groups+'</nav>',
    '  </div>',
    '  <div class="shell footer-action-row">',
    '    <p>'+esc(footer.actionLead)+'</p>',
    '    <a class="button button-primary footer-button" '+linkAttrs(footer.action)+'>'+esc(footer.action.label)+'</a>',
    '  </div>',
    '  <aside class="shell protected-content" aria-label="'+esc(footer.legal.title)+'">',
    '    <span class="protected-content-icon" aria-hidden="true">!</span>',
    '    <div><strong>'+esc(footer.legal.title)+'</strong><p>'+esc(footer.legal.copyright)+' '+esc(footer.legal.text)+'</p><small>'+esc(footer.legal.licenseNote)+' <a '+linkAttrs({href:footer.legal.permissionHref})+'>'+esc(footer.legal.permissionLabel)+'</a>.</small></div>',
    '  </aside>',
    '  <div class="shell footer-bottom">',
    '    <span>'+esc(footer.projectLead)+'</span>',
    '    <span>First published <time datetime="'+esc(footer.publication.firstPublished)+'">'+formatDate(footer.publication.firstPublished)+'</time> · Last updated <time datetime="'+esc(footer.publication.lastUpdated)+'">'+formatDate(footer.publication.lastUpdated)+'</time> · Version '+esc(footer.publication.version)+'</span>',
    '  </div>',
    '</footer>'
  ].join('\n');
}
