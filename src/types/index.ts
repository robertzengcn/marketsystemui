export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface Order {
  id: number;
  customerId: number;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
}

export interface SalesReport {
  date: string;
  orders: number;
  customers: number;
  productsSold: number;
  revenue: number;
  averageOrderValue: number;
} 