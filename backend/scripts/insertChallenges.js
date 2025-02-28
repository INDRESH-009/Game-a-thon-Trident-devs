import mongoose from "mongoose";
import dotenv from "dotenv";
import Challenge from "../models/challenge.model.js"; // Adjust path as needed

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const challenges = [
    // 1
    {
        title: "The Vanishing Vote",
        description: "During an election, 90% of voters turn out, but the winning candidate only gets 30% of the total possible votes. No fraud is detected. What happened, and how should future elections address this?",
        category: "Logic",
        tags: ["Paradox", "Voting Systems", "Analysis"],
        difficulty: "Medium"
    },
    // 2
    {
        title: "The Space Station Sabotage",
        description: "You’re the commander of a space station. A critical system fails, and evidence points to sabotage by one of three crew members. You have 24 hours to decide who’s guilty with limited clues—or risk everyone’s survival. How do you proceed?",
        category: "Decision-Making",
        tags: ["Uncertainty", "Pressure", "Investigation"],
        difficulty: "Hard"
    },
    // 3
    {
        title: "The Dream Machine",
        description: "You invent a device that lets people live their perfect dream life for 8 hours a night, but it reduces their real-world productivity by 20%. Should you sell it, and how do you decide?",
        category: "Ethics",
        tags: ["Innovation", "Well-being", "Trade-offs"],
        difficulty: "Medium"
    },
    // 4
    {
        title: "The Rival’s Gambit",
        description: "Your competitor launches a product identical to yours at half the price. You can sue for patent theft (costly and uncertain), cut your prices (losing profits), or innovate a new feature. What’s your strategy?",
        category: "Business",
        tags: ["Competition", "Strategy", "Risk"],
        difficulty: "Hard"
    },
    // 5
    {
        title: "The Floating Island Puzzle",
        description: "You wake up on an island that floats 10 feet above the sea. Nearby are a rope, a balloon, and a heavy rock. How do you get down safely?",
        category: "Creativity",
        tags: ["Lateral Thinking", "Problem-Solving"],
        difficulty: "Medium"
    },
    // 6
    {
        title: "The Antibiotic Breakthrough",
        description: "Your company develops a miracle antibiotic, but it’s so effective it could lead to overuse and resistance in 10 years. Do you release it now or delay for more research? Why?",
        category: "Ethics",
        tags: ["Healthcare", "Long-term Thinking"],
        difficulty: "Hard"
    },
    // 7
    {
        title: "The Water Crisis",
        description: "A drought hits your city. You can divert water from a neighboring town (angering them), ration it strictly (upsetting locals), or invest in an untested desalination plant. What’s your plan?",
        category: "Strategy",
        tags: ["Resource Management", "Trade-offs"],
        difficulty: "Medium"
    },
    // 8
    {
        title: "The False Confession",
        description: "A suspect confesses to a crime you know they didn’t commit, while the real culprit walks free. Releasing them exposes police errors. What do you do as the detective?",
        category: "Ethics",
        tags: ["Justice", "Moral Dilemma"],
        difficulty: "Hard"
    },
    // 9
    {
        title: "The Infinite Loop Hack",
        description: "You’re a programmer who finds a flaw letting you secretly drain $1 daily from every bank account worldwide. It’s untraceable but unethical. How do you handle this discovery?",
        category: "Ethics",
        tags: ["Cybersecurity", "Morality"],
        difficulty: "Medium"
    },
    // 10
    {
        title: "The Coffee Shop Conundrum",
        description: "Your small coffee shop gets a $50,000 offer from a chain to sell out, or you can keep running it independently with unpredictable profits. How do you decide?",
        category: "Business",
        tags: ["Financial Decision", "Independence"],
        difficulty: "Easy"
    },
    // 11
    {
        title: "The Two Envelope Problem",
        description: "You’re given two envelopes; one has twice as much money as the other. You pick one, see $100, and can switch. Should you switch, and why?",
        category: "Logic",
        tags: ["Probability", "Paradox"],
        difficulty: "Medium"
    },
    // 12
    {
        title: "The Flood Defense",
        description: "A flood threatens two towns. You can save Town A (5,000 people, historic) or Town B (10,000 people, industrial) by redirecting water. Which do you save and why?",
        category: "Decision-Making",
        tags: ["Prioritization", "Consequences"],
        difficulty: "Hard"
    },
    // 13
    {
        title: "The Invisible Innovation",
        description: "Design a product no one’s thought of by imagining what people need but can’t ask for. What’s your idea, and how do you make it real?",
        category: "Creativity",
        tags: ["Innovation", "Out-of-box Thinking"],
        difficulty: "Hard"
    },
    // 14
    {
        title: "The Viral Misstep",
        description: "Your company’s viral ad campaign accidentally offends a cultural group, tanking your stock 20%. Do you apologize, double down, or pivot the message? Explain.",
        category: "Business",
        tags: ["Crisis Management", "Public Relations"],
        difficulty: "Medium"
    },
    // 15
    {
        title: "The Quantum Leap",
        description: "A quantum computer can solve one global problem instantly: climate change, hunger, or disease. Which do you choose, and how do you justify it?",
        category: "Strategy",
        tags: ["Prioritization", "Impact"],
        difficulty: "Hard"
    },
    // 16
    {
        title: "The Silent Alarm",
        description: "A bank’s alarm triggers silently every day at noon, but no theft occurs. After a month, $1 million vanishes. What’s happening?",
        category: "Logic",
        tags: ["Deduction", "Mystery"],
        difficulty: "Hard"
    },
    // 17
    {
        title: "The Arctic Expedition",
        description: "Your team’s stranded in the Arctic with a sled, a solar panel, and a flare. You’re 50 miles from rescue, and a storm’s coming. What’s your survival plan?",
        category: "Strategy",
        tags: ["Survival", "Resourcefulness"],
        difficulty: "Medium"
    },
    // 18
    {
        title: "The Memory Trade",
        description: "A tech lets you erase one bad memory but risks losing a good one too. Do you use it, and how do you weigh the decision?",
        category: "Decision-Making",
        tags: ["Risk", "Personal Choice"],
        difficulty: "Easy"
    },
    // 19
    {
        title: "The Art Heist Twist",
        description: "You’re hired to steal a painting, but mid-heist, you realize it’s a decoy meant to trap you. How do you escape the setup?",
        category: "Creativity",
        tags: ["Strategy", "Deception"],
        difficulty: "Medium"
    },
    // 20
    {
        title: "The Genetic Cure",
        description: "A gene edit can eliminate a deadly disease but might cause unknown mutations in 1% of patients. Do you approve it or wait for perfection?",
        category: "Ethics",
        tags: ["Healthcare", "Risk Assessment"],
        difficulty: "Hard"
    },
    // 21
    {
        title: "The Market Crash Bet",
        description: "A market crash is predicted in 30 days. You can sell all stocks now (safe), short the market (risky), or hold (neutral). What’s your move?",
        category: "Business",
        tags: ["Finance", "Risk Analysis"],
        difficulty: "Medium"
    },
    // 22
    {
        title: "The Poisoned Well",
        description: "A village’s well is poisoned; one person knows the cure but demands payment. Do you pay, force the cure, or find another way?",
        category: "Ethics",
        tags: ["Morality", "Negotiation"],
        difficulty: "Medium"
    },
    // 23
    {
        title: "The Broken Clock Clue",
        description: "A murder scene has a broken clock stuck at 3:00, a spilled drink, and a locked door. How did the killer escape?",
        category: "Logic",
        tags: ["Deduction", "Puzzles"],
        difficulty: "Hard"
    },
    // 24
    {
        title: "The Refugee Raft",
        description: "You’re on a raft with 10 refugees, but it can only hold 8 safely. A storm’s approaching. How do you decide who stays or goes?",
        category: "Decision-Making",
        tags: ["Ethics", "Survival"],
        difficulty: "Hard"
    },
    // 25
    {
        title: "The Billboard Backfire",
        description: "You design a billboard that triples sales but angers a vocal minority. Do you keep it up or take it down? Why?",
        category: "Business",
        tags: ["Marketing", "Ethics"],
        difficulty: "Easy"
    }
];

const insertChallenges = async () => {
    try {
        await Challenge.deleteMany({}); // Optional: Clear existing challenges
        await Challenge.insertMany(challenges);
        console.log("✅ 25 Engaging Challenges added successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error inserting challenges:", error);
        mongoose.connection.close();
    }
};

// Run the insertion
insertChallenges();