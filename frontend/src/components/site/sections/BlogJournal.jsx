import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { posts, blogStatusWords } from '../../../blogData';
import { BlogCard } from '../BlogCard';
import { useSectionStatus } from '../../../lib/statusBus';

const EASE = [0.22, 1, 0.36, 1];

export default function BlogJournal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useSectionStatus(ref, blogStatusWords);

  const reveal = (i) =>
    reduce
      ? {}
      : {
          initial: { y: 28, opacity: 0 },
          whileInView: { y: 0, opacity: 1 },
          viewport: { once: true, margin: '0px 0px -8% 0px' },
          transition: { duration: 0.65, ease: EASE, delay: i * 0.07 },
        };

  return (
    <section ref={ref} className="x-sec-dark x-pad" data-testid="blog-journal-section">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
          <div>
            <div className="x-label text-[#8f8f8a] mb-3">( Journal ) — Notes from the build</div>
            <h2 className="xh-big text-[#e2e2dc]">Journal<span className="x-blog-dot">.</span></h2>
          </div>
          <Link to="/blog" className="x-blog-allbtn" data-testid="blog-all-posts-btn">
            All posts →
          </Link>
        </div>

        <div className="x-blog-grid">
          {posts.slice(0, 4).map((p, i) => (
            <motion.div key={p.id} {...reveal(i)}>
              <BlogCard post={p} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
