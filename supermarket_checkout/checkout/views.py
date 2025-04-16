from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer

class CheckoutAPIView(APIView):
    def post(self, request):
        items = request.data.get('items', '')
        
        products = Product.objects.all()
        pricing_dict = {
            p.code: {
                'unit_price': float(p.unit_price),
                'special_quantity': p.special_quantity,
                'special_price': float(p.special_price) if p.special_price else None
            }
            for p in products
        }
        
        total = 0
        item_counts = {}
        
        for item in items:
            if item in pricing_dict:
                item_counts[item] = item_counts.get(item, 0) + 1
        
        for item, count in item_counts.items():
            product = pricing_dict[item]
            if product['special_quantity'] and count >= product['special_quantity']:
                special_count = count // product['special_quantity']
                remaining = count % product['special_quantity']
                total += special_count * product['special_price'] + remaining * product['unit_price']
            else:
                total += count * product['unit_price']
        
        return Response({'total': total}, status=status.HTTP_200_OK)

class ProductListAPIView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        products_data = [
            {'code': 'A', 'name': 'Product A', 'unit_price': 50, 'special_quantity': 3, 'special_price': 130},
            {'code': 'B', 'name': 'Product B', 'unit_price': 30, 'special_quantity': 2, 'special_price': 45},
            {'code': 'C', 'name': 'Product C', 'unit_price': 20, 'special_quantity': None, 'special_price': None},
            {'code': 'D', 'name': 'Product D', 'unit_price': 15, 'special_quantity': None, 'special_price': None},
            {'code': 'E', 'name': 'Product E', 'unit_price': 150, 'special_quantity': 2, 'special_price': 220},
        ]
        
        for product_data in products_data:
            Product.objects.update_or_create(
                code=product_data['code'],
                defaults=product_data
            )
        
        return Response({'message': 'Products initialized successfully'}, status=status.HTTP_201_CREATED)