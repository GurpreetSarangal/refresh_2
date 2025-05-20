import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { CryptoState } from "../../CryptoContext";

const BuyCryptoForm = () => {
  const { currency, setCurrency } = CryptoState();
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [ethUsdPrice, setEthUsdPrice] = useState(null);
  const [ethAmount, setEthAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEthPrice();
  }, []);

  const fetchEthPrice = async () => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: { ids: "ethereum", vs_currencies: "usd" },
      });
      setEthUsdPrice(res.data.ethereum.usd);
    } catch (err) {
      console.error("Failed to fetch ETH price:", err);
    }
  };

  const handleInvestmentChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setInvestmentAmount(value);
    if (ethUsdPrice) {
      setEthAmount((value / ethUsdPrice).toFixed(6));
    }
  };

  const handleBuy = async () => {
    if (!investmentAmount || !ethUsdPrice) return;
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const token = localStorage.getItem("authToken"); // adjust based on your token storage
      const res = await axios.post(
        "/api/wallet/buy",
        {
          amount: investmentAmount,
          fiat_currency: currency,
          crypto_currency: "sepolia",
          ethUsdAtInitiation: ethUsdPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResponse(res.data);
      setInvestmentAmount("");
      setEthAmount(0);
      fetchEthPrice(); // refresh for latest rate
    } catch (err) {
      setError(
        err.response?.data?.msg || "Transaction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 500, margin: "auto", background: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Buy Sepolia ETH
      </Typography>

      {/* Currency Selection */}
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel>Currency</InputLabel>
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)} label="Currency">
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </FormControl>

      {/* Display ETH Price */}
      {ethUsdPrice && (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Current ETH Price: {currency} {ethUsdPrice}
        </Typography>
      )}

      {/* Input Investment */}
      <TextField
        label={`Amount in ${currency}`}
        type="number"
        fullWidth
        variant="outlined"
        value={investmentAmount}
        onChange={handleInvestmentChange}
        sx={{ marginBottom: 2 }}
      />

      {/* ETH Calculation */}
      {ethAmount > 0 && (
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          You will receive approximately <strong>{ethAmount}</strong> Sepolia ETH
        </Typography>
      )}

      {/* Buy Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading || !investmentAmount}
        onClick={handleBuy}
        sx={{ padding: 1.5 }}
      >
        {loading ? <CircularProgress size={24} /> : "Buy Sepolia ETH"}
      </Button>

      {/* Response or Error */}
      {response && (
        <Typography variant="body1" sx={{ color: "green", marginTop: 3 }}>
          ✅ Transaction successful! TX Hash: {response.txHash}
        </Typography>
      )}
      {error && (
        <Typography variant="body1" sx={{ color: "red", marginTop: 3 }}>
          ❌ {error}
        </Typography>
      )}
    </Box>
  );
};

export default BuyCryptoForm;
