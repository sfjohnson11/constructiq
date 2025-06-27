// Page: app/admin/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("info@sfjohnsonconsulting.com");
  const [password, setPassword] = useState("e-deck07");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    } else {
      setError("");
      router.push("/admin/schedule");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] to-[#001F3F] text-white flex items-center justify-center px-6">
      <section className="bg-blue-800 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">Instructor Login</h1>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-xs text-slate-400 mt-6">
          © 2025 S F Johnson Enterprises, LLC
        </p>
      </section>
    </main>
  );
}
