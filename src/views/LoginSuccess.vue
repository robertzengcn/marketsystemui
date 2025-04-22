<template>
  <div class="login-success">
    <el-card class="success-card">
      <el-result
        icon="success"
        title="Login Successful"
        sub-title="You will be redirected to the dashboard shortly"
      >
        <template #extra>
          <el-button type="primary" @click="goToDashboard">Go to Dashboard</el-button>
        </template>
      </el-result>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginSuccess',
  setup() {
    const router = useRouter()

    const goToDashboard = () => {
      router.push('/dashboard')
    }

    // Auto redirect after 3 seconds
    setTimeout(() => {
      goToDashboard()
    }, 3000)

    return {
      goToDashboard
    }
  }
})
</script>

<style scoped>
.login-success {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.success-card {
  width: 400px;
  text-align: center;
}
</style> 