<template>
  <el-menu
    :default-active="activeIndex"
    class="side-menu"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <el-menu-item index="dashboard">
      <el-icon><DataLine /></el-icon>
      <template #title>Dashboard</template>
    </el-menu-item>
    <el-menu-item index="products">
      <el-icon><Goods /></el-icon>
      <template #title>Products</template>
    </el-menu-item>
    <el-menu-item index="orders">
      <el-icon><List /></el-icon>
      <template #title>Orders</template>
    </el-menu-item>
    <el-menu-item index="customers">
      <el-icon><User /></el-icon>
      <template #title>Customers</template>
    </el-menu-item>
    <el-menu-item index="reports">
      <el-icon><PieChart /></el-icon>
      <template #title>Reports</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  DataLine,
  Goods,
  List,
  User,
  PieChart
} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'SideMenu',
  components: {
    DataLine,
    Goods,
    List,
    User,
    PieChart
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const activeIndex = computed(() => {
      return route.name as string
    })

    const handleSelect = (key: string) => {
      router.push({ name: key })
    }

    return {
      activeIndex,
      handleSelect
    }
  }
})
</script>

<style scoped>
.side-menu {
  height: 100%;
  border-right: none;
}

.side-menu:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-item {
  display: flex;
  align-items: center;
}

.el-icon {
  margin-right: 8px;
}
</style> 