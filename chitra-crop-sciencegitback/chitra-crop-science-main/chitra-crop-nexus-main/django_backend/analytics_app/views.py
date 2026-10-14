from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from django.db.models import Count

from products.models import Product
from customers.models import Customer
from leads.models import Lead
from leads.serializers import LeadSerializer

@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def dashboard_stats(request):
    recent_leads = Lead.objects.order_by('-created_at')[:8]
    
    dashboard_data = {
        'total_products': Product.objects.count(),
        'total_customers': Customer.objects.count(),
        'total_leads': Lead.objects.count(),
        'total_orders': 0, # Placeholder if orders are not fully implemented
        'recent_leads': LeadSerializer(recent_leads, many=True).data,
        'recent_orders': [], # Placeholder
        'leads_by_status': list(
            Lead.objects.values('status').annotate(count=Count('id')).order_by('status')
        ),
        'total_new_leads': Lead.objects.filter(status='new').count(),
        'total_contacted_leads': Lead.objects.filter(status='contacted').count(),
    }

    return Response(dashboard_data)
