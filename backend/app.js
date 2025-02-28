import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.route.js';
import userRoutes from "./routes/user.route.js";

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to ThinkMaster API");
});

app.use("/api/auth", authRoutes);
app.use("/api/user",userRoutes);

export default app;
