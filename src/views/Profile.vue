<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>Profile Information</span>
        </div>
      </template>
      
      <el-form :model="profileForm" label-width="120px">
        <el-form-item label="First Name">
          <el-input v-model="profileForm.firstName" placeholder="Enter your first name" />
        </el-form-item>
        
        <el-form-item label="Last Name">
          <el-input v-model="profileForm.lastName" placeholder="Enter your last name" />
        </el-form-item>
        
        <el-form-item label="Email">
          <el-input v-model="profileForm.email" placeholder="Enter your email" />
        </el-form-item>
        
        <el-form-item label="Phone">
          <el-input v-model="profileForm.phone" placeholder="Enter your phone number" />
        </el-form-item>
        
        <el-form-item label="Role">
          <el-input v-model="profileForm.role" disabled />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">Save Changes</el-button>
          <el-button @click="handleReset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="password-card">
      <template #header>
        <div class="card-header">
          <span>Change Password</span>
        </div>
      </template>
      
      <el-form :model="passwordForm" label-width="120px">
        <el-form-item label="Current Password">
          <el-input v-model="passwordForm.currentPassword" type="password" placeholder="Enter current password" />
        </el-form-item>
        
        <el-form-item label="New Password">
          <el-input v-model="passwordForm.newPassword" type="password" placeholder="Enter new password" />
        </el-form-item>
        
        <el-form-item label="Confirm Password">
          <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="Confirm new password" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handlePasswordChange">Change Password</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Profile',
  setup() {
    const profileForm = ref({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      role: 'Administrator'
    })

    const passwordForm = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const handleSave = () => {
      // TODO: Implement API call to save profile changes
      ElMessage.success('Profile updated successfully')
    }

    const handleReset = () => {
      // Reset form to original values
      profileForm.value = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        role: 'Administrator'
      }
      ElMessage.info('Form reset to original values')
    }

    const handlePasswordChange = () => {
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        ElMessage.error('New passwords do not match')
        return
      }
      // TODO: Implement API call to change password
      ElMessage.success('Password changed successfully')
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }

    return {
      profileForm,
      passwordForm,
      handleSave,
      handleReset,
      handlePasswordChange
    }
  }
})
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card,
.password-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-form {
  max-width: 500px;
}
</style> 