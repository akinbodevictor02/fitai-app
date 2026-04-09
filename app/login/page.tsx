"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Toast from "@/components/toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Save user properly
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          name: "",
        })
      );

      setToast("Login successful");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (error: any) {
      setToast(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">

  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="card p-8 w-full max-w-md"
  >
    <h2 className="text-2xl font-bold text-center mb-6">
      Welcome Back
    </h2>

    <input
      type="email"
      placeholder="Email"
      className="input w-full mb-3"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      className="input w-full mb-4"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin} className="btn w-full py-3">
      Login
    </button>

    <p className="text-sm text-center mt-4 text-muted">
      Don’t have an account?{" "}
      <span
        onClick={() => router.push("/signup")}
        className="underline cursor-pointer"
      >
        Sign up
      </span>
    </p>
  </motion.div>

  {toast && <Toast message={toast} />}
</main>
  );
}