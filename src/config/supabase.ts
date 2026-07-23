import { createClient } from '@supabase/supabase-js';

// Safe environment variable retrieval
const getEnv = () => {
  if (typeof import.meta !== 'undefined' && (import.meta as Record<string, any>).env) {
    return (import.meta as Record<string, any>).env;
  }
  return {};
};

const env = getEnv();
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (!supabaseUrl.includes('supabase.co')) return false;
  if (
    supabaseUrl.includes('your-supabase-project') ||
    supabaseUrl.includes('your-project') ||
    supabaseUrl.includes('YOUR_SUPABASE') ||
    supabaseAnonKey.includes('your-supabase-anon-key') ||
    supabaseAnonKey.includes('your-anon-key') ||
    supabaseAnonKey.includes('YOUR_SUPABASE')
  ) {
    return false;
  }
  return true;
}

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
