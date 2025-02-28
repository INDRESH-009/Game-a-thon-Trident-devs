"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <main className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to ThinkMaster AI</h1>
            <p className="text-gray-600 mb-6">Sharpen your critical thinking & problem-solving skills!</p>
            <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md"
                onClick={() => router.push("/auth/signup")}
            >
                Get Started
            </button>
            <button className="bg-blue-600 mt-10 text-white px-6 py-2 rounded-md"
                onClick={() => router.push("/auth/login")}>
                  Login
                </button>
        </main>
    );
}
