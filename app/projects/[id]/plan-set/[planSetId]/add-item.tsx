// File: app/projects/[id]/plan-set/[planSetId]/add-item.tsx
"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabaseClient"

export default function AddTakeoffItem() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const planSetId = params.planSetId as string

  const [itemLabel, setItemLabel] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [unit, setUnit] = useState("")
  const [quantity, setQuantity] = useState<number>(0)
  const [materialCost, setMaterialCost] = useState<number>(0)
  const [laborHours, setLaborHours] = useState<number>(0)
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    const { error } = await supabase.from("electrical_takeoff_items").insert([
      {
        project_id: projectId,
        plan_set_id: planSetId,
        item_label: itemLabel,
        description,
        location,
        unit,
        quantity,
        material_cost: materialCost,
        labor_hours: laborHours,
      },
    ])

    if (error) {
      setMessage("❌ Failed to add item.")
      console.error(error)
    } else {
      setMessage("✅ Takeoff item added successfully.")
      router.push(`/projects/${projectId}/plan-set/${planSetId}/manage`)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">➕ Add Takeoff Item</h1>

        <input
          type="text"
          placeholder="Item Label"
          value={itemLabel}
          onChange={(e) => setItemLabel(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
          rows={3}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <input
          type="text"
          placeholder="Unit (e.g., EA, LF)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <input
          type="number"
          placeholder="Material Cost"
          value={materialCost}
          onChange={(e) => setMaterialCost(parseFloat(e.target.value))}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <input
          type="number"
          placeholder="Labor Hours"
          value={laborHours}
          onChange={(e) => setLaborHours(parseFloat(e.target.value))}
          className="w-full bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700"
        />

        <Button onClick={handleSubmit} className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 rounded-xl">
          Save Item
        </Button>

        {message && <p className="text-green-400 font-semibold mt-2">{message}</p>}
      </div>
    </main>
  )
}
