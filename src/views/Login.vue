<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>Login</h2>
      </template>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="handleSubmit">
        <el-form-item label="Email" prop="username">
          <el-input v-model="form.username" type="email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface LoginForm {
  username: string
  password: string
}

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const store = useStore()
    const formRef = ref<FormInstance>()
    const loading = ref(false)

    const form = reactive<LoginForm>({
      username: '',
      password: ''
    })

    const rules = reactive<FormRules>({
      username: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 6, message: 'Password length should be at least 6 characters', trigger: 'blur' }
      ]
    })
    const APP_MARKETSYSTEM_NAME = import.meta.env.VITE_APP_MARKETSYSTEM_NAME
    const APP_AIFETCHLY_NAME = import.meta.env.VITE_APP_AIFETCHLY_NAME

    const handleSubmit = async () => {
      if (!formRef.value) return

      try {
        await formRef.value.validate()
        loading.value = true
        const res = await store.dispatch('auth/login', form)
        if (res) {
          
          // Check URL parameters
          const urlParams = new URLSearchParams(window.location.search)
          const appParam = urlParams.get('app')

        const supportedAppNames = [APP_MARKETSYSTEM_NAME, APP_AIFETCHLY_NAME]

        if (supportedAppNames.includes(appParam)) {
          const token = localStorage.getItem('token')
          const appUrl = appParam+`://auth?token=${token}`
          window.location.href = appUrl
          console.log("redirecting to app:"+appUrl)
          //router.push('/dashboard')
        }else{
          router.push('/dashboard')
        }
        // else {
          // if (appParam === 'socialmarketing') {
          //   const token = localStorage.getItem('token')
          //   // Redirect to app URL scheme
          //   const appUrl = `socialmarketing://auth?token=${token}`
          //   window.location.href = appUrl
          //   console.log("redirecting to app:" + appUrl)
          //   // Redirect to success page first, then handle app redirect
          //   // router.push('/login/success').then(() => {
          //   //   setTimeout(() => {
          //   //     window.location.href = `socialmarketing://auth?token=${token}`
          //   //   }, 1500) // Brief delay to show success page before redirect
          //   // })
          // }
          // else {
          //   // Default route to dashboard when no app parameter is present
          //   // const appUrl = `socialmarketing://token_${data.Token}`
          //   // window.location.href = appUrl
          //   // router.push('/dashboard')
          //   router.push('/dashboard')
          // }

        // }
      }
      } catch (error) {
        if (error instanceof Error) {
          ElMessage.error(error.message)
        } else {
          ElMessage.error('Login failed. Please check your credentials and try again.')
        }
        ElMessage.error('Login failed. Please check your credentials and try again.')
        console.error('Login failed:', error)
        return false
      } finally {
        loading.value = false
      }
    }

    return {
      formRef,
      form,
      rules,
      loading,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
}

h2 {
  margin: 0;
  text-align: center;
  color: #409EFF;
}
</style>