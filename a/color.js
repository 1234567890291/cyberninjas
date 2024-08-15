// admin.js

// Function to simulate recording a visit
function recordVisit(ip) {
    let visits = JSON.parse(localStorage.getItem('visits')) || [];
    visits.push({ ip: ip, timestamp: new Date().toISOString() });
    localStorage.setItem('visits', JSON.stringify(visits));
}

// Function to display stored visits in the admin panel
function fetchData() {
    let visits = JSON.parse(localStorage.getItem('visits')) || [];
    let tableBody = document.getElementById('data-body');
    
    tableBody.innerHTML = ''; // Clear existing data

    visits.forEach(visit => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${visit.ip}</td>
            <td>${new Date(visit.timestamp).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Simulate recording a visit (in real use, this would be done server-side)
document.addEventListener('DOMContentLoaded', () => {
    // Example IP (in real use, you might want to fetch this dynamically)
    recordVisit('192.168.1.1');
    fetchData();
});
