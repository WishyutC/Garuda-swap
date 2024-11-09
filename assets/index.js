document.addEventListener('DOMContentLoaded', function() {
    // Toggle search dropdown suggestions
    const searchInput = document.getElementById('searchInput');
    const dropdownBox = document.getElementById('dropdownBox');

    searchInput.addEventListener('input', function() {
        if (this.value.trim()) {
            dropdownBox.style.display = 'block';
        } else {
            dropdownBox.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !dropdownBox.contains(event.target)) {
            dropdownBox.style.display = 'none';
        }
    });

    // Language selection
    function setLanguage(lang) {
        alert('Language set to: ' + lang);
        // Further code can replace text based on language
    }

    // Conversion calculation logic
    const conversionRates = {
        'BTC': 34500,   // Sample rate, replace with actual API
        'ETH': 1800,
        'USDT': 1,
        'USDC': 1,
        'BNB': 230
    };

    const sellInput = document.querySelector('.inner-block-top input[type="number"]');
    const buyInput = document.querySelector('.inner-block-bottom input[type="number"]');
    const sellDropdown = document.querySelector('.inner-block-top .dropdown');
    const buyDropdown = document.querySelector('.inner-block-bottom .dropdown');

    function calculateConversion() {
        const sellCurrency = sellDropdown.value;
        const buyCurrency = buyDropdown.value;
        const sellAmount = parseFloat(sellInput.value);

        if (!isNaN(sellAmount) && conversionRates[sellCurrency] && conversionRates[buyCurrency]) {
            const buyAmount = (sellAmount * conversionRates[sellCurrency]) / conversionRates[buyCurrency];
            buyInput.value = buyAmount.toFixed(4);
        }
    }

    sellInput.addEventListener('input', calculateConversion);
    sellDropdown.addEventListener('change', calculateConversion);
    buyDropdown.addEventListener('change', calculateConversion);

    // Globe icon toggle for language dropdown
    const globeIcon = document.getElementById('globeIcon');
    const languageDropdown = document.getElementById('languageDropdown');

    globeIcon.addEventListener('click', function() {
        languageDropdown.style.display = languageDropdown.style.display === 'block' ? 'none' : 'block';
    });
});
