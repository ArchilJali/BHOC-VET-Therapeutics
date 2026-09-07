import fs from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve(process.argv[2]||'_site');
const forbidden=/https?:\/\/(?:www\.)?hbo2therapeutics\.com(?:\/|\b)/i;
const files=[];

async function walk(dir){
  for(const entry of await fs.readdir(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) await walk(full);
    else if(/\.(?:html?|json|md|xml|txt)$/i.test(entry.name)) files.push(full);
  }
}

await walk(root);
const violations=[];
for(const file of files){
  const text=await fs.readFile(file,'utf8');
  if(forbidden.test(text)) violations.push(path.relative(root,file));
}
if(violations.length){
  console.error(`Forbidden HBO2 Therapeutics outbound domain found in: ${violations.join(', ')}`);
  process.exit(1);
}
console.log(`Passed: no forbidden HBO2 Therapeutics outbound domain in ${files.length} checked files.`);
