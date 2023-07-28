// 35.6688263916039, 139.7625525894246
// 35.655673915705094, 139.774480788404
import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { useState , useEffect } from 'react';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Error from './pages/Error';

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuth(true) : setIsAuth(false);
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
        <Route path="/login" element={<Login setAuth={setIsAuth}/>} />
        <Route path="/register" element />

        { 
        isAuth ?  (
            <>
              <Route path="/home" element={<Home mylat={35.655673915705094} mylng={139.774480788404} /> } />
            </>
          ) :
          (<>
            <Route path="/home" element={<Error message={"Your are not logged in"} />}/>
          </>) 
        }


      </Routes>
    </div>
  );
}

export default App;
