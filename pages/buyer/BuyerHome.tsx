import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { VerifiedBadge } from '../../components/VerifiedBadge';
import { Filter, ChevronDown, Flame, ShoppingBag } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const BuyerHome: React.FC = () => {
  const { products, getSellerById, addToCart } = useMarketplace();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get('category');
  const saleParam = searchParams.get('sale');

  // Filters State
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  
  useEffect(() => {
    // Reset gender filters when category changes via navbar
    if (categoryParam) {
      setGenderFilters([categoryParam]);
    } else {
      setGenderFilters([]);
    }
  }, [categoryParam]);

  const toggleGender = (gender: string) => {
    setGenderFilters(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const togglePrice = (range: string) => {
    setPriceFilters(prev => 
      prev.includes(range) ? prev.filter(p => p !== range) : [...prev, range]
    );
  };

  // Filter products Logic
  const displayProducts = products.filter(p => {
    // 1. Filter by seller verification
    const seller = getSellerById(p.sellerId);
    if (!seller || !seller.isVerified) return false;

    // 2. Filter by Category Param (Navbar)
    if (categoryParam && p.category !== categoryParam && p.category !== 'Unisex') return false;

    // 3. Filter by Sale Param (Navbar)
    if (saleParam === 'true' && !p.onSale) return false;

    // 4. Sidebar Gender Filter
    // If specific gender filters are selected (and it's not just the default category param)
    if (genderFilters.length > 0 && !categoryParam) {
       // If no category param, match strict gender filters
       if (!genderFilters.includes(p.category) && p.category !== 'Unisex') {
         // Special handling: if 'Men' is checked, show Men + Unisex.
         const matches = genderFilters.some(g => g === p.category || p.category === 'Unisex');
         if (!matches) return false;
       }
    }

    // 5. Sidebar Price Filter
    if (priceFilters.length > 0) {
      const matchesPrice = priceFilters.some(range => {
        if (range === 'under100') return p.price < 100;
        if (range === '100to150') return p.price >= 100 && p.price <= 150;
        if (range === 'over150') return p.price > 150;
        return false;
      });
      if (!matchesPrice) return false;
    }

    return true;
  });

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/buyer/checkout');
  };

  return (
    <div className="w-full bg-[#2A1617] text-gray-200">
      {/* Sticky Header for Filters */}
      <div className="sticky top-0 z-10 bg-[#2A1617]/95 backdrop-blur-md px-4 md:px-12 py-6 flex justify-between items-center border-b border-[#7A4B47]">
         <h2 className="text-xl md:text-3xl font-black italic text-[#FFFB97] flex items-center gap-2 uppercase">
            {categoryParam ? `${categoryParam}'s Collection` : saleParam ? 'On Fire Sale' : 'Fresh Drops'} <Flame className="text-[#FE7F42]" />
         </h2>
         <div className="flex gap-4">
           <button className="flex items-center gap-2 text-base font-medium text-[#FFFB97] hover:text-[#FE7F42]">
             Hide Filters <Filter size={18} />
           </button>
           <button className="flex items-center gap-2 text-base font-medium text-[#FFFB97] hover:text-[#FE7F42]">
             Sort By <ChevronDown size={18} />
           </button>
         </div>
      </div>

      <div className="flex px-4 md:px-12 pb-20 pt-8">
         {/* Sidebar Filter */}
         <div className="hidden lg:block w-64 pr-12 flex-shrink-0 h-screen sticky top-28 overflow-y-auto custom-scrollbar">
            <div className="space-y-8 text-base font-medium">
               <div className="pb-6 border-b border-[#7A4B47] space-y-2">
                 <button onClick={() => navigate('/buyer')} className="block py-1 text-[#FFFB97] hover:text-[#FE7F42] w-full text-left">All Shoes</button>
                 <button className="block py-1 text-gray-400 hover:text-[#FE7F42] w-full text-left">Tops & T-Shirts</button>
                 <button className="block py-1 text-gray-400 hover:text-[#FE7F42] w-full text-left">Hoodies & Pullovers</button>
               </div>
               
               <div>
                 <h3 className="font-bold text-[#FE7F42] mb-4 uppercase text-sm tracking-wider">Gender</h3>
                 <div className="space-y-2 text-gray-300 font-normal">
                   <label className="flex items-center gap-2 hover:text-[#FFFB97] cursor-pointer">
                     <input type="checkbox" checked={genderFilters.includes('Men')} onChange={() => toggleGender('Men')} className="accent-[#FE7F42]" /> Men
                   </label>
                   <label className="flex items-center gap-2 hover:text-[#FFFB97] cursor-pointer">
                     <input type="checkbox" checked={genderFilters.includes('Women')} onChange={() => toggleGender('Women')} className="accent-[#FE7F42]" /> Women
                   </label>
                   <label className="flex items-center gap-2 hover:text-[#FFFB97] cursor-pointer">
                     <input type="checkbox" checked={genderFilters.includes('Kids')} onChange={() => toggleGender('Kids')} className="accent-[#FE7F42]" /> Kids
                   </label>
                 </div>
               </div>

               <div>
                 <h3 className="font-bold text-[#FE7F42] mb-4 uppercase text-sm tracking-wider">Price</h3>
                 <div className="space-y-2 text-gray-300 font-normal">
                   <label className="flex items-center gap-2 hover:text-[#FFFB97] cursor-pointer">
                     <input type="checkbox" checked={priceFilters.includes('under100')} onChange={() => togglePrice('under100')} className="accent-[#FE7F42]" /> Under $100
                   </label>
                   <label className="flex items-center gap-2 hover:text-[#FFFB97] cursor-pointer">
                     <input type="checkbox" checked={priceFilters.includes('100to150')} onChange={() => togglePrice('100to150')} className="accent-[#FE7F42]" /> $100 - $150
                   </label>
                   <label className="flex items-center gap-2 hover:text-[#FFFB97] cursor-pointer">
                     <input type="checkbox" checked={priceFilters.includes('over150')} onChange={() => togglePrice('over150')} className="accent-[#FE7F42]" /> $150+
                   </label>
                 </div>
               </div>
            </div>
         </div>

         {/* Product Grid */}
         <div className="flex-grow">
            {displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                {displayProducts.map(product => {
                  const seller = getSellerById(product.sellerId);
                  return (
                    <div key={product.id} className="group cursor-pointer bg-[#1a0d0e] rounded-xl overflow-hidden border border-[#7A4B47] hover:border-[#FE7F42] transition-all duration-300 hover:shadow-[0_0_15px_rgba(254,127,66,0.2)]">
                      <div className="relative aspect-square bg-[#2A1617] overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                        />
                        {product.condition === 'New' && (
                          <span className="absolute top-4 left-4 bg-[#FE7F42] px-3 py-1 text-xs font-bold text-[#2A1617] uppercase tracking-wide rounded-sm">Just In</span>
                        )}
                        {product.onSale && (
                           <span className="absolute top-4 right-4 bg-[#B32C1A] px-3 py-1 text-xs font-bold text-white uppercase tracking-wide rounded-sm">Sale</span>
                        )}
                        {/* Quick Actions Overlay */}
                        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                           <button 
                             onClick={(e) => handleBuyNow(e, product)}
                             className="bg-[#2A1617] hover:bg-black text-[#FFFB97] px-4 py-2 rounded-full font-bold text-sm shadow-lg border border-[#FFFB97]"
                           >
                             Buy Now
                           </button>
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               addToCart(product);
                             }}
                             className="bg-[#FFFB97] hover:bg-[#FE7F42] text-[#2A1617] p-2 rounded-full shadow-lg"
                             title="Add to Bag"
                           >
                             <ShoppingBag size={20} />
                           </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-[#FFFB97] text-lg leading-tight mb-1">{product.title}</h3>
                        <p className="text-[#7A4B47] text-sm mb-2">{product.category} • {product.condition} Shoes</p>
                        <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                           {seller && (
                             <>
                               <span className="group-hover:text-[#FE7F42] transition-colors">{seller.businessName}</span>
                               {seller.isVerified && <VerifiedBadge size={14} showText={false} />}
                             </>
                           )}
                        </div>
                        <p className="font-black text-white text-lg">${product.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-[#7A4B47] rounded-xl">
                <h3 className="text-xl font-bold text-[#FFFB97]">No products found.</h3>
                <p className="text-[#7A4B47] mt-2">Try adjusting your filters.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default BuyerHome;