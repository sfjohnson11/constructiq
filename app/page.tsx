// File: app/page.tsx
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex flex-col justify-between">
      {/* Top Navigation */}
      <nav className="w-full bg-blue-800 px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-yellow-400">
            E-Deck ConstructIQ
          </h1>
          <Link
            href="/student"
            className="text-yellow-300 hover:text-yellow-200 transition text-sm"
          >
            Student Portal
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-xl">
            Estimate. Learn. Build.
          </h2>
          <p className="text-lg md:text-xl text-blue-200">
            All-Trades Estimating & Instruction Platform from
            <br />
            <span className="text-yellow-300 font-medium">
              S F Johnson Enterprises, LLC
            </span>
          </p>
          <div className="flex justify-center space-x-4 pt-6">
            <Link
              href="/student"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-bold shadow-md transition"
            >
              Begin
            </Link>
            <Link
              href="https://www.sfjohnsonconsulting.com"
              target="_blank"
              className="border border-yellow-300 text-yellow-300 hover:text-white hover:bg-yellow-400 px-6 py-3 rounded-xl font-semibold transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 py-4 text-center text-sm text-blue-200">
        &copy; {new Date().getFullYear()} S F Johnson Enterprises, LLC. All rights reserved.
      </footer>
    </main>
  )
}
