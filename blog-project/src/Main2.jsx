import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import BlogForm from './BlogForm.jsx'; // Import the BlogForm component
import './index.css';

const Main = () => {
  const [posts, setPosts] = useState([]);

  const handleSubmit = (formData) => {
    // Simulate saving post data locally by updating the posts state
    const newPost = {
      title: formData.get('title'),
      content: formData.get('content'),
      imageUrl: URL.createObjectURL(formData.get('image')), // Assuming you want to display the image
    };
    setPosts([...posts, newPost]);
  };

  return (
    <React.StrictMode>
      <div>
        <h1>My Blog</h1>
        <BlogForm onSubmit={handleSubmit} /> {/* Render the BlogForm with onSubmit prop */}
  
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

// Render the Main component instead of App directly
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
