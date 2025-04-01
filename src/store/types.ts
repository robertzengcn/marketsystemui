import { User, Product, Order, Customer } from '@/types'

export interface AuthState {
  user: User | null
  token: string | null
}

export interface ProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

export interface OrdersState {
  orders: Order[]
  loading: boolean
  error: string | null
}

export interface CustomersState {
  customers: Customer[]
  loading: boolean
  error: string | null
}

export interface RootState {
  auth: AuthState
  products: ProductsState
  orders: OrdersState
  customers: CustomersState
} 