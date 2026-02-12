
export async function generateTweet(
    topic: string,
    tone: string,
    length: string,
    useEmojis: boolean,
    useHashtags: boolean,
    language: "English" | "Hindi"
) {
    const apiKey = process.env.NEXT_PUBLIC_BYTEZ_API_KEY;

    if (!apiKey) {
        throw new Error("Bytez API Key is missing. Please check your .env.local file.");
    }

    const languageInstruction = language === "Hindi"
        ? "Write the tweet in PURE Hindi using Devanagari script. Do NOT use English words or 'Hinglish'. Translate common English terms into natural Hindi equivalents (e.g., use 'शिक्षा' for 'Education', 'चुनौती' for 'Challenge'). Keep the tone conversational and engaging for an Indian audience."
        : "Write the tweet in clear, natural English suitable for Twitter.";

    const prompt = `
    You are a professional Twitter (X) content creator known for high engagement.
    ${languageInstruction}
    Write a tweet about: "${topic}".
    
    Configuration:
    - Tone: ${tone}
    - Length: ${length}
    - Emojis: ${useEmojis ? "Use relevant emojis" : "No emojis"}
    - Hashtags: ${useHashtags ? "Include 1-2 relevant hashtags" : "No hashtags"}
    
    Constraints:
    - Keep it under 280 characters unless "Thread" length is selected.
    - Make it punchy, engaging, and human-like.
    - No preamble, just the tweet text.
  `;

    try {
        const response = await fetch("https://api.bytez.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "anthropic/claude-opus-4-6",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt }
                ],
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Bytez API Error Details:", {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: errorText
            });
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.message || `API Error: ${response.status} ${response.statusText}`);
            } catch (e) {
                throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}`);
            }
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Bytez API Error (Tweet):", error);
        throw new Error("Failed to generate tweet. Please try again.");
    }
}

export async function generateImage(prompt: string) {
    const apiKey = process.env.NEXT_PUBLIC_BYTEZ_API_KEY;

    if (!apiKey) {
        throw new Error("Bytez API Key is missing. Please check your .env.local file.");
    }

    try {
        const response = await fetch("https://api.bytez.com/models/v2/stabilityai/stable-diffusion-xl-base-1.0", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Key ${apiKey}`
            },
            body: JSON.stringify({
                input: prompt,
                params: {
                    size: "1024x1024"
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Bytez API Error Details (Image):", {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: errorText
            });
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.message || `API Error: ${response.status} ${response.statusText}`);
            } catch (e) {
                throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}`);
            }
        }

        const data = await response.json();
        console.log("Bytez Image Response Data:", data);

        if (Array.isArray(data.output)) {
            return data.output[0];
        }
        return data.output;
    } catch (error) {
        console.error("Bytez API Error (Image):", error);
        throw new Error("Failed to generate image. Please try again.");
    }
}

export async function generateTrendingTopics(location: "India" | "Global") {
    const apiKey = process.env.NEXT_PUBLIC_BYTEZ_API_KEY;

    if (!apiKey) {
        throw new Error("Bytez API Key is missing. Please check your .env.local file.");
    }

    const currentDate = new Date().toDateString();
    const prompt = location === "India"
        ? `List 12 specific topics currently trending on Twitter in India as of today, ${currentDate}. Focus on breaking news, viral memes, cricket/sports updates, bollywood, and politics. Return only a JSON array of strings. Do not add any conversational text.`
        : `List 12 specific topics currently trending worldwide on Twitter as of today, ${currentDate}. Focus on major global events, technology, us politics, and pop culture. Return only a JSON array of strings. Do not add any conversational text.`;

    try {
        const response = await fetch("https://api.bytez.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "anthropic/claude-opus-4-6",
                messages: [
                    { role: "system", content: "You are a helpful assistant that provides trending topics in strict JSON format." },
                    { role: "user", content: prompt }
                ],
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // Extract JSON array from content if permissible
        const match = content.match(/\[.*?\]/s);
        if (match) {
            return JSON.parse(match[0]);
        }

        // Fallback if no strict JSON found (split by newlines and clean up)
        return content.split("\n").filter((line: string) => line.trim().length > 0 && !line.startsWith("[") && !line.startsWith("]")).map((line: string) => line.replace(/^\d+\.\s*|-\s*/, "").replace(/"/g, "").trim()).slice(0, 10);

    } catch (error) {
        console.error("Bytez API Error (Trending):", error);
        throw new Error("Failed to fetch trending topics. Please try again.");
    }
}
