// File: app/instructor/upload.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import supabase from "@/lib/supabaseClient"

export default function UploadPlansPage() {
  const [projectName, setProjectName] = useState("")
  const [planLabel, setPlanLabel] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState("")

  const handleUpload = async () => {
    if (!projectName || !planLabel || !file) {
      setStatus("All fields are required.")
      return
    }

    setStatus("Uploading...")

    // 1. Insert into electrical_projects
    const { data: project, error: projectError } = await supabase
      .from("electrical_projects")
      .insert([{ name: projectName }])
      .select()
      .single()

    if (projectError || !project) {
      setStatus("Failed to insert project.")
      return
    }

    // 2. Upload file to Supabase Storage
    const filePath = `plans/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from("electrical")
      .upload(filePath, file)

    if (uploadError) {
      setStatus("Failed to upload file to storage.")
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from("electrical")
      .getPublicUrl(filePath)

    const file_url = publicUrlData?.publicUrl

    // 3. Insert into electrical_plan_sets
    const { error: planError } = await supabase
      .from("electrical_plan_sets")
      .insert([
        {
          project_id: project.id,
          title: planLabel,
          file_url
        }
      ])

    if (planError) {
      setStatus("Failed to save plan metadata.")
    } else {
      setStatus("✅ Upload successful!")
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-yellow-400">📁 Upload Electrical Plans</h1>

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <input
          type="text"
          placeholder="Plan Set Label"
          value={planLabel}
          onChange={(e) => setPlanLabel(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept=".pdf,image/*"
          className="w-full file:bg-yellow-400 file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-xl file:border-none bg-slate-800 text-white rounded-xl border border-slate-700"
        />

        <Button onClick={handleUpload} className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 flex gap-2 items-center">
          <Upload size={18} /> Upload Plan
        </Button>

        {status && <p className="text-sm text-green-400 mt-2">{status}</p>}
      </div>
    </main>
  )
}
