"use server"
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@clerk/nextjs/server";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export const generateAIInsight = async (industry) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "HIGH"||"MEDIUM"||"LOW",
      "topSkills": ["skill1", "skill2", ],
      "marketOutlook": "POSITIVE"||"NEUTRAL"||"NEGATIVE"
      "keyTrends": ["trend1", "trend2"],
      "recommendationSkills": ["skill1", "skill2"]
    }
    
    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
    Include at least 5 common roles for salary ranges.
    Growth rate should be a percentage.
  `;

  try {
    const result = await model.generateContent([prompt]); // Fix API call
    const text = result.response.text();

    const cleanText = text.replace(/```(?:json)?\n?/g, "").trim(); // Fix JSON cleanup
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Error generating AI insight:", error);
    throw new Error("Failed to generate industry insights.");
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Fetch the user from the database using the Clerk User ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { industryInsight: true }, // Ensure related insights are loaded
  });

  if (!user) throw new Error("User not found");

  if (!user.industryInsight) {
    const insights = await generateAIInsight(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: user.id, // Ensure correct relation
      },
    });

    return industryInsight;
  }

  return user.industryInsight; // Fix missing return
}
