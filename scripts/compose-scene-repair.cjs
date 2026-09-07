/* Deterministic integration of two local ImageGen edits, never a scene redraw. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'design/approved-homepage-muted-pencil-2026-09-06.png');
const repairDir = path.join(root, 'design/repairs');
const regions = [
  {name: 'eva', left: 482, top: 392, width: 166, height: 156},
  {name: 'sky', left: 759, top: 90, width: 363, height: 236},
  {name: 'old-header-left-remnant', left: 0, top: 60, width: 200, height: 8},
  {name: 'old-header-right-remnant', left: 759, top: 60, width: 363, height: 8}
];

(async () => {
  const base = await sharp(sourcePath).extract({left: 0, top: 0, width: 1122, height: 548}).png().toBuffer();
  // The generated crop includes a ledge outside the dog. Omit it and retain
  // the original cat, neighbouring animal and surrounding landscape.
  const dogMask = Buffer.from('<svg width="166" height="156"><path fill="white" d="M28 156 L20 125 L15 101 L14 76 L22 48 L35 28 L58 18 L78 17 L105 27 L124 48 L132 73 L130 99 L119 121 L140 136 L153 156 Z"/></svg>');
  const alpha = await sharp(dogMask).blur(2).extractChannel('alpha').raw().toBuffer();
  const dogPixels = await sharp(path.join(repairDir, 'eva-local-generated.png'))
    .extract({left: 0, top: 0, width: 1294, height: 1150})
    .resize(166, 156, {fit: 'fill'})
    .removeAlpha().raw().toBuffer();
  const dogRgba = Buffer.alloc(166 * 156 * 4);
  for (let p = 0; p < 166 * 156; p++) {
    dogPixels.copy(dogRgba, p * 4, p * 3, p * 3 + 3);
    dogRgba[p * 4 + 3] = alpha[p];
  }
  const dog = await sharp(dogRgba, {raw: {width: 166, height: 156, channels: 4}}).png().toBuffer();

  const skyWidth = 363, skyHeight = 236;
  const oldSky = await sharp(base).extract({left: 759, top: 90, width: skyWidth, height: skyHeight}).removeAlpha().raw().toBuffer();
  const newSky = await sharp(path.join(repairDir, 'sky-local-generated.png')).resize(skyWidth, skyHeight, {fit: 'fill'}).removeAlpha().raw().toBuffer();
  const skyPixels = Buffer.alloc(newSky.length);
  const field = new Float32Array(newSky.length);
  const difference = (x, y, c) => oldSky[(y * skyWidth + x) * 3 + c] - newSky[(y * skyWidth + x) * 3 + c];
  for (let y = 0; y < skyHeight; y++) {
    for (let x = 0; x < skyWidth; x++) {
      // Match all four original sky borders exactly. A smooth interpolation
      // of their colour differences avoids a pasted rectangular sky patch.
      const u = x / (skyWidth - 1), v = y / (skyHeight - 1);
      for (let c = 0; c < 3; c++) {
        const corner = (1-u)*(1-v)*difference(0,0,c) + u*(1-v)*difference(skyWidth-1,0,c) + (1-u)*v*difference(0,skyHeight-1,c) + u*v*difference(skyWidth-1,skyHeight-1,c);
        const correction = (1-u)*difference(0,y,c) + u*difference(skyWidth-1,y,c) + (1-v)*difference(x,0,c) + v*difference(x,skyHeight-1,c) - corner;
        const p = (y * skyWidth + x) * 3 + c;
        field[p] = correction;
      }
    }
  }
  // Harmonic smoothing confines high-frequency edge differences to the edge,
  // rather than extending them as horizontal/vertical stripes through the sky.
  for (let iteration = 0; iteration < 350; iteration++) {
    for (let y = 1; y < skyHeight - 1; y++) for (let x = 1; x < skyWidth - 1; x++) {
      const p = (y * skyWidth + x) * 3;
      for (let c = 0; c < 3; c++) {
        const average = (field[p+c-3] + field[p+c+3] + field[p+c-skyWidth*3] + field[p+c+skyWidth*3]) / 4;
        field[p+c] += 1.85 * (average - field[p+c]);
      }
    }
  }
  for (let p = 0; p < skyPixels.length; p++) skyPixels[p] = Math.max(0, Math.min(255, Math.round(newSky[p] + field[p])));
  const sky = await sharp(skyPixels, {raw: {width: skyWidth, height: skyHeight, channels: 3}}).png().toBuffer();
  const headerLeft = await sharp(base).extract({left: 0, top: 68, width: 200, height: 8}).png().toBuffer();
  const headerRight = await sharp(base).extract({left: 759, top: 68, width: 363, height: 8}).png().toBuffer();
  const result = await sharp(base).composite([
    {input: dog, left: regions[0].left, top: regions[0].top},
    {input: sky, left: regions[1].left, top: regions[1].top},
    {input: headerLeft, left: 0, top: 60},
    {input: headerRight, left: 759, top: 60}
  ]).png().toBuffer();

  // Every pixel outside the two explicitly bounded repair regions is locked.
  const before = await sharp(base).removeAlpha().raw().toBuffer();
  const after = await sharp(result).removeAlpha().raw().toBuffer();
  let changedInside = 0;
  for (let y = 0; y < 548; y++) for (let x = 0; x < 1122; x++) {
    const p = (y * 1122 + x) * 3;
    const changed = before[p] !== after[p] || before[p + 1] !== after[p + 1] || before[p + 2] !== after[p + 2];
    const allowed = regions.some(r => x >= r.left && x < r.left + r.width && y >= r.top && y < r.top + r.height);
    assert(!changed || allowed, `Unexpected scene change at ${x},${y}`);
    if (changed) changedInside++;
  }
  fs.writeFileSync(path.join(repairDir, 'repaired-art-source.png'), result);
  await sharp(result).extract({left: 0, top: 60, width: 1122, height: 488})
    .webp({lossless: true}).toFile(path.join(root, 'dist/assets/bhoc-veterinary-scene-repaired.webp'));
  console.log(JSON.stringify({changedInside, changedOutside: 0, regions, exported: [1122, 488]}));
})().catch(error => { console.error(error); process.exitCode = 1; });
