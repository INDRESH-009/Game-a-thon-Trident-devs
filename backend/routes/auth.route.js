import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const totalUsers = await User.countDocuments();
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            rank: totalUsers + 1  // Assign rank dynamically
        });

        res.status(201).json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/login", async (req, res) => {
    try {
        console.log("🔹 Login Attempt Received:", req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("User Not Found:", email);
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(" Invalid Password for:", email);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log(" User Authenticated:", user.email);

        res.json({ token, user });
    } catch (err) {
        console.error(" Login Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});


router.post("/logout", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ message: `User ${user.name} logged out successfully` });
    } catch (error) {
        console.error(" Logout Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
