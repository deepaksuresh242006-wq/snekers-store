import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../types';
import { ShieldCheck, User as UserIcon, Lock, Mail } from 'lucide-react';

const SellerLogin: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');
  
  const { registerSeller, login } = useMarketplace();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      registerSeller(name, email, password, businessName);
      navigate('/seller');
    } else {
      const success = login(email, password);
      if (success) {
        // Redirect based on role
        if (email === 'admin@deepxk.com') {
           navigate('/admin');
        } else {
           navigate('/seller');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#2A1617] flex flex-col px-8 py-12 justify-center items-center">
      <div className="max-w-[400px] w-full mx-auto bg-[#1a0d0e] p-8 rounded-2xl border border-[#7A4B47] shadow-2xl">
        <div className="flex justify-center mb-6">
           <ShieldCheck size={56} className="text-[#FE7F42]" strokeWidth={1.5} />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#FFFB97] uppercase tracking-tighter italic">
            {isSignUp ? 'Join The Heat' : 'Welcome Back'}
          </h2>
          <p className="text-[#7A4B47] text-sm mt-2 max-w-[280px] mx-auto font-medium">
            {isSignUp ? 'Create your seller account.' : 'Sign in to manage your collection.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div className="relative">
                <UserIcon size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                <input 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]" 
                />
              </div>
              <div className="relative">
                <ShieldCheck size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                <input 
                  required 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Business Name"
                  className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]" 
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
            <input 
              required 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]" 
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
            <input 
              required 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]" 
            />
          </div>

          {error && <p className="text-[#B32C1A] text-sm text-center font-bold">{error}</p>}

          <div className="pt-2">
            <button type="submit" className="w-full fire-btn py-3 text-[#2A1617] uppercase tracking-wide">
                {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500 mb-2">{isSignUp ? 'Already a member?' : 'Not a member?'}</p>
          <button 
            type="button" 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-[#FE7F42] border-b border-[#FE7F42] font-bold hover:text-[#FFFB97] hover:border-[#FFFB97] transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Join Us'}
          </button>
        </div>
        
        {!isSignUp && (
            <div className="mt-4 text-center">
                 <p className="text-xs text-[#7A4B47]">Demo Seller: mike@soles.com / password123</p>
                 <p className="text-xs text-[#7A4B47]">Demo Admin: admin@deepxk.com / admin</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default SellerLogin;