import React, { useState, useEffect } from 'react';
import logo from '../assets/Untitled-1.png';
import Dashboard from './dashboard';
import data from './data';
import { Link } from 'react-router-dom';

function ModeSelect({ daily }) {
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const [fadeIn, setFadeIn] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = localStorage.getItem('token');
  const [dailys, setDailys] = useState(0);

  useEffect(() => {
    if (!token) {
      window.location.href = '/home';
    } else {
      setDailys(daily);
    }
  }, [daily]);
  
  useEffect(() => {
    setImg(data[currentIndex].image);
    setText(data[currentIndex].text);

    const timer = setTimeout(() => {
      setFadeIn(false);
      setTimeout(() => {
        setFadeIn(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);


  return (
    <div className="bg-purple-950 w-full h-[100vh]">
      {token ? (
        <>
          <div className="flex justify-between px-20">
            <div className="absolute">
              <img className="invert w-[200px] h-[200px]" src={logo} alt="Logo" />
            </div>
            <div>
              <Dashboard />
              <div>
                {dailys >= 150 ? (
                  <div className='absolute text-red-500 py-3'>
                    Daily limit reached, please come back tomorrow!
                  </div>
                ) : (<>
                </>)}
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center px-24 h-[100vh] w-[100%] bg-gradient-to-r from-gray-950 to-transparent">
            <div className="flex justify-between items-center">
              <ul className="text-white uppercase tracking-wider ">
                <Link to="/home">
                  <li className="mb-8 text-5xl cursor-pointer transition-all ease-in-out duration-250 hover:tracking-wider hover:text-purple-300 italic">
                    Singleplayer
                  </li>
                </Link>
                <li className="mb-8 text-5xl cursor-not-allowed transition-all ease-in-out duration-250 text-gray-500 italic">
                  Multiplayer (Coming Soon)
                </li>
                <li className="text-5xl cursor-pointer transition-all ease-in-out duration-250 hover:tracking-wider hover:text-purple-300 italic">
                  Settings
                </li>
              </ul>
              <div className="w-[50%]">
                <div key={data[currentIndex].id} className="flex items-center justify-center p-2 flex-col">
                  <img
                    src={img}
                    alt="Image"
                    className={`w-[600px] h-[500px] rounded-xl mr-4 ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                  />
                  <ul className={`p-2 ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                    <li className='text-white mt-5 text-xl'>{text}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>

        </>
      )}

    </div>
  );
}

export default ModeSelect;
