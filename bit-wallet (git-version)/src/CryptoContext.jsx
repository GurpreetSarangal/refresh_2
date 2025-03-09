import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [walletBalance, setWalletBalance] = useState(50000); // Default 50,000 INR for testing

  // Default demo user holdings (ETH & ADA)
  const [userHoldings, setUserHoldings] = useState({
    ethereum: { name: "Ethereum", symbol: "ETH", quantity: 2, buyPrice: 2800 },
    cardano: { name: "Cardano", symbol: "ADA", quantity: 12, buyPrice: 1.2 },
  });

  // Transaction history state
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  // Function to add a new transaction to the history
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  return (
    <Crypto.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        walletBalance,
        setWalletBalance,
        userHoldings,
        setUserHoldings,
        transactions,
        addTransaction, // Expose the function to add transactions
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};
