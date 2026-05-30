// controllers/blogController.js
import slugify from 'slugify';
import supabase from '../database/supabase.js';
import { uploadToSupabase } from '../middleware/upload.js';

// ── GET ALL PUBLISHED BLOGS ───────────────────────────────────
export const getBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      category,
      search,
      featured,
      sort = 'created_at',
    } = req.query;

    const from = (page - 1) * limit;
    const to = from + Number(limit) - 1;

    let query = supabase
      .from('02_blogs')
      .select(
        `id, title, slug, excerpt, cover_image, category, tags, featured,
         views, created_at,
         author:02_users(id, name, avatar)`,
        { count: 'exact' }
      )
      .eq('published', true)
      .order(sort, { ascending: false })
      .range(from, to);

    if (category) query = query.eq('category', category);
    if (featured) query = query.eq('featured', true);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({
      success: true,
      blogs: data,
      total: count,
      page: Number(page),
      pages: Math.ceil(count / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET SINGLE BLOG BY SLUG ───────────────────────────────────
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: blog, error } = await supabase
      .from('02_blogs')
      .select(
        `*, author:02_users(id, name, avatar),
         blog_media:02_blog_media(id, media_type, media_url)`
      )
      .eq('slug', slug)
      .single();

    if (error || !blog) return res.status(404).json({ message: 'Blog not found.' });

    // Increment view count (fire-and-forget)
    supabase
      .from('02_blogs')
      .update({ views: blog.views + 1 })
      .eq('id', blog.id);

    // Fetch like and bookmark counts
    const [{ count: likeCount }, { count: bookmarkCount }] = await Promise.all([
      supabase.from('02_likes').select('id', { count: 'exact', head: true }).eq('blog_id', blog.id),
      supabase.from('02_bookmarks').select('id', { count: 'exact', head: true }).eq('blog_id', blog.id),
    ]);

    res.json({ success: true, blog: { ...blog, likes: likeCount, bookmarks: bookmarkCount } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── CREATE BLOG (Admin) ───────────────────────────────────────
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, featured, published } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required.' });

    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();

    // Cover image upload
    let coverImage = null;
    if (req.file) {
      const { url } = await uploadToSupabase(req.file, 'covers');
      coverImage = url;
    }

    const parsedTags = tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [];

    const { data: blog, error } = await supabase
      .from('02_blogs')
      .insert({
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage,
        category,
        tags: parsedTags,
        featured: featured === 'true',
        published: published === 'true',
        author_id: req.user.id,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── UPDATE BLOG (Admin) ───────────────────────────────────────
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, tags, featured, published } = req.body;

    const updates = { excerpt, content, category, featured: featured === 'true', published: published === 'true' };
    if (title) {
      updates.title = title;
      updates.slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now();
    }
    if (tags) updates.tags = Array.isArray(tags) ? tags : JSON.parse(tags);

    if (req.file) {
      const { url } = await uploadToSupabase(req.file, 'covers');
      updates.cover_image = url;
    }

    const { data: blog, error } = await supabase
      .from('02_blogs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE BLOG (Admin) ───────────────────────────────────────
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('02_blogs').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Blog deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── UPLOAD MEDIA (Admin) ──────────────────────────────────────
export const uploadBlogMedia = async (req, res) => {
  try {
    const { blogId } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

    const mimeType = req.file.mimetype;
    const mediaType = mimeType.startsWith('image/')
      ? 'image'
      : mimeType.startsWith('video/')
      ? 'video'
      : 'pdf';

    const { url } = await uploadToSupabase(req.file, `blog/${blogId}`);

    if (blogId) {
      await supabase.from('02_blog_media').insert({ blog_id: blogId, media_type: mediaType, media_url: url });
    }

    res.json({ success: true, url, mediaType });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── TOGGLE LIKE ────────────────────────────────────────────────
export const toggleLike = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;

    const { data: existing } = await supabase
      .from('02_likes')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      await supabase.from('02_likes').delete().eq('id', existing.id);
      return res.json({ success: true, liked: false });
    }

    await supabase.from('02_likes').insert({ blog_id: blogId, user_id: userId });
    res.json({ success: true, liked: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── TOGGLE BOOKMARK ────────────────────────────────────────────
export const toggleBookmark = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user.id;

    const { data: existing } = await supabase
      .from('02_bookmarks')
      .select('id')
      .eq('blog_id', blogId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      await supabase.from('02_bookmarks').delete().eq('id', existing.id);
      return res.json({ success: true, bookmarked: false });
    }

    await supabase.from('02_bookmarks').insert({ blog_id: blogId, user_id: userId });
    res.json({ success: true, bookmarked: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── ADMIN: DASHBOARD STATS ─────────────────────────────────────
export const getDashboardStats = async (req, res) => {
  try {
    const [
      { count: totalBlogs },
      { count: totalUsers },
      { data: viewsData },
      { data: recentBlogs },
    ] = await Promise.all([
      supabase.from('02_blogs').select('id', { count: 'exact', head: true }),
      supabase.from('02_users').select('id', { count: 'exact', head: true }),
      supabase.from('02_blogs').select('views'),
      supabase
        .from('02_blogs')
        .select('id, title, slug, published, views, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const totalViews = viewsData?.reduce((sum, b) => sum + (b.views || 0), 0) || 0;

    res.json({ success: true, stats: { totalBlogs, totalUsers, totalViews }, recentBlogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── ADMIN: ALL BLOGS (incl. unpublished) ───────────────────────
export const adminGetBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('02_blogs')
      .select('id, title, slug, category, published, featured, views, created_at, author:02_users(name)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, blogs: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
