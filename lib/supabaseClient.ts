import { createClient } from "@supabase/supabase-js";

// Read the environment variables (ensure they are set in .env.local or Vercel)
// We assert (!) that these exist because they are required for Supabase to function.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a singleton Supabase client instance for the browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
