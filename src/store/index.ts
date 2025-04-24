import { createStore } from 'vuex'
import { RootState } from './types'
import auth from './modules/auth'
import products from '@/store/modules/products'
import orders from '@/store/modules/orders'
import customers from '@/store/modules/customers'

export default createStore<RootState>({
  state: {
    auth: {
      user: null,
      token: null
    },
    products: {
      products: [],
      loading: false,
      error: null
    },
    orders: {
      orders: [],
      loading: false,
      error: null
    },
    customers: {
      customers: [],
      loading: false,
      error: null
    }
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    products,
    orders,
    customers
  }
}) 