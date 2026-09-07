/* Exact crops from Archil's approved source. Never regenerate the scene. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const input = path.join(root, 'design/approved-homepage-muted-pencil-2026-09-06.png');
const out = path.join(root, 'dist/assets');
const regions = {
  'bhoc-veterinary-wildlife-pencil-hero': [0, 0, 1122, 548],
  'bhoc-veterinary-logo': [40, 14, 133, 50],
  'bhoc-species-biodiversity-initiative-logo': [20, 72, 325, 408],
  'dog-wirehaired-dachshund-pencil': [62, 732, 152, 118],
  'cat-tabby-pencil': [224, 732, 152, 118],
  'camel-pencil': [394, 732, 152, 118],
  'orangutan-pencil': [568, 732, 160, 118],
  'giant-panda-pencil': [744, 732, 160, 118],
  'marine-turtle-pencil': [911, 732, 147, 118],
  'bhoc-mountain-landscape-pencil': [372, 1242, 450, 88]
};
(async () => {
  for (const [name, [left,top,width,height]] of Object.entries(regions)) {
    await sharp(input).extract({left,top,width,height}).webp({lossless:true}).toFile(path.join(out, name+'.webp'));
  }
  await sharp(input).extract({left:20,top:72,width:325,height:408}).png().toFile(path.join(out, 'bhoc-species-biodiversity-initiative-logo.png'));
  console.log('Approved source and 11 exact artwork exports prepared.');
})();
