"use client";
import { useState, useEffect } from "react";

export default function DailyChallenge() {
    const [challenge, setChallenge] = useState(null);
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Fetch today's challenge from the backend (Runs only once)
    useEffect(() => {
        fetch("http://localhost:5001/api/challenges/daily")
            .then(res => res.json())
            .then(data => {
                setChallenge(data);
                setLoading(false);
            })
            .catch(err => console.error("Error fetching challenge:", err));
    }, []);

    // Handle Answer Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!answer.trim()) {
            alert("Please write your response before submitting.");
            return;
        }
    
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:5001/api/challenges/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ challengeId: challenge?._id, answer })
            });
    
            if (!res.ok) throw new Error("Failed to submit answer");
            
            const data = await res.json();
            setFeedback(data.analysis || {});
        } catch (error) {
            console.error("Error submitting answer:", error);
            alert("Failed to process your response. Please try again.");
        }
        setSubmitting(false);
    };
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            {loading ? (
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            ) : (
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
                    {/* Challenge Header */}
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">{challenge?.title}</h2>
                    <p className="text-gray-600 mb-6">{challenge?.description}</p>
                    
                    {/* Answer Input */}
                    <textarea
                        className="border w-full p-3 h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your response..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                    {/* Submit Button */}
                    <button
                        className={`bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 w-full transition ${
                            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                        }`}
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? "Submitting..." : "Submit Answer"}
                    </button>

                    {/* Feedback Section */}
                    {feedback && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
                            <h3 className="text-lg font-semibold text-gray-800">AI Feedback</h3>
                            <p className="text-gray-700 italic">{feedback?.decision_summary || "No summary available."}</p>

                            {/* Score Breakdown */}
                            {feedback?.score && (
                                <div className="mt-4">
                                    <p className="font-semibold text-gray-800">
                                        <span className="text-blue-600">Score:</span> {feedback.score?.total || 0}/100
                                    </p>
                                    {feedback.score.breakdown && (
                                        <table className="w-full mt-2 border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                                                    <th className="border border-gray-300 px-4 py-2">Score</th>
                                                    <th className="border border-gray-300 px-4 py-2">Feedback</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(feedback.score.breakdown).map(([key, value]) => (
                                                    <tr key={key} className="border-b border-gray-200">
                                                        <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700 capitalize">{key.replace(/_/g, " ")}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{value.score} / {value.max}</td>
                                                        <td className="border border-gray-300 px-4 py-2 text-gray-600">{value.feedback}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            )}

                            {/* Cognitive Biases Identified */}
                            {feedback?.cognitive_biases?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold text-gray-800">Identified Cognitive Biases:</h4>
                                    <ul className="list-disc pl-4 text-gray-700">
                                        {feedback.cognitive_biases.map((bias, index) => (
                                            <li key={index} className="mt-1">
                                                <strong className="text-red-600">{bias.name}:</strong> {bias.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Alternative Perspective */}
                            {feedback?.alternative_perspective && (
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold text-gray-800">Alternative Perspective:</h4>
                                    <p className="text-gray-700">{feedback.alternative_perspective}</p>
                                </div>
                            )}

                            {/* Thinker Comparison */}
                            {feedback?.thinker_comparison && (
                                <div className="mt-4">
                                    <h4 className="text-md font-semibold text-gray-800">Thinker Comparison:</h4>
                                    <p className="text-gray-700">
                                        <strong>Elon Musk:</strong> {feedback.thinker_comparison.elon_musk}
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Charlie Munger:</strong> {feedback.thinker_comparison.charlie_munger}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
