import OpenAI from "openai";

export const runtime = "nodejs"; // ✅ REQUIRED

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { age, goal } = await req.json();

    if (!age || !goal) {
      return Response.json(
        { error: "Missing age or goal" },
        { status: 400 }
      );
    }

    const prompt = `
Create a simple 7-day workout plan.

User details:
- Age: ${age}
- Goal: ${goal}

Make it:
- Beginner friendly
- Day-by-day structured
- Clear and practical
- Short but useful
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // ✅ safe model
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("OPENAI RESPONSE:", response);

    const plan = response?.choices?.[0]?.message?.content;

    if (!plan) {
      return Response.json(
        { error: "AI returned empty response" },
        { status: 500 }
      );
    }

    return Response.json({ plan });

  } catch (error: any) {
  if (error?.status === 429) {
    return Response.json({
      plan: "⚠️ AI temporarily unavailable. Here's a sample plan:\n\nDay 1: Upper body\nDay 2: Cardio\nDay 3: Rest\n..."
    });
  }

  return Response.json(
    { error: error.message || "OpenAI failed" },
    { status: 500 }
  );
}
}