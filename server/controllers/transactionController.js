const TransactionHistory = require('../models/transactionHistory');

// Function to create a new transaction
async function createTransaction(userId, transactionType, amount, currency) {
  try {
    // Generate a unique transaction ID (using current timestamp for simplicity)
    const transactionId = `txn_${Date.now()}`;

    // Create a new transaction document
    const transaction = new TransactionHistory({
      userId,
      transactionType, // deposit, withdrawal, crypto_transfer, etc.
      amount,
      currency,
      transactionId,
      status: 'pending',  // Status can be 'pending', 'completed', 'failed'
    });

    // Save the transaction to the database
    await transaction.save();
    
    console.log("Transaction recorded successfully:", transaction);
    return transaction;
  } catch (err) {
    console.error("Error saving transaction:", err);
    throw new Error("Transaction failed to save");
  }
}

module.exports = { createTransaction };
