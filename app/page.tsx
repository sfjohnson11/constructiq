// File: app/page.tsx
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white flex items-center justify-center px-6">
      <div className="text-center max-w-3xl space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
          E-Deck ConstructIQ
        </h1>
        <p className="text-lg md:text-xl text-blue-200 italic">
          All-Trades Estimating & Instruction by S F Johnson Enterprises, LLC
        </p>
        <p className="text-md md:text-lg text-blue-100">
          Build accurate estimates. Train confidently. Track performance. Built for today’s contractors and construction students.
        </p>

        <div className="flex justify-center space-x-4 pt-4">
          <Link
            href="/student"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-xl shadow transition"
          >
            Begin
          </Link>
          <Link
            href="https://www.sfjohnsonconsulting.com"
            target="_blank"
            className="bg-blue-700 hover:bg-blue-600 border border-yellow-400 text-yellow-300 px-6 py-3 rounded-xl shadow transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  )
}
