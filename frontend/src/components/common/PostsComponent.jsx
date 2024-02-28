import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DarkPost = ({ post }) => {

  const navigate = useNavigate();

  const handleUpvote = () => {
    const storedToken = localStorage.getItem('token');
    const apiHeaders = {
      'authorization': storedToken,
    };
    const postId= post._id;
    axios.post(`http://localhost:3000/api/v1/user/posts/upvote/${postId}`,{},{
      headers: apiHeaders,
    });
  };

  const handleDownvote = () => {
    const storedToken = localStorage.getItem('token');
    const apiHeaders = {
      'authorization': storedToken,
    };
    const postId= post._id;
    axios.post(`http://localhost:3000/api/v1/user/posts/downvote/${postId}`,{},{
      headers: apiHeaders,
    });
  };

  const handleComment = () => {
    navigate(`/comments/${post._id}`);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-md mb-4 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        {post.author && (
          <p className="text-gray-500">{post.author.username}</p>
        )}
        {/* You can add more author details if needed */}
      </div>
      <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-300 mb-4">{post.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            className="flex items-center focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleUpvote}
            aria-label="Upvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 11l7-7 7 7M5 19l7-7 7 7"
              />
            </svg>
            <span className="text-green-500">{post.upvoteCount}</span>
          </button>
          <button
            className="flex items-center focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleDownvote}
            aria-label="Downvote"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 13l-7 7-7-7M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
              />
            </svg>
            <span className="text-red-500">{post.downvoteCount}</span>
          </button>
        </div>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleComment}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          {post.comments ? `${post.comments.length} Comments` : '0 Comments'}
        </button>
      </div>
      <div className="mt-4">
        <span className="text-gray-500">Topic: {post.topic}</span>
      </div>
    </div>
  );
};

export default DarkPost;
