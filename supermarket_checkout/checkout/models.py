from django.db import models

class Product(models.Model):
    code = models.CharField(max_length=1, unique=True)
    name = models.CharField(max_length=100)
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)
    special_quantity = models.PositiveIntegerField(null=True, blank=True)
    special_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name