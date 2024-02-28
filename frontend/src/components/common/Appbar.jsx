import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Navigate to login page
    navigate('/login');
    alert('Logout was successful')
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/" className="font-bold text-2xl hover:text-gray-300 transition duration-300">
        PeerSphere
      </Link>
      <div className="flex gap-4">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition duration-300">
          <Link to="/profile" className="hover:underline">
            <span className="text-lg">Profile</span>
          </Link>
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition duration-300">
          <Link to="/chats" className="hover:underline">
            <span className="text-lg">Chats</span>
          </Link>
        </button>
        <button className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-full transition duration-300 focus:outline-none focus:shadow-outline">
          <Link to="/create-post" className="hover:underline">
            <span className="text-lg">Create Post</span>
          </Link>
        </button>
      
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppBar;
