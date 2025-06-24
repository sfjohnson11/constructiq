// File: app/projects/[id]/plan-set/[planSetId]/add-quiz.tsx
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabaseClient"

export default function AddQuizPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const planSetId = params.planSetId as string

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    if (!title || !description) {
      setMessage("❌ Title and description are required.")
      return
    }

    const { error } = await supabase.from("electrical_quizzes").insert([
      {
        project_id: projectId,
        plan_set_id: planSetId,
        title,
        description,
      },
    ])

    if (error) {
      setMessage("❌ Failed to create quiz.")
      console.error(error)
    } else {
      setMessage("✅ Quiz created successfully.")
      router.push(`/projects/${projectId}/plan-set/${planSetId}/manage`)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">📝 Create Quiz</h1>

        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <textarea
          placeholder="Quiz Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
          rows={4}
        />

        <Button onClick={handleSubmit} className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 rounded-xl">
          Save Quiz
        </Button>

        {message && <p className="text-green-400 font-semibold mt-2">{message}</p>}
      </div>
    </main>
  )
}
