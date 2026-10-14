# API Flow Diagram & Details

## Frontend → Backend API Endpoints

### Products
**Frontend Component**: `src/pages/Products.tsx`, `src/pages/ProductDetail.tsx`
**Frontend Hook**: `useProducts()` in `src/hooks/usePublicData.ts`
**Axios Call**: `djangoApi.get("/products/")`
**Django URL**: `products/urls.py`
**Django View**: `products/views.py`
**Model**: `products/models.py` (Product)

### Categories
**Frontend Hook**: `useCategories()`
**Axios Call**: `djangoApi.get("/categories/")`
**Django URL**: `products/urls.py`
**Model**: `products/models.py` (Category)

### Blog
**Frontend Pages**: `Blog.tsx`, `BlogDetail.tsx`
**Frontend Hook**: `useBlogPosts()`
**Axios Call**: `djangoApi.get("/blog/")`
**Django Model**: `blog/models.py`

### Gallery
**Frontend Page**: `Gallery.tsx`
**Frontend Hook**: `useGalleryItems()`
**Axios Call**: `djangoApi.get("/gallery/")`
**Django Model**: `gallery/models.py`

### Testimonials
**Frontend Hook**: `useTestimonials()`
**Axios Call**: `djangoApi.get("/testimonials/")`
**Django Model**: `testimonials/models.py`

### Site Settings
**Frontend Hook**: `useSettings()`
**Axios Call**: `djangoApi.get("/settings/")`
**Django Model**: `settings_app/models.py`

### Leads
**Frontend Hook**: `useLeadCapture` (sends leads via `POST /leads/`)
**Django Model**: `leads/models.py`

---

## Frontend Data Sources (Dual Mode)
- **API Mode**: Uses Django API (via `usePublicData.ts`)
- **Fallback JSON**: Reads from `src/data/product-catalog.json` and `src/data/official-product-catalog.json`

---

## Django API Base URL
- **Configured in**: `src/lib/djangoApi.ts`
- **Environment Variable**: `VITE_DJANGO_API_URL`
- **Default Value**: `http://127.0.0.1:8000/api`
