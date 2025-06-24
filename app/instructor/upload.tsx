// File: app/instructor/upload.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import supabase from "@/lib/supabaseClient"
import { v4 as uuidv4 } from "uuid"

export default function UploadPlansPage() {
  const [file, setFile] = useState<File | null>(null)
  const [trade, setTrade] = useState("")
  const [label, setLabel] = useState("")
  const [notes, setNotes] = useState("")
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleUpload = async () => {
    if (!file || !trade || !label) {
      alert("Please fill out all required fields.")
      return
    }

    setUploading(true)
    const filename = `${uuidv4()}_${file.name}`

    // 1. Upload to Supabase Storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from("plans")
      .upload(filename, file)

    if (fileError) {
      setMessage("Upload failed.")
      console.error(fileError)
      setUploading(false)
      return
    }

    const fileUrl = supabase.storage.from("plans").getPublicUrl(filename).data.publicUrl

    // 2. Save metadata to 'plans' table
    const { error: dbError } = await supabase.from("plans").insert([
      {
        trade,
        label,
        notes,
        file_url: fileUrl,
        filename,
      }
    ])

    if (dbError) {
      setMessage("Database save failed.")
      console.error(dbError)
    } else {
      setMessage("✅ Plan uploaded successfully.")
      setFile(null)
      setTrade("")
      setLabel("")
      setNotes("")
    }

    setUploading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-yellow-400">📁 Upload Project Plans</h1>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-100">Select Trade</label>
          <select
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
          >
            <option value="">-- Choose a Trade --</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="HVAC">HVAC</option>
            <option value="Framing">Framing</option>
            <option value="Demo">Demolition</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-100">Plan Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
            placeholder="e.g., BJS Electrical Set"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-100">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
            rows={4}
            placeholder="Scope details or student instructions"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-100">Upload PDF/Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,image/*"
            className="w-full file:bg-yellow-400 file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-xl file:border-none bg-slate-800 text-white rounded-xl border border-slate-700"
          />
        </div>

        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 flex gap-2 items-center"
        >
          <Upload size={18} /> {uploading ? "Uploading..." : "Upload Plan"}
        </Button>

        {message && <p className="text-green-400 font-semibold">{message}</p>}
      </div>
    </main>
  )
}
