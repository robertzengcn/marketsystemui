import { Module } from 'vuex'
import { AuthState, RootState } from '../types'
import { User } from '@/types'

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: {
    user: null,
    token: null
  },
  mutations: {
    SET_USER(state, user: User | null) {
      state.user = user
    },
    SET_TOKEN(state, token: string | null) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, credentials: { email: string; password: string }) {
      try {
        // Replace with actual API call
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const data = await response.json()
        commit('SET_USER', data.user)
        commit('SET_TOKEN', data.token)
        localStorage.setItem('token', data.token)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async logout({ commit }) {
      try {
        // Replace with actual API call
        await fetch('/api/auth/logout', {
          method: 'POST'
        })
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        commit('SET_USER', null)
        commit('SET_TOKEN', null)
        localStorage.removeItem('token')
      }
    },
    async checkAuth({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) return false

      try {
        // Replace with actual API call
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Auth check failed')
        }

        const data = await response.json()
        commit('SET_USER', data.user)
        commit('SET_TOKEN', token)
        return true
      } catch (error) {
        console.error('Auth check error:', error)
        return false
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  }
}

export default auth 