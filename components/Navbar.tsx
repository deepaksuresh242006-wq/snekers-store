import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ShoppingBag, Search, Heart, ShieldCheck, Menu } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { currentUser, logout, cart } = useMarketplace();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const isSale = searchParams.get('sale');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getLinkClass = (category?: string, sale?: boolean) => {
    const isActive = sale ? isSale === 'true' : currentCategory === category && !isSale;
    return isActive 
      ? "text-[#FE7F42] transition-colors"
      : "hover:text-[#FFFB97] transition-colors";
  };

  return (
    <header className="flex flex-col w-full relative z-50 font-sans border-b border-[#7A4B47]">
      {/* Top Utility Bar */}
      <div className="bg-[#1a0d0e] text-[#FFFB97] text-xs font-medium py-2 px-8 flex justify-between items-center hidden md:flex">
        <div className="flex gap-4">
          <Link to="/seller-login" className="hover:text-[#FE7F42] transition-colors">Join Us</Link>
          <Link to="/admin" className="hover:text-[#FE7F42] transition-colors">Help</Link>
        </div>
        <div className="flex gap-4">
           {currentUser ? (
              <div className="flex gap-4 items-center">
                <span>Hi, {currentUser.name}</span>
                <span className="cursor-pointer hover:text-[#FE7F42]" onClick={handleLogout}>Sign Out</span>
              </div>
           ) : (
              <div className="flex gap-4">
                <Link to="/seller-login" className="hover:text-[#FE7F42]">Sign In</Link>
              </div>
           )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#2A1617] h-20 px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity group">
           <ShieldCheck size={32} className="text-[#FE7F42] group-hover:text-[#FFFB97] transition-colors" strokeWidth={2} />
           <span className="font-black text-2xl tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-[#FFFB97] via-[#FE7F42] to-[#B32C1A]">
             Deepxk
           </span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-base text-gray-200">
          <Link to="/buyer" className={getLinkClass(undefined, false)}>New & Featured</Link>
          <Link to="/buyer?category=Men" className={getLinkClass('Men')}>Men</Link>
          <Link to="/buyer?category=Women" className={getLinkClass('Women')}>Women</Link>
          <Link to="/buyer?category=Kids" className={getLinkClass('Kids')}>Kids</Link>
          <Link to="/buyer?sale=true" className={getLinkClass(undefined, true)}>Sale</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-[#7A4B47]" />
            </div>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-[#1a0d0e] text-[#FFFB97] border border-[#7A4B47] rounded-full py-2 pl-10 pr-4 w-44 focus:outline-none focus:border-[#FE7F42] placeholder-[#7A4B47] transition-colors"
            />
          </div>

          <button className="p-2 hover:bg-[#7A4B47]/30 rounded-full transition-colors hidden sm:block text-[#FFFB97]">
            <Heart size={24} strokeWidth={1.5} />
          </button>

          <Link to="/buyer/cart" className="p-2 hover:bg-[#7A4B47]/30 rounded-full transition-colors relative text-[#FFFB97]">
            <ShoppingBag size={24} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 text-[10px] font-bold bg-[#FE7F42] text-[#2A1617] h-5 w-5 flex items-center justify-center rounded-full border border-[#2A1617]">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="md:hidden">
            <button className="p-2 text-[#FFFB97]">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4 bg-[#2A1617]">
        <div className="relative">
           <Search size={18} className="absolute left-3 top-2.5 text-[#7A4B47]" />
           <input 
             type="text" 
             placeholder="Search products" 
             className="w-full bg-[#1a0d0e] border border-[#7A4B47] text-[#FFFB97] rounded-full py-2 pl-10 pr-4 outline-none placeholder-[#7A4B47]"
           />
        </div>
      </div>
    </header>
  );
};

export default Navbar;