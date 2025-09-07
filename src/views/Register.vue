<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <h2>Register</h2>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="First Name" prop="firstName">
          <el-input v-model="form.firstName" />
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName">
          <el-input v-model="form.lastName" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" type="email" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            Register
          </el-button>
          <el-button @click="goToLogin">Back to Login</el-button>
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

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter()
    const store = useStore()
    const formRef = ref<FormInstance>()
    const loading = ref(false)

    const form = reactive<RegisterForm>({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const validatePass = (_rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (form.confirmPassword !== '') {
          formRef.value?.validateField('confirmPassword')
        }
        callback()
      }
    }

    const validatePass2 = (_rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== form.password) {
        callback(new Error("Two passwords don't match!"))
      } else {
        callback()
      }
    }

    const rules = reactive<FormRules>({
      firstName: [
        { required: true, message: 'Please input first name', trigger: 'blur' }
      ],
      lastName: [
        { required: true, message: 'Please input last name', trigger: 'blur' }
      ],
      email: [
        { required: true, message: 'Please input email address', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: 'blur' }
      ],
      password: [
        { required: true, validator: validatePass, trigger: 'blur' },
        { min: 6, message: 'Password length should be at least 6 characters', trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, validator: validatePass2, trigger: 'blur' }
      ]
    })

    const handleSubmit = async () => {
      if (!formRef.value) return

      try {
        await formRef.value.validate()
        loading.value = true
        // TODO: Implement registration API call
        await store.dispatch('auth/register', {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password
        })
        router.push('/login')
      } catch (error) {
        console.error('Registration failed:', error)
      } finally {
        loading.value = false
      }
    }

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      formRef,
      form,
      rules,
      loading,
      handleSubmit,
      goToLogin
    }
  }
})
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.register-card {
  width: 500px;
}

h2 {
  margin: 0;
  text-align: center;
  color: #409EFF;
}
</style> 