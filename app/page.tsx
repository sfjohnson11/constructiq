// File: app/page.tsx
"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 text-yellow-100 px-6 py-24">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 leading-tight">
          E-Deck ConstructIQ
        </h1>

        <p className="text-xl sm:text-2xl text-blue-200 max-w-3xl mx-auto">
          A cutting-edge trade estimating and training platform created by{" "}
          <span className="text-yellow-300 font-semibold">
            S F Johnson Enterprises, LLC
          </span>
          . Empowering contractors and students to master plan reading, estimation, and project success — across all trades.
        </p>

        <div className="mt-10">
          <Link
            href="/student/video-quiz?quizId=demo"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-semibold px-10 py-4 rounded-full shadow-lg transition"
          >
            🚀 Begin Now
          </Link>
        </div>
      </div>
    </main>
  )
}

