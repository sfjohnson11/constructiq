// File: app/student/library/page.tsx
"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"

interface StudyVideo {
  id: string
  title: string
  description: string
  file_url: string
  quiz_id?: string
}

export default function StudyLibraryPage() {
  const [videos, setVideos] = useState<StudyVideo[]>([])

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase.from("study_videos").select("*")
      if (!error && data) {
        setVideos(data)
      }
    }
    fetchVideos()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-950 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-yellow-400">📚 Study Library</h1>
          <p className="text-blue-200 italic mt-2">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-blue-800 bg-opacity-30 border border-blue-500 p-6 rounded-xl shadow-xl"
            >
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">{video.title}</h2>
              <p className="text-blue-100 mb-4 italic">{video.description}</p>
              <div className="aspect-video rounded overflow-hidden border-2 border-yellow-400">
                <iframe
                  src={video.file_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {video.quiz_id && (
                <div className="text-right mt-4">
                  <Button
                    asChild
                    className="bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-2 rounded"
                  >
                    <a href={`/student/video-quiz?quizId=${video.quiz_id}`}>Take Quiz</a>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
