# RECOVERY_PLAN.md

## Objective
Use only `public_html` from Hostinger as the source of truth, no files from other projects.

---

## 1. Run Website Locally
- **Method**: Use a static web server to serve `public_html`
- **Command**:
  ```bash
  cd public_html
  python -m http.server 8000
  # OR
  npx serve -p 8000
  ```
- **URL**: http://localhost:8000

---

## 2. Add Missing Products
Since `public_html` is a production build (compiled React/Vite), options:
- **Option A**: Recover the original development source code from your version control (if available)
- **Option B**: If no source code, this will require reverse-engineering or rebuilding the app
- **Option C**: If you have the source code in another location (not in the current directory), use that

---

## 3. Add AI Chatbot
- Integrate a floating chatbot that uses product data
- Options for AI:
  - OpenAI API (GPT-4o)
  - Anthropic Claude API
  - Hugging Face Models
- Chatbot features:
  - Answer product questions
  - Recommend products by crop/pest/disease
  - Show dosage instructions

---

## 4. Add FAQ/SEO
- Add FAQ schema
- Add product schema
- Add organization schema
- Update metadata in `public_html/index.html`
