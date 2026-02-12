const https = require('https');

// Hardcoded key for debugging since file read failed
const apiKey = 'AIzaSyApzSdwN6M-p89MFJEeeWk-XxDbdXnVwoA';

console.log("Checking models for key: " + apiKey.substring(0, 10) + "...");

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("Available Models:");
                json.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                        console.log(`- ${m.name}`);
                    }
                });
            } else {
                console.log("No models found or error:", JSON.stringify(json, null, 2));
            }
        } catch (e) {
            console.error("Error parsing response", e);
            console.log("Raw response:", data);
        }
    });

}).on("error", (err) => {
    console.error("Error: " + err.message);
});
