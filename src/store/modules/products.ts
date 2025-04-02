import { Module } from 'vuex';
import { RootState } from '../types';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const state: ProductState = {
  products: [],
  loading: false,
  error: null
};

const mutations = {
  setProducts(state: ProductState, products: Product[]) {
    state.products = products;
  },
  setLoading(state: ProductState, loading: boolean) {
    state.loading = loading;
  },
  setError(state: ProductState, error: string | null) {
    state.error = error;
  }
};

const actions = {
  async fetchProducts({ commit }: any) {
    commit('setLoading', true);
    try {
      // TODO: Replace with actual API call
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          price: 99.99,
          description: 'Description for product 1',
          stock: 100,
          category: 'Electronics',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // Add more mock products as needed
      ];
      commit('setProducts', mockProducts);
    } catch (error) {
      commit('setError', error instanceof Error ? error.message : 'Failed to fetch products');
    } finally {
      commit('setLoading', false);
    }
  }
};

const getters = {
  getProducts: (state: ProductState) => state.products,
  getProductById: (state: ProductState) => (id: number) => {
    return state.products.find(product => product.id === id);
  },
  isLoading: (state: ProductState) => state.loading,
  getError: (state: ProductState) => state.error
};

const products: Module<ProductState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default products; 