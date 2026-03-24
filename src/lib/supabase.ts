import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function getSupabaseBrowserClient() {
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}

export function getSupabaseServerClient(cookieStore?: {
  getAll: () => Array<{ name: string; value: string }>;
  setAll: (cookies: Array<{ name: string; value: string; options?: Record<string, unknown> }>) => void;
}) {
  if (!cookieStore) {
    return createClient(env.supabaseUrl, env.supabaseAnonKey);
  }

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookies) => cookieStore.setAll(cookies)
    }
  });
}

export function getSupabaseAdminClient() {
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey);
}
