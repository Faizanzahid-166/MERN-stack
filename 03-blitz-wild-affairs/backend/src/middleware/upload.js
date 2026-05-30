// middleware/upload.js
// Uses multer (memory storage) then streams the file to Supabase Storage.

import multer from 'multer';
import supabase from '../database/supabase.js';

// Store file in memory so we can pipe it to Supabase
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm',
      'application/pdf',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed.`), false);
    }
  },
});

// Determines the Supabase bucket based on MIME type
const getBucket = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'blog-images';
  if (mimetype.startsWith('video/')) return 'blog-videos';
  if (mimetype === 'application/pdf') return 'blog-pdfs';
  return 'blog-images';
};

// Helper: upload a single file buffer to Supabase Storage, returns public URL
export const uploadToSupabase = async (file, folder = '') => {
  const bucket = getBucket(file.mimetype);
  const ext = file.originalname.split('.').pop();
  const fileName = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return { url: urlData.publicUrl, bucket, path: data.path };
};

// Helper: delete a file from Supabase Storage
export const deleteFromSupabase = async (bucket, path) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw new Error(error.message);
};
