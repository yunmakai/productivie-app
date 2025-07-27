import { createClient } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's dashboards
  const { data: dashboards, error } = await supabase
    .from('dashboards')
    .select('*')
    .eq('user_id', user.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Productivie, {user.email}!
          </h1>
          <p className="mt-2 text-gray-600">
            Build your custom productivity dashboard
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Dashboards
          </h2>
          
          {error ? (
            <div className="text-red-600">Error loading dashboards: {error.message}</div>
          ) : dashboards && dashboards.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboards.map((dashboard) => (
                <div key={dashboard.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900">{dashboard.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(dashboard.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don&apos;t have any dashboards yet.</p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Create Your First Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

