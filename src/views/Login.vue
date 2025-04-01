<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2>Login</h2>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email" />
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
import type { FormInstance, FormRules } from 'element-plus'

interface LoginForm {
  email: string
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
      email: '',
      password: ''
    })

    const rules = reactive<FormRules>({
      email: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 6, message: 'Password length should be at least 6 characters', trigger: 'blur' }
      ]
    })

    const handleSubmit = async () => {
      if (!formRef.value) return

      try {
        await formRef.value.validate()
        loading.value = true
        await store.dispatch('auth/login', form)
        router.push('/dashboard')
      } catch (error) {
        console.error('Login failed:', error)
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