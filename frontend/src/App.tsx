import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard';

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
    <Dashboard />
  )
}

export default App