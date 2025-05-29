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

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
          params: { ids: "ethereum", vs_currencies: "usd" },
        });
        setEthUsdAtInitiation(response.data.ethereum.usd);
      } catch (err) {
        console.error("Failed to fetch ETH price:", err);
        setError("Failed to load ETH price. Please try refreshing.");
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

      const res = await axios.post(
        "http://localhost:5000/api/wallet/sell",
        { amount, unit, crypto_currency: cryptoCurrency, password, ethUsdAtInitiation },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res && res.data) {
        setTxHash(res.data.txHash || "");
        setUsdReceived(res.data.usdReceived || 0);
      } else {
        setError("Unexpected server response.");
      }
    } catch (err) {
      console.error("Sell crypto error:", err);
      setError(err?.response?.data?.message || err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sell Sepolia ETH</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <FormField label="Amount" type="number" value={amount} onChange={setAmount} required />
        <SelectField label="Unit" value={unit} onChange={setUnit} options={["wei", "gwei", "ether"]} />
        <FormField label="Crypto Currency" value={cryptoCurrency} readOnly note="Only Sepolia ETH supported" />
        <FormField label="Password (decrypt key)" type="password" value={password} onChange={setPassword} required />
        <FormField
          label="ETH Price (USD)"
          type="number"
          value={ethUsdAtInitiation ?? ""}
          readOnly
          note="Fetched from CoinGecko"
        />

        <button type="submit" disabled={loading || ethUsdAtInitiation === null} style={styles.button(loading)}>
          {loading ? "Processing..." : "Sell Crypto"}
        </button>
      </form>

      {error && <p style={styles.error}>⚠ {error}</p>}
      {txHash && (
        <div style={styles.success}>
          <p>✅ Transaction successful!</p>
          <p>
            Tx Hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
              {txHash}
            </a>
          </p>
          <p>USD Received: <strong>${usdReceived}</strong></p>
        </div>
      )}
    </div>
  );
};

// ========== Reusable Subcomponents ==========

const FormField = ({ label, type = "text", value, onChange, required = false, readOnly = false, note }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input
      type={type}
      value={value}
      required={required}
      readOnly={readOnly}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      style={{ ...styles.input, backgroundColor: readOnly ? "#f3f4f6" : "white", cursor: readOnly ? "not-allowed" : "text" }}
    />
    {note && <small style={styles.note}>{note}</small>}
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={styles.select}>
      {options.map((opt) => (
        <option value={opt} key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

// ========== Styles ==========

const styles = {
  container: {
    maxWidth: 480,
    margin: "auto",
    padding: 24,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "1.6rem",
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.95rem",
    marginBottom: 4,
    color: "#222",
  },
  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  select: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  note: {
    fontSize: "0.8rem",
    color: "#666",
    marginTop: 4,
  },
  button: (loading) => ({
    padding: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: loading ? "#ccc" : "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: loading ? "not-allowed" : "pointer",
    transition: "0.3s",
  }),
  error: {
    marginTop: 20,
    color: "#dc2626",
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 6,
  },
  success: {
    marginTop: 20,
    color: "#16a34a",
    backgroundColor: "#dcfce7",
    padding: 12,
    borderRadius: 6,
  },
};

export default SellCryptoForm;
