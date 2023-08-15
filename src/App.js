import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './pages/loader';
import Landing from './pages/landing';
import Login from './pages/login';
import Home from './pages/home';
import Error from './pages/Error';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuth(true)  : setIsAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="/register" element={<div>Register Page</div>} />
        {isAuth ? (
          <Route path="/home" element={<Home  loading={loading} 
                                              setLoading={setLoading}  />} />
        ) : (
          <Route path="/home" element={<Error message={"You are not logged in"} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
