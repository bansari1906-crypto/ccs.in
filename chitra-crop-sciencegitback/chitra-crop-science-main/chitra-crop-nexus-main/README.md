# Chitra Crop Science

React + Vite frontend with a simple PHP + MySQL backend for leads and admin management.

This version is prepared for:

- `localhost`
- XAMPP
- phpMyAdmin
- MySQL

No Supabase runtime setup is required anymore.

## What stays the same

- Existing public React/Vite frontend design
- Product pages
- Contact page UI
- Inquiry buttons and lead capture UX

## What changed

- Supabase-based lead storage was replaced with PHP + MySQL
- Admin login is now a simple session-based PHP login
- Admin lead management is now backed by MySQL
- Products now load from the local official catalog JSON
- Blog pages now use local static content only

## Folder structure

- `src/` - React frontend
- `backend/api/` - PHP API endpoints
- `database/chitra_crop_science.sql` - phpMyAdmin import file
- `.env.example` - environment template

## Required database

Database name:

- `chitra_crop_science`

Tables included in the SQL import:

- `admin_users`
- `leads`

## Default admin login

Imported SQL creates this local admin:

- Username: `admin`
- Password: `admin123`

Change it after import if needed.

## Routes

- Public website: `/`
- Admin login: `/admin/login`
- Admin panel: `/admin`
- `/dashboard` redirects to `/admin`
- `/auth` redirects to `/admin/login`

## Lead sources connected

These actions now save lead data into MySQL:

- Get Latest Price
- Send Inquiry
- WhatsApp Inquiry
- Call Now
- Contact form
- Dealer inquiry form

## .env setup

Copy `.env.example` to `.env` and use:

```env
VITE_API_BASE_URL="http://localhost/chitra-crop-science/backend/api"
FRONTEND_URL="http://localhost:5173"
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_NAME="chitra_crop_science"
DB_USER="root"
DB_PASSWORD=""
```

## XAMPP launch steps

1. Put the project inside XAMPP htdocs as:

```text
C:\xampp\htdocs\chitra-crop-science
```

2. Start XAMPP:

- Apache
- MySQL

3. Open phpMyAdmin:

```text
http://localhost/phpmyadmin
```

4. Import:

- [database/chitra_crop_science.sql](C:/Users/bansa/Downloads/chitra-crop-nexus-main/chitra-crop-nexus-main/database/chitra_crop_science.sql)

5. In the project root:

```bash
npm install
npm run dev
```

6. Open the frontend:

```text
http://localhost:5173
```

7. Open admin login:

```text
http://localhost:5173/admin/login
```

## Build and test

```bash
npm run build
npm test
```

## Notes

- PHP API uses session cookies, so frontend requests include credentials
- The backend expects Apache to serve `backend/api/*.php`
- If your MySQL root user has a password, update `DB_PASSWORD` in `.env`
