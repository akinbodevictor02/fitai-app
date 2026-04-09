export async function POST(req: Request) {
  const { prompt } = await req.json();

  return Response.json({
    result: `
AI Fitness Plan

Based on: ${prompt}

Day 1: Push-ups, Squats
Day 2: Cardio + Core
Day 3: Rest

Repeat weekly 
    `,
  });
}