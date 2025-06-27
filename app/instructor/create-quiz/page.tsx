// File: app/instructor/create-quiz/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CreateQuizPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [planSets, setPlanSets] = useState<{ id: string; name: string }[]>([])
  const [selectedPlanSet, setSelectedPlanSet] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchPlanSets() {
      const { data, error } = await supabase
        .from("electrical_plan_sets")
        .select("id, name")
        .order("created_at", { ascending: false })

      setPlanSets(data || [])
    }

    fetchPlanSets()
  }, [])

  const handleCreateQuiz = async () => {
    if (!title || !selectedPlanSet) return
    setSaving(true)

    const { data, error } = await supabase
      .from("electrical_quizzes")
      .insert([
        {
          title,
          plan_set_id: selectedPlanSet,
        },
      ])
      .select()
      .single()

    setSaving(false)

    if (error) {
      toast({
        toast({
  title: "Quiz Creation Failed",
  description: "Something went wrong while saving your quiz. Please try again.",
})
      })
      return
    }

    router.push(`/instructor/edit-quiz?quizId=${data.id}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 to-slate-950 text-white py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400">🛠️ Create New Quiz</h1>
          <p className="text-blue-300 italic">E-Deck ConstructIQ by S F Johnson Enterprises, LLC</p>
        </header>

        <div className="space-y-6">
          <div>
            <label className="block text-blue-200 mb-2">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-blue-900 border border-blue-500 text-white"
              placeholder="Enter quiz title"
            />
          </div>

          <div>
            <label className="block text-blue-200 mb-2">Select Plan Set</label>
            <select
              value={selectedPlanSet}
              onChange={(e) => setSelectedPlanSet(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-blue-900 border border-blue-500 text-white"
            >
              <option value="">-- Choose a video set --</option>
              {planSets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleCreateQuiz}
            disabled={saving}
            className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            {saving ? "Saving..." : "Create Quiz"}
          </Button>
        </div>
      </div>
    </main>
  )
}
