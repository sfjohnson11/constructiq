// File: app/page.tsx
"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 text-white">
      {/* Navbar */}
      <header className="w-full bg-blue-950 shadow-lg border-b border-yellow-500">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400 tracking-wide">
            E-Deck ConstructIQ
          </h1>
          <nav className="space-x-6 text-sm sm:text-base">
            <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link href="/projects" className="hover:text-yellow-300 transition">Projects</Link>
            <Link href="/student/video-quiz?quizId=demo" className="hover:text-yellow-300 transition">Quiz</Link>
            <a
              href="https://www.sfjohnsonconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition"
            >
              Support
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl space-y-8">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 leading-tight drop-shadow-lg">
            Estimate. Learn. Build.
          </h2>

          <p className="text-lg sm:text-xl text-blue-100">
            Powered by <span className="font-semibold text-yellow-300">S F Johnson Enterprises, LLC</span>
          </p>

          <p className="text-md sm:text-lg text-blue-200">
            A premium estimating and training platform for students, educators, and professionals in all trades.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              href="/student/video-quiz?quizId=demo"
              className="bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold px-8 py-4 rounded-full shadow-lg transition"
            >
              🚀 Begin Now
            </Link>

            <a
              href="https://www.sfjohnsonconsulting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg font-bold px-8 py-4 rounded-full transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 border-t border-yellow-500 py-6 text-center text-sm text-blue-300">
        <p>© {new Date().getFullYear()} E-Deck ConstructIQ · S F Johnson Enterprises, LLC. All rights reserved.</p>
        <p className="mt-2">
          <a href="https://www.sfjohnsonconsulting.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">
            www.sfjohnsonconsulting.com
          </a>
        </p>
      </footer>
    </main>
  )
}
