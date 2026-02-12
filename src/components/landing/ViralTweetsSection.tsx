"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, MessageCircle, Repeat2, BarChart2, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_TWEETS = [
    {
        id: 1,
        name: "Saurabh Singh",
        handle: "@saurabh_singh23",
        avatar: "Saurabh.jpeg", // Add your image path here
        time: "2h",
        content: "The way AI is evolving is absolutely insane.🤯\nJust generated an entire marketing campaign in 30 seconds. The leverage you get as a solo founder now is unmatched.\n\nAdapt or get left behind.",
        stats: { comments: "42", retweets: "128", likes: "1.2k", views: "45k" },
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        name: "Livinya",
        handle: "@livi_345",
        avatar: "livi.jpeg", // Add your image path here
        time: "4h",
        content: "Women’s equality isn’t about giving special treatment,\nit’s about ensuring equal opportunities, equal respect, and equal voices in every space where decisions are made.",
        stats: { comments: "189", retweets: "742", likes: "2.8k", views: "182k" },
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: 3,
        name: "Hritik Maurya",
        handle: "@hritik_maurya",
        avatar: "hritikimage.png", // Add your image path here
        time: "6h",
        content: "हर परंपरा सच नहीं होती, और हर मान्यता सही नहीं होती,\nसवाल पूछना गलत नहीं, बल्कि जागरूक होने की निशानी है,\nअंधविश्वास इंसान को कमजोर बनाता है |",
        stats: { comments: "356", retweets: "2.3k", likes: "9.4k", views: "420k" },
        gradient: "from-orange-500 to-red-500"
    },
    {
        id: 4,
        name: "Rohit Roushan",
        handle: "@rohit_r34",
        avatar: "rohit.jpg", // Add your image path here
        time: "12h",
        content: "Rohit Sharma is the only player in the world,\n to score three double centuries in ODI cricket,\n redefining what’s possible in limited-overs format.",
        stats: { comments: "230", retweets: "1.1k", likes: "8.9k", views: "210k" },
        gradient: "from-green-500 to-emerald-500"
    },
    {
        id: 5,
        name: "Abhimanyu Kumar",
        handle: "@abhi_kumar34",
        avatar: "Abhiman.jpg", // Add your image path here
        time: "1d",
        content: "Consistency in DSA isn’t about solving 50 problems in a day,\nit’sabout solving 2–3 every day without quitting,\nSmall daily wins build big coding confidence.",
        stats: { comments: "67", retweets: "156", likes: "1.5k", views: "56k" },
        gradient: "from-yellow-500 to-amber-500"
    }
];

export function ViralTweetsSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-[#0B0B0B] relative overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center space-y-6 px-6 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-sm font-medium text-red-500"
                >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Trending on X</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
                >
                    See what viral tweets <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500">
                        look like.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
                >
                    Examples of high-performing tweets generated with AI.
                </motion.p>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full">
                {/* Edge Fade Masks */}
                <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-slate-50 dark:from-[#0B0B0B] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-slate-50 dark:from-[#0B0B0B] to-transparent z-20 pointer-events-none" />

                {/* Moving Track */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-6 md:gap-8 px-6 md:px-8"
                        animate={{
                            x: [0, -1000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30, // Slower for readability
                                ease: "linear",
                            },
                        }}
                        style={{
                            width: "max-content",
                        }}
                    >
                        {/* Duplicate lists for seamless loop */}
                        {[...MOCK_TWEETS, ...MOCK_TWEETS, ...MOCK_TWEETS].map((tweet, i) => (
                            <div
                                key={`${tweet.id}-${i}`}
                                className="relative flex-shrink-0 w-[350px] p-6 rounded-2xl bg-white dark:bg-black/40 backdrop-blur-md border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-xl hover:shadow-md hover:border-zinc-300 dark:hover:border-white/10 dark:hover:shadow-red-500/5 transition-all duration-300 group cursor-default"
                            >
                                {/* Tweet Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    {/* Avatar Placeholder - Replace src with your image logic */}
                                    <div className="relative w-10 h-10 flex-shrink-0">
                                        <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br opacity-50", tweet.gradient)} />
                                        <img
                                            src={tweet.avatar}
                                            alt={tweet.name}
                                            className="relative w-10 h-10 rounded-full object-cover border border-black/5 dark:border-white/10"
                                            onError={(e) => {
                                                // Fallback to gradient if image fails
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement?.querySelector('div')?.classList.remove('opacity-50');
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-gray-900 dark:text-white truncate">{tweet.name}</span>
                                            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                        </div>
                                        <div className="flex items-center gap-1 text-zinc-500 text-sm">
                                            <span className="truncate">{tweet.handle}</span>
                                            <span>·</span>
                                            <span>{tweet.time}</span>
                                        </div>
                                    </div>
                                    <div className="text-zinc-400 dark:text-zinc-500 hover:text-red-500 transition-colors cursor-pointer">
                                        <div className="w-1 h-1 rounded-full bg-current mb-0.5" />
                                        <div className="w-1 h-1 rounded-full bg-current mb-0.5" />
                                        <div className="w-1 h-1 rounded-full bg-current" />
                                    </div>
                                </div>

                                {/* Tweet Body */}
                                <div className="mb-4">
                                    <p className="text-[15px] leading-relaxed text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap font-normal">
                                        {tweet.content}
                                    </p>
                                </div>

                                {/* Tweet Stats/Footer */}
                                <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-sm pt-2">
                                    <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer group/stat">
                                        <MessageCircle className="w-4 h-4" />
                                        <span className="text-xs">{tweet.stats.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-green-400 transition-colors cursor-pointer group/stat">
                                        <Repeat2 className="w-4 h-4" />
                                        <span className="text-xs">{tweet.stats.retweets}</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-pink-500 transition-colors cursor-pointer group/stat">
                                        <Heart className="w-4 h-4 group-hover/stat:fill-pink-500" />
                                        <span className="text-xs">{tweet.stats.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer group/stat">
                                        <BarChart2 className="w-4 h-4" />
                                        <span className="text-xs">{tweet.stats.views}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
