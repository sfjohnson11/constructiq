"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import supabase from "@/lib/supabaseClient"
import { v4 as uuidv4 } from "uuid"

export default function TakeoffCreator() {
  const [projects, setProjects] = useState<any[]>([])
  const [planSets, setPlanSets] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedPlanSet, setSelectedPlanSet] = useState("")
  const [itemLabel, setItemLabel] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [unit, setUnit] = useState("")
  const [quantity, setQuantity] = useState("")
  const [laborHours, setLaborHours] = useState("")
  const [materialCost, setMaterialCost] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("electrical_projects").select()
      if (data) setProjects(data)
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    const fetchPlanSets = async () => {
      if (!selectedProject) return
      const { data } = await supabase
        .from("electrical_plan_sets")
        .select()
        .eq("project_id", selectedProject)
      if (data) setPlanSets(data)
    }
    fetchPlanSets()
  }, [selectedProject])

  const handleSubmit = async () => {
    if (!selectedProject || !selectedPlanSet || !itemLabel || !description || !unit || !quantity || !laborHours || !materialCost) {
      alert("Please fill out all required fields.")
      return
    }

    const { error } = await supabase.from("electrical_takeoff_items").insert([{
      project_id: selectedProject,
      plan_set_id: selectedPlanSet,
      item_label: itemLabel,
      description,
      location,
      unit,
      quantity: parseFloat(quantity),
      labor_hours: parseFloat(laborHours),
      material_cost: parseFloat(materialCost),
    }])

    if (error) {
      setMessage("❌ Error saving takeoff item.")
      console.error(error)
    } else {
      setMessage("✅ Takeoff item saved.")
      setItemLabel("")
      setDescription("")
      setLocation("")
      setUnit("")
      setQuantity("")
      setLaborHours("")
      setMaterialCost("")
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-400">🧮 Create Electrical Takeoff Item</h1>

        <div>
          <label>Project</label>
          <select
            className="w-full bg-slate-800 text-white p-2 rounded-xl"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">-- Select a Project --</option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>{proj.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Plan Set</label>
          <select
            className="w-full bg-slate-800 text-white p-2 rounded-xl"
            value={selectedPlanSet}
            onChange={(e) => setSelectedPlanSet(e.target.value)}
          >
            <option value="">-- Select Plan Set --</option>
            {planSets.map((ps) => (
              <option key={ps.id} value={ps.id}>{ps.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="itemLabel">Item Label</Label>
          <Input id="itemLabel" value={itemLabel} onChange={(e) => setItemLabel(e.target.value)} placeholder="e.g., Branch Circuit A1" />

          <Label htmlFor="description">Description</Label>
          <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Full scope description" />

          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Optional area or room" />

          <Label htmlFor="unit">Unit</Label>
          <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., EA, LF, FT" />

          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter numeric quantity" />

          <Label htmlFor="laborHours">Labor Hours</Label>
          <Input id="laborHours" type="number" value={laborHours} onChange={(e) => setLaborHours(e.target.value)} placeholder="Enter labor hours" />

          <Label htmlFor="materialCost">Material Cost</Label>
          <Input id="materialCost" type="number" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)} placeholder="Enter cost" />
        </div>

        <Button onClick={handleSubmit} className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:scale-105">Save Takeoff</Button>

        {message && <p className="mt-4 font-semibold text-green-400">{message}</p>}
      </div>
    </main>
  )
}
