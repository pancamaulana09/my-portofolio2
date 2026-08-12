import { useQuery } from '@tanstack/react-query';
import { posts as fallbackPosts } from '../blogData';

const API_ROOT = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');

async function fetchBlogPosts() {
  const response = await fetch(`${API_ROOT}/api/blog`);
  if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
  return response.json();
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchBlogPosts,
    initialData: fallbackPosts,
    staleTime: 60_000,
  });
}
