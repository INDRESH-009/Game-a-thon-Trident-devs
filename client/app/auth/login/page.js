"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.js";
import Link from "next/link";
export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input className="border p-2 w-full mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="border p-2 w-full mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-600 text-white px-4 py-2 w-full">Signup</button>
                <p className="text-sm text-center mt-4">
                    Dont have an account?  
                    <Link href="/auth/signup" className="text-blue-600 font-semibold hover:underline ml-1">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}
