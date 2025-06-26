// File: app/student/video-quiz/page.tsx
import { Suspense } from "react"
import VideoQuizComponent from "./VideoQuizComponent"

export default function StudentVideoQuizPage() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-white">Loading quiz...</div>}>
      <VideoQuizComponent />
    </Suspense>
  )
}
