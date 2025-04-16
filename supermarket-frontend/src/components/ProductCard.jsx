import React from 'react';

const ProductCard = ({ product, quantity, increaseQuantity, decreaseQuantity }) => (
  <div className="border rounded-lg p-4 flex justify-between items-center">
    <div>
      <h3 className="font-medium text-lg">{product.name} ({product.code})</h3>
      <p className="text-gray-600">Unit Price: ₹{product.unit_price}</p>
      {product.special_quantity && product.special_price && (
        <p className="text-sm text-green-600">
          Special: {product.special_quantity} for ₹{product.special_price}
        </p>
      )}
    </div>
    <div className="flex items-center">
      <button
        onClick={() => decreaseQuantity(product.code)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-l"
        disabled={quantity === 0}
      >
        -
      </button>
      <span className="bg-gray-100 px-4 py-1">{quantity}</span>
      <button
        onClick={() => increaseQuantity(product.code)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-r"
      >
        +
      </button>
    </div>
  </div>
);

export default ProductCard;
