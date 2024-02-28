import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [topic, setTopic] = useState('academics'); // Default topic

  const handleContentChange = (e) => {
    const inputContent = e.target.value;
    if (inputContent.split(/\s+/).length <= 500) {
      setContent(inputContent);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      content,
      image,
      topic,
    };

    const storedToken = localStorage.getItem('token');
    const apiHeaders = {
      'authorization': storedToken,
    };

    axios.post('http://localhost:3000/api/v1/user/posts', requestData, {
      headers: apiHeaders,
    })
      .then(response => {
        console.log('Post created successfully:', response.data);
        alert('Post created successfully');
      })
      .catch(err => {
        console.error('Error creating post:', err);
        alert('Error creating post:', err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 text-white shadow-md rounded p-8">
        <h2 className="text-3xl font-bold mb-4 text-teal-500">Create a New Post</h2>

        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="content">
              Content (500 words limit):
            </label>
            <textarea
              className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              name="content"
              value={content}
              onChange={handleContentChange}
              required
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="image">
              Image URL:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="text"
              name="image"
              value={image}
              onChange={handleImageChange}
            />
          </div>

          {/* Topic */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="topic">
              Topic:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="topic"
              name="topic"
              value={topic}
              onChange={handleTopicChange}
            >
              <option value="academics">Academics</option>
              <option value="technology">Technology</option>
              <option value="placements">Placements</option>
              <option value="extra_curricular">Extra Curricular</option>
              <option value="personal_life">Personal Life</option>
              <option value="others">Others</option>
            </select>
          </div>

          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
