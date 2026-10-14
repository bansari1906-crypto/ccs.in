
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

const distDir = path.join(__dirname, 'dist');
const zipPath = path.join(__dirname, 'newupcode.zip');

if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

const zip = new AdmZip();

function addFolderToZip(zip, folderPath, zipPathPrefix = '') {
  const items = fs.readdirSync(folderPath);
  items.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    const itemZipPath = path.join(zipPathPrefix, item).replace(/\\/g, '/');
    
    if (fs.statSync(itemPath).isDirectory()) {
      addFolderToZip(zip, itemPath, itemZipPath);
    } else {
      zip.addLocalFile(itemPath, zipPathPrefix);
    }
  });
}

addFolderToZip(zip, distDir);

zip.writeZip(zipPath);
console.log('✓ newupcode.zip created successfully with correct Unix-style paths!');
