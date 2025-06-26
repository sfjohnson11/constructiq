// File: app/student/video-quiz/VideoQuizComponent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option_index: number;
}

export default function VideoQuizComponent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId");

  const [videoUrl, setVideoUrl] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    async function fetchQuiz() {
      if (!quizId) return;

      const { data: quiz, error: quizError } = await supabase
        .from("electrical_quizzes")
        .select("*, plan_set_id")
        .eq("id", quizId)
        .single();

      if (quizError || !quiz) return;

      setQuizTitle(quiz.title || "Untitled Quiz");

      const { data: planSet } = await supabase
        .from("electrical_plan_sets")
        .select("file_url")
        .eq("id", quiz.plan_set_id)
        .single();

      setVideoUrl(planSet?.file_url || "");

      const { data: questionsData } = await supabase
        .from("electrical_quiz_questions")
        .select("id, question_text, options, correct_option_index")
        .eq("quiz_id", quizId);

      setQuestions(questionsData || []);
    }

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option_index) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);

    await supabase.from("electrical_quiz_results").insert([
      {
        quiz_id: quizId,
        student_id: (await supabase.auth.getUser()).data.user?.id,
        score: finalScore,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-yellow-400">🎓 {quizTitle}</h1>

        {videoUrl && (
          <div className="aspect-video">
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {!submitted && (
          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-slate-800 p-6 rounded-xl">
                <p className="text-lg font-semibold mb-4">
                  {idx + 1}. {q.question_text}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="block">
                      <input
                        type="radio"
                        name={q.id}
                        value={i}
                        checked={answers[q.id] === i}
                        onChange={() => handleAnswer(q.id, i)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <Button onClick={handleSubmit} className="bg-yellow-400 text-black">
              Submit Quiz
            </Button>
          </div>
        )}

        {submitted && score !== null && (
          <div className="text-2xl font-bold">
            Your Score: {score}%
            <p className={score >= 70 ? "text-green-400" : "text-red-400"}>
              {score >= 70 ? "✅ Passed" : "❌ Failed"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
