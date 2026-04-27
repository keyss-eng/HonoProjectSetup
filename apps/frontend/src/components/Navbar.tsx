// apps/frontend/src/components/Navbar.tsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-blue-500"></span> V1Cost
        </Link>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/features" className="hover:text-white transition-colors">Features</Link>
        </div>
      </div>
    </nav>
  )
}