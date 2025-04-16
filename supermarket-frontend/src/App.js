import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [showTotal, setShowTotal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.post('http://localhost:8000/api/products/')
      .then(() => {
        axios.get('http://localhost:8000/api/products/')
          .then(res => {
            setProducts(res.data);
            const initialCart = {};
            res.data.forEach(product => {
              initialCart[product.code] = 0;
            });
            setCart(initialCart);
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }, []);

  const increaseQuantity = (productCode) => {
    setCart(prev => ({ ...prev, [productCode]: prev[productCode] + 1 }));
  };

  const decreaseQuantity = (productCode) => {
    setCart(prev => ({
      ...prev,
      [productCode]: Math.max(prev[productCode] - 1, 0)
    }));
  };

  const calculateTotal = () => {
    let items = '';
    Object.keys(cart).forEach(code => {
      items += code.repeat(cart[code]);
    });

    axios.post('http://localhost:8000/api/checkout/', { items })
      .then(res => {
        setTotalPrice(res.data.total);
        setShowTotal(true);
      })
      .catch(err => console.error(err));
  };

  const resetCart = () => {
    const reset = {};
    Object.keys(cart).forEach(code => reset[code] = 0);
    setCart(reset);
    setShowTotal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Supermarket Checkout System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductList
              products={products}
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </div>

          <div>
            <CartSummary
              cart={cart}
              products={products}
              calculateTotal={calculateTotal}
              resetCart={resetCart}
              showTotal={showTotal}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
