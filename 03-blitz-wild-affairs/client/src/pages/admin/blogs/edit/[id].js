// src/pages/admin/blogs/edit/[id].js
// ↳ Route: /admin/blogs/edit/:id
// Was: referenced as /admin/blogs/edit/${blog.id} in Dashboard + BlogList.
// Passes the id from router.query into BlogEditor.
import { useRouter } from 'next/router';
import BlogEditor from '@/components/admin/BlogEditor';

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;
  // Don't render editor until the route param is available
  if (!id) return null;
  return <BlogEditor blogId={id} />;
}
