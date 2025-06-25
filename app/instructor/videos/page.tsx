// File: app/instructor/videos/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import supabase from "../../../lib/supabaseClient"
import { Upload } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export default function UploadVideoQuizPage() {
  const [projects, setProjects] = useState([])
  const [planSets, setPlanSets] = useState([])
  const [projectId, setProjectId] = useState("")
  const [planSetId, setPlanSetId] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [questions, setQuestions] = useState([""])
  const [message, setMessage] = useState("")

  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase.from("electrical_projects").select("id, name")
      if (!error) setProjects(data)
    }
    loadProjects()
  }, [])

  useEffect(() => {
    const loadPlanSets = async () => {
      if (!projectId) return
      const { data, error } = await supabase
        .from("electrical_plan_sets")
        .select("id, title")
        .eq("project_id", projectId)
      if (!error) setPlanSets(data)
    }
    loadPlanSets()
  }, [projectId])

  const handleSubmit = async () => {
    if (!projectId || !planSetId || !videoUrl || !quizTitle) {
      alert("All fields are required.")
      return
    }

    const { data: quizData, error } = await supabase.from("electrical_quizzes").insert([
      {
        project_id: projectId,
        plan_set_id: planSetId,
        title: quizTitle,
        description: quizDescription,
      }
    ]).select()

    if (error || !quizData?.[0]) {
      setMessage("Failed to save quiz.")
      return
    }

    const quizId = quizData[0].id

    for (const question of questions) {
      if (question.trim()) {
        await supabase.from("electrical_quiz_questions").insert([
          { quiz_id: quizId, question_text: question }
        ])
      }
    }

    setMessage("✅ Video + quiz saved!")
    setQuizTitle("")
    setQuizDescription("")
    setQuestions([""])
    setVideoUrl("")
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-yellow-400">🎥 Upload Instructional Video + Quiz</h1>

        <div className="space-y-4">
          <label className="text-blue-100 text-sm font-medium">Select Project</label>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          >
            <option value="">-- Select Project --</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-blue-100 text-sm font-medium">Select Plan Set</label>
          <select
            value={planSetId}
            onChange={(e) => setPlanSetId(e.target.value)}
            className="w-full bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          >
            <option value="">-- Select Plan Set --</option>
            {planSets.map((ps) => (
              <option key={ps.id} value={ps.id}>{ps.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-blue-100 text-sm font-medium">Video URL</label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="e.g., https://youtu.be/..."
            className="w-full bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          />
        </div>

        <div className="space-y-4">
          <label className="text-blue-100 text-sm font-medium">Quiz Title</label>
          <input
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          />

          <label className="text-blue-100 text-sm font-medium">Description</label>
          <textarea
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="w-full bg-slate-800 px-4 py-2 rounded-xl border border-slate-700"
          />
        </div>

        <div className="space-y-4">
          <label className="text-blue-100 text-sm font-medium">Quiz Questions</label>
          {questions.map((q, i) => (
            <input
              key={i}
              value={q}
              onChange={(e) => {
                const newQuestions = [...questions]
                newQuestions[i] = e.target.value
                setQuestions(newQuestions)
              }}
              className="w-full bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 mb-2"
              placeholder={`Question ${i + 1}`}
            />
          ))}
          <Button
            className="bg-blue-700 hover:bg-blue-600 text-white rounded-xl"
            onClick={() => setQuestions([...questions, ""])}
          >Add Question</Button>
        </div>

        <Button onClick={handleSubmit} className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 flex gap-2 items-center">
          <Upload size={18} /> Save Video + Quiz
        </Button>

        {message && <p className="text-green-400 font-semibold mt-4">{message}</p>}
      </div>
    </main>
  )
}
