
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output = fs.createWriteStream(path.join(__dirname, 'newupcode.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✓ newupcode.zip created (${archive.pointer()} bytes)`);
});
archive.on('warning', (err) => { if (err.code !== 'ENOENT') throw err; });
archive.on('error', (err) => { throw err; });

archive.pipe(output);
archive.directory(path.join(__dirname, 'dist'), false);
archive.finalize();
