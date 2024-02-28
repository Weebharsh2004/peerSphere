import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const Login = () => {

  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      password: password,
      email: email,
    };

    axios.post('http://localhost:3000/api/v1/user/login', requestData)
      .then(response => {
        alert('login successfully');
        console.log('Response:', response.data);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch(err => {
        alert('login failed');
        console.log('Error:', err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      {/* Logo */}
      <div className="w-1/2 text-center">
        <img src="/logo.png" alt="Logo" className="max-w-xs mx-auto mb-8" />
      </div>

      {/* Login Form */}
      <div className="w-1/2 text-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-teal-500" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              required
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-teal-500" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              required
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

        {/* Link to registration page */}
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
