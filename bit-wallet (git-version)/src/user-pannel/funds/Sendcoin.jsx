import React, { useEffect, useState } from 'react';

const SendCoin = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {


    const fetchWalletBalance = async (address) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/wallet/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        // const ethBalance = parseFloat(data.result) / 1e18;
        const ethBalance = data.balance;
        setBalance(ethBalance);
        setWalletAddress(data.walletAddress);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };

    // fetchWalletDetails();
    fetchWalletBalance();
  }, []);

  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/wallet/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          amount: amount,
          crypto_currency: "sepolia",
          receiver_wallet_address: recipient, 
          password: password,
          unit: "wei",
        }),
      });

      if (!response.ok) throw new Error('Send failed');

      const data = await response.json();
      setStatus(`Success: ${data.txHash}`);
    } catch (err) {
      console.error('Transaction failed:', err);
      setStatus('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="send-coin">
      <h2>Send Coin</h2>
      <p><strong>Your Wallet Address:</strong> {walletAddress || 'Loading...'}</p>
      <p><strong>Balance (ETH):</strong> {balance ?? 'Loading...'}</p>

      <div>
        <label>Recipient Address:</label><br />
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      </div>

      <div>
        <label>Amount (WEI):</label><br />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Password:</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button onClick={handleSend}>Send</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendCoin;
