// File: app/instructor/videos/page.tsx
"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"

type Project = {
  id: number
  name: string
}

export default function VideosPage() {
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
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">🎥 Project Videos</h1>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="bg-slate-800 p-3 rounded-xl">
            {project.name}
          </li>
        ))}
      </ul>
    </main>
  )
}
