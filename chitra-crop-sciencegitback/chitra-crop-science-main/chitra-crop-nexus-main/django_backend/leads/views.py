from rest_framework import viewsets, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import Lead
from .serializers import LeadSerializer

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
    
    def perform_create(self, serializer):
        lead = serializer.save()
        
        # Send email notification to admin
        subject = f"New Lead from {lead.customer_name}"
        message = f"""
        New lead received!
        
        Customer Name: {lead.customer_name}
        Phone: {lead.phone}
        Email: {lead.email or 'Not provided'}
        City: {lead.city or 'Not provided'}
        State: {lead.state or 'Not provided'}
        Product: {lead.product or 'General Inquiry'}
        Message: {lead.message or 'No message'}
        
        Status: {lead.get_status_display()}
        Created at: {lead.created_at.strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_EMAIL] if hasattr(settings, 'ADMIN_EMAIL') else ['admin@example.com'],
                fail_silently=True,
            )
        except Exception as e:
            pass
