import fs from 'node:fs/promises';
import path from 'node:path';

const out=path.resolve(process.argv[2]||'dist');
const vetRWE='https://archiljali.github.io/BHOC-platform/veterinary/Vet-index.html';
const page=(title,description,body)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${description}"><meta name="robots" content="noindex,follow"><meta name="yandex" content="noindex"><meta http-equiv="refresh" content="0;url=${vetRWE}"><link rel="canonical" href="${vetRWE}"><title>${title}</title></head><body><p>${body} <a href="${vetRWE}">Vet Real-World Evidence & Cases</a>.</p></body></html>\n`;

await fs.mkdir(out,{recursive:true});
await fs.writeFile(path.join(out,'evidence.html'),page('Evidence moved | BHOC Veterinary','The retired BHOC Veterinary evidence route now opens Vet Real-World Evidence & Cases.','This retired BHOC Veterinary Evidence URL has moved to'));
await fs.writeFile(path.join(out,'publications.html'),page('Publications moved | BHOC Veterinary','BHOC Veterinary publications and documented cases now live in Vet Real-World Evidence & Cases.','Veterinary publications and documented cases are maintained in'));

console.log('Wrote noindex migration redirects for evidence.html and publications.html.');
