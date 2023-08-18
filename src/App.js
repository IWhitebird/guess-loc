import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Home from './pages/home';
import Error from './pages/Error';
import Register from './pages/Register';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dailyCounter, setDailyCounter] = useState(false);

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
  
  const fetchcounter = async () => {
    const res = await fetch('http://localhost:5000/dashboard/counter' ,
      {
        method : "GET",
      });
    const data = await res.json();
    setDailyCounter(data.counterValue);
  }
  

  useEffect(() => {
    checkAuthenticated();
    fetchcounter();
  }, []);



  return (
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setAuth={setIsAuth} />} />
          <Route path="/register" element={<Register setAuth={setIsAuth} />} />
          {isAuth ? (
            dailyCounter >= 150 ? (
              <Route path="/home" element={<Error message={"You have reached your daily limit"} />} />
            ) : (
              <Route
                path="/home"
                element={
                  <Home
                    loading={loading}
                    setLoading={setLoading}
                    dailyCounter={dailyCounter}
                    setDailyCounter={setDailyCounter}
                  />
                }
              />
            )
          ) : (
            <Route path="/home" element={<Error message={"You are not logged in"} />} />
          )}
        </Routes>
      </div>
  );
}

export default App;
