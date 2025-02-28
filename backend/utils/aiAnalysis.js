import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize OpenAI client with GPT-4
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to analyze user response dynamically
export async function analyzeResponse(userAnswer, scenario) { // ✅ Use dynamic scenario
    try {
        console.log("🔹 Sending user answer to AI:", userAnswer);
        
        // Call OpenAI API with dynamic prompt
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // ✅ Using GPT-4 model
            messages: [
                {
                    role: "system",
                    content: `You are an AI expert in critical thinking, cognitive science, and decision-making analysis.
                    Your goal is to provide a **detailed analysis** of a user's response based on scientific frameworks 
                    such as Bloom’s Taxonomy, Systems Thinking, and Kahneman’s cognitive biases.

                    Ensure your response is a **valid JSON object** with no extra text outside the JSON.`
                },
                {
                    role: "user",
                    content: `
                    **Scenario:** "${scenario}" 
                    **User's Response:** "${userAnswer}"

                    **Instructions:**
                    - Provide a detailed breakdown based on:
                        1️⃣ **Logical Reasoning (25 pts)**
                        2️⃣ **Depth of Analysis (20 pts)**
                        3️⃣ **Consideration of Consequences (20 pts)**
                        4️⃣ **Awareness of Biases (15 pts)**
                        5️⃣ **Creativity & Alternatives (10 pts)**
                        6️⃣ **Ethical Reasoning (5 pts)**
                        7️⃣ **Clarity & Communication (5 pts)**
                    
                    - **Total Score out of 100**
                    - Identify **cognitive biases** present in the response.
                    - Suggest **an alternative approach**.
                    - Compare the response to **Elon Musk (First Principles Thinking)** and **Charlie Munger (Second Order Thinking)**.
                    
                    **Return only JSON:**
                    {
                      "scenario": "${scenario}",
                      "user_response": "${userAnswer}",
                      "analysis": {
                        "decision_summary": "string",
                        "score": { "total": number, "breakdown": { "logical_reasoning": { "score": number, "max": 25, "feedback": "string" }, ... } },
                        "cognitive_biases": [{ "name": "string", "description": "string" }],
                        "alternative_perspective": "string",
                        "thinker_comparison": { "elon_musk": "string", "charlie_munger": "string" }
                      }
                    }`
                }
            ],
            max_tokens: 800,
            temperature: 0.7
        });

        const rawResponse = response.choices[0]?.message?.content;
        console.log("✅ AI Response:", rawResponse);

        
    
        return JSON.parse(rawResponse);

    } catch (error) {
        console.error("❌ OpenAI API Error:", error);
        return {
            scenario,
            user_response: userAnswer,
            analysis: {
                decision_summary: "Analysis unavailable due to an error.",
                score: { total: 0, breakdown: {} },
                cognitive_biases: [],
                alternative_perspective: "Try refining your response for better insights.",
                thinker_comparison: {}
            },
            error: `AI Error: ${error.message}`
        };
    }
}
