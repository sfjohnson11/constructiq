// File: app/projects/[id]/plan-set/[planSetId]/estimate.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

interface TakeoffItem {
  id: string
  item_label: string
  description: string
  location: string
  unit: string
}

export default function EstimateSubmissionPage() {
  const { id: projectId, planSetId } = useParams()
  const router = useRouter()

  const [items, setItems] = useState<TakeoffItem[]>([])
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({})
  const [notes, setNotes] = useState<{ [id: string]: string }>({})
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchTakeoffs = async () => {
      const { data, error } = await supabase
        .from("electrical_takeoff_items")
        .select("id, item_label, description, location, unit")
        .eq("plan_set_id", planSetId)

      if (error) console.error(error)
      else setItems(data || [])
    }

    fetchTakeoffs()
  }, [planSetId])

  const handleSubmit = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (!user || userError) {
      setMessage("❌ User not authenticated.")
      return
    }

    const submissions = items.map((item) => ({
      takeoff_item_id: item.id,
      student_id: user.id,
      submitted_quantity: quantities[item.id] || 0,
      notes: notes[item.id] || "",
    }))

    const { error } = await supabase
      .from("electrical_student_estimates")
      .insert(submissions)

    if (error) {
      console.error(error)
      setMessage("❌ Failed to submit estimates.")
    } else {
      setMessage("✅ Estimates submitted successfully.")
      router.push(`/projects/${projectId}`)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-yellow-400">📊 Submit Estimates</h1>

        {items.length === 0 ? (
          <p className="text-slate-400 italic">No takeoff items found for this plan set.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="space-y-6"
          >
            {items.map((item, index) => (
              <div key={item.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <p className="text-yellow-300 font-semibold">{index + 1}. {item.item_label}</p>
                <p className="text-slate-300 text-sm mb-2">{item.description}</p>
                <p className="text-slate-400 text-sm italic mb-2">
                  Location: {item.location} | Unit: {item.unit}
                </p>

                <input
                  type="number"
                  placeholder="Enter your quantity"
                  value={quantities[item.id] || ""}
                  onChange={(e) =>
                    setQuantities({ ...quantities, [item.id]: parseFloat(e.target.value) })
                  }
                  className="w-full mb-2 bg-slate-700 text-white px-4 py-2 rounded"
                />

                <textarea
                  placeholder="Optional notes"
                  value={notes[item.id] || ""}
                  onChange={(e) =>
                    setNotes({ ...notes, [item.id]: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded"
                  rows={2}
                />
              </div>
            ))}

            <Button
              type="submit"
              className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 rounded-xl"
            >
              Submit Estimates
            </Button>

            {message && <p className="text-green-400 font-semibold mt-2">{message}</p>}
          </form>
        )}
      </div>
    </main>
  )
}
