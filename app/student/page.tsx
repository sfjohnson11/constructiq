// File: app/student/page.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import supabase from "@/lib/supabaseClient"

interface UserData {
  id: string
  role?: string
}

export default function StudentDashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const { data: sessionData } = await supabase.auth.getUser()
      const userId = sessionData?.user?.id

      if (!userId) return

      const { data, error } = await supabase
        .from("users")
        .select("id, role")
        .eq("id", userId)
        .single()

      if (!error && data) {
        setUserData(data)
      }
    }

    fetchUser()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow">
            Welcome to E-Deck ConstructIQ
          </h1>
          <p className="text-blue-200 mt-2 italic">
            by S F Johnson Enterprises, LLC
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/student/video-quiz"
            className="bg-blue-800 hover:bg-blue-700 rounded-xl p-6 shadow-lg border border-yellow-400 transition"
          >
            <h2 className="text-xl font-bold text-yellow-300 mb-2">📺 Watch & Take Quiz</h2>
            <p className="text-blue-100">
              Start an assigned video lesson and complete the quiz to test your knowledge.
            </p>
          </Link>

          {userData?.role === "teacher" && (
            <Link
              href="/teacher/create-quiz"
              className="bg-blue-800 hover:bg-blue-700 rounded-xl p-6 shadow-lg border border-yellow-400 transition"
            >
              <h2 className="text-xl font-bold text-yellow-300 mb-2">🛠️ Create New Quiz</h2>
              <p className="text-blue-100">
                Upload a video and add quiz questions for your students to complete.
              </p>
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
