// Sample data for temperature trends
const temperatureData = [65, 68, 70, 72, 75, 78, 80];

// Initialize the temperature chart
const ctx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Temperature (°F)',
            data: temperatureData,
            borderColor: '#ff6b6b',
            backgroundColor: 'rgba(255, 107, 107, 0.2)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: 60,
                suggestedMax: 90
            }
        }
    }
});
