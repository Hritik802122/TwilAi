console.log("Script starting...");
const https = require('https');

const apiKey = 'b1839fba0c8e35e9be3251289aecd709';
const prompt = "A futuristic city";

const configs = [
    {
        name: "Standard OpenAI Image",
        path: "/v1/images/generations",
        method: "POST",
        body: {
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            prompt: prompt,
            size: "1024x1024"
        }
    },
    {
        name: "Model Run Endpoint",
        path: "/model/run",
        method: "POST",
        body: {
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            params: { prompt: prompt }
        }
    },
    {
        name: "V1 Model Run",
        path: "/v1/model/run",
        method: "POST",
        body: {
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            prompt: prompt
        }
    }
];

function test(config) {
    return new Promise((resolve) => {
        console.log(`\nTesting: ${config.name}`);
        const req = https.request({
            hostname: 'api.bytez.com',
            path: config.path,
            method: config.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${data.substring(0, 200)}...`);
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
