import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  LineChart, CirclePower, CircleUser, Coins, History, CreditCard,
  DollarSign, Repeat, SendHorizontal, Settings, PlusCircle, MinusCircle, X
} from 'lucide-react';

import BuyCryptoForm from '../user-pages/Buyform';
import SellCryptoForm from '../sell-component/Sellform';
import Swap from '../../pages/swapcoin/Swapcomp';
import SendCoin from '../funds/Sendcoin';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch('http://localhost:5000/api/wallet/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const dashboardItems = [
    { id: 'dashboard', icon: LineChart, label: 'Overview' },
    { id: 'add-funds', icon: PlusCircle, label: 'Add Funds' },
    { id: 'withdraw', icon: MinusCircle, label: 'Withdraw Amount' },
    { id: 'logout', icon: CirclePower, label: 'Logout' },
  ];

  const navItems = [
    { id: 'profile', icon: CircleUser, label: 'My Profile' },
    { id: 'balance', icon: Coins, label: 'My Balance' },
    { id: 'transactions', icon: History, label: 'Recent Transactions' },
    { id: 'buy', icon: CreditCard, label: 'Buy Crypto' },
    { id: 'sell', icon: DollarSign, label: 'Sell Crypto' },
    { id: 'swap', icon: Repeat, label: 'Swap Crypto' },
    { id: 'transfer', icon: SendHorizontal, label: 'Transfer Crypto' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold">Welcome back, {profileData.name || 'User'}!</h2>
            <p className="text-gray-600 mt-2">Your crypto dashboard overview.</p>
          </div>
        );
      case 'add-funds':
      case 'withdraw':
      case 'profile':
      case 'balance':
      case 'transactions':
      case 'buy':
      case 'sell':
      case 'swap':
      case 'transfer':
      case 'logout':
        return renderTabContent(activeTab);
      default:
        return <div className="p-6">Select a tab</div>;
    }
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case 'add-funds':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Add Funds</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Amount</label>
                <input type="number" className="w-full border rounded px-3 py-2" placeholder="0.00" />
              </div>
              <div>
                <label className="block mb-1">Payment Method</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Credit Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded">Add Funds</button>
            </form>
          </div>
        );
      case 'withdraw':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Withdraw Amount</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Amount</label>
                <input type="number" className="w-full border rounded px-3 py-2" placeholder="0.00" />
              </div>
              <div>
                <label className="block mb-1">Method</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Bank Account</option>
                  <option>Crypto Wallet</option>
                </select>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded">Withdraw</button>
            </form>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <img src={profileData.imageUrl} alt="Profile" className="w-20 h-20 rounded-full" />
              <div>
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <p className="text-gray-500">{profileData.email}</p>
              </div>
            </div>
          </div>
        );
      case 'balance':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Balance</h2>
            <p className="text-3xl font-bold text-indigo-600">$24,532.21</p>
          </div>
        );
      case 'transactions':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            {/* Placeholder for transactions */}
          </div>
        );
      case 'buy':
        return <BuyCryptoForm />;
      case 'sell':
        return <SellCryptoForm />;
      case 'swap':
        return <Swap />;
      case 'transfer':
        return <SendCoin />;
      case 'logout':
        return (
          <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Logout</h2>
              <button onClick={() => setActiveTab('dashboard')}><X /></button>
            </div>
            <p>Are you sure you want to logout, {profileData.name}?</p>
            <form onSubmit={handleLogout} className="mt-4 space-y-4">
              <input type="hidden" value={profileData.email} />
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-64 bg-white shadow-lg p-4 space-y-6">
          <div className="text-xl font-bold">Crypto Dashboard</div>
          <div>
            {dashboardItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded ${activeTab === id ? 'bg-gray-200' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <hr />
          <div>
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded ${activeTab === id ? 'bg-gray-200' : ''}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600">
            ☰
          </button>
          <div className="font-medium">{profileData.name || 'User'}</div>
        </div>
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
