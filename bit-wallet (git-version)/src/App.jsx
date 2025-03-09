import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Crypto from "./pages/crypto/Crypto";
import Support from "./pages/Support";
import Login from "./pages/Forms/Login";
import Signup from "./pages/Forms/Signup";
import CoinPage from "./pages/CoinPage";
import UserPanel from "./user-pannel/Userpannel";
import Buy from "./user-pannel/user-pages/Buy";
import Sell from "./user-pannel/user-pages/Sell";
import Swap from "./user-pannel/user-pages/Swap";
import Transfer from "./user-pannel/user-pages/Transfer";
import Mybalance from "./user-pannel/balance/Mybalance";
import History from "./user-pannel/history/History"; 



const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

const MainLayout = () => {
  const location = useLocation();
  
  // Routes where the navbar should be hidden
  const hideNavbarRoutes = [
    "/user-pannel",
    "/buy",
    "/sell",
    "/swap",
    "/transfer",
    "/mybalance",
    "/history",
  ];

  return (
    <div>
      {/* Hide Navbar on specified routes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <div style={{ padding: "20px" }}> {/* Ensures content is visible */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/support" element={<Support />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/user-pannel" element={<UserPanel />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/mybalance" element={<Mybalance />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
