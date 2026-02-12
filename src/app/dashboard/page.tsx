import { TweetGenerator } from "@/components/generator/TweetGenerator";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Create, manage, and schedule your Twitter content.</p>
            </div>

            <TweetGenerator />
        </div>
    );
}
