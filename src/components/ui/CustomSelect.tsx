"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    label?: string;
    placeholder?: string;
}

export function CustomSelect({ value, onChange, options, label, placeholder }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            {label && <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">{label}</label>}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl p-3 text-left flex items-center justify-between transition-all duration-200",
                    "hover:bg-zinc-50 dark:hover:bg-white/5 hover:border-zinc-300 dark:hover:border-white/20",
                    isOpen ? "ring-2 ring-red-500/50 border-red-500/50" : ""
                )}
            >
                <span className={cn("truncate text-gray-900 dark:text-white", !value && "text-zinc-500")}>
                    {value || placeholder || "Select option"}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-zinc-400 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute z-50 w-full mt-2 bg-white dark:bg-[#0A0A0A]/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-xl shadow-lg dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="max-h-60 overflow-y-auto p-1 scrollbar-none">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-3 py-2.5 text-sm text-left rounded-lg transition-colors flex items-center justify-between group",
                                        value === option
                                            ? "bg-zinc-100 dark:bg-white/10 text-black dark:text-white"
                                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                                    )}
                                >
                                    <span>{option}</span>
                                    {value === option && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-2"
                                        >
                                            <Check className="w-3.5 h-3.5 text-red-500" />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
