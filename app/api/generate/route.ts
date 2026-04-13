import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { age, goal } = await req.json();

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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const plan = response.choices[0].message.content;

    return Response.json({ result: plan });
  } catch (error) {
    return Response.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}