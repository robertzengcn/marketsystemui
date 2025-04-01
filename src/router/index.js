import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/Products.vue'
import Orders from '../views/Orders.vue'
import Customers from '../views/Customers.vue'
import Reports from '../views/Reports.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 