import React, { useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { CryptoState } from "../../CryptoContext"; // Import context to access user data
import UserPanel from "../Userpannel";

const History = () => {
  const { transactions } = CryptoState(); // Access transactions from context
  const { userHoldings } = CryptoState(); // Access user holdings from context

  useEffect(() => {
    // You can replace the static transactions with dynamic ones from an API or database
    // For example: fetchTransactionHistory();
  }, [transactions]); // Add `transactions` to the dependency array to listen for updates

  return (
    <>
      <UserPanel />
      <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Transaction History
        </Typography>

        {/* Display the transaction table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Coin</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{userHoldings[transaction.coin]?.name || transaction.coin.toUpperCase()}</TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.price}</TableCell>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No transaction history available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default History;
