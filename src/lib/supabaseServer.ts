import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies()` helper can be called only from a Server Component or Server Action.
            // This error is typically thrown when running a Server Component that uses cookies() for the first time, but it can be safely ignored.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `cookies()` helper can be called only from a Server Component or Server Action.
            // This error is typically thrown when running a Server Component that uses cookies() for the first time, but it can be safely ignored.
          }
        },
      },
    }
  )
}


