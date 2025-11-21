import { ENV } from "@/config/env";
import { createClient } from "@supabase/supabase-js";

const databaseAuthUrl = ENV.VITE_DATABASE_AUTH_URL;
const databaseAuthAnonKey = ENV.VITE_DATABASE_AUTH_ANON_KEY;

export const databaseAuthClient = createClient(
  databaseAuthUrl,
  databaseAuthAnonKey,
  {
    auth: {
      persistSession: true,
      storage: localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);
