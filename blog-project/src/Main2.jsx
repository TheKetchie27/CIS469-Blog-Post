import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import BlogForm from './BlogForm.jsx';
import './index.css';

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load posts from JSON file when the component mounts
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const savePostsToJson = (postsData) => {
    const jsonPosts = JSON.stringify(postsData);
    const blob = new Blob([jsonPosts], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'posts.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (formData) => {
    const newPost = {
      title: formData.get('title'),
      content: formData.get('content'),
      imageUrl: URL.createObjectURL(formData.get('image')),
    };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    savePostsToJson(updatedPosts);
  };

  return (
    <React.StrictMode>
      <div>
        <h1>My Blog</h1>
        <BlogForm onSubmit={handleSubmit} />

        <h2>Recent Posts</h2>
        {posts.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ maxWidth: '300px' }} />}
          </div>
        ))}
      </div>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
