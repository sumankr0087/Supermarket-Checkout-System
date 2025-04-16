from django.contrib import admin
from django.urls import path
from checkout.views import CheckoutAPIView, ProductListAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/checkout/', CheckoutAPIView.as_view(), name='checkout'),
    path('api/products/', ProductListAPIView.as_view(), name='products'),
]