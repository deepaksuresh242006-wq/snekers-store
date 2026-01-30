import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { VerifiedBadge } from '../../components/VerifiedBadge';

const AdminDashboard: React.FC = () => {
  const { sellers, verifySeller } = useMarketplace();

  const pendingSellers = sellers.filter(s => !s.isVerified);
  const verifiedSellers = sellers.filter(s => s.isVerified);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 text-gray-200">
      <div className="mb-12">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-[#FFFB97] italic">Admin Portal</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Pending Approvals */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#FE7F42]">
            Pending Applications <span className="text-[#7A4B47] text-sm">({pendingSellers.length})</span>
          </h2>
          
          <div className="space-y-4">
            {pendingSellers.length > 0 ? (
                pendingSellers.map(seller => (
                  <div key={seller.id} className="p-6 bg-[#1a0d0e] border border-[#7A4B47] rounded-lg">
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-white">{seller.businessName}</h3>
                      <p className="text-sm text-[#7A4B47]">{seller.name} • {seller.joinedDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => verifySeller(seller.id)}
                        className="fire-btn px-4 py-2 text-sm text-[#2A1617]"
                      >
                        Approve
                      </button>
                      <button className="border border-[#7A4B47] text-[#FFFB97] px-4 py-2 rounded-full text-sm font-bold hover:border-[#FE7F42] transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-[#7A4B47]">No pending requests.</p>
            )}
          </div>
        </div>

        {/* Verified List */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#FE7F42]">
            Verified Sellers <span className="text-[#7A4B47] text-sm">({verifiedSellers.length})</span>
          </h2>
          
          <div className="space-y-2">
            {verifiedSellers.map(seller => (
              <div key={seller.id} className="p-4 bg-[#1a0d0e] border border-[#7A4B47] rounded flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#FE7F42] text-[#2A1617] flex items-center justify-center font-bold text-xs border border-[#FFFB97]">
                     {seller.businessName.charAt(0)}
                   </div>
                   <div>
                     <div className="flex items-center gap-1">
                       <span className="font-bold text-sm text-white">{seller.businessName}</span>
                       <VerifiedBadge size={14} showText={false} />
                     </div>
                   </div>
                 </div>
                 <span className="text-xs font-bold uppercase text-[#FFFB97]">Active</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;