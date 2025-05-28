import React, { useState } from "react";

function WithdrawForm({ onWithdraw }) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountNum = Number(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setMessage("Please enter a valid positive withdrawal amount.");
      return;
    }
    if (!accountNumber || !bankName) {
      setMessage("Please fill in all bank details.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          withdrawAmount: amountNum,
          bankDetails: {
            accountNumber,
            bankName,
          },
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Success! New balance: ${data.new_balance}`);
        setWithdrawAmount("");
        setAccountNumber("");
        setBankName("");
        if (onWithdraw) onWithdraw(data);
      } else {
        setMessage(`❌ Error: ${data.msg || "Unknown error"}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-white to-indigo-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Withdraw Funds</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Withdraw</label>
          <input
            type="number"
            step="0.01"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
            min="0.01"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="1234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="ABC Bank"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
        >
          Withdraw
        </button>

        {message && (
          <p className="text-sm text-center mt-2 text-red-600 whitespace-pre-wrap">{message}</p>
        )}
      </form>
    </div>
  );
}

export default WithdrawForm;
