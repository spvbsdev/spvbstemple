export default async function TestPage() {
  const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sanity Integration Test</h1>
      
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl mb-2">Sanity Configuration:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(sanityConfig, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <p>Check the API test at: <code>/api/test-sanity</code></p>
      </div>
    </div>
  )
} 