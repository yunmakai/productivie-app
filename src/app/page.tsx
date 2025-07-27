import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  } else {
    redirect('/dashboard')
  }
}
