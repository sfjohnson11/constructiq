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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Login failed. Please check your credentials.");
      setLoading(false);
    } else {
      setError("");
      router.push("/admin/schedule");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white flex items-center justify-center px-4">
      <div className="bg-blue-800 p-8 rounded-xl shadow-xl max-w-md w-full">
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

        <Button onClick={handleLogin} disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}
