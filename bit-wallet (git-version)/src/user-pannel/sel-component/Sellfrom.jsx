import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
import { CryptoState } from "../../CryptoContext";

const SellCryptoForm = () => {
  const { currency, symbol, userHoldings, setUserHoldings, walletBalance, setWalletBalance, addTransaction } = CryptoState();
  const [selectedCoin, setSelectedCoin] = useState(""); 
  const [coinData, setCoinData] = useState(null); 
  const [profitLoss, setProfitLoss] = useState(null); 
  const [paymentOption, setPaymentOption] = useState(""); 
  const [sellQuantity, setSellQuantity] = useState(""); 
  const [sellAmount, setSellAmount] = useState(0); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (Object.keys(userHoldings).length > 0) {
      setSelectedCoin(Object.keys(userHoldings)[0]);
    }
  }, [userHoldings]);

  const fetchCoinData = async () => {
    if (!selectedCoin) return;
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: { vs_currency: currency, ids: selectedCoin },
      });
      setCoinData(data[0]);
      const purchasePrice = userHoldings[selectedCoin]?.buyPrice;
      if (purchasePrice) {
        const priceChange = ((data[0].current_price - purchasePrice) / purchasePrice) * 100;
        setProfitLoss(priceChange.toFixed(2)); 
      }
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [selectedCoin, currency]);

  const handleSellQuantityChange = (e) => {
    const quantity = parseFloat(e.target.value);
    setSellQuantity(quantity);

    if (!selectedCoin || !coinData) {
      setSellAmount(0);
      return;
    }

    const availableQuantity = userHoldings[selectedCoin]?.quantity || 0;

    if (quantity > availableQuantity) {
      setError(`You only have ${availableQuantity} ${selectedCoin.toUpperCase()} available.`);
      setSellAmount(0);
    } else {
      setError("");
      setSellAmount((quantity * coinData.current_price).toFixed(2));
    }
  };

  const handleSellCrypto = () => {
    if (!selectedCoin || !sellQuantity || sellQuantity <= 0 || sellQuantity > (userHoldings[selectedCoin]?.quantity || 0)) {
      alert("Invalid quantity!");
      return;
    }

    setWalletBalance((prevBalance) => prevBalance + parseFloat(sellAmount));

    setUserHoldings((prevHoldings) => {
      const updatedHoldings = { ...prevHoldings };
      if (updatedHoldings[selectedCoin].quantity - sellQuantity <= 0) {
        delete updatedHoldings[selectedCoin];
      } else {
        updatedHoldings[selectedCoin].quantity -= sellQuantity;
      }
      return updatedHoldings;
    });

    // Add transaction to the history
    const transaction = {
      id: new Date().getTime(),
      coin: selectedCoin,
      quantity: sellQuantity,
      price: coinData.current_price,
      transactionType: "Sell",
      date: new Date().toLocaleDateString(),
    };
    addTransaction(transaction); // Adding the transaction to the history

    setSellQuantity("");
    setSellAmount(0);
    setPaymentOption("");
    alert(`Successfully sold ${sellQuantity} ${selectedCoin.toUpperCase()} for ${symbol} ${sellAmount}`);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto", borderRadius: "8px" }}>
      <Typography variant="h4" sx={{ color: "black", marginBottom: "20px" }}>
        Sell Cryptocurrency
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Select Coin</InputLabel>
        <Select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} label="Select Coin">
          {Object.keys(userHoldings).length > 0 ? (
            Object.keys(userHoldings).map((coin) => (
              <MenuItem key={coin} value={coin}>
                {userHoldings[coin]?.name || coin.toUpperCase()} ({coin.toUpperCase()})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Coins Available</MenuItem>
          )}
        </Select>
      </FormControl>

      {coinData && (
        <Typography variant="h6" sx={{ color: "black", marginBottom: "10px" }}>
          Current Price: {symbol} {coinData.current_price.toFixed(2)}
        </Typography>
      )}

      {profitLoss !== null && (
        <Typography variant="h6" sx={{ color: profitLoss >= 0 ? "green" : "red", marginBottom: "20px" }}>
          {profitLoss >= 0 ? "Profit" : "Loss"}: {profitLoss}%
        </Typography>
      )}

      <TextField
        fullWidth
        label="Quantity to Sell"
        type="number"
        value={sellQuantity}
        onChange={handleSellQuantityChange}
        sx={{ marginBottom: "10px" }}
        inputProps={{ min: 0, max: userHoldings[selectedCoin]?.quantity || 0 }}
      />

      {error && <Typography sx={{ color: "red", marginBottom: "10px" }}>{error}</Typography>}

      {sellAmount > 0 && (
        <Typography variant="h6" sx={{ color: "black", marginBottom: "20px" }}>
          Amount You Will Receive: {symbol} {sellAmount}
        </Typography>
      )}

      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Receive Payment</InputLabel>
        <Select value={paymentOption} onChange={(e) => setPaymentOption(e.target.value)} label="Receive Payment">
          <MenuItem value="bit_wallet">Bit Wallet</MenuItem>
          <MenuItem value="upi">UPI</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSellCrypto}
        disabled={!selectedCoin || !paymentOption || sellQuantity <= 0 || sellQuantity > (userHoldings[selectedCoin]?.quantity || 0)}
      >
        Sell {selectedCoin ? selectedCoin.toUpperCase() : "Coin"}
      </Button>
    </Box>
  );
};

export default SellCryptoForm;
