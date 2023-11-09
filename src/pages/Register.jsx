import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import env from "react-dotenv";
import image from "../assets/blur.png";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const { username, email, password, confirm_password } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    const loadingtost = toast.loading("Loading...");
    localStorage.removeItem("token");
    try {
      const body = {
        name: inputs.username,
        email: inputs.email,
        password: inputs.password,
        confirm_password: inputs.confirm_password
      };

      const response = await fetch(env.BASE_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      console.log(parseRes)

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.dismiss(loadingtost);
        toast.success("Registered Successfully");
        window.location.href = "/home";
      } else {
        setAuth(false);
        toast.dismiss(loadingtost);
        toast.error("Invalid Credentials !!");
      }
    } catch (err) {
      console.error(err.message);
      toast.dismiss(loadingtost);
      toast.error("Invalid Credentials !!");
    }
  };

  return (
    <div className="h-screen w-[100vw] flex justify-center items-center bg-black">
      <img className="absolute w-full h-full opacity-50 blur-sm" src={image} />
      <form
        onSubmit={onSubmitForm}
        className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg scale-150"
      >
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-6">Register</h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg transition-all ease-in-out duration-300 focus:border-black"
            placeholder="Username"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg transition-all ease-in-out duration-300 focus:border-black"
            placeholder="Email"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg transition-all ease-in-out duration-300 focus:border-black"
            placeholder="Password"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="confirm_password"
            value={confirm_password}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg transition-all ease-in-out duration-300 focus:border-black"
            placeholder="Confirm Password"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 border-black border transition-all ease-in-out duration-300 rounded-full hover:bg-black hover:text-white"
        >
          Submit
        </button>

        <div className="text-center mt-4 flex flex-col">
          <p>
            Have an account?
          </p>
          <p className="mt-2">
            <Link to="/login" className="text-blue-500">Click here to login.</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;