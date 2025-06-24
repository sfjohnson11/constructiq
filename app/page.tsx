import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">E-Deck ConstructIQ</h1>
        <p className="text-xl text-blue-100 mb-10">
          The All-Trades Estimating + Training Platform — Learn. Practice. Master the Takeoff.
        </p>
        <Link href="/projects">
          <Button className="text-lg px-6 py-4 rounded-xl shadow-xl hover:scale-105 transition-all">
            Start Training Now
          </Button>
        </Link>
      </div>
    </main>
  )
}
