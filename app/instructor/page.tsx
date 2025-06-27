// File: app/instructor/page.tsx

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InstructorDashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">Instructor Dashboard</h1>
          <p className="text-blue-200 italic">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Upload Plans */}
          <div className="bg-blue-800 bg-opacity-30 border border-yellow-500 rounded-2xl p-6 shadow-md hover:shadow-yellow-400 transition">
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">📁 Upload Plans</h2>
            <p className="text-blue-200 mb-4">
              Start a new project by uploading plan sets for review and takeoff.
            </p>
            <Link href="/instructor/upload">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 w-full font-bold">
                Upload Now
              </Button>
            </Link>
          </div>

          {/* Manage Quizzes */}
          <div className="bg-blue-800 bg-opacity-30 border border-yellow-500 rounded-2xl p-6 shadow-md hover:shadow-yellow-400 transition">
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">📝 Create Quizzes</h2>
            <p className="text-blue-200 mb-4">
              Design quizzes for each video lesson to test student knowledge.
            </p>
            <Link href="/instructor/quizzes">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 w-full font-bold">
                Manage Quizzes
              </Button>
            </Link>
          </div>

          {/* Review Student Work */}
          <div className="bg-blue-800 bg-opacity-30 border border-yellow-500 rounded-2xl p-6 shadow-md hover:shadow-yellow-400 transition">
            <h2 className="text-xl font-semibold mb-3 text-yellow-300">📊 Review Takeoffs</h2>
            <p className="text-blue-200 mb-4">
              Compare student work to your own estimates and give feedback.
            </p>
            <Link href="/instructor/review">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 w-full font-bold">
                Review Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
