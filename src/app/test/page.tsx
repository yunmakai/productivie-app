export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Test Page - Productivie App
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see this page, Next.js routing is working correctly.
        </p>
        <div className="space-y-2">
          <p><strong>Deployment Status:</strong> ✅ Success</p>
          <p><strong>Next.js Version:</strong> 15.4.4</p>
          <p><strong>Test Route:</strong> /test</p>
        </div>
        <div className="mt-6">
          <a 
            href="/auth/login" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Login Page
          </a>
        </div>
      </div>
    </div>
  )
}

