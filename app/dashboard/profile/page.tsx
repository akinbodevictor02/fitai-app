"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Toast from "@/components/toast";

export default function Profile() {
  const [name, setName] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setName(user.name || "");
  }, []);

  const handleSave = () => {
    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");

    const updatedUser = {
      ...existingUser,
      name,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setToast("Profile saved successfully");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full max-w-md card p-8"
  >
    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
      Profile
    </h1>

    <input
      type="text"
      placeholder="Enter your name"
      className="input w-full mb-4"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <button onClick={handleSave} className="btn w-full py-3">
      Save
    </button>
  </motion.div>

  {toast && <Toast message={toast} />}
</main>
  );
};