import React, { useRef } from 'react';
import DecodeText from '../components/site/DecodeText';
import { BlogCard } from '../components/site/BlogCard';
import { posts, blogIntro, blogStatusWords } from '../blogData';
import { useSectionStatus } from '../lib/statusBus';

export default function Blog() {
  const secRef = useRef(null);
  useSectionStatus(secRef, blogStatusWords);
  const count = String(posts.length).padStart(2, '0');

  return (
    <main ref={secRef} className="x-sec-dark" data-testid="blog-page">
      <section className="min-h-screen x-pad pt-32 max-w-[1440px] mx-auto">
        <div className="x-label text-[#8f8f8a] mb-3">( Journal )</div>
        <DecodeText text="Journal" as="h1" className="xh-giant text-[#e2e2dc] mb-8" speed={40} testId="blog-title" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            {blogIntro.map((t, i) => (
              <p key={i} className="x-body text-[#a8a8a2]">{t}</p>
            ))}
          </div>
          <div className="md:col-span-6 lg:col-span-7 flex md:justify-end items-end">
            <div className="x-label text-[#8f8f8a]" data-testid="blog-count">
              Showing all <span className="x-blog-lime">{count}</span> posts
            </div>
          </div>
        </div>

        <div className="x-blog-grid" data-testid="blog-list">
          {posts.map((p, i) => (
            <BlogCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
