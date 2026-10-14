const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "dist");
const uploadDir = path.join(__dirname, "Hostinger_Upload");
const zipPath = path.join(__dirname, "newupcode.zip");

console.log("📦 Preparing deployment...");

// Step 1: Clean previous
if (fs.existsSync(uploadDir)) {
  fs.rmSync(uploadDir, { recursive: true, force: true });
}
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Step 2: Create Hostinger_Upload
fs.mkdirSync(uploadDir, { recursive: true });
copyRecursiveSync(srcDir, uploadDir);
console.log("✅ Hostinger_Upload folder created!");

// Step 3: Create newupcode.zip
console.log("🔧 Creating newupcode.zip...");
const zip = new AdmZip();
addDirectoryToZip(zip, srcDir, "");
zip.writeZip(zipPath);
console.log("✅ newupcode.zip created!");

console.log("\n🚀 Deployment files ready!");
console.log("- Hostinger_Upload/ : Copy contents to public_html");
console.log("- newupcode.zip    : Upload and extract to public_html");

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    for (const childItemName of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function addDirectoryToZip(zip, dir, zipPath) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      addDirectoryToZip(zip, filePath, path.join(zipPath, file));
    } else {
      zip.addLocalFile(filePath, zipPath);
    }
  }
}
