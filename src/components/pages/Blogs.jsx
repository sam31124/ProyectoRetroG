import React from 'react';
import blogs from '../../data/blogs';
import BlogCard from '../molecules/BlogCard';
import '../../styles/main.css';

export default function Blogs() {
  return (
    <div className="container py-5 text-light">
      <h1 className="text-center neon-title mb-5">Casos Curiosos del Mundo Retro</h1>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
