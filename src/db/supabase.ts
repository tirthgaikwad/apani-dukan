
import { createClient } from "@supabase/supabase-js";

// Default public credentials as fallback when environment variables are not injected at build time
const DEFAULT_SUPABASE_URL = "https://dknadxeoqielzvtjemvw.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_4I1snL26G1DKKSUznGeyag_6xTU8mt3";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

            