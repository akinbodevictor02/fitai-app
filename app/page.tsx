"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen text-white">

      <div className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 max-w-6xl mx-auto">

        {/* Hero */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          AI Fitness Coach <br/>
          Personalized Plans, Real Results
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-2xl mb-10 text-muted max-w-2xl mx-auto"
        >
          Generate custom workout plans, track progress, and stay motivated with AI-driven guidance. Your journey to a better you starts now.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-20"
        >
          <button
            onClick={() => router.push("/signup")}
            className="btn px-6 py-3 rounded-full font-semibold"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/login")}
            className="btn px-6 py-3 rounded-full font-semibold"
          >
            Login
          </button>
        </motion.div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <motion.div
            className="card p-6 shadow-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-2">AI Generated Plans</h3>
            <p className="text-sm text-muted">Tailored workouts for your age, goal & level.</p>
          </motion.div>

          <motion.div
            className="card p-6 shadow-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-muted">Visualize your gains and stay motivated.</p>
          </motion.div>

          <motion.div
            className="card p-6 shadow-lg hover:scale-105 transition"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-sm text-muted">AI-driven tips for safe & effective workouts.</p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-20">
          <motion.div
            className="card p-6 text-center flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-3xl font-bold">10k+</p>
            <p className="text-sm text-muted mt-1">Happy Users</p>
          </motion.div>

          <motion.div
            className="card p-6 text-center flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <p className="text-3xl font-bold">5k+</p>
            <p className="text-sm text-muted mt-1">Plans Generated</p>
          </motion.div>

          <motion.div
            className="card p-6 text-center flex-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <p className="text-3xl font-bold">99%</p>
            <p className="text-sm text-muted mt-1">Satisfaction Rate</p>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            What our users say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <p>"This AI coach keeps me motivated every day! Highly recommend."</p>
              <p className="mt-3 font-semibold">– Alex</p>
            </motion.div>

            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <p>"Finally a fitness app that actually understands me."</p>
              <p className="mt-3 font-semibold">– Jamie</p>
            </motion.div>

            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
            >
              <p>"I love the personalized plans and progress charts!"</p>
              <p className="mt-3 font-semibold">– Sam</p>
            </motion.div>
          </div>
        </div>

      </div>
    </main>
  );
}