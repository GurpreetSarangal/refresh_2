import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { CryptoState } from "../../CryptoContext"; // Import context for currency

// Function to format numbers with commas
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BuyCryptoForm = () => {
  const { currency, setCurrency, symbol, userHoldings, setUserHoldings, walletBalance, setWalletBalance } = CryptoState();
  const [coinData, setCoinData] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [paymentOption, setPaymentOption] = useState("");
  const [coinList, setCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Fetch the list of all coins and their data
  const fetchCoinList = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: { vs_currency: currency },
      });
      setCoinList(data);
    } catch (error) {
      console.error("Error fetching coin list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the current price of the selected cryptocurrency
  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: { vs_currency: currency, ids: selectedCoin },
      });
      setCoinData(data[0]);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoinList();
    fetchCoinData();
  }, [currency, selectedCoin]);

  // Handle investment amount change
  const handleInvestmentChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setInvestmentAmount(amount);

    if (coinData) {
      const crypto = (amount / coinData.current_price).toFixed(6);
      setCryptoAmount(crypto);
    }
  };

  // Handle payment option change
  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  // Handle the buy action and update user holdings
  const handleBuyCrypto = () => {
    if (!investmentAmount || !paymentOption || cryptoAmount <= 0) return;

    if (paymentOption === "bit_wallet") {
      if (walletBalance < investmentAmount) {
        alert("Insufficient wallet balance!");
        return;
      }

      // Deduct from wallet balance
      setWalletBalance(walletBalance - investmentAmount);

      // Update user holdings
      setUserHoldings((prevHoldings) => {
        const updatedHoldings = { ...prevHoldings };

        if (updatedHoldings[selectedCoin]) {
          updatedHoldings[selectedCoin].quantity += parseFloat(cryptoAmount);
        } else {
          updatedHoldings[selectedCoin] = {
            name: coinData.name,
            quantity: parseFloat(cryptoAmount),
            buyPrice: coinData.current_price,
          };
        }

        return updatedHoldings;
      });

      setPaymentSuccess(true);
      setInvestmentAmount(0);
      setCryptoAmount(0);
      setPaymentOption("");
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto", borderRadius: "8px" }}>
      {/* Currency selection */}
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ color: "black", marginBottom: "10px" }}>
          Select Currency
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select value={currency} onChange={(e) => setCurrency(e.target.value)} label="Currency">
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="JPY">JPY</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Title */}
      <Typography variant="h4" sx={{ color: "black", marginBottom: "20px" }}>
        Buy {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)}
      </Typography>

      {/* Search bar for cryptocurrency */}
      <TextField
        label="Search Cryptocurrency"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      {/* Coin selection dropdown */}
      {loading ? (
        <Typography variant="h6" sx={{ color: "black", marginBottom: "20px" }}>
          Loading coins...
        </Typography>
      ) : (
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Cryptocurrency</InputLabel>
          <Select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} label="Cryptocurrency">
            {coinList
              .filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
              .map((coin) => (
                <MenuItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      {/* Display current coin price */}
      {coinData && (
        <Typography variant="h6" sx={{ color: "black", marginBottom: "20px" }}>
          Current Price: {symbol} {numberWithCommas(coinData.current_price.toFixed(2))}
        </Typography>
      )}

      {/* Investment input */}
      <TextField
        label={`Amount in ${currency}`}
        variant="outlined"
        fullWidth
        value={investmentAmount}
        onChange={handleInvestmentChange}
        sx={{ marginBottom: "20px" }}
      />

      {/* Display calculated crypto amount */}
      {cryptoAmount > 0 && (
        <Typography variant="h6" sx={{ color: "black", marginBottom: "20px" }}>
          You can buy {cryptoAmount} {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} with your investment.
        </Typography>
      )}

      {/* Payment method selection */}
      <FormControl fullWidth sx={{ marginBottom: "20px" }}>
        <InputLabel>Payment Method</InputLabel>
        <Select value={paymentOption} onChange={handlePaymentChange} label="Payment Method">
          <MenuItem value="upi">UPI</MenuItem>
          <MenuItem value="bit_wallet">Bit Wallet</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
        </Select>
      </FormControl>

      {/* Buy button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleBuyCrypto}
        disabled={!investmentAmount || !paymentOption || cryptoAmount <= 0}
        sx={{ marginTop: "20px", padding: "14px", fontSize: "16px" }}
      >
        Buy {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)}
      </Button>

      {/* Payment success message */}
      {paymentSuccess && (
        <Typography variant="h6" sx={{ color: "green", marginTop: "20px" }}>
          Payment Successful! Your {cryptoAmount} {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} has been added to your balance.
        </Typography>
      )}
    </Box>
  );
};

export default BuyCryptoForm;
