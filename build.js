const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Create dist directory
const distDir = path.join(__dirname, 'dist');
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy index.html to dist/index.html
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));

// 3. Copy assets to dist/assets
copyDirSync(path.join(__dirname, 'assets'), path.join(distDir, 'assets'));

// 4. Copy public to dist/public (and dist/assets)
copyDirSync(path.join(__dirname, 'public'), path.join(distDir, 'public'));
if (fs.existsSync(path.join(__dirname, 'public', 'assets'))) {
  copyDirSync(path.join(__dirname, 'public', 'assets'), path.join(distDir, 'assets'));
}

console.log('Build completed: index.html and all assets copied to dist/');
