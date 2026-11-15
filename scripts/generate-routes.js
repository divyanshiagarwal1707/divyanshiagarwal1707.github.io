import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html does not exist.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, 'utf-8');

// 1. Generate /about/index.html
const aboutDir = path.join(distDir, 'about');
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
const aboutHtml = indexHtml.replace(
  /<title>.*?<\/title>/,
  '<title>About — Divyanshi Agarwal</title>'
);
fs.writeFileSync(path.join(aboutDir, 'index.html'), aboutHtml);
console.log('✓ Generated dist/about/index.html');

// 2. Generate /projects/index.html
const projectsDir = path.join(distDir, 'projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}
const projectsHtml = indexHtml.replace(
  /<title>.*?<\/title>/,
  '<title>Projects & Case Studies — Divyanshi Agarwal</title>'
);
fs.writeFileSync(path.join(projectsDir, 'index.html'), projectsHtml);
console.log('✓ Generated dist/projects/index.html');

// 3. Generate 404.html for GitHub Pages fallback
fs.writeFileSync(path.join(distDir, '404.html'), indexHtml);
console.log('✓ Generated dist/404.html');

// 4. Generate .nojekyll to disable Jekyll processing on GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✓ Generated dist/.nojekyll');
