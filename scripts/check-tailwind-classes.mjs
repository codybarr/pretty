#!/usr/bin/env node
// Biome's Grit plugins cannot inspect Svelte markup. Check the Tailwind syntax
// in Svelte and JS sources here, alongside `biome check` in npm run lint.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const arbitrary = /(?<![\w-])(?:[\w!]+:)*[a-z][\w-]*(?:-\[[^\]\n]+\]|-\(--[^)\n]+\))/g;

function* sources(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* sources(path);
    else if (/\.(svelte|[cm]?[jt]sx?)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) yield path;
  }
}

let violations = 0;
for (const file of sources(root)) {
  const source = readFileSync(file, 'utf8');
  // Match quoted strings only, avoiding CSS selectors and dynamic style directives.
  const strings = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/gms;
  for (const quoted of source.matchAll(strings)) {
    for (const match of quoted[2].matchAll(arbitrary)) {
      const before = source.slice(0, quoted.index + 1 + match.index);
      const line = before.split('\n').length;
      console.error(`${relative(process.cwd(), file)}:${line}: arbitrary Tailwind utility ${match[0]} (use a named token or utility)`);
      violations++;
    }
  }
}
if (violations) process.exitCode = 1;
else console.log('Tailwind classes: no arbitrary values');
