// apps/frontend/src/pages/NotFound.tsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-blue-500 font-mono text-xl mb-4">Error 404</div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-lg text-slate-400 max-w-md mb-10">
        The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
      >
        Go Back Home
      </Link>
    </div>
  )
}