"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { ViralTweetsSection } from "@/components/landing/ViralTweetsSection";
import { CursorAura } from "@/components/landing/CursorAura";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-red-500/30 overflow-hidden relative transition-colors duration-300">
      <CursorAura />
      <Navbar />

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        {/* ... (Hero content) ... */}
        {/* Background Gradients - Hidden in light mode for clean look, visible in dark mode */}
        <div className="hidden dark:block absolute top-0 transform -translate-x-1/2 left-1/2 w-[800px] h-[500px] bg-red-500/20 rounded-[100%] blur-[120px] -z-10 mix-blend-screen overflow-hidden opacity-50 pointer-events-none" />
        <div className="hidden dark:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-[100%] blur-[100px] -z-10 opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-sm md:text-base text-zinc-600 dark:text-zinc-300 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            <span>AI-Powered Twitter Growth</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-white dark:to-white/40 pb-4"
          >
            Bring your tweets <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500">
              to life with AI.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Generate high-engagement, viral-worthy Twitter threads and posts in seconds.
            Stop staring at a blank screen and start trending.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-zinc-200 transition-all flex items-center gap-2 group shadow-lg dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)]"
            >
              Start Writing for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/sign-in"
              className="px-8 py-4 bg-white dark:bg-white/5 text-gray-900 dark:text-white font-medium rounded-full hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>

      <ViralTweetsSection />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none mix-blend-overlay"></div>
    </main>
  );
}
