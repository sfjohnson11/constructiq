// File: app/student/video-quiz/page.tsx
import { Suspense } from "react";
import VideoQuizComponent from "./VideoQuizComponent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading quiz...</div>}>
      <VideoQuizComponent />
    </Suspense>
  );
}
