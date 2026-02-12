"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Loader2, Sparkles, Globe, MapPin } from "lucide-react";
import { generateTrendingTopics } from "@/lib/bytez";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TrendingPage() {
    const router = useRouter();
    const [location, setLocation] = useState<"India" | "Global">("India");
    const [isLoading, setIsLoading] = useState(false);
    const [trends, setTrends] = useState<string[]>([]);
    const [error, setError] = useState("");

    // Clear trends when location changes to prompt re-fetch
    useEffect(() => {
        setTrends([]);
        setError("");
    }, [location]);

    const fetchTrends = async () => {
        setIsLoading(true);
        setError("");
        setTrends([]);

        try {
            const topics = await generateTrendingTopics(location);
            setTrends(topics);
        } catch (err) {
            setError("Failed to fetch trending topics. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTrendClick = (topic: string) => {
        router.push(`/dashboard?topic=${encodeURIComponent(topic)}`);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">Trending Ideas</h1>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Discover trending topics to inspire your next viral tweet.
                    Real-time insights from across the {location === "India" ? "nation" : "globe"}.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 p-6 rounded-3xl backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="flex bg-zinc-100 dark:bg-black/40 p-1.5 rounded-xl border border-zinc-200 dark:border-white/10 relative">
                    <button
                        onClick={() => setLocation("India")}
                        className={cn(
                            "relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 z-10",
                            location === "India" ? "text-black dark:text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        )}
                    >
                        {location === "India" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm border border-zinc-200 dark:border-white/5 rounded-lg"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            India
                        </span>
                    </button>

                    <button
                        onClick={() => setLocation("Global")}
                        className={cn(
                            "relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300 z-10",
                            location === "Global" ? "text-black dark:text-white" : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                        )}
                    >
                        {location === "Global" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm border border-zinc-200 dark:border-white/5 rounded-lg"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Global
                        </span>
                    </button>
                </div>

                <button
                    onClick={fetchTrends}
                    disabled={isLoading}
                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg dark:shadow-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            Fetching Trends...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Get Trending Topics
                        </>
                    )}
                </button>
            </div>

            <div className="space-y-4">
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center">
                        {error}
                    </div>
                )}

                <AnimatePresence mode="popLayout">
                    {trends.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {trends.map((trend, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleTrendClick(trend)}
                                    className="group text-left p-6 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 hover:border-red-500/30 rounded-2xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] backdrop-blur-sm shadow-sm dark:shadow-none"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 bg-zinc-100 dark:bg-white/5 rounded-lg group-hover:bg-red-500/10 dark:group-hover:bg-red-500/20 transition-colors">
                                            <TrendingUp className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-red-500" />
                                        </div>
                                        <div className="px-2 py-1 bg-zinc-100 dark:bg-white/5 rounded text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                            {location}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                                        {trend}
                                    </h3>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isLoading && trends.length === 0 && !error && (
                    <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-transparent">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <TrendingUp className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-300 mb-2">No trends loaded</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto">
                            Click the button above to discover what's trending right now.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
