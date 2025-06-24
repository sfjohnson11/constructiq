// File: app/instructor/page.tsx

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InstructorDashboard() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Instructor Dashboard</h1>
          <p className="text-slate-300 text-lg">
            Welcome to your workspace. Upload plans, create quizzes, and review student takeoffs.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upload Plans */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">📁 Upload Plans</h2>
            <p className="text-slate-300 mb-4">Start a new project by uploading plan sets for review and takeoff.</p>
            <Link href="/instructor/upload">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 w-full">Upload Now</Button>
            </Link>
          </div>

          {/* Manage Quizzes */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">📝 Create Quizzes</h2>
            <p className="text-slate-300 mb-4">Design quizzes for each video lesson to test student knowledge.</p>
            <Link href="/instructor/quizzes">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 w-full">Manage Quizzes</Button>
            </Link>
          </div>

          {/* Review Student Work */}
          <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3">📊 Review Takeoffs</h2>
            <p className="text-slate-300 mb-4">Compare student work to your own estimates and give feedback.</p>
            <Link href="/instructor/review">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 w-full">Review Now</Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
