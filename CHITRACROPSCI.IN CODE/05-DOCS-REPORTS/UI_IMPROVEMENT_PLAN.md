# UI Improvement Plan for Chitra Crop Science Website

## 1. Navigation Simplification
- **Current Issue**: Navigation has extra links like "Knowledge Center" and "Testimonials" that don't match live site
- **Proposed Fix**: Update navigation menu to only include: Home, About, Products, Blogs, Gallery, Contact
- **Affected Files**: `src/components/layout/Navbar.tsx`, `src/App.tsx`

## 2. Products Page Overhaul
- **Current Issue**: Too many category boxes; looks like catalog directory instead of product listing
- **Proposed Fix**:
  - Show products directly as cards
  - Keep categories only as filters
  - Product cards with:
    - Prominent product image
    - Product name
    - Category badge
    - Short description
    - View Details button
    - WhatsApp button
- **Affected Files**: `src/pages/Products.tsx`

## 3. Product Details Page Enhancement
- **Current Issue**: Missing some product information sections
- **Proposed Fix**: Display complete product details in structured format:
  - Product Name
  - Technical Name
  - Category
  - Description
  - Benefits
  - Features
  - Target Crops
  - Target Pests/Diseases/Weeds
  - Dosage
  - Application Method
  - Packaging
  - Precautions
  - Product Images
- **Affected Files**: `src/pages/ProductDetail.tsx`

## 4. Website Styling
- **Current Issue**: Doesn't match live site styling
- **Proposed Fix**:
  - Match live site's green branding
  - Professional agriculture look
  - Clean spacing
  - Product-focused layout
  - Avoid SaaS/software company UI look
- **Affected Files**: `tailwind.config.ts`, `src/pages/*.tsx`, `src/components/ui/*.tsx`

## 5. Keep Existing Features Intact
- **Do Not Modify**:
  - Existing products (don't delete or add)
  - Database or API
  - URLs
  - Blogs
  - Gallery
  - SEO features
- **Affected Files**: N/A (no changes)
