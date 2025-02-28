"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.js";
import Link from "next/link";
import ParticleBackground from "@/app/comps/particle-background.js";

export default function Signup() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900">
      <ParticleBackground />
      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <input 
            className="border p-2 w-full mb-3 rounded" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            className="border p-2 w-full mb-3 rounded" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className="border p-2 w-full mb-3 rounded" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?
            <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline ml-1">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
