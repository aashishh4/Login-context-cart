import React from 'react';
import { useAuth } from './AuthContext';

function Cart() {
 
  const { cartItems, removeFromCart, updateQuantity } = useAuth();

  const handleRemove = (productId) => {
    removeFromCart(productId);
    updateLocalStorage();
  };

  const handleIncrement = (productId) => {
    updateQuantity(productId, 1);
    updateLocalStorage();
  };

  const handleDecrement = (productId) => {
    updateQuantity(productId, -1);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <div>
      <h1>Cart page</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <table border="2px">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <h3>{product.id}</h3>
                </td>
                <td>
                  <h4>{product.name}</h4>
                </td>
                <td>
                  <h4>${product.price}</h4>
                </td>
                <td>
                  <h4>{product.description}</h4>
                </td>
                <td>
                  <div>
                    <button onClick={() => handleDecrement(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleIncrement(product.id)}>+</button>
                  </div>
                </td>
                <td>
                  <button onClick={() => handleRemove(product.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
