// apps/frontend/src/pages/Home.tsx
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { joinWaitlistSchema } from '../../../../packages/shared/src/schemas'

export default function Home() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const referredBy = searchParams.get('ref') || undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validation = joinWaitlistSchema.safeParse({ email, referred_by: referredBy })
    if (!validation.success) {
      // FIX: Changed .errors to .issues
      setError(validation.error.issues[0].message)
      return
    }

    setLoading(true)
    try {
      const response = await api.api.join.$post({
        json: { email, referred_by: referredBy }
      })
      const data = await response.json()

      if (data.success) {
        navigate(`/status/${data.referral_code}`)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Failed to connect to the server. Is backend running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-400 bg-blue-900/30 border border-blue-800/50 rounded-full">
          The Future of Home Services
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-6">
          Be the first to <br/> experience magic.
        </h1>
        
        <p className="text-lg text-slate-400 mb-10">
          Join 10,000+ others on the V1cost waitlist. Invite friends to jump the queue and get early access.
        </p>

        <div className="p-1 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl border border-slate-800">
          <div className="bg-slate-950 p-6 sm:p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
            
            {error && <p className="mt-3 text-sm text-red-400 text-left px-1">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}