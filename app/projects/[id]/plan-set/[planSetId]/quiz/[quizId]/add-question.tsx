// File: app/projects/[id]/plan-set/[planSetId]/quiz/[quizId]/add-question.tsx
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabaseClient"

export default function AddQuestionPage() {
  const router = useRouter()
  const params = useParams()
  const quizId = params.quizId as string
  const projectId = params.id as string
  const planSetId = params.planSetId as string

  const [question, setQuestion] = useState("")
  const [choices, setChoices] = useState(["", "", "", ""])
  const [correctIndex, setCorrectIndex] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  const handleChoiceChange = (index: number, value: string) => {
    const updated = [...choices]
    updated[index] = value
    setChoices(updated)
  }

  const handleSubmit = async () => {
    if (!question || choices.some((c) => !c) || correctIndex === null) {
      setMessage("❌ Please complete all fields and select the correct answer.")
      return
    }

    const { error } = await supabase.from("electrical_quiz_questions").insert([
      {
        quiz_id: quizId,
        question,
        choices,
        correct_index: correctIndex,
      },
    ])

    if (error) {
      setMessage("❌ Failed to add question.")
      console.error(error)
    } else {
      setMessage("✅ Question added successfully.")
      setQuestion("")
      setChoices(["", "", "", ""])
      setCorrectIndex(null)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">➕ Add Quiz Question</h1>

        <textarea
          placeholder="Enter your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
          rows={3}
        />

        {choices.map((choice, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <input
              type="radio"
              name="correct"
              checked={correctIndex === idx}
              onChange={() => setCorrectIndex(idx)}
            />
            <input
              type="text"
              placeholder={`Choice ${idx + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(idx, e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
            />
          </div>
        ))}

        <Button onClick={handleSubmit} className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 rounded-xl">
          Save Question
        </Button>

        {message && <p className="text-green-400 font-semibold mt-2">{message}</p>}
      </div>
    </main>
  )
}
