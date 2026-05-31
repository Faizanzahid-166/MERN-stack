// src/components/admin/BlogEditor.jsx
// Shared editor used by /admin/blogs/new and /admin/blogs/edit/[id].
// Was: src/pages/admin/BlogEditor.jsx — moved to components so it can be
// imported by two different page files without duplicating code.
// Changed: accepts `blogId` prop instead of reading router.query.id directly.
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { blogAPI } from '@/api/APIs';

const CATEGORIES = ['Politics','War','Technology', 'Design', 'Business', 'Science', 'Culture', 'Health', 'Other'];

export default function BlogEditor({ blogId }) {
  const router    = useRouter();
  const isEditing = !!blogId;

  const [content, setContent]           = useState('');
  const [preview, setPreview]           = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [youtubeUrl, setYoutubeUrl]     = useState('');
  const [coverPreview, setCoverPreview] = useState(null);
  const [saving, setSaving]             = useState(false);
  

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: { published: false, featured: false },
  });

  // Load existing blog when editing
  useEffect(() => {
    if (!isEditing) return;
    (async () => {
      try {
        const { data: allData } = await blogAPI.adminGetAll();
        const blog = allData.blogs.find((b) => b.id === blogId);
        if (!blog) return toast.error('Blog not found');

        const { data } = await blogAPI.getBySlug(blog.slug);
        const b = data.blog;
        setValue('title',     b.title);
        setValue('excerpt',   b.excerpt);
        setValue('category',  b.category);
        setValue('tags',      b.tags?.join(', '));
        setValue('published', b.published);
        setValue('featured',  b.featured);
        setContent(b.content);
        setCoverPreview(b.cover_image);
        setUploadedMedia(b.blog_media || []);
      } catch {
        toast.error('Failed to load blog');
      }
    })();
  }, [blogId, isEditing, setValue]);

  const onCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append('file', file);
        if (blogId) fd.append('blogId', blogId);
        const { data } = await blogAPI.uploadMedia(fd);
        setUploadedMedia((prev) => [...prev, { media_type: data.mediaType, media_url: data.url, id: Date.now() }]);
        toast.success('Media uploaded!');
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const onSubmit = async (formData) => {
    if (!content.trim()) return toast.error('Content is required');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title',     formData.title);
      fd.append('excerpt',   formData.excerpt || '');
      fd.append('content',   content);
      fd.append('category',  formData.category || '');
      fd.append('tags',      JSON.stringify(formData.tags ? formData.tags.split(',').map((t) => t.trim()) : []));
      fd.append('published', formData.published ? 'true' : 'false');
      fd.append('featured',  formData.featured  ? 'true' : 'false');
      if (formData.cover_image?.[0]) fd.append('cover_image', formData.cover_image[0]);

      if (isEditing) {
        await blogAPI.update(blogId, fd);
        toast.success('Blog updated!');
      } else {
        await blogAPI.create(fd);
        toast.success('Blog created!');
      }
      router.push('/admin/blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl">{isEditing ? 'Edit Post' : 'New Post'}</h1>
          <p className="text-gray-500 text-sm mt-1">Write in Markdown — preview anytime</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setPreview((p) => !p)} className="btn-ghost text-sm">
            {preview ? '✏️ Edit' : '👁️ Preview'}
          </button>
          <button form="blog-form" type="submit" disabled={saving} className="btn-brand text-sm flex items-center gap-2">
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {saving ? 'Saving...' : isEditing ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <form id="blog-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Post title..."
            className="w-full px-4 py-4 text-2xl font-display font-semibold border-0 border-b-2 border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-brand-500 transition-colors placeholder-gray-300"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Excerpt</label>
          <textarea
            {...register('excerpt')}
            rows={2}
            placeholder="Short description shown on blog cards..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
          />
        </div>

        {/* Cover image */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Cover Image</label>
          <input
            type="file" accept="image/*"
            {...register('cover_image')}
            onChange={onCoverChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-brand-100 file:text-brand-600 file:font-medium hover:file:bg-brand-200 transition-colors mb-3"
          />
          {coverPreview && <img src={coverPreview} alt="Cover preview" className="h-48 w-full object-cover rounded-xl" />}
        </div>

        {/* Category + Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Category</label>
            <select
              {...register('category')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Tags (comma-separated)</label>
            <input
              {...register('tags')}
              placeholder="react, javascript, tutorial"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <Toggle label="Published" name="published" register={register} />
          <Toggle label="Featured"  name="featured"  register={register} />
        </div>

        {/* Content editor / preview */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Content (Markdown)</label>
          {preview ? (
            <div className="prose prose-lg dark:prose-invert max-w-none p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 min-h-[400px]">
              <PreviewContent content={content} />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`# Your blog title\n\nWrite your content in **Markdown**...`}
              rows={20}
              className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-mono resize-y"
            />
          )}
        </div>

        {/* Media upload */}
        <div>
          <label className="block text-sm font-medium mb-1.5 text-gray-600 dark:text-gray-400">Upload Media (images, videos, PDFs)</label>
          <input
            type="file" multiple accept="image/*,video/mp4,application/pdf"
            onChange={handleMediaUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-brand-100 file:text-brand-600 file:font-medium hover:file:bg-brand-200"
          />
          {/* YouTube embed input: inserts iframe HTML into content (preview supports raw HTML) */}
          <div className="mt-3 flex gap-2">
            <input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="YouTube URL (https://youtu.be/xxx or https://www.youtube.com/watch?v=xxx)"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
            />
            <button
              type="button"
              onClick={async () => {
                if (!youtubeUrl.trim()) return toast.error('Enter a YouTube URL');
                const extractId = (url) => {
                  try {
                    const u = new URL(url.trim());
                    const host = u.hostname.replace(/^www\./, '');
                    // youtu.be/ID
                    if (host === 'youtu.be') return u.pathname.slice(1).split(/[?#]/)[0];
                    // youtube.com domains
                    if (host.endsWith('youtube.com')) {
                      // standard watch?v=ID
                      if (u.pathname.startsWith('/watch')) return u.searchParams.get('v');
                      // shorts: /shorts/ID
                      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/shorts/')[1].split(/[?#]/)[0];
                      // embed URLs
                      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1].split(/[?#]/)[0];
                    }
                  } catch (e) {
                    // fall through to regex fallback
                  }
                  // fallback: try to find 11-char video id with regex
                  const m = url.match(/(?:v=|\/|be\/|embed\/|shorts\/)([0-9A-Za-z_-]{11})/);
                  return m ? m[1] : null;
                };
                const id = extractId(youtubeUrl);
                if (!id) return toast.error('Invalid YouTube URL');
                const iframe = `
                  <div class="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/${id}"
                      title="YouTube video"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>

                  <hr class="my-10 border-gray-300 dark:border-gray-700" />

                  `;
                setUploadedMedia((prev) => [...prev, { media_type: 'video', media_url: `https://www.youtube.com/watch?v=${id}`, id: Date.now() }]);
                setYoutubeUrl('');
                toast.success('YouTube embed inserted into content');
              }}
              className="btn-ghost"
            >
              Insert
            </button>
          </div>
          {uploadedMedia.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {uploadedMedia.map((m) => (
                <div key={m.id} className="relative group">
                  {m.media_type === 'image' ? (
                    <img src={m.media_url} alt="media" className="h-24 w-full object-cover rounded-xl" />
                  ) : (
                    <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl text-3xl">
                      {m.media_type === 'video' ? '🎬' : '📄'}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => { navigator.clipboard.writeText(m.media_url); toast.success('URL copied!'); }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl text-white text-xs font-medium"
                  >
                    Copy URL
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

function PreviewContent({ content }) {
  const [ReactMarkdown, setMD]  = useState(null);
  const [remarkGfm, setGfm]     = useState(null);
  const [rehypeRaw, setRehypeRaw] = useState(null);

  useEffect(() => {
    Promise.all([import('react-markdown'), import('remark-gfm'), import('rehype-raw')]).then(([md, gfm, rehype]) => {
      setMD(() => md.default);
      setGfm(() => gfm.default);
      setRehypeRaw(() => rehype.default);
    });
  }, []);

  if (!ReactMarkdown) return <p className="text-gray-400 text-sm">Loading preview...</p>;
  return <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={rehypeRaw ? [rehypeRaw] : []}>{content}</ReactMarkdown>;
}

function Toggle({ label, name, register }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" {...register(name)} className="w-4 h-4 accent-brand-600" />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}
