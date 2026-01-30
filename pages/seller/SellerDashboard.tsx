import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { SellerProfile, Role } from '../../types';
import { VerifiedBadge } from '../../components/VerifiedBadge';
import { Plus, Package, Clock } from 'lucide-react';

const SellerDashboard: React.FC = () => {
  const { currentUser, products, addProduct } = useMarketplace();
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '', 
    price: '', 
    description: '', 
    size: '', 
    condition: 'New', 
    category: 'Men',
    image: 'https://picsum.photos/400/400?random=10'
  });

  const seller = currentUser as SellerProfile;

  if (!seller || seller.role !== Role.SELLER) return <div className="p-8 text-[#FFFB97]">Access Denied</div>;

  const myProducts = products.filter(p => p.sellerId === seller.id);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      sellerId: seller.id,
      title: newProduct.title,
      price: Number(newProduct.price),
      description: newProduct.description,
      size: newProduct.size,
      condition: newProduct.condition as 'New' | 'Used',
      category: newProduct.category as 'Men' | 'Women' | 'Kids' | 'Unisex',
      image: newProduct.image
    });
    setIsAdding(false);
    setNewProduct({ 
      title: '', 
      price: '', 
      description: '', 
      size: '', 
      condition: 'New', 
      category: 'Men',
      image: 'https://picsum.photos/400/400?random=' + Date.now() 
    });
  };

  if (!seller.isVerified) {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-[#FFFB97] mb-4">Pending Verification</h1>
        <p className="text-[#7A4B47] mb-8">
          Thanks for joining, {seller.name}. Your business <span className="text-[#FE7F42] font-bold">{seller.businessName}</span> is currently under review.
        </p>
        <div className="bg-[#1a0d0e] p-4 rounded border border-[#7A4B47] text-xs text-gray-400">
           Demo: Log out, go to Admin (Help), and Approve this user.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 text-gray-200">
      <div className="flex justify-between items-end mb-12 border-b border-[#7A4B47] pb-4">
        <div>
          <h1 className="text-4xl font-black text-[#FFFB97] uppercase tracking-tighter flex items-center gap-2 italic">
            Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-lg text-[#FE7F42]">{seller.businessName}</span>
            <VerifiedBadge size={18} />
          </div>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="fire-btn px-6 py-3 text-[#2A1617] flex items-center gap-2"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {isAdding && (
        <div className="mb-12 bg-[#1a0d0e] p-8 rounded-lg border border-[#7A4B47]">
          <h3 className="text-xl font-bold mb-6 text-[#FFFB97]">New Listing Details</h3>
          <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required placeholder="Product Title (e.g. Air Jordan 1)" className="p-3 bg-[#2A1617] border border-[#7A4B47] rounded focus:border-[#FE7F42] outline-none text-[#FFFB97]" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
            <input required placeholder="Price" type="number" className="p-3 bg-[#2A1617] border border-[#7A4B47] rounded focus:border-[#FE7F42] outline-none text-[#FFFB97]" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
            <input required placeholder="Size" className="p-3 bg-[#2A1617] border border-[#7A4B47] rounded focus:border-[#FE7F42] outline-none text-[#FFFB97]" value={newProduct.size} onChange={e => setNewProduct({...newProduct, size: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-4">
              <select className="p-3 bg-[#2A1617] border border-[#7A4B47] rounded focus:border-[#FE7F42] outline-none text-[#FFFB97]" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
                <option value="Unisex">Unisex</option>
              </select>
              <select className="p-3 bg-[#2A1617] border border-[#7A4B47] rounded focus:border-[#FE7F42] outline-none text-[#FFFB97]" value={newProduct.condition} onChange={e => setNewProduct({...newProduct, condition: e.target.value})}>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <textarea required placeholder="Description" className="p-3 bg-[#2A1617] border border-[#7A4B47] rounded focus:border-[#FE7F42] outline-none md:col-span-2 text-[#FFFB97]" rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            <div className="md:col-span-2 flex justify-end gap-4">
              <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-[#7A4B47] hover:text-[#FE7F42]">Cancel</button>
              <button type="submit" className="fire-btn px-8 py-3 text-[#2A1617]">Publish</button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold mb-6 text-[#FFFB97]">Inventory ({myProducts.length})</h3>
        {myProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myProducts.map(p => (
              <div key={p.id} className="p-4 bg-[#1a0d0e] border border-[#7A4B47] rounded flex items-center justify-between hover:border-[#FE7F42] transition-colors group">
                <div className="flex items-center gap-4">
                  <img src={p.image} className="w-20 h-20 object-cover bg-[#2A1617] rounded" />
                  <div>
                    <h4 className="font-bold text-white group-hover:text-[#FE7F42]">{p.title}</h4>
                    <p className="text-sm text-[#7A4B47]">${p.price} • {p.size}</p>
                    <p className="text-xs text-gray-500 uppercase mt-1">{p.condition} • {p.category}</p>
                  </div>
                </div>
                <div className="px-4 py-1 bg-[#2A1617] border border-[#B32C1A] text-[#B32C1A] text-xs font-bold uppercase rounded-full">
                   Active
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-[#7A4B47]">
            <Package size={48} className="mx-auto mb-4 opacity-50" />
            <p>You haven't listed any items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;