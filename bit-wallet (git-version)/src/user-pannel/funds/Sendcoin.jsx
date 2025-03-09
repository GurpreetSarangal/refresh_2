import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Paper, Grid } from "@mui/material";
import { CryptoState } from "../../CryptoContext";

const SendCoin = () => {
  const { currency, userHoldings, setUserHoldings, addTransaction } = CryptoState();
  const [receiverKey, setReceiverKey] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [gasFee, setGasFee] = useState("");
  const [error, setError] = useState("");
  const [prices, setPrices] = useState({});

  // Fetch live prices
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: currency },
        });

        const priceMap = {};
        data.forEach((coin) => {
          priceMap[coin.id] = coin.current_price;
        });

        setPrices(priceMap);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };
    fetchPrices();
  }, [currency]);

  // Update coin price & gas fee when selected coin changes
  useEffect(() => {
    if (selectedCoin) {
      setCoinPrice(prices[selectedCoin] || "Fetching...");
      calculateGasFee();
    }
  }, [selectedCoin, amount, prices]);

  // Gas Fee Calculation (Flat fee or 0.5% of transaction)
  const calculateGasFee = () => {
    if (!selectedCoin || !amount) {
      setGasFee("");
      return;
    }
    const flatFee = 0.001; // Example: Flat 0.001 ETH
    const percentageFee = (amount * 0.005).toFixed(4); // 0.5% of transaction
    setGasFee(Math.max(flatFee, percentageFee));
  };

  // Handle Transaction
  const handleTransfer = () => {
    if (!receiverKey || !selectedCoin || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > userHoldings[selectedCoin]?.quantity) {
      setError("Invalid transfer details or insufficient balance.");
      return;
    }

    // Deduct from sender balance
    setUserHoldings((prevHoldings) => {
      const updatedHoldings = { ...prevHoldings };
      updatedHoldings[selectedCoin].quantity -= parseFloat(amount) + parseFloat(gasFee);
      return updatedHoldings;
    });

    // Add transaction record
    const transaction = {
      id: new Date().getTime(),
      receiverKey,
      coinType: selectedCoin,
      amount,
      gasFee,
      transactionType: "Transfer",
      date: new Date().toLocaleDateString(),
    };
    addTransaction(transaction);

    setReceiverKey("");
    setAmount("");
    setGasFee("");
    setError("");

    alert(`Successfully transferred ${amount} ${selectedCoin.toUpperCase()} to ${receiverKey}`);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "700px", margin: "auto", borderRadius: "8px" }}>
      <Typography variant="h4" sx={{ color: "black", marginBottom: "20px" }}>
        Transfer Cryptocurrency
      </Typography>

      {/* Receiver's Public Key */}
      <TextField
        fullWidth
        label="Receiver's Public Key"
        type="text"
        value={receiverKey}
        onChange={(e) => setReceiverKey(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      {/* Coin Selection */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Coin Type</InputLabel>
        <Select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} label="Coin Type">
          {Object.keys(userHoldings).map((coin) => (
            <MenuItem key={coin} value={coin}>
              {userHoldings[coin]?.name || coin.toUpperCase()} ({coin.toUpperCase()})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Coin Price Display */}
      <Paper sx={{ padding: "10px", marginBottom: "20px", backgroundColor: "#f5f5f5" }}>
        <Typography variant="body1">
          Current Price:{" "}
          {coinPrice
            ? `${coinPrice} ${currency.toUpperCase()}`
            : "Fetching..."}
        </Typography>
      </Paper>

      {/* Amount Input */}
      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ marginBottom: "20px" }}
        inputProps={{ min: 0 }}
      />

      {/* Gas Fee Display */}
      {gasFee && (
        <Paper sx={{ padding: "10px", marginBottom: "20px", backgroundColor: "#e0f7fa" }}>
          <Typography variant="body1">Gas Fee: {gasFee} {selectedCoin.toUpperCase()}</Typography>
        </Paper>
      )}

      {/* Error Message */}
      {error && <Typography sx={{ color: "red", marginBottom: "10px" }}>{error}</Typography>}

      {/* Transfer Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleTransfer}>
        Transfer Funds
      </Button>
    </Box>
  );
};

export default SendCoin;
