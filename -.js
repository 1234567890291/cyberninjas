// document.addEventListener('DOMContentLoaded', () => {
//     // Function to send data to Discord webhook
//     function sendToDiscord(message) {
//         const webhookUrl = "https://discord.com/api/webhooks/1273403302192611348/-t_lyzy8KJjaKKtE0tBjIhbuJqOd96VZ1AkxJOmuU4SKjzN0XUtFQ1lh1UMGoh1JswTE";
//         const payload = JSON.stringify({ content: message });

//         fetch(webhookUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: payload
//         })
//         .then(response => response.text())
//         .catch(error => console.error('Error:', error));
//     }

//     // Function to get user IP address using IP Geolocation API
//     function getUserIP() {
//         const apiKey = 'e979957e1a0542d5a7de8315dccc9a66';
//         const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;

//         return fetch(url)
//             .then(response => response.json())
//             .then(data => data.ip)
//             .catch(error => {
//                 console.error('Error fetching IP:', error);
//                 return 'Unable to retrieve IP';
//             });
//     }

//     // Function to get user agent details
//     function getUserAgentDetails() {
//         const userAgent = navigator.userAgent;
//         const browserVersion = userAgent.match(/(Chrome|Firefox|Safari|MSIE|Trident|Opera)[\/\s](\d+\.\d+)/);
//         const osVersion = userAgent.match(/(Windows NT|Mac OS X|Android|iPhone OS|Linux|iPad|iPod)[^\s]*(\d+\.\d+)/);

//         const os = osVersion ? osVersion[1] : "Unknown OS";
//         const osVersionStr = osVersion ? osVersion[2] : "Unknown Version";
//         const browser = browserVersion ? browserVersion[1] : "Unknown Browser";
//         const browserVersionStr = browserVersion ? browserVersion[2] : "Unknown Version";
//         const mobile = /Mobile/.test(userAgent) ? 'Mobile Device' : 'Desktop';

//         return { os, osVersion: osVersionStr, browser, browserVersion: browserVersionStr, mobile };
//     }

//     // Function to store visit data in local storage
//     function storeVisitData(ip, userAgentDetails) {
//         const visits = JSON.parse(localStorage.getItem('visits')) || [];
//         visits.push({
//             ip,
//             timestamp: new Date().toISOString(),
//             userAgent: userAgentDetails
//         });
//         localStorage.setItem('visits', JSON.stringify(visits));
//     }

//     // Fetch user IP and send data to Discord
//     getUserIP().then(ip => {
//         const userAgentDetails = getUserAgentDetails();

//         // Log user visit to Discord
//         const message = `New user visit:\nIP Address: ${ip}\nOperating System: ${userAgentDetails.os} ${userAgentDetails.osVersion}\nBrowser: ${userAgentDetails.browser} ${userAgentDetails.browserVersion}\nMobile Device: ${userAgentDetails.mobile}`;
//         sendToDiscord(message);

//         // Store visit data
//         storeVisitData(ip, userAgentDetails);
//     });
// });