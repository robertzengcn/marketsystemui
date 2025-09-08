import { Module } from 'vuex'
import { AuthState, RootState } from '../types'
import { User } from '@/types'
import { API_ENDPOINTS } from '@/config/api'
//imD#1Y$Sd7fRs*Vxf6port { th } from 'element-plus/es/locales.mjs'

const APP_MARKETSYSTEM_NAME = import.meta.env.VITE_APP_MARKETSYSTEM_NAME
const APP_AIFETCHLY_NAME = import.meta.env.VITE_APP_AIFETCHLY_NAME
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
        formData.append('username', credentials.username.trim())
        formData.append('password', credentials.password.trim())

        const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const { data,status,msg } = await response.json()
        if(!status){

          throw new Error(msg || 'Login failed')
        }
        const userData = { username: credentials.username }

        commit('SET_USER', userData)
        commit('SET_TOKEN', data.Token)
        localStorage.setItem('token', data.Token)

        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const appParam = urlParams.get('app')
        const supportedAppNames = [APP_MARKETSYSTEM_NAME, APP_AIFETCHLY_NAME]

        if (supportedAppNames.includes(appParam)) {
          // Redirect to app URL scheme
          const appUrl = appParam+`://auth?token=${data.Token}`
          window.location.href = appUrl
         console.log("redirecting to app:"+appUrl)
          // Redirect to success page first, then handle app redirect
          // router.push('/login/success').then(() => {
          //   setTimeout(() => {
          //     window.location.href = `socialmarketing://auth?token=${data.Token}`
          //   }, 1500) // Brief delay to show success page before redirect
          // })
        }
        // else {
        //   // Default route to dashboard when no app parameter is present
        //   const appUrl = `socialmarketing://token_${data.Token}`
        //   window.location.href = appUrl
        //   // router.push('/dashboard')
        // }
        return true
      } catch (error) {
        console.error('Login error:', error)
        throw error // Re-throw the error to be handled by the caller
        //return false
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