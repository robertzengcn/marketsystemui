import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null,
    products: [],
    orders: [],
    customers: [],
    loading: false,
    error: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setProducts(state, products) {
      state.products = products
    },
    setOrders(state, orders) {
      state.orders = orders
    },
    setCustomers(state, customers) {
      state.customers = customers
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('setLoading', true)
        const response = await axios.post('/api/auth/login', credentials)
        const { token, user } = response.data
        localStorage.setItem('token', token)
        commit('setUser', user)
        return true
      } catch (error) {
        commit('setError', error.message)
        return false
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchProducts({ commit }) {
      try {
        commit('setLoading', true)
        const response = await axios.get('/api/products')
        commit('setProducts', response.data)
      } catch (error) {
        commit('setError', error.message)
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchOrders({ commit }) {
      try {
        commit('setLoading', true)
        const response = await axios.get('/api/orders')
        commit('setOrders', response.data)
      } catch (error) {
        commit('setError', error.message)
      } finally {
        commit('setLoading', false)
      }
    },
    async fetchCustomers({ commit }) {
      try {
        commit('setLoading', true)
        const response = await axios.get('/api/customers')
        commit('setCustomers', response.data)
      } catch (error) {
        commit('setError', error.message)
      } finally {
        commit('setLoading', false)
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('setUser', null)
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    products: state => state.products,
    orders: state => state.orders,
    customers: state => state.customers,
    loading: state => state.loading,
    error: state => state.error
  }
}) 