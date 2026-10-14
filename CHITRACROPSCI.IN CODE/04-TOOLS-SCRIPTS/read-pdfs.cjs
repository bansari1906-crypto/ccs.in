const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPaths = [
  path.join(__dirname, '..', 'public_html_BACKUP_20260618_184057', 'brochure.pdf'),
  path.join(__dirname, '..', '.trash', 'Brochure.pdf')
];

async function readPDFs() {
  for (const pdfPath of pdfPaths) {
    if (fs.existsSync(pdfPath)) {
      console.log(`\nReading PDF: ${pdfPath}`);
      console.log('='.repeat(60));
      
      try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        
        // Save the full text
        const outputPath = path.join(
          __dirname,
          path.basename(pdfPath) + '-extracted-text.txt'
        );
        fs.writeFileSync(outputPath, data.text);
        
        console.log(`Text extracted and saved to: ${outputPath}`);
        console.log('\nFirst 5000 characters:');
        console.log(data.text.slice(0, 5000));
      } catch (err) {
        console.error('Error reading PDF:', err.message);
        console.error(err.stack);
      }
    } else {
      console.log(`PDF file not found: ${pdfPath}`);
    }
  }
}

readPDFs();
