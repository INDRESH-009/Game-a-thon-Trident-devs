import express from "express";
import Challenge from "../models/challenge.model.js";
import { analyzeResponse } from "../utils/aiAnalysis.js"; 


const router = express.Router();

router.get("/daily", async (req, res) => {
    try {
        const challenge = await Challenge.aggregate([{ $sample: { size: 1 } }]);
        res.json(challenge[0]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching daily challenge" });
    }
});

// API: Submit User Answer for AI Analysis
router.post("/submit", async (req, res) => {
    try {
        const { challengeId, answer } = req.body;

        // Fetch the actual challenge question from MongoDB
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return res.status(404).json({ error: "Challenge not found" });

        console.log("🔹 Sending Answer to AI Analysis...");
        
        // ✅ Send actual challenge question to AI function
        const analysis = await analyzeResponse(answer, challenge.description);

        res.json(analysis);
    } catch (error) {
        console.error("❌ Error processing answer:", error);
        res.status(500).json({ error: "Server error. Please try again." });
    }
});

export default router;
