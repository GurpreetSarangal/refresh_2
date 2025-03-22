import React, { useState } from 'react';
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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  });
  const navigate = useNavigate();

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

  const URL = "http://localhost:5000/api/auth/login";


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const responseData = await response.json();
      console.log("after logout: ", responseData);

      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem("token", responseData.token);

        // Navigate to home page after login
        setTimeout(() => navigate(""), 500);
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
      case 'add-funds':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Add Funds</h2>
              <div className="space-y-4">
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        );

      case 'withdraw':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Withdraw Amount</h2>
              <div className="space-y-4">
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Withdrawal Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="bank">Bank Account</option>
                    <option value="paypal">PayPal</option>
                    <option value="crypto">Crypto Wallet</option>
                  </select>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={profileData.imageUrl} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <p className="text-gray-500">{profileData.email}</p>
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
              </div>
            </div>
          </div>
        );
      
      case 'balance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Total Balance</h2>
              <div className="text-3xl font-bold text-indigo-600">$24,532.21</div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Available Balance</h3>
                  <p className="text-2xl font-bold">$22,123.45</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">Locked Balance</h3>
                  <p className="text-2xl font-bold">$2,408.76</p>
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
              <div className="space-y-4">
                {[
                  { type: 'Buy', crypto: 'Bitcoin', amount: '0.05 BTC', value: '$2,341.23', date: '2024-03-15', status: 'Completed' },
                  { type: 'Sell', crypto: 'Ethereum', amount: '1.5 ETH', value: '$4,562.10', date: '2024-03-14', status: 'Completed' },
                  { type: 'Transfer', crypto: 'USDT', amount: '500 USDT', value: '$500.00', date: '2024-03-13', status: 'Pending' },
                  { type: 'Swap', crypto: 'BTC to ETH', amount: '0.02 BTC', value: '$912.45', date: '2024-03-12', status: 'Completed' },
                ].map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{tx.type} {tx.crypto}</div>
                      <div className="text-sm text-gray-500">{tx.date}</div>
                    </div>
                    <div className="text-right">
                      <div>{tx.amount}</div>
                      <div className={`text-sm ${tx.status === 'Completed' ? 'text-green-600' : 'text-orange-500'}`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                  <span className="text-2xl font-bold">$24,532.21</span>
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
                  <span className="text-2xl font-bold">-$421.50</span>
                  <span className="ml-2 text-red-500 flex items-center">
                    <ArrowDownRight size={16} />
                    1.2%
                  </span>
                </div>
              </div>

              {/* Assets Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm">Total Assets</h3>
                <div className="mt-2">
                  <span className="text-2xl font-bold">5</span>
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
          </>
        );
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
              <img 
                src={profileData.imageUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
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
                <Bell size={20} />
              </button>
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="relative group"
              >
                <img 
                  src={profileData.imageUrl}
                  alt="User" 
                  className="w-8 h-8 rounded-full ring-2 ring-transparent group-hover:ring-indigo-500 transition-all"
                />
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
      {isProfileOpen && <ProfileEdit />}
    </div>
  );
}

export default App;