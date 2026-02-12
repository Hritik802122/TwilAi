"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate, animate } from "framer-motion";

export function CursorAura() {
    const [mounted, setMounted] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const movingTimeout = useRef<NodeJS.Timeout | null>(null);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Tighter Spring Physics (Lower mass = faster response, less "floaty")
    const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Section Awareness: Aggressive fade out
    const { scrollY } = useScroll();
    const scrollOpacity = useTransform(scrollY, [0, 600], [1, 0]); // Fade out faster
    const scrollScale = useTransform(scrollY, [0, 600], [1, 0.5]);

    // Combined Opacity & Glow: Fades/Shrinks if scrolling OR if idle
    const isMovingOpacity = useMotionValue(0);
    const isMovingScale = useMotionValue(0.2); // Start tiny/invisible when idle

    // We remove scrollOpacity from the template here to avoid double-fading; 
    // scrollOpacity controls the CONTAINER opacity, isMovingOpacity controls the BLOBS visibility.
    // Actually, let's keep it simple: The whole component fades on scroll. 
    // The blobs fade on idle.
    const auraOpacity = useMotionTemplate`${scrollOpacity} * ${isMovingOpacity}`;
    const auraScale = useMotionTemplate`${scrollScale} * ${isMovingScale}`;

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Handle Active State (Ignite/Glow Up)
            if (!isMoving) {
                setIsMoving(true);
                animate(isMovingOpacity, 1, { duration: 0.1 }); // Instant ignition
                animate(isMovingScale, 1, { type: "spring", bounce: 0.4, duration: 0.5 }); // Bounce up
            }

            if (movingTimeout.current) clearTimeout(movingTimeout.current);
            movingTimeout.current = setTimeout(() => {
                setIsMoving(false);
                animate(isMovingOpacity, 0, { duration: 0.6 }); // Quick decay
                animate(isMovingScale, 0.2, { duration: 0.6 }); // Shrink down
            }, 600); // Shorter active window
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (movingTimeout.current) clearTimeout(movingTimeout.current);
        };
    }, [mouseX, mouseY, isMoving, isMovingOpacity, isMovingScale]);

    // Theme Awareness
    const { theme } = useTheme();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setMounted(true);
    }, []);

    // Don't render until client-side hydration is complete to match theme
    if (!isClient || !mounted) return null;

    // DISABLE IN LIGHT MODE (Clean SaaS Look)
    if (theme === "light") return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden hidden md:block mix-blend-screen">
            <motion.div
                className="absolute top-0 left-0 will-change-transform"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: auraScale, // Use the combined scale
                }}
            >
                {/* 
                  The "Aura" Container - High Brightness & Saturation
                */}
                <motion.div
                    className="relative w-[500px] h-[500px]"
                    style={{ opacity: auraOpacity }}
                >

                    {/* Layer 1: Core Hot Spot (White/Yellow) - Intense Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full blur-2xl opacity-80 mix-blend-screen" />

                    {/* Layer 2: Main Body (Bright Orange/Red) - Vibrant Smoke */}
                    <motion.div
                        className="absolute inset-[15%] bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full blur-3xl opacity-90 mix-blend-screen"
                        animate={{
                            rotate: 360,
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                    />

                    {/* Layer 3: Outer Glow (Magenta/Purple) - Soft Edge */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-transparent rounded-full blur-[80px] opacity-60 mix-blend-screen"
                        animate={{
                            scale: [1.1, 1, 1.1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Layer 4: Dynamic Flare (Cyan/Blue Tint) - Reintroducing for "Smokey Cursor" reference look if needed, keeping subtle */}
                    {/* The user referenced a "Smokey Cursor" image that had some blue/green. Let's add a very subtle cyan highlight solely for that "electric" feel */}
                    <motion.div
                        className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-cyan-400 rounded-full blur-[60px] opacity-40 mix-blend-screen"
                        animate={{
                            x: [-20, 20, -20],
                            y: [20, -20, 20],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                </motion.div>
            </motion.div>
        </div>
    );
}
