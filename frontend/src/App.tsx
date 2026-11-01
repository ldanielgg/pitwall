import { useEffect, useState } from 'react'

interface HealthResponse {
  status: string
  application: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/health')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Backend request failed')
      }

      return response.json()
    })
    .then((data: HealthResponse) => {
      setHealth(data)
    })
    .catch((err: Error) => {
      setError(err.message)
    })
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5x1 font-bold tracking-widest">
          PITWALL
        </h1>
        <p className="text-slate-400">
          Formula 1 Strategy Analysis
        </p>
        {health && (
          <p className="text-green-400">
            Backend connected: {health.application}
          </p>
        )}

        {error && (
          <p className="text-red-400">
            Connection error: {error}
          </p>
        )}
      </div>
    </main>
  )
}

export default App