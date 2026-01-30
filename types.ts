export enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email?: string;
  password?: string;
}

export interface SellerProfile extends User {
  role: Role.SELLER;
  isVerified: boolean;
  businessName: string;
  joinedDate: string;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  price: number;
  image: string;
  description: string;
  size: string;
  condition: 'New' | 'Used';
  category: 'Men' | 'Women' | 'Kids' | 'Unisex';
  onSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}