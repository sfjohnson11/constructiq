// ConstructIQ Starter App Setup (Full Base Structure)

// File: package.json
{
  "name": "constructiq",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.4",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.288.0",
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "^3.4.1",
    "@shadcn/ui": "latest"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.24",
    "typescript": "^5.4.3"
  }
}

// File: tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e3a8a', // blue-800
          light: '#3b82f6',   // blue-500
          accent: '#facc15'   // yellow-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
export default config

// File: postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// File: lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabase

// File: app/page.tsx
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold leading-tight mb-6">E-Deck ConstructIQ</h1>
        <p className="text-xl text-blue-100 mb-10">
          The All-Trades Estimating + Training Platform — Learn. Practice. Master the Takeoff.
        </p>
        <Link href="/projects">
          <Button className="bg-yellow-400 text-black text-lg px-6 py-4 rounded-xl shadow-xl hover:scale-105 transition-all">
            Start Training Now
          </Button>
        </Link>
      </div>
    </main>
  )
}
