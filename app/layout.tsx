// File: app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen flex items-center justify-center`}
      >
        <div className="w-full max-w-screen-xl px-6">{children}</div>
      </body>
    </html>
  )
}

