import { Module } from 'vuex';
import { RootState } from '../types';

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  productName: string;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const state: OrderState = {
  orders: [],
  loading: false,
  error: null
};

const mutations = {
  setOrders(state: OrderState, orders: Order[]) {
    state.orders = orders;
  },
  setLoading(state: OrderState, loading: boolean) {
    state.loading = loading;
  },
  setError(state: OrderState, error: string | null) {
    state.error = error;
  },
  updateOrderStatus(state: OrderState, { orderId, status }: { orderId: number; status: Order['status'] }) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
    }
  }
};

const actions = {
  async fetchOrders({ commit }: any) {
    commit('setLoading', true);
    try {
      // TODO: Replace with actual API call
      const mockOrders: Order[] = [
        {
          id: 1,
          customerId: 1,
          customerName: 'John Doe',
          status: 'completed',
          total: 299.99,
          items: [
            {
              id: 1,
              productId: 1,
              quantity: 2,
              price: 149.99,
              productName: 'Product 1'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          customerId: 2,
          customerName: 'Jane Smith',
          status: 'processing',
          total: 199.99,
          items: [
            {
              id: 2,
              productId: 2,
              quantity: 1,
              price: 199.99,
              productName: 'Product 2'
            }
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      commit('setOrders', mockOrders);
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Failed to fetch orders');
    } finally {
      commit('setLoading', false);
    }
  },

  async updateOrderStatus({ commit }: any, { orderId, status }: { orderId: number; status: Order['status'] }) {
    try {
      // TODO: Replace with actual API call
      commit('updateOrderStatus', { orderId, status });
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Failed to update order status');
    }
  }
};

const getters = {
  getOrders: (state: OrderState) => state.orders,
  getOrderById: (state: OrderState) => (id: number) => {
    return state.orders.find(order => order.id === id);
  },
  getOrdersByStatus: (state: OrderState) => (status: Order['status']) => {
    return state.orders.filter(order => order.status === status);
  },
  isLoading: (state: OrderState) => state.loading,
  getError: (state: OrderState) => state.error
};

const orders: Module<OrderState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default orders; 