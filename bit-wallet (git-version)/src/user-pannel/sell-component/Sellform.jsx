import React, { useState, useEffect } from "react";
import axios from "axios";

const SellCryptoForm = () => {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("ether");
  const [cryptoCurrency, setCryptoCurrency] = useState("Sepolia");
  const [password, setPassword] = useState("");
  const [ethUsdAtInitiation, setEthUsdAtInitiation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState(null);
  const [usdReceived, setUsdReceived] = useState(null);

  // Fetch current ETH price on mount
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "ethereum",
              vs_currencies: "usd",
            },
          }
        );
        setEthUsdAtInitiation(response.data.ethereum.usd);
      } catch (err) {
        console.error("Failed to fetch ETH price:", err);
        setError("Failed to load ETH price. Please try refreshing the page.");
      }
    };
    fetchEthPrice();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setTxHash(null);
    setUsdReceived(null);

    if (!amount || !unit || !cryptoCurrency || !password || !ethUsdAtInitiation) {
      setError("Please fill all fields and ensure ETH price is loaded.");
      return;
    }

    if (cryptoCurrency.toLowerCase() !== "sepolia") {
      setError("Only Sepolia ETH is supported.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to perform this transaction.");
        setLoading(false);
        return;
      }

      // API call to backend sellCrypto endpoint
      const res = await axios.post(
        "http://localhost:5000/api/wallet/sell",
        {
          amount,
          unit,
          crypto_currency: cryptoCurrency,
          password,
          ethUsdAtInitiation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTxHash(res.data.txHash);
      setUsdReceived(res.data.usdReceived);
    } catch (err) {
      console.error("Sell crypto error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Sell Sepolia ETH</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>
            Amount:
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ marginLeft: 10, padding: 5, width: "70%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Unit:
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{ marginLeft: 10, padding: 5 }}
            >
              <option value="wei">wei</option>
              <option value="gwei">gwei</option>
              <option value="ether">ether</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Crypto Currency:
            <input
              type="text"
              value={cryptoCurrency}
              readOnly
              style={{
                marginLeft: 10,
                padding: 5,
                backgroundColor: "#eee",
                cursor: "not-allowed",
                width: "70%",
              }}
            />
          </label>
          <small>Only Sepolia ETH supported</small>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Password (to decrypt private key):
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginLeft: 10, padding: 5, width: "70%" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            ETH Price at Initiation (USD):
            <input
              type="number"
              step="0.01"
              value={ethUsdAtInitiation ?? ""}
              readOnly
              style={{
                marginLeft: 10,
                padding: 5,
                backgroundColor: "#eee",
                cursor: "not-allowed",
                width: "70%",
              }}
            />
          </label>
          <small>Fetched from CoinGecko on page load</small>
        </div>

        <button
          type="submit"
          disabled={loading || ethUsdAtInitiation === null}
          style={{
            padding: "10px 20px",
            backgroundColor: loading ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Sell Crypto"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: 15 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {txHash && (
        <div style={{ marginTop: 15, color: "green" }}>
          <p>Transaction successful!</p>
          <p>
            Tx Hash:{" "}
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {txHash}
            </a>
          </p>
          <p>USD Received: ${usdReceived}</p>
        </div>
      )}
    </div>
  );
};

export default SellCryptoForm;
