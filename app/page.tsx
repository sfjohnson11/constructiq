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
