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

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




   const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    walletAddress: '',
    fiatBalance: 0.00
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/wallet/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await res.json();
        setUser(data.user);
        setWallet(data.wallet);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;


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

  // Updated logout API endpoint
  const LOGOUT_URL = "http://localhost:5000/api/auth/logout";

  const handleLogout = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ email: profileData.email }) // if needed
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (err) {
      // If JSON parsing fails, just fallback to text (likely an HTML error page)
      const text = await response.text();
      console.error("Non-JSON response:", text);
      throw new Error("Logout failed due to server error");
    }

    if (response.ok) {
      localStorage.removeItem("token");
      setTimeout(() => navigate("/"), 500);
    } else {
      alert(responseData.message || "Logout failed. Please try again.");
    }
  } catch (error) {
    console.log("Logout Error:", error);
    alert("Something went wrong. Please check your network and try again.");
  }
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
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          
          <div>
           <h2 className="text-2xl font-bold"><strong>Name:</strong> {user?.username || "N/A"}</h2>
          <p className="text-gray-500"><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p className="text-gray-500"><strong>Phone Number:</strong> {user?.phone_number || "N/A"}</p>

          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Account Status</h3>
            <p className="text-green-600">Verified</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Member Since</h3>
            <p>January 2024</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Wallet Address</h3>
            <p className="break-all">{user?.accounts?.[0]?.wallet_address || "N/A"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Fiat Balance (USD)</h3>
            <p className="text-indigo-600 font-bold text-xl">{wallet?.balance ? Number(wallet.balance).toFixed(4) : "0.0000"} ETH</p>
          </div>
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

  const ProfileEdit = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button 
            onClick={() => setIsProfileOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">
             
              <button className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full text-white hover:bg-indigo-700">
                <Camera size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Click the camera icon to update photo</p>
          </div>

          {/* Form Fields */} 
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <button 
            onClick={() => setIsProfileOpen(false)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

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
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:block"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
              </button>
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="relative group"
              >
               
                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Profile Edit Modal */}
      {/* {isProfileOpen && <ProfileEdit />} */}
    </div>
  );
}

export default Profile;