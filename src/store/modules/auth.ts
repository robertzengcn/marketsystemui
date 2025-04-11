import { Module } from 'vuex'
import { AuthState, RootState } from '../types'
import { User } from '@/types'
import { API_ENDPOINTS } from '@/config/api'
import { sendToElectron } from '@/utils/electron'

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
    async login({ commit }, credentials: { username: string; password: string }) {
      try {
        const formData = new FormData()
        formData.append('username', credentials.username)
        formData.append('password', credentials.password)

        const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const { data } = await response.json()
        const userData = { username: credentials.username }
        
        commit('SET_USER', userData)
        commit('SET_TOKEN', data.Token)
        localStorage.setItem('token', data.Token)

        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const appParam = urlParams.get('app')

        if (appParam === 'social-market') {
          // Redirect to app URL scheme
          window.location.href = `social-marketing://auth?token=${data.Token}`
        } else {
          // Send login success data to Electron if running in Electron
          sendToElectron({
            token: data.Token,
            user: userData
          })
        }

        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async register({ commit }, userData: { firstName: string; lastName: string; email: string; password: string }) {
      try {
        const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })

        if (!response.ok) {
          throw new Error('Registration failed')
        }

        const data = await response.json()
        commit('SET_USER', data.user)
        commit('SET_TOKEN', data.token)
        localStorage.setItem('token', data.token)
        return true
      } catch (error) {
        console.error('Registration error:', error)
        return false
      }
    },
    async logout({ commit }) {
      try {
        await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
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
        const response = await fetch(API_ENDPOINTS.AUTH.ME, {
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