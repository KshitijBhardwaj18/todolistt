import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function categorizeTodo(title: string, description: string = "") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Analyze this task and respond with ONLY a valid JSON object (no markdown, no code blocks, just the JSON):

Title: ${title}
Description: ${description || "No description"}

Return format: {"category": "Work|Personal|Shopping|Health|Finance|Other", "priority": "high|medium|low", "suggestedTags": ["tag1", "tag2"]}

Rules:
- Choose the most appropriate category
- Priority should be based on urgency and importance
- Suggest 2-3 relevant tags
- Return ONLY the JSON object, nothing else`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Remove markdown code blocks if present
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini API error:", error);
    // Return default values if AI fails
    return {
      category: "Other",
      priority: "medium",
      suggestedTags: []
    };
  }
}

export async function generateSubtasks(title: string, description: string = "") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate 2-4 actionable subtasks for this main task. Respond with ONLY a valid JSON array (no markdown):

Title: ${title}
Description: ${description || "No description"}

Return format: ["subtask 1", "subtask 2", "subtask 3"]

Each subtask should be:
- Specific and actionable
- A logical step toward completing the main task
- Concise (under 50 characters)

Return ONLY the JSON array, nothing else`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Remove markdown code blocks if present
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini API error:", error);
    return [];
  }
}
