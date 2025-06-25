// File: app/projects/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import supabase from "../../lib/supabaseClient"

interface Project {
  id: string
  name: string
  description: string
  created_at: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchRoleAndProjects = async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()

      if (userError || !user) return

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single()

      if (profile?.role) setRole(profile.role)

      const { data: projectsData } = await supabase
        .from("electrical_projects")
        .select("*")
        .order("created_at", { ascending: false })

      setProjects(projectsData || [])
    }

    fetchRoleAndProjects()
  }, [])

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Electrical Projects</h1>
          <p className="text-slate-300">
            {role === "instructor"
              ? "Manage your estimating projects and plan sets."
              : "Select a project below to begin studying and estimating."}
          </p>
        </header>

        {role === "instructor" && (
          <div className="flex justify-end">
            <Link href="/instructor/upload">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 px-5 py-2 text-md font-semibold">
                + Add New Project
              </Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700"
            >
              <h2 className="text-xl font-bold text-yellow-300 mb-2">{project.name}</h2>
              <p className="text-slate-300 mb-4">{project.description}</p>
              <Link href={`/projects/${project.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white w-full">
                  {role === "instructor" ? "Manage Project" : "Start Training"}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

