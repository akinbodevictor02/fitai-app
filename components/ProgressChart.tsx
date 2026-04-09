"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", weight: 70 },
  { day: "Tue", weight: 69.5 },
  { day: "Wed", weight: 69 },
  { day: "Thu", weight: 68.8 },
  { day: "Fri", weight: 68.5 },
];

export default function ProgressChart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-full h-[300px]">
      <h2 className="text-gray-600 text-sm mb-2">Weight Progress</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}