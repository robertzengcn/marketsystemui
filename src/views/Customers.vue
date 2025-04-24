<template>
  <div class="customers">
    <div class="page-header">
      <h2>Customers</h2>
      <el-button type="primary" @click="showAddDialog">Add Customer</el-button>
    </div>

    <el-card>
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="Search customers..."
          style="width: 200px"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <el-table
        v-loading="loading"
        :data="filteredCustomers"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="phone" label="Phone" width="150" />
        <el-table-column prop="totalOrders" label="Orders" width="100" />
        <el-table-column prop="totalSpent" label="Total Spent" width="150">
          <template #default="scope">
            ${{ scope.row.totalSpent.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="150">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)"
              type="primary"
              plain
            >
              Edit
            </el-button>
            <el-button
              size="small"
              @click="handleViewOrders(scope.row)"
              type="info"
              plain
            >
              Orders
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Add/Edit Customer Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? 'Add Customer' : 'Edit Customer'"
      width="500px"
    >
      <el-form
        ref="customerForm"
        :model="customerForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="customerForm.name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="customerForm.email" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="customerForm.phone" />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input
            v-model="customerForm.address"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ dialogType === 'add' ? 'Add' : 'Save' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Customer Orders Dialog -->
    <el-dialog
      v-model="ordersDialogVisible"
      title="Customer Orders"
      width="800px"
    >
      <div v-if="selectedCustomer" class="customer-orders">
        <div class="customer-info">
          <h3>{{ selectedCustomer.name }}</h3>
          <p>Total Orders: {{ selectedCustomer.totalOrders }}</p>
          <p>Total Spent: ${{ selectedCustomer.totalSpent.toFixed(2) }}</p>
        </div>

        <el-table :data="customerOrders" style="width: 100%">
          <el-table-column prop="id" label="Order ID" width="100" />
          <el-table-column prop="date" label="Date" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.date) }}
            </template>
          </el-table-column>
          <el-table-column prop="total" label="Total" width="120">
            <template #default="scope">
              ${{ scope.row.total.toFixed(2) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="120">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default {
  name: 'Customers',
  components: {
    Search
  },
  setup() {
    const store = useStore()
    const loading = ref(false)
    const submitting = ref(false)
    const dialogVisible = ref(false)
    const ordersDialogVisible = ref(false)
    const dialogType = ref('add')
    const searchQuery = ref('')
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const selectedCustomer = ref(null)
    const customerOrders = ref([])
    const customerFormRef = ref(null)

    const customerForm = ref({
      name: '',
      email: '',
      phone: '',
      address: ''
    })

    const rules = {
      name: [
        { required: true, message: 'Please enter customer name', trigger: 'blur' }
      ],
      email: [
        { required: true, message: 'Please enter email', trigger: 'blur' },
        { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: 'Please enter phone number', trigger: 'blur' }
      ]
    }

    const filteredCustomers = computed(() => {
      // Implement filtering logic here
      return store.state.customers
    })

    const getStatusType = (status) => {
      const types = {
        pending: 'warning',
        processing: 'primary',
        shipped: 'info',
        delivered: 'success',
        cancelled: 'danger'
      }
      return types[status] || 'info'
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString()
    }

    const showAddDialog = () => {
      dialogType.value = 'add'
      customerForm.value = {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
      dialogVisible.value = true
    }

    const handleEdit = (row) => {
      dialogType.value = 'edit'
      customerForm.value = { ...row }
      dialogVisible.value = true
    }

    const handleViewOrders = async (customer) => {
      selectedCustomer.value = customer
      ordersDialogVisible.value = true
      try {
        // Implement fetch customer orders logic here
        customerOrders.value = [] // Replace with actual API call
      } catch (error) {
        ElMessage.error('Failed to fetch customer orders')
      }
    }

    const handleSubmit = async () => {
      if (!customerFormRef.value) return
      
      try {
        await customerFormRef.value.validate()
        submitting.value = true
        
        // Implement submit logic here
        ElMessage.success(
          dialogType.value === 'add'
            ? 'Customer added successfully'
            : 'Customer updated successfully'
        )
        dialogVisible.value = false
      } catch (error) {
        ElMessage.error('Please check your input')
      } finally {
        submitting.value = false
      }
    }

    const handleSearch = () => {
      currentPage.value = 1
      // Implement search logic here
    }

    const handleSizeChange = (val) => {
      pageSize.value = val
      // Implement pagination logic here
    }

    const handleCurrentChange = (val) => {
      currentPage.value = val
      // Implement pagination logic here
    }

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('fetchCustomers')
      } catch (error) {
        ElMessage.error('Failed to fetch customers')
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      submitting,
      dialogVisible,
      ordersDialogVisible,
      dialogType,
      searchQuery,
      currentPage,
      pageSize,
      total,
      selectedCustomer,
      customerOrders,
      customerForm,
      customerFormRef,
      rules,
      filteredCustomers,
      getStatusType,
      formatDate,
      showAddDialog,
      handleEdit,
      handleViewOrders,
      handleSubmit,
      handleSearch,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.customers {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.customer-orders {
  padding: 20px;
}

.customer-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.customer-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #303133;
}

.customer-info p {
  margin: 5px 0;
  color: #606266;
}
</style> 