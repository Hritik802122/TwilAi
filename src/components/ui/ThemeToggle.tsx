"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-16 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-16 h-8 px-1 flex items-center bg-zinc-200 dark:bg-zinc-800 rounded-full transition-colors focus:outline-none shadow-inner"
            aria-label="Toggle theme"
        >
            <motion.div
                className="absolute left-1 w-6 h-6 bg-white dark:bg-black rounded-full shadow-md flex items-center justify-center z-10"
                animate={{
                    x: isDark ? 32 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
            >
                <motion.div
                    animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: "absolute" }}
                >
                    <Moon className="w-3.5 h-3.5 text-zinc-200 fill-zinc-200" />
                </motion.div>

                <motion.div
                    animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: "absolute" }}
                >
                    <Sun className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                </motion.div>

            </motion.div>

            {/* Background Icons for Reference */}
            <div className="flex justify-between w-full px-2">
                <div className="w-4 h-4 flex items-center justify-center">
                    <Moon className="w-3 h-3 text-zinc-400" />
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                    <Sun className="w-3 h-3 text-zinc-400" />
                </div>
            </div>
        </button>
    );
}
