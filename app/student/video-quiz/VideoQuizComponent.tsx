// File: app/student/video-quiz/VideoQuizComponent.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

interface QuizQuestion {
  id: string
  question_text: string
  options: string[]
  correct_option_index: number
}

export default function VideoQuizComponent() {
  const searchParams = useSearchParams()
  const quizId = searchParams.get("quizId")

  const [videoUrl, setVideoUrl] = useState("")
  const [quizTitle, setQuizTitle] = useState("")
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    async function fetchQuiz() {
      if (!quizId) return

      const { data: quiz, error: quizError } = await supabase
        .from("electrical_quizzes")
        .select("*, plan_set_id")
        .eq("id", quizId)
        .single()

      if (quizError || !quiz) return

      setQuizTitle(quiz.title || "Untitled Quiz")

      const { data: planSet } = await supabase
        .from("electrical_plan_sets")
        .select("file_url")
        .eq("id", quiz.plan_set_id)
        .single()

      setVideoUrl(planSet?.file_url || "")

      const { data: questionsData } = await supabase
        .from("electrical_quiz_questions")
        .select("id, question_text, options, correct_option_index")
        .eq("quiz_id", quizId)

      setQuestions(questionsData || [])
    }

    fetchQuiz()
  }, [quizId])

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = async () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option_index) {
        correctCount++
      }
    })
    const finalScore = Math.round((correctCount / questions.length) * 100)
    setScore(finalScore)
    setSubmitted(true)

    await supabase.from("electrical_quiz_results").insert([
      {
        quiz_id: quizId,
        student_id: (await supabase.auth.getUser()).data.user?.id,
        score: finalScore,
      },
    ])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">
            🎓 {quizTitle}
          </h1>
          <p className="text-lg text-blue-200 mt-2 italic">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        {videoUrl && (
          <div className="aspect-video rounded-xl overflow-hidden border-4 border-yellow-500 shadow-lg">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {!submitted && (
          <section className="space-y-8">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-blue-800 bg-opacity-30 border border-blue-400 rounded-2xl p-6 shadow-md"
              >
                <p className="text-xl font-semibold mb-4 text-yellow-300">
                  {idx + 1}. {q.question_text}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="block cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        value={i}
                        checked={answers[q.id] === i}
                        onChange={() => handleAnswer(q.id, i)}
                        className="mr-2 accent-yellow-400"
                      />
                      <span className="text-blue-100">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center">
              <Button
                onClick={handleSubmit}
                className="bg-yellow-400 text-black text-lg px-8 py-3 rounded-xl hover:bg-yellow-300 transition"
              >
                Submit Quiz
              </Button>
            </div>
          </section>
        )}

        {submitted && score !== null && (
          <div className="text-center text-3xl font-bold">
            <p className="mb-2 text-yellow-400">Your Score: {score}%</p>
            <p className={score >= 70 ? "text-green-400" : "text-red-400"}>
              {score >= 70 ? "✅ Passed" : "❌ Failed"}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
