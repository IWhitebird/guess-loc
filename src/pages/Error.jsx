import React from 'react';
import { Link } from 'react-router-dom';

const Error = ({ message }) => {

  const handleLoginClick = () => {
    window.location.href = "/";
  };


  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-900">
      <div className="max-w-md mx-auto p-6 bg-purple-950 rounded-lg shadow-lg scale-150">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-red-600">{message}</p>
      </div>

      <div class="mt-12">
        <button onClick={handleLoginClick} class="bg-blue-500 text-white py-2 px-4 rounded">
            Login
        </button>
    </div>

    </div>
  );
};

export default Error;
 