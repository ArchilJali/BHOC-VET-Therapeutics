import {esc,initiativeImage,linkAttrs,lines} from './lib.mjs';

const safeJSON=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const socialIcon=name=>name==='linkedin'?'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.3 7.9H1.8V19h3.5V7.9ZM3.55 2.5A2.04 2.04 0 1 0 3.55 6.58 2.04 2.04 0 0 0 3.55 2.5ZM19 12.65c0-3.35-1.79-4.91-4.18-4.91-1.93 0-2.79 1.06-3.27 1.8V7.9H8.06V19h3.49v-5.5c0-1.45.27-2.86 2.08-2.86 1.78 0 1.8 1.67 1.8 2.96V19H19v-6.35Z"/></svg>':name==='youtube'?'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor"/><path d="m10 9 5.5 3-5.5 3Z" fill="white"/></svg>':'';

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
    '  <meta name="yandex" content="noindex">',
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

export function renderRightsHead(site,rights,stylesVersion){
  return [
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>'+esc(rights.title)+' | BHOC Initiative</title>',
    '  <meta name="description" content="'+esc(rights.description)+'">',
    '  <meta name="author" content="'+esc(site.author)+'">',
    '  <meta name="robots" content="noindex,follow">',
    '  <meta name="yandex" content="noindex">',
    '  <meta name="theme-color" content="'+esc(site.themeColor)+'">',
    '  <link rel="canonical" href="'+esc(rights.canonical)+'">',
    '  <link rel="icon" href="../assets/reference-initiative-mark.webp" type="image/webp">',
    '  <link rel="stylesheet" href="styles.css?v='+esc(stylesVersion)+'">',
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
  const socialLinks=footer.groups.flatMap(group=>group.links.filter(item=>item.icon));
  const groups=footer.groups.map(group=>'<div class="footer-group"><h2>'+esc(group.title)+'</h2>'+group.links.filter(item=>!item.icon).map(item=>'<a '+linkAttrs(item)+'>'+esc(item.label)+'</a>').join('')+'</div>').join('');
  const inlineSocials=socialLinks.length?'<span class="footer-inline-socials" role="group" aria-label="BHOC social media">'+socialLinks.map(item=>'<a class="footer-inline-social footer-inline-'+esc(item.icon)+'" '+linkAttrs(item)+' aria-label="'+esc(item.label)+'" title="'+esc(item.label)+'">'+socialIcon(item.icon)+'</a>').join('')+'</span>':'';
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
    '    <p>'+esc(footer.legal.summary)+'</p>',
    '    <button class="protected-content-open" type="button" data-rights-open aria-haspopup="dialog" aria-controls="rights-dialog">'+esc(footer.legal.detailsLabel)+'</button>',
    '  </aside>',
    '  <div class="shell footer-bottom">',
    '    <span>'+esc(footer.projectLead)+'</span>',
    '    <span class="footer-bottom-meta">First published <time datetime="'+esc(footer.publication.firstPublished)+'">'+formatDate(footer.publication.firstPublished)+'</time> · Last updated <time datetime="'+esc(footer.publication.lastUpdated)+'">'+formatDate(footer.publication.lastUpdated)+'</time> · Version '+esc(footer.publication.version)+inlineSocials+'</span>',
    '  </div>',
    '</footer>',
    '<dialog class="rights-dialog" id="rights-dialog" data-rights-dialog aria-labelledby="rights-dialog-title">',
    '  <div class="rights-dialog-card">',
    '    <form method="dialog"><button class="rights-dialog-close" type="submit" aria-label="Close legal details">×</button></form>',
    '    <p class="rights-dialog-eyebrow">'+esc(footer.legal.dialogEyebrow)+'</p>',
    '    <h2 id="rights-dialog-title">'+esc(footer.legal.title)+'</h2>',
    '    <p><strong>'+esc(footer.legal.copyright)+'</strong></p>',
    '    <p>'+esc(footer.legal.text)+'</p>',
    '    <p>'+esc(footer.legal.licenseNote)+'</p>',
    '    <div class="rights-dialog-links">',
    '      <a '+linkAttrs({href:footer.legal.provenanceHref})+'>'+esc(footer.legal.provenanceLabel)+'</a>',
    '      <a '+linkAttrs({href:footer.legal.permissionHref})+'>'+esc(footer.legal.permissionLabel)+'</a>',
    '    </div>',
    '  </div>',
    '</dialog>'
  ].join('\n');
}
