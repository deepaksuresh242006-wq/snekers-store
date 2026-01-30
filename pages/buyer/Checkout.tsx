import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

enum CheckoutStep {
  LOGIN = 1,
  DETAILS = 2,
  CONFIRMATION = 3
}

const Checkout: React.FC = () => {
  const { cart, clearCart, currentUser } = useMarketplace();
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.LOGIN);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(CheckoutStep.DETAILS);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(CheckoutStep.CONFIRMATION);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && step !== CheckoutStep.CONFIRMATION) {
     navigate('/buyer');
     return null;
  }

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-[500px] mx-auto px-6 py-12 text-gray-200">
      <div className="text-center mb-8 relative">
        {step !== CheckoutStep.LOGIN && step !== CheckoutStep.CONFIRMATION && (
            <button onClick={() => setStep(step - 1)} className="absolute left-0 top-1 text-[#FE7F42]">
                <ArrowLeft size={24} />
            </button>
        )}
        <h1 className="text-2xl font-black tracking-tight uppercase text-[#FFFB97] italic">Checkout</h1>
      </div>

      <div className="bg-[#1a0d0e] p-8 rounded-2xl border border-[#7A4B47]">
        
        {step === CheckoutStep.LOGIN && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Enter your email.</h2>
              <p className="text-[#7A4B47] text-sm">Join the fire community.</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <input 
                required 
                type="email" 
                placeholder="Email address" 
                defaultValue="buyer@example.com" 
                className="w-full px-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md outline-none focus:border-[#FE7F42] text-[#FFFB97] placeholder-[#7A4B47] transition-colors" 
              />
              <p className="text-xs text-gray-500">By continuing, I agree to Deepxk's Privacy Policy.</p>
              
              <div className="flex justify-end mt-6">
                <button type="submit" className="fire-btn px-8 py-3 text-[#2A1617]">
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        {step === CheckoutStep.DETAILS && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Delivery Options</h2>
            
            <div className="space-y-4 mb-8">
               <div className="border border-[#FE7F42] rounded-lg p-4 flex justify-between items-center bg-[#2A1617]">
                  <span className="font-bold text-[#FE7F42]">Ship to Address</span>
                  <div className="w-4 h-4 bg-[#FE7F42] rounded-full shadow-[0_0_10px_#FE7F42]"></div>
               </div>
               <div className="border border-[#7A4B47] rounded-lg p-4 text-[#7A4B47] hover:border-gray-500 cursor-pointer">
                  <span>Pick Up</span>
               </div>
            </div>

            <div className="space-y-4 mb-8">
               <h3 className="font-bold text-[#FFFB97]">Order Summary</h3>
               {cart.map(item => (
                 <div key={item.id} className="flex gap-4">
                    <img src={item.image} className="w-16 h-16 object-cover bg-[#2A1617] rounded border border-[#7A4B47]" />
                    <div className="text-sm">
                       <p className="font-bold text-white">{item.title}</p>
                       <p className="text-[#FE7F42]">Qty {item.quantity}</p>
                       <p className="font-medium text-[#FFFB97]">${item.price * item.quantity}</p>
                    </div>
                 </div>
               ))}
               <div className="flex justify-between font-bold pt-4 border-t border-[#7A4B47] text-lg">
                 <span className="text-white">Total</span>
                 <span className="text-[#FE7F42]">${(total + 7).toFixed(2)}</span>
               </div>
            </div>
               
            <button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing}
              className="w-full fire-btn py-4 text-[#2A1617] disabled:opacity-50"
            >
              {isProcessing ? 'Igniting Order...' : 'Place Order'}
            </button>
          </div>
        )}

        {step === CheckoutStep.CONFIRMATION && (
          <div className="text-center py-8">
            <h2 className="text-3xl font-black text-[#FFFB97] mb-2 uppercase italic">Got 'Em!</h2>
            <p className="text-gray-400 mb-8">Your order is confirmed.</p>
            <div className="mb-8">
               <CheckCircle size={64} className="mx-auto text-[#FE7F42] drop-shadow-[0_0_15px_rgba(254,127,66,0.6)]" />
            </div>
            <button onClick={() => navigate('/buyer')} className="text-[#FFFB97] border-b border-[#FE7F42] pb-1 font-bold hover:text-[#FE7F42] transition-colors">
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;