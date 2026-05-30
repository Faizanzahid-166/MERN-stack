// src/lib/supabase.js
// Lightweight Supabase client for the frontend.
// Uses the PUBLIC anon key — safe to expose in the browser.
// All auth and writes go through your Express backend.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
