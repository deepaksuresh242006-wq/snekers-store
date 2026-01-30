import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Navbar from './components/Navbar';
import RoleSelection from './pages/RoleSelection';
import BuyerHome from './pages/buyer/BuyerHome';
import Cart from './pages/buyer/Cart';
import Checkout from './pages/buyer/Checkout';
import SellerLogin from './pages/seller/SellerLogin';
import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <MarketplaceProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#2A1617] text-white flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/" element={<RoleSelection />} />

              {/* Buyer Routes */}
              <Route path="/buyer" element={<BuyerHome />} />
              <Route path="/buyer/cart" element={<Cart />} />
              <Route path="/buyer/checkout" element={<Checkout />} />

              {/* Seller Routes */}
              <Route path="/seller-login" element={<SellerLogin />} />
              <Route path="/seller" element={<SellerDashboard />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </MarketplaceProvider>
  );
};

export default App;