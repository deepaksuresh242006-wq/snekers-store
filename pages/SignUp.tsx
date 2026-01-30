import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { Lock, Mail, User, Briefcase, ChevronDown } from 'lucide-react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        role: Role.BUYER,
        businessName: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            const { email, password, confirmPassword, role, businessName, ...additionalData } = formData;

            // Prepare user data based on role
            const userData = {
                ...additionalData,
                role,
                ...(role === Role.SELLER && {
                    businessName,
                    isVerified: false,
                    joinedDate: new Date().toISOString().split('T')[0]
                })
            };

            await signup(email, password, userData);

            // Navigate based on role
            if (role === Role.SELLER) {
                navigate('/seller');
            } else {
                navigate('/buyer');
            }
        } catch (err: any) {
            console.error('Signup error:', err);
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('Email is already registered');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak');
                    break;
                case 'permission-denied':
                    setError('Account created, but profile setup failed. Please check Firestore Rules.');
                    break;
                default:
                    setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#2A1617] flex flex-col px-8 py-12 justify-center items-center">
            <div className="max-w-[400px] w-full mx-auto bg-[#1a0d0e] p-8 rounded-2xl border border-[#7A4B47] shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-[#FFFB97] uppercase tracking-tighter italic">
                        Create Account
                    </h2>
                    <p className="text-[#7A4B47] text-sm mt-2 font-medium">
                        Join the marketplace today
                    </p>
                </div>

                {error && <div className="bg-[#B32C1A]/10 border border-[#B32C1A] text-[#B32C1A] p-3 rounded mb-4 text-sm text-center font-bold">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                        />
                    </div>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                        />
                    </div>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                        />
                    </div>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm Password"
                            className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="relative">
                        <ChevronDown size={18} className="absolute right-3 top-3.5 text-[#7A4B47] pointer-events-none" />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors text-[#FFFB97] appearance-none cursor-pointer"
                        >
                            <option value={Role.BUYER}>I want to Buy</option>
                            <option value={Role.SELLER}>I want to Sell</option>
                        </select>
                    </div>

                    {/* Business Name - Only for Sellers */}
                    {formData.role === Role.SELLER && (
                        <div className="relative">
                            <Briefcase size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                                placeholder="Business Name"
                                className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FE7F42] hover:bg-[#FE7F42]/90 text-[#2A1617] font-bold py-3 uppercase tracking-wide rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : formData.role === Role.SELLER ? 'Create Seller Account' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center mt-6 text-[#7A4B47] text-sm">
                    Already have an account? <Link to="/login" className="text-[#FE7F42] hover:text-[#FFFB97] font-bold border-b border-[#FE7F42] hover:border-[#FFFB97] transition-colors">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
