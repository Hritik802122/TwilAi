const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Explicitly using the key from the user's screenshot/chat
const apiKey = "AIzaSyApzSdwN6M-p89MFJEeeWk-XxDbdXnVwoA";

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const modelResponse = await genAI.getGenerativeModel({ model: "gemini-pro" });
        // note: getGenerativeModel doesn't make a network call itself usually, but we want to fail if SDK is weird.
        // Actually, we want to list models. The SDK has a generic way or we use REST.
        // The SDK doesn't expose listModels directly in client-side style often, or it does via a specific manager.
        // Let's use the raw REST call which is more reliable for "what does the server see?"

        // Fallback to fetch/https if SDK doesn't expose it easily in this version
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        fs.writeFileSync("available_models.txt", JSON.stringify(data, null, 2));
        console.log("Models written to available_models.txt");

    } catch (error) {
        fs.writeFileSync("available_models.txt", "Error: " + error.message + "\n" + JSON.stringify(error));
        console.error("Error listing models:", error);
    }
}

listModels();
