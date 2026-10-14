
# Chitra Crop Science - Deployment Guide

## Project Structure
```
chitra-crop-nexus/
├── chitra-crop-nexus-main/
│   ├── src/                    # Frontend (React/Vite)
│   ├── dist/                   # Frontend PRODUCTION BUILD (upload to public_html)
│   └── django_backend/         # Backend (Django)
└── ...
```

## Hostinger Deployment Steps

### 1. Frontend Deployment
1. Upload the **dist/** folder to Hostinger's `public_html` directory
2. Create a `.htaccess` file in `public_html` for SPA routing:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2. Backend Deployment
1. Upload the **django_backend/** folder to Hostinger (outside public_html for security)
2. Create a virtual environment: `python -m venv venv`
3. Activate venv: `source venv/bin/activate` (Linux) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and update with your production settings
6. Run migrations: `python manage.py migrate`
7. Collect static files: `python manage.py collectstatic`
8. Create admin user: `python manage.py createsuperuser`
9. Run with Gunicorn: `gunicorn chitra_backend.wsgi:application`

### 3. Domain Setup
- Point your domain to Hostinger's nameservers
- For API, use a subdomain like `api.yourdomain.com`
- Update `VITE_DJANGO_API_URL` in frontend to point to your backend API

## Important Notes
- Frontend files: `dist/` → public_html
- Backend files: `django_backend/` → private directory
- Database: Use Hostinger's PostgreSQL or MySQL
- Media files: Configure media storage in Django settings

## Verification
1. Visit yourdomain.com → Home page loads
2. Visit yourdomain.com/products → Products list
3. Visit yourdomain.com/blog → Blog list
4. Visit api.yourdomain.com/admin → Django admin

