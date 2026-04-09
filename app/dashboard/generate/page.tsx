"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function GeneratePlan() {
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");

  const handleGenerate = () => {
    if (!age || !goal) {
      alert("Fill all fields");
      return;
    }

    const newPlan = `
Workout Plan for ${goal} (Age: ${age})

Day 1: Push-ups, Squats
Day 2: Running, Plank
Day 3: Rest
    `;

    setPlan(newPlan);

    const existing = JSON.parse(localStorage.getItem("plans") || "[]");

    localStorage.setItem(
      "plans",
      JSON.stringify([
        ...existing,
        {
          id: Date.now(),
          age,
          goal,
          plan: newPlan,
          date: new Date().toLocaleString(),
        },
      ])
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Generate Plan
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input w-full"
          />

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="input w-full"
          >
            <option value="">Select goal</option>
            <option value="Lose Weight">Lose weight</option>
            <option value="Gain Muscle">Gain muscle</option>
          </select>

          <button onClick={handleGenerate} className="btn w-full py-3">
            Generate
          </button>
        </div>

        {plan && (
          <div className="mt-6 card p-4 text-sm whitespace-pre-line">
            {plan}
          </div>
        )}
      </motion.div>
    </main>
  );
}