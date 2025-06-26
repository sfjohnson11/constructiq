// File: app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white flex flex-col justify-center items-center px-6 py-16">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-6 drop-shadow-lg">
          E-Deck ConstructIQ
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-blue-200 mb-4">
          Student Portal
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-6">
          Estimate. Learn. Build.
        </p>
        <p className="text-sm md:text-base text-slate-300 mb-10">
          All-Trades Estimating & Instruction Platform from<br />
          <span className="font-semibold">S F Johnson Enterprises, LLC</span>
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/student"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-300 transition"
          >
            Begin
          </a>
          <a
            href="https://www.sfjohnsonconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-yellow-400 text-yellow-400 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition"
          >
            Learn More
          </a>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-blue-300">
        © 2025 S F Johnson Enterprises, LLC. All rights reserved.
      </footer>
    </main>
  );
}
