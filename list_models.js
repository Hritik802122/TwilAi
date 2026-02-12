const https = require('https');

const apiKey = 'b1839fba0c8e35e9be3251289aecd709';

function getModels() {
    return new Promise((resolve) => {
        console.log('Fetching models...');
        const req = https.request({
            hostname: 'api.bytez.com',
            path: '/v1/models',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        }, (res) => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode}`);
                try {
                    const json = JSON.parse(data);
                    if (json.data) {
                        console.log('Found ' + json.data.length + ' models.');
                        // Filter for claude models
                        const claudeModels = json.data.filter(m => m.id.toLowerCase().includes('claude'));
                        if (claudeModels.length > 0) {
                            console.log('Claude Models:');
                            claudeModels.forEach(m => console.log(`- ${m.id}`));
                        } else {
                            console.log('No Claude models found. Listing first 10 models:');
                            json.data.slice(0, 10).forEach(m => console.log(`- ${m.id}`));
                        }
                    } else {
                        console.log('Response:', data.substring(0, 500));
                    }
                } catch (e) {
                    console.log('Response:', data.substring(0, 500));
                }
                resolve();
            });
        });
        req.on('error', e => {
            console.error(e);
            resolve();
        });
        req.end();
    });
}

getModels();
