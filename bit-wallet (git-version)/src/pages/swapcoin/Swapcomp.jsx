import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Grid, Paper } from "@mui/material";
import { CryptoState } from "../../CryptoContext";

const Swap = () => {
  const { currency, userHoldings, setUserHoldings, addTransaction } = CryptoState();
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [prices, setPrices] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllCoins = async () => {
      try {
        const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: currency },
        });
        setAllCoins(data);
        const priceMap = {};
        data.forEach((coin) => {
          priceMap[coin.id] = coin.current_price;
        });
        setPrices(priceMap);
      } catch (error) {
        console.error("Error fetching all coins:", error);
      }
    };
    fetchAllCoins();
  }, [currency]);

  useEffect(() => {
    if (Object.keys(userHoldings).length > 0) {
      setFromCoin(Object.keys(userHoldings)[0]);
      setToCoin(allCoins.length > 0 ? allCoins[0]?.id : "");
    }
  }, [userHoldings, allCoins]);

  const handleFromAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    setFromAmount(amount);

    if (!prices[fromCoin] || !prices[toCoin] || !amount || amount <= 0) {
      setToAmount("");
      return;
    }

    const amountInToCoin = ((amount * prices[fromCoin]) / prices[toCoin]).toFixed(4);
    setToAmount(amountInToCoin);
  };

  const handleSwap = () => {
    if (!fromCoin || !toCoin || !fromAmount || !toAmount || fromAmount <= 0 || parseFloat(fromAmount) > userHoldings[fromCoin]?.quantity) {
      setError("Invalid swap or insufficient balance.");
      return;
    }

    setUserHoldings((prevHoldings) => {
      const updatedHoldings = { ...prevHoldings };
      updatedHoldings[fromCoin].quantity -= fromAmount;
      updatedHoldings[toCoin] = {
        name: allCoins.find((c) => c.id === toCoin)?.name || toCoin,
        quantity: (updatedHoldings[toCoin]?.quantity || 0) + parseFloat(toAmount),
      };
      return updatedHoldings;
    });

    const transaction = {
      id: new Date().getTime(),
      fromCoin,
      toCoin,
      fromAmount,
      toAmount,
      transactionType: "Swap",
      date: new Date().toLocaleDateString(),
    };
    addTransaction(transaction);

    setFromAmount("");
    setToAmount("");
    setError("");
    alert(`Successfully swapped ${fromAmount} ${fromCoin.toUpperCase()} for ${toAmount} ${toCoin.toUpperCase()}`);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "900px", margin: "auto", borderRadius: "8px" }}>
      <Typography variant="h4" sx={{ color: "black", marginBottom: "20px" }}>
        Swap Cryptocurrency
      </Typography>

      <Grid container spacing={2}>
        {/* From Coin Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel>From Coin</InputLabel>
            <Select value={fromCoin} onChange={(e) => setFromCoin(e.target.value)} label="From Coin">
              {Object.keys(userHoldings).map((coin) => (
                <MenuItem key={coin} value={coin}>
                  {userHoldings[coin]?.name || coin.toUpperCase()} ({coin.toUpperCase()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* To Coin Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ marginBottom: "20px" }}>
            <InputLabel>To Coin</InputLabel>
            <Select value={toCoin} onChange={(e) => setToCoin(e.target.value)} label="To Coin">
              {allCoins.map((coin) => (
                <MenuItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Amount Input */}
      <TextField
        fullWidth
        label={`Amount of ${fromCoin?.toUpperCase()}`}
        type="number"
        value={fromAmount}
        onChange={handleFromAmountChange}
        sx={{ marginBottom: "20px" }}
        inputProps={{ min: 0 }}
      />

      {/* Conversion Summary */}
      {fromAmount > 0 && toAmount > 0 && (
        <Paper sx={{ padding: "15px", marginBottom: "20px", backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6">
            Conversion Rate: {fromCoin.toUpperCase()} → {toCoin.toUpperCase()}
          </Typography>
          <Typography>
            {fromAmount} {fromCoin.toUpperCase()} ≈ {toAmount} {toCoin.toUpperCase()}
          </Typography>
        </Paper>
      )}

      {/* Wallet Grid with Coin Prices */}
      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px" }}>
        Your Wallet & Current Prices
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(userHoldings).map((coin) => (
          <Grid item xs={6} sm={3} key={coin}>
            <Paper sx={{ padding: "15px", textAlign: "center", backgroundColor: "#e0f7fa" }}>
              <Typography variant="body1">{userHoldings[coin]?.name || coin.toUpperCase()}</Typography>
              <Typography variant="h6">{userHoldings[coin]?.quantity}</Typography>
              <Typography variant="body2" sx={{ color: "green" }}>
                1 {coin.toUpperCase()} = {prices[coin] ? `${prices[coin]} ${currency.toUpperCase()}` : "Fetching..."}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Error Message */}
      {error && <Typography sx={{ color: "red", marginTop: "10px" }}>{error}</Typography>}

      {/* Swap Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSwap}>
        Swap {fromCoin?.toUpperCase()} for {toCoin?.toUpperCase()}
      </Button>
    </Box>
  );
};

export default Swap;
