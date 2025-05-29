<template>
  <div class="orders">
    <div class="page-header">
      <h2>Orders</h2>
      <el-button type="primary" @click="showAddDialog">New Order</el-button>
    </div>

    <el-card>
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="Search orders..."
          style="width: 200px"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-select v-model="statusFilter" placeholder="Status" clearable>
          <el-option
            v-for="item in orderStatuses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="to"
          start-placeholder="Start date"
          end-placeholder="End date"
          @change="handleDateChange"
        />
      </div>

      <el-table
        v-loading="loading"
        :data="filteredOrders"
        style="width: 100%"
      >
        <el-table-column prop="id" label="Order ID" width="100" />
        <el-table-column prop="customerName" label="Customer" />
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
        <el-table-column label="Actions" width="200">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleView(scope.row)"
              type="info"
              plain
            >
              View
            </el-button>
            <el-button
              size="small"
              @click="handleUpdateStatus(scope.row)"
              type="primary"
              plain
            >
              Update Status
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

    <!-- Order Details Dialog -->
    <el-dialog
      v-model="detailsDialogVisible"
      title="Order Details"
      width="800px"
    >
      <div v-if="selectedOrder" class="order-details">
        <div class="details-header">
          <div class="customer-info">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {{ selectedOrder.customerName }}</p>
            <p><strong>Email:</strong> {{ selectedOrder.customerEmail }}</p>
            <p><strong>Phone:</strong> {{ selectedOrder.customerPhone }}</p>
          </div>
          <div class="order-info">
            <h3>Order Information</h3>
            <p><strong>Order ID:</strong> {{ selectedOrder.id }}</p>
            <p><strong>Date:</strong> {{ formatDate(selectedOrder.date) }}</p>
            <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
          </div>
        </div>

        <div class="order-items">
          <h3>Order Items</h3>
          <el-table :data="selectedOrder.items" style="width: 100%">
            <el-table-column prop="productName" label="Product" />
            <el-table-column prop="quantity" label="Quantity" width="100" />
            <el-table-column prop="price" label="Price" width="120">
              <template #default="scope">
                ${{ scope.row.price.toFixed(2) }}
              </template>
            </el-table-column>
            <el-table-column prop="subtotal" label="Subtotal" width="120">
              <template #default="scope">
                ${{ scope.row.subtotal.toFixed(2) }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="order-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>${{ selectedOrder.subtotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>${{ selectedOrder.tax.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>${{ selectedOrder.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Update Status Dialog -->
    <el-dialog
      v-model="statusDialogVisible"
      title="Update Order Status"
      width="400px"
    >
      <el-form
        ref="statusForm"
        :model="statusForm"
        label-width="100px"
      >
        <el-form-item label="Status">
          <el-select v-model="statusForm.status" placeholder="Select status">
            <el-option
              v-for="item in orderStatuses"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="statusDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleStatusSubmit" :loading="submitting">
            Update
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

export default {
  name: 'Orders',
  components: {
    Search
  },
  setup() {
    const store = useStore()
    const loading = ref(false)
    const submitting = ref(false)
    const detailsDialogVisible = ref(false)
    const statusDialogVisible = ref(false)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const dateRange = ref([])
    const currentPage = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const selectedOrder = ref(null)
    const statusFormRef = ref(null)

    const statusForm = ref({
      status: ''
    })

    const orderStatuses = [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'cancelled', label: 'Cancelled' }
    ]

    const filteredOrders = computed(() => {
      // Implement filtering logic here
      return store.state.orders
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

    const handleView = (order) => {
      selectedOrder.value = order
      detailsDialogVisible.value = true
    }

    const handleUpdateStatus = (order) => {
      selectedOrder.value = order
      statusForm.value.status = order.status
      statusDialogVisible.value = true
    }

    const handleStatusSubmit = async () => {
      if (!statusFormRef.value) return
      
      try {
        await statusFormRef.value.validate()
        submitting.value = true
        
        // Implement status update logic here
        ElMessage.success('Order status updated successfully')
        statusDialogVisible.value = false
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

    const handleDateChange = () => {
      currentPage.value = 1
      // Implement date filter logic here
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
        await store.dispatch('fetchOrders')
      } catch (error) {
        ElMessage.error('Failed to fetch orders')
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      submitting,
      detailsDialogVisible,
      statusDialogVisible,
      searchQuery,
      statusFilter,
      dateRange,
      currentPage,
      pageSize,
      total,
      selectedOrder,
      statusForm,
      statusFormRef,
      orderStatuses,
      filteredOrders,
      getStatusType,
      formatDate,
      handleView,
      handleUpdateStatus,
      handleStatusSubmit,
      handleSearch,
      handleDateChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.orders {
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

.order-details {
  padding: 20px;
}

.details-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.customer-info,
.order-info {
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.customer-info h3,
.order-info h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.order-items {
  margin: 20px 0;
}

.order-summary {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.1em;
  border-top: 1px solid #dcdfe6;
  padding-top: 10px;
  margin-top: 10px;
}
</style> 