# Deployment Configuration Audit

## Environment Variables & Settings Files

### Django Backend Environment
- **Environment File**: `.env.example` present
- **Environment Config**: `chitra_backend/settings.py`
  - `ALLOWED_HOSTS`: Default `localhost,127.0.0.1`
  - `CORS_ALLOWED_ORIGINS`: Dev only
  - `MEDIA_URL`: `/media/`
  - `MEDIA_ROOT`: Local directory
  - `DATABASE`: SQLite3 (default)
  - Email backend configured as Console only

### Frontend Environment
- **Environment Variable**: `VITE_DJANGO_API_URL`
- **Default Value**: `http://127.0.0.1:8000/api`

## Live Site Status (https://chitracropscience.in)
- **Current Site**: Static HTML build
- **Not connected to Django API backend**
- **No React frontend deployed**

## Production Requirements
1. Switch database from SQLite3 to PostgreSQL/MySQL
2. Configure proper `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS`
3. Set up CDN for media files
4. Configure email backend for production
5. Deploy React frontend to hosting service
6. Deploy Django backend to production server (WSGI via Gunicorn, as documented in README_DEPLOYMENT.md)
