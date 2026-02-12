"use client";

import { UserButton } from "@clerk/nextjs";
import { Sparkles, PenTool, LayoutDashboard, Settings, LogOut, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: TrendingUp, label: "Trending Ideas", href: "/dashboard/trending" },
    { icon: PenTool, label: "Saved Tweets", href: "/dashboard/saved" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200 dark:border-white/10 hidden md:flex flex-col p-6 bg-white dark:bg-black/40 backdrop-blur-xl">
                <Link href="/" className="flex items-center gap-2 mb-10">
                    <div className="p-2 rounded-lg bg-red-500/20">
                        <Sparkles className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-xl font-bold">TwilAi</span>
                </Link>

                <nav className="flex-1 space-y-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                    isActive
                                        ? "bg-zinc-100 dark:bg-white/10 text-black dark:text-white shadow-inner"
                                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-white/10 flex items-center gap-3">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "w-9 h-9",
                                userButtonPopoverCard: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10",
                            },
                        }}
                    />
                    <div className="text-sm">
                        <p className="font-medium text-gray-900 dark:text-white">Account</p>
                        <p className="text-xs text-zinc-500">Manage your profile</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-black/40 backdrop-blur-xl">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-red-500/20">
                            <Sparkles className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-xl font-bold">TwilAi</span>
                    </Link>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8",
                                userButtonPopoverCard: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10",
                            },
                        }}
                    />
                </header>

                {/* Desktop Header */}
                <header className="hidden md:flex items-center justify-end w-full p-6 absolute top-0 right-0 z-50 pointer-events-none">
                    <div className="pointer-events-auto">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border-2 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all",
                                    userButtonPopoverCard: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10",
                                },
                            }}
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none mix-blend-overlay"></div>
                    <div className="max-w-5xl mx-auto p-6 md:p-12 relative z-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
