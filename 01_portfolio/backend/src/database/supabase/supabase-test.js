import { supabase } from "./supabaseClient.js";

async function testConnection() {
  const { data, error } = await supabase.from('01_repository_projects').select('*').limit(1);
  if (error) console.error("Error:", error);
  else console.log("Success! Sample data:", data);
}

testConnection();
