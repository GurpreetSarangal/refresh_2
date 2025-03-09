import { useEffect, useState } from "react";
import axios from "axios";
import UserPanel from "../Userpannel";
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, TextField
} from "@mui/material";
import { CryptoState } from "../../CryptoContext"; // Context for user holdings

const MyBalance = () => {
  const { currency, symbol, userHoldings, walletBalance, setWalletBalance, setUserHoldings } = CryptoState();  
  const [holdingsData, setHoldingsData] = useState([]); // Market data for user holdings
  const [addMoney, setAddMoney] = useState(""); // Amount to add to wallet
  const [paymentMethod, setPaymentMethod] = useState(""); // Payment method
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch market prices for user's holdings
  const fetchHoldingsData = async () => {
    if (Object.keys(userHoldings).length === 0) return;
    setLoading(true);
    try {
      const coinIds = Object.keys(userHoldings).join(",");
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: { vs_currency: currency, ids: coinIds },
      });
      setHoldingsData(data);
      setError(""); // Reset error on success
    } catch (error) {
      console.error("Error fetching holdings data:", error);
      setError("Failed to load holdings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldingsData();
  }, [currency, walletBalance, userHoldings]); // ✅ Refetch when userHoldings update

  return (
    <>
      <div>
        <UserPanel />
      </div>
      <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto", borderRadius: "8px" }}>
        <Typography variant="h4" sx={{ color: "black", marginBottom: "20px" }}>My Balance</Typography>

        {/* Wallet Balance */}
        <Typography variant="h6" sx={{ color: "black", marginBottom: "20px" }}>
          Wallet Balance: {symbol} {walletBalance.toFixed(2)}
        </Typography>

        {/* User Holdings Table */}
        <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
              ) : holdingsData.length > 0 ? (
                holdingsData.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell>{coin.name} ({coin.symbol.toUpperCase()})</TableCell>
                    <TableCell>{userHoldings[coin.id]?.quantity.toFixed(6)}</TableCell>
                    <TableCell>{symbol} {coin.current_price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleCoinSale(coin.id, 1)} // Example of handling sale
                      >
                        Sell
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={4}>No coins purchased yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Funds to Wallet */}
        <TextField
          label="Add Funds to Wallet"
          variant="outlined"
          fullWidth
          value={addMoney}
          onChange={(e) => setAddMoney(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        
        {/* Payment Method Selection */}
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Payment Method</InputLabel>
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label="Payment Method">
            <MenuItem value="upi">UPI</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
          </Select>
        </FormControl>

        {/* Add Funds Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!addMoney || !paymentMethod}
          onClick={() => handleAddFunds()}
          sx={{ marginTop: "20px", padding: "14px", fontSize: "16px" }}
        >
          Add Funds
        </Button>
      </Box>
    </>
  );
};

export default MyBalance;
