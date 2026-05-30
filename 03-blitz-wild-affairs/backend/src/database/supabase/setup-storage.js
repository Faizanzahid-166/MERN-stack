// supabase/setup-storage.js
// Run this ONCE to create the required storage buckets.
// Usage: node node .\backend\src\database\supabase\setup-storage.js
// Requires: SUPABASE_URL and SUPABASE_SERVICE_KEY in your backend .env

import "../../config/dotenv.js"; // load .env first
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const BUCKETS = [
  { name: 'blog-images', public: true },
  { name: 'blog-videos', public: true },
  { name: 'blog-pdfs',   public: true },
  { name: 'blog-user-avatars', public: true },
];

const setup = async () => {
  console.log('🪣  Setting up Supabase Storage buckets…\n');

  for (const bucket of BUCKETS) {
    // Check if it already exists
    const { data: existing } = await supabase.storage.getBucket(bucket.name);

    if (existing) {
      console.log(`  ✅  "${bucket.name}" already exists — skipping.`);
      continue;
    }

    const { data, error } = await supabase.storage.createBucket(bucket.name, {
      public: bucket.public,
      allowedMimeTypes:
        bucket.name === 'blog-images' || bucket.name === 'blog-user-avatars'
          ? ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
          : bucket.name === 'blog-videos'
          ? ['video/mp4', 'video/webm']
          : ['application/pdf'],
      fileSizeLimit:
        bucket.name === 'blog-videos'    ? 50 * 1024 * 1024 : 20 * 1024 * 1024 //50MB for videos, 20MB for others
    });

    if (error) {
      console.error(`  ❌  Failed to create "${bucket.name}":`, error.message);
    } else {
      console.log(`  ✅  Created "${bucket.name}" (public: ${bucket.public})`);
    }
  }

  console.log('\n🎉  Storage setup complete!');
};

setup().catch(console.error);
