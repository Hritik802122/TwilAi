export interface SavedTweet {
    id: string;
    content: string;
    topic: string;
    mood: string;
    timestamp: number;
}

const STORAGE_KEY = 'twilai_saved_tweets';

export const storage = {
    getTweets: (): SavedTweet[] => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    saveTweet: (tweet: Omit<SavedTweet, 'id' | 'timestamp'>): SavedTweet => {
        const tweets = storage.getTweets();
        const newTweet: SavedTweet = {
            ...tweet,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([newTweet, ...tweets]));
        return newTweet;
    },

    deleteTweet: (id: string) => {
        const tweets = storage.getTweets();
        const filtered = tweets.filter(t => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
};
