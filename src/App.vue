<template>
  <div id="app">
    <template v-if="useSimpleLayout">
      <router-view></router-view>
    </template>
    <template v-else>
      <el-container>
        <el-header>
          <nav-bar></nav-bar>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <side-menu></side-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SideMenu from '@/components/SideMenu.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    SideMenu
  },
  setup() {
    const route = useRoute()
    
    // List of paths that should use the simple layout (without sidebar and header)
    const simpleLayoutPaths = ['/', '/login', '/register']
    
    const useSimpleLayout = computed(() => {
      return simpleLayoutPaths.includes(route.path)
    })

    return {
      useSimpleLayout
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  padding: 0;
}

.el-aside {
  background-color: #f5f7fa;
  border-right: 1px solid #e6e6e6;
}

.el-main {
  background-color: #fff;
  padding: 20px;
}
</style> 