import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Link2, Check } from 'lucide-react';
import DecodeText from '../components/site/DecodeText';
import CircularGallery from '../components/site/CircularGallery';
import { blogStatusWords } from '../blogData';
import { useBlogPosts } from '../lib/blogApi';
import { useSectionStatus } from '../lib/statusBus';

function ShareRow({ title }) {
  const [copied, setCopied] = useState(false);
  const url = () => encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="x-share" data-testid="blog-share-row">
      <span className="x-label text-[#8f8f8a]">Share —</span>
      <a className="x-share-btn" href={`https://twitter.com/intent/tweet?text=${text}&url=${url()}`} target="_blank" rel="noreferrer" data-testid="share-x">X</a>
      <a className="x-share-btn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${url()}`} target="_blank" rel="noreferrer" data-testid="share-linkedin">LinkedIn</a>
      <a className="x-share-btn" href={`https://wa.me/?text=${text}%20${url()}`} target="_blank" rel="noreferrer" data-testid="share-whatsapp">WhatsApp</a>
      <button className="x-share-btn" onClick={copy} data-testid="share-copy">
        {copied ? <><Check size={12} /> Copied</> : <><Link2 size={12} /> Copy link</>}
      </button>
    </div>
  );
}

export default function BlogDetail() {
  const { slug } = useParams();
  const secRef = useRef(null);
  useSectionStatus(secRef, blogStatusWords);
  const { data: posts = [] } = useBlogPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = posts.find((p) => p.id === slug);
  if (!post) return <Navigate to="/blog" replace />;
  const others = posts.filter((p) => p.id !== slug);

  return (
    <main ref={secRef} className="x-sec-dark" data-testid="blog-detail-page">
      <section className="x-pad pt-32 max-w-[1440px] mx-auto" style={{ paddingBottom: 40 }}>
        <Link to="/blog" className="x-label x-underline inline-flex items-center gap-2 mb-10 text-[#a8a8a2]" data-testid="back-to-blog">
          <ArrowLeft size={13} /> All posts
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <DecodeText text={post.title} as="h1" className="x-blogdetail-title text-[#e2e2dc] mb-6" speed={30} testId="blog-detail-title" />
            <p className="x-blogdetail-sub">{post.excerpt}</p>

            <div className="x-blogdetail-meta">
              <div><span className="x-blogdetail-k">Published:</span> {post.date}</div>
              <div><span className="x-blogdetail-k">Read time:</span> {post.readTime}</div>
              <div><span className="x-blogdetail-k">Topics:</span> {post.tags.join(' · ')}</div>
            </div>

            <ShareRow title={post.title} />

            <div className="x-blogdetail-body" data-testid="blog-detail-body">
              {post.content.map((sec, i) => (
                <div key={i} className="x-blogdetail-sec">
                  <h2 className="x-blogdetail-h">{sec.h}</h2>
                  {sec.body.map((para, j) => (
                    <p key={j} className="x-body text-[#b9b9b3]">{para}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="x-blogdetail-cover">
              <img src={post.image} alt={post.title} />
              <span className="x-circ-num x-label">{post.num}</span>
            </div>
          </div>
        </div>
      </section>

      <CircularGallery items={others} title="More from the journal" />
    </main>
  );
}
