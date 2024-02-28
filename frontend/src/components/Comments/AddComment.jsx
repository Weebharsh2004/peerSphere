import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommentCard = () => {
  const [comment, setComment] = useState('');
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/posts/getcomment/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    const token = localStorage.getItem('token');
    const reqBody = {
      'content': comment
    };

    const headers = {
      'authorization': token
    };

    axios.post(`http://localhost:3000/api/v1/user/posts/comment/${postId}`, reqBody, { headers })
      .then((response) => {
        console.log('response:', response.data);
        alert('Added comment successfully');
        setComment('');
      })
      .catch((err) => {
        console.log('error:', err);
        alert('Comment failed');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 text-white shadow-md rounded p-8 w-full max-w-md">
        {post && post.author && (
          <div className="text-2xl font-bold mb-2">{post.author}</div>
        )}
        {post && post.content && (
          <p className="text-gray-300 mb-4">{post.content}</p>
        )}
        <div className="flex justify-between items-center mb-4">
          {post && post.author && (
            <p className="text-gray-500">{post.author.username}</p>
          )}
        </div>
        {/* Comments */}
        <div>
          <h3 className="text-xl font-bold mb-2">Comments</h3>
          {post && post.comments && post.comments.length > 0 ? (
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index} className="text-gray-300 mb-2">
                  <strong>{comment.author}:</strong> {comment.content}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300">No comments yet.</p>
          )}
        </div>

        {/* Add Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-500 mb-1">
            Add a comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
            className="w-full px-3 py-2 border rounded-md text-black focus:outline-none focus:border-teal-500"
          ></textarea>
          <button
            onClick={handleAddComment}
            className="bg-teal-500 text-white px-4 py-2 rounded-full mt-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
