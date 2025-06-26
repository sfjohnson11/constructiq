// File: app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-blue-950 to-blue-800 text-white`}>
        {children}
      </body>
    </html>
  )
}
