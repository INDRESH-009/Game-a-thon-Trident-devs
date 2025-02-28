import express from "express";
import User from "../models/user.model.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); 
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
