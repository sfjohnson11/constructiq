// File: app/page.tsx
"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 text-yellow-100 px-6">
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-yellow-400 leading-tight">
          E-Deck ConstructIQ
        </h1>

        <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto">
          A cutting-edge trade estimating and training platform built by{" "}
          <span className="text-yellow-300 font-semibold">
            S F Johnson Enterprises, LLC
          </span>
        </p>

        <p className="text-base sm:text-lg text-blue-200 max-w-2xl mx-auto">
          Empowering contractors and students to master plan reading, estimation, and project success — across all trades.
        </p>

        <Link
          href="/student/video-quiz?quizId=demo"
          className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-semibold px-12 py-4 rounded-full shadow-xl transition"
        >
          🚀 Begin Now
        </Link>
      </div>
    </main>
  )
}
