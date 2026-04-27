// apps/frontend/src/pages/Status.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'

type StatusData = { rank: number, points: number, total_referrals: number }

export default function Status() {
  const { code } = useParams<{ code: string }>()
  const [data, setData] = useState<StatusData | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const referralLink = `${window.location.origin}/?ref=${code}`

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.api.status[':code'].$get({
          param: { code: code || '' }
        })
        const result = await response.json()
        
        if (result.success && result.data) {
          // FIX: Typecast result.data to StatusData
          setData(result.data as StatusData)
        } else {
          setError('User not found.')
        }
      } catch (err) {
        setError('Failed to fetch status.')
      }
    }
    if (code) fetchStatus()
  }, [code])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (error) return <div className="text-center mt-20 text-red-400">{error}</div>
  if (!data) return <div className="text-center mt-20 animate-pulse">Loading your rank...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-emerald-400 bg-emerald-900/30 border border-emerald-800/50 rounded-full">
         You're on the list!
      </div>
      
      <h1 className="text-4xl font-bold mb-10">Your Current Status</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
          <p className="text-slate-400 text-sm font-medium mb-1">Your Rank</p>
          <p className="text-4xl font-extrabold text-white">#{data.rank}</p>
        </div>
        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
          <p className="text-slate-400 text-sm font-medium mb-1">Invites Sent</p>
          <p className="text-4xl font-extrabold text-blue-400">{data.total_referrals}</p>
        </div>
        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg col-span-2 md:col-span-1">
          <p className="text-slate-400 text-sm font-medium mb-1">Points</p>
          <p className="text-4xl font-extrabold text-emerald-400">{data.points}</p>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-b from-blue-900/20 to-slate-900 rounded-2xl border border-blue-900/50">
        <h2 className="text-2xl font-bold mb-2">Jump the queue!</h2>
        <p className="text-slate-400 mb-6">
          Share your unique link. Earn 10 points for every friend who joins, and move up the waitlist automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input 
            type="text" 
            readOnly 
            value={referralLink}
            className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-300 focus:outline-none"
          />
          <button 
            onClick={copyToClipboard}
            className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all w-full sm:w-auto"
          >
            {copied ? 'Copied! ✓' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  )
}