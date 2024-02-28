import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: username,
      password: password,
      email: email,
    };

    axios.post('http://localhost:3000/api/v1/user/register', requestData)
      .then(response => {
        alert('User created successfully');
        console.log('Response:', response.data);
      })
      .catch(err => {
        alert('User creation failed');
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
            <label className="block text-sm font-bold mb-2 text-teal-500" htmlFor="username">
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              required
              onChange={(e)=>{
                setUsername(e.target.value);
              }}
            />
          </div>

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
          Already have an account?{' '}
          <Link to="/login" className="text-teal-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
