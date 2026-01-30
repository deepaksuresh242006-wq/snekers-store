import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Product, SellerProfile, User, CartItem, Role } from '../types';
import { MOCK_PRODUCTS, MOCK_SELLERS, ADMIN_USER } from '../constants';

interface MarketplaceContextType {
  currentUser: User | SellerProfile | null;
  sellers: SellerProfile[];
  products: Product[];
  cart: CartItem[];
  lastRemovedItem: CartItem | null;
  login: (email: string, password: string) => boolean;
  guestLogin: () => void;
  logout: () => void;
  registerSeller: (name: string, email: string, password: string, businessName: string) => void;
  verifySeller: (sellerId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  undoRemoveFromCart: () => void;
  clearCart: () => void;
  getSellerById: (id: string) => SellerProfile | undefined;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | SellerProfile | null>(null);
  const [sellers, setSellers] = useState<SellerProfile[]>(MOCK_SELLERS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastRemovedItem, setLastRemovedItem] = useState<CartItem | null>(null);

  const { userData, logout: firebaseLogout } = useAuth();

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    }
  }, [userData]);

  const login = (email: string, password: string): boolean => {
    // Check Admin
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      setCurrentUser(ADMIN_USER);
      return true;
    }

    // Check Sellers
    const seller = sellers.find(s => s.email === email && s.password === password);
    if (seller) {
      setCurrentUser(seller);
      return true;
    }

    return false;
  };

  const guestLogin = () => {
    setCurrentUser({ id: `guest-${Date.now()}`, name: 'Guest Buyer', role: Role.BUYER });
  };

  const registerSeller = (name: string, email: string, password: string, businessName: string) => {
    const newSeller: SellerProfile = {
      id: `s-${Date.now()}`,
      name,
      businessName,
      email,
      password, // In a real app, hash this!
      role: Role.SELLER,
      isVerified: false,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setSellers([...sellers, newSeller]);
    setCurrentUser(newSeller);
  };

  const logout = () => {
    firebaseLogout();
    setCurrentUser(null);
    setCart([]);
  };

  const verifySeller = (sellerId: string) => {
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, isVerified: true } : s));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p-${Date.now()}`
    };
    setProducts([...products, newProduct]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find(item => item.id === productId);
    if (itemToRemove) {
      setLastRemovedItem(itemToRemove);
      setCart(prev => prev.filter(item => item.id !== productId));

      // Clear last removed item after 5 seconds
      setTimeout(() => {
        setLastRemovedItem(current => current?.id === productId ? null : current);
      }, 5000);
    }
  };

  const undoRemoveFromCart = () => {
    if (lastRemovedItem) {
      setCart(prev => [...prev, lastRemovedItem]);
      setLastRemovedItem(null);
    }
  };

  const clearCart = () => setCart([]);

  const getSellerById = (id: string) => sellers.find(s => s.id === id);

  return (
    <MarketplaceContext.Provider value={{
      currentUser,
      sellers,
      products,
      cart,
      lastRemovedItem,
      login,
      guestLogin,
      logout,
      registerSeller,
      verifySeller,
      addProduct,
      addToCart,
      removeFromCart,
      undoRemoveFromCart,
      clearCart,
      getSellerById
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};