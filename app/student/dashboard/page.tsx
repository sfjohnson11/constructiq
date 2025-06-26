// File: app/student/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import Link from "next/link"

interface Quiz {
  id: string
  title: string
}

export default function StudentDashboardPage() {
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudentQuizzes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data } = await supabase
        .from("electrical_quizzes")
        .select("id, title")
        .order("created_at", { ascending: false })

      setQuizzes(data || [])
      setLoading(false)
    }

    fetchStudentQuizzes()
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">📘 Student Dashboard</h1>
          <p className="text-blue-200 italic">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        {loading ? (
          <p className="text-center text-lg text-blue-300">Loading quizzes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/student/video-quiz?quizId=${quiz.id}`}
                className="block bg-blue-800 border border-blue-500 rounded-xl p-6 hover:bg-blue-700 transition"
              >
                <h2 className="text-xl font-bold text-yellow-300">{quiz.title}</h2>
                <p className="text-sm text-blue-200 mt-1">Click to begin quiz</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
