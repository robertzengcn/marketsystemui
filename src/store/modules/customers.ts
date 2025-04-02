import { Module } from 'vuex';
import { RootState } from '../types';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const state: CustomerState = {
  customers: [],
  loading: false,
  error: null
};

const mutations = {
  setCustomers(state: CustomerState, customers: Customer[]) {
    state.customers = customers;
  },
  setLoading(state: CustomerState, loading: boolean) {
    state.loading = loading;
  },
  setError(state: CustomerState, error: string | null) {
    state.error = error;
  }
};

const actions = {
  async fetchCustomers({ commit }: any) {
    commit('setLoading', true);
    try {
      // TODO: Replace with actual API call
      const mockCustomers: Customer[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1 234 567 8900',
          address: '123 Main St, City, Country',
          totalOrders: 5,
          totalSpent: 1250.50,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1 234 567 8901',
          address: '456 Oak Ave, City, Country',
          totalOrders: 3,
          totalSpent: 750.25,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      commit('setCustomers', mockCustomers);
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Failed to fetch customers');
    } finally {
      commit('setLoading', false);
    }
  }
};

const getters = {
  getCustomers: (state: CustomerState) => state.customers,
  getCustomerById: (state: CustomerState) => (id: number) => {
    return state.customers.find(customer => customer.id === id);
  },
  isLoading: (state: CustomerState) => state.loading,
  getError: (state: CustomerState) => state.error
};

const customers: Module<CustomerState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default customers; 