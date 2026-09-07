// ImageGen supplies peripheral pencil strokes. Restore the immutable face cores.
const fs=require('fs'),sharp=require('sharp'),crypto=require('crypto');
const root='design/species-sketch-20260906';
const subjects={
 dog:{cx:78,cy:57,rx:40,ry:40,feather:0.32,file:'rem-wirehaired-dachshund-sketch.webp'},
 cat:{cx:76,cy:49,rx:35,ry:35,feather:0.3,file:'cat-loose-pencil-sketch.webp'},
 camel:{cx:100,cy:54,rx:44,ry:35,feather:0.32,file:'camel-loose-pencil-sketch.webp'},
 orangutan:{cx:97,cy:61,rx:29,ry:39,feather:0.34,file:'orangutan-loose-pencil-sketch.webp'},
 turtle:{cx:129,cy:32,rx:29,ry:24,feather:0.26,file:'marine-turtle-loose-pencil-sketch.webp'},
 panda:{cx:75,cy:57,rx:36,ry:34,feather:0.32,file:'panda-loose-pencil-sketch.webp'}
};
(async()=>{
 const report=[];
 for(const [key,m]of Object.entries(subjects)){
  const source=`${root}/originals/reference-${key}-pencil.webp`;
  const {data:original,info}=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const generated=await sharp(`${root}/generated/${key}-loose-pencil-generated.png`).resize(info.width,info.height,{fit:'fill'}).removeAlpha().raw().toBuffer();
  const out=Buffer.from(generated);let protectedPixels=0,changedProtectedPixels=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){
   const d=Math.hypot((x-m.cx)/m.rx,(y-m.cy)/m.ry);let alpha=0;
   if(d<=1){alpha=1;protectedPixels++;}else if(d<1+m.feather){const t=(d-1)/m.feather;alpha=1-t*t*(3-2*t);}
   const i=(y*info.width+x)*3;
   for(let c=0;c<3;c++)out[i+c]=Math.round(original[i+c]*alpha+generated[i+c]*(1-alpha));
  }
  const dest='dist/assets/'+m.file;
  await sharp(out,{raw:info}).webp({lossless:true}).toFile(dest);
  const decoded=await sharp(dest).removeAlpha().raw().toBuffer();
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(Math.hypot((x-m.cx)/m.rx,(y-m.cy)/m.ry)<=1){const i=(y*info.width+x)*3;if(decoded[i]!==original[i]||decoded[i+1]!==original[i+1]||decoded[i+2]!==original[i+2])changedProtectedPixels++;}
  if(changedProtectedPixels)throw Error('Identity protection failed: '+key);
  report.push({animal:key,source,file:dest,width:info.width,height:info.height,faceProtection:m,protectedPixels,changedProtectedPixels,sha256:crypto.createHash('sha256').update(fs.readFileSync(dest)).digest('hex')});
 }
 fs.writeFileSync(root+'/integration-report.json',JSON.stringify(report,null,2)+'\n');
 const content=JSON.parse(fs.readFileSync('content/blocks/species.json'));
 const alts={dog:'Loose pencil sketch of Rem, a wirehaired dachshund',cat:'Loose pencil sketch of a tabby cat',camel:'Loose pencil sketch of a camel',orangutan:'Loose pencil sketch of an orangutan',turtle:'Loose pencil sketch of a marine turtle',panda:'Loose pencil sketch of a giant panda'};
 for(const item of content.items){item.image.src='assets/'+subjects[item.id].file;item.image.alt=alts[item.id];}
 fs.writeFileSync('content/blocks/species.json',JSON.stringify(content,null,2)+'\n');
 console.log(JSON.stringify(report.map(r=>({animal:r.animal,protectedPixels:r.protectedPixels,changedProtectedPixels:r.changedProtectedPixels}))));
})();
