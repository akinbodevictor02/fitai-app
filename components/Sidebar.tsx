"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedPlans =
      JSON.parse(localStorage.getItem("plans") || "[]");

    const premium =
      localStorage.getItem("isPremium") === "true";

    setPlans(savedPlans.reverse().slice(0, 5));
    setIsPremium(premium);
  }, []);

  const handleUpgrade = () => {
    localStorage.setItem("isPremium", "true");
    setIsPremium(true);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800">
        <h1 className="text-sm font-semibold text-slate-100">
          FitAI
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg bg-slate-800 text-slate-100"
        >
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-slate-900 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-5 text-slate-100 flex flex-col h-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-semibold">FitAI</h1>

            <button
              onClick={() => setOpen(false)}
              className="md:hidden"
            >
              ✕
            </button>
          </div>

          {/* NAV */}
          <nav className="space-y-2 mb-6">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block text-sm px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              Dashboard
            </Link>

            <Link
              href="/dashboard/generate"
              onClick={() => setOpen(false)}
              className="block text-sm px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              Generate Plan
            </Link>

            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="block text-sm px-3 py-2 rounded-lg hover:bg-slate-800"
            >
              Profile
            </Link>
          </nav>

          <div className="border-t border-slate-800 my-4" />

          {/* HISTORY */}
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-xs text-slate-400 mb-3">
              Recent Plans
            </h2>

            {plans.length === 0 ? (
              <p className="text-xs text-slate-500">
                No history yet
              </p>
            ) : (
              <div className="space-y-2">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className="text-xs bg-slate-800 p-2 rounded-lg truncate"
                  >
                    {plan.goal}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PREMIUM */}
          {!isPremium && (
            <div className="mt-6 p-4 rounded-xl bg-slate-800 border border-slate-700">
              <p className="text-xs mb-3 text-slate-300">
                Unlock analytics, insights & goals
              </p>

              <button
                onClick={handleUpgrade}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs"
              >
                Upgrade
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}