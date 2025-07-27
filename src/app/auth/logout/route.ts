import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}

