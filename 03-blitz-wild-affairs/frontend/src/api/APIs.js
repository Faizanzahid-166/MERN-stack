// src/api/contactApi.js
import Client from "./Client.js";

export const checkHealth = async (data) => {
    const res = await Client.get("/api/health", data);
    return res.data;
    // 👉 DevTools → Network tab → Refresh page
    // What to check:
    // ✅ Status = 200 → backend connected
    // ❌ 404 → wrong route
    // ❌ 500 → backend error
    // ❌ CORS error → config issue

};

// ── Auth ──────────────────────────────────────────────────────
export const authAPI = {
  register:       (fd)   => Client.post('/api/auth/register', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  login:          (data) => Client.post('/api/auth/login', data),
  logout:         ()     => Client.post('/api/auth/logout'),
  getMe:          ()     => Client.get('/api/auth/me'),
  forgotPassword: (email) => Client.post('/api/auth/forgot-password', { email }),
  resetPassword:  (data) => Client.post('/api/auth/reset-password', data),
  updateProfile:  (fd)   => Client.put('/api/auth/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  changePassword: (data) => Client.put('/api/auth/change-password', data),
  getBookmarks:   ()     => Client.get('/api/auth/bookmarks'),
};

// ── Blogs ─────────────────────────────────────────────────────
export const blogAPI = {
  getAll:          (params) => Client.get('/api/blogs', { params }),
  getBySlug:       (slug)   => Client.get(`/api/blogs/${slug}`),
  create:          (fd)     => Client.post('/api/blogs', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update:          (id, fd) => Client.put(`/api/blogs/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete:          (id)     => Client.delete(`/api/blogs/${id}`),
  uploadMedia:     (fd)     => Client.post('/api/blogs/media/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }),
  like:            (blogId) => Client.post(`/api/blogs/${blogId}/like`),
  bookmark:        (blogId) => Client.post(`/api/blogs/${blogId}/bookmark`),
  // Admin
  adminGetAll:        ()    => Client.get('/api/blogs/admin/all'),
  getDashboardStats:  ()    => Client.get('/api/blogs/admin/stats'),
};

// ── Comments ──────────────────────────────────────────────────
export const commentAPI = {
  get:    (blogId) => Client.get(`/api/comments/${blogId}`),
  add:    (data)   => Client.post('/api/comments', data),
  delete: (id)     => Client.delete(`/api/comments/${id}`),
};

// ── Admin ─────────────────────────────────────────────────────
export const adminAPI = {
  getUsers:   ()           => Client.get('/api/admin/users'),
  updateUser: (id, data)   => Client.put(`/api/admin/users/${id}`, data),
  deleteUser: (id)         => Client.delete(`/api/admin/users/${id}`),
};

