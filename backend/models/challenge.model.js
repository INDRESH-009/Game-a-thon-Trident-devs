import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ["Logic", "Strategy", "Creativity", "Ethics", "Business", "Decision-Making"] },
    tags: [{ type: String }],
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Challenge", challengeSchema);
