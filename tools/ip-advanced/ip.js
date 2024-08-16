document.addEventListener('DOMContentLoaded', () => {
    // Create the HTML and CSS structure as a string
    const htmlContent = `
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            input[type="text"] {
                padding: 10px;
                font-size: 16px;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                margin-left: 10px;
            }
            pre {
                background-color: #f4f4f4;
                padding: 10px;
                border: 1px solid #ccc;
                max-height: 500px;
                overflow-y: auto;
            }
            h1 {
                font-size: 24px;
            }
        </style>
        <h1>IP Scanner Tool</h1>
        <input type="text" placeholder="Enter IP address">
        <button>Scan IP</button>
        <pre></pre>
    `;

    // Set the innerHTML of the document body
    document.body.innerHTML = htmlContent;

    // Select elements using their tag names
    const input = document.querySelector('input[type="text"]');
    const button = document.querySelector('button');
    const pre = document.querySelector('pre');

    button.addEventListener('click', scanIp);

    async function scanIp() {
        const ipAddress = input.value;
        if (!ipAddress) {
            alert('Please enter an IP address.');
            return;
        }

        // Replace with actual API keys
        const apiKeys = {
            "IPregistry.co": "YOUR_IPREGISTRY_API_KEY",
            "ipbase.com": "YOUR_IPBASE_API_KEY"
        };

        const urls = {
            "iplocation.net": `https://api.iplocation.net/?cmd=ip-country&ip=${ipAddress}`,
            "networkcalc.com": `https://networkcalc.com/api/dns/lookup/${ipAddress}`,
            "db-ip": `https://db-ip.com/api/${ipAddress}`,
            "IPregistry.co": `https://api.ipregistry.co/${ipAddress}?key=${apiKeys["IPregistry.co"]}`,
            "IPGeolocation.io": `https://api.ipgeolocation.io/ipgeo?apiKey=e979957e1a0542d5a7de8315dccc9a66&ip=${ipAddress}`,
            "IPapi.co": `https://api.ipapi.co/${ipAddress}/json/`,
            "ipbase.com": `https://api.ipbase.com/api/v2/info?apikey=${apiKeys["ipbase.com"]}&ip=${ipAddress}`,
            "criminalip.io": `https://api.criminalip.io/v1/ip/${ipAddress}`,
            "ip-info": `https://ipinfo.io/${ipAddress}?token=a0fd6ae32fa82d`,
        };

        const results = {};

        for (const [service, url] of Object.entries(urls)) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                results[service] = data;
            } catch (error) {
                results[service] = `Error: ${error.message}`;
            }
        }

        displayResults(results);
    }

    function displayResults(results) {
        pre.textContent = '';

        for (const [service, info] of Object.entries(results)) {
            pre.textContent += `Service: ${service}\n${JSON.stringify(info, null, 2)}\n${'='.repeat(40)}\n`;
        }
    }
});
