// =====================================================================
// app/lib/supabase-server.ts
// Cliente Supabase para Server Components y Route Handlers
// =====================================================================
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function getSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Server Components no pueden mutar cookies — ignorar
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {}
        },
      },
    }
  );
}

// Cliente con service_role para operaciones cron (sin auth)
import { createClient } from '@supabase/supabase-js';
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

// Helper para verificar auth en cada endpoint
export async function requireUser() {
  const supabase = getSupabaseServer();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return {
      user: null,
      supabase,
      errorResponse: NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      ),
    };
  }
  return { user, supabase, errorResponse: null };
}
