// File: app/student/video-quiz/page.tsx
"use client"

import { Suspense } from "react"
import VideoQuizComponent from "./VideoQuizComponent"

export default function StudentVideoQuizPage() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Loading Quiz...</div>}>
      <VideoQuizComponent />
    </Suspense>
  )
}

