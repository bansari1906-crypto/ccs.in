CHITRA CROP SCIENCE WEBSITE BACKUP

Folder purpose:
This is a full backup of the currently working website code and deploy files.
You can keep this folder on a pen drive and restore the website later if files are deleted.

What is included:
1. 01-FRONTEND-SOURCE
   - Full React/Vite source code
   - Public assets
   - Package files and build config

2. 02-LIVE-PUBLIC_HTML
   - Final built website files for Hostinger upload
   - Upload/extract these files inside public_html

3. 03-DATA-DATABASE-BACKUP
   - Product catalog JSON files
   - Verification reports
   - Data backup files used by the website

4. 04-TOOLS-SCRIPTS
   - Utility scripts used to sync, audit, and update product data

5. 05-DOCS-REPORTS
   - Audit and project notes

Important technical note:
- Current website is mainly a static frontend website.
- There is NO separate production backend server included in this project folder.
- There is NO SQL/MySQL/PostgreSQL database currently used by the live static website.
- The current working product data behaves like the website database through JSON files, mainly:
  src/data/product-catalog.json
  src/data/official-product-catalog.json

How to restore source project:
- Copy 01-FRONTEND-SOURCE contents back into a project folder
- Run npm install
- Run npm run dev for local work
- Run npm run build for production build

How to restore live website on Hostinger:
- Open 02-LIVE-PUBLIC_HTML
- Upload all files inside it to public_html
- Do not upload the folder itself if you want files directly in public_html

Backup created automatically.
