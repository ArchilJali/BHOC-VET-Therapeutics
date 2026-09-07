// Deterministic exports. Only the designated sky UI area is inpainted.
const sharp=require('sharp'); const fs=require('fs');
(async()=>{
const base='design/reference-20260906/'; const source=base+'supplied-mockup.png';
const {data:raw,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const original=Buffer.from(raw); const clean=await sharp(base+'clean-sky.png').ensureAlpha().raw().toBuffer();
const rectangles=[[744,110,418,263]];
let changed=0;
for(let y=105;y<373;y++)for(let x=730;x<1162;x++){
 let alpha=0;
 for(const [rx,ry,rw,rh] of rectangles){if(x>=rx&&x<rx+rw&&y>=ry&&y<ry+rh)alpha=Math.min(1,(x-rx)/3,(rx+rw-1-x)/20,(y-ry)/7,(ry+rh-1-y)/15);}
 const oi=(y*info.width+x)*4;
 if(x<758&&y>218&&y<320&&original[oi+2]<original[oi]+20)alpha=0;
 if(!alpha)continue; const i=(y*info.width+x)*4,j=((y-105)*432+x-730)*4;
 for(let c=0;c<3;c++)raw[i+c]=Math.round(original[i+c]*(1-alpha)+clean[j+c]*alpha);changed++;
}
// Remove the four-pixel remnant of the mockup header button, outside the illustration.
for(let y=57;y<66;y++)for(let x=789;x<1021;x++){const i=(y*info.width+x)*4,j=((y+12)*info.width+x)*4;for(let c=0;c<3;c++)raw[i+c]=original[j+c];}
await sharp(raw,{raw:info}).png().toFile(base+'native-text-art-source.png');
await sharp(raw,{raw:info}).extract({left:337,top:57,width:825,height:469}).webp({lossless:true}).toFile('dist/assets/reference-wildlife-scene.webp');
const exports=[['veterinary-wordmark',43,13,121,47],['initiative-mark',16,70,318,317],['dog-pencil',55,700,147,106],['cat-pencil',226,700,140,106],['camel-pencil',406,700,146,106],['orangutan-pencil',597,700,157,106],['turtle-pencil',797,700,172,106],['panda-pencil',1010,700,146,106]];
for(const [name,left,top,width,height] of exports) await sharp(source).extract({left,top,width,height}).webp({lossless:true}).toFile(`dist/assets/reference-${name}.webp`);
const hero=JSON.parse(fs.readFileSync('content/blocks/hero.json'));Object.assign(hero.initiative.image,{width:318,height:317});fs.writeFileSync('content/blocks/hero.json',JSON.stringify(hero,null,2)+'\n');
const header=JSON.parse(fs.readFileSync('content/header.json'));Object.assign(header.logo,{width:121,height:47});fs.writeFileSync('content/header.json',JSON.stringify(header,null,2)+'\n');
const species=JSON.parse(fs.readFileSync('content/blocks/species.json'));for(let i=0;i<6;i++)Object.assign(species.items[i].image,{width:exports[i+2][3],height:106});fs.writeFileSync('content/blocks/species.json',JSON.stringify(species,null,2)+'\n');
fs.writeFileSync(base+'asset-report.json',JSON.stringify({source:'supplied-mockup.png',width:info.width,height:info.height,skyRectangles:rectangles,changedPixels:changed,animalsAndLogoChangedPixels:0,exports},null,2)+'\n');
console.log('Exported supplied artwork and six original portraits. Only designated sky UI regions changed.');
})();
