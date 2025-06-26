"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function HomePage() {
  const [user, setUser] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-900 text-white">
      <nav className="bg-blue-900 text-yellow-400 font-semibold shadow-lg p-4 text-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">E-Deck ConstructIQ</span>
          <div className="space-x-6">
            <Link href="/projects">Projects</Link>
            <Link href="/student">Student</Link>
            {user && <Link href="/admin/quiz-builder">Create Quiz</Link>}
          </div>
        </div>
      </nav>

      <section className="text-center py-28 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
          Build Smarter. Estimate Faster.
        </h1>
        <p className="text-lg mt-6 text-blue-200 max-w-xl mx-auto">
          E-Deck ConstructIQ by S F Johnson Enterprises, LLC is your premium
          all-trades estimating and training platform.
        </p>
        <div className="mt-10 space-x-6">
          <Link
            href="/student"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-lg font-medium hover:bg-yellow-300 transition"
          >
            Begin Learning
          </Link>
          <Link
            href="https://www.sfjohnsonconsulting.com"
            target="_blank"
            className="text-yellow-300 underline hover:text-yellow-200 text-lg"
          >
            Learn More
          </Link>
        </div>
      </section>

      <footer className="bg-blue-950 py-6 mt-24 text-center text-blue-300 text-sm">
        &copy; {new Date().getFullYear()} S F Johnson Enterprises, LLC. All rights
        reserved.
      </footer>
    </main>
  )
}
