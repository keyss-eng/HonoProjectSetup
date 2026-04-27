// apps/frontend/src/components/Footer.tsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="text-blue-500">⚡</span> UttamSewa
        </div>
        
        <div className="flex gap-6 text-sm text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Waitlist</Link>
          <Link to="/features" className="hover:text-white transition-colors">Features</Link>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
        
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} UttamSewa. All rights reserved.
        </div>
      </div>
    </footer>
  )
}