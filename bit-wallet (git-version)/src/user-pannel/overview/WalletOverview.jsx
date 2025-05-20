import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const WalletOverview = () => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/wallet/overview", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch overview data");

      const data = await res.json();
      setUser(data.user);
      setWallet(data.wallet);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user || !wallet) return <p>No data available</p>;

  return (
    <>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio Value */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Portfolio Value</h3>
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold">
              ${user.fiat_balance?.toFixed(2) || "0.00"}
            </span>
            <span className="ml-2 text-green-500 flex items-center">
              <ArrowUpRight size={16} />
              {(wallet.change24hPercent ?? 0)}%
            </span>
          </div>
        </div>

        {/* 24h Change */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">24h Change</h3>
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold">
              {wallet.change24h >= 0 ? "+" : "-"}${Math.abs(wallet.change24h).toFixed(2)}
            </span>
            <span
              className={`ml-2 flex items-center ${
                wallet.change24hPercent >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {wallet.change24hPercent >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {Math.abs(wallet.change24hPercent)}%
            </span>
          </div>
        </div>

        {/* Total Assets */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Assets</h3>
          <div className="mt-2">
            <span className="text-2xl font-bold">{wallet.assets?.length || 0}</span>
            <span className="text-gray-500 ml-2">cryptocurrencies</span>
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="mt-6 text-sm text-gray-500">
        Wallet Address: <span className="font-mono">{user.wallet_address}</span>
      </div>

      {/* Assets List */}
      <div className="mt-8 bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Your Assets</h2>
          <div className="mt-4 space-y-4">
            {wallet.assets?.length > 0 ? (
              wallet.assets.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{asset.name}</h3>
                    <span className="text-gray-500 text-sm">
                      {asset.amount} {asset.symbol}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${asset.value.toFixed(2)}</div>
                    <span className={asset.change >= 0 ? "text-green-500" : "text-red-500"}>
                      {asset.change >= 0 ? "+" : ""}
                      {asset.change}%
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No assets available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletOverview;
