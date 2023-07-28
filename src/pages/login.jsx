import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs; // Destructure the 'inputs' object for convenience.

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email: inputs.email, password: inputs.password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        console.log(setAuth)
        window.location.href = "/home";
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="h-screen w-[100vw] flex justify-center items-center bg-green-300">
      <form
        onSubmit={onSubmitForm}
        className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg scale-150"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <div className="mb-4">
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-lg focus:outline-none hover:bg-green-600"
        >
          Submit
        </button>

        <div className="text-center mt-4">
          <p>
            Don't have an account? <Link to="#" className="text-blue-500">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
