import React from "react";
import { motion } from "framer-motion";
import Imag1 from '../../assets/img/001.png';
import Imag2 from '../../assets/img/002.png';
import Imag3 from '../../assets/img/003.png';
import Imag4 from '../../assets/img/004.png';
import Imag5 from '../../assets/img/005.png';
import Imag6 from '../../assets/img/006.png';
import Imag7 from '../../assets/img/007.png';
import Imag8 from '../../assets/img/008.png';

const UserManual = () => {
  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto font-sans text-gray-800 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-5xl font-extrabold mb-10 text-center text-blue-800 tracking-tight">User Manual</h1>
      <p className="text-center text-lg mb-12 text-gray-600">Your guide to using the DeFi Web Application</p>

      {/* Introduction */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🔍 Introduction</h2>
        <p className="text-lg leading-relaxed">
          The DeFi Web Application empowers users to buy, sell, swap, and transfer Sepolia Ethereum using
          fiat currency in a secure, decentralized manner on the Ethereum Sepolia testnet.
        </p>
      </section>

     

      {/* Getting Started */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🛠 Getting Started</h2>
        <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
          <li>Open Browser, Search "https://Dracoshield.com"</li>
          <li>You will naviagate to our Landing page.</li>
          <li>Now you can see the three pages "Home, Live Crypto, Contact Us"</li>
        <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag1} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
          <li>Now you can register yourself by click on Get Started</li>
          <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag2} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
      <li>After login you will Navigate to the User Pannel Dashboard.</li>
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag3} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
        <li>Use the intuitive dashboard to buy, sell, swap, or transfer ETH</li>
         <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag4} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
      <li>You can buy a Crypto Currency</li>
       <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag5} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
      <li>You can Sell  a Crypto Currency</li>
       <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag6} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
      <li>You can transfer a Crypto Currency</li>
       <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag7} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
      <li>You can Manage the User Profile</li>
       <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">🖼 Just like that:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img src={Imag8} alt="Dashboard" className="rounded-xl shadow-xl hover:scale-105 transition-transform" />
        </div>
      </section>
        </ol>
      </section>

     

     

      {/* Support */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">📞 Support</h2>
        <p className="text-lg text-gray-700">
          Need help? Reach us at
          <a href="mailto:support@defiwebapp.com" className="text-blue-600 underline ml-1">wecodedragons@gmail.com</a>
        </p>
      </section>
    </motion.div>
  );
};

export default UserManual;
