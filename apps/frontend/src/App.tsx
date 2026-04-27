// apps/frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Features from './pages/Features'
import Status from './pages/Status'

function App() {
  return (
    <BrowserRouter>
      {/* Global Theme: Dark background with Slate text */}
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
        <Navbar />
        {/* Main Content: Padding top added because Navbar is fixed */}
        <main className="pt-16 min-h-screen"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/status/:code" element={<Status />} />
            <Route path="*" element={<div className="text-center mt-20 text-2xl">404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App