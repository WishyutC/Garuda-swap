fetch("get_wallet_balance.php")
    .then(response => response.json())
    .then(data => {
        const walletBalance = data.balance;
        document.getElementById("walletBalance").textContent = `$${walletBalance.toFixed(2)}`;
    })
    .catch(error => {
        console.error("Error fetching balance:", error);
        document.getElementById("walletBalance").textContent = "Error fetching balance";
    });
