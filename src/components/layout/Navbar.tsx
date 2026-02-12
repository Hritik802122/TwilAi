"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 backdrop-blur-md bg-white/50 dark:bg-black/50 border-b border-black/5 dark:border-white/10 supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/50"
        >
            <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-shadow duration-300">
                    <Rocket className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/70 hidden sm:block">
                    TwilAi
                </span>
            </Link>

            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    <ThemeToggle />
                </div>

                {isSignedIn ? (
                    <div className="flex items-center gap-3 md:gap-4">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            Dashboard
                        </Link>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 md:w-9 md:h-9 border-2 border-black/5 dark:border-white/10",
                                },
                            }}
                        />
                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link
                            href="/sign-in"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/sign-up"
                            className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-black/90 dark:bg-white/10 rounded-full hover:bg-black/80 dark:hover:bg-white/20 transition-all border border-transparent dark:border-white/5 shadow-inner whitespace-nowrap"
                        >
                            Get Started
                        </Link>
                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>
                    </div>
                )}
            </div>
        </motion.nav>
    );
}
