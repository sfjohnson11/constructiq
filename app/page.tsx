import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-500 p-6 text-white">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg text-center">
        ConstructIQ
      </h1>
      <p className="text-xl mb-8 max-w-md text-center text-white/90">
        Welcome to ConstructIQ, the modern platform for construction project intelligence.
      </p>
      {/* Call-to-action button linking to the Projects page */}
      <Button href="/projects">
        View Projects
      </Button>
    </main>
  );
}
