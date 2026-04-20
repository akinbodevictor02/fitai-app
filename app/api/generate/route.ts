import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { age, goal } = await req.json();

    const prompt = `
Create a simple 7-day workout plan.

Age: ${age}
Goal: ${goal}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const plan = response?.choices?.[0]?.message?.content;

    return Response.json({
      plan: plan || "Default plan fallback",
    });

  } catch (error: any) {
    console.error("ERROR:", error);

    // ✅ HANDLE OPENAI FAILURE HERE
    if (error?.status === 429) {
      return Response.json({
        plan: `⚠️ AI temporarily unavailable.

Here’s a sample plan:

Day 1: Full body workout  
Day 2: Cardio  
Day 3: Rest  
Day 4: Upper body  
Day 5: Lower body  
Day 6: Cardio  
Day 7: Rest`,
      });
    }

    return Response.json({
      plan: "Something went wrong. Try again later.",
    });
  }
}