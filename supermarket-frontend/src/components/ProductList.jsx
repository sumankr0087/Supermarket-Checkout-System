import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, cart, increaseQuantity, decreaseQuantity }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.code}
          product={product}
          quantity={cart[product.code]}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}
    </div>
  </div>
);

export default ProductList;
