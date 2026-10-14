import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chitra_backend.settings')
import django
django.setup()
from accounts.models import CustomUser
email = 'admin@chitracrop.com'
pwd = 'Admin123!'
user = CustomUser.objects.filter(email=email).first()
if user:
    user.set_password(pwd)
    user.role = 'admin'
    user.is_staff = True
    user.is_superuser = True
    user.is_approved = True
    user.save()
    print('updated admin user', user.email)
else:
    CustomUser.objects.create_superuser(email=email, password=pwd, full_name='Chitra Crop Admin', phone='9876543210')
    print('created admin user', email)
