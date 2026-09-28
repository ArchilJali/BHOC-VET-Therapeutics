import fs from 'node:fs/promises';

const files = ['src/client/app.js', 'src/initiative/app.js'];
const marker = 'assets/navigation-context.js';
const loader = `;(() => {\n  if (window.__bhocContextLoader) return;\n  window.__bhocContextLoader = true;\n  const script = document.createElement('script');\n  script.src = '/assets/navigation-context.js?v=20260916';\n  script.defer = true;\n  document.head.appendChild(script);\n})();`;

let changed = 0;
for (const file of files) {
  const current = await fs.readFile(file, 'utf8');
  if (!current.includes(marker)) continue;
  if (!current.includes(loader)) throw new Error(`${file}: unrecognized navigation context loader; review before removal`);
  await fs.writeFile(file, `${current.replace(loader, '').trimEnd()}\n`);
  changed++;
  console.log(`${file}: redundant navigation context loader removed`);
}

console.log(`Navigation context cleanup complete: ${changed} file(s) changed.`);
