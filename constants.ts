import { Product, Role, SellerProfile, User } from './types';

export const MOCK_SELLERS: SellerProfile[] = [
  {
    id: 's1',
    name: 'Jordan Mike',
    email: 'mike@soles.com',
    password: 'password123',
    role: Role.SELLER,
    businessName: 'OG Soles',
    isVerified: true,
    joinedDate: '2023-01-15'
  },
  {
    id: 's2',
    name: 'Sarah Kicks',
    email: 'sarah@kicks.com',
    password: 'password123',
    role: Role.SELLER,
    businessName: 'Kicks 4 U',
    isVerified: false,
    joinedDate: '2023-10-20'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sellerId: 's1',
    title: 'Air Max 90 "Infrared"',
    price: 180,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    description: 'Classic silhouette in mint condition. Original box included.',
    size: '10 US',
    condition: 'New',
    category: 'Men',
    onSale: false
  },
  {
    id: 'p2',
    sellerId: 's1',
    title: 'Yeezy Boost 350 V2',
    price: 320,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    description: 'Lightly worn, great condition. Verified authentic.',
    size: '9.5 US',
    condition: 'Used',
    category: 'Men',
    onSale: false
  },
  {
    id: 'p3',
    sellerId: 's2',
    title: 'Dunk Low "Panda"',
    price: 150,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    description: 'Brand new, never worn. Receipt available.',
    size: '11 US',
    condition: 'New',
    category: 'Men',
    onSale: false
  },
  {
    id: 'p4',
    sellerId: 's1',
    title: 'Air Jordan 1 High OG',
    price: 200,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961d289?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic colorway. Must have for collectors.',
    size: '8 US',
    condition: 'New',
    category: 'Women',
    onSale: true
  },
  {
    id: 'p5',
    sellerId: 's1',
    title: 'Air Force 1 Low',
    price: 90,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    description: 'Classic white on white. Clean and versatile.',
    size: '7 US',
    condition: 'New',
    category: 'Women',
    onSale: false
  },
  {
    id: 'p6',
    sellerId: 's2',
    title: 'Kids Jordan 4 Retro',
    price: 120,
    image: 'https://images.unsplash.com/photo-1514989940723-e8875ea6ab7d?auto=format&fit=crop&w=800&q=80',
    description: 'Perfect for the little ones. Durable and stylish.',
    size: '4Y',
    condition: 'New',
    category: 'Kids',
    onSale: false
  },
  {
    id: 'p7',
    sellerId: 's1',
    title: 'Kids Air Max 270',
    price: 85,
    image: 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&w=800&q=80',
    description: 'Comfortable everyday shoes for active kids.',
    size: '5Y',
    condition: 'Used',
    category: 'Kids',
    onSale: true
  },
  {
    id: 'p8',
    sellerId: 's2',
    title: 'Blazer Mid 77',
    price: 80,
    image: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?auto=format&fit=crop&w=800&q=80',
    description: 'Vintage look with modern comfort.',
    size: '10 US',
    condition: 'New',
    category: 'Men',
    onSale: true
  },
  {
    id: 'p9',
    sellerId: 's1',
    title: 'Zoom Fly 5',
    price: 140,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    description: 'High performance running shoes.',
    size: '8.5 US',
    condition: 'New',
    category: 'Women',
    onSale: false
  },
  {
    id: 'p10',
    sellerId: 's1',
    title: 'Vans Old Skool',
    price: 50,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    description: 'Classic skate shoe.',
    size: '9 US',
    condition: 'Used',
    category: 'Unisex',
    onSale: true
  }
];

export const ADMIN_USER: User = {
  id: 'admin1',
  name: 'System Admin',
  role: Role.ADMIN,
  email: 'admin@deepxk.com',
  password: 'admin'
};