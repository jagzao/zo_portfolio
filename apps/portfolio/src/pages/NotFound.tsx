import { Link } from 'react-router-dom'

export function NotFound() {
  return <div className="section-shell flex min-h-screen items-center justify-center pt-32">
    <div className="premium-panel max-w-2xl p-10 text-center">
      <p className="font-mono text-sm tracking-[.3em] text-[#D01920]">404</p>
      <h1 className="mt-4 text-4xl font-extrabold text-white">Page not found</h1>
      <p className="mt-4 text-[#B9B9B4]">The requested route is not part of the current portfolio.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-gold">Back home</Link>
        <Link to="/case-studies" className="btn-dark">Case Studies</Link>
        <Link to="/architecture-lab" className="btn-dark">Architecture Lab</Link>
      </div>
    </div>
  </div>
}
