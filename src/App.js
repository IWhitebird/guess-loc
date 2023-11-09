import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Landing from './pages/landing';
import Login from './pages/login';
import Home from './pages/home';
import Error from './pages/Error';
import Register from './pages/Register';
import ModeSelect from './pages/ModeSelect';
import env from "react-dotenv";
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dailyCounter, setDailyCounter] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(env.BASE_URL + "/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuth(true) : setIsAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchcounter = async () => {
    const res = await fetch(env.BASE_URL + "/dashboard/counter",
      {
        method: "GET",
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
      <div className='absolute z-50 bottom-0 right-0 p-3'>
        <p className='text-white'>beta version</p>
      </div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="/register" element={<Register setAuth={setIsAuth} />} />
        <Route path="/mode" element={<ModeSelect isAuth={isAuth} daily={dailyCounter} />} />
        {isAuth ? (
          dailyCounter >= 15000 ? (
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function NotFound() {
  return (
    <Error message="Page Not Found" />
  );
}

export default App;
