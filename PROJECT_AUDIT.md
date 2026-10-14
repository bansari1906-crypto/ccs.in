# Project Audit: Chitra Crop Science
*Deep Evidence-Based Audit*

---

## 1. Source Code Repositories
### Primary Source Repositories
* **Frontend + Backend Full Stack**: `chitra-crop-sciencegitback/chitra-crop-science-main/chitra-crop-nexus-main`
* **Standalone Backend**: `chitra-backend-maingitback/chitra-backend-main`

### Non-Source Directories (Ignored as Requested)
* `public_html` (static build)
* `public_html_BACKUP_20260618_184057` (static backup)
* `.trash` (trash folder)

---

## 2. Frontend Stack & Architecture
* **Framework**: React 18.x
* **Build Tool**: Vite
* **Styling**: Tailwind CSS 3.x with `tailwindcss-animate`
* **UI Components**: ShadCN UI (built on Radix UI)
* **State Management**: Zustand (cart)
* **Data Fetching**: TanStack Query (React Query) + Axios
* **Routing**: React Router DOM 6.x
* **Type Safety**: TypeScript
* **Data Sources (Dual)**: 
    1. Backend API (primary, via `usePublicData.ts` and `djangoApi.ts`)
    2. Local JSON files (`product-catalog.json`, `official-product-catalog.json`)
* **Admin Panel Routes**:
    - `/admin/login`
    - `/admin/dashboard`
    - `/admin/products`
    - `/admin/categories`
    - `/admin/leads`
    - `/admin/customers`
    - `/admin/orders`
    - `/admin/blog`
    - `/admin/gallery`
    - `/admin/testimonials`
    - `/admin/analytics`
    - `/admin/settings`

---

## 3. Backend Stack & Architecture
### Backend Repositories
Both backend repos (`django_backend` inside full stack and `chitra-backend-maingitback`) are Django-based with identical structure:
* **Framework**: Django 6.x
* **API**: Django REST Framework (DRF)
* **Auth**: JWT (djangorestframework-simplejwt)
* **CORS**: django-cors-headers
* **Static/CDN**: WhiteNoise
* **WSGI Server**: Gunicorn
* **Database**: SQLite3 (local development, file-based: `db.sqlite3`)
* **Image Storage**: Local filesystem `/media/` folder (no CDN configured)
* **Image Compression**: Custom `compress_image` utility in `utils.py`
* **SEO**: Django sitemaps configured (`chitra_backend/sitemaps.py`)
* **Database Population Scripts**:
    - `populate_categories.py`
    - `populate_products.py`
    - `populate_detailed_products.py`
    - `populate_blog_posts.py`
    - `populate_all_blogs.py`
    - `populate_gallery.py`
    - `update_product_images.py`
    - `update_blog_images.py`

### Backend Apps
1. `accounts`: Custom user model and auth
2. `products`: Products + Categories
3. `blog`: Blog posts
4. `gallery`: Gallery items
5. `leads`: Leads capture
6. `customers`: Customer management
7. `testimonials`: Testimonials
8. `settings_app`: Site settings
9. `analytics_app`: Analytics

### API Endpoints
* `/admin/`: Django Admin
* `/api/token/`: Get JWT token pair
* `/api/token/refresh/`: Refresh JWT access token
* `/api/accounts/`: Accounts
* `/api/products/`: Products
* `/api/categories/`: Categories
* `/api/product-images/`: Product image gallery
* `/api/leads/`: Leads
* `/api/customers/`: Customers
* `/api/blog/`: Blog
* `/api/gallery/`: Gallery
* `/api/testimonials/`: Testimonials
* `/api/settings/`: Site settings
* `/api/admin/analytics/`: Analytics
* `/sitemap.xml`: Sitemap

---

## 4. Media Files & Image Storage
### Backend Media Directories
* **`media/products/`**: Product images (2,300+ files, includes duplicates like `active 100.jpeg`, `active_100.jpeg`, `active_100_O6vQaQG.jpeg`)
* **`media/blog/`**: Blog images
* **`media/gallery/`**: Gallery images
* Image upload handler compresses images using Pillow library

### Frontend Public Assets
* **`public/assets/media/`**: Static media (customers, fields, office, videos)
* **`public/assets/products/`**: Static product images (WhatsApp images, ~2,300 files)

---

## 5. Live Website (https://chitracropscience.in) Analysis
### Current Live Site
* **Source**: Static HTML build output (in `public_html/`)
* **Products Match**: Live site product list matches `populate_detailed_products.py` product names (e.g., ACTIVE 100, AGNEEPATH GR, AMITRA 80, ATTACK-20, etc.)
* **Gallery/About Match**: Distributor meeting images, team images match live site's /about and /gallery pages
* **Blog Match**: Blog posts (Maximizing Cotton Yield, The Organic Shield, Unlocking Soil Potential) match frontend/backend blog setup
* **Data Source**: Currently static build (no API calls from live site)
* **Admin Panel**: Admin panel not present on live static site

---

## 6. Chatbot Implementation
* **Status**: No chatbot found in either frontend or backend source code

---

## 7. Key Findings Summary
1. **Full Stack Ready**: Complete modern stack (React/Vite + Django/DRF + SQLite) ready for deployment
2. **Dual Data Sources**: Frontend supports both API data and local JSON
3. **Image Compression**: Built-in image compression on upload
4. **SEO Implemented**: Django sitemaps configured
5. **Admin Panel**: Feature-rich admin dashboard ready
6. **Live Site Discrepancy**: Current live site is a static build, not connected to the Django API backend
7. **No Chatbot**: Chatbot feature is missing (no implementation found)

