// File: app/projects/[id]/plan-set/[planSetId]/manage.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import supabase from "@/lib/supabaseClient"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

interface TakeoffItem {
  id: string
  item_label: string
  description: string
  location: string
  quantity: number
  unit: string
}

export default function ManagePlanSetPage() {
  const { planSetId } = useParams()
  const [takeoffs, setTakeoffs] = useState<TakeoffItem[]>([])
  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: planSet } = await supabase
        .from("electrical_plan_sets")
        .select("title")
        .eq("id", planSetId)
        .single()

      if (planSet) setTitle(planSet.title)

      const { data: takeoffItems } = await supabase
        .from("electrical_takeoff_items")
        .select("id, item_label, description, location, quantity, unit")
        .eq("plan_set_id", planSetId)

      setTakeoffs(takeoffItems || [])
      setLoading(false)
    }

    if (planSetId) fetchData()
  }, [planSetId])

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold text-yellow-400">📋 Manage Plan Set</h1>
          <p className="text-slate-300">Plan Set: <span className="font-semibold">{title}</span></p>
        </header>

        <div className="flex gap-4">
          <Link href={`/projects/${planSetId}/plan-set/${planSetId}/add-takeoff`}>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300 flex items-center gap-2">
              <PlusCircle size={18} /> Add Takeoff Item
            </Button>
          </Link>

          <Link href={`/projects/${planSetId}/plan-set/${planSetId}/add-quiz`}>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2">
              <PlusCircle size={18} /> Create Quiz
            </Button>
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">📐 Takeoff Items</h2>

          {loading ? (
            <p className="text-slate-400">Loading...</p>
          ) : takeoffs.length === 0 ? (
            <p className="text-slate-400 italic">No takeoff items added yet.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4">
              {takeoffs.map((item) => (
                <li
                  key={item.id}
                  className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow"
                >
                  <div className="text-yellow-200 font-semibold">{item.item_label}</div>
                  <div className="text-slate-300 text-sm mb-1">{item.description}</div>
                  <div className="text-slate-400 text-xs">
                    {item.quantity} {item.unit} @ {item.location}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
