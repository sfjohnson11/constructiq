// File: app/admin/login/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    setError("")
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Login failed. Please check your credentials.")
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-950 text-white">
      <div className="bg-blue-800 bg-opacity-70 p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Admin Login
        </h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6"
        />
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <Button
          onClick={handleLogin}
          className="bg-yellow-400 text-black w-full py-2 text-lg hover:bg-yellow-300"
        >
          Sign In
        </Button>
      </div>
    </main>
  )
}
