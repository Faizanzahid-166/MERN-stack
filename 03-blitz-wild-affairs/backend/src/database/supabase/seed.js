// supabase/seed.js
// Seeds the database with a sample admin user and demo blog posts.
// Usage: node node .\backend\src\database\supabase\seed.js
// WARNING: Only run in development — creates real records in your DB.

import "../../config/dotenv.js"; // load .env first
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Sample data ───────────────────────────────────────────────
const adminUser = {
  name: 'Mr.Mark',
  email: 'blitztechhub@gmail.com',
  password: 'faizan7107blitz',
  role: 'admin',
};

const sampleBlogs = [
  {
    title: 'Getting Started with React and Vite in 2025',
    excerpt: 'A complete guide to setting up a modern React development environment using Vite — the blazing-fast build tool.',
    content: `# Getting Started with React and Vite

## Why Vite?

Vite has revolutionised how we build frontend applications. With near-instant hot module replacement and lightning-fast cold starts, it has become the go-to build tool for modern React development.

## Setting Up Your Project

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

## Project Structure

A typical Vite + React project looks like this:

\`\`\`
my-app/
  src/
    components/
    pages/
    App.jsx
    main.jsx
  index.html
  vite.config.js
\`\`\`

## Tailwind CSS Integration

Add Tailwind for utility-first styling:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Conclusion

Vite + React is a powerful combination for building modern web applications. The development experience is unmatched, and the production build output is highly optimised.
`,
    category: 'Technology',
    tags: ['react', 'vite', 'javascript', 'frontend'],
    featured: true,
    published: true,
  },
  {
    title: 'Supabase vs Firebase: Which Should You Choose?',
    excerpt: 'An in-depth comparison of two popular Backend-as-a-Service platforms for modern web development.',
    content: `# Supabase vs Firebase

## Overview

Both Supabase and Firebase offer Backend-as-a-Service (BaaS) solutions, but they take very different approaches.

## Supabase

Supabase is an open-source Firebase alternative built on top of PostgreSQL. Key features:

- **Real-time subscriptions** via WebSockets
- **PostgreSQL** with full SQL support
- **Row Level Security** for fine-grained access control
- **Storage** for files and media
- **Auth** with multiple providers

### When to use Supabase

- You need complex relational queries
- You prefer SQL over NoSQL
- You want open-source flexibility
- You're migrating from a PostgreSQL database

## Firebase

Firebase is Google's BaaS platform with a NoSQL document database. Key features:

- **Firestore** — flexible NoSQL database
- **Authentication** — comprehensive auth providers
- **Cloud Functions** — serverless backend logic
- **Hosting** — static site deployment

### When to use Firebase

- You need offline-first support
- You're building mobile apps
- You want tight Google ecosystem integration

## Verdict

For most modern web apps, Supabase's PostgreSQL foundation gives you more power and flexibility. Firebase excels for mobile apps and offline scenarios.
`,
    category: 'Technology',
    tags: ['supabase', 'firebase', 'database', 'backend'],
    featured: false,
    published: true,
  },
  {
    title: 'The Art of Minimal Design',
    excerpt: 'How stripping away the unnecessary reveals what truly matters in digital product design.',
    content: `# The Art of Minimal Design

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

## What is Minimalism in Design?

Minimal design is not about making things plain or boring. It is about ruthless prioritisation — keeping only what is essential, removing everything that is not.

## Core Principles

### 1. White Space is Intentional

White space (or negative space) is not empty — it is breathing room. It guides the eye and creates hierarchy.

### 2. Typography as Architecture

Great minimal designs often rely on typography alone to create visual interest. Choose fonts thoughtfully.

### 3. Colour with Purpose

A minimal palette — often just two or three colours — creates coherence. Each colour should earn its place.

### 4. Functional Aesthetics

Every visual element should serve the user. If it doesn't help the user accomplish something, question whether it belongs.

## Applying Minimalism

Start by listing every element on your page. For each one, ask: *What would happen if this wasn't here?* If the answer is "nothing bad," remove it.

## Conclusion

Minimal design is hard. It requires discipline to resist adding "just one more thing." But the result — an experience that feels effortless — is always worth the effort.
`,
    category: 'Design',
    tags: ['design', 'minimalism', 'ux', 'ui'],
    featured: true,
    published: true,
  },
];

// ── Seed function ──────────────────────────────────────────────
const seed = async () => {
  console.log('🌱 Seeding database…\n');

  // Create admin user
  const hashedPw = await bcrypt.hash(adminUser.password, 12);
  const { data: user, error: userError } = await supabase
    .from('02_users')
    .upsert({ ...adminUser, password: hashedPw }, { onConflict: 'email' })
    .select()
    .single();

  if (userError) {
    console.error('  ❌  Failed to create admin user:', userError.message);
    return;
  }
  console.log(`  ✅  Admin user: ${adminUser.email} / ${adminUser.password}`);

  // Create blogs
  for (const blog of sampleBlogs) {
    const slug = slugify(blog.title, { lower: true, strict: true }) + '-' + Date.now();
    const { error } = await supabase.from('02_blogs').insert({
      ...blog,
      slug,
      author_id: user.id,
    });

    if (error) {
      console.error(`  ❌  Failed to create blog "${blog.title}":`, error.message);
    } else {
      console.log(`  ✅  Blog: "${blog.title}"`);
    }
  }

  console.log('\n🎉 Seeding complete!');
  console.log('\nLogin credentials:');
  console.log(`  Email   : ${adminUser.email}`);
  console.log(`  Password: ${adminUser.password}`);
  console.log(`  Role    : admin\n`);
};

seed().catch(console.error);
