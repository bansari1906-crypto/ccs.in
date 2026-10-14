from django.db import models

class Testimonial(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_image = models.FileField(upload_to='testimonials/', blank=True, null=True)
    rating = models.IntegerField(default=5)
    review = models.TextField()
    is_visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.rating} Stars"
