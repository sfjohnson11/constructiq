import { Suspense } from "react"
import VideoQuizComponent from "./VideoQuizComponent"

export default function StudentVideoQuizPageWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Loading quiz...</div>}>
      <VideoQuizComponent />
    </Suspense>
  )
}
