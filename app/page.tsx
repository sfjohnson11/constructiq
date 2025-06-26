// File: app/page.tsx

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      {/* Header */}
      <header className="text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-4 drop-shadow-xl">
          E-Deck ConstructIQ
        </h1>
        <p className="text-lg italic text-blue-100 mb-2">
          All-Trades Estimating & Instruction Platform
        </p>
        <p className="text-md text-blue-200">
          From S F Johnson Enterprises, LLC
        </p>
      </header>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center gap-6 px-4">
        <a
          href="/student/login"
          className="bg-yellow-400 text-black px-8 py-4 rounded-xl text-xl font-semibold shadow hover:bg-yellow-300 transition"
        >
          Begin
        </a>
        <a
          href="https://www.sfjohnsonconsulting.com"
          target="_blank"
          className="underline text-blue-200 hover:text-white"
        >
          Learn More
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-blue-200 mt-12">
        © 2025 S F Johnson Enterprises, LLC. All rights reserved.
      </footer>
    </div>
  )
}
