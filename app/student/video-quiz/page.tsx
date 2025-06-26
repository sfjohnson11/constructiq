// File: app/student/video-quiz/page.tsx
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

export default function StudentVideoQuizPage() {
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
    const finalScore = Math.round((correctCoun
