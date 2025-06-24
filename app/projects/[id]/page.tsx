// File: app/projects/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
}

interface PlanSet {
  id: string
  title: string
  file_url: string
  uploaded_at: string
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [planSets, setPlanSets] = useState<PlanSet[]>([])
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      // Get user and role
      const {
        data: { user }
      } = await supabase.auth.getUser()

      const { data: profile } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user?.id)
        .single()

      setRole(profile?.role || null)

      // Fetch project
      const { data: projectData } = await supabase
        .from("electrical_projects")
        .select("*")
        .eq("id", id)
        .single()

      setProject(projectData)

      // Fetch related plan sets
      const { data: planData } = await supabase
        .from("electrical_plan_sets")
        .select("*")
        .eq("project_id", id)
        .order("uploaded_at", { ascending: false })

      setPlanSets(planData || [])
    }

    fetchData()
  }, [id])

  if (!project) return <p className="text-white p-6">Loading project...</p>

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <header>
          <h1 className="text-4xl font-bold text-yellow-400">{project.name}</h1>
          <p className="text-slate-300">{project.description}</p>
        </header>

        {role === "instructor" && (
          <div className="flex gap-4 mb-4">
            <Link href={`/instructor/upload`}>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300">+ Add Plan Set</Button>
            </Link>
            <Link href={`/instructor/create`}>
              <Button className="bg-blue-600 text-white hover:bg-blue-500">+ Add Quiz</Button>
            </Link>
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planSets.map((plan) => (
            <div
              key={plan.id}
              className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-md"
            >
              <h2 className="text-xl font-bold text-yellow-300 mb-2">{plan.title}</h2>
              <p className="text-sm text-slate-400 mb-4">
                Uploaded: {new Date(plan.uploaded_at).toLocaleDateString()}
              </p>
              <a
                href={plan.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View Plan or Video
              </a>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
