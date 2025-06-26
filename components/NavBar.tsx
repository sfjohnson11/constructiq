// File: components/NavBar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/student/video-quiz", label: "Student Quiz" },
  { href: "/instructor/create-quiz", label: "Create Quiz" },
  { href: "/projects", label: "Projects" }
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-950 text-yellow-400 shadow-lg py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold">📘 E-Deck ConstructIQ</h1>
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-yellow-300 transition ${
              pathname === link.href ? "underline underline-offset-4" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
