// File: app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "E-Deck ConstructIQ",
  description: "All-Trades Estimating & Instruction Platform by SF Johnson Enterprises, LLC",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-[#0a0a23] to-[#001F3F] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
