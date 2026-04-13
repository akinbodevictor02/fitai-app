"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function Dashboard() {
  const [weightHistory, setWeightHistory] = useState<any[]>([]);
  const [weightInput, setWeightInput] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [weeklyInsight, setWeeklyInsight] = useState("");

  const [weightLost, setWeightLost] = useState(0);
  const [averageWeight, setAverageWeight] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  // ✅ REAL-TIME + AUTH SAFE
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const q = query(
        collection(db, "weights"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "asc")
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const weights = snapshot.docs.map((doc) => {
          const data: any = doc.data();
          return {
            date: data.createdAt?.toDate
              ? data.createdAt.toDate().toISOString().split("T")[0]
              : "N/A",
            weight: data.weight,
          };
        });

        setWeightHistory(weights);
        calculateAnalytics(weights);
        generateWeeklyInsight(weights);
      });

      return () => unsubscribeSnapshot();
    });

    const savedGoal = localStorage.getItem("goalWeight") || "";
    const premium = localStorage.getItem("isPremium") === "true";

    setGoalWeight(savedGoal);
    setIsPremium(premium);

    return () => unsubscribeAuth();
  }, []);

  const calculateAnalytics = (data: any[]) => {
    if (data.length === 0) return;

    const first = data[0].weight;
    const last = data[data.length - 1].weight;
    setWeightLost(first - last);

    const sum = data.reduce((acc, item) => acc + item.weight, 0);
    setAverageWeight(sum / data.length);

    let streakCount = 1;

    for (let i = data.length - 1; i > 0; i--) {
      const current = new Date(data[i].date);
      const prev = new Date(data[i - 1].date);

      const diff =
        (current.getTime() - prev.getTime()) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) streakCount++;
      else break;
    }

    setStreak(streakCount);
  };

  const generateWeeklyInsight = (data: any[]) => {
    if (data.length < 2) return;

    const last7 = data.slice(-7);
    if (last7.length < 2) return;

    const start = last7[0].weight;
    const end = last7[last7.length - 1].weight;

    const diff = start - end;

    if (diff > 0)
      setWeeklyInsight(`You lost ${diff.toFixed(1)}kg this week`);
    else if (diff < 0)
      setWeeklyInsight(
        `You gained ${Math.abs(diff).toFixed(1)}kg this week`
      );
    else setWeeklyInsight(`No change this week`);
  };

  // ✅ SAVE (NO REFETCH NEEDED)
  const handleAddWeight = async () => {
    if (!weightInput) return;

    const user = auth.currentUser;
    if (!user) return;

    const newWeight = parseFloat(weightInput);

    await addDoc(collection(db, "weights"), {
      userId: user.uid,
      weight: newWeight,
      createdAt: serverTimestamp(),
    });

    setWeightInput("");
  };

  const handleUpgrade = () => {
    localStorage.setItem("isPremium", "true");
    setIsPremium(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 text-white">
      {isPremium ? (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card p-4 text-center">
            <p className="text-xs text-muted">Weight Lost</p>
            <h2 className="text-xl font-bold">
              {weightLost.toFixed(1)} kg
            </h2>
          </div>

          <div className="card p-4 text-center">
            <p className="text-xs text-muted">Average</p>
            <h2 className="text-xl font-bold">
              {averageWeight.toFixed(1)} kg
            </h2>
          </div>

          <div className="card p-4 text-center">
            <p className="text-xs text-muted">Streak</p>
            <h2 className="text-xl font-bold">{streak}</h2>
          </div>
        </div>
      ) : (
        <div className="mb-6 card p-4 text-center">
          <p className="text-sm mb-2 text-muted">
            Analytics & insights are premium
          </p>
          <button onClick={handleUpgrade} className="btn">
            Upgrade
          </button>
        </div>
      )}

      {isPremium && weeklyInsight && (
        <div className="mb-6 card p-4">
          <p>{weeklyInsight}</p>
        </div>
      )}

      {isPremium && (
        <div className="mb-6 flex gap-2">
          <input
            type="number"
            placeholder="Set goal weight"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            className="input flex-1"
          />
          <button
            onClick={() =>
              localStorage.setItem("goalWeight", goalWeight)
            }
            className="btn"
          >
            Save
          </button>
        </div>
      )}

      <div className="mb-6 flex gap-2">
        <input
          type="number"
          placeholder="Enter weight"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
          className="input flex-1"
        />
        <button onClick={handleAddWeight} className="btn">
          Save
        </button>
      </div>

      <div className="card p-5">
        <h2 className="text-sm mb-4 text-muted">Progress</h2>

        {weightHistory.length === 0 ? (
          <p>No data yet</p>
        ) : (
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={weightHistory}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line dataKey="weight" stroke="#6366f1" />

                {isPremium && goalWeight && (
                  <ReferenceLine
                    y={parseFloat(goalWeight)}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <Link href="/dashboard/generate">
        <button className="mt-6 btn px-6 py-3 rounded-full">
          Generate Plan
        </button>
      </Link>
    </div>
  );
}