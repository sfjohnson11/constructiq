// File: app/instructor/videos/page.tsx
"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"

type Project = {
  id: number
  name: string
}

export default function InstructorVideosPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase
        .from("electrical_projects")
        .select("id, name")

      if (!error && data) {
        setProjects(data)
      } else {
        console.error("Error loading projects:", error)
      }
    }

    loadProjects()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">
            🎥 Project Videos
          </h1>
          <p className="text-blue-200 italic">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-blue-800 bg-opacity-30 border border-yellow-500 rounded-xl p-4 hover:shadow-yellow-400 shadow-md transition"
            >
              <p className="text-lg font-semibold text-yellow-300">{project.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
