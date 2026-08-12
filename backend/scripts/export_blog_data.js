const fs = require('fs');
const vm = require('vm');
const path = require('path');

const sourcePath = path.resolve(__dirname, '../../frontend/src/blogData.js');
const outputPath = path.resolve(__dirname, '../data/blog_posts.json');
const fullSource = fs.readFileSync(sourcePath, 'utf8');
const postsStart = fullSource.indexOf('export const posts =');
if (postsStart < 0) throw new Error('Could not locate posts export');
const source = fullSource.slice(0, postsStart)
  .replace(/export const/g, 'const ')
  .concat(fullSource.slice(postsStart).replace('export const posts =', 'const posts ='))
  .concat('\n;globalThis.__posts = posts;\n');

const context = {};
vm.createContext(context);
vm.runInContext(source, context, { filename: sourcePath });

if (!Array.isArray(context.__posts)) {
  throw new Error('Could not extract posts from blogData.js');
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(context.__posts, null, 2)}\n`);
console.log(`Exported ${context.__posts.length} posts to ${outputPath}`);
