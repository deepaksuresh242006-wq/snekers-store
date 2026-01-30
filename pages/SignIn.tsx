import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // Determine where to redirect based on user role if available, or default
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);
            switch (err.code) {
                case 'auth/user-not-found':
                case 'auth/invalid-credential':
                    setError('No account found with this email or password incorrect.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/too-many-requests':
                    setError('Too many attempts. Please try again later.');
                    break;
                default:
                    setError('Failed to log in. Please try again.');
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
                        Welcome Back
                    </h2>
                    <p className="text-[#7A4B47] text-sm mt-2 font-medium">
                        Sign in to access your account
                    </p>
                </div>

                {error && <div className="bg-[#B32C1A]/10 border border-[#B32C1A] text-[#B32C1A] p-3 rounded mb-4 text-sm text-center font-bold">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                        />
                    </div>
                    <div className="relative">
                        <Lock size={18} className="absolute left-3 top-3.5 text-[#7A4B47]" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 bg-[#2A1617] border border-[#7A4B47] rounded-md focus:border-[#FE7F42] outline-none transition-colors placeholder-[#7A4B47] text-[#FFFB97]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FE7F42] hover:bg-[#FE7F42]/90 text-[#2A1617] font-bold py-3 uppercase tracking-wide rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className="text-center mt-6 text-[#7A4B47] text-sm">
                    Don't have an account? <Link to="/signup" className="text-[#FE7F42] hover:text-[#FFFB97] font-bold border-b border-[#FE7F42] hover:border-[#FFFB97] transition-colors">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
