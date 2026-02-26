const fs = require('fs');
const path = require('path');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const projectRoot = path.resolve(__dirname, '..');
const htmlPath = path.join(projectRoot, 'index.html');
const jsPath = path.join(projectRoot, 'script.js');

assert(fs.existsSync(htmlPath), 'index.html is missing');
assert(fs.existsSync(jsPath), 'script.js is missing');

const html = fs.readFileSync(htmlPath, 'utf8');
const requiredIds = [
  'mode-selection',
  'game-content',
  'status',
  'board',
  'reset',
  'one-player',
  'two-player',
  'back-to-menu'
];

requiredIds.forEach((id) => {
  assert(
    html.includes(`id="${id}"`),
    `Required element id="${id}" is missing from index.html`
  );
});

console.log('Smoke checks passed.');
