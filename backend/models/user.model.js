import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    xp: { type: Number, default: 0 }, 
    streak: { type: Number, default: 0 },
    badges: [{ type: String }], 
    completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
    rank: { type: Number, default: 0 }, // Assigned dynamically on signup
},{ timestamps: true });
export default mongoose.model("User",userSchema);