"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Copy, Calendar, Tag, BookmarkX } from "lucide-react";
import { storage, SavedTweet } from "@/lib/storage";
import { cn } from "@/lib/utils";

export default function SavedTweetsPage() {
    const [savedTweets, setSavedTweets] = useState<SavedTweet[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        setSavedTweets(storage.getTweets());
        setLoading(false);
    }, []);

    const handleDelete = (id: string) => {
        storage.deleteTweet(id);
        setSavedTweets(prev => prev.filter(t => t.id !== id));
    };

    const handleCopy = (id: string, content: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (loading) return null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 w-fit">
                    Saved Collection
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">Manage your best generated tweets.</p>
            </div>

            {savedTweets.length === 0 ? (
                <div className="p-12 border border-dashed border-zinc-200 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-900/20 min-h-[400px]">
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                        <BookmarkX className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
                    </div>
                    <p className="text-lg font-medium text-gray-900 dark:text-zinc-300">No saved tweets yet.</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-600 mt-2 max-w-sm">
                        Go to the generator and start creating some viral content to save it for later.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {savedTweets.map((tweet) => (
                            <motion.div
                                key={tweet.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 transition-all hover:border-red-500/20 relative shadow-sm dark:shadow-none"
                            >
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleCopy(tweet.id, tweet.content)}
                                        className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                        title="Copy"
                                    >
                                        <Copy className={cn("w-4 h-4", copiedId === tweet.id && "text-green-500")} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tweet.id)}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 mb-2">
                                        <span className="flex items-center gap-1 bg-zinc-100 dark:bg-white/5 px-2 py-1 rounded-md">
                                            <Tag className="w-3 h-3" />
                                            {tweet.mood}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(tweet.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-300 line-clamp-1">{tweet.topic}</h3>
                                </div>

                                <p className="text-gray-600 dark:text-zinc-100 whitespace-pre-wrap leading-relaxed text-lg">
                                    {tweet.content}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
