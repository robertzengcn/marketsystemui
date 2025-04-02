<template>
  <el-menu
    :default-active="activeIndex"
    class="nav-menu"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="dashboard">
      <el-icon><DataLine /></el-icon>
      Dashboard
    </el-menu-item>
    <el-menu-item index="products">
      <el-icon><Goods /></el-icon>
      Products
    </el-menu-item>
    <el-menu-item index="orders">
      <el-icon><List /></el-icon>
      Orders
    </el-menu-item>
    <el-menu-item index="customers">
      <el-icon><User /></el-icon>
      Customers
    </el-menu-item>
    <el-menu-item index="reports">
      <el-icon><PieChart /></el-icon>
      Reports
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="profile">
      <el-icon><Setting /></el-icon>
      Profile
    </el-menu-item>
    <el-menu-item index="logout" @click="handleLogout">
      <el-icon><SwitchButton /></el-icon>
      Logout
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {
  DataLine,
  Goods,
  List,
  User,
  PieChart,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    DataLine,
    Goods,
    List,
    User,
    PieChart,
    Setting,
    SwitchButton
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const activeIndex = computed(() => {
      return route.name as string
    })

    const handleSelect = (key: string) => {
      if (key !== 'logout') {
        router.push({ name: key })
      }
    }

    const handleLogout = async () => {
      try {
        await store.dispatch('auth/logout')
        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }

    return {
      activeIndex,
      handleSelect,
      handleLogout
    }
  }
})
</script>

<style scoped>
.nav-menu {
  padding: 0 20px;
}

.flex-grow {
  flex-grow: 1;
}
</style> 