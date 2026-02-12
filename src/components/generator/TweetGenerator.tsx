"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Copy, RefreshCw, Send, Image as ImageIcon, Sparkles, Bookmark, Download } from "lucide-react";
import { generateTweet, generateImage } from "@/lib/bytez";
import { cn } from "@/lib/utils";
import { storage } from "@/lib/storage";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { useSearchParams } from "next/navigation";

const TONES = ["Professional", "Casual", "Viral", "Storytelling", "Witty"];
const LENGTHS = ["Short", "Medium", "Long", "Thread"];




export function TweetGenerator() {
    const searchParams = useSearchParams();
    const [topic, setTopic] = useState("");

    useEffect(() => {
        const topicParam = searchParams.get("topic");
        if (topicParam) {
            setTopic(topicParam);
        }
    }, [searchParams]);

    const [tone, setTone] = useState("Professional");
    const [length, setLength] = useState("Medium");
    const [language, setLanguage] = useState("English");
    const [useEmojis, setUseEmojis] = useState(true);
    const [useHashtags, setUseHashtags] = useState(true);
    const [generatedTweet, setGeneratedTweet] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const [error, setError] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Image Generation State
    const [generatedImage, setGeneratedImage] = useState("");
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [imageError, setImageError] = useState("");

    const handleGenerate = async () => {
        if (!topic) return;
        setIsGenerating(true);
        setGeneratedTweet("");
        setGeneratedImage(""); // Reset image on new tweet
        setError("");
        setImageError("");
        setIsSaved(false);

        try {
            const result = await generateTweet(topic, tone, length, useEmojis, useHashtags, language as "English" | "Hindi");
            setGeneratedTweet(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Failed to generate tweet");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateImage = async () => {
        if (!generatedTweet) return;
        setIsGeneratingImage(true);
        setImageError("");

        try {
            // Create a prompt for the image based on the tweet
            const imagePrompt = `A high quality, digital art style illustration for a social media post about: ${topic}. Context: ${generatedTweet.slice(0, 100)}... 8k resolution, highly detailed, masterpiece, trending on artstation, vivid colors`;
            const imageUrl = await generateImage(imagePrompt);
            console.log("Generated Image URL:", imageUrl);
            setGeneratedImage(imageUrl);
        } catch (err) {
            console.error(err);
            setImageError(err instanceof Error ? err.message : "Failed to generate image");
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const downloadImage = async () => {
        if (!generatedImage) return;
        try {
            const response = await fetch(generatedImage);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `twilai-image-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (e) {
            console.error("Download failed:", e);
            window.open(generatedImage, '_blank');
        }
    };

    const handleSave = () => {
        if (!generatedTweet) return;
        storage.saveTweet({
            content: generatedTweet,
            topic: topic,
            mood: tone,
        });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedTweet);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
            >
                <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-sm dark:shadow-none">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 w-2 h-8 rounded-full"></span>
                        Compose Tweet
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                                What is your tweet about?
                            </label>
                            <textarea
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. The future of AI in 2025..."
                                className="w-full h-32 bg-slate-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-2xl p-4 text-gray-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Tone</label>
                                <CustomSelect
                                    value={tone}
                                    onChange={setTone}
                                    options={TONES}
                                    placeholder="Select Tone"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Length</label>
                                <CustomSelect
                                    value={length}
                                    onChange={setLength}
                                    options={LENGTHS}
                                    placeholder="Select Length"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Language</label>
                            <CustomSelect
                                value={language}
                                onChange={setLanguage}
                                options={["English", "Hindi"]}
                                placeholder="Select Language"
                            />
                        </div>

                        <div className="flex gap-6">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={cn("w-12 h-6 rounded-full p-1 transition-colors duration-300", useEmojis ? "bg-red-500" : "bg-zinc-200 dark:bg-zinc-700")}>
                                    <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300", useEmojis ? "translate-x-6" : "translate-x-0")} />
                                </div>
                                <input type="checkbox" checked={useEmojis} onChange={(e) => setUseEmojis(e.target.checked)} className="hidden" />
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">Emojis</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={cn("w-12 h-6 rounded-full p-1 transition-colors duration-300", useHashtags ? "bg-red-500" : "bg-zinc-200 dark:bg-zinc-700")}>
                                    <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300", useHashtags ? "translate-x-6" : "translate-x-0")} />
                                </div>
                                <input type="checkbox" checked={useHashtags} onChange={(e) => setUseHashtags(e.target.checked)} className="hidden" />
                                <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">Hashtags</span>
                            </label>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-500 flex items-center gap-2">
                                <span className="block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !topic}
                            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isGenerating ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                            {isGenerating ? "Generating..." : "Generate Tweet"}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Output Section */}
            <div className="space-y-6">
                <AnimatePresence mode="wait">
                    {generatedTweet ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group shadow-sm dark:shadow-none"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <div className="flex gap-2">
                                    <button onClick={copyToClipboard} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                        {isCopied ? <span className="text-green-500 font-bold text-xs">Copied!</span> : <Copy className="w-4 h-4" />}
                                    </button>
                                    <button onClick={handleGenerate} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-lg text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                        <RefreshCw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Preview</h3>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-xl md:text-2xl leading-relaxed whitespace-pre-wrap font-medium text-gray-900 dark:text-zinc-100">
                                    {generatedTweet}
                                </p>
                            </div>

                            {/* Image Generation Section */}
                            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/10 space-y-4">
                                {generatedImage ? (
                                    <div className="space-y-3">
                                        <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 group/image">
                                            <img
                                                src={generatedImage}
                                                alt="Generated visualization"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        <button
                                            onClick={downloadImage}
                                            className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 text-black dark:text-white border border-zinc-200 dark:border-white/10"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <button
                                            onClick={handleGenerateImage}
                                            disabled={isGeneratingImage}
                                            className="w-full py-3 bg-zinc-50 hover:bg-zinc-100 dark:bg-white/5 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn text-zinc-600 dark:text-zinc-300"
                                        >
                                            {isGeneratingImage ? (
                                                <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
                                            ) : (
                                                <ImageIcon className="w-4 h-4 text-zinc-400 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors" />
                                            )}
                                            {isGeneratingImage ? "Designing..." : "Generate Image (Beta)"}
                                        </button>
                                        <p className="text-xs text-center text-zinc-600">
                                            Image generation is limited to 1 per tweet in demo mode.
                                        </p>
                                        {imageError && (
                                            <p className="text-xs text-center text-red-500">{imageError}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaved}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 border",
                                        isSaved
                                            ? "bg-green-500/10 border-green-500/20 text-green-500"
                                            : "bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 border-zinc-200 dark:border-white/10 text-black dark:text-white"
                                    )}
                                >
                                    <Bookmark className={cn("w-4 h-4", isSaved ? "fill-current" : "")} />
                                    {isSaved ? "Saved!" : "Save Tweet"}
                                </button>

                                <button
                                    onClick={copyToClipboard}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                                        isCopied
                                            ? "bg-green-500 text-white hover:bg-green-600"
                                            : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                                    )}
                                >
                                    {isCopied ? (
                                        <>
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        "Copy Tweet"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-200 dark:border-white/5 rounded-3xl bg-white dark:bg-white/[0.02]"
                        >
                            <div className="w-16 h-16 bg-zinc-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                                <Sparkles className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-300 mb-2">Ready to Create</h3>
                            <p className="text-zinc-500 max-w-sm">
                                Enter your topic and configure the settings to generate your next viral tweet.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
