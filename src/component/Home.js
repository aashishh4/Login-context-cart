import React from 'react';
import { useAuth } from './AuthContext';
import Cart from './Cart';
import Navbar from './Navbar';


const Home = () => {
  const { addToCart } = useAuth();
  const { isLogin, logout } = useAuth();

  const products = [
        { id: 1, name: 'Product 1', price: 19.99, description: 'Description of Product 1' },
        { id: 2, name: 'Product 2', price: 29.99, description: 'Description of Product 2' },
        { id: 3, name: 'Product 3', price: 100.00, description: 'Description of Product 3' },
        { id: 4, name: 'Product 4', price: 299.99, description: 'Description of Product 4' },
        { id: 5, name: 'Product 5', price: 544.00, description: 'Description of Product 5' },
        { id: 6, name: 'Product 6', price: 329.99, description: 'Description of Product 6' },
        { id: 7, name: 'Product 7', price: 269.99, description: 'Description of Product 7' },
        { id: 8, name: 'Product 8', price: 294.99, description: 'Description of Product 8' },

      
  ];
  
  const handleLogout = () => {
    logout();
  };
  if (!isLogin) {
    return null;
  }

  const handleAdd = (product) => {
    addToCart(product);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          //  console.log("cartitem",cartItems)
   
    const existingProduct = cartItems.find((item) => item.id === product.id);
       
    if (existingProduct) {
      
      existingProduct.quantity += 1;
    } else {
      
      cartItems.push({ ...product, quantity: 1 });
    }

    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  

  return (
    <div>
         <Navbar/>
      <h2>Product page </h2>
      <table border="2 ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleAdd(product)}>Add to cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   <Cart/>
   <div className='LogoutBtn'>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
