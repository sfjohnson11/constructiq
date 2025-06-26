// File: app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Deck ConstructIQ",
  description: "All-Trades Estimating Platform by S F Johnson Enterprises",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-950 to-blue-800 text-white min-h-screen flex flex-col items-center justify-center`}>
        <div className="w-full">{children}</div>
      </body>
    </html>
  )
}

