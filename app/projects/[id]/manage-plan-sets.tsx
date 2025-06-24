// File: app/projects/[id]/manage-plan-sets.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Upload, Trash, FileText, PlusCircle } from "lucide-react"
import Link from "next/link"

interface PlanSet {
  id: string
  title: string
  file_url: string
  uploaded_at: string
}

export default function ManagePlanSets() {
  const { id: projectId } = useParams()
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [planSets, setPlanSets] = useState<PlanSet[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPlanSets = async () => {
      const { data } = await supabase
        .from("electrical_plan_sets")
        .select("*")
        .eq("project_id", projectId)
        .order("uploaded_at", { ascending: false })
      setPlanSets(data || [])
    }
    if (projectId) fetchPlanSets()
  }, [projectId])

  const handleUpload = async () => {
    if (!file || !title) return alert("Missing title or file.")
    setLoading(true)
    const filename = `${Date.now()}_${file.name}`

    const { data: storageData, error: storageError } = await supabase.storage
      .from("plans")
      .upload(filename, file)

    if (storageError) {
      console.error(storageError)
      alert("File upload failed.")
      return setLoading(false)
    }

    const fileUrl = supabase.storage.from("plans").getPublicUrl(filename).data.publicUrl
    const { error: dbError } = await supabase.from("electrical_plan_sets").insert([
      {
        project_id: projectId,
        title,
        file_url: fileUrl
      }
    ])

    if (dbError) {
      console.error(dbError)
      alert("Database insert failed.")
    } else {
      setTitle("")
      setFile(null)
      location.reload()
    }
    setLoading(false)
  }

  const deleteSet = async (setId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this plan set?")
    if (!confirm) return
    await supabase.from("electrical_plan_sets").delete().eq("id", setId)
    setPlanSets(planSets.filter((s) => s.id !== setId))
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-yellow-400">📁 Manage Plan Sets</h1>

        <div className="space-y-4 bg-slate-800 p-6 rounded-xl">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600"
            placeholder="Plan Set Title (e.g., Electrical Set A)"
          />

          <input
            type="file"
            accept=".pdf,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full file:bg-yellow-400 file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-xl file:border-none bg-slate-700 text-white rounded-xl border border-slate-600"
          />

          <Button onClick={handleUpload} disabled={loading} className="bg-yellow-400 text-black">
            <Upload size={16} /> {loading ? "Uploading..." : "Upload Plan Set"}
          </Button>
        </div>

        <div className="space-y-6">
          {planSets.map((set) => (
            <div
              key={set.id}
              className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-600"
            >
              <div>
                <h2 className="text-lg font-semibold text-yellow-300">{set.title}</h2>
                <p className="text-sm text-slate-300">Uploaded: {new Date(set.uploaded_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/projects/${projectId}/plan-set/${set.id}`}>
                  <Button className="bg-blue-600 text-white flex gap-1">
                    <FileText size={16} /> Manage
                  </Button>
                </Link>
                <Button onClick={() => deleteSet(set.id)} className="bg-red-600 text-white">
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
