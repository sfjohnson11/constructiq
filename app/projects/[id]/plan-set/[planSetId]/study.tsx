// File: app/projects/[id]/plan-set/[planSetId]/study.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

interface QuizQuestion {
  id: string
  question: string
  choices: string[]
  correct_answer: number
}

export default function StudyPlanSetPage() {
  const { id: projectId, planSetId } = useParams()
  const [videoUrl, setVideoUrl] = useState<string>("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      const { data: planSet } = await supabase
        .from("electrical_plan_sets")
        .select("file_url")
        .eq("id", planSetId)
        .single()

      if (planSet) setVideoUrl(planSet.file_url)

      const { data: quiz } = await supabase
        .from("electrical_quiz_questions")
        .select("id, question, choices, correct_answer")
        .eq("plan_set_id", planSetId)

      setQuestions(quiz || [])
    }

    if (planSetId) fetchContent()
  }, [planSetId])

  const handleSubmit = async () => {
  let correct = 0
  questions.forEach((q) => {
    if (answers[q.id] === q.correct_answer) correct++
  })
  setScore(correct)
  setSubmitted(true)

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()
  if (userError || !user) return

  const { error } = await supabase.from("electrical_quiz_results").insert([
    {
      quiz_id: questions[0]?.id, // assumes all questions belong to one quiz
      student_id: user.id,
      score: correct,
    },
  ])

  if (error) {
    console.error("❌ Failed to save quiz result:", error)
  } else {
    console.log("✅ Quiz result saved")
  }
}


  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-yellow-400">🎓 Study & Quiz</h1>

        {videoUrl ? (
          <video controls className="w-full rounded-xl">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="text-slate-400 italic">No video available for this plan set.</p>
        )}

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-300">📝 Quiz</h2>

          {questions.length === 0 ? (
            <p className="text-slate-400 italic">No quiz questions yet.</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="space-y-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-2">
                  <p className="font-semibold text-white">{idx + 1}. {q.question}</p>
                  {q.choices.map((choice, cIdx) => (
                    <label key={cIdx} className="block text-slate-300">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={cIdx}
                        checked={answers[q.id] === cIdx}
                        onChange={() => setAnswers({ ...answers, [q.id]: cIdx })}
                        className="mr-2"
                      />
                      {choice}
                    </label>
                  ))}
                </div>
              ))}
              <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 rounded-xl">
                Submit Quiz
              </Button>
              {submitted && (
                <p className="text-lg font-semibold text-green-400 mt-4">
                  ✅ Your Score: {score} / {questions.length}
                </p>
              )}
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
