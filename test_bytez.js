console.log("Script starting...");
const https = require('https');

const apiKey = 'b1839fba0c8e35e9be3251289aecd709';
const prompt = "Write a tweet about AI.";

const configs = [
    {
        name: "Anthropic Prefix",
        path: "/v1/chat/completions",
        body: {
            model: "anthropic/claude-3-opus-20240229",
            messages: [{ role: "user", content: prompt }]
        }
    },
    {
        name: "No Prefix",
        path: "/v1/chat/completions",
        body: {
            model: "claude-3-opus-20240229",
            messages: [{ role: "user", content: prompt }]
        }
    },
    {
        name: "Short Model Name",
        path: "/v1/chat/completions",
        body: {
            model: "anthropic/claude-3-opus",
            messages: [{ role: "user", content: prompt }]
        }
    },
    {
        name: "Haiku Short Name",
        path: "/v1/chat/completions",
        body: {
            model: "anthropic/claude-3-haiku",
            messages: [{ role: "user", content: prompt }]
        }
    }
];

function test(config) {
    return new Promise((resolve) => {
        console.log(`\nTesting: ${config.name}`);
        const req = https.request({
            hostname: 'api.bytez.com',
            path: config.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${data}`);
                resolve();
            });
        });
        req.on('error', e => {
            console.error(e);
            resolve();
        });
        req.write(JSON.stringify(config.body));
        req.end();
    });
}

async function run() {
    for (const c of configs) await test(c);
}

run();
