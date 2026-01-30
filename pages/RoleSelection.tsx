import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { ArrowRight } from 'lucide-react';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { guestLogin } = useMarketplace();

  const handleBuyer = () => {
    guestLogin(); 
    navigate('/buyer');
  };

  const handleSeller = () => {
    navigate('/seller-login');
  };

  return (
    <div className="flex flex-col w-full pb-20 bg-[#2A1617]">
      {/* Hero Section */}
      <div className="w-full relative mb-4">
        <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden flex items-center justify-center bg-[#1a0d0e]">
             {/* Abstract Fire Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#2A1617] via-[#7A4B47] to-[#B32C1A] opacity-50"></div>
             <img 
               src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2400&auto=format&fit=crop" 
               alt="Hero Kicks" 
               className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
             />
             
             <div className="absolute bottom-10 left-8 md:bottom-20 md:left-20 p-4 z-10 max-w-4xl">
                 <p className="text-xl font-bold mb-2 text-[#FE7F42] uppercase tracking-widest">Verified Authentic</p>
                 <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none text-[#FFFB97] drop-shadow-lg">
                   IGNITE<br/>YOUR STYLE
                 </h1>
                 <div className="flex gap-4 flex-wrap">
                    <button 
                      onClick={handleBuyer}
                      className="bg-gradient-to-r from-[#FE7F42] to-[#B32C1A] text-[#FFFB97] border-none px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(254,127,66,0.4)] flex items-center gap-2"
                    >
                      Shop Now <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={handleSeller}
                      className="bg-transparent border-2 border-[#FFFB97] text-[#FFFB97] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFFB97] hover:text-[#2A1617] transition-colors"
                    >
                      Sell with Us
                    </button>
                 </div>
             </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 w-full">
        <h2 className="text-3xl font-bold mb-8 text-[#FFFB97] flex items-center gap-2">
           Choose Your Path <div className="h-1 bg-[#FE7F42] w-20 ml-4 rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={handleBuyer} className="cursor-pointer relative group h-[500px] overflow-hidden rounded-2xl border border-[#7A4B47] hover:border-[#FE7F42] transition-colors">
             <div className="absolute inset-0 bg-[#2A1617]"></div>
             <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#2A1617] to-transparent">
               <h3 className="text-[#FFFB97] text-3xl font-black uppercase italic mb-4">Buyers</h3>
               <p className="text-gray-300 mb-6">Cop the hottest drops. Verified and secure.</p>
               <button className="bg-[#FFFB97] text-[#2A1617] px-6 py-2 rounded-full font-bold hover:bg-[#FE7F42] transition-colors">Shop All</button>
             </div>
          </div>

          <div onClick={handleSeller} className="cursor-pointer relative group h-[500px] overflow-hidden rounded-2xl border border-[#7A4B47] hover:border-[#FE7F42] transition-colors">
             <div className="absolute inset-0 bg-[#2A1617]"></div>
             <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#2A1617] to-transparent">
               <h3 className="text-[#FFFB97] text-3xl font-black uppercase italic mb-4">Sellers</h3>
               <p className="text-gray-300 mb-6">Turn your heat into cash. Low fees, fast payouts.</p>
               <button className="bg-[#FFFB97] text-[#2A1617] px-6 py-2 rounded-full font-bold hover:bg-[#FE7F42] transition-colors">Join Now</button>
             </div>
          </div>

          <div onClick={handleSeller} className="cursor-pointer relative group h-[500px] overflow-hidden rounded-2xl border border-[#7A4B47] hover:border-[#FE7F42] transition-colors">
             <div className="absolute inset-0 bg-[#2A1617]"></div>
             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
             <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#2A1617] to-transparent">
               <h3 className="text-[#FFFB97] text-3xl font-black uppercase italic mb-4">Admin</h3>
               <p className="text-gray-300 mb-6">Manage the marketplace ecosystem.</p>
               <button className="bg-[#FFFB97] text-[#2A1617] px-6 py-2 rounded-full font-bold hover:bg-[#FE7F42] transition-colors">Portal</button>
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1a0d0e] border-t border-[#7A4B47] text-gray-400 py-12 px-6 mt-12">
         <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-bold uppercase tracking-tight">
             <div>
               <p className="mb-4 text-[#FFFB97]">Find a Store</p>
               <p className="mb-4 text-[#FFFB97]">Become a Member</p>
               <p className="mb-4 text-[#FFFB97]">Send Us Feedback</p>
             </div>
             <div className="font-normal normal-case">
               <p className="text-[#FE7F42] font-bold uppercase mb-4">Get Help</p>
               <p className="mb-2 hover:text-[#FFFB97] cursor-pointer">Order Status</p>
               <p className="mb-2 hover:text-[#FFFB97] cursor-pointer">Delivery</p>
               <p className="mb-2 hover:text-[#FFFB97] cursor-pointer">Returns</p>
             </div>
             <div className="font-normal normal-case">
               <p className="text-[#FE7F42] font-bold uppercase mb-4">About Deepxk</p>
               <p className="mb-2 hover:text-[#FFFB97] cursor-pointer">News</p>
               <p className="mb-2 hover:text-[#FFFB97] cursor-pointer">Careers</p>
               <p className="mb-2 hover:text-[#FFFB97] cursor-pointer">Investors</p>
             </div>
             <div className="font-normal normal-case">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#7A4B47] hover:bg-[#FE7F42] transition-colors"></div>
                  <div className="w-8 h-8 rounded-full bg-[#7A4B47] hover:bg-[#FE7F42] transition-colors"></div>
                  <div className="w-8 h-8 rounded-full bg-[#7A4B47] hover:bg-[#FE7F42] transition-colors"></div>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default RoleSelection;