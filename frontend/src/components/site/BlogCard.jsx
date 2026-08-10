import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const BlogCard = ({ post, index = 0 }) => (
  <Link to={`/blog/${post.id}`} className="x-blog-card" data-testid={`blog-card-${post.id}`}>
    <div className="x-blog-card-media">
      <img src={post.image} alt={post.title} loading={index < 2 ? 'eager' : 'lazy'} draggable={false} />
      <span className="x-blog-card-num">{post.num}</span>
    </div>
    <div className="x-blog-card-meta x-label">
      <span>{post.date}</span>
      <span className="x-blog-card-tag">{post.tags[0]}</span>
    </div>
    <h3 className="x-blog-card-title">{post.title}</h3>
    <p className="x-blog-card-excerpt">{post.excerpt}</p>
    <span className="x-blog-card-read x-label">
      Read post <ArrowUpRight size={13} />
    </span>
  </Link>
);
