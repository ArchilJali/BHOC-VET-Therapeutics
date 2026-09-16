import fs from 'node:fs/promises';

const files = ['src/client/app.js', 'src/initiative/app.js'];
const marker = 'assets/navigation-context.js';
const loader = `;(() => {\n  if (window.__bhocContextLoader) return;\n  window.__bhocContextLoader = true;\n  const script = document.createElement('script');\n  script.src = '/assets/navigation-context.js?v=20260916';\n  script.defer = true;\n  document.head.appendChild(script);\n})();`;

let changed = 0;
for (const file of files) {
  const current = await fs.readFile(file, 'utf8');
  if (current.includes(marker)) {
    console.log(`${file}: navigation context already present`);
    continue;
  }
  await fs.writeFile(file, `${current.trimEnd()}\n\n${loader}\n`);
  changed += 1;
  console.log(`${file}: navigation context loader added`);
}

console.log(`Navigation context source sync complete: ${changed} file(s) changed.`);
