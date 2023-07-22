import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { useState } from 'react';

function App() {

  // 35.6688263916039, 139.7625525894246
  //35.655673915705094, 139.774480788404
  return (
    <div>
      <Home mylat = {35.655673915705094}  mylng = {139.774480788404} />
    </div>
  );
}

export default App;
