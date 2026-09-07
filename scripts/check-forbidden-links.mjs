import fs from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve(process.argv[2]||'_site');
const excludedHost=['hbo2','therapeutics.com'].join('');
const rules=[
  {
    label:'excluded outbound vendor domain',
    regex:new RegExp(`https?:\\/\\/(?:www\\.)?${excludedHost.replace('.', '\\.')}(?:\\/|\\b)`,'i')
  },
  {
    label:'GitHub veterinary source route',
    regex:/https?:\/\/github\.com\/ArchilJali\/BHOC-platform\/tree\/main\/veterinary(?:\/|\b)/i
  }
];
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
  for(const rule of rules){
    if(rule.regex.test(text)) violations.push(`${path.relative(root,file)} (${rule.label})`);
  }
}
if(violations.length){
  console.error(`Forbidden outbound route found in: ${violations.join(', ')}`);
  process.exit(1);
}
console.log(`Passed: no forbidden outbound routes in ${files.length} checked files.`);
