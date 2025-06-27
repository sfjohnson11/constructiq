// File: app/student/study-library/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

interface StudyVideo {
  id: string;
  title: string;
  file_url: string;
  quiz_id: string;
}

export default function StudyLibraryPage() {
  const [videos, setVideos] = useState<StudyVideo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from("electrical_plan_sets")
        .select("id, title, file_url, quiz_id");

      if (error) {
        console.error("Error loading videos:", error);
      } else {
        setVideos(data || []);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-yellow-400">
            📚 Study Library
          </h1>
          <p className="text-blue-200 italic mt-2">
            E-Deck ConstructIQ by S F Johnson Enterprises, LLC
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-blue-800 bg-opacity-30 border border-yellow-500 rounded-2xl p-6 shadow-xl hover:shadow-yellow-400 transition cursor-pointer"
              onClick={() =>
                router.push(`/student/video-quiz?quizId=${video.quiz_id}`)
              }
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg border-2 border-blue-400">
                <iframe
                  src={video.file_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-xl font-bold text-yellow-300">
                {video.title}
              </h2>
              <p className="text-sm text-blue-200 mt-1">Click to start quiz</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
