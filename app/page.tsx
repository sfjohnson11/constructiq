// File: app/page.tsx

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] to-[#001F3F] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-5xl text-center py-20">
        <h1 className="text-6xl font-black mb-4 text-yellow-400 drop-shadow-xl tracking-tight">
          E-Deck ConstructIQ
        </h1>
        <p className="text-xl text-slate-300 mb-2 font-semibold">
          All-Trades Estimating & Instruction Platform
        </p>
        <p className="text-md text-slate-400 mb-8">
          Built by S F Johnson Enterprises, LLC – Train. Estimate. Win Bids.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a
            href="/student"
            className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-yellow-300 transition"
          >
            Student Portal
          </a>
          <a
            href="/admin/login"
            className="bg-transparent border border-yellow-400 text-yellow-400 text-lg px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 hover:text-black transition"
          >
            Instructor Login
          </a>
          <a
            href="https://www.sfjohnsonconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 underline mt-2 hover:text-yellow-300"
          >
            Learn more at sfjohnsonconsulting.com
          </a>
        </div>

        <footer className="text-sm text-slate-500">
          © 2025 S F Johnson Enterprises, LLC. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
