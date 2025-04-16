import React from 'react';

const CartSummary = ({
  cart,
  products,
  calculateTotal,
  resetCart,
  showTotal,
  totalPrice
}) => {
  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Order</h2>

      {totalItems === 0 ? (
        <p className="text-gray-500">No items added yet</p>
      ) : (
        <div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Items in Cart:</h3>
            <ul className="space-y-1">
              {Object.keys(cart).filter(code => cart[code] > 0).map(code => {
                const product = products.find(p => p.code === code);
                return (
                  <li key={code} className="flex justify-between">
                    <span>{product.name} ({code}) × {cart[code]}</span>
                    <span>₹{(cart[code] * product.unit_price).toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t pt-3 mb-4">
            <p className="flex justify-between font-medium">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </p>
          </div>

          <button
            onClick={calculateTotal}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 mb-2"
          >
            Calculate Total with Special Offers
          </button>

          <button
            onClick={resetCart}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Reset Cart
          </button>

          {showTotal && (
            <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
              <h3 className="font-medium text-green-800">Final Total:</h3>
              <p className="text-2xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</p>
              <p className="text-sm text-green-600 mt-1">
                (Includes all applicable special offers)
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartSummary;
