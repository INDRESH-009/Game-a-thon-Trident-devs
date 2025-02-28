"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.js";
import Link from "next/link";

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
        <div className="h-screen flex justify-center items-center bg-gray-100">
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
    );
}
