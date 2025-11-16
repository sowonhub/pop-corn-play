import { ENV } from "@/config/env";
import { createClient } from "@supabase/supabase-js";

const isDev = import.meta.env.DEV;
const hasPlaceholder =
  ENV.AUTH_DATABASE.URL.includes("your_") ||
  ENV.AUTH_DATABASE.ANON_KEY.includes("your_");
const supabaseUrl =
  isDev && hasPlaceholder
    ? "https://placeholder.supabase.co"
    : ENV.AUTH_DATABASE.URL;
const supabaseKey =
  isDev && hasPlaceholder ? "placeholder-key" : ENV.AUTH_DATABASE.ANON_KEY;

export const authClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
