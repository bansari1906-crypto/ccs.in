from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from products.models import Product, Category
from blog.models import BlogPost


class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = 'weekly'

    def items(self):
        return ['home', 'about', 'products', 'blog', 'gallery', 'contact', 'testimonials']

    def location(self, item):
        return reverse(item)


class ProductSitemap(Sitemap):
    priority = 0.9
    changefreq = 'daily'

    def items(self):
        return Product.objects.filter(is_active=True)

    def lastmod(self, obj):
        return obj.updated_at


class CategorySitemap(Sitemap):
    priority = 0.7
    changefreq = 'weekly'

    def items(self):
        return Category.objects.filter(status='active')


class BlogPostSitemap(Sitemap):
    priority = 0.8
    changefreq = 'weekly'

    def items(self):
        return BlogPost.objects.filter(is_published=True)

    def lastmod(self, obj):
        return obj.updated_at
