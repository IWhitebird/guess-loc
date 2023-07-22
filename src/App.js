import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { useState } from 'react';

function App() {

  // 35.6688263916039, 139.7625525894246
  return (
    <div>
      <Home mylat = {35.6688263916039}  mylng = {139.7625525894246} />
    </div>
  );
}

export default App;
