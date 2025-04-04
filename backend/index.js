const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Context Peek API is running" });
});

// Main analyze endpoint
app.post("/analyze", async (req, res) => {
    const { content, url } = req.body;

    if (!content || !url) {
        return res
            .status(400)
            .json({ error: "Missing required parameters: content and url" });
    }

    const prompt = `
You are an AI assistant. Given the following webpage content, provide:
- A 2–3 sentence summary
- Estimated read time
- A credibility score (0–100) based on neutrality, sources, and trustworthiness

URL: ${url}
Content: ${content}

Format your response exactly like this:
Summary: [Your 2-3 sentence summary here]
Read Time: [X min]
Credibility Score: [0-100]
`;

    try {
        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
            },
        });

        const result = await chatSession.sendMessage(prompt);
        const output = result.response.text();

        // Parse the AI response
        const summaryMatch = output.match(/Summary: (.*?)(?=Read Time:|$)/s);
        const readTimeMatch = output.match(
            /Read Time: (.*?)(?=Credibility Score:|$)/s
        );
        const scoreMatch = output.match(/Credibility Score: (\d+)/);

        if (!summaryMatch || !readTimeMatch || !scoreMatch) {
            console.error("Failed to parse AI response:", output);
            return res
                .status(500)
                .json({ error: "Failed to parse AI response" });
        }

        const summary = summaryMatch[1].trim();
        const readTime = readTimeMatch[1].trim();
        const credibilityScore = parseInt(scoreMatch[1]);

        res.json({
            summary,
            readTime,
            credibilityScore,
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Failed to generate preview" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Context Peek backend running at http://localhost:${PORT}`);
});
