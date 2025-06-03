import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTx, setSelectedTx] = useState(null);

  const fetchRecentTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/wallet/recent", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch transactions");

      setWalletAddress(data.walletAddress);
      setTransactions(data.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  return (
    <>
      <Box sx={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
        {walletAddress && (
          <Typography variant="subtitle2" sx={{ marginBottom: "20px", fontSize: "30px" }}>
            Wallet Address: {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
          </Typography>
        )}

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
              <TableHead>
                <TableRow>
                  <TableCell>Txn Hash</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Amount (ETH)</TableCell>
                  <TableCell>Block</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Action</TableCell> {/* New column for button */}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <TableRow key={tx.hash}>
                      <TableCell>{tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}</TableCell>
                      <TableCell>{tx.from.slice(0, 6)}...{tx.from.slice(-4)}</TableCell>
                      <TableCell>{tx.to.slice(0, 6)}...{tx.to.slice(-4)}</TableCell>
                      <TableCell>{(Number(tx.value) / 1e18).toFixed(4)}</TableCell>
                      <TableCell>{tx.blockNumber}</TableCell>
                      <TableCell>{new Date(tx.timeStamp * 1000).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setSelectedTx(tx)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No recent transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTx} onClose={() => setSelectedTx(null)} fullWidth maxWidth="md">
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent dividers>
          {selectedTx && (
            <>
              <Typography><strong>Hash:</strong> {selectedTx.hash}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography><strong>From:</strong> {selectedTx.from}</Typography>
              <Typography><strong>To:</strong> {selectedTx.to}</Typography>
              <Typography><strong>Value:</strong> {(Number(selectedTx.value) / 1e18).toFixed(6)} ETH</Typography>
              <Typography><strong>Block Number:</strong> {selectedTx.blockNumber}</Typography>
              <Typography><strong>Gas:</strong> {selectedTx.gas}</Typography>
              <Typography><strong>Gas Price:</strong> {selectedTx.gasPrice}</Typography>
              <Typography><strong>Nonce:</strong> {selectedTx.nonce}</Typography>
              <Typography><strong>Timestamp:</strong> {new Date(selectedTx.timeStamp * 1000).toLocaleString()}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTx(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransactionHistory;
