# Project Structure: Chitra Crop Science
*Full Directory Layout of Source Repos*

---

## Directory Tree

```
chitracropscience.in/
├── chitra-crop-sciencegitback/
│   └── chitra-crop-science-main/
│       └── chitra-crop-nexus-main/
│           ├── django_backend/  # BACKEND (Django + DRF)
│           │   ├── accounts/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── analytics_app/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── blog/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── chitra_backend/  # Project settings & config
│           │   │   ├── __init__.py
│           │   │   ├── asgi.py
│           │   │   ├── settings.py
│           │   │   ├── sitemaps.py
│           │   │   ├── urls.py
│           │   │   └── wsgi.py
│           │   ├── customers/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── gallery/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── leads/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── products/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── settings_app/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── testimonials/
│           │   │   ├── migrations/
│           │   │   ├── __init__.py
│           │   │   ├── admin.py
│           │   │   ├── apps.py
│           │   │   ├── models.py
│           │   │   ├── serializers.py
│           │   │   ├── tests.py
│           │   │   ├── urls.py
│           │   │   └── views.py
│           │   ├── media/  # Local file storage
│           │   │   ├── products/
│           │   │   ├── blog/
│           │   │   └── gallery/
│           │   ├── .env.example
│           │   ├── README_DEPLOYMENT.md
│           │   ├── db.sqlite3  # SQLite3 dev database
│           │   ├── manage.py
│           │   ├── populate_*.py  # Data population scripts
│           │   ├── requirements.txt
│           │   └── utils.py
│           │
│           ├── src/  # FRONTEND (React + Vite)
│           │   ├── assets/
│           │   ├── components/
│           │   │   ├── admin/  # Admin panel components
│           │   │   ├── layout/  # Navbar, Footer, SiteLayout
│           │   │   └── ui/  # ShadCN UI components
│           │   ├── data/  # Local JSON data
│           │   │   ├── product-catalog.json
│           │   │   └── official-product-catalog.json
│           │   ├── hooks/
│           │   │   ├── useProducts.ts
│           │   │   ├── usePublicData.ts  # Main API hooks
│           │   │   ├── useLeadCapture.ts
│           │   │   └── use-mobile.tsx
│           │   ├── lib/
│           │   │   ├── djangoApi.ts  # Axios config for Django
│           │   │   ├── axiosInstance.ts
│           │   │   ├── productCatalog.ts
│           │   │   ├── assetMap.ts
│           │   │   └── utils.ts
│           │   ├── pages/
│           │   │   ├── admin/  # Admin pages
│           │   │   ├── About.tsx
│           │   │   ├── AdminLogin.tsx
│           │   │   ├── Blog.tsx
│           │   │   ├── BlogDetail.tsx
│           │   │   ├── Checkout.tsx
│           │   │   ├── Contact.tsx
│           │   │   ├── Gallery.tsx
│           │   │   ├── Home.tsx
│           │   │   ├── Index.tsx
│           │   │   ├── ProductDetail.tsx
│           │   │   ├── Products.tsx
│           │   │   ├── Testimonials.tsx
│           │   │   └── NotFound.tsx
│           │   ├── store/
│           │   │   └── useCartStore.ts
│           │   ├── types/
│           │   │   └── product.ts
│           │   ├── App.tsx
│           │   ├── main.tsx
│           │   └── vite-env.d.ts
│           │
│           ├── public/  # Frontend static assets
│           │   └── assets/
│           │       ├── media/
│           │       └── products/
│           ├── index.html
│           ├── package.json
│           ├── tsconfig.json
│           ├── vite.config.ts
│           ├── tailwind.config.ts
│           └── components.json
│
├── chitra-backend-maingitback/
│   └── chitra-backend-main/  # Standalone backend (identical structure to django_backend/)
│       ├── accounts/
│       ├── analytics_app/
│       ├── blog/
│       ├── chitra_backend/
│       ├── customers/
│       ├── gallery/
│       ├── leads/
│       ├── logs/
│       ├── media/
│       ├── products/
│       ├── settings_app/
│       ├── testimonials/
│       ├── db.sqlite3
│       ├── manage.py
│       └── requirements.txt
│
├── chitra-crop/  # Another frontend folder (similar structure, not primary source per user request)
│
├── .trash/
├── public_html/
└── public_html_BACKUP_20260618_184057/
```

