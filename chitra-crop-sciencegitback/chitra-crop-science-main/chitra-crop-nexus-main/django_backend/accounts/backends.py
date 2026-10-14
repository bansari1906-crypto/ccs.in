from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

class EmailOrUsernameModelBackend(ModelBackend):
    """
    Allows authentication with either email or full_name/username.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        email = kwargs.get('email', username)
        if not email:
            return None
        try:
            user = UserModel.objects.get(
                Q(email__iexact=email) | 
                Q(full_name__iexact=email) |
                Q(email__istartswith=f"{email}@")
            )
        except UserModel.DoesNotExist:
            return None
        except UserModel.MultipleObjectsReturned:
            user = UserModel.objects.filter(
                Q(email__iexact=email) | 
                Q(full_name__iexact=email) |
                Q(email__istartswith=f"{email}@")
            ).first()

        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
