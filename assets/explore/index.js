// Coin IDs mapped to Chart element IDs
const coins = {
    bitcoin: 'bitcoinChart',
    ethereum: 'ethereumChart',
    tether: 'tetherChart',
    'usd-coin': 'usdCoinChart',
    binancecoin: 'binanceCoinChart'
};

// Function to fetch price data for the past 30 days
async function fetchCryptoData(coinId) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`);
        const data = await response.json();
        return data.prices;
    } catch (error) {
        console.error(`Error fetching data for ${coinId}:`, error);
        return [];
    }
}

// Function to format data for Chart.js
function formatChartData(prices) {
    const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
    const data = prices.map(price => price[1]);
    return { labels, data };
}

// Function to create and display the chart
async function createCryptoChart(coinId, chartId) {
    const prices = await fetchCryptoData(coinId);

    // Check if there is no data and return early
    if (prices.length === 0) {
        console.error(`No data available for ${coinId}`);
        return;
    }

    const { labels, data } = formatChartData(prices);

    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${coinId.toUpperCase()} Price (USD)`,
                data: data,
                borderColor: '#ff007a',
                backgroundColor: 'rgba(255, 0, 122, 0.2)',
                fill: true,
                pointRadius: 0,  // Remove points for cleaner look
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',  // Make sure x-axis is categorical
                    ticks: { color: '#ffd700' },  // Gold color for x-axis labels
                    grid: { display: false }       // Hide x-axis grid for a cleaner look
                },
                y: {
                    type: 'linear',   // Set y-axis to linear
                    ticks: { color: '#ffd700' },   // Gold color for y-axis labels
                    grid: { color: '#b8860b' }     // Darker gold for y-axis grid lines
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#332',       // Dark background for tooltip
                    titleColor: '#ffd700',         // Gold color for tooltip title
                    bodyColor: '#fff'              // White color for tooltip body text
                }
            }
        }
    });
}

// Create charts for each cryptocurrency
Object.keys(coins).forEach(coinId => {
    createCryptoChart(coinId, coins[coinId]);
});
