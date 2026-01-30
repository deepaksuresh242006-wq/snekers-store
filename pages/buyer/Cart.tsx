import React from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Trash2, Heart, ChevronDown, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, lastRemovedItem, undoRemoveFromCart } = useMarketplace();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Undo Notification
  const UndoBanner = () => (
    lastRemovedItem ? (
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
        <div className="bg-[#1a0d0e] border border-[#FE7F42] text-[#FFFB97] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4">
           <span>Removed <strong>{lastRemovedItem.title}</strong> from bag.</span>
           <button 
             onClick={undoRemoveFromCart} 
             className="flex items-center gap-1 text-[#FE7F42] font-bold hover:text-white transition-colors underline"
           >
             <RotateCcw size={16} /> Undo
           </button>
        </div>
      </div>
    ) : null
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-[1000px] mx-auto px-6 py-20 text-center relative">
        <h2 className="text-3xl font-black italic text-[#FFFB97] mb-4">YOUR BAG IS EMPTY</h2>
        <p className="text-[#7A4B47] mb-8">Once you add items to your bag, they'll appear here.</p>
        <Link to="/buyer" className="inline-block fire-btn px-8 py-4 text-lg text-[#2A1617]">
          Start Shopping
        </Link>
        <UndoBanner />
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 text-gray-200 relative">
      <UndoBanner />

      {/* Bag Items - Left Column */}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-[#FFFB97] mb-4 uppercase tracking-wide">Your Bag</h1>
        
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 py-6 border-b border-[#7A4B47]">
              <div className="w-36 h-36 bg-[#1a0d0e] flex-shrink-0 border border-[#7A4B47] rounded-lg overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-90" />
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-[#FE7F42] text-sm mt-1">{item.condition} Shoes</p>
                    <p className="text-gray-400 text-sm">Size {item.size}</p>
                    
                    <div className="mt-4 flex gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#FFFB97]">
                        Quantity {item.quantity} <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-[#FFFB97]">${item.price * item.quantity}</p>
                </div>

                <div className="mt-auto flex gap-6 pt-4">
                  <button className="text-[#7A4B47] hover:text-[#FE7F42] transition-colors">
                    <Heart size={20} />
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#7A4B47] hover:text-[#B32C1A] transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary - Right Column */}
      <div className="w-full md:w-[350px] flex-shrink-0">
         <div className="bg-[#1a0d0e] p-6 rounded-2xl border border-[#7A4B47]">
             <h2 className="text-xl font-bold text-[#FFFB97] mb-6 uppercase">Summary</h2>
             
             <div className="space-y-4 mb-8">
                <div className="flex justify-between text-base">
                   <span className="text-gray-300">Subtotal</span>
                   <span className="text-white font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base">
                   <span className="text-gray-300">Estimated Shipping</span>
                   <span className="text-white font-medium">$7.00</span>
                </div>
                <div className="flex justify-between text-base">
                   <span className="text-gray-300">Estimated Tax</span>
                   <span className="text-white font-medium">—</span>
                </div>
                <div className="flex justify-between text-base border-t border-[#7A4B47] pt-4 mt-4">
                   <span className="text-[#FE7F42] font-bold">Total</span>
                   <span className="text-[#FE7F42] font-bold">${(total + 7).toFixed(2)}</span>
                </div>
             </div>

             <Link 
               to="/buyer/checkout"
               className="block w-full fire-btn text-center py-4 mb-4 text-[#2A1617]"
             >
               Checkout
             </Link>
             
             <button className="block w-full bg-[#7A4B47] text-[#FFFB97] text-center py-4 rounded-full font-medium hover:bg-[#6a3f3b] transition-colors">
               PayPal
             </button>
         </div>
      </div>

    </div>
  );
};

export default Cart;