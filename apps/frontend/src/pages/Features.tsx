// apps/frontend/src/pages/Features.tsx
export default function Features() {
  const features = [
    { title: "Instant Booking", desc: "Book top-rated home services in under 60 seconds." },
    { title: "Verified Professionals", desc: "Every provider undergoes strict background checks." },
    { title: "Transparent Pricing", desc: "No hidden fees. You see what you pay upfront." }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Why Choose Us?
        </h1>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
          We are revolutionizing the way you manage home services. Here is what makes us different.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl mb-4 flex items-center justify-center text-blue-400 text-xl font-bold">
              {i + 1}
            </div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}