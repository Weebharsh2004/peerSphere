import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AppBar from './common/Appbar';
import DarkPost from './common/PostsComponent';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/allposts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
        alert('Error fetching posts');
      }
    };

    fetchPosts();
  }, []);


  return (
    <div>
      {/* App Bar */}
      <AppBar />

      {/* Posts */}
      <div className="container mx-auto mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            Filter
          </button>
        </div>

        {posts.map(post => (
          <DarkPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
