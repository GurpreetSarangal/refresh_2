import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { 
  Wallet, 
  LineChart, 
  CirclePower,
  Settings, 
  Bell, 
  ArrowUpRight, 
  ArrowDownRight,
  Menu,
  X,
  User,
  Camera,
  CreditCard,
  DollarSign,
  Repeat,
  SendHorizontal,
  CircleUser,
  Coins,
  History,
  ChevronDown,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import BuyCryptoForm from '../user-pages/Buyform';
import SellCryptoForm from '../sell-component/Sellform';
import Swap from '../../pages/swapcoin/Swapcomp';
import SendCoin from '../funds/Sendcoin';
import TransactionHistory from '../history/History';
import WalletOverview from '../overview/walletoverview';
import WithdrawalFait from '../widthral/Withdrawal-fait';

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');






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
//add funds
  const handleAddFunds = async (e) => {
    e.preventDefault();
    setLoading1(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token'); // Ensure your auth token is saved here

      const response = await fetch('http://localhost:5000/api/wallet/add-funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Success! New Balance: $${data.new_balance}`);
        setAmount('');
      } else {
        setMessage(`❌ ${data.msg}`);
      }
    } catch (error) {
      setMessage('❌ Server error while adding funds.');
    } finally {
      setLoading(false);
    }
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'add-funds':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Add Funds</h2>
              <div className="space-y-4">
                <div className="max-w-md mx-auto space-y-4">
                  <form onSubmit={handleAddFunds} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (USD)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* New Payment Method Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="" disabled>
                          Select a payment method
                        </option>
                        <option value="Paypal">Paypal</option>
                        <option value="UPI">UPI</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      {loading ? 'Processing...' : 'Add Funds'}
                    </button>
                  </form>
                  {message && (
                    <p className={`font-semibold ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'withdraw':
        return (
        <>
        <WithdrawalFait/>
        </>
        );

      case 'profile':
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4">
          
          <div>
           <h2 className="text-2xl font-bold"><strong>Username:</strong> {user?.username || "N/A"}</h2>
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
            <p className="text-indigo-600 font-bold text-xl">${user?.fiat_balance ? Number(user.fiat_balance).toFixed(2) : "0.00"}</p>
          </div>
        </div>
      </div>
    </div>
  );

      
      case 'balance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Total Balance</h2>
              <div className="text-3xl font-bold text-indigo-600">${user?.fiat_balance ? Number(user.fiat_balance).toFixed(2) : "0.00"}</div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Available Balance</h3>
                  <p className="text-2xl font-bold">${user?.fiat_balance ? Number(user.fiat_balance).toFixed(2) : "0.00"}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Locked Balance</h3>
                  <p className="text-2xl font-bold">$28.76</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
              <TransactionHistory/>
             
            </div>
          </div>
        ); 
      
      case 'buy':
        return (<> <BuyCryptoForm /> </>)
      
      case 'sell':
        return (<> <SellCryptoForm /> </>);
      
      case 'swap':
        return (<> <Swap /> </>);
      
      case 'transfer':
        return (<><SendCoin /> </>);
      
      case 'logout':
        return (<> 
        
        <div className="flex items-center justify-center ">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Logout</h2>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          
          <form onSubmit={handleLogout} method="post">

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                <h5 className="text-2xl font-bold">Do you really want to logout?</h5>
                </div>
                
                <div>
                  
                  <input
                    type="email"
                    hidden
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  
                  <input
                    type="tel"
                    hidden
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button 
                // onClick={() => setIsProfileOpen(false)}
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Logout  
              </button>
          </form>
        </div>
      </div>
    </div>
        
         </>);
      
      case 'settings':
        return (<></>);

      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Portfolio Value Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm">Portfolio Value</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-2xl font-bold">${user?.fiat_balance ? Number(user.fiat_balance).toFixed(2) : "0.00"}</span>
                  <span className="ml-2 text-green-500 flex items-center">
                    <ArrowUpRight size={16} />
                    2.3%
                  </span>
                </div>
              </div>

              {/* 24h Change Card */} 
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm">24h Change</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-2xl font-bold">-$11.50</span>
                  <span className="ml-2 text-green-500 flex items-center">
                    <ArrowUpRight size={16} />
                    1.2%
                  </span>
                </div>
              </div>

              {/* Assets Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm">Total Assets</h3>
                <div className="mt-2">
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-gray-500 ml-2">cryptocurrencies</span>
                </div>
              </div>
            </div>

            {/* Assets List */}
            <div className="mt-8 bg-white rounded-xl shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold">Your Assets</h2>
                <div className="mt-4 space-y-4">
                  {[
                    { name: 'Bitcoin', symbol: 'BTC', value: '$16,432.12', change: '+1.2%', amount: '0.354 BTC' },
                    { name: 'Ethereum', symbol: 'ETH', value: '$5,321.45', change: '-0.8%', amount: '2.154 ETH' },
                    { name: 'Cardano', symbol: 'ADA', value: '$2,143.78', change: '+3.1%', amount: '1,432 ADA' },
                  ].map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">{asset.name}</h3>
                        <span className="text-gray-500 text-sm">{asset.amount}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{asset.value}</div>
                        <span className={asset.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {asset.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <WalletOverview/> */}
          </>
        );
    }
  };

 

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 hidden md:block`}>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8">
            <Wallet className="text-indigo-600" size={24} />
            {isSidebarOpen && <span className="font-bold text-xl">CryptoPanel</span>}
          </div>
          
          <nav className="space-y-2">
            {/* Dashboard Dropdown */}
            <div className="space-y-1">
              <button 
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 ${
                  dashboardItems.some(item => item.id === activeTab) ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  <LineChart size={20} />
                  {isSidebarOpen && <span>Dashboard</span>}
                </div>
                {isSidebarOpen && (
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform ${isDashboardOpen ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>
              
              {isDashboardOpen && isSidebarOpen && (
                <div className="pl-8 space-y-1">
                  {dashboardItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-2 p-2 rounded-lg ${
                        activeTab === item.id 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other Navigation Items */}
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

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
               <User size={30} className='text-blue-500'/>
             <h1> {user?.username || "N/A"}</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

    
    </div>
  );
}

export default Profile;