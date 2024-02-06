import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login';
// import BookPage from './component/Bookpage';
import { useAuth } from './component/AuthContext';
import Home from './component/Home';


function App() {
  const { isLogin } = useAuth();
  const [login, setislogin] = useState(localStorage.getItem('login') === 'true');

 

  useEffect(() => {
    setislogin(isLogin);
  }, [isLogin]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route
          path="/"
          element={login ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/home" element={login ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;