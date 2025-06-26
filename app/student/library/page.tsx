"use client"

import { useEffect, useState } from "react"
import supabase from "@/lib/supabaseClient"
import Link from "next/link"

interface StudyVideo {
  id: string
  title: string
  description: string
  video_url: string
  quiz_id?: string
}

export default function StudyLibraryPage() {
  const [videos, setVideos] = useState<StudyVideo[]>([])

  useEffect(() => {
    async function fetchVideos() {
      const { data, error } = await supabase
        .from("study_videos")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setVideos(data)
      }
    }

    fetchVideos()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-950 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">
            📚 Study Library
          </h1>
          <p className="text-lg text-blue-200 mt-2 italic">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-2">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-blue-800 bg-opacity-30 border border-blue-400 rounded-2xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                {video.title}
              </h2>
              <p className="text-blue-100 mb-4">{video.description}</p>
              <div className="aspect-video mb-4 rounded-xl overflow-hidden border-2 border-yellow-500 shadow">
                <iframe
                  src={video.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              {video.quiz_id && (
                <Link
                  href={`/student/video-quiz?quizId=${video.quiz_id}`}
                  className="inline-block mt-2 text-lg text-black bg-yellow-400 px-6 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
                >
                  Take Quiz
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
