
const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

console.log('Starting ZIP creation...');

// Initialize ZIP
const zip = new AdmZip();

// Path to dist folder
const distPath = path.join(__dirname, 'dist');

// Add entire dist folder contents (without 'dist' prefix)
zip.addLocalFolder(distPath, '');

// Write the ZIP
const zipPath = path.join(__dirname, 'newupcode.zip');
zip.writeZip(zipPath);

console.log(`✅ newupcode.zip created successfully at ${zipPath}`);
console.log(`Size: ${(fs.statSync(zipPath).size / 1024 / 1024).toFixed(2)} MB`);
