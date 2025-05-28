import React, { useEffect, useState } from 'react';

const SendCoin = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [balanceWei, setBalanceWei] = useState(null);
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
        setBalanceWei(data.balance_in_wei);
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
   <div className="flex justify-center items-center min-h-screen  px-4">
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg space-y-6">
    <h2 className="text-2xl font-bold text-center ">Send Coin</h2>

    <div>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Your Wallet Address:</span><br />
        <span className="break-words">{walletAddress || 'Loading...'}</span>
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Balance (WEI):</span> {balanceWei ?? 'Loading...'}
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="0xABC..."
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (WEI)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="e.g. 1000000000000000000"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your password"
      />
    </div>

    <button
      onClick={handleSend}
      className="w-full border border-indigo-500 text-indigo-600 font-semibold py-2 rounded-md hover:bg-indigo-50 transition"
    >
      Send
    </button>

    {status && (
      <div className="mt-4 text-sm font-medium text-center text-red-600 whitespace-pre-wrap">
        {status}
      </div>
    )}
  </div>
</div>

  );
};

export default SendCoin;
export async function getBalanceWei() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/wallet/balance', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.balance_in_wei;  // This is balanceWei
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return null;
  }
}
